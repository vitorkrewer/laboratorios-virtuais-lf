window.jsPDF = window.jspdf.jsPDF;

const phasesData = [
    { id: 1, title: 'Empatia', description: 'O primeiro passo é entender profundamente as pessoas para quem estamos projetando. Na educação, isso significa ouvir alunos, professores e a comunidade. Uma ferramenta comum é a criação de Personas.', help: '<p>A Empatia é a base do Design Thinking. Envolve observação, engajamento e imersão no contexto dos usuários para entender suas experiências e motivações. O objetivo não é apenas coletar dados, mas construir uma compreensão genuína de suas necessidades, ditas e não ditas.</p><p><strong>Técnicas Comuns:</strong> Entrevistas, observação participante, "um dia na vida de...", mapas de empatia.</p>' },
    { id: 2, title: 'Definição', description: 'Com os aprendizados da fase de empatia, definimos o problema real a ser resolvido. Usamos a estrutura "Como poderíamos..." para enquadrar o desafio de forma aberta e otimista.', help: '<p>A fase de Definição consiste em sintetizar os aprendizados da imersão para formular um ponto de vista claro e acionável. O desafio é transformado em uma pergunta-guia, conhecida como "Como Poderíamos...?" (How Might We...?).</p><p><strong>Um bom desafio deve ser:</strong> Amplo o suficiente para a criatividade, mas estreito o suficiente para ser gerenciável.</p>' },
    { id: 3, title: 'Ideação', description: 'É hora de gerar o máximo de ideias possível, sem julgamentos. O objetivo é quantidade, não qualidade. Brainstorming com post-its é uma técnica clássica.', help: '<p>Ideação é o momento de divergir e gerar um grande volume de ideias. O foco é na quantidade e na variedade, adiando o julgamento para mais tarde. O objetivo é explorar o espaço de soluções possíveis, incluindo ideias que pareçam "loucas" à primeira vista.</p><p><strong>Técnicas Comuns:</strong> Brainstorming, brainwriting, SCAMPER, Crazy 8s.</p>' },
    { id: 4, title: 'Prototipagem e Teste', description: 'Nesta fase, aprendemos com a mão na massa. Tiramos as ideias do papel e criamos versões simples para coletar feedback e refinar a solução.', help: '<h3>3.3.1. O que é um protótipo? "Errar cedo para acertar rápido"</h3><p>Um protótipo é qualquer coisa com a qual um usuário possa interagir. Pode ser algo simples como um post-it ou complexo como um software. O objetivo não é criar uma versão final, mas sim um artefato de aprendizado para testar hipóteses sobre o problema e a solução.</p><h3>3.3.2. Tipos de protótipos</h3><p>Existem inúmeras formas de prototipar, e a escolha depende do que você quer aprender. Alguns exemplos são:</p><ul><li><strong>Storyboards:</strong> Contam uma história visual da experiência do usuário.</li><li><strong>Maquetes:</strong> Representações físicas ou digitais de um produto ou espaço.</li><li><strong>Role-playing:</strong> Simulação de uma experiência de serviço para entender a interação humana.</li><li><strong>Modelos de Serviço:</strong> Diagramas que mapeiam os pontos de contato de um serviço.</li></ul><h3>3.3.3. Coletando feedback e o ciclo de iteração</h3><p>O teste é o momento em que o protótipo encontra o usuário. O objetivo é observar, ouvir e aprender. O feedback coletado alimenta o ciclo de iteração: construir -> medir -> aprender. Cada teste revela novos insights que nos ajudam a refinar o protótipo e a própria compreensão do problema.</p>' },
    { id: 5, title: 'Teste', description: 'Apresentamos o protótipo final aos usuários para coletar feedback. O objetivo é aprender o que funciona, o que não funciona e como podemos melhorar a solução antes de implementá-la em larga escala.', help: '<p>A fase de Teste é um ciclo de aprendizado. Apresentamos os protótipos aos usuários para observar suas reações e coletar feedback. Esse retorno é usado para refinar as soluções e, muitas vezes, para entender melhor o problema, reiniciando o ciclo do Design Thinking.</p><p><strong>O Mantra do Teste:</strong> "Mostre, não conte". Deixe o usuário interagir com o protótipo e observe suas ações e reações.</p>' }
];

document.addEventListener('DOMContentLoaded', () => {

    const phasesContainer = document.getElementById('phases-container');
    phasesData.forEach(phase => {
        const section = document.createElement('section');
        section.id = `phase-${phase.id}`;
        section.className = 'mb-16 scroll-mt-20';
        section.innerHTML = `
            <div class="phase-card" data-phase-id="${phase.id}">
                <div class="p-8 md:p-12">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="phase-number">${String(phase.id).padStart(2, '0')}</span>
                            <h2 class="text-3xl font-bold text-gray-800 mt-[-3.5rem] ml-1">${phase.title}</h2>
                        </div>
                        <button class="info-btn text-3xl font-bold" style="color:var(--focus-orange)" data-phase-id="${phase.id}">?</button>
                    </div>
                    <p class="mt-4 text-gray-600">${phase.description}</p>
                    <div class="mt-8 bg-slate-50 p-6 rounded-lg border interactive-area"></div>
                </div>
            </div>`;
        phasesContainer.appendChild(section);
    });

    const completionState = { 1: false, 2: false, 3: false, 4: false, 5: false };
    
    function checkCompletion(phaseId) {
        if (completionState[phaseId]) return;
        let isComplete = false;
        switch(phaseId) {
            case 1: isComplete = document.getElementById('persona-name').value.trim() !== '' && document.getElementById('persona-goals').value.trim() !== '' && document.getElementById('persona-challenges').value.trim() !== ''; break;
            case 2: isComplete = true; break;
            case 3: isComplete = document.querySelector('#idea-board .sticky-note') !== null; break;
            case 4: isComplete = document.getElementById('feedback-plan').value.trim() !== ''; break;
            case 5: isComplete = !document.getElementById('feedback-summary').classList.contains('hidden'); break;
        }
        if (isComplete) {
            completionState[phaseId] = true;
            const navLink = document.querySelector(`#desktop-nav a[href="#phase-${phaseId}"] .check-icon`);
            if (navLink) navLink.classList.remove('hidden');
        }
    }
    
    // Phase 1 Setup
    document.querySelector('#phase-1 .interactive-area').innerHTML = `<h3 class="font-semibold text-lg mb-4">Sua vez: Crie uma Persona</h3><div class="grid md:grid-cols-2 gap-8"><div class="space-y-4"><div><label for="persona-name">Nome</label><input type="text" id="persona-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div><div><label for="persona-goals">Objetivos</label><textarea id="persona-goals" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea></div><div><label for="persona-challenges">Dificuldades</label><textarea id="persona-challenges" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea></div></div><div id="persona-card-export" class="bg-white p-6 rounded-lg border-2 border-dashed flex flex-col justify-center"><h4 id="persona-card-name" class="text-xl font-bold text-center" style="color:var(--focus-blue)">Nome da Persona</h4><div class="mt-4"><strong>Objetivos:</strong><p id="persona-card-goals" class="text-gray-600 mt-1 italic">...</p></div><div class="mt-4"><strong>Dificuldades:</strong><p id="persona-card-challenges" class="text-gray-600 mt-1 italic">...</p></div></div></div>`;
    ['persona-name', 'persona-goals', 'persona-challenges'].forEach(id => document.getElementById(id).addEventListener('keyup', () => {
        document.getElementById('persona-card-name').textContent = document.getElementById('persona-name').value || 'Nome da Persona';
        document.getElementById('persona-card-goals').textContent = document.getElementById('persona-goals').value || '...';
        document.getElementById('persona-card-challenges').textContent = document.getElementById('persona-challenges').value || '...';
        checkCompletion(1);
    }));

    // Phase 2 Setup
    document.querySelector('#phase-2 .interactive-area').innerHTML = `<h3 class="font-semibold text-lg mb-4">Sua vez: Monte seu Desafio</h3><div class="grid md:grid-cols-3 gap-4 items-end"><select id="cp-user" class="block w-full rounded-md border-gray-300 shadow-sm"><option>os alunos</option><option>os professores</option></select><select id="cp-action" class="block w-full rounded-md border-gray-300 shadow-sm"><option>a se engajarem mais</option><option>a colaborar melhor</option></select><select id="cp-context" class="block w-full rounded-md border-gray-300 shadow-sm"><option>durante as aulas?</option><option>em projetos de grupo?</option></select></div><div id="cp-result-export" class="mt-6 bg-yellow-100 p-4 rounded-lg text-center"><p class="text-yellow-800 font-semibold">Como poderíamos ajudar <span id="cp-result" class="font-bold">...</span></p></div>`;
    const updateCP = () => { document.getElementById('cp-result').textContent = `${document.getElementById('cp-user').value} ${document.getElementById('cp-action').value} ${document.getElementById('cp-context').value}`; };
    ['cp-user', 'cp-action', 'cp-context'].forEach(id => document.getElementById(id).addEventListener('change', () => { updateCP(); checkCompletion(2); }));
    updateCP();

    // Phase 3 Setup
    document.querySelector('#phase-3 .interactive-area').innerHTML = `<h3 class="font-semibold text-lg mb-4">Sua vez: Quadro de Ideias</h3><div class="flex gap-2 mb-4"><input type="text" id="idea-input" class="flex-grow rounded-md border-gray-300 shadow-sm" placeholder="Digite sua ideia..."><button id="add-idea-btn" class="btn-primary text-white font-semibold py-2 px-4 rounded-md">Adicionar</button></div><div id="idea-board" class="min-h-[250px] bg-gray-100 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>`;
    document.getElementById('add-idea-btn').addEventListener('click', () => {
        const ideaInput = document.getElementById('idea-input'); const ideaBoard = document.getElementById('idea-board'); const ideaText = ideaInput.value.trim();
        if (ideaText) { const colors = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-pink-200']; const color = colors[Math.floor(Math.random() * colors.length)]; const stickyNote = document.createElement('div'); stickyNote.className = `sticky-note p-3 rounded-md h-24 flex items-center justify-center text-center text-sm ${color}`; stickyNote.textContent = ideaText; ideaBoard.appendChild(stickyNote); ideaInput.value = ''; checkCompletion(3); }
    });

    // Phase 4 Setup
    document.querySelector('#phase-4 .interactive-area').innerHTML = `
        <div id="prototype-export-area">
            <h3 class="font-semibold text-lg mb-2">Sua vez: Escolha e Construa um Protótipo</h3>
            <p class="text-sm text-gray-600 mb-4">Lembre-se: "Errar cedo para acertar rápido". Escolha um tipo de protótipo para dar vida à sua ideia.</p>
            <div id="prototype-chooser" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button data-type="storyboard" class="prototype-type-btn p-3 rounded-lg font-medium">Storyboard</button>
                <button data-type="roleplay" class="prototype-type-btn p-3 rounded-lg font-medium">Role-playing</button>
                <button data-type="mockup" class="prototype-type-btn p-3 rounded-lg font-medium">Maquete/Modelo</button>
                <button data-type="service" class="prototype-type-btn p-3 rounded-lg font-medium">Modelo de Serviço</button>
            </div>
            <div id="prototype-tools-container" class="bg-white p-4 rounded-md border hidden">
                <div id="tool-storyboard" class="prototype-tool hidden"><h4 class="font-bold mb-2">Protótipo: Storyboard</h4><div class="grid md:grid-cols-3 gap-3"><textarea placeholder="Cena 1: Onde o problema começa?" class="w-full h-24 rounded border-gray-300"></textarea><textarea placeholder="Cena 2: Como a sua solução age?" class="w-full h-24 rounded border-gray-300"></textarea><textarea placeholder="Cena 3: Qual o final feliz?" class="w-full h-24 rounded border-gray-300"></textarea></div></div>
                <div id="tool-roleplay" class="prototype-tool hidden"><h4 class="font-bold mb-2">Protótipo: Role-playing</h4><textarea placeholder="Descreva o cenário, os atores e o objetivo da simulação." class="w-full h-32 rounded border-gray-300"></textarea></div>
                <div id="tool-mockup" class="prototype-tool hidden"><h4 class="font-bold mb-2">Protótipo: Maquete/Modelo</h4><textarea placeholder="Descreva como seria sua maquete ou modelo físico/digital. Que materiais usaria? Quais seriam as principais características?" class="w-full h-32 rounded border-gray-300"></textarea></div>
                <div id="tool-service" class="prototype-tool hidden"><h4 class="font-bold mb-2">Protótipo: Modelo de Serviço</h4><textarea placeholder="Descreva os passos da jornada do usuário ao interagir com seu serviço. Quais são os pontos de contato?" class="w-full h-32 rounded border-gray-300"></textarea></div>
            </div>
        </div>
        <div id="prototype-feedback-reflection" class="mt-6 hidden">
            <h4 class="font-semibold text-gray-700">Coletando Feedback e Iterando</h4>
            <label for="feedback-plan" class="block text-sm font-medium text-gray-700 mt-2">Como você testaria este protótipo com os usuários? Que perguntas faria para gerar feedback valioso?</label>
            <textarea id="feedback-plan" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>`;
    document.querySelectorAll('.prototype-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.prototype-type-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            document.getElementById('prototype-tools-container').classList.remove('hidden');
            document.querySelectorAll('.prototype-tool').forEach(tool => tool.classList.add('hidden'));
            document.getElementById(`tool-${btn.dataset.type}`).classList.remove('hidden');
            document.getElementById('prototype-feedback-reflection').classList.remove('hidden');
        });
    });
    document.getElementById('feedback-plan').addEventListener('keyup', () => checkCompletion(4));

    // Phase 5 Setup
    document.querySelector('#phase-5 .interactive-area').innerHTML = `<h3 class="font-semibold text-lg mb-4">Sua vez: Simule um Feedback</h3><div class="space-y-4"><div><label>Facilidade de Uso</label><input id="feedback-ease" type="range" min="1" max="5" value="3" class="w-full"></div><div><label>Nível de Inovação</label><input id="feedback-innovation" type="range" min="1" max="5" value="3" class="w-full"></div><div><label>Comentários</label><textarea id="feedback-comments" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea></div><button id="submit-feedback" class="btn-primary text-white font-semibold py-2 px-4 rounded-md">Enviar Feedback</button></div><div id="feedback-summary" class="hidden mt-6 bg-green-100 p-4 rounded-lg"><h4 class="font-bold text-green-800">Feedback Recebido!</h4><p class="text-green-700"></p></div>`;
    document.getElementById('submit-feedback').addEventListener('click', () => {
        const ease = document.getElementById('feedback-ease').value; const innovation = document.getElementById('feedback-innovation').value; const comments = document.getElementById('feedback-comments').value; const summary = document.getElementById('feedback-summary');
        summary.querySelector('p').textContent = `Facilidade: ${ease}/5 | Inovação: ${innovation}/5. Comentários: "${comments || 'Nenhum'}"`;
        summary.classList.remove('hidden'); checkCompletion(5);
    });

    // Modal Logic
    const modal = document.getElementById('info-modal');
    const closeModal = () => { modal.classList.add('opacity-0'); setTimeout(() => modal.classList.add('hidden'), 300); };
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const phase = phasesData.find(p => p.id === parseInt(button.dataset.phaseId));
            document.getElementById('modal-title').textContent = phase.title; document.getElementById('modal-content').innerHTML = phase.help;
            modal.classList.remove('hidden'); setTimeout(() => modal.classList.remove('opacity-0'), 10);
        });
    });
    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });

    // PDF Export Logic
    document.getElementById('export-pdf').addEventListener('click', async () => {
        const doc = new jsPDF(); let y = 15;
        doc.setFontSize(22); doc.setTextColor(30, 41, 87); doc.text("Projeto de Design Thinking", 105, y, { align: 'center' }); y += 15;
        for (const phase of phasesData) {
            doc.setFontSize(16); doc.setTextColor(243, 112, 33); doc.text(`${phase.id}. ${phase.title}`, 15, y); y += 8;
            let element, skip = false;
            switch(phase.id) {
                case 1: element = document.getElementById('persona-card-export'); break;
                case 2: element = document.getElementById('cp-result-export'); break;
                case 3: element = document.getElementById('idea-board'); break;
                case 4: element = document.getElementById('prototype-export-area'); const selectedTool = element.querySelector('.prototype-type-btn.selected'); if(!selectedTool) skip = true; break;
                case 5: element = document.getElementById('feedback-summary'); if (element.classList.contains('hidden')) skip = true; break;
            }
            if(skip || !element) { doc.setFontSize(11); doc.setTextColor(150,150,150); doc.text('Esta fase não foi preenchida.', 15, y); y += 10; continue; }
            
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png'); const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth() - 30; const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            if (y + pdfHeight > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); y = 15; }
            doc.addImage(imgData, 'PNG', 15, y, pdfWidth, pdfHeight); y += pdfHeight + 10;

            if (phase.id === 4 && document.getElementById('feedback-plan').value) {
                const feedbackCanvas = await html2canvas(document.getElementById('prototype-feedback-reflection'), { scale: 2, backgroundColor: '#ffffff' });
                const feedbackImgData = feedbackCanvas.toDataURL('image/png'); const feedbackImgProps = doc.getImageProperties(feedbackImgData);
                const feedbackPdfHeight = (feedbackImgProps.height * pdfWidth) / feedbackImgProps.width;
                if (y + feedbackPdfHeight > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); y = 15; }
                doc.addImage(feedbackImgData, 'PNG', 15, y, pdfWidth, feedbackPdfHeight); y += feedbackPdfHeight + 10;
            }
        }
        doc.save('meu-projeto-design-thinking.pdf');
    });

    // Active Nav Link Scrolling
    const sections = document.querySelectorAll('section[id^="phase-"]'); const navLinks = document.querySelectorAll('#desktop-nav a');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href').substring(1) === entry.target.id) link.classList.add('active'); });
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => observer.observe(section));
});