import { wikiData } from './wiki/data.js';

const searchInput = document.getElementById('wiki-search');
const grid = document.getElementById('wiki-grid');
const emptyState = document.getElementById('empty-state');
const tagsContainer = document.getElementById('tags-container');
const paginationContainer = document.getElementById('pagination');

let currentFilter = 'all';
let searchQuery = '';
let currentPage = 1;
const itemsPerPage = 8;

function createElement(tagName, className = '', text = '') {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function matchesCurrentFilter(item) {
    const searchCorpus = `${item.tool} ${item.category} ${item.command} ${item.description}`.toLowerCase();
    return (currentFilter === 'all' || item.category === currentFilter) && searchCorpus.includes(searchQuery);
}

function renderTags() {
    const categories = [...new Set(wikiData.map(item => item.category))];
    tagsContainer.innerHTML = '';

    ['all', ...categories].forEach(category => {
        const label = category === 'all' ? 'Todas' : category;
        const button = createElement('button', 'filter-tag px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider', label);
        button.dataset.filter = category;
        button.classList.toggle('active', category === currentFilter);
        button.addEventListener('click', () => {
            currentFilter = category;
            currentPage = 1;
            render();
        });
        tagsContainer.appendChild(button);
    });
}

function copyCommand(command, button) {
    navigator.clipboard.writeText(command).then(() => {
        const original = button.textContent;
        button.textContent = 'COPIADO';
        setTimeout(() => { button.textContent = original; }, 1200);
    });
}

function openSandbox(command) {
    sessionStorage.setItem('learningfly-kali-pending-command', JSON.stringify({
        command,
        source: 'wiki',
        timestamp: Date.now()
    }));
    window.location.href = 'terminal.html?tool=playground&source=wiki';
}

function renderCards(items) {
    grid.innerHTML = '';
    emptyState.classList.toggle('hidden', items.length > 0);

    items.forEach(item => {
        const card = createElement('article', 'bg-white dark:bg-kali-card border border-gray-200 dark:border-kali-border rounded-xl p-6 shadow-sm hover:border-kali-blue transition-colors flex flex-col md:flex-row md:items-center gap-6 group relative overflow-hidden');

        const icon = createElement('span', 'inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-kali-blue font-bold font-mono text-lg border border-blue-200 dark:border-blue-900', item.tool.substring(0, 2).toUpperCase());
        const iconWrapper = createElement('div', 'flex-shrink-0');
        iconWrapper.appendChild(icon);

        const content = createElement('div', 'flex-grow min-w-0');
        const titleRow = createElement('div', 'flex items-center gap-2 mb-1');
        titleRow.append(createElement('h3', 'text-lg font-bold font-mono text-gray-900 dark:text-white', item.tool));
        titleRow.append(createElement('span', 'px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-100 dark:bg-kali-border text-gray-500 tracking-wide', item.category));

        const description = createElement('p', 'text-sm text-gray-600 dark:text-gray-400 mb-3', item.description);
        const commandBox = createElement('div', 'bg-gray-100 dark:bg-black text-green-600 dark:text-kali-green font-mono text-xs md:text-sm p-3 rounded border border-gray-300 dark:border-kali-border overflow-x-auto whitespace-nowrap flex items-center justify-between gap-3');
        commandBox.append(createElement('code', 'select-all opacity-90', `$ ${item.command}`));
        const copyButton = createElement('button', 'flex-shrink-0 px-2 py-1 text-[10px] font-bold border border-gray-400 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300 hover:text-kali-green hover:border-kali-green transition-colors', 'COPIAR');
        copyButton.type = 'button';
        copyButton.addEventListener('click', () => copyCommand(item.command, copyButton));
        commandBox.appendChild(copyButton);
        content.append(titleRow, description, commandBox);

        const actions = createElement('div', 'flex-shrink-0 pt-4 md:pt-0');
        const execButton = createElement('button', 'inline-flex items-center justify-center px-4 py-2 border border-kali-blue text-sm font-bold rounded shadow-sm text-kali-blue hover:bg-kali-blue hover:text-white transition-colors w-full md:w-auto font-mono', 'EXEC NO SANDBOX');
        execButton.type = 'button';
        execButton.addEventListener('click', () => openSandbox(item.command));
        actions.appendChild(execButton);

        card.append(iconWrapper, content, actions);
        grid.appendChild(card);
    });
}

function renderPagination(totalItems) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.classList.toggle('hidden', totalPages <= 1);

    for (let page = 1; page <= totalPages; page++) {
        const button = createElement('button', `px-4 py-2 rounded-lg text-sm font-bold font-mono transition-colors border border-kali-border ${page === currentPage ? 'bg-kali-blue text-white border-kali-blue' : 'bg-transparent text-gray-500 hover:text-white hover:border-white'}`, String(page));
        button.addEventListener('click', () => {
            currentPage = page;
            render();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        paginationContainer.appendChild(button);
    }
}

function render() {
    const filtered = wikiData.filter(matchesCurrentFilter);
    const start = (currentPage - 1) * itemsPerPage;
    renderTags();
    renderCards(filtered.slice(start, start + itemsPerPage));
    renderPagination(filtered.length);
}

searchInput.addEventListener('input', event => {
    searchQuery = event.target.value.toLowerCase();
    currentPage = 1;
    render();
});

document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInput.focus();
    }
});

render();
