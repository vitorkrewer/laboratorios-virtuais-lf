
// Adiciona placeholders para Lantanídeos e Actinídeos na tabela principal
const placeholders = [
    { "number": null, "symbol": "57-71", "name": "", "mass": null, "category": "lanthanide", "xpos": 3, "ypos": 6 },
    { "number": null, "symbol": "89-103", "name": "", "mass": null, "category": "actinide", "xpos": 3, "ypos": 7 }
];
const ALL_TABLE_ELEMENTS = [...ELEMENT_DATA, ...placeholders];
const MAX_ELEMENT = ELEMENT_DATA.length;


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Seletores do DOM ---
    const nucleusVisual = document.getElementById('nucleus-visual');

    const addProtonBtn = document.getElementById('add-proton');
    const removeProtonBtn = document.getElementById('remove-proton');
    const protonCountDisplay = document.getElementById('proton-count');

    const addNeutronBtn = document.getElementById('add-neutron');
    const removeNeutronBtn = document.getElementById('remove-neutron');
    const neutronCountDisplay = document.getElementById('neutron-count');

    const elementSymbolDisplay = document.getElementById('element-symbol');
    const elementNameDisplay = document.getElementById('element-name');
    const atomicMassDisplay = document.getElementById('atomic-mass');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');

    const periodicTableGrid = document.getElementById('periodic-table-grid');

    const contentWrapper = document.getElementById('content-wrapper');

    const elementModal = document.getElementById('element-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalSymbolBlock = document.getElementById('modal-symbol-block');
    const modalElementNumber = document.getElementById('modal-element-number');
    const modalElementSymbol = document.getElementById('modal-element-symbol');
    const modalElementName = document.getElementById('modal-element-name');
    const modalElectronConfig = document.getElementById('modal-electron-config');
    const modalSummary = document.getElementById('modal-summary');
    const modalDiscoveredBy = document.getElementById('modal-discovered-by');

    // Seletor do bloco de vídeo (cria se não existir)
    let modalVideoBlock = document.getElementById('modal-video-block');
    if (!modalVideoBlock) {
        modalVideoBlock = document.createElement('div');
        modalVideoBlock.id = 'modal-video-block';
        modalVideoBlock.className = 'w-full md:w-1/2 flex justify-center items-center p-2 hidden';
        if (modalContent) modalContent.appendChild(modalVideoBlock);
    } else {
        // garante classes mínimas se já existir no HTML
        modalVideoBlock.classList.add('w-full', 'md:w-1/2', 'flex', 'justify-center', 'items-center', 'p-2');
    }

    // --- 2. Estado do Aplicativo ---
    let protonCount = 1;
    let neutronCount = 0;
    let currentHighlightedElement = null;

    // --- 3. Funções do Tema (Light/Dark) ---

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeIconSun.classList.remove('hidden');
            themeIconMoon.classList.add('hidden');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            themeIconSun.classList.add('hidden');
            themeIconMoon.classList.remove('hidden');
            localStorage.theme = 'light';
        }
    }

    function initTheme() {
        const isDarkMode = localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        applyTheme(isDarkMode);
    }

    themeToggleBtn.addEventListener('click', () => {
        applyTheme(!document.documentElement.classList.contains('dark'));
    });

    // --- 5. Funções do Laboratório (Builder) ---

    function updateNucleusVisual() {
        nucleusVisual.innerHTML = '';
        const particles = [];
        const nucleusRect = nucleusVisual.getBoundingClientRect();
        const nucleusCenterX = nucleusRect.width / 2;
        const nucleusCenterY = nucleusRect.height / 2;
        const radius = Math.min(nucleusRect.width, nucleusRect.height) / 2 * 0.8; // 80% do raio para não tocar as bordas

        // Limita o número de partículas renderizadas para evitar problemas de performance em núcleos muito grandes
        const renderedProtons = Math.min(protonCount, 150); // Limite razoável
        const renderedNeutrons = Math.min(neutronCount, 150); // Limite razoável

        for (let i = 0; i < renderedProtons; i++) {
            const proton = document.createElement('div');
            proton.className = 'particle proton';
            nucleusVisual.appendChild(proton);
            particles.push(proton);
        }
        for (let i = 0; i < renderedNeutrons; i++) {
            const neutron = document.createElement('div');
            neutron.className = 'particle neutron';
            nucleusVisual.appendChild(neutron);
            particles.push(neutron);
        }

        anime({
            targets: particles,
            // Posição aleatória dentro de um círculo
            translateX: () => nucleusCenterX + (Math.random() * 2 - 1) * radius,
            translateY: () => nucleusCenterY + (Math.random() * 2 - 1) * radius,
            scale: [0, 1],
            duration: 800,
            delay: anime.stagger(5),
            easing: 'easeOutElastic(1, .8)'
        });
    }

    function updateElementInfo() {
        const atomicMass = protonCount + neutronCount;

        const element = ELEMENT_DATA.find(el => el.number === protonCount);

        if (element) {
            elementSymbolDisplay.textContent = element.symbol;
            elementNameDisplay.textContent = element.name;
        } else {
            elementSymbolDisplay.textContent = '?';
            elementNameDisplay.textContent = 'Elemento Desconhecido';
        }

        protonCountDisplay.textContent = protonCount;
        neutronCountDisplay.textContent = neutronCount;
        atomicMassDisplay.textContent = atomicMass;

        anime({
            targets: [elementSymbolDisplay, elementNameDisplay],
            opacity: [0, 1], duration: 500, easing: 'easeInQuad'
        });

        anime({
            targets: atomicMassDisplay,
            innerHTML: [parseInt(atomicMassDisplay.innerHTML) || 0, atomicMass],
            round: 1, duration: 400, easing: 'easeOutCirc'
        });
    }

    function updateButtonStates() {
        removeProtonBtn.disabled = (protonCount <= 1);
        addProtonBtn.disabled = (protonCount >= MAX_ELEMENT);
        removeNeutronBtn.disabled = (neutronCount <= 0);
    }

    function updateAll() {
        updateElementInfo();
        updateNucleusVisual();
        updateButtonStates();
        highlightTableElement(protonCount);
    }

    // --- 6. Funções da Tabela Periódica ---

    // --- 4. Funções do Modal ---
    function showElementDetails(elementNumber) {
        const element = ELEMENT_DATA.find(el => el.number === elementNumber);
        if (!element) return;

        // Popula os dados
        modalElementNumber.textContent = element.number;
        modalElementSymbol.textContent = element.symbol;
        modalElementName.textContent = element.name;
        modalElectronConfig.textContent = element.electron_configuration || 'N/A';
        modalSummary.textContent = element.summary || 'Informação não disponível.';
        modalDiscoveredBy.textContent = `Descoberto por: ${element.discovered_by || 'Desconhecido'}`;

        // Aplica a cor da categoria do elemento ao bloco do símbolo
        modalSymbolBlock.className = `w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg flex flex-col items-center justify-center p-2 transition-colors duration-300 ${element.category}`;

        // Exibe vídeo se houver youtube_id
        if (element.youtube_id) {
            modalVideoBlock.innerHTML = `
                <div class="aspect-w-16 aspect-h-9 w-full">
                    <iframe class="rounded-lg shadow-lg w-full h-full"
                        src="https://www.youtube.com/embed/${element.youtube_id}?rel=0&modestbranding=1"
                        title="${element.name} — vídeo"
                        frameborder="0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen></iframe>
                </div>
            `;
             modalVideoBlock.classList.remove('hidden');
         } else {
             modalVideoBlock.innerHTML = '';
             modalVideoBlock.classList.add('hidden');
         }

        // Exibe o modal
        elementModal.classList.remove('hidden');
        // Pequeno timeout para a transição de entrada funcionar
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function hideModal() {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            elementModal.classList.add('hidden');
        }, 300); // Espera a transição terminar
    }

    function handleTableClick(event) {
        const tile = event.currentTarget;
        if (!tile.dataset.number) return;

        const elementNumber = parseInt(tile.dataset.number);

        // Abre o modal de detalhes
        showElementDetails(elementNumber);

        // OPCIONAL: Você pode manter a atualização do construtor de átomos também
        protonCount = elementNumber;
        neutronCount = parseInt(tile.dataset.neutrons);
        updateAll();
    }

    // --- NOVOS Event Listeners para o Modal ---
    closeModalBtn.addEventListener('click', hideModal);
    elementModal.addEventListener('click', (event) => {
        // Fecha o modal se clicar no fundo escuro
        if (event.target === elementModal) {
            hideModal();
        }
});

function highlightTableElement(atomicNumber) {
    if (currentHighlightedElement) {
        currentHighlightedElement.classList.remove('element-highlight');
    }

    const newHighlight = periodicTableGrid.querySelector(`[data-number="${atomicNumber}"]`);
    if (newHighlight) {
        newHighlight.classList.add('element-highlight');
        currentHighlightedElement = newHighlight;
    }
}

function createPeriodicTable() {
        ELEMENT_DATA.forEach(element => {
            const tile = document.createElement('div');
            tile.className = `element-tile ${element.category}`;

            if (element.number) {
                tile.dataset.number = element.number;
                tile.dataset.neutrons = element.neutrons_stable;
                tile.innerHTML = `
                            <span class="element-tile-number">${element.number}</span>
                            <span class="element-tile-symbol">${element.symbol}</span>
                            <span class="element-tile-name">${element.name}</span>
                        `;
                tile.addEventListener('click', handleTableClick);
            } else {
                tile.innerHTML = `<span class="element-tile-symbol flex items-center justify-center h-full text-xs md:text-base">${element.symbol}</span>`;
                tile.classList.add('opacity-70');
            }

            periodicTableGrid.appendChild(tile);
        });
    }

    // --- 7. Event Listeners do Laboratório ---
    addProtonBtn.addEventListener('click', () => {
        if (protonCount < MAX_ELEMENT) {
            protonCount++;
            const element = ELEMENT_DATA.find(el => el.number === protonCount);
            neutronCount = element ? element.neutrons_stable : 0; // Garante que nêutrons sejam 0 se não encontrar
            updateAll();
        }
    });
    

removeProtonBtn.addEventListener('click', () => {
    if (protonCount > 1) {
        protonCount--;
        const element = ELEMENT_DATA.find(el => el.number === protonCount);
        neutronCount = element ? element.neutrons_stable : 0; // Garante que nêutrons sejam 0 se não encontrar
        updateAll();
    }
});

addNeutronBtn.addEventListener('click', () => {
    neutronCount++;
    updateAll();
});

removeNeutronBtn.addEventListener('click', () => {
    if (neutronCount > 0) {
        neutronCount--;
        updateAll();
    }
});

nucleusVisual.addEventListener('click', () => {
    anime({
        targets: '#element-display',
        scale: [1, 1.05, 1], duration: 400, easing: 'easeInOutSine'
    });
    anime({
        targets: '#atomic-mass',
        scale: [1, 1.3, 1],
        color: ['#06b6d4', '#67e8f9', '#06b6d4'],
        duration: 500, easing: 'easeOutElastic(1, .8)'
    });
});

// --- 8. Inicialização ---
initTheme();
createPeriodicTable();
updateAll(); // Chamar na carga inicial
});