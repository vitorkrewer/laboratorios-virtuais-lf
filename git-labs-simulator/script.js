/**
 * Git Labs Simulator - UI & Game Controller
 * Learning Fly • Simulador Interativo para Graduação em Tecnologia
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Instância do Motor Git Virtual
    const git = new GitVirtualEngine();

    // 2. Definição das 8 Missões Pedagógicas
    const missions = [
        {
            id: 1,
            title: "Inicialização & Primeiro Commit",
            goal: "Aprenda a inicializar um repositório Git com <code>git init</code>, verificar o estado dos arquivos com <code>git status</code>, prepará-los no stage com <code>git add</code> e criar seu primeiro commit com <code>git commit -m \"...\"</code>.",
            concept: "O Git gerencia o histórico como um grafo de instantâneos (snapshots). A Staging Area funciona como uma mesa de preparação onde você escolhe exatamente o que fará parte do próximo commit.",
            commands: ["git init", "git status", "git add README.md", "git commit -m \"docs: commit inicial\""],
            validator: (state) => state.isInitialized && Object.keys(state.commits).length >= 1
        },
        {
            id: 2,
            title: "Ramificação (Branches) & Paralelismo",
            goal: "Crie um novo ramo de desenvolvimento chamado <code>feature-auth</code> usando <code>git checkout -b feature-auth</code> (ou <code>git branch</code> seguido de <code>git checkout</code>). Em seguida, crie um arquivo <code>auth.js</code> com <code>touch auth.js</code>, adicione ao stage e faça um commit nesse novo branch.",
            concept: "Branches no Git são ponteiros móveis leves para commits específicos. Trabalhar em branches isola novas funcionalidades sem quebrar o código principal em produção.",
            commands: ["git checkout -b feature-auth", "touch auth.js", "git add .", "git commit -m \"feat: sistema de login\""],
            validator: (state) => {
                const hasBranch = state.branches['feature-auth'] !== undefined;
                const onBranch = state.currentBranch === 'feature-auth';
                const hasCommit = state.branches['feature-auth'] !== state.branches['main'];
                return hasBranch && onBranch && hasCommit;
            }
        },
        {
            id: 3,
            title: "Integração Fast-Forward (Merge)",
            goal: "Volte para o ramo principal com <code>git checkout main</code> e incorpore as alterações do ramo <code>feature-auth</code> executando <code>git merge feature-auth</code>.",
            concept: "Quando o ramo atual não divergiu (não recebeu novos commits desde a criação do branch), o Git apenas move o ponteiro para frente. Isso é chamado de mesclagem Fast-Forward.",
            commands: ["git checkout main", "git merge feature-auth"],
            validator: (state) => {
                return state.currentBranch === 'main' && 
                       state.branches['feature-auth'] && 
                       state.branches['main'] === state.branches['feature-auth'];
            }
        },
        {
            id: 4,
            title: "3-Way Merge (Branches Divergentes)",
            goal: "Crie um branch <code>design-ui</code>, faça um commit nele. Depois, volte para <code>main</code>, faça outro commit independente na <code>main</code>, e finalmente execute <code>git merge design-ui</code> a partir da main para criar um commit de merge com dois pais!",
            concept: "Quando ambos os ramos evoluem em paralelo com commits independentes, o Git realiza uma mesclagem de 3 vias (3-way merge) criando um nó no grafo com dois commits ancestrais.",
            commands: [
                "git checkout -b design-ui", "touch style.css", "git add .", "git commit -m \"feat: estilos\"",
                "git checkout main", "touch index.html", "git add .", "git commit -m \"feat: tela inicial\"",
                "git merge design-ui"
            ],
            validator: (state) => {
                const currentCommit = state.commits[state.currentCommit];
                return currentCommit && currentCommit.parentIds && currentCommit.parentIds.length > 1;
            }
        },
        {
            id: 5,
            title: "Guardando Trabalho com Git Stash",
            goal: "Modifique um arquivo (ex: <code>echo \"console.log('teste');\" > app.js</code>). Sem fazer commit, guarde o trabalho não finalizado com <code>git stash</code>. Depois recupere-o com <code>git stash pop</code>.",
            concept: "O Stash é um gaveteiro temporário. Ele limpa o diretório de trabalho permitindo trocar de branch com urgência (para corrigir um bug crítico) e depois restaurar o progresso intacto.",
            commands: ["touch app.js", "git stash", "git stash pop"],
            validator: (state) => state.isInitialized && Object.keys(state.workingDirectory).length > 0
        },
        {
            id: 6,
            title: "Voltando no Tempo com Git Reset",
            goal: "Descubra o hash do commit anterior com <code>git log --oneline</code> e execute <code>git reset --soft HEAD~1</code> (ou especificando o hash do commit anterior) para desfazer o último commit mantendo as alterações no stage.",
            concept: "O `git reset` move o ponteiro do branch atual para trás. `--soft` mantém as mudanças no Stage; `--mixed` mantém no Working Dir; `--hard` descarta tudo.",
            commands: ["git log --oneline", "git reset --soft HEAD~1"],
            validator: (state) => state.isInitialized
        },
        {
            id: 7,
            title: "Criando Marcos com Git Tag",
            goal: "Marque a versão estável atual do repositório criando uma tag com <code>git tag v1.0.0</code>.",
            concept: "Tags são ponteiros permanentes que não se movem (ao contrário dos branches). São usadas para marcar versões de lançamento (releases) como v1.0.0, v2.1.0.",
            commands: ["git tag v1.0.0", "git tag"],
            validator: (state) => Object.keys(state.tags).length >= 1
        },
        {
            id: 8,
            title: "Conexão Remota & Git Push",
            goal: "Conecte seu repositório a um servidor remoto com <code>git remote add origin https://github.com/usuario/projeto.git</code> e envie seus commits com <code>git push origin main</code>.",
            concept: "O controle remoto (origin) permite colaborar em equipe. O comando `push` envia o grafo local de commits para sincronizar com o GitHub/GitLab.",
            commands: [
                "git remote add origin https://github.com/dev/projeto.git",
                "git push origin main"
            ],
            validator: (state) => {
                return state.remotes['origin'] && 
                       state.remotes['origin'].branches && 
                       state.remotes['origin'].branches['main'];
            }
        }
    ];

    let currentMissionIndex = 0;
    let historyIndex = -1;
    const terminalHistory = [];

    // ========================================================================
    // 3. ELEMENTOS DO DOM
    // ========================================================================
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const promptBranch = document.getElementById('term-prompt-branch');
    const clearTermBtn = document.getElementById('clear-term-btn');
    const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

    const dagSvg = document.getElementById('dag-svg');
    const graphEmptyMsg = document.getElementById('graph-empty-msg');
    const activeBranchName = document.getElementById('active-branch-name');
    const lastCommitHash = document.getElementById('last-commit-hash');
    const currentHeadBadge = document.getElementById('current-head-badge');

    const countWorkingDir = document.getElementById('count-working-dir');
    const countStaging = document.getElementById('count-staging');
    const countCommits = document.getElementById('count-commits');
    const statusRemote = document.getElementById('status-remote');

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const missionSelector = document.getElementById('mission-selector');
    const missionTitle = document.getElementById('mission-title');
    const missionGoal = document.getElementById('mission-goal');
    const missionConcept = document.getElementById('mission-concept');
    const missionCommands = document.getElementById('mission-commands');
    const missionNumberBadge = document.getElementById('mission-number-badge');
    const missionStatusIndicator = document.getElementById('mission-status-indicator');
    const nextMissionBtn = document.getElementById('next-mission-btn');
    const missionBadgeDot = document.getElementById('mission-badge-dot');

    const virtualFilesList = document.getElementById('virtual-files-list');
    const diffOutputDisplay = document.getElementById('diff-output-display');
    const createFileUiBtn = document.getElementById('create-file-ui-btn');
    const refreshDiffBtn = document.getElementById('refresh-diff-btn');

    const resetRepoBtn = document.getElementById('reset-repo-btn');
    const cheatsheetModal = document.getElementById('cheatsheet-modal');
    const openCheatsheetBtn = document.getElementById('open-cheatsheet-btn');
    const cheatsheetClose = document.getElementById('cheatsheet-close');

    const commitInspectorModal = document.getElementById('commit-inspector-modal');
    const commitInspectorClose = document.getElementById('commit-inspector-close');

    // ========================================================================
    // 4. INICIALIZAÇÃO DA INTERFACE & LISTENERS DO MOTOR
    // ========================================================================
    git.onChange((state) => {
        renderArchitectureBoxes(state);
        renderDAGGraph(state);
        renderVirtualFiles(state);
        validateCurrentMission(state);
    });

    // Auto-inicializar repositório no início
    git.init();
    git.touch('README.md');

    setupTerminal();
    setupTabs();
    setupMissions();
    setupModals();
    setupCommitStandardsAndLinter();

    // ========================================================================
    // 5. CONTROLADOR DO TERMINAL CLI
    // ========================================================================
    function setupTerminal() {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command) {
                    terminalHistory.push(command);
                    historyIndex = terminalHistory.length;
                    executeCommand(command);
                }
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = terminalHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < terminalHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = terminalHistory[historyIndex];
                } else {
                    historyIndex = terminalHistory.length;
                    terminalInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                handleTabCompletion();
            }
        });

        clearTermBtn.addEventListener('click', () => {
            terminalOutput.innerHTML = '';
        });

        quickCmdBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.getAttribute('data-cmd');
                terminalInput.value = cmd;
                terminalInput.focus();
            });
        });
    }

    function executeCommand(rawCommand) {
        printToTerminal(`dev@learningfly:~/repo (${git.getCurrentBranchName() || 'main'}) $ ${rawCommand}`, 'command');

        const parts = rawCommand.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
        if (parts.length === 0) return;

        const mainCmd = parts[0].toLowerCase();
        let result = { success: true, output: "" };

        try {
            if (mainCmd === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            } else if (mainCmd === 'help') {
                result.output = `Comandos Disponíveis:
  git init                Inicializa o repositório
  git status              Exibe estado dos arquivos e branches
  git add <arquivo>|.     Prepara arquivos para commit
  git commit -m "msg"     Cria um novo snapshot de commit
  git branch [nome|-d]    Lista, cria ou deleta branches
  git checkout [-b] <ref> Alterna de branch ou cria novo
  git switch [-c] <ref>   Alterna de branch (sintaxe moderna)
  git merge <ramo>        Mescla outro branch no atual
  git log [--oneline]     Exibe o histórico de commits
  git diff                Exibe alterações do working dir
  git stash [pop|list]    Guarda ou restaura alterações temporárias
  git reset [--hard|soft] Move ponteiros do commit
  git remote [add|-v]     Gerencia repositórios remotos
  git push [remote] [ramo]Envia commits para o remoto
  git pull [remote] [ramo]Puxa commits do remoto
  git tag [nome]          Cria marcadores de versão
  touch <arquivo>         Cria arquivo virtual
  echo "texto" > <arq>    Escreve em arquivo virtual
  cat <arquivo>           Lê conteúdo do arquivo
  rm <arquivo>            Remove arquivo virtual
  ls                      Lista arquivos do diretório`;
            } else if (mainCmd === 'git') {
                result = handleGitCommand(parts.slice(1));
            } else if (mainCmd === 'touch') {
                result = git.touch(parts[1]);
            } else if (mainCmd === 'echo') {
                const echoResult = parseEchoCommand(parts);
                result = git.echo(echoResult.content, echoResult.filename, echoResult.append);
            } else if (mainCmd === 'cat') {
                result = git.cat(parts[1]);
            } else if (mainCmd === 'rm') {
                result = git.rm(parts[1]);
            } else if (mainCmd === 'ls') {
                result = git.ls();
            } else {
                result = { success: false, output: `bash: comando não encontrado: ${mainCmd}. Digite 'help' para ajuda.` };
            }
        } catch (err) {
            result = { success: false, output: `erro interno ao executar: ${err.message}` };
        }

        if (result.output) {
            printToTerminal(result.output, result.success ? 'output' : 'error');
        }

        promptBranch.textContent = `(${git.getCurrentBranchName() || 'main'})`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function handleGitCommand(args) {
        if (args.length === 0) {
            return { success: true, output: "uso: git <comando> [<argumentos>]. Digite 'help' para mais informações." };
        }

        const sub = args[0].toLowerCase();

        switch (sub) {
            case 'init':
                return git.init();
            case 'status':
                return git.status();
            case 'add':
                return git.add(args[1] || '.');
            case 'commit':
                let msg = "";
                for (let i = 1; i < args.length; i++) {
                    if (args[i] === '-m' && args[i + 1]) {
                        msg = args[i + 1].replace(/^["']|["']$/g, '');
                        break;
                    } else if (args[i].startsWith('-m=')) {
                        msg = args[i].substring(3).replace(/^["']|["']$/g, '');
                        break;
                    } else if (args[i] === '-am' && args[i + 1]) {
                        git.add('.');
                        msg = args[i + 1].replace(/^["']|["']$/g, '');
                        break;
                    }
                }
                const commitResult = git.commit(msg);
                
                // Análise pedagógica de Conventional Commits
                if (commitResult.success && msg) {
                    const conventionalRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|build|ci|revert)(\(.+?\))?!?:/;
                    if (!conventionalRegex.test(msg.trim())) {
                        commitResult.output += "\n\x1b[33m💡 Dica de Padrão:\x1b[0m Para seguir boas práticas da indústria, use prefixos semânticos como \x1b[32mfeat:\x1b[0m, \x1b[31mfix:\x1b[0m, \x1b[33mdocs:\x1b[0m, \x1b[36mstyle:\x1b[0m, \x1b[35mrefactor:\x1b[0m ou \x1b[37mchore:\x1b[0m. Consulte a aba 'Padrões & Linter'.";
                    }
                }
                return commitResult;
            case 'branch':
                if (args[1] === '-d' || args[1] === '-D') {
                    return git.branch(args[2], { delete: true });
                }
                return git.branch(args[1]);
            case 'checkout':
                if (args[1] === '-b') {
                    return git.checkout(args[2], true);
                }
                return git.checkout(args[1]);
            case 'switch':
                if (args[1] === '-c' || args[1] === '-C') {
                    return git.switch(args[2], true);
                }
                return git.switch(args[1]);
            case 'merge':
                return git.merge(args[1]);
            case 'log':
                const oneline = args.includes('--oneline');
                return git.log({ oneline });
            case 'diff':
                return git.diff();
            case 'reset':
                let mode = '--mixed';
                let target = 'HEAD';
                if (args[1] && args[1].startsWith('--')) {
                    mode = args[1];
                    target = args[2] || 'HEAD';
                } else if (args[1]) {
                    target = args[1];
                }
                // Tratamento HEAD~1
                if (target === 'HEAD~1' || target === 'HEAD~') {
                    const curHash = git.getCurrentCommitHash();
                    const curCommit = curHash ? git.commits[curHash] : null;
                    target = curCommit && curCommit.parentIds[0] ? curCommit.parentIds[0] : 'HEAD';
                }
                return git.reset(mode, target);
            case 'stash':
                return git.stash(args[1] || 'save', args.slice(2).join(' '));
            case 'remote':
                return git.remote(args[1], args[2], args[3]);
            case 'push':
                return git.push(args[1] || 'origin', args[2]);
            case 'pull':
                return git.pull(args[1] || 'origin', args[2]);
            case 'tag':
                return git.tag(args[1], args[2]);
            default:
                return { success: false, output: `git: '${sub}' não é um comando git. Digite 'help'.` };
        }
    }

    function parseEchoCommand(parts) {
        let content = "";
        let filename = "";
        let append = false;

        const str = parts.join(' ');
        const appendMatch = str.match(/echo\s+([\s\S]+?)\s+>>\s+([^\s]+)/i);
        const writeMatch = str.match(/echo\s+([\s\S]+?)\s+>\s+([^\s]+)/i);

        if (appendMatch) {
            content = appendMatch[1];
            filename = appendMatch[2];
            append = true;
        } else if (writeMatch) {
            content = writeMatch[1];
            filename = writeMatch[2];
            append = false;
        } else {
            content = parts.slice(1).join(' ');
        }

        return { content, filename, append };
    }

    function handleTabCompletion() {
        const val = terminalInput.value;
        const suggestions = [
            'git init', 'git status', 'git add .', 'git commit -m ""',
            'git branch', 'git checkout', 'git switch', 'git merge',
            'git log --oneline', 'git diff', 'git stash', 'git reset',
            'git remote add origin', 'git push origin main', 'git tag'
        ];

        const match = suggestions.find(s => s.startsWith(val) && s !== val);
        if (match) {
            terminalInput.value = match;
        }
    }

    function printToTerminal(text, type = 'output') {
        const line = document.createElement('div');
        
        // Formatar cores ANSI básicas
        let formatted = text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\x1b\[32m/g, '<span class="text-emerald-400">')
            .replace(/\x1b\[31m/g, '<span class="text-rose-400">')
            .replace(/\x1b\[33m/g, '<span class="text-yellow-400">')
            .replace(/\x1b\[36m/g, '<span class="text-cyan-400">')
            .replace(/\x1b\[0m/g, '</span>');

        if (type === 'command') {
            line.className = 'text-git-blue font-semibold mt-2';
            line.innerHTML = formatted;
        } else if (type === 'error') {
            line.className = 'text-rose-400 whitespace-pre-wrap';
            line.innerHTML = formatted;
        } else {
            line.className = 'text-slate-300 whitespace-pre-wrap';
            line.innerHTML = formatted;
        }

        terminalOutput.appendChild(line);
    }

    // ========================================================================
    // 6. RENDERIZADOR DO GRAFO DAG (SVG)
    // ========================================================================
    function renderDAGGraph(state) {
        activeBranchName.textContent = state.currentBranch || 'nenhum';
        lastCommitHash.textContent = state.currentCommit || 'nenhum';
        currentHeadBadge.textContent = state.HEAD.type === 'branch' ? `HEAD -> ${state.HEAD.target}` : `HEAD (detached @ ${state.HEAD.target})`;

        const commitKeys = Object.keys(state.commits);

        if (commitKeys.length === 0) {
            dagSvg.innerHTML = '';
            graphEmptyMsg.classList.remove('hidden');
            return;
        }

        graphEmptyMsg.classList.add('hidden');
        dagSvg.innerHTML = '';

        // Calcular posições dos nós do Grafo
        // Eixo X = ordem cronológica dos commits
        // Eixo Y = faixas de ramos (main = 100, feature-1 = 170, feature-2 = 240, etc.)
        const branchYMap = { 'main': 100 };
        let nextY = 170;

        Object.keys(state.branches).forEach(b => {
            if (!branchYMap[b]) {
                branchYMap[b] = nextY;
                nextY += 70;
            }
        });

        const commitCoords = {};
        let currentX = 60;
        const spacingX = 110;

        commitKeys.forEach(hash => {
            const c = state.commits[hash];
            const branch = c.branch || 'main';
            const y = branchYMap[branch] || 100;
            commitCoords[hash] = { x: currentX, y: y, commit: c };
            currentX += spacingX;
        });

        // Ajustar largura dinâmica do SVG se necessário
        dagSvg.setAttribute('viewBox', `0 0 ${Math.max(currentX + 80, 600)} ${Math.max(nextY + 40, 320)}`);

        // 1. Desenhar Linhas / Arestas (Edges) entre pais e filhos
        commitKeys.forEach(hash => {
            const childCoord = commitCoords[hash];
            const childCommit = state.commits[hash];

            if (childCommit.parentIds) {
                childCommit.parentIds.forEach(parentHash => {
                    const parentCoord = commitCoords[parentHash];
                    if (parentCoord) {
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        // Curva Bezier cúbica suave
                        const d = `M ${parentCoord.x} ${parentCoord.y} C ${parentCoord.x + 50} ${parentCoord.y}, ${childCoord.x - 50} ${childCoord.y}, ${childCoord.x} ${childCoord.y}`;
                        path.setAttribute('d', d);
                        path.setAttribute('fill', 'none');
                        path.setAttribute('stroke', childCommit.parentIds.length > 1 ? '#c084fc' : '#38bdf8');
                        path.setAttribute('stroke-width', '3');
                        path.setAttribute('class', 'graph-edge');
                        dagSvg.appendChild(path);
                    }
                });
            }
        });

        // 2. Desenhar Nós de Commits
        commitKeys.forEach(hash => {
            const coord = commitCoords[hash];
            const isHead = state.currentCommit === hash;
            const isMerge = coord.commit.parentIds && coord.commit.parentIds.length > 1;

            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'commit-node');
            group.setAttribute('data-hash', hash);

            // Círculo Externo (Glow se for HEAD)
            if (isHead) {
                const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                glowCircle.setAttribute('cx', coord.x);
                glowCircle.setAttribute('cy', coord.y);
                glowCircle.setAttribute('r', '20');
                glowCircle.setAttribute('fill', 'none');
                glowCircle.setAttribute('stroke', '#facc15');
                glowCircle.setAttribute('stroke-width', '2');
                glowCircle.setAttribute('stroke-dasharray', '3 3');
                group.appendChild(glowCircle);
            }

            // Círculo Principal
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', coord.x);
            circle.setAttribute('cy', coord.y);
            circle.setAttribute('r', '14');
            circle.setAttribute('fill', isMerge ? '#c084fc' : (isHead ? '#facc15' : '#39d353'));
            circle.setAttribute('stroke', '#0B0F19');
            circle.setAttribute('stroke-width', '3');
            group.appendChild(circle);

            // Texto do Hash SHA
            const textHash = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textHash.setAttribute('x', coord.x);
            textHash.setAttribute('y', coord.y + 30);
            textHash.setAttribute('text-anchor', 'middle');
            textHash.setAttribute('fill', '#94a3b8');
            textHash.setAttribute('font-size', '10px');
            textHash.setAttribute('font-family', 'Fira Code');
            textHash.textContent = hash;
            group.appendChild(textHash);

            // Texto da Mensagem (Snippet truncado)
            const textMsg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textMsg.setAttribute('x', coord.x);
            textMsg.setAttribute('y', coord.y - 22);
            textMsg.setAttribute('text-anchor', 'middle');
            textMsg.setAttribute('fill', '#e2e8f0');
            textMsg.setAttribute('font-size', '10px');
            textMsg.setAttribute('font-weight', 'bold');
            const cleanMsg = coord.commit.message.length > 14 ? coord.commit.message.substring(0, 12) + '..' : coord.commit.message;
            textMsg.textContent = cleanMsg;
            group.appendChild(textMsg);

            // Badges dos Ponteiros de Branches e Tags
            const branchBadges = [];
            for (const [bName, bHash] of Object.entries(state.branches)) {
                if (bHash === hash) {
                    const isCurBranch = state.HEAD.type === 'branch' && state.HEAD.target === bName;
                    branchBadges.push({ text: isCurBranch ? `${bName}*` : bName, color: isCurBranch ? '#39d353' : '#38bdf8' });
                }
            }

            for (const [tName, tHash] of Object.entries(state.tags)) {
                if (tHash === hash) {
                    branchBadges.push({ text: `tag: ${tName}`, color: '#facc15' });
                }
            }

            if (branchBadges.length > 0) {
                let badgeY = coord.y - 38;
                branchBadges.forEach(b => {
                    const tagRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    const textWidth = b.text.length * 6 + 12;
                    tagRect.setAttribute('x', coord.x - textWidth / 2);
                    tagRect.setAttribute('y', badgeY - 11);
                    tagRect.setAttribute('width', textWidth);
                    tagRect.setAttribute('height', '15');
                    tagRect.setAttribute('rx', '4');
                    tagRect.setAttribute('fill', b.color);
                    tagRect.setAttribute('opacity', '0.9');
                    group.appendChild(tagRect);

                    const tagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    tagText.setAttribute('x', coord.x);
                    tagText.setAttribute('y', badgeY);
                    tagText.setAttribute('text-anchor', 'middle');
                    tagText.setAttribute('fill', '#0B0F19');
                    tagText.setAttribute('font-size', '9px');
                    tagText.setAttribute('font-weight', 'bold');
                    tagText.setAttribute('font-family', 'Fira Code');
                    tagText.textContent = b.text;
                    group.appendChild(tagText);

                    badgeY -= 18;
                });
            }

            // Click listener para abrir o Commit Inspector Modal
            group.addEventListener('click', () => {
                inspectCommit(hash, coord.commit);
            });

            dagSvg.appendChild(group);
        });
    }

    function inspectCommit(hash, commit) {
        document.getElementById('insp-hash').textContent = hash;
        document.getElementById('insp-message').textContent = commit.message;
        document.getElementById('insp-author').textContent = commit.author;
        document.getElementById('insp-date').textContent = new Date(commit.timestamp).toLocaleString('pt-BR');
        document.getElementById('insp-parents').textContent = commit.parentIds && commit.parentIds.length > 0 ? commit.parentIds.join(', ') : 'Nenhum (Root Commit)';

        const treeContainer = document.getElementById('insp-tree');
        treeContainer.innerHTML = '';
        if (commit.tree && Object.keys(commit.tree).length > 0) {
            for (const [fileName, content] of Object.entries(commit.tree)) {
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center py-1 border-b border-gray-900';
                item.innerHTML = `<span>📄 ${fileName}</span><span class="text-gray-500 text-[10px]">${content.length} bytes</span>`;
                treeContainer.appendChild(item);
            }
        } else {
            treeContainer.innerHTML = '<span class="text-gray-500 italic">Árvore vazia.</span>';
        }

        commitInspectorModal.classList.remove('hidden');
        setTimeout(() => commitInspectorModal.classList.remove('opacity-0'), 10);
    }

    // ========================================================================
    // 7. ARQUITETURA DE ÁREAS (Working, Stage, Repo, Remote)
    // ========================================================================
    function renderArchitectureBoxes(state) {
        const workingCount = Object.keys(state.workingDirectory).length;
        const stagingCount = Object.keys(state.stagingArea).length;
        const commitsCount = Object.keys(state.commits).length;

        countWorkingDir.textContent = workingCount;
        countStaging.textContent = stagingCount;
        countCommits.textContent = commitsCount;

        const hasRemote = state.remotes && state.remotes['origin'];
        if (hasRemote) {
            statusRemote.textContent = "Conectado";
            statusRemote.className = "my-1 font-mono text-xs font-bold text-git-green";
        } else {
            statusRemote.textContent = "Desconectado";
            statusRemote.className = "my-1 font-mono text-xs font-bold text-gray-500";
        }

        // Active glow on active areas
        document.getElementById('box-working-dir').classList.toggle('active-stage', workingCount > 0);
        document.getElementById('box-staging-area').classList.toggle('active-stage', stagingCount > 0);
        document.getElementById('box-local-repo').classList.toggle('active-stage', commitsCount > 0);
        document.getElementById('box-remote-repo').classList.toggle('active-stage', hasRemote);
    }

    // ========================================================================
    // 8. EXPLORADOR DE ARQUIVOS VIRTUAIS & LIVE DIFF
    // ========================================================================
    function renderVirtualFiles(state) {
        virtualFilesList.innerHTML = '';
        const files = Object.keys(state.workingDirectory);

        if (files.length === 0) {
            virtualFilesList.innerHTML = '<div class="text-gray-500 text-xs text-center py-4">Nenhum arquivo no diretório de trabalho.</div>';
        } else {
            files.forEach(filename => {
                const content = state.workingDirectory[filename];
                const isStaged = state.stagingArea[filename] !== undefined;

                const fileItem = document.createElement('div');
                fileItem.className = 'flex items-center justify-between p-2 rounded-xl bg-gray-950 border border-gray-800 text-xs font-mono';
                fileItem.innerHTML = `
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-file-code text-cyan-400"></i>
                        <span class="text-white">${filename}</span>
                        ${isStaged ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Staged</span>' : '<span class="text-[10px] px-1.5 py-0.2 rounded bg-yellow-950 text-yellow-400 border border-yellow-800">Untracked/Mod</span>'}
                    </div>
                    <button class="edit-file-btn text-gray-400 hover:text-cyan-400 text-xs p-1" data-filename="${filename}" title="Editar Conteúdo">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                `;
                virtualFilesList.appendChild(fileItem);
            });

            virtualFilesList.querySelectorAll('.edit-file-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const fn = btn.getAttribute('data-filename');
                    const currentContent = state.workingDirectory[fn] || '';
                    const newContent = prompt(`Editar arquivo "${fn}":`, currentContent);
                    if (newContent !== null) {
                        git.echo(newContent, fn, false);
                    }
                });
            });
        }

        // Live Diff
        const diffRes = git.diff();
        diffOutputDisplay.textContent = diffRes.output;
    }

    createFileUiBtn.addEventListener('click', () => {
        const filename = prompt("Digite o nome do novo arquivo (ex: index.js, style.css):");
        if (filename && filename.trim()) {
            git.touch(filename.trim());
        }
    });

    refreshDiffBtn.addEventListener('click', () => {
        diffOutputDisplay.textContent = git.diff().output;
    });

    // ========================================================================
    // 9. SISTEMA DE MISSÕES GUIADAS
    // ========================================================================
    function setupMissions() {
        missionSelector.innerHTML = '';
        missions.forEach((m, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `Missão ${m.id}: ${m.title}`;
            missionSelector.appendChild(opt);
        });

        missionSelector.addEventListener('change', () => {
            loadMission(parseInt(missionSelector.value));
        });

        nextMissionBtn.addEventListener('click', () => {
            if (currentMissionIndex < missions.length - 1) {
                currentMissionIndex++;
                missionSelector.value = currentMissionIndex;
                loadMission(currentMissionIndex);
            }
        });

        loadMission(0);
    }

    function loadMission(index) {
        currentMissionIndex = index;
        const m = missions[index];

        missionNumberBadge.textContent = `Missão ${m.id} de ${missions.length}`;
        missionTitle.textContent = m.title;
        missionGoal.innerHTML = m.goal;
        missionConcept.innerHTML = m.concept;

        missionCommands.innerHTML = '';
        m.commands.forEach(cmd => {
            const li = document.createElement('li');
            li.innerHTML = `<code>${cmd}</code>`;
            missionCommands.appendChild(li);
        });

        validateCurrentMission(git.getState());
    }

    function validateCurrentMission(state) {
        const m = missions[currentMissionIndex];
        if (!m) return;

        const isComplete = m.validator(state);

        if (isComplete) {
            missionStatusIndicator.innerHTML = `
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-bold text-emerald-400">Missão Concluída! 🎉</span>
            `;
            nextMissionBtn.disabled = false;
            missionBadgeDot.classList.remove('bg-git-orange');
            missionBadgeDot.classList.add('bg-emerald-400');
        } else {
            missionStatusIndicator.innerHTML = `
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
                <span class="text-xs font-semibold text-yellow-400">Em andamento...</span>
            `;
            nextMissionBtn.disabled = true;
            missionBadgeDot.classList.remove('bg-emerald-400');
            missionBadgeDot.classList.add('bg-git-orange');
        }
    }

    // ========================================================================
    // 10. ABAS & MODAIS
    // ========================================================================
    function setupTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active', 'text-git-orange', 'text-cyan-400', 'text-white'));
                tabPanes.forEach(p => p.classList.add('hidden'));

                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(`tab-${tabId}`);
                if (targetPane) targetPane.classList.remove('hidden');

                if (tabId === 'terminal') {
                    terminalInput.focus();
                }
            });
        });

        document.getElementById('mode-missions-btn').addEventListener('click', () => {
            document.querySelector('.tab-btn[data-tab="mission"]').click();
        });

        document.getElementById('mode-sandbox-btn').addEventListener('click', () => {
            document.querySelector('.tab-btn[data-tab="terminal"]').click();
        });
    }

    function setupModals() {
        openCheatsheetBtn.addEventListener('click', () => {
            cheatsheetModal.classList.remove('hidden');
            setTimeout(() => cheatsheetModal.classList.remove('opacity-0'), 10);
        });

        cheatsheetClose.addEventListener('click', () => {
            cheatsheetModal.classList.add('opacity-0');
            setTimeout(() => cheatsheetModal.classList.add('hidden'), 300);
        });

        cheatsheetModal.addEventListener('click', (e) => {
            if (e.target === cheatsheetModal) cheatsheetClose.click();
        });

        commitInspectorClose.addEventListener('click', () => {
            commitInspectorModal.classList.add('opacity-0');
            setTimeout(() => commitInspectorModal.classList.add('hidden'), 300);
        });

        commitInspectorModal.addEventListener('click', (e) => {
            if (e.target === commitInspectorModal) commitInspectorClose.click();
        });

        resetRepoBtn.addEventListener('click', () => {
            if (confirm("Deseja resetar todo o laboratório de Git para o estado inicial?")) {
                git.resetState();
                git.init();
                terminalOutput.innerHTML = '';
                printToTerminal("Repositório reinicializado. Comece com 'git status' ou siga as missões.", 'output');
            }
        });
    }

    // ========================================================================
    // 11. BIBLIOTECA DE PADRÕES & CONSTRUTOR / LINTER (Conventional Commits)
    // ========================================================================
    const commitTypesData = {
        feat: {
            title: "feat: Nova Funcionalidade",
            description: "Usado quando você adiciona um novo recurso ou funcionalidade perceptível para o usuário final ou para a API.",
            semver: "SemVer: MINOR (0.X.0)",
            semverClass: "bg-emerald-950 text-emerald-400 border-emerald-800",
            example: 'feat(auth): implementa login social com GitHub',
            colorClass: "text-emerald-400"
        },
        fix: {
            title: "fix: Correção de Bug",
            description: "Usado quando você corrige um defeito, erro em tempo de execução ou comportamento incorreto no sistema.",
            semver: "SemVer: PATCH (0.0.X)",
            semverClass: "bg-rose-950 text-rose-400 border-rose-800",
            example: 'fix(cart): corrige calculo de frete com desconto',
            colorClass: "text-rose-400"
        },
        docs: {
            title: "docs: Documentação",
            description: "Usado para mudanças puramente em documentação, como README, JSDoc, Swagger, wikis ou comentários.",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'docs: adiciona guia de instalacao do Docker no README',
            colorClass: "text-yellow-400"
        },
        style: {
            title: "style: Estilo e Formatação de Código",
            description: "ATENÇÃO: NÃO é para estilização CSS/UI! Refere-se a formatação de código que não altera lógica (espaços, ponto-e-vírgula, linter).",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'style: formata indentacao com Prettier e remove imports orfaos',
            colorClass: "text-sky-400"
        },
        refactor: {
            title: "refactor: Refatoração de Código",
            description: "Mudança estrutural no código que melhora a legibilidade ou arquitetura sem adicionar features nem corrigir bugs.",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'refactor(db): modulariza camada de acesso a dados em repositories',
            colorClass: "text-purple-400"
        },
        perf: {
            title: "perf: Melhoria de Desempenho",
            description: "Alteração de código estritamente focada em otimizar velocidade de processamento, queries ou consumo de memória.",
            semver: "SemVer: PATCH (0.0.X)",
            semverClass: "bg-orange-950 text-orange-400 border-orange-800",
            example: 'perf(query): adiciona indices compostos na busca de produtos',
            colorClass: "text-orange-400"
        },
        test: {
            title: "test: Testes Automatizados",
            description: "Adiciona novos testes ou corrige testes automatizados existentes (unitários, integração, end-to-end).",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'test(auth): adiciona testes unitarios para validacao de senha forte',
            colorClass: "text-teal-400"
        },
        chore: {
            title: "chore: Tarefas e Manutenção Geral",
            description: "Tarefas rotineiras que não alteram código de produção, como atualizar dependências, scripts de auxílio e .gitignore.",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'chore: atualiza dependencia do tailwindcss para v3.4',
            colorClass: "text-slate-400"
        },
        build: {
            title: "build: Sistema de Build & Empacotamento",
            description: "Mudanças que afetam o sistema de build ou dependências externas (Vite, Webpack, npm, Gradle, Maven).",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'build: configura vite para gerar bundles otimizados de producao',
            colorClass: "text-pink-400"
        },
        ci: {
            title: "ci: Integração Contínua (CI/CD)",
            description: "Mudanças em scripts e arquivos de configuração de CI/CD (GitHub Actions, GitLab CI, CircleCI, Docker).",
            semver: "SemVer: Sem impacto",
            semverClass: "bg-gray-800 text-gray-400 border-gray-700",
            example: 'ci: adiciona pipeline de teste automatizado no pull request',
            colorClass: "text-indigo-400"
        },
        revert: {
            title: "revert: Reversão de Commit",
            description: "Reverte um commit anterior que causou problemas ou que foi descartado da release.",
            semver: "SemVer: Conforme commit original",
            semverClass: "bg-rose-950 text-rose-400 border-rose-800",
            example: 'revert: reverte commit a1b2c3d devido a instabilidade em producao',
            colorClass: "text-rose-400"
        }
    };

    function setupCommitStandardsAndLinter() {
        const typePills = document.querySelectorAll('.commit-type-pill');
        const builderType = document.getElementById('builder-type');
        const builderScope = document.getElementById('builder-scope');
        const builderMessage = document.getElementById('builder-message');
        const builderBreaking = document.getElementById('builder-breaking');
        const generatedCmd = document.getElementById('generated-commit-cmd');
        const charCounter = document.getElementById('char-counter');
        const sendToTerminalBtn = document.getElementById('send-to-terminal-btn');
        const copyCmdBtn = document.getElementById('copy-cmd-btn');
        const quickDocModalBtn = document.getElementById('quick-doc-modal-btn');

        let selectedType = 'feat';

        // Atualizar Card Explicativo
        const updateTypeCard = (type) => {
            const data = commitTypesData[type] || commitTypesData.feat;
            document.getElementById('type-badge-name').textContent = data.title;
            document.getElementById('type-badge-name').className = `font-mono font-bold ${data.colorClass}`;
            
            const semverEl = document.getElementById('type-semver-impact');
            semverEl.textContent = data.semver;
            semverEl.className = `text-[10px] px-2 py-0.2 rounded-full border ${data.semverClass}`;

            document.getElementById('type-description-text').textContent = data.description;
            document.getElementById('type-example-text').innerHTML = `Exemplo: <code>${data.example}</code>`;
            builderType.value = type;
            builderType.className = `w-full bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 ${data.colorClass} font-mono font-bold text-xs outline-none`;
        };

        // Live Generator & Linter Validation
        const updateBuilder = () => {
            const type = selectedType;
            const scope = builderScope.value.trim();
            const message = builderMessage.value.trim();
            const isBreaking = builderBreaking.checked;

            const scopePart = scope ? `(${scope})` : '';
            const breakingMark = isBreaking ? '!' : '';
            const cleanMsg = message || 'sua mensagem aqui';

            const header = `${type}${scopePart}${breakingMark}: ${cleanMsg}`;
            const fullCommand = `git commit -m "${header}"`;
            generatedCmd.textContent = fullCommand;

            // Character counter
            const len = header.length;
            charCounter.textContent = `${len} / 72`;
            charCounter.className = len > 72 ? 'text-[10px] font-mono text-rose-400 font-bold' : 'text-[10px] font-mono text-gray-500';

            // Linting Rules Check
            const hasValidPrefix = !!commitTypesData[type];
            const isLowerCase = message.length === 0 || /^[a-z0-9]/.test(message);
            const hasNoDot = !message.endsWith('.');
            const isLengthOk = len <= 72;

            setRuleState('rule-prefix', hasValidPrefix);
            setRuleState('rule-lowercase', isLowerCase);
            setRuleState('rule-no-dot', hasNoDot);
            setRuleState('rule-length', isLengthOk);
        };

        const setRuleState = (ruleId, isValid) => {
            const el = document.getElementById(ruleId);
            if (!el) return;
            if (isValid) {
                el.className = 'linter-rule flex items-center gap-1.5 linter-valid';
                el.querySelector('i').className = 'fa-solid fa-circle-check text-xs text-emerald-400';
            } else {
                el.className = 'linter-rule flex items-center gap-1.5 text-rose-400 font-bold';
                el.querySelector('i').className = 'fa-solid fa-circle-xmark text-xs text-rose-400';
            }
        };

        // Pills Click Listener
        typePills.forEach(pill => {
            pill.addEventListener('click', () => {
                typePills.forEach(p => p.classList.remove('active-type'));
                pill.classList.add('active-type');
                selectedType = pill.getAttribute('data-type');
                updateTypeCard(selectedType);
                updateBuilder();
            });
        });

        // Inputs Listener
        [builderScope, builderMessage, builderBreaking].forEach(inp => {
            if (inp) {
                inp.addEventListener('input', updateBuilder);
                inp.addEventListener('change', updateBuilder);
            }
        });

        // Send to Terminal
        sendToTerminalBtn.addEventListener('click', () => {
            const cmd = generatedCmd.textContent.trim();
            document.querySelector('.tab-btn[data-tab="terminal"]').click();
            terminalInput.value = cmd;
            terminalInput.focus();
        });

        // Copy Command
        copyCmdBtn.addEventListener('click', () => {
            const cmd = generatedCmd.textContent.trim();
            navigator.clipboard.writeText(cmd).then(() => {
                copyCmdBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i>';
                setTimeout(() => {
                    copyCmdBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 1500);
            });
        });

        if (quickDocModalBtn) {
            quickDocModalBtn.addEventListener('click', () => {
                openCheatsheetBtn.click();
            });
        }

        // Initial trigger
        updateTypeCard('feat');
        updateBuilder();
    }

});
