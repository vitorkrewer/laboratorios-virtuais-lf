// --- Elementos do DOM ---
const loader = document.getElementById('loader');
const appContainer = document.querySelector('.app-container');
const welcomeOverlay = document.getElementById('welcome-overlay');
const startBtn = document.getElementById('start-btn');
const sqlEditor = document.getElementById('sql-editor');
const executeBtn = document.getElementById('execute-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsOutput = document.getElementById('results-output');
const messagesOutput = document.getElementById('messages-output');
const schemaTree = document.getElementById('schema-tree');
const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
const syntaxList = document.getElementById('syntax-list');
const syntaxSearch = document.getElementById('syntax-search');
const dbTypeSelector = document.getElementById('db-type');
const themeToggle = document.getElementById('theme-toggle');

let activeEngine = null;
let syntaxData = [];

// --- Funções de Inicialização e Controle ---
async function main() {
    handleWelcome();
    setupTheme();
    await switchEngine(dbTypeSelector.value);
}

async function switchEngine(dialect) {
    loader.style.display = 'flex';
    appContainer.style.visibility = 'hidden';
    try {
        const engineModule = await import(`./${dialect}_engine.js`);
        activeEngine = engineModule.engine;
        await activeEngine.init();
        
        syntaxData = activeEngine.getSyntaxData();
        renderSyntax(syntaxData);
        updateSchema();
        
        loader.style.display = 'none';
        appContainer.style.visibility = 'visible';
        displayMessage(`Motor ${dialect.toUpperCase()} carregado com sucesso.`, 'success');
    } catch (err) {
        console.error(`Erro ao carregar o motor ${dialect}:`, err);
        loader.innerHTML = `<p style="color:red;">Falha ao carregar o motor ${dialect}.</p>`;
    }
}

function handleWelcome() {
    if (sessionStorage.getItem('welcomeShown')) {
        welcomeOverlay.style.display = 'none';
    }
    startBtn.addEventListener('click', () => {
        welcomeOverlay.style.opacity = '0';
        setTimeout(() => welcomeOverlay.style.display = 'none', 300);
        sessionStorage.setItem('welcomeShown', 'true');
    });
}

// --- Lógica do Tema ---
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
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

// --- Execução de SQL ---
function executeSql() {
    if (!activeEngine) {
        displayMessage('Nenhum motor de banco de dados ativo.', 'error');
        return;
    }
    const queries = sqlEditor.value.trim();
    if (!queries) return;
    clearOutputs();
    try {
        const results = activeEngine.execute(queries);
        if (results.length > 0) {
            results.forEach(displayResults);
        } else {
            // Mensagem de sucesso para comandos que não retornam dados (INSERT, UPDATE, etc.)
            displayMessage('Comando(s) executado(s) com sucesso.', 'success');
        }
        updateSchema();
    } catch (e) {
        displayMessage(`Erro: ${e.message}`, 'error');
    }
}


// --- Funções de UI ---
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
            td.textContent = cellValue;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    resultsOutput.appendChild(table);

    displayMessage(`Consulta executada com sucesso. ${result.values.length} linha(s) retornada(s).`, 'success');
    switchToTab('results-tab');
}

function displayMessage(text, type) {
    if (messagesOutput.querySelector('.empty-state')) {
        messagesOutput.innerHTML = '';
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = text;
    messagesOutput.prepend(messageDiv);
    switchToTab('messages-tab');
}

async function updateSchema() {
    if (!activeEngine) return;
    try {
        const schemaHTML = await activeEngine.getSchemaHTML();
        schemaTree.innerHTML = schemaHTML || '<p class="empty-state">Nenhuma tabela criada.</p>';
    } catch (e) {
        console.error("Erro ao atualizar o esquema:", e);
        schemaTree.innerHTML = '<p class="empty-state" style="color:var(--error-color);">Erro ao ler o esquema.</p>';
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
                <summary>${item.command}</summary>
                <div>
                    <p>${item.description}</p>
                    <strong>Sintaxe:</strong>
                    <code>${item.syntax}</code>
                    <strong>Exemplo:</strong>
                    <code>${item.example}</code>
                </div>
            </details>
        </div>
    `).join('');
}

function filterSyntax() {
    const query = syntaxSearch.value.toLowerCase();
    const filteredData = syntaxData.filter(item =>
        item.command.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    renderSyntax(filteredData);
}

function clearOutputs() {
    resultsOutput.innerHTML = '<p class="empty-state">Os resultados de suas consultas <code>SELECT</code> aparecerão aqui.</p>';
    messagesOutput.innerHTML = '<p class="empty-state">Mensagens de sucesso e erros serão exibidas aqui.</p>';
}

function switchToTab(tabId) {
    tabContents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// --- Event Listeners ---
executeBtn.addEventListener('click', executeSql);
sqlEditor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        executeSql();
    }
});
clearBtn.addEventListener('click', () => sqlEditor.value = '');
tabs.forEach(tab => {
    tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
});
syntaxSearch.addEventListener('input', filterSyntax);
dbTypeSelector.addEventListener('change', (e) => switchEngine(e.target.value));

// --- Inicia a Aplicação ---
main();

