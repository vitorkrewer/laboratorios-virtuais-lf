/**
 * Git Virtual Engine - Learning Fly
 * Motor simulador de repositório Git, DAG (Grafo Direcionado Acíclico),
 * Sistema de arquivos virtual e operações de Versionamento para o ambiente web.
 */

class GitVirtualEngine {
    constructor() {
        this.resetState();
    }

    resetState() {
        // Estado do Sistema de Arquivos Virtual
        this.workingDirectory = {}; // { 'app.js': 'console.log("hello");' }
        this.stagingArea = {};      // { 'app.js': 'console.log("hello");' }
        
        // Estado do Git
        this.isInitialized = false;
        this.commits = {};          // { [hash]: CommitObject }
        this.branches = {};         // { 'main': hash }
        this.tags = {};             // { 'v1.0': hash }
        this.HEAD = { type: 'branch', target: 'main' }; // { type: 'branch'|'detached', target: 'main'|hash }
        
        // Conflito & Stash
        this.inConflict = false;
        this.conflictFiles = {};    // { 'app.js': { base, current, incoming } }
        this.stashList = [];
        
        // Remotos
        this.remotes = {};          // { 'origin': { url: '...', branches: {} } }

        // Histórico de Comandos
        this.commandHistory = [];
        
        // Listeners de evento para renderização em tempo real
        this.listeners = [];
    }

    onChange(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.getState()));
    }

    // ========================================================================
    // UTILITÁRIOS & HASH
    // ========================================================================
    generateHash() {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 7; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    getCurrentCommitHash() {
        if (!this.isInitialized) return null;
        if (this.HEAD.type === 'branch') {
            return this.branches[this.HEAD.target] || null;
        }
        return this.HEAD.target || null;
    }

    getCurrentBranchName() {
        if (!this.isInitialized) return null;
        return this.HEAD.type === 'branch' ? this.HEAD.target : `detached (${this.HEAD.target.substring(0, 7)})`;
    }

    // ========================================================================
    // COMANDOS DE SISTEMA DE ARQUIVOS (touch, echo, cat, rm, ls)
    // ========================================================================
    touch(filename) {
        if (!filename) return { success: false, output: "touch: falta o operando de arquivo" };
        if (this.workingDirectory[filename] === undefined) {
            this.workingDirectory[filename] = "";
        }
        this.notify();
        return { success: true, output: "" };
    }

    echo(content, filename, append = false) {
        if (!filename) return { success: true, output: content };
        const cleanContent = content.replace(/^["']|["']$/g, '');
        if (append && this.workingDirectory[filename] !== undefined) {
            this.workingDirectory[filename] += (this.workingDirectory[filename] ? "\n" : "") + cleanContent;
        } else {
            this.workingDirectory[filename] = cleanContent;
        }
        this.notify();
        return { success: true, output: "" };
    }

    cat(filename) {
        if (!filename) return { success: false, output: "cat: falta o operando de arquivo" };
        if (this.workingDirectory[filename] === undefined) {
            return { success: false, output: `cat: ${filename}: Arquivo ou diretório não encontrado` };
        }
        return { success: true, output: this.workingDirectory[filename] };
    }

    rm(filename) {
        if (!filename) return { success: false, output: "rm: falta o operando de arquivo" };
        if (this.workingDirectory[filename] === undefined) {
            return { success: false, output: `rm: não foi possível remover '${filename}': Arquivo inexistente` };
        }
        delete this.workingDirectory[filename];
        this.notify();
        return { success: true, output: "" };
    }

    ls() {
        const files = Object.keys(this.workingDirectory);
        if (files.length === 0) return { success: true, output: "" };
        return { success: true, output: files.join("   ") };
    }

    // ========================================================================
    // COMANDOS DO GIT (init, status, add, commit, branch, checkout, merge, etc)
    // ========================================================================
    init() {
        if (this.isInitialized) {
            return { success: true, output: "Repositório Git existente reinicializado em /virtual-project/.git/" };
        }
        this.isInitialized = true;
        this.branches['main'] = null;
        this.HEAD = { type: 'branch', target: 'main' };
        
        // Arquivo padrão inicial
        if (Object.keys(this.workingDirectory).length === 0) {
            this.workingDirectory['README.md'] = "# Meu Projeto Incrível\nBem-vindo ao laboratório de Git da Learning Fly!";
        }
        
        this.notify();
        return { success: true, output: "Repositório Git vazio inicializado em /virtual-project/.git/" };
    }

    status() {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git (ou nenhum dos diretórios pai): .git" };
        }

        const branch = this.getCurrentBranchName();
        let output = `No ramo ${branch}\n`;

        const headHash = this.getCurrentCommitHash();
        if (!headHash) {
            output += "Nenhum commit ainda\n\n";
        }

        const headCommit = headHash ? this.commits[headHash] : null;
        const headTree = headCommit ? headCommit.tree : {};

        // 1. Mudanças a serem confirmadas (Staged)
        const stagedChanges = [];
        for (const file of Object.keys(this.stagingArea)) {
            const stagedContent = this.stagingArea[file];
            const committedContent = headTree[file];

            if (committedContent === undefined) {
                stagedChanges.push(`\t\x1b[32mnovo arquivo:   ${file}\x1b[0m`);
            } else if (stagedContent !== committedContent) {
                stagedChanges.push(`\t\x1b[32mmodificado:     ${file}\x1b[0m`);
            }
        }
        // Arquivos deletados no stage
        for (const file of Object.keys(headTree)) {
            if (this.stagingArea[file] === undefined && this.stagingArea.hasOwnProperty(file)) {
                stagedChanges.push(`\t\x1b[32mdeletado:       ${file}\x1b[0m`);
            }
        }

        if (stagedChanges.length > 0) {
            output += "Mudanças a serem submetidas:\n  (use \"git restore --staged <arquivo>...\" para desmarcar)\n";
            output += stagedChanges.join("\n") + "\n\n";
        }

        // 2. Mudanças não preparadas para commit (Modified in Working Dir)
        const unstagedChanges = [];
        for (const file of Object.keys(this.stagingArea)) {
            const stagedContent = this.stagingArea[file];
            const workContent = this.workingDirectory[file];

            if (workContent === undefined) {
                unstagedChanges.push(`\t\x1b[31mdeletado:       ${file}\x1b[0m`);
            } else if (workContent !== stagedContent) {
                unstagedChanges.push(`\t\x1b[31mmodificado:     ${file}\x1b[0m`);
            }
        }

        if (unstagedChanges.length > 0) {
            output += "Mudanças não preparadas para commit:\n  (use \"git add <arquivo>...\" para atualizar o que será submetido)\n";
            output += unstagedChanges.join("\n") + "\n\n";
        }

        // 3. Arquivos não rastreados (Untracked)
        const untracked = [];
        for (const file of Object.keys(this.workingDirectory)) {
            if (this.stagingArea[file] === undefined && headTree[file] === undefined) {
                untracked.push(`\t\x1b[31m${file}\x1b[0m`);
            }
        }

        if (untracked.length > 0) {
            output += "Arquivos não rastreados:\n  (use \"git add <arquivo>...\" para incluir no que será submetido)\n";
            output += untracked.join("\n") + "\n\n";
        }

        if (stagedChanges.length === 0 && unstagedChanges.length === 0 && untracked.length === 0) {
            output += "nada a submeter, árvore de trabalho limpa";
        }

        return { success: true, output: output.trim() };
    }

    add(filePattern = '.') {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (filePattern === '.' || filePattern === '-A' || filePattern === '--all') {
            // Stage all working directory files
            this.stagingArea = { ...this.workingDirectory };
        } else {
            if (this.workingDirectory[filePattern] === undefined) {
                // Pode ser remoção de arquivo
                const headHash = this.getCurrentCommitHash();
                const headTree = headHash && this.commits[headHash] ? this.commits[headHash].tree : {};
                if (headTree[filePattern] !== undefined) {
                    delete this.stagingArea[filePattern];
                } else {
                    return { success: false, output: `fatal: o caminho '${filePattern}' não corresponde a nenhum arquivo` };
                }
            } else {
                this.stagingArea[filePattern] = this.workingDirectory[filePattern];
            }
        }

        this.notify();
        return { success: true, output: "" };
    }

    commit(message, author = "Desenvolvedor <dev@learningfly.org>") {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (!message || !message.trim()) {
            return { success: false, output: "erro: mensagem de commit vazia não permitida. Use git commit -m \"mensagem\"" };
        }

        const headHash = this.getCurrentCommitHash();
        const headCommit = headHash ? this.commits[headHash] : null;
        const headTree = headCommit ? headCommit.tree : {};

        // Checar se há mudanças na staging area em relação ao HEAD
        const stagingKeys = Object.keys(this.stagingArea);
        const headKeys = Object.keys(headTree);
        let hasChanges = stagingKeys.length !== headKeys.length;

        if (!hasChanges) {
            for (const key of stagingKeys) {
                if (this.stagingArea[key] !== headTree[key]) {
                    hasChanges = true;
                    break;
                }
            }
        }

        if (!hasChanges) {
            return { success: false, output: "No ramo " + this.getCurrentBranchName() + "\nnada a submeter, árvore de trabalho limpa" };
        }

        const newHash = this.generateHash();
        const branchName = this.getCurrentBranchName();

        const commitObj = {
            hash: newHash,
            parentIds: headHash ? [headHash] : [],
            message: message.trim(),
            author: author,
            timestamp: new Date(),
            tree: { ...this.stagingArea },
            branch: branchName
        };

        this.commits[newHash] = commitObj;

        // Atualizar ponteiro do branch ou detached HEAD
        if (this.HEAD.type === 'branch') {
            this.branches[this.HEAD.target] = newHash;
        } else {
            this.HEAD.target = newHash;
        }

        // Se estávamos resolvendo um conflito, resetar flag
        this.inConflict = false;
        this.conflictFiles = {};

        this.notify();
        return {
            success: true,
            output: `[${branchName} ${newHash}] ${message.trim()}\n ${stagingKeys.length} arquivo(s) alterado(s)`
        };
    }

    branch(name, options = {}) {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        // Listar branches
        if (!name) {
            let output = "";
            const current = this.getCurrentBranchName();
            for (const b of Object.keys(this.branches)) {
                if (b === current) {
                    output += `* \x1b[32m${b}\x1b[0m\n`;
                } else {
                    output += `  ${b}\n`;
                }
            }
            return { success: true, output: output.trimEnd() };
        }

        // Deletar branch
        if (options.delete) {
            if (!this.branches[name]) {
                return { success: false, output: `erro: ramo '${name}' não encontrado.` };
            }
            if (this.HEAD.type === 'branch' && this.HEAD.target === name) {
                return { success: false, output: `erro: Não é possível excluir o ramo '${name}' no qual você se encontra no momento.` };
            }
            delete this.branches[name];
            this.notify();
            return { success: true, output: `Ramo '${name}' excluído.` };
        }

        // Criar branch
        if (this.branches[name]) {
            return { success: false, output: `fatal: Um ramo chamado '${name}' já existe.` };
        }

        const headHash = this.getCurrentCommitHash();
        this.branches[name] = headHash;
        this.notify();
        return { success: true, output: "" };
    }

    checkout(target, createNewBranch = false) {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (!target) {
            return { success: false, output: "fatal: especifique um ramo ou commit para checkout" };
        }

        if (createNewBranch) {
            if (this.branches[target]) {
                return { success: false, output: `fatal: Um ramo chamado '${target}' já existe.` };
            }
            const headHash = this.getCurrentCommitHash();
            this.branches[target] = headHash;
            this.HEAD = { type: 'branch', target: target };
            this.notify();
            return { success: true, output: `Mudou para um novo ramo '${target}'` };
        }

        // Checkout de Branch existente
        if (this.branches[target] !== undefined) {
            this.HEAD = { type: 'branch', target: target };
            const commitHash = this.branches[target];
            if (commitHash && this.commits[commitHash]) {
                this.workingDirectory = { ...this.commits[commitHash].tree };
                this.stagingArea = { ...this.commits[commitHash].tree };
            }
            this.notify();
            return { success: true, output: `Mudou para o ramo '${target}'` };
        }

        // Checkout de Commit (Detached HEAD)
        if (this.commits[target]) {
            this.HEAD = { type: 'detached', target: target };
            this.workingDirectory = { ...this.commits[target].tree };
            this.stagingArea = { ...this.commits[target].tree };
            this.notify();
            return {
                success: true,
                output: `Nota: mudando para '${target}'.\nVocê está no estado 'detached HEAD'. Você pode olhar em volta e fazer commits experimentais.`
            };
        }

        return { success: false, output: `erro: spec de caminho '${target}' não correspondeu a nenhum arquivo conhecido do git` };
    }

    switch(branchName, createNew = false) {
        return this.checkout(branchName, createNew);
    }

    merge(targetBranch) {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (!targetBranch || !this.branches[targetBranch]) {
            return { success: false, output: `merge: ${targetBranch} - não encontrado no repositório` };
        }

        const currentBranch = this.getCurrentBranchName();
        if (currentBranch === targetBranch) {
            return { success: false, output: `Já atualizado.` };
        }

        const currentHash = this.branches[currentBranch];
        const targetHash = this.branches[targetBranch];

        if (!targetHash) {
            return { success: true, output: "Já atualizado. Ramo de destino não possui commits." };
        }

        // Caso 1: Fast-Forward (Ramo atual está vazio ou é ancestral direto)
        if (!currentHash || this.isAncestor(currentHash, targetHash)) {
            this.branches[currentBranch] = targetHash;
            this.workingDirectory = { ...this.commits[targetHash].tree };
            this.stagingArea = { ...this.commits[targetHash].tree };
            this.notify();
            return {
                success: true,
                output: `Atualizando ${currentHash || '0000000'}..${targetHash}\nFast-forward\n ${Object.keys(this.workingDirectory).length} arquivos atualizados.`
            };
        }

        // Caso 2: Já atualizado
        if (this.isAncestor(targetHash, currentHash)) {
            return { success: true, output: "Já atualizado." };
        }

        // Caso 3: 3-Way Merge (Branches divergiram)
        // Detectar conflitos simples comparando arquivos
        const currentTree = this.commits[currentHash].tree;
        const targetTree = this.commits[targetHash].tree;
        const mergedTree = { ...currentTree };
        let conflictFound = false;

        for (const file of Object.keys(targetTree)) {
            if (currentTree[file] !== undefined && currentTree[file] !== targetTree[file]) {
                // Conflito de merge!
                conflictFound = true;
                this.inConflict = true;
                this.conflictFiles[file] = {
                    current: currentTree[file],
                    incoming: targetTree[file]
                };
                mergedTree[file] = `<<<<<<< HEAD (${currentBranch})\n${currentTree[file]}\n=======\n${targetTree[file]}\n>>>>>>> ${targetBranch}`;
            } else {
                mergedTree[file] = targetTree[file];
            }
        }

        this.workingDirectory = { ...mergedTree };
        this.stagingArea = { ...mergedTree };

        if (conflictFound) {
            this.notify();
            return {
                success: false,
                output: `Auto-merging...\nCONFLITO (conteúdo): Conflito de mesclagem em ${Object.keys(this.conflictFiles).join(', ')}\nMesclagem automática falhou; resolva os conflitos e confirme o resultado.`
            };
        }

        // Se não houve conflito, cria commit de merge com 2 pais
        const newHash = this.generateHash();
        const mergeCommit = {
            hash: newHash,
            parentIds: [currentHash, targetHash],
            message: `Merge branch '${targetBranch}' into ${currentBranch}`,
            author: "Desenvolvedor <dev@learningfly.org>",
            timestamp: new Date(),
            tree: mergedTree,
            branch: currentBranch
        };

        this.commits[newHash] = mergeCommit;
        this.branches[currentBranch] = newHash;
        this.notify();

        return {
            success: true,
            output: `Mesclando '${targetBranch}' em '${currentBranch}'\nCommit de mesclagem criado: ${newHash}`
        };
    }

    isAncestor(possibleAncestorHash, startHash) {
        if (!possibleAncestorHash || !startHash) return false;
        if (possibleAncestorHash === startHash) return true;

        const queue = [startHash];
        const visited = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            if (current === possibleAncestorHash) return true;
            visited.add(current);

            const commit = this.commits[current];
            if (commit && commit.parentIds) {
                for (const pid of commit.parentIds) {
                    if (!visited.has(pid)) queue.push(pid);
                }
            }
        }
        return false;
    }

    log(options = {}) {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        const headHash = this.getCurrentCommitHash();
        if (!headHash) {
            return { success: false, output: "fatal: seu ramo atual '" + this.getCurrentBranchName() + "' não tem nenhum commit ainda" };
        }

        let output = "";
        const queue = [headHash];
        const visited = new Set();

        while (queue.length > 0) {
            const h = queue.shift();
            if (visited.has(h)) continue;
            visited.add(h);

            const c = this.commits[h];
            if (!c) continue;

            // Coletar ponteiros que apontam para este commit
            const refs = [];
            for (const [bName, bHash] of Object.entries(this.branches)) {
                if (bHash === h) {
                    if (this.HEAD.type === 'branch' && this.HEAD.target === bName) {
                        refs.push(`\x1b[36mHEAD -> \x1b[32m${bName}\x1b[0m`);
                    } else {
                        refs.push(`\x1b[32m${bName}\x1b[0m`);
                    }
                }
            }

            for (const [tName, tHash] of Object.entries(this.tags)) {
                if (tHash === h) refs.push(`\x1b[33mtag: ${tName}\x1b[0m`);
            }

            const refStr = refs.length > 0 ? ` (${refs.join(', ')})` : '';

            if (options.oneline) {
                output += `\x1b[33m${c.hash}\x1b[0m${refStr} ${c.message}\n`;
            } else {
                output += `\x1b[33mcommit ${c.hash}\x1b[0m${refStr}\n`;
                if (c.parentIds.length > 1) {
                    output += `Merge: ${c.parentIds.join(' ')}\n`;
                }
                output += `Author: ${c.author}\n`;
                output += `Date:   ${new Date(c.timestamp).toLocaleString('pt-BR')}\n\n`;
                output += `    ${c.message}\n\n`;
            }

            if (c.parentIds) {
                c.parentIds.forEach(pid => {
                    if (!visited.has(pid)) queue.push(pid);
                });
            }
        }

        return { success: true, output: output.trimEnd() };
    }

    diff() {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        let output = "";
        for (const file of Object.keys(this.workingDirectory)) {
            const staged = this.stagingArea[file] || "";
            const work = this.workingDirectory[file] || "";

            if (staged !== work) {
                output += `diff --git a/${file} b/${file}\n`;
                output += `--- a/${file}\n+++ b/${file}\n`;
                const stagedLines = staged.split('\n');
                const workLines = work.split('\n');

                stagedLines.forEach(line => {
                    if (!workLines.includes(line) && line) {
                        output += `\x1b[31m- ${line}\x1b[0m\n`;
                    }
                });
                workLines.forEach(line => {
                    if (!stagedLines.includes(line) && line) {
                        output += `\x1b[32m+ ${line}\x1b[0m\n`;
                    }
                });
                output += "\n";
            }
        }

        return { success: true, output: output.trim() || "Nenhuma modificação não preparada para o stage." };
    }

    reset(mode = '--mixed', target = 'HEAD') {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        let targetHash = target;
        if (target === 'HEAD') targetHash = this.getCurrentCommitHash();
        else if (this.branches[target]) targetHash = this.branches[target];

        if (!this.commits[targetHash]) {
            return { success: false, output: `fatal: commit '${target}' não encontrado` };
        }

        const targetCommit = this.commits[targetHash];

        if (this.HEAD.type === 'branch') {
            this.branches[this.HEAD.target] = targetHash;
        } else {
            this.HEAD.target = targetHash;
        }

        if (mode === '--hard') {
            this.stagingArea = { ...targetCommit.tree };
            this.workingDirectory = { ...targetCommit.tree };
        } else if (mode === '--mixed') {
            this.stagingArea = { ...targetCommit.tree };
        }
        // '--soft' keeps both staging and working dir untouched

        this.notify();
        return { success: true, output: `HEAD agora está em ${targetHash} ${targetCommit.message}` };
    }

    stash(action = 'save', message = '') {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (action === 'save' || action === 'push') {
            const headHash = this.getCurrentCommitHash();
            const headTree = headHash && this.commits[headHash] ? this.commits[headHash].tree : {};

            this.stashList.unshift({
                workingDirectory: { ...this.workingDirectory },
                stagingArea: { ...this.stagingArea },
                message: message || `WIP no ramo ${this.getCurrentBranchName()}`
            });

            // Reverte working dir para o estado do HEAD
            this.workingDirectory = { ...headTree };
            this.stagingArea = { ...headTree };
            this.notify();
            return { success: true, output: `Diretório de trabalho e estado do índice salvos WIP no ramo ${this.getCurrentBranchName()}` };
        }

        if (action === 'pop' || action === 'apply') {
            if (this.stashList.length === 0) {
                return { success: false, output: "erro: nenhuma entrada de stash encontrada" };
            }
            const item = action === 'pop' ? this.stashList.shift() : this.stashList[0];
            this.workingDirectory = { ...item.workingDirectory };
            this.stagingArea = { ...item.stagingArea };
            this.notify();
            return { success: true, output: `Stash restaurado: ${item.message}` };
        }

        if (action === 'list') {
            if (this.stashList.length === 0) return { success: true, output: "" };
            let out = "";
            this.stashList.forEach((s, idx) => {
                out += `stash@{${idx}}: ${s.message}\n`;
            });
            return { success: true, output: out.trimEnd() };
        }

        return { success: false, output: `subcomando stash desconhecido: ${action}` };
    }

    remote(action, name, url) {
        if (!this.isInitialized) {
            return { success: false, output: "fatal: não é um repositório git: .git" };
        }

        if (!action || action === '-v' || action === 'verbose') {
            let out = "";
            for (const [rName, rObj] of Object.entries(this.remotes)) {
                out += `${rName}\t${rObj.url} (fetch)\n${rName}\t${rObj.url} (push)\n`;
            }
            return { success: true, output: out.trimEnd() };
        }

        if (action === 'add') {
            if (!name || !url) return { success: false, output: "uso: git remote add <nome> <url>" };
            if (this.remotes[name]) return { success: false, output: `fatal: o controle remoto '${name}' já existe.` };
            this.remotes[name] = { url: url, branches: {} };
            this.notify();
            return { success: true, output: "" };
        }

        return { success: false, output: `subcomando remote desconhecido: ${action}` };
    }

    push(remoteName = 'origin', branchName) {
        if (!this.isInitialized) return { success: false, output: "fatal: não é um repositório git: .git" };
        if (!this.remotes[remoteName]) {
            return { success: false, output: `fatal: '${remoteName}' não parece ser um repositório git` };
        }

        const targetBranch = branchName || this.getCurrentBranchName();
        const currentHash = this.branches[targetBranch];

        if (!currentHash) {
            return { success: false, output: `erro: ramo '${targetBranch}' não possui commits para enviar` };
        }

        this.remotes[remoteName].branches[targetBranch] = currentHash;
        this.notify();
        return {
            success: true,
            output: `Objetos enumerados: 100%, concluído.\nPara ${this.remotes[remoteName].url}\n * [novo ramo]        ${targetBranch} -> ${targetBranch}`
        };
    }

    pull(remoteName = 'origin', branchName) {
        if (!this.isInitialized) return { success: false, output: "fatal: não é um repositório git: .git" };
        if (!this.remotes[remoteName]) {
            return { success: false, output: `fatal: '${remoteName}' não parece ser um repositório git` };
        }

        const targetBranch = branchName || this.getCurrentBranchName();
        const remoteHash = this.remotes[remoteName].branches[targetBranch];

        if (!remoteHash) {
            return { success: true, output: `Já atualizado.` };
        }

        this.branches[targetBranch] = remoteHash;
        this.workingDirectory = { ...this.commits[remoteHash].tree };
        this.stagingArea = { ...this.commits[remoteHash].tree };
        this.notify();
        return { success: true, output: `De ${this.remotes[remoteName].url}\n * branch            ${targetBranch}     -> FETCH_HEAD\nAtualizado com sucesso.` };
    }

    tag(tagName, targetHash) {
        if (!this.isInitialized) return { success: false, output: "fatal: não é um repositório git: .git" };
        if (!tagName) {
            return { success: true, output: Object.keys(this.tags).join('\n') };
        }
        const commit = targetHash || this.getCurrentCommitHash();
        if (!commit) return { success: false, output: "fatal: nenhum commit para marcar com tag" };
        this.tags[tagName] = commit;
        this.notify();
        return { success: true, output: "" };
    }

    // ========================================================================
    // EXPORTAÇÃO DO ESTADO COMPLETO PARA A UI
    // ========================================================================
    getState() {
        return {
            isInitialized: this.isInitialized,
            workingDirectory: { ...this.workingDirectory },
            stagingArea: { ...this.stagingArea },
            commits: { ...this.commits },
            branches: { ...this.branches },
            tags: { ...this.tags },
            HEAD: { ...this.HEAD },
            currentBranch: this.getCurrentBranchName(),
            currentCommit: this.getCurrentCommitHash(),
            remotes: { ...this.remotes },
            stashCount: this.stashList.length,
            inConflict: this.inConflict,
            conflictFiles: { ...this.conflictFiles }
        };
    }
}

// Exportação Global
window.GitVirtualEngine = GitVirtualEngine;
