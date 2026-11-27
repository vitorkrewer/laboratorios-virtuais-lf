/* Livro Mecânica: configuração, capítulos (espiral em três voltas, níveis da taxonomia de Bloom), trilhas e diagnóstico. */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'mecanica',
    title: 'Mecânica',
    subtitle: 'Movimento, forças e energia, em três voltas',
    icon: 'fa-gears',
    storage: 'fis.mec',
    wikiTitle: 'Wiki de Mecânica',
    labs: [
        { id: 'movimento', label: 'Movimento', icon: 'fa-car-side', name: 'Gráficos do movimento' },
        { id: 'forcas', label: 'Forças', icon: 'fa-hand', name: 'Forças e inércia' },
        { id: 'queda', label: 'Queda', icon: 'fa-feather', name: 'Queda livre e resistência do ar' },
        { id: 'energia', label: 'Energia', icon: 'fa-person-snowboarding', name: 'Energia na pista' },
        { id: 'colisoes', label: 'Colisões', icon: 'fa-car-burst', name: 'Colisões e quantidade de movimento' },
        { id: 'lancamento', label: 'Lançamentos', icon: 'fa-bullseye', name: 'Lançamentos e alvos' },
        { id: 'gangorra', label: 'Gangorra', icon: 'fa-scale-unbalanced', name: 'Gangorra e torque' }
    ],
    labsIntro: { title: 'Ver primeiro, calcular depois', text: 'Cada simulador começa pelo que se vê: o carro que deixa marcas no chão, as setas das forças, a pena e o martelo, o skatista com as barras de energia, os carrinhos que se chocam, a bala de canhão e a gangorra. Os números vêm em seguida, para quem quiser conferir.' },
    home: {
        eyebrow: 'Mecânica',
        titleHtml: 'Por que as coisas se movem <em>como se movem.</em>',
        lead: 'A porta de entrada da física, em três voltas de uma espiral. Na <strong>primeira</strong>, você observa e explica com palavras, quase sem contas. Na <strong>segunda</strong>, mede e prevê com contas simples. Na <strong>terceira</strong>, analisa situações mais ricas, avalia mitos e cria projetos. Cada ideia volta mais funda a cada volta.',
        labPitch: 'Dirija um carro para desenhar um gráfico, empurre caixas, solte uma pena e um martelo, ande de skate numa pista, bata carrinhos, dispare um canhão contra alvos e equilibre uma gangorra.',
        formulas: [
            { label: 'INÉRCIA', tex: '\\textstyle\\sum F = 0 \\Rightarrow v\\ \\text{constante}' },
            { label: 'NEWTON', tex: 'F = m\\,a' },
            { label: 'ENERGIA', tex: 'E_c + E_p = \\text{constante}' }
        ],
        mapKicker: 'A espiral do livro',
        mapTitle: 'Três voltas, cada uma mais funda',
        map: [
            { color: 'emerald', icon: 'fa-eye', title: 'Volta 1 · Ver e explicar', text: 'Movimento e referencial, forças e inércia, ação e reação, energia. Lembrar e entender, quase sem contas.', tex: '\\text{força} \\neq \\text{movimento}', href: '#/teoria/movimento' },
            { color: 'sky', icon: 'fa-ruler', title: 'Volta 2 · Medir e prever', text: 'Velocidade e gráficos, queda livre, F = ma, energia e colisões em números. Aplicar.', tex: 'v = \\frac{\\Delta s}{\\Delta t}', href: '#/teoria/velocidade-aceleracao' },
            { color: 'violet', icon: 'fa-magnifying-glass', title: 'Volta 3 · Analisar e criar', text: 'Lançamentos, movimento circular, torque, fluidos, mitos e projetos. Analisar, avaliar e criar.', tex: '\\tau = F\\,d', href: '#/teoria/lancamentos' },
            { color: 'amber', icon: 'fa-lightbulb', title: 'Projetos e formulário', text: 'Mitos para avaliar, experimentos em casa, fórmulas e erros comuns.', tex: 'p = m\\,v', href: '#/teoria/mitos-projetos' }
        ]
    },
    groups: [
        { id: 'v1', title: 'Volta 1 · Ver e explicar', icon: 'fa-eye' },
        { id: 'v2', title: 'Volta 2 · Medir e prever', icon: 'fa-ruler' },
        { id: 'v3', title: 'Volta 3 · Analisar e criar', icon: 'fa-magnifying-glass' }
    ],
    chapters: [
        { id: 'movimento', file: 'content/01-movimento.md', group: 'v1', minutes: 25, lab: 'movimento',
          title: 'O que é movimento?',
          summary: 'Entender · referencial, posição, deslocamento, rapidez, velocidade e aceleração em palavras.' },
        { id: 'forcas', file: 'content/02-forcas.md', group: 'v1', minutes: 30, lab: 'forcas',
          title: 'Forças e inércia',
          summary: 'Entender · as forças do dia a dia, o diagrama de forças, a primeira lei de Newton e o atrito.' },
        { id: 'acao-reacao', file: 'content/03-acao-reacao.md', group: 'v1', minutes: 25,
          title: 'Ação e reação, equilíbrio',
          summary: 'Entender · a terceira lei, por que o par não se anula e o que é equilíbrio.' },
        { id: 'energia-conceitos', file: 'content/04-energia-conceitos.md', group: 'v1', minutes: 25, lab: 'energia',
          title: 'Energia: transformar e conservar',
          summary: 'Entender · formas de energia, transformações, conservação e eficiência.' },
        { id: 'velocidade-aceleracao', file: 'content/05-velocidade-aceleracao.md', group: 'v2', minutes: 40, lab: 'movimento',
          title: 'Medindo o movimento: velocidade, aceleração e gráficos',
          summary: 'Aplicar · velocidade e aceleração médias, km/h e m/s, leitura de gráficos e distância de frenagem.' },
        { id: 'queda-livre', file: 'content/06-queda-livre.md', group: 'v2', minutes: 35, lab: 'queda',
          title: 'Queda livre: o que cai mais rápido?',
          summary: 'Aplicar · Galileu, a aceleração da gravidade, contas da queda e velocidade terminal.' },
        { id: 'segunda-lei', file: 'content/07-segunda-lei.md', group: 'v2', minutes: 40, lab: 'forcas',
          title: 'Força e aceleração: a segunda lei de Newton',
          summary: 'Aplicar · F = ma, massa e peso, o elevador, atrito e plano inclinado.' },
        { id: 'trabalho-energia', file: 'content/08-trabalho-energia.md', group: 'v2', minutes: 40, lab: 'energia',
          title: 'Trabalho, energia e potência em números',
          summary: 'Aplicar · trabalho, energia cinética e potencial, conservação e potência na conta de luz.' },
        { id: 'momento-colisoes', file: 'content/09-momento-colisoes.md', group: 'v2', minutes: 35, lab: 'colisoes',
          title: 'Quantidade de movimento e colisões',
          summary: 'Aplicar · quantidade de movimento, impulso, airbags, recuo e tipos de colisão.' },
        { id: 'lancamentos', file: 'content/10-lancamentos.md', group: 'v3', minutes: 40, lab: 'lancamento',
          title: 'Vetores e lançamentos',
          summary: 'Analisar · componentes, movimentos independentes, alcance e o efeito do ar.' },
        { id: 'circular', file: 'content/11-circular.md', group: 'v3', minutes: 35,
          title: 'Movimento circular e gravitação',
          summary: 'Analisar · força centrípeta, curvas, a falsa força centrífuga e órbitas.' },
        { id: 'torque', file: 'content/12-torque.md', group: 'v3', minutes: 35, lab: 'gangorra',
          title: 'Torque, equilíbrio e rotação',
          summary: 'Analisar e avaliar · torque, alavancas, centro de massa e momento angular.' },
        { id: 'fluidos', file: 'content/13-fluidos.md', group: 'v3', minutes: 35,
          title: 'Pressão e empuxo: a física dos fluidos',
          summary: 'Analisar e avaliar · pressão, profundidade, prensa hidráulica e Arquimedes.' },
        { id: 'mitos-projetos', file: 'content/14-mitos-projetos.md', group: 'v3', minutes: 40,
          title: 'Avaliar e criar: mitos, projetos e formulário',
          summary: 'Avaliar e criar · mitos para julgar, projetos em casa, formulário e erros comuns.' }
    ],
    paths: [
        {
            id: 'conceitos-7', icon: 'fa-eye', color: 'emerald',
            title: 'Conceitos primeiro, sem contas',
            duration: '7 dias · ~30 min/dia',
            audience: 'Está começando agora ou quer entender a física antes de fazer contas.',
            steps: [
                { day: 'Dia 1', chapter: 'movimento', lab: 'movimento', task: 'Observe as marcas que o carro deixa no chão em cada tipo de movimento.' },
                { day: 'Dia 2', chapter: 'forcas', lab: 'forcas', task: 'Desligue o atrito e veja a caixa seguir sozinha: é a inércia.' },
                { day: 'Dia 3', chapter: 'acao-reacao', task: 'Responda às perguntas para explicar com suas palavras.' },
                { day: 'Dia 4', chapter: 'energia-conceitos', lab: 'energia', task: 'Solte o skatista e acompanhe as barras de energia.' },
                { day: 'Dia 5', chapter: 'queda-livre', lab: 'queda', task: 'Leia só as seções 1 e 4 e solte a pena e o martelo na Terra e na Lua.' },
                { day: 'Dia 6', chapter: 'momento-colisoes', lab: 'colisoes', task: 'Leia as seções 2 e 3: por que o airbag funciona.' },
                { day: 'Dia 7', chapter: 'mitos-projetos', task: 'Avalie os seis mitos. Escolha um projeto para fazer em casa.' }
            ]
        },
        {
            id: 'completo-20', icon: 'fa-seedling', color: 'sky',
            title: 'Mecânica completa, as três voltas',
            duration: '20 dias · ~45 min/dia',
            audience: 'Quer estudar o livro inteiro, na ordem da espiral.',
            steps: [
                { day: 'Dia 1', chapter: 'movimento', lab: 'movimento', task: 'Referencial e tipos de movimento.' },
                { day: 'Dia 2', chapter: 'forcas', lab: 'forcas', task: 'Forças e inércia.' },
                { day: 'Dia 3', chapter: 'acao-reacao', task: 'Ação, reação e equilíbrio.' },
                { day: 'Dia 4', chapter: 'energia-conceitos', lab: 'energia', task: 'Energia em palavras.' },
                { day: 'Dias 5–6', chapter: 'velocidade-aceleracao', lab: 'movimento', task: 'Faça o desafio de reproduzir o gráfico.' },
                { day: 'Dia 7', chapter: 'queda-livre', lab: 'queda', task: 'Queda livre e velocidade terminal.' },
                { day: 'Dias 8–9', chapter: 'segunda-lei', lab: 'forcas', task: 'F = ma e o plano inclinado.' },
                { day: 'Dias 10–11', chapter: 'trabalho-energia', lab: 'energia', task: 'Energia em números.' },
                { day: 'Dia 12', chapter: 'momento-colisoes', lab: 'colisoes', task: 'Colisões.' },
                { day: 'Dias 13–14', chapter: 'lancamentos', lab: 'lancamento', task: 'Acerte os alvos do simulador.' },
                { day: 'Dia 15', chapter: 'circular', task: 'Movimento circular e órbitas.' },
                { day: 'Dias 16–17', chapter: 'torque', lab: 'gangorra', task: 'Torque e equilíbrio.' },
                { day: 'Dia 18', chapter: 'fluidos', task: 'Pressão e empuxo.' },
                { day: 'Dias 19–20', chapter: 'mitos-projetos', task: 'Avalie os mitos e faça um projeto.' }
            ]
        },
        {
            id: 'aprofundar-8', icon: 'fa-magnifying-glass', color: 'violet',
            title: 'Aprofundar: voltas 2 e 3',
            duration: '8 dias · ~1 h/dia',
            audience: 'Já tem os conceitos alinhados e quer as contas, a análise e os projetos.',
            steps: [
                { day: 'Dia 1', chapter: 'velocidade-aceleracao', lab: 'movimento', task: 'Gráficos e desafio do movimento.' },
                { day: 'Dia 2', chapter: 'segunda-lei', lab: 'forcas', task: 'Plano inclinado: ache o ângulo em que a caixa escorrega.' },
                { day: 'Dia 3', chapter: 'trabalho-energia', lab: 'energia', task: 'Confira a velocidade no fundo da pista com √(2gh).' },
                { day: 'Dia 4', chapter: 'momento-colisoes', lab: 'colisoes', task: 'Calcule antes, confira no simulador.' },
                { day: 'Dia 5', chapter: 'lancamentos', lab: 'lancamento', task: 'Compare 30° e 60°, com e sem ar.' },
                { day: 'Dia 6', chapter: 'circular', task: 'Exercícios de curvas e órbitas.' },
                { day: 'Dia 7', chapter: 'torque', lab: 'gangorra', task: 'Equilibre com o menor número de pesos.' },
                { day: 'Dia 8', chapter: 'mitos-projetos', task: 'Avalie os mitos e faça o projeto do tempo de reação.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'Uma bola rola numa mesa sem atrito nenhum, sem ar. O que acontece?', opts: ['para logo', 'vai freando até parar', 'continua com a mesma velocidade', 'acelera sozinha'], correct: 2, chapter: 'forcas' },
        { q: 'Um carro anda em linha reta sempre a 60 km/h. A força resultante sobre ele é:', opts: ['para a frente', 'zero', 'para trás', 'para baixo'], correct: 1, chapter: 'forcas' },
        { q: 'Numa batida entre um caminhão e um carro, a força do caminhão sobre o carro é:', opts: ['maior que a do carro sobre o caminhão', 'igual à do carro sobre o caminhão', 'menor que a do carro sobre o caminhão', 'zero'], correct: 1, chapter: 'acao-reacao' },
        { q: 'Uma bola é jogada para cima. No ponto mais alto, a força sobre ela é:', opts: ['zero', 'o peso, para baixo', 'a força do lançamento, para cima', 'o peso para baixo e a força do lançamento para cima, iguais'], correct: 1, chapter: 'lancamentos' },
        { q: 'Sem ar, uma bola de 5 kg e outra de 1 kg, soltas juntas da mesma altura:', opts: ['a de 5 kg chega muito antes', 'chegam juntas', 'a de 1 kg chega antes', 'depende da altura'], correct: 1, chapter: 'queda-livre' },
        { q: '90 km/h correspondem a:', opts: ['9 m/s', '25 m/s', '324 m/s', '50 m/s'], correct: 1, chapter: 'velocidade-aceleracao' },
        { q: 'Uma força resultante de 30 N age em 6 kg. A aceleração é:', opts: ['180 m/s²', '5 m/s²', '0,2 m/s²', '36 m/s²'], correct: 1, chapter: 'segunda-lei' },
        { q: 'Dobrando a velocidade de um carro, a energia cinética:', opts: ['dobra', 'quadruplica', 'fica igual', 'cai à metade'], correct: 1, chapter: 'trabalho-energia' }
    ],
    recommend(score, total, needs) {
        const concept = needs.some(c => ['forcas', 'acao-reacao', 'lancamentos', 'queda-livre'].includes(c));
        if (score <= 4 || (concept && score <= 6)) return { path: 'conceitos-7', msg: 'Comece pela primeira volta: os conceitos de força e movimento. As contas ficam muito mais fáceis depois.', extra: 'As perguntas que você errou estão entre as ideias erradas mais comuns em física, inclusive entre universitários. Vale a pena revê-las com calma.' };
        if (needs.length) return { path: 'completo-20', msg: 'Você tem boa base. Siga a espiral completa e revise os capítulos indicados no caminho.' };
        return { path: 'aprofundar-8', msg: 'Excelente! Seus conceitos estão alinhados. Vá para as voltas 2 e 3: contas, análise e projetos.' };
    }
};
