const graphData = {
    nodes: [
        { id: 'ana', label: 'Ana Lima', type: 'person', icon: 'fa-user', x: 15, y: 30, properties: { papel: 'Estudante', interesse: 'IA aplicada', curso: 'Engenharia de Software' } },
        { id: 'bruno', label: 'Bruno Costa', type: 'person', icon: 'fa-user', x: 18, y: 73, properties: { papel: 'Desenvolvedor', interesse: 'Dados', curso: 'Ciência da Computação' } },
        { id: 'neo4j', label: 'Neo4j', type: 'tech', icon: 'fa-database', x: 47, y: 25, properties: { categoria: 'Banco de Grafos', linguagem: 'Cypher', modelo: 'Nós e relações' } },
        { id: 'rag', label: 'RAG', type: 'concept', icon: 'fa-brain', x: 50, y: 65, properties: { categoria: 'Arquitetura de IA', objetivo: 'Respostas fundamentadas', etapas: 'Retrieve + Generate' } },
        { id: 'cypher', label: 'Cypher', type: 'tech', icon: 'fa-code', x: 78, y: 20, properties: { categoria: 'Linguagem de consulta', usado_em: 'Neo4j', padrão: 'MATCH - relação - MATCH' } },
        { id: 'graphRag', label: 'GraphRAG', type: 'project', icon: 'fa-diagram-project', x: 80, y: 70, properties: { categoria: 'Sistema de recuperação', combina: 'Grafos e RAG', vantagem: 'Perguntas multi-hop' } }
    ],
    edges: [
        { from: 'ana', to: 'neo4j', label: 'APRENDE' },
        { from: 'ana', to: 'rag', label: 'ESTUDA' },
        { from: 'bruno', to: 'neo4j', label: 'USA' },
        { from: 'bruno', to: 'rag', label: 'CONSTRÓI' },
        { from: 'neo4j', to: 'cypher', label: 'CONSULTADO_COM' },
        { from: 'rag', to: 'graphRag', label: 'COMPÕE' },
        { from: 'neo4j', to: 'graphRag', label: 'POTENCIALIZA' }
    ]
};

const knowledgeBase = [
    { id: 'doc-01', title: 'Banco de dados em grafo', text: 'Bancos de dados em grafo representam entidades como nós e seus vínculos como relações com direção, tipo e propriedades. Eles são eficientes para atravessar conexões profundas, como recomendações, redes sociais e detecção de fraude.', keywords: ['grafo', 'banco', 'nó', 'nós', 'relação', 'relacionamento', 'graph'] },
    { id: 'doc-02', title: 'Cypher e padrões de consulta', text: 'Cypher é uma linguagem declarativa de grafos. MATCH descreve padrões a encontrar, como (p:Pessoa)-[:APRENDE]->(t:Tecnologia), e RETURN define os dados devolvidos.', keywords: ['cypher', 'match', 'consulta', 'linguagem', 'neo4j'] },
    { id: 'doc-03', title: 'RAG: recuperação antes da geração', text: 'Retrieval-Augmented Generation recupera trechos relevantes de documentos antes de gerar uma resposta. O contexto recuperado reduz alucinações e permite citar as fontes usadas.', keywords: ['rag', 'alucinação', 'alucinações', 'contexto', 'recuperação', 'documento', 'resposta'] },
    { id: 'doc-04', title: 'Embeddings e similaridade semântica', text: 'Embeddings são vetores numéricos que codificam significado. Uma busca vetorial compara a pergunta com os chunks indexados para recuperar conteúdo semanticamente próximo, mesmo sem palavras idênticas.', keywords: ['embedding', 'embeddings', 'vetor', 'vetorial', 'similaridade', 'chunk', 'chunks'] },
    { id: 'doc-05', title: 'GraphRAG e perguntas multi-hop', text: 'GraphRAG combina busca por conteúdo com relações explícitas do grafo. Isso permite responder perguntas multi-hop que exigem conectar múltiplas entidades, como pessoas, tecnologias, documentos e projetos.', keywords: ['graphrag', 'multi-hop', 'relação', 'relações', 'neo4j', 'grafo', 'projeto'] }
];

const cypherPresets = {
    students: 'MATCH (p:Pessoa)-[:APRENDE]->(t:Tecnologia)\nRETURN p.nome, t.nome;',
    neo4j: 'MATCH (p:Pessoa)-[:USA]->(t:Tecnologia {nome: "Neo4j"})\nRETURN p.nome, t.nome;',
    paths: 'MATCH (p:Pessoa)-[*1..3]->(r:RAG)\nRETURN p, r;',
    all: 'MATCH (n)\nRETURN n.nome, labels(n);'
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const labelToType = { Pessoa: 'person', Tecnologia: 'tech', Conceito: 'concept', Projeto: 'project' };
const typeToLabel = { person: 'Pessoa', tech: 'Tecnologia', concept: 'Conceito', project: 'Projeto' };

const cypherLibrary = [
    { command: 'MATCH', description: 'Localiza nós e relações que correspondem a um padrão.', template: 'MATCH (n)\nRETURN n.nome, labels(n);' },
    { command: 'Relação Tipada', description: 'Percorre apenas uma conexão específica, como APRENDE ou USA.', template: 'MATCH (p:Pessoa)-[:APRENDE]->(t:Tecnologia)\nRETURN p.nome, t.nome;' },
    { command: 'WHERE', description: 'Filtra nós pelas propriedades, como nome, curso ou categoria.', template: 'MATCH (p:Pessoa)-[:USA]->(t:Tecnologia)\nWHERE t.nome = "Neo4j"\nRETURN p.nome, t.nome;' },
    { command: 'RETURN', description: 'Define campos, relações ou caminhos que devem aparecer no resultado.', template: 'MATCH (p:Pessoa)-[r]->(t)\nRETURN p.nome, type(r), t.nome;' },
    { command: 'CREATE Nó', description: 'Cria uma nova entidade no grafo com rótulo e propriedades.', template: 'CREATE (n:Pessoa {nome: "Lia", curso: "Dados"})\nRETURN n;' },
    { command: 'CREATE Relação', description: 'Conecta duas entidades já existentes por uma relação tipada.', template: 'MATCH (a:Pessoa {nome: "Ana Lima"}), (b:Tecnologia {nome: "Neo4j"})\nCREATE (a)-[:RECOMENDA]->(b)\nRETURN a, b;' },
    { command: 'Caminho Multi-hop', description: 'Percorre de uma a três relações para responder perguntas conectadas.', template: 'MATCH (p:Pessoa)-[*1..3]->(g:Projeto)\nRETURN p.nome, g.nome;' },
    { command: 'DELETE', description: 'Remove um nó ou relação. Em Neo4j, use DETACH DELETE para remover um nó e suas conexões.', template: 'MATCH (n:Pessoa {nome: "Lia"})\nDETACH DELETE n;' }
];

const lessons = {
    match: '<strong>MATCH é o ponto de partida.</strong> Ele descreve a forma que queremos localizar. <code>(p:Pessoa)</code> significa “um nó chamado p com o rótulo Pessoa”. Pense nisso como selecionar uma tabela, mas navegando por entidades conectadas.',
    relation: '<strong>Relações são cidadãos de primeira classe.</strong> <code>-[:APRENDE]-&gt;</code> não é apenas uma chave estrangeira: possui tipo, direção e pode ter propriedades próprias, como data ou nível de domínio.',
    where: '<strong>WHERE filtra propriedades.</strong> Depois de encontrar um padrão, restrinja o resultado por valores: <code>WHERE t.nome = "Neo4j"</code>. Isso evita trazer subgrafos que não interessam à pergunta.',
    return: '<strong>RETURN decide o que será apresentado.</strong> Você pode devolver propriedades, tipos de relação ou o caminho completo. É a etapa que transforma uma travessia em informação útil para o usuário.'
};

class CypherSandboxEngine {
    execute(rawQuery) {
        const query = rawQuery.trim();
        if (!query) return { headers: ['status'], rows: [['Consulta vazia']], message: 'Digite uma consulta Cypher.' };
        if (/^CREATE\s*\(/i.test(query)) return this.createNode(query);
        if (/DETACH\s+DELETE/i.test(query)) return this.deleteNode(query);
        if (/\bCREATE\s*\(/i.test(query) && /\bMATCH\b/i.test(query)) return this.createRelation(query);
        return this.match(query);
    }

    match(query) {
        const labels = [...query.matchAll(/\(\s*\w*\s*:\s*(\w+)/g)].map(match => match[1]);
        const relations = [...query.matchAll(/\[\s*(?:\w+\s*:\s*)?(\w+)\s*\]/g)].map(match => match[1]);
        const propertyMatch = query.match(/WHERE\s+\w+\.(\w+)\s*=\s*["']([^"']+)["']/i) || query.match(/\{\s*(\w+)\s*:\s*["']([^"']+)["']\s*\}/i);
        const hasPattern = relations.length > 0;
        let rows = [];

        if (hasPattern) {
            rows = graphData.edges.filter(edge => {
                const from = graphData.nodes.find(node => node.id === edge.from);
                const to = graphData.nodes.find(node => node.id === edge.to);
                const firstLabel = labels[0] ? labelToType[labels[0]] : null;
                const lastLabel = labels[labels.length - 1] ? labelToType[labels[labels.length - 1]] : null;
                const matchesRelation = !relations[0] || edge.label === relations[0];
                const matchesLabels = (!firstLabel || from.type === firstLabel) && (!lastLabel || to.type === lastLabel);
                const matchesProperty = !propertyMatch || [from, to].some(node => String(node.properties[propertyMatch[1]] || node.label).toLowerCase() === propertyMatch[2].toLowerCase());
                return matchesRelation && matchesLabels && matchesProperty;
            }).map(edge => {
                const from = graphData.nodes.find(node => node.id === edge.from);
                const to = graphData.nodes.find(node => node.id === edge.to);
                return [from.label, edge.label, to.label];
            });
            return { headers: ['nó inicial', 'relação', 'nó final'], rows, message: `${rows.length} padrão(ões) de relação encontrado(s).` };
        }

        rows = graphData.nodes.filter(node => {
            const typeMatch = !labels[0] || node.type === labelToType[labels[0]];
            const propMatch = !propertyMatch || String(node.properties[propertyMatch[1]] || node.label).toLowerCase() === propertyMatch[2].toLowerCase();
            return typeMatch && propMatch;
        }).map(node => [node.label, `:${typeToLabel[node.type]}`, Object.entries(node.properties).map(([key, value]) => `${key}: ${value}`).join(' · ')]);
        return { headers: ['nome', 'rótulo', 'propriedades'], rows, message: `${rows.length} nó(s) encontrado(s).` };
    }

    createNode(query) {
        const match = query.match(/CREATE\s*\(\s*\w+\s*:\s*(\w+)\s*\{([^}]*)\}/i);
        if (!match) return { headers: ['erro'], rows: [['Use CREATE (n:Rotulo {nome: "Valor"})']], message: 'Sintaxe CREATE não reconhecida.' };
        const label = match[1];
        const type = labelToType[label] || 'concept';
        const properties = {};
        match[2].split(',').forEach(pair => {
            const [key, value] = pair.split(':').map(part => part.trim());
            if (key && value) properties[key] = value.replace(/["']/g, '');
        });
        const node = { id: `node-${Date.now()}`, label: properties.nome || `Novo ${label}`, type, icon: type === 'person' ? 'fa-user' : type === 'tech' ? 'fa-microchip' : type === 'project' ? 'fa-diagram-project' : 'fa-lightbulb', x: 45 + Math.random() * 18, y: 42 + Math.random() * 18, properties: { ...properties, criado_no_lab: 'sim' } };
        graphData.nodes.push(node);
        renderGraph(); updateStats();
        return { headers: ['nó criado', 'rótulo'], rows: [[node.label, `:${label}`]], message: 'Novo nó criado no grafo em memória.' };
    }

    createRelation(query) {
        const names = [...query.matchAll(/nome\s*:\s*["']([^"']+)["']/gi)].map(match => match[1]);
        const relation = query.match(/CREATE\s*\([^)]*\)-\[:\s*(\w+)\s*\]->\([^)]*\)/i);
        if (names.length < 2 || !relation) return { headers: ['erro'], rows: [['Use MATCH ... CREATE (a)-[:TIPO]->(b)']], message: 'Relação não criada: informe dois nós existentes e o tipo.' };
        const from = graphData.nodes.find(node => node.label.toLowerCase() === names[0].toLowerCase());
        const to = graphData.nodes.find(node => node.label.toLowerCase() === names[1].toLowerCase());
        if (!from || !to) return { headers: ['erro'], rows: [['Um ou ambos os nós não existem no grafo.']], message: 'Relação não criada.' };
        graphData.edges.push({ from: from.id, to: to.id, label: relation[1] });
        renderGraph(); updateStats();
        return { headers: ['origem', 'relação criada', 'destino'], rows: [[from.label, relation[1], to.label]], message: 'Relação adicionada ao grafo em memória.' };
    }

    deleteNode(query) {
        const match = query.match(/nome\s*:\s*["']([^"']+)["']/i);
        if (!match) return { headers: ['erro'], rows: [['Informe a propriedade nome para remover um nó.']], message: 'DELETE não executado.' };
        const index = graphData.nodes.findIndex(node => node.label.toLowerCase() === match[1].toLowerCase());
        if (index < 0) return { headers: ['erro'], rows: [['Nó não encontrado.']], message: 'DELETE não executado.' };
        const [removed] = graphData.nodes.splice(index, 1);
        graphData.edges = graphData.edges.filter(edge => edge.from !== removed.id && edge.to !== removed.id);
        renderGraph(); updateStats();
        return { headers: ['nó removido'], rows: [[removed.label]], message: 'Nó e relações conectadas removidos em memória.' };
    }
}

const cypherEngine = new CypherSandboxEngine();

function init() {
    renderGraph();
    bindTabs();
    bindCypher();
    setupCypherWorkshop();
    bindRag();
    updateStats();
}

function renderGraph() {
    const canvas = $('#graph-canvas');
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 600);
    const height = Math.max(rect.height, 360);
    const nodeById = Object.fromEntries(graphData.nodes.map(node => [node.id, node]));

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    graphData.edges.forEach(edge => {
        const from = nodeById[edge.from];
        const to = nodeById[edge.to];
        const x1 = width * from.x / 100;
        const y1 = height * from.y / 100;
        const x2 = width * to.x / 100;
        const y2 = height * to.y / 100;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 8;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        line.setAttribute('class', 'graph-edge');
        svg.appendChild(line);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', mx); label.setAttribute('y', my);
        label.setAttribute('class', 'graph-edge-label');
        label.textContent = edge.label;
        svg.appendChild(label);
    });

    canvas.innerHTML = '';
    canvas.appendChild(svg);

    graphData.nodes.forEach(node => {
        const element = document.createElement('button');
        element.className = `graph-node ${node.type}`;
        element.style.left = `${node.x}%`;
        element.style.top = `${node.y}%`;
        element.dataset.id = node.id;
        element.innerHTML = `<i class="fa-solid ${node.icon}"></i><strong>${node.label}</strong><small>${node.type.toUpperCase()}</small>`;
        element.addEventListener('click', () => inspectNode(node.id));
        canvas.appendChild(element);
    });
}

function inspectNode(nodeId) {
    const node = graphData.nodes.find(item => item.id === nodeId);
    if (!node) return;
    $$('.graph-node').forEach(el => el.classList.toggle('selected', el.dataset.id === nodeId));
    const related = graphData.edges.filter(edge => edge.from === nodeId || edge.to === nodeId).map(edge => {
        const otherId = edge.from === nodeId ? edge.to : edge.from;
        const other = graphData.nodes.find(item => item.id === otherId);
        const direction = edge.from === nodeId ? '→' : '←';
        return `${direction} ${edge.label} ${other.label}`;
    });
    $('#node-inspector').className = 'node-inspector';
    $('#node-inspector').innerHTML = `
        <span class="node-tag">:${node.type[0].toUpperCase() + node.type.slice(1)}</span>
        <h3><i class="fa-solid ${node.icon}"></i> ${node.label}</h3>
        <ul class="property-list">${Object.entries(node.properties).map(([key, value]) => `<li><span>${key}</span><strong>${value}</strong></li>`).join('')}</ul>
        <span class="panel-kicker">Relações (${related.length})</span>
        <ul class="relation-list">${related.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function updateStats() {
    $('#node-count').textContent = graphData.nodes.length;
    $('#edge-count').textContent = graphData.edges.length;
}

function bindTabs() {
    $$('.lab-tab').forEach(tab => tab.addEventListener('click', () => {
        $$('.lab-tab').forEach(item => item.classList.remove('active'));
        $$('.module-panel').forEach(item => item.classList.remove('active'));
        tab.classList.add('active');
        $(`#${tab.dataset.panel}`).classList.add('active');
        if (tab.dataset.panel === 'graph-panel') requestAnimationFrame(renderGraph);
    }));
}

function bindCypher() {
    const editor = $('#cypher-editor');
    $('#cypher-preset').addEventListener('change', event => editor.value = cypherPresets[event.target.value]);
    $('#format-cypher-btn').addEventListener('click', () => editor.value = formatCypher(editor.value));
    $('#run-cypher-btn').addEventListener('click', runCypher);
}

function formatCypher(query) {
    return query.trim()
        .replace(/\b(match|return|where|with|limit|order by|as)\b/gi, value => value.toUpperCase())
        .replace(/\s+(RETURN|WHERE|WITH|LIMIT|ORDER BY)\b/g, '\n$1')
        .replace(/;?\s*$/, ';');
}

function runCypher() {
    const result = cypherEngine.execute($('#cypher-editor').value);
    renderCypherResult(result);
}

function renderCypherResult(result) {
    $('#cypher-result-count').textContent = `${result.rows.length} ${result.rows.length === 1 ? 'linha' : 'linhas'}`;
    $('#cypher-result').innerHTML = `
        <p class="query-message">${result.message}</p>
        <table class="result-table"><thead><tr>${result.headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${result.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function setupCypherWorkshop() {
    const start = $('#builder-start-label');
    const relation = $('#builder-relation');
    const end = $('#builder-end-label');
    const filter = $('#builder-filter');
    const returnMode = $('#builder-return');
    const preview = $('#builder-query-preview');

    const buildQuery = () => {
        const startVar = 'a';
        const endVar = 'b';
        let where = '';
        const rawFilter = filter.value.trim();
        if (rawFilter) {
            const match = rawFilter.match(/^(nome|curso|categoria)\s*=\s*(.+)$/i);
            if (match) where = `\nWHERE ${endVar}.${match[1]} = "${match[2].replace(/["']/g, '')}"`;
        }
        const returning = returnMode.value === 'relacao'
            ? `${startVar}.nome, type(r), ${endVar}.nome`
            : returnMode.value === 'caminho'
                ? `${startVar}, r, ${endVar}`
                : `${startVar}.nome, ${endVar}.nome`;
        const query = `MATCH (${startVar}:${start.value})-[r:${relation.value}]->(${endVar}:${end.value})${where}\nRETURN ${returning};`;
        preview.textContent = query;
        return query;
    };

    [start, relation, end, filter, returnMode].forEach(element => {
        element.addEventListener('input', buildQuery);
        element.addEventListener('change', buildQuery);
    });

    $('#builder-to-editor-btn').addEventListener('click', () => {
        $('#cypher-editor').value = buildQuery();
        $('#cypher-editor').focus();
    });

    $('#builder-run-btn').addEventListener('click', () => {
        $('#cypher-editor').value = buildQuery();
        runCypher();
    });

    $$('.lesson-step').forEach(step => step.addEventListener('click', () => {
        $$('.lesson-step').forEach(item => item.classList.remove('active'));
        step.classList.add('active');
        $('#lesson-explanation').innerHTML = lessons[step.dataset.lesson];
    }));
    $('#lesson-explanation').innerHTML = lessons.match;

    const renderLibrary = (term = '') => {
        const filtered = cypherLibrary.filter(item => `${item.command} ${item.description}`.toLowerCase().includes(term.toLowerCase()));
        $('#command-library-list').innerHTML = filtered.map((item, index) => `<button class="command-item" data-library-index="${cypherLibrary.indexOf(item)}"><strong>${item.command}</strong><small>${item.description}</small></button>`).join('') || '<p class="empty-copy">Nenhum comando encontrado.</p>';
        $$('.command-item').forEach(button => button.addEventListener('click', () => {
            const item = cypherLibrary[Number(button.dataset.libraryIndex)];
            $('#cypher-editor').value = item.template;
            $('#cypher-editor').focus();
        }));
    };
    $('#command-search').addEventListener('input', event => renderLibrary(event.target.value));
    renderLibrary();
    buildQuery();
}

function bindRag() {
    $('#run-rag-btn').addEventListener('click', runRag);
    $$('.rag-suggestions button').forEach(button => button.addEventListener('click', () => {
        $('#rag-question').value = button.dataset.question;
        runRag();
    }));
}

function runRag() {
    const question = $('#rag-question').value.trim();
    if (!question) return;
    const terms = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\W+/).filter(term => term.length > 2);
    const scored = knowledgeBase.map(document => {
        const corpus = `${document.title} ${document.text} ${document.keywords.join(' ')}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const score = terms.reduce((total, term) => total + (corpus.includes(term) ? 1 : 0), 0);
        return { ...document, score };
    }).sort((a, b) => b.score - a.score).slice(0, 3);

    const max = Math.max(...scored.map(item => item.score), 1);
    $('#retrieval-status').textContent = `${scored.length} chunks`;
    $('#retrieval-status').classList.remove('muted');
    $('#rag-sources').innerHTML = scored.map((doc, index) => {
        const percentage = Math.round((doc.score / max) * 100);
        return `<article class="source-card"><header><span>[${index + 1}] ${doc.title}</span><span>${percentage}% relevância</span></header><p>${doc.text}</p></article>`;
    }).join('');

    const answer = generateAnswer(question, scored);
    $('#rag-answer').innerHTML = `<h3><i class="fa-solid fa-sparkles"></i> Resposta com contexto recuperado</h3><p>${answer}</p><div class="citations"><strong>Fontes usadas:</strong> ${scored.map((doc, index) => `[${index + 1}] ${doc.title}`).join(' · ')}</div>`;
}

function generateAnswer(question, sources) {
    const normalized = question.toLowerCase();
    if (normalized.includes('diferen') && normalized.includes('relacional')) {
        return 'Um banco relacional organiza informações em tabelas e usa JOINs para cruzá-las. Um banco de grafos armazena entidades e relações diretamente; por isso tende a tornar consultas que percorrem conexões de vários níveis mais naturais e eficientes. Em um RAG, essa estrutura pode ampliar o contexto recuperado além de palavras semelhantes.';
    }
    if (normalized.includes('alucina')) {
        return 'RAG reduz alucinações porque a geração recebe trechos recuperados da base de conhecimento antes de responder. Em vez de depender apenas de conhecimento paramétrico do modelo, a resposta fica ancorada em fontes que podem ser exibidas e verificadas pelo usuário.';
    }
    if (normalized.includes('neo4j') || normalized.includes('quando')) {
        return 'Neo4j é adequado quando o problema depende de relações ricas e travessias frequentes: recomendações, dependências de software, fraude, redes sociais e grafos de conhecimento. A linguagem Cypher permite expressar esses padrões visualmente usando MATCH e relações tipadas.';
    }
    if (normalized.includes('no') || normalized.includes('relac')) {
        return 'Em um banco de grafo, um nó representa uma entidade, como Pessoa, Tecnologia ou Documento. Uma relação conecta dois nós e possui um tipo, como APRENDE, USA ou COMPÕE. Essa conexão é uma informação de primeira classe, não apenas uma chave estrangeira.';
    }
    return `A pergunta “${question}” pode ser respondida combinando conteúdo relevante e relações explícitas. Os chunks recuperados indicam que grafos representam conexões entre entidades, enquanto RAG recupera evidências antes de gerar uma resposta. Juntos, eles permitem contextualizar melhor perguntas que exigem múltiplos saltos de informação.`;
}

window.addEventListener('resize', () => {
    if ($('#graph-panel').classList.contains('active')) renderGraph();
});

document.addEventListener('DOMContentLoaded', init);
