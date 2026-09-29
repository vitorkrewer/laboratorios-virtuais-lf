window.jsPDF = window.jspdf.jsPDF;

// ============================================================================
// 1. PEDAGOGICAL THEORY DATA FOR MODALS
// ============================================================================
const phasesTheory = {
    1: {
        title: "Fase 1: Empatia & Pesquisa do Usuário",
        html: `
            <p><strong>Objetivo:</strong> Compreender profundamente as necessidades, dores, motivações e comportamentos reais do usuário para quem estamos projetando a solução.</p>
            <h4 class="font-bold text-slate-800 mt-3">Por que a Empatia é Crucial?</h4>
            <p>O Design Thinking é centrado no ser humano. Criar sem empatia leva ao desenvolvimento de produtos ou serviços que resolvem problemas inexistentes ou que ninguém deseja usar.</p>
            <h4 class="font-bold text-slate-800 mt-3">Ferramentas de Destaque:</h4>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>Personas:</strong> Representações semi-fictícias baseadas em dados reais de usuários representativos.</li>
                <li><strong>Mapa de Empatia 360°:</strong> Sistematização do que o usuário pensa, sente, vê, ouve, fala e faz, além de suas dores e ganhos.</li>
                <li><strong>Entrevistas em Profundidade:</strong> Conversas focadas em histórias e experiências vividas pelo usuário.</li>
            </ul>
            <div class="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs mt-3">
                <strong>💡 Dica Prática:</strong> Evite fazer perguntas com "Sim/Não". Pergunte: <em>"Conte-me sobre a última vez que você tentou..."</em> para extrair histórias ricas.
            </div>
        `
    },
    2: {
        title: "Fase 2: Definição (POV & HMW)",
        html: `
            <p><strong>Objetivo:</strong> Processar e sintetizar os aprendizados da imersão para enquadrar o problema central em uma declaração clara e acionável.</p>
            <h4 class="font-bold text-slate-800 mt-3">Ponto de Vista (POV - Point of View)</h4>
            <p>O POV define o foco do projeto conectando três elementos essenciais: <em>[Usuário Específico] precisa de [Necessidade Real] porque [Insight Surpreendente]</em>.</p>
            <h4 class="font-bold text-slate-800 mt-3">Perguntas "Como Poderíamos...?" (How Might We - HMW)</h4>
            <p>Transformam o problema em uma oportunidade otimista de criação, sem prescrever uma solução específica antecipadamente.</p>
            <div class="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900 text-xs mt-3">
                <strong>⚠️ Cuidado com a amplitude:</strong>
                <br>• Muito amplo: <em>"Como poderíamos acabar com a pobreza no mundo?"</em>
                <br>• Muito estreito: <em>"Como poderíamos criar um botão verde de 10px no app?"</em>
                <br>• Ideal: <em>"Como poderíamos tornar o aprendizado de física experimental acessível no smartphone?"</em>
            </div>
        `
    },
    3: {
        title: "Fase 3: Ideação & Priorização",
        html: `
            <p><strong>Objetivo:</strong> Gerar um grande volume de ideias variadas para responder ao desafio definido, suspendendo qualquer julgamento crítico inicial.</p>
            <h4 class="font-bold text-slate-800 mt-3">Regras de Ouro do Brainstorming:</h4>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>Adie o julgamento:</strong> Não existe ideia ruim na divergência.</li>
                <li><strong>Construa sobre as ideias dos outros:</strong> Diga <em>"Sim, e além disso podemos..."</em> em vez de <em>"Não, porque..."</em>.</li>
                <li><strong>Busque quantidade:</strong> Quanto mais ideias, maior a chance de encontrar soluções inovadoras.</li>
            </ul>
            <h4 class="font-bold text-slate-800 mt-3">Matriz Esforço x Impacto:</h4>
            <p>Ajuda a convergir as ideias: foque primeiro nos <strong>Quick Wins (Alto Impacto + Baixo Esforço)</strong> e planeje os <strong>Projetos Estratégicos (Alto Impacto + Alto Esforço)</strong>.</p>
        `
    },
    4: {
        title: "Fase 4: Prototipagem & Materialização",
        html: `
            <p><strong>Objetivo:</strong> Trazer as ideias do campo abstrato para o mundo físico ou visual com o menor custo e tempo possível para aprender rápido.</p>
            <blockquote class="italic text-indigo-700 bg-indigo-50 p-2.5 rounded border-l-4 border-indigo-500 my-2">
                "Se uma imagem vale mais que mil palavras, um protótipo vale mais que mil reuniões." — IDEO
            </blockquote>
            <h4 class="font-bold text-slate-800 mt-3">Tipos de Protótipos de Baixa Fidelidade:</h4>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>Storyboard (História em Quadrinhos):</strong> Mostra a jornada antes, durante e depois da solução.</li>
                <li><strong>Service Blueprint:</strong> Mapeia pontos de contato e bastidores do serviço.</li>
                <li><strong>Maquete / Wireframe de Papel:</strong> Simulação física ou estrutural da interface.</li>
                <li><strong>Role-Playing:</strong> Encenação teatral simulando o atendimento ou serviço.</li>
            </ul>
        `
    },
    5: {
        title: "Fase 5: Teste & Matriz de Feedback",
        html: `
            <p><strong>Objetivo:</strong> Colocar o protótipo diante dos usuários finais para testar hipóteses, aprender com os erros e iterar a solução.</p>
            <h4 class="font-bold text-slate-800 mt-3">O Mantra do Testador: "Mostre, não conte"</h4>
            <p>Não explique detalhadamente como o protótipo funciona. Deixe o usuário interagir e observe onde ele se confunde, hesita ou se surpreende positivamente.</p>
            <h4 class="font-bold text-slate-800 mt-3">Matriz de Feedback 4 Quadrantes:</h4>
            <p>Organiza as impressões em: <strong>➕ O que funcionou</strong>, <strong>⚠️ O que precisa mudar</strong>, <strong>❓ Dúvidas surgidas</strong> e <strong>💡 Novas ideias geradas</strong>.</p>
        `
    }
};

// ============================================================================
// 2. PRESET CASE STUDIES
// ============================================================================
const presetCases = {
    universidade: {
        title: "Engajamento e Aprendizado Prático no Ensino Superior",
        author: "Equipe InovaEduca",
        personaName: "Lucas Almeida",
        personaRole: "19 anos, Calouro de Engenharia de Computação",
        personaAvatar: "🎓",
        empathyThinks: "Sente-se sobrecarregado com muita teoria abstrata e tem medo de reprovar em cálculo e física básica.",
        empathySees: "Colegas desistindo do curso, professores usando apenas slides estáticos de fórmulas.",
        empathyDoes: "Estuda sozinho até tarde, procura vídeos no YouTube mas não encontra exemplos práticos de laboratório.",
        empathyHears: "Veteranos dizendo que as matérias iniciais são 'filtros' para eliminar alunos.",
        personaChallenges: "Falta de laboratórios práticos acessíveis, desmotivação e sensação de isolamento nos estudos.",
        personaGoals: "Aprender aplicando em projetos reais, conseguir o primeiro estágio e formar com bom aproveitamento.",
        povUser: "Calouros de cursos de engenharia e tecnologia",
        povNeed: "experimentar conceitos teóricos de forma prática e interativa sem barreiras de infraestrutura",
        povInsight: "o aprendizado ativo e visual aumenta a retenção em mais de 70% e reduz a evasão no primeiro ano",
        hmwWho: "os calouros de exatas",
        hmwAction: "a praticarem conceitos complexos de forma gamificada e visual",
        hmwContext: "através de laboratórios virtuais interativos no navegador?",
        ideas: [
            { text: "Simuladores interativos em WebAssembly sem necessidade de instalar nada", color: "yellow", category: "quick-wins", likes: 4 },
            { text: "Missões gamificadas com desafios práticos e feedback instantâneo", color: "green", category: "quick-wins", likes: 3 },
            { text: "Comunidade de mentoria entre veteranos e calouros via Discord", color: "blue", category: "strategic", likes: 2 },
            { text: "Gerador de relatórios e fichamentos com inteligência artificial", color: "pink", category: "strategic", likes: 5 }
        ],
        prototypeType: "storyboard",
        storyScene1: "Lucas tenta estudar circuitos e bancos de dados lendo apenas PDFs compridos e se sente confuso e inseguro.",
        storyScene2: "Ele abre o Laboratório Virtual no navegador, arrasta componentes, roda comandos SQL em tempo real e visualiza o resultado imediatamente.",
        storyScene3: "Lucas compreende o conteúdo em minutos, conclui os desafios práticos e compartilha seu relatório com a turma.",
        feedbackPlan: "Testar com 5 alunos do 1º semestre se eles conseguem resolver um exercício prático em menos de 10 minutos sem pedir ajuda.",
        ease: 5,
        innov: 5,
        viab: 4,
        feedbackWorked: "A interface é muito intuitiva e o fato de rodar direto no navegador sem instalar programas agradou demais.",
        feedbackChange: "Adicionar mais dicas visuais quando o aluno cometer um erro na simulação.",
        feedbackQuestions: "Como posso salvar meu progresso se fechar a janela do navegador?",
        feedbackIdeas: "Integrar um botão para exportar o projeto diretamente em PDF para entregar ao professor.",
        decision: "implement"
    },
    acessibilidade: {
        title: "Acessibilidade e Rotas Inclusivas no Transporte Urbano",
        author: "Laboratório de Acessibilidade Cidadã",
        personaName: "Helena Moreira",
        personaRole: "34 anos, Arquiteta e Cadeirante",
        personaAvatar: "💼",
        empathyThinks: "Preocupa-se em chegar atrasada em compromissos porque nunca sabe se o elevador da estação estará funcionando.",
        empathySees: "Calçadas esburacadas, rampas com inclinação fora da norma ABNT e elevadores quebrados.",
        empathyDoes: "Planeja trajetos com 2 horas de antecedência e sempre liga antes para checar acessibilidade.",
        empathyHears: "Pessoas dizendo que 'já estão arrumando' mas o problema nunca é resolvido.",
        personaChallenges: "Falta de previsibilidade e dados em tempo real sobre acessibilidade urbana.",
        personaGoals: "Mover-se pela cidade com total autonomia, segurança e dignidade.",
        povUser: "Pessoas com deficiência física e mobilidade reduzida",
        povNeed: "saber em tempo real quais rotas e estações possuem infraestrutura acessível operante",
        povInsight: "a falta de informação confiável gera exclusão social e medo de sair de casa",
        hmwWho: "as pessoas com deficiência motora",
        hmwAction: "a encontrarem rotas 100% acessíveis e seguras em tempo real",
        hmwContext: "através de um mapa colaborativo com status de elevadores e rampas?",
        ideas: [
            { text: "App com mapa colaborativo e alertas de elevadores fora de serviço", color: "green", category: "quick-wins", likes: 6 },
            { text: "Calculadora de inclinação de rampas baseada na NBR 9050 para denúncias", color: "yellow", category: "quick-wins", likes: 3 },
            { text: "Totens de áudio e realidade aumentada nas paradas de ônibus", color: "purple", category: "strategic", likes: 2 }
        ],
        prototypeType: "service",
        serviceTouchpoints: "Aplicativo móvel com mapa, QR Code nas estações e canal de denúncia no WhatsApp.",
        serviceJourney: "Usuário abre o app -> Seleciona destino -> Rota traçada mostra apenas caminhos com elevadores testados -> Usuário avalia o trajeto ao chegar.",
        serviceBackstage: "Integração via API com a central de transporte público e moderação de alertas colaborativos dos usuários.",
        feedbackPlan: "Realizar teste de usabilidade em campo com 3 cadeirantes fazendo o percurso centro-estação.",
        ease: 4,
        innov: 5,
        viab: 4,
        feedbackWorked: "A clareza dos alertas em tempo real sobre elevadores quebrados evitou voltas desnecessárias.",
        feedbackChange: "Adicionar alertas por comando de voz para facilitar enquanto conduz a cadeira de rodas.",
        feedbackQuestions: "Como garantir que a informação do aplicativo esteja sempre atualizada?",
        feedbackIdeas: "Gamificar com pontos para usuários que reportarem o status de acessibilidade de locais públicos.",
        decision: "refine"
    },
    sustentabilidade: {
        title: "Aproveitamento Integral de Alimentos e Zero Desperdício",
        author: "Coletivo EcoFood",
        personaName: "Carlos Eduardo",
        personaRole: "42 anos, Chef e Proprietário de Restaurante",
        personaAvatar: "🎨",
        empathyThinks: "Fica angustiado ao ver a quantidade de talos, cascas e sobras descartadas diariamente na cozinha.",
        empathySees: "Caçambas de lixo orgânico cheias e contas de insumos agrícolas cada vez mais altas.",
        empathyDoes: "Tenta criar pratos do dia mas a equipe nem sempre sabe como reutilizar cascas com segurança.",
        empathyHears: "Clientes elogiando iniciativas sustentáveis mas relutantes em provar novos ingredientes.",
        personaChallenges: "Tempo escasso para treinar a equipe e falta de receitas padronizadas de aproveitamento.",
        personaGoals: "Reduzir custos em 25%, zerar o descarte orgânico e ganhar selo de restaurante sustentável.",
        povUser: "Chefs e gestores de cozinhas comerciais",
        povNeed: "métodos simples e receitas padronizadas para aproveitar talos, cascas e sobras limpas",
        povInsight: "o desperdício alimentar ocorre principalmente por desconhecimento técnico de preparo e preconceito do consumidor",
        hmwWho: "os restaurantes e cozinhas profissionais",
        hmwAction: "a transformarem sobras e cascas em novos pratos de alta gastronomia",
        hmwContext: "através de uma cartilha interativa e combinador de receitas sustentáveis?",
        ideas: [
            { text: "Catálogo digital de 'receitas invisíveis' usando cascas de banana, talos e sementes", color: "yellow", category: "quick-wins", likes: 4 },
            { text: "Calculadora de economia financeira e pegada de carbono por quilo reaproveitado", color: "green", category: "quick-wins", likes: 5 },
            { text: "Selo de qualidade 'Prato Consciente' para atrair clientes engajados", color: "blue", category: "strategic", likes: 3 }
        ],
        prototypeType: "mockup",
        mockupMaterials: "Guia impresso plastificado para bancada + Mini-aplicativo web no tablet da cozinha.",
        mockupDesc: "Painel visual onde o cozinheiro clica no ingrediente que sobrou (ex: casca de abóbora) e recebe instantaneamente 3 receitas de entradas e petiscos aprovadas pela nutricionista.",
        feedbackPlan: "Testar durante 1 semana na rotina da cozinha para medir o volume de lixo reduzido.",
        ease: 5,
        innov: 4,
        viab: 5,
        feedbackWorked: "Os funcionários adoraram a agilidade de consultar receitas práticas sem parar o serviço.",
        feedbackChange: "Incluir tempo de validade dos preparos e normas da vigilância sanitária.",
        feedbackQuestions: "Os clientes aceitaram bem os novos pratos?",
        feedbackIdeas: "Criar uma sobremesa 'assinatura' feita com cascas caramelizadas para surpreender os clientes.",
        decision: "implement"
    }
};

// Creativity Sparks list for brainstorming
const creativitySparks = [
    "🚀 E se essa solução funcionasse 100% no celular sem precisar baixar nada?",
    "🧙‍♂️ Como a Disney ou a Pixar abordariam a experiência mágica desse usuário?",
    "👶 Como explicaríamos e resolveríamos esse problema para uma criança de 7 anos?",
    "💰 E se o orçamento do projeto fosse exatamente zero reais?",
    "⚡ Como resolver isso em menos de 60 segundos de interação?",
    "🤖 Como uma Inteligência Artificial generativa poderia automatizar a parte mais chata?",
    "🎮 E se transformássemos essa tarefa em um jogo com pontos, níveis e conquistas?",
    "🌐 Como essa solução funcionaria para alguém sem acesso à internet rápida?",
    "👵 E se o usuário tivesse mais de 80 anos e pouca intimidade com tecnologia?",
    "🔄 E se invertêssemos o problema: em vez do usuário ir até a solução, a solução for até ele?",
    "🌿 Como a natureza ou a biomimética resolveriam esse desafio de adaptação?",
    "👥 Como podemos usar o poder da comunidade e do trabalho colaborativo aqui?"
];

// ============================================================================
// 3. APPLICATION STATE & LOCAL STORAGE
// ============================================================================
const STORAGE_KEY = "dt_lab_project_data_v2";

let projectState = {
    title: "",
    author: "",
    personaName: "",
    personaRole: "",
    personaAvatar: "🎓",
    empathyThinks: "",
    empathySees: "",
    empathyDoes: "",
    empathyHears: "",
    personaChallenges: "",
    personaGoals: "",
    povUser: "",
    povNeed: "",
    povInsight: "",
    hmwWho: "",
    hmwAction: "",
    hmwContext: "",
    ideas: [],
    prototypeType: "storyboard",
    storyScene1: "",
    storyScene2: "",
    storyScene3: "",
    serviceTouchpoints: "",
    serviceJourney: "",
    serviceBackstage: "",
    mockupMaterials: "",
    mockupDesc: "",
    roleplayActors: "",
    roleplayScript: "",
    feedbackPlan: "",
    ease: 4,
    innov: 4,
    viab: 3,
    feedbackWorked: "",
    feedbackChange: "",
    feedbackQuestions: "",
    feedbackIdeas: "",
    iterationDecision: "refine"
};

// ============================================================================
// 4. MAIN INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Load saved project from localStorage
    loadStateFromStorage();

    // Setup Event Listeners
    setupLivePersonaSync();
    setupHmwSync();
    setupIdeaBoard();
    setupPrototypeSelector();
    setupFeedbackSliders();
    setupModals();
    setupCaseStudies();
    setupStorageManagement();
    setupPdfExport();
    setupFormChangeAutoSave();
    setupNavigationObserver();

    // Initial render & progress check
    renderIdeaBoard();
    updateProgress();
});

// ============================================================================
// 5. LIVE SYNC FUNCTIONS (Persona, HMW, Sliders)
// ============================================================================
function setupLivePersonaSync() {
    const avatarSelect = document.getElementById('persona-avatar');
    const nameInput = document.getElementById('persona-name');
    const roleInput = document.getElementById('persona-role');
    const goalsInput = document.getElementById('persona-goals');
    const challengesInput = document.getElementById('persona-challenges');

    const updateCard = () => {
        const avatar = avatarSelect.value;
        const name = nameInput.value.trim() || 'Nome da Persona';
        const role = roleInput.value.trim() || 'Idade & Ocupação';
        const goals = goalsInput.value.trim() || 'Nenhum objetivo cadastrado ainda...';
        const challenges = challengesInput.value.trim() || 'Nenhuma dor cadastrada ainda...';

        document.getElementById('card-avatar-display').textContent = avatar;
        document.getElementById('card-persona-name').textContent = name;
        document.getElementById('card-persona-role').textContent = role;
        document.getElementById('card-persona-goals').textContent = goals;
        document.getElementById('card-persona-challenges').textContent = challenges;

        saveState();
        updateProgress();
    };

    [avatarSelect, nameInput, roleInput, goalsInput, challengesInput].forEach(el => {
        if (el) {
            el.addEventListener('input', updateCard);
            el.addEventListener('change', updateCard);
        }
    });

    const empathyFields = ['empathy-thinks', 'empathy-sees', 'empathy-does', 'empathy-hears'];
    empathyFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { saveState(); updateProgress(); });
    });
}

function setupHmwSync() {
    const who = document.getElementById('hmw-who');
    const action = document.getElementById('hmw-action');
    const context = document.getElementById('hmw-context');
    const output = document.getElementById('hmw-output');

    const updateHmw = () => {
        const w = who.value.trim();
        const a = action.value.trim();
        const c = context.value.trim();

        if (w || a || c) {
            output.textContent = `${w || '...'} ${a || '...'} ${c || '...'}`;
        } else {
            output.textContent = 'os usuários a resolverem o problema através de soluções inovadoras?';
        }
        saveState();
        updateProgress();
    };

    [who, action, context].forEach(el => {
        if (el) el.addEventListener('input', updateHmw);
    });

    ['pov-user', 'pov-need', 'pov-insight'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { saveState(); updateProgress(); });
    });
}

function setupFeedbackSliders() {
    const ease = document.getElementById('feedback-ease');
    const innov = document.getElementById('feedback-innovation');
    const viab = document.getElementById('feedback-viability');

    const updateSliders = () => {
        document.getElementById('val-ease').textContent = `${ease.value} / 5`;
        document.getElementById('val-innov').textContent = `${innov.value} / 5`;
        document.getElementById('val-viab').textContent = `${viab.value} / 5`;
        saveState();
        updateProgress();
    };

    [ease, innov, viab].forEach(s => {
        if (s) s.addEventListener('input', updateSliders);
    });

    ['feedback-worked', 'feedback-change', 'feedback-questions', 'feedback-ideas', 'feedback-plan'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { saveState(); updateProgress(); });
    });

    document.querySelectorAll('input[name="iteration-decision"]').forEach(r => {
        r.addEventListener('change', () => { saveState(); updateProgress(); });
    });
}

// ============================================================================
// 6. IDEA BOARD & CREATIVITY SPARKS (Phase 3)
// ============================================================================
function setupIdeaBoard() {
    const addBtn = document.getElementById('add-idea-btn');
    const input = document.getElementById('idea-input');
    const colorSelect = document.getElementById('idea-color-select');
    const sparkBtn = document.getElementById('spark-idea-btn');
    const sparkBox = document.getElementById('spark-prompt-box');

    addBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        projectState.ideas.push({
            id: Date.now(),
            text: text,
            color: colorSelect.value,
            category: 'quick-wins', // default
            likes: 0
        });

        input.value = '';
        renderIdeaBoard();
        saveState();
        updateProgress();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    // Idea Sparks Randomizer
    sparkBtn.addEventListener('click', () => {
        const randomSpark = creativitySparks[Math.floor(Math.random() * creativitySparks.length)];
        sparkBox.textContent = randomSpark;
        sparkBox.classList.remove('hidden');
    });
}

function renderIdeaBoard() {
    const board = document.getElementById('idea-board');
    const countBadge = document.getElementById('idea-count');
    const quickWinsList = document.getElementById('matrix-quick-wins');
    const strategicList = document.getElementById('matrix-strategic');

    countBadge.textContent = projectState.ideas.length;

    if (projectState.ideas.length === 0) {
        board.innerHTML = `
            <div id="empty-ideas-msg" class="col-span-full text-center py-10 text-slate-400 text-xs">
                <i class="fa-regular fa-note-sticky text-3xl mb-2 block"></i>
                Nenhuma ideia adicionada ainda. Digite sua primeira solução acima!
            </div>
        `;
        quickWinsList.innerHTML = '<li class="text-slate-400 italic text-[11px]">Ideias marcadas como "Quick Wins" aparecerão aqui.</li>';
        strategicList.innerHTML = '<li class="text-slate-400 italic text-[11px]">Ideias complexas de alto valor aparecerão aqui.</li>';
        return;
    }

    board.innerHTML = '';
    quickWinsList.innerHTML = '';
    strategicList.innerHTML = '';

    let qwCount = 0, stCount = 0;

    projectState.ideas.forEach((idea, index) => {
        const note = document.createElement('div');
        note.className = `sticky-note sticky-note-${idea.color || 'yellow'}`;
        note.innerHTML = `
            <div>
                <div class="flex items-center justify-between text-[11px] opacity-75 mb-1.5 font-bold">
                    <span>#${index + 1}</span>
                    <button class="delete-idea-btn text-rose-600 hover:text-rose-800 p-1" title="Excluir Ideia" data-id="${idea.id || index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <p class="text-xs font-medium leading-snug">${idea.text}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-black/10 mt-2 text-[11px]">
                <button class="like-idea-btn flex items-center gap-1 font-bold text-slate-700 hover:text-rose-600 transition-colors" data-id="${idea.id || index}">
                    <i class="fa-solid fa-heart ${idea.likes > 0 ? 'text-rose-500' : 'text-slate-400'}"></i>
                    <span>${idea.likes || 0}</span>
                </button>
                <select class="category-idea-select text-[10px] bg-white/70 rounded px-1.5 py-0.5 border border-black/15 font-semibold" data-id="${idea.id || index}">
                    <option value="quick-wins" ${idea.category === 'quick-wins' ? 'selected' : ''}>🚀 Quick Win</option>
                    <option value="strategic" ${idea.category === 'strategic' ? 'selected' : ''}>⭐ Estratégico</option>
                </select>
            </div>
        `;
        board.appendChild(note);

        // Fill 2x2 Matrix
        const itemLi = document.createElement('li');
        itemLi.className = 'flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs truncate';
        itemLi.innerHTML = `<span class="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span> <span class="truncate">${idea.text}</span>`;

        if (idea.category === 'strategic') {
            strategicList.appendChild(itemLi);
            stCount++;
        } else {
            quickWinsList.appendChild(itemLi);
            qwCount++;
        }
    });

    if (qwCount === 0) quickWinsList.innerHTML = '<li class="text-slate-400 italic text-[11px]">Nenhuma ideia categorizada como Quick Win.</li>';
    if (stCount === 0) strategicList.innerHTML = '<li class="text-slate-400 italic text-[11px]">Nenhuma ideia categorizada como Estratégica.</li>';

    // Hook delete, like, and category switch
    board.querySelectorAll('.delete-idea-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            projectState.ideas = projectState.ideas.filter((item, i) => (item.id ? item.id.toString() !== id : i.toString() !== id));
            renderIdeaBoard();
            saveState();
            updateProgress();
        });
    });

    board.querySelectorAll('.like-idea-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const target = projectState.ideas.find((item, i) => (item.id ? item.id.toString() === id : i.toString() === id));
            if (target) {
                target.likes = (target.likes || 0) + 1;
                renderIdeaBoard();
                saveState();
            }
        });
    });

    board.querySelectorAll('.category-idea-select').forEach(sel => {
        sel.addEventListener('change', () => {
            const id = sel.getAttribute('data-id');
            const target = projectState.ideas.find((item, i) => (item.id ? item.id.toString() === id : i.toString() === id));
            if (target) {
                target.category = sel.value;
                renderIdeaBoard();
                saveState();
            }
        });
    });
}

// ============================================================================
// 7. PROTOTYPE SELECTOR & TOOLS (Phase 4)
// ============================================================================
function setupPrototypeSelector() {
    const typeButtons = document.querySelectorAll('.prototype-type-btn');
    const container = document.getElementById('prototype-tools-container');

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            const type = btn.dataset.type;
            projectState.prototypeType = type;

            container.classList.remove('hidden');
            document.querySelectorAll('.prototype-tool').forEach(tool => tool.classList.add('hidden'));

            const activeTool = document.getElementById(`tool-${type}`);
            if (activeTool) activeTool.classList.remove('hidden');

            saveState();
            updateProgress();
        });
    });

    // Select storyboard by default
    const defaultBtn = document.querySelector(`.prototype-type-btn[data-type="${projectState.prototypeType || 'storyboard'}"]`);
    if (defaultBtn) defaultBtn.click();

    // Prototype form fields listener
    const protoFields = [
        'story-scene-1', 'story-scene-2', 'story-scene-3',
        'service-touchpoints', 'service-journey', 'service-backstage',
        'mockup-materials', 'mockup-desc',
        'roleplay-actors', 'roleplay-script'
    ];
    protoFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { saveState(); updateProgress(); });
    });
}

// ============================================================================
// 8. PROGRESS BAR & STAGE CHECKMARKS
// ============================================================================
function updateProgress() {
    let completedSteps = 0;
    const totalSteps = 5;

    // Check Phase 1
    const p1 = document.getElementById('persona-name').value.trim() !== '' &&
               (document.getElementById('persona-goals').value.trim() !== '' || document.getElementById('persona-challenges').value.trim() !== '');
    setPhaseCheckmark(1, p1);
    if (p1) completedSteps++;

    // Check Phase 2
    const p2 = (document.getElementById('hmw-who').value.trim() !== '' && document.getElementById('hmw-action').value.trim() !== '') ||
               (document.getElementById('pov-user').value.trim() !== '' && document.getElementById('pov-need').value.trim() !== '');
    setPhaseCheckmark(2, p2);
    if (p2) completedSteps++;

    // Check Phase 3
    const p3 = projectState.ideas.length >= 1;
    setPhaseCheckmark(3, p3);
    if (p3) completedSteps++;

    // Check Phase 4
    const p4 = document.getElementById('feedback-plan').value.trim() !== '' ||
               (document.getElementById('story-scene-1') && document.getElementById('story-scene-1').value.trim() !== '') ||
               (document.getElementById('service-journey') && document.getElementById('service-journey').value.trim() !== '') ||
               (document.getElementById('mockup-desc') && document.getElementById('mockup-desc').value.trim() !== '');
    setPhaseCheckmark(4, p4);
    if (p4) completedSteps++;

    // Check Phase 5
    const p5 = (document.getElementById('feedback-worked').value.trim() !== '' ||
                document.getElementById('feedback-change').value.trim() !== '' ||
                document.getElementById('feedback-questions').value.trim() !== '' ||
                document.getElementById('feedback-ideas').value.trim() !== '');
    setPhaseCheckmark(5, p5);
    if (p5) completedSteps++;

    const percent = Math.round((completedSteps / totalSteps) * 100);
    document.getElementById('global-progress-bar').style.width = `${percent}%`;
    document.getElementById('sidebar-progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-percentage-text').textContent = `${percent}%`;
}

function setPhaseCheckmark(phaseNum, isComplete) {
    const link = document.querySelector(`#desktop-nav a[href="#phase-${phaseNum}"] .check-icon`);
    if (link) {
        if (isComplete) link.classList.remove('hidden');
        else link.classList.add('hidden');
    }
}

// ============================================================================
// 9. MODALS & CASE STUDIES
// ============================================================================
function setupModals() {
    // Info / Theory Modal
    const infoModal = document.getElementById('info-modal');
    const closeInfoBtn = document.getElementById('modal-close');

    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phaseId = btn.getAttribute('data-phase-id');
            const data = phasesTheory[phaseId];
            if (data) {
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-content').innerHTML = data.html;
                infoModal.classList.remove('hidden');
                setTimeout(() => infoModal.classList.remove('opacity-0'), 10);
            }
        });
    });

    closeInfoBtn.addEventListener('click', () => {
        infoModal.classList.add('opacity-0');
        setTimeout(() => infoModal.classList.add('hidden'), 300);
    });

    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) closeInfoBtn.click();
    });

    // Cases Modal
    const casesModal = document.getElementById('cases-modal');
    const openCasesBtn = document.getElementById('open-cases-btn');
    const closeCasesBtn = document.getElementById('cases-modal-close');

    openCasesBtn.addEventListener('click', () => {
        casesModal.classList.remove('hidden');
        setTimeout(() => casesModal.classList.remove('opacity-0'), 10);
    });

    closeCasesBtn.addEventListener('click', () => {
        casesModal.classList.add('opacity-0');
        setTimeout(() => casesModal.classList.add('hidden'), 300);
    });

    casesModal.addEventListener('click', (e) => {
        if (e.target === casesModal) closeCasesBtn.click();
    });

    // Storage Modal
    const storageModal = document.getElementById('storage-modal');
    const openStorageBtn = document.getElementById('open-storage-btn');
    const closeStorageBtn = document.getElementById('storage-modal-close');

    openStorageBtn.addEventListener('click', () => {
        storageModal.classList.remove('hidden');
        setTimeout(() => storageModal.classList.remove('opacity-0'), 10);
    });

    closeStorageBtn.addEventListener('click', () => {
        storageModal.classList.add('opacity-0');
        setTimeout(() => storageModal.classList.add('hidden'), 300);
    });

    storageModal.addEventListener('click', (e) => {
        if (e.target === storageModal) closeStorageBtn.click();
    });
}

function setupCaseStudies() {
    document.querySelectorAll('.case-select-card').forEach(card => {
        card.addEventListener('click', () => {
            const caseId = card.getAttribute('data-case-id');
            const preset = presetCases[caseId];
            if (!preset) return;

            if (confirm(`Deseja carregar o cenário "${preset.title}"? Isso substituirá os dados atuais.`)) {
                applyCaseData(preset);
                document.getElementById('cases-modal-close').click();
            }
        });
    });
}

function applyCaseData(data) {
    document.getElementById('project-title-input').value = data.title || '';
    document.getElementById('project-author-input').value = data.author || '';

    document.getElementById('persona-name').value = data.personaName || '';
    document.getElementById('persona-role').value = data.personaRole || '';
    document.getElementById('persona-avatar').value = data.personaAvatar || '🎓';
    document.getElementById('empathy-thinks').value = data.empathyThinks || '';
    document.getElementById('empathy-sees').value = data.empathySees || '';
    document.getElementById('empathy-does').value = data.empathyDoes || '';
    document.getElementById('empathy-hears').value = data.empathyHears || '';
    document.getElementById('persona-challenges').value = data.personaChallenges || '';
    document.getElementById('persona-goals').value = data.personaGoals || '';

    document.getElementById('pov-user').value = data.povUser || '';
    document.getElementById('pov-need').value = data.povNeed || '';
    document.getElementById('pov-insight').value = data.povInsight || '';

    document.getElementById('hmw-who').value = data.hmwWho || '';
    document.getElementById('hmw-action').value = data.hmwAction || '';
    document.getElementById('hmw-context').value = data.hmwContext || '';

    projectState.ideas = JSON.parse(JSON.stringify(data.ideas || []));

    projectState.prototypeType = data.prototypeType || 'storyboard';
    const btn = document.querySelector(`.prototype-type-btn[data-type="${projectState.prototypeType}"]`);
    if (btn) btn.click();

    if (data.storyScene1) document.getElementById('story-scene-1').value = data.storyScene1;
    if (data.storyScene2) document.getElementById('story-scene-2').value = data.storyScene2;
    if (data.storyScene3) document.getElementById('story-scene-3').value = data.storyScene3;

    if (data.serviceTouchpoints) document.getElementById('service-touchpoints').value = data.serviceTouchpoints;
    if (data.serviceJourney) document.getElementById('service-journey').value = data.serviceJourney;
    if (data.serviceBackstage) document.getElementById('service-backstage').value = data.serviceBackstage;

    if (data.mockupMaterials) document.getElementById('mockup-materials').value = data.mockupMaterials;
    if (data.mockupDesc) document.getElementById('mockup-desc').value = data.mockupDesc;

    if (data.roleplayActors) document.getElementById('roleplay-actors').value = data.roleplayActors;
    if (data.roleplayScript) document.getElementById('roleplay-script').value = data.roleplayScript;

    document.getElementById('feedback-plan').value = data.feedbackPlan || '';

    document.getElementById('feedback-ease').value = data.ease || 4;
    document.getElementById('feedback-innovation').value = data.innov || 4;
    document.getElementById('feedback-viability').value = data.viab || 3;

    document.getElementById('feedback-worked').value = data.feedbackWorked || '';
    document.getElementById('feedback-change').value = data.feedbackChange || '';
    document.getElementById('feedback-questions').value = data.feedbackQuestions || '';
    document.getElementById('feedback-ideas').value = data.feedbackIdeas || '';

    const decisionRadio = document.querySelector(`input[name="iteration-decision"][value="${data.decision || 'refine'}"]`);
    if (decisionRadio) decisionRadio.checked = true;

    // Trigger sync updates
    document.getElementById('persona-avatar').dispatchEvent(new Event('change'));
    document.getElementById('hmw-who').dispatchEvent(new Event('input'));
    document.getElementById('feedback-ease').dispatchEvent(new Event('input'));

    renderIdeaBoard();
    saveState();
    updateProgress();
}

// ============================================================================
// 10. PROJECT STATE PERSISTENCE (localStorage & JSON)
// ============================================================================
function setupFormChangeAutoSave() {
    const titleInput = document.getElementById('project-title-input');
    const authorInput = document.getElementById('project-author-input');
    const resetBtn = document.getElementById('reset-project-btn');

    titleInput.addEventListener('input', saveState);
    authorInput.addEventListener('input', saveState);

    resetBtn.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja apagar todo o projeto e recomeçar do zero?')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    });
}

function saveState() {
    projectState.title = document.getElementById('project-title-input').value;
    projectState.author = document.getElementById('project-author-input').value;

    projectState.personaName = document.getElementById('persona-name').value;
    projectState.personaRole = document.getElementById('persona-role').value;
    projectState.personaAvatar = document.getElementById('persona-avatar').value;
    projectState.empathyThinks = document.getElementById('empathy-thinks').value;
    projectState.empathySees = document.getElementById('empathy-sees').value;
    projectState.empathyDoes = document.getElementById('empathy-does').value;
    projectState.empathyHears = document.getElementById('empathy-hears').value;
    projectState.personaChallenges = document.getElementById('persona-challenges').value;
    projectState.personaGoals = document.getElementById('persona-goals').value;

    projectState.povUser = document.getElementById('pov-user').value;
    projectState.povNeed = document.getElementById('pov-need').value;
    projectState.povInsight = document.getElementById('pov-insight').value;

    projectState.hmwWho = document.getElementById('hmw-who').value;
    projectState.hmwAction = document.getElementById('hmw-action').value;
    projectState.hmwContext = document.getElementById('hmw-context').value;

    const activeProto = document.querySelector('.prototype-type-btn.selected');
    projectState.prototypeType = activeProto ? activeProto.dataset.type : 'storyboard';

    projectState.storyScene1 = document.getElementById('story-scene-1').value;
    projectState.storyScene2 = document.getElementById('story-scene-2').value;
    projectState.storyScene3 = document.getElementById('story-scene-3').value;

    projectState.serviceTouchpoints = document.getElementById('service-touchpoints').value;
    projectState.serviceJourney = document.getElementById('service-journey').value;
    projectState.serviceBackstage = document.getElementById('service-backstage').value;

    projectState.mockupMaterials = document.getElementById('mockup-materials').value;
    projectState.mockupDesc = document.getElementById('mockup-desc').value;

    projectState.roleplayActors = document.getElementById('roleplay-actors').value;
    projectState.roleplayScript = document.getElementById('roleplay-script').value;

    projectState.feedbackPlan = document.getElementById('feedback-plan').value;

    projectState.ease = document.getElementById('feedback-ease').value;
    projectState.innov = document.getElementById('feedback-innovation').value;
    projectState.viab = document.getElementById('feedback-viability').value;

    projectState.feedbackWorked = document.getElementById('feedback-worked').value;
    projectState.feedbackChange = document.getElementById('feedback-change').value;
    projectState.feedbackQuestions = document.getElementById('feedback-questions').value;
    projectState.feedbackIdeas = document.getElementById('feedback-ideas').value;

    const checkedDecision = document.querySelector('input[name="iteration-decision"]:checked');
    projectState.iterationDecision = checkedDecision ? checkedDecision.value : 'refine';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectState));

    // Show temporary visual pulse on status badge
    const badge = document.getElementById('save-status-badge');
    if (badge) {
        badge.classList.remove('hidden');
    }
}

function loadStateFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
        const saved = JSON.parse(raw);
        projectState = Object.assign(projectState, saved);

        document.getElementById('project-title-input').value = projectState.title || '';
        document.getElementById('project-author-input').value = projectState.author || '';

        document.getElementById('persona-name').value = projectState.personaName || '';
        document.getElementById('persona-role').value = projectState.personaRole || '';
        document.getElementById('persona-avatar').value = projectState.personaAvatar || '🎓';
        document.getElementById('empathy-thinks').value = projectState.empathyThinks || '';
        document.getElementById('empathy-sees').value = projectState.empathySees || '';
        document.getElementById('empathy-does').value = projectState.empathyDoes || '';
        document.getElementById('empathy-hears').value = projectState.empathyHears || '';
        document.getElementById('persona-challenges').value = projectState.personaChallenges || '';
        document.getElementById('persona-goals').value = projectState.personaGoals || '';

        document.getElementById('pov-user').value = projectState.povUser || '';
        document.getElementById('pov-need').value = projectState.povNeed || '';
        document.getElementById('pov-insight').value = projectState.povInsight || '';

        document.getElementById('hmw-who').value = projectState.hmwWho || '';
        document.getElementById('hmw-action').value = projectState.hmwAction || '';
        document.getElementById('hmw-context').value = projectState.hmwContext || '';

        document.getElementById('story-scene-1').value = projectState.storyScene1 || '';
        document.getElementById('story-scene-2').value = projectState.storyScene2 || '';
        document.getElementById('story-scene-3').value = projectState.storyScene3 || '';

        document.getElementById('service-touchpoints').value = projectState.serviceTouchpoints || '';
        document.getElementById('service-journey').value = projectState.serviceJourney || '';
        document.getElementById('service-backstage').value = projectState.serviceBackstage || '';

        document.getElementById('mockup-materials').value = projectState.mockupMaterials || '';
        document.getElementById('mockup-desc').value = projectState.mockupDesc || '';

        document.getElementById('roleplay-actors').value = projectState.roleplayActors || '';
        document.getElementById('roleplay-script').value = projectState.roleplayScript || '';

        document.getElementById('feedback-plan').value = projectState.feedbackPlan || '';

        document.getElementById('feedback-ease').value = projectState.ease || 4;
        document.getElementById('feedback-innovation').value = projectState.innov || 4;
        document.getElementById('feedback-viability').value = projectState.viab || 3;

        document.getElementById('feedback-worked').value = projectState.feedbackWorked || '';
        document.getElementById('feedback-change').value = projectState.feedbackChange || '';
        document.getElementById('feedback-questions').value = projectState.feedbackQuestions || '';
        document.getElementById('feedback-ideas').value = projectState.feedbackIdeas || '';

        const decisionRadio = document.querySelector(`input[name="iteration-decision"][value="${projectState.iterationDecision || 'refine'}"]`);
        if (decisionRadio) decisionRadio.checked = true;

        // Trigger updates
        setTimeout(() => {
            document.getElementById('persona-avatar').dispatchEvent(new Event('change'));
            document.getElementById('hmw-who').dispatchEvent(new Event('input'));
            document.getElementById('feedback-ease').dispatchEvent(new Event('input'));
        }, 50);

    } catch (e) {
        console.error("Erro ao carregar estado:", e);
    }
}

function setupStorageManagement() {
    // Export JSON
    document.getElementById('export-json-btn').addEventListener('click', () => {
        saveState();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectState, null, 2));
        const downloadAnchor = document.createElement('a');
        const fileName = (projectState.title || 'projeto-design-thinking').toLowerCase().replace(/\s+/g, '-') + '.json';
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", fileName);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    // Import JSON
    const fileInput = document.getElementById('import-json-input');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                applyCaseData(parsed);
                alert('Projeto importado com sucesso!');
                document.getElementById('storage-modal-close').click();
            } catch (err) {
                alert('Erro ao ler o arquivo JSON. Certifique-se de que é um arquivo válido gerado pelo laboratório.');
            }
        };
        reader.readAsText(file);
    });
}

// ============================================================================
// 11. ENHANCED PDF EXPORT (jsPDF + html2canvas)
// ============================================================================
function setupPdfExport() {
    const exportBtn = document.getElementById('export-pdf-btn');
    const finalizeBtn = document.getElementById('finalize-project-btn');

    const generatePdf = async () => {
        const btnOriginalText = exportBtn.innerHTML;
        exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gerando PDF...';
        exportBtn.disabled = true;

        saveState();

        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let y = 18;

            // Header Banner
            doc.setFillColor(30, 41, 87); // #1e2957
            doc.rect(0, 0, pageWidth, 28, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("RELATÓRIO DE DESIGN THINKING", 15, 12);

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(243, 112, 33);
            doc.text("Learning Fly • Laboratório Virtual de Inovação", 15, 19);

            doc.setFontSize(8);
            doc.setTextColor(200, 200, 200);
            doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - 15, 19, { align: 'right' });

            y = 36;

            // Project Title & Author Info Box
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(226, 232, 240);
            doc.roundedRect(15, y, pageWidth - 30, 18, 2, 2, 'FD');

            doc.setTextColor(30, 41, 87);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(`Projeto: ${projectState.title || 'Sem título definido'}`, 19, y + 6);

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.text(`Autor / Equipe: ${projectState.author || 'Não informado'}`, 19, y + 12);

            y += 24;

            // Capture Phase Sections Cleanly
            const phasesToExport = [
                { id: 1, title: "1. Empatia & Persona", elementId: "persona-card-export" },
                { id: 2, title: "2. Definição do Desafio (HMW)", elementId: "cp-result-export" },
                { id: 3, title: "3. Ideação & Matriz de Decisão", elementId: "matrix-wrapper" },
                { id: 4, title: "4. Prototipagem & Jornada", elementId: "prototype-export-area" },
                { id: 5, title: "5. Teste & Matriz de Feedback", elementId: "phase-5" }
            ];

            for (const phase of phasesToExport) {
                const el = document.getElementById(phase.elementId);
                if (!el) continue;

                // Check if page jump is needed for phase title
                if (y > pageHeight - 35) {
                    doc.addPage();
                    y = 18;
                }

                // Phase Title Banner
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(243, 112, 33);
                doc.text(phase.title, 15, y);
                y += 6;

                // Canvas Capture
                const canvas = await html2canvas(el, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    logging: false
                });

                const imgData = canvas.toDataURL('image/png');
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = pageWidth - 30;
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                if (y + pdfHeight > pageHeight - 15) {
                    doc.addPage();
                    y = 18;
                }

                doc.addImage(imgData, 'PNG', 15, y, pdfWidth, pdfHeight);
                y += pdfHeight + 8;
            }

            // Save PDF
            const cleanFileName = (projectState.title || 'projeto-design-thinking')
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, '-')
                .substring(0, 40);
            doc.save(`${cleanFileName}.pdf`);

        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Ocorreu um erro ao gerar o PDF. Verifique se o navegador bloqueou popups ou tente novamente.");
        } finally {
            exportBtn.innerHTML = btnOriginalText;
            exportBtn.disabled = false;
        }
    };

    exportBtn.addEventListener('click', generatePdf);
    if (finalizeBtn) finalizeBtn.addEventListener('click', generatePdf);
}

// ============================================================================
// 12. NAVIGATION ACTIVE LINK INTERSECTION OBSERVER
// ============================================================================
function setupNavigationObserver() {
    const sections = document.querySelectorAll('section[id^="phase-"]');
    const navLinks = document.querySelectorAll('#desktop-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
}
