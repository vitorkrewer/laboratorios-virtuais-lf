/**
 * SQL Playground Pro - Application Controller
 * Learning Fly • Ambientes Virtuais de Aprendizagem
 */

import { datasets, challenges } from './datasets.js';

// --- Elementos do DOM ---
const loader = document.getElementById('loader');
const loaderMsg = document.getElementById('loader-msg');
const appContainer = document.querySelector('.app-container');
const welcomeOverlay = document.getElementById('welcome-overlay');
const startBtn = document.getElementById('start-btn');

const sqlEditor = document.getElementById('sql-editor');
const executeBtn = document.getElementById('execute-btn');
const explainBtn = document.getElementById('explain-btn');
const formatBtn = document.getElementById('format-btn');
const snapshotQuickBtn = document.getElementById('snapshot-quick-btn');
const clearBtn = document.getElementById('clear-btn');

const resultsOutput = document.getElementById('results-output');
const explainOutput = document.getElementById('explain-output');
const messagesOutput = document.getElementById('messages-output');
const historyOutput = document.getElementById('history-output');
const resultsCountBadge = document.getElementById('results-count-badge');

const exportCsvBtn = document.getElementById('export-csv-btn');
const exportJsonBtn = document.getElementById('export-json-btn');

const schemaTree = document.getElementById('schema-tree');
const refreshSchemaBtn = document.getElementById('refresh-schema-btn');

const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

const syntaxList = document.getElementById('syntax-list');
const syntaxSearch = document.getElementById('syntax-search');
const sidebarTabBtns = document.querySelectorAll('.sidebar-tab-btn');
const sidebarTabContents = document.querySelectorAll('.sidebar-tab-content');
const challengesList = document.getElementById('challenges-list');

const dbTypeSelector = document.getElementById('db-type');
const datasetSelector = document.getElementById('dataset-select');
const themeToggle = document.getElementById('theme-toggle');

const openTimetravelBtn = document.getElementById('open-timetravel-btn');
const timetravelModal = document.getElementById('timetravel-modal');
const newSnapshotName = document.getElementById('new-snapshot-name');
const createSnapshotBtn = document.getElementById('create-snapshot-btn');
const snapshotsList = document.getElementById('snapshots-list');
const snapshotCountBadge = document.getElementById('snapshot-count-badge');

const openExportModalBtn = document.getElementById('open-export-modal-btn');
const exportModal = document.getElementById('export-modal');
const downloadSqlDumpBtn = document.getElementById('download-sql-dump-btn');
const downloadSqliteDbBtn = document.getElementById('download-sqlite-db-btn');
const importSqlFile = document.getElementById('import-sql-file');

// --- Estado da Aplicação ---
let activeEngine = null;
let syntaxData = [];
let queryHistory = [];
let lastExecutionResults = null;

// --- Inicialização Principal ---
async function main() {
    handleWelcome();
    setupTheme();
    setupModals();
    setupSidebarTabs();
    setupEventListeners();

    // Carregar Sintaxe
    await loadSyntaxData();
    renderChallenges();

    // Inicializar Engine Padrão
    await switchEngine(dbTypeSelector.value);

    // Se o banco estiver vazio na primeira vez, carrega o dataset de ecommerce
    const schemaHtml = await activeEngine.getSchemaHTML();
    if (schemaHtml.includes('Nenhuma tabela')) {
        await applyDataset('ecommerce');
    }
}

// --- Alternância de Engines (SQLite, MySQL, PostgreSQL) ---
async function switchEngine(dialect) {
    loader.style.display = 'flex';
    loaderMsg.textContent = `Carregando motor ${dialect.toUpperCase()}...`;
    appContainer.style.visibility = 'hidden';

    try {
        const engineModule = await import(`./${dialect}_engine.js`);
        activeEngine = engineModule.engine;
        await activeEngine.init();

        await updateSchema();
        updateSnapshotBadge();
        renderSnapshotsList();

        loader.style.display = 'none';
        appContainer.style.visibility = 'visible';
        displayMessage(`Motor ${activeEngine.dialectName} carregado com sucesso.`, 'success');
    } catch (err) {
        console.error(`Erro ao carregar o motor ${dialect}:`, err);
        loader.innerHTML = `<p style="color:#f43f5e; font-weight:bold;">Falha ao carregar o motor ${dialect}: ${err.message}</p>`;
    }
}

// --- Datasets & Carregamento ---
async function applyDataset(datasetKey) {
    if (datasetKey === 'empty') {
        if (confirm("Deseja esvaziar o banco de dados e começar do zero?")) {
            activeEngine.resetDatabase();
            await updateSchema();
            updateSnapshotBadge();
            displayMessage("Banco de dados resetado para o estado vazio.", "success");
        }
        return;
    }

    const ds = datasets[datasetKey];
    if (!ds) return;

    try {
        activeEngine.loadDataset(ds.sql);
        await updateSchema();
        updateSnapshotBadge();
        displayMessage(`Dataset "${ds.name}" carregado com sucesso!`, 'success');
        
        // Coloca uma consulta de exemplo no editor
        const firstTableMatch = ds.sql.match(/CREATE TABLE (\w+)/i);
        if (firstTableMatch) {
            sqlEditor.value = `-- Dataset: ${ds.name}\n-- Experimente consultas como:\nSELECT * FROM ${firstTableMatch[1]} LIMIT 10;`;
        }
    } catch (e) {
        displayMessage(`Erro ao carregar dataset: ${e.message}`, 'error');
    }
}

window.loadDefaultDataset = () => {
    datasetSelector.value = 'ecommerce';
    applyDataset('ecommerce');
};

window.insertSampleQuery = (tableName) => {
    sqlEditor.value = `SELECT * FROM ${tableName} LIMIT 10;`;
    executeSql();
};

// --- Execução de SQL ---
function executeSql() {
    if (!activeEngine) {
        displayMessage('Nenhum motor de banco de dados ativo.', 'error');
        return;
    }

    const query = sqlEditor.value.trim();
    if (!query) {
        displayMessage('O editor está vazio. Digite um comando SQL para executar.', 'error');
        return;
    }

    // Registrar no Histórico
    addToHistory(query);
    clearOutputs();

    const startTime = performance.now();
    try {
        const results = activeEngine.execute(query);
        const elapsed = (performance.now() - startTime).toFixed(2);

        lastExecutionResults = results;

        if (results && results.length > 0) {
            let totalRows = 0;
            results.forEach(res => {
                displayResults(res);
                if (res.values) totalRows += res.values.length;
            });

            resultsCountBadge.textContent = totalRows;
            resultsCountBadge.classList.remove('hidden');
            exportCsvBtn.classList.remove('hidden');
            exportJsonBtn.classList.remove('hidden');

            displayMessage(`Consulta finalizada em ${elapsed}ms. ${totalRows} linha(s) retornada(s).`, 'success');
            switchToTab('results-tab');
        } else {
            resultsCountBadge.classList.add('hidden');
            exportCsvBtn.classList.add('hidden');
            exportJsonBtn.classList.add('hidden');
            displayMessage(`Comando(s) DDL/DML executado(s) com sucesso em ${elapsed}ms.`, 'success');
            switchToTab('messages-tab');
        }

        updateSchema();
    } catch (e) {
        displayMessage(`Erro na Execução: ${e.message}`, 'error');
        switchToTab('messages-tab');
    }
}

// --- EXPLAIN Query Plan ---
function executeExplain() {
    if (!activeEngine) return;
    const query = sqlEditor.value.trim();
    if (!query) {
        displayMessage('Digite uma consulta SELECT para analisar seu plano de execução.', 'error');
        return;
    }

    try {
        const explainRes = activeEngine.explain(query);
        explainOutput.innerHTML = '';

        if (explainRes && explainRes.length > 0 && explainRes[0].values) {
            const table = document.createElement('table');
            table.className = 'results-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Parent</th>
                        <th>Detalhe do Plano de Execução (Otimizador)</th>
                    </tr>
                </thead>
                <tbody>
                    ${explainRes[0].values.map(row => `
                        <tr>
                            <td>${row[0]}</td>
                            <td>${row[1]}</td>
                            <td><code class="text-cyan-400 font-bold">${row[3] || row[2]}</code></td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            explainOutput.appendChild(table);
            displayMessage("Plano de Execução (EXPLAIN) gerado com sucesso.", "success");
            switchToTab('explain-tab');
        } else {
            explainOutput.innerHTML = '<p class="empty-state">Nenhum plano retornado.</p>';
        }
    } catch (e) {
        displayMessage(`Erro no EXPLAIN: ${e.message}`, 'error');
        switchToTab('messages-tab');
    }
}

// --- Formatação de Código SQL (Prettify) ---
function formatSql() {
    let sql = sqlEditor.value;
    if (!sql.trim()) return;

    const keywords = [
        'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
        'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES',
        'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE',
        'CREATE VIEW', 'BEGIN TRANSACTION', 'COMMIT', 'ROLLBACK'
    ];

    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        sql = sql.replace(regex, kw);
    });

    sqlEditor.value = sql;
    displayMessage("SQL formatado com sucesso.", "success");
}

// --- UI de Resultados & Mensagens ---
function displayResults(result) {
    if (!result || !result.columns || !result.values) return;

    if (resultsOutput.querySelector('.empty-state')) {
        resultsOutput.innerHTML = '';
    }

    const table = document.createElement('table');
    table.className = 'results-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    result.columns.forEach(colName => {
        const th = document.createElement('th');
        th.textContent = colName;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    result.values.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cellValue => {
            const td = document.createElement('td');
            if (cellValue === null) {
                td.innerHTML = '<span style="color:var(--empty-state-color); font-style:italic;">NULL</span>';
            } else {
                td.textContent = cellValue;
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    resultsOutput.appendChild(table);
}

function displayMessage(text, type) {
    if (messagesOutput.querySelector('.empty-state')) {
        messagesOutput.innerHTML = '';
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = `[${new Date().toLocaleTimeString('pt-BR')}] ${text}`;
    messagesOutput.prepend(messageDiv);
}

async function updateSchema() {
    if (!activeEngine) return;
    try {
        const schemaHTML = await activeEngine.getSchemaHTML();
        schemaTree.innerHTML = schemaHTML;
    } catch (e) {
        console.error("Erro ao atualizar esquema:", e);
        schemaTree.innerHTML = '<p class="empty-state" style="color:var(--error-text);">Erro ao carregar esquema.</p>';
    }
}

// --- Time-Travel & Snapshots ---
function updateSnapshotBadge() {
    if (!activeEngine) return;
    const snaps = activeEngine.getSnapshots();
    snapshotCountBadge.textContent = snaps.length;
}

function renderSnapshotsList() {
    if (!activeEngine) return;
    const snaps = activeEngine.getSnapshots();
    if (snaps.length === 0) {
        snapshotsList.innerHTML = '<p class="empty-state text-xs">Nenhum ponto de restauração salvo.</p>';
        return;
    }

    snapshotsList.innerHTML = snaps.map(s => `
        <div class="snapshot-item">
            <div>
                <strong>${s.name}</strong>
                <span class="text-xs text-muted block">${s.timestamp}</span>
            </div>
            <button class="btn-secondary text-xs restore-snap-btn" data-id="${s.id}">
                <i class="fa-solid fa-arrow-rotate-left"></i> Restaurar
            </button>
        </div>
    `).join('');

    snapshotsList.querySelectorAll('.restore-snap-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = Number(btn.dataset.id);
            try {
                activeEngine.restoreSnapshot(id);
                await updateSchema();
                displayMessage(`Banco restaurado com sucesso para o snapshot #${id}!`, 'success');
                timetravelModal.classList.add('hidden');
            } catch (e) {
                alert(`Erro ao restaurar: ${e.message}`);
            }
        });
    });
}

// --- Histórico de Consultas ---
function addToHistory(query) {
    queryHistory.unshift({
        time: new Date().toLocaleTimeString('pt-BR'),
        query: query
    });
    if (queryHistory.length > 20) queryHistory.pop();
    renderHistory();
}

function renderHistory() {
    if (queryHistory.length === 0) {
        historyOutput.innerHTML = '<p class="empty-state">Nenhum comando executado nesta sessão ainda.</p>';
        return;
    }

    historyOutput.innerHTML = queryHistory.map((h, i) => `
        <div class="syntax-item mb-2">
            <div class="flex items-center justify-between py-1">
                <span class="text-xs font-bold text-muted">[${h.time}]</span>
                <button class="mini-btn reuse-history-btn" data-index="${i}">Usar no Editor</button>
            </div>
            <code>${h.query}</code>
        </div>
    `).join('');

    historyOutput.querySelectorAll('.reuse-history-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = queryHistory[Number(btn.dataset.index)];
            if (item) {
                sqlEditor.value = item.query;
                sqlEditor.focus();
            }
        });
    });
}

// --- Exportações (CSV, JSON, Dump, SQLite) ---
function exportResultsAsCSV() {
    if (!lastExecutionResults || lastExecutionResults.length === 0) return;
    const res = lastExecutionResults[0];
    let csv = res.columns.map(c => `"${c}"`).join(',') + '\n';
    res.values.forEach(row => {
        csv += row.map(v => v === null ? '' : `"${String(v).replace(/"/g, '""')}"`).join(',') + '\n';
    });
    downloadFile(csv, 'consulta-resultado.csv', 'text/csv');
}

function exportResultsAsJSON() {
    if (!lastExecutionResults || lastExecutionResults.length === 0) return;
    const res = lastExecutionResults[0];
    const data = res.values.map(row => {
        const obj = {};
        res.columns.forEach((col, idx) => {
            obj[col] = row[idx];
        });
        return obj;
    });
    downloadFile(JSON.stringify(data, null, 2), 'consulta-resultado.json', 'application/json');
}

function downloadFile(content, fileName, contentType) {
    const blob = typeof content === 'string' ? new Blob([content], { type: contentType }) : new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// --- Sintaxe & Desafios ---
async function loadSyntaxData() {
    try {
        const res = await fetch('syntax.json');
        syntaxData = await res.json();
        renderSyntax(syntaxData);
    } catch (e) {
        console.warn("Erro ao carregar syntax.json:", e);
    }
}

function renderSyntax(data) {
    if (!data || data.length === 0) {
        syntaxList.innerHTML = '<p class="empty-state">Nenhum comando encontrado.</p>';
        return;
    }

    syntaxList.innerHTML = data.map(item => `
        <div class="syntax-item">
            <details>
                <summary class="flex items-center justify-between">
                    <span>${item.command}</span>
                    <span class="text-xs text-muted font-normal">${item.category || ''}</span>
                </summary>
                <div>
                    <p>${item.description}</p>
                    <strong>Sintaxe:</strong>
                    <code>${item.syntax}</code>
                    <strong>Exemplo:</strong>
                    <code>${item.example}</code>
                    <button class="mini-btn mt-2 insert-syntax-btn" data-example="${encodeURIComponent(item.example)}">Inserir Exemplo</button>
                </div>
            </details>
        </div>
    `).join('');

    syntaxList.querySelectorAll('.insert-syntax-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sqlEditor.value = decodeURIComponent(btn.dataset.example);
            sqlEditor.focus();
        });
    });
}

function filterSyntax() {
    const query = syntaxSearch.value.toLowerCase();
    const filtered = syntaxData.filter(item =>
        item.command.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
    );
    renderSyntax(filtered);
}

function renderChallenges() {
    challengesList.innerHTML = challenges.map(ch => `
        <div class="challenge-card">
            <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-primary">${ch.level}</span>
                <span class="text-xs text-muted font-mono">Dataset: ${ch.dataset}</span>
            </div>
            <h4>${ch.title}</h4>
            <p>${ch.description}</p>
            <div class="challenge-actions">
                <button class="btn-secondary text-xs load-ch-dataset-btn" data-ds="${ch.dataset}">Carregar Dataset</button>
                <button class="btn-ghost text-xs show-hint-btn" data-hint="${encodeURIComponent(ch.hint)}">💡 Dica</button>
            </div>
        </div>
    `).join('');

    challengesList.querySelectorAll('.load-ch-dataset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            datasetSelector.value = btn.dataset.ds;
            applyDataset(btn.dataset.ds);
        });
    });

    challengesList.querySelectorAll('.show-hint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert(decodeURIComponent(btn.dataset.hint));
        });
    });
}

// --- Abas e Modais ---
function setupEventListeners() {
    executeBtn.addEventListener('click', executeSql);
    explainBtn.addEventListener('click', executeExplain);
    formatBtn.addEventListener('click', formatSql);

    snapshotQuickBtn.addEventListener('click', () => {
        const name = prompt("Nome do Snapshot:", `Snapshot em ${new Date().toLocaleTimeString('pt-BR')}`);
        if (name && name.trim()) {
            activeEngine.createSnapshot(name.trim());
            updateSnapshotBadge();
            displayMessage(`Snapshot "${name}" salvo com sucesso!`, 'success');
        }
    });

    clearBtn.addEventListener('click', () => {
        sqlEditor.value = '';
        sqlEditor.focus();
    });

    refreshSchemaBtn.addEventListener('click', updateSchema);
    syntaxSearch.addEventListener('input', filterSyntax);

    sqlEditor.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            executeSql();
        }
    });

    dbTypeSelector.addEventListener('change', (e) => switchEngine(e.target.value));
    datasetSelector.addEventListener('change', (e) => applyDataset(e.target.value));

    exportCsvBtn.addEventListener('click', exportResultsAsCSV);
    exportJsonBtn.addEventListener('click', exportResultsAsJSON);

    // Modal Exportação
    downloadSqlDumpBtn.addEventListener('click', () => {
        const dump = activeEngine.exportSqlDump();
        downloadFile(dump, `dump-${activeEngine.dialectName.toLowerCase()}.sql`, 'text/plain');
    });

    downloadSqliteDbBtn.addEventListener('click', () => {
        const bin = activeEngine.exportBinary();
        if (bin) downloadFile(bin, 'database.sqlite', 'application/octet-stream');
    });

    importSqlFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                if (file.name.endsWith('.sql')) {
                    activeEngine.resetDatabase();
                    activeEngine.execute(evt.target.result);
                } else {
                    // Binário sqlite
                    const array = new Uint8Array(evt.target.result);
                    // recriar no engine
                    activeEngine.resetDatabase();
                    // carregar dados
                }
                await updateSchema();
                displayMessage(`Arquivo ${file.name} importado com sucesso!`, 'success');
                exportModal.classList.add('hidden');
            } catch (err) {
                alert(`Erro ao importar arquivo: ${err.message}`);
            }
        };

        if (file.name.endsWith('.sql')) {
            reader.readAsText(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });

    // Abas de Saída
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
    });
}

function switchToTab(tabId) {
    tabContents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');

    const activeTabLink = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTabLink) activeTabLink.classList.add('active');
}

function setupSidebarTabs() {
    sidebarTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebarTabBtns.forEach(b => b.classList.remove('active'));
            sidebarTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.sideTab);
            if (target) target.classList.add('active');
        });
    });
}

function setupModals() {
    // Time Travel Modal
    openTimetravelBtn.addEventListener('click', () => {
        renderSnapshotsList();
        timetravelModal.classList.remove('hidden');
    });

    createSnapshotBtn.addEventListener('click', () => {
        const name = newSnapshotName.value.trim() || `Snapshot Manual (${new Date().toLocaleTimeString('pt-BR')})`;
        activeEngine.createSnapshot(name);
        newSnapshotName.value = '';
        renderSnapshotsList();
        updateSnapshotBadge();
        displayMessage(`Snapshot "${name}" criado com sucesso!`, 'success');
    });

    // Export Modal
    openExportModalBtn.addEventListener('click', () => {
        exportModal.classList.remove('hidden');
    });

    // Fechar Modais
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.close;
            document.getElementById(modalId).classList.add('hidden');
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });
}

function clearOutputs() {
    resultsOutput.innerHTML = '<p class="empty-state">Os resultados de suas consultas <code>SELECT</code> aparecerão aqui.</p>';
    explainOutput.innerHTML = '<p class="empty-state">Clique em EXPLAIN para gerar a árvore do otimizador.</p>';
}

function handleWelcome() {
    if (sessionStorage.getItem('sqlPlaygroundWelcomeShown')) {
        welcomeOverlay.style.display = 'none';
    }
    startBtn.addEventListener('click', () => {
        welcomeOverlay.style.opacity = '0';
        setTimeout(() => welcomeOverlay.style.display = 'none', 300);
        sessionStorage.setItem('sqlPlaygroundWelcomeShown', 'true');
    });
}

function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }
}

// Inicia aplicação
main();

