/* Livro Astronomia: configuração, capítulos, trilhas e diagnóstico (lido por shared/engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'astronomia',
    title: 'Astronomia',
    subtitle: 'O céu, a Lua, os planetas e as leis de Kepler',
    icon: 'fa-moon',
    storage: 'fis.astro',
    wikiTitle: 'Wiki de Astronomia',
    labs: [
        { id: 'planetario', label: 'Planetário', icon: 'fa-star', name: 'Planetário' },
        { id: 'sistema', label: 'Sistema Solar', icon: 'fa-sun', name: 'Sistema Solar e movimento retrógrado' },
        { id: 'kepler', label: 'Órbitas', icon: 'fa-circle-notch', name: 'Órbitas, leis de Kepler e exoplanetas' },
        { id: 'lua', label: 'Lua', icon: 'fa-moon', name: 'Fases da Lua e eclipses' }
    ],
    labsIntro: { title: 'O céu na sua tela', text: 'Um planetário com cerca de 5 000 estrelas reais e planetas, Sol e Lua nas posições calculadas para qualquer data e lugar; o Sistema Solar em movimento; órbitas de Kepler e Newton; fases e eclipses da Lua.' },
    home: {
        eyebrow: 'Astronomia',
        titleHtml: 'Olhe para cima. <em>Agora entenda o que está vendo.</em>',
        lead: 'Esfera celeste e coordenadas, estações, fases da Lua e eclipses, o movimento dos planetas, as leis de Kepler e a gravitação de Newton, o Sistema Solar, telescópios, distâncias e exoplanetas. Com <strong>erros comuns</strong> explicados, testes rápidos e um planetário.',
        labPitch: 'Veja o céu de hoje à noite na sua cidade, acelere o tempo e observe o laço retrógrado de Marte, varra áreas iguais numa órbita de Kepler e assista a um eclipse se formar.',
        formulas: [
            { label: 'KEPLER', tex: 'P^2 = a^3' },
            { label: 'NEWTON', tex: 'F = \\frac{GMm}{r^2}' },
            { label: 'PARALAXE', tex: 'd = \\frac{1}{p}' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, do quintal às estrelas',
        map: [
            { color: 'indigo', icon: 'fa-star', title: 'O céu visto daqui', text: 'Esfera celeste, coordenadas, estações, Lua e eclipses.', tex: '\\sin h = \\sin\\varphi\\sin\\delta + \\cdots', href: '#/teoria/esfera-celeste' },
            { color: 'amber', icon: 'fa-circle-notch', title: 'Kepler e Newton', text: 'Retrógrado, Copérnico, as leis de Kepler e a gravitação.', tex: 'P^2 = \\frac{4\\pi^2}{GM}a^3', href: '#/teoria/kepler' },
            { color: 'orange', icon: 'fa-sun', title: 'Sistema Solar', text: 'Planetas, luas, asteroides, cometas e a formação.', tex: 'M_\\odot = 2\\times10^{30}\\ \\text{kg}', href: '#/teoria/sistema-solar' },
            { color: 'emerald', icon: 'fa-binoculars', title: 'Luz e distâncias', text: 'Espectros, telescópios, paralaxe e exoplanetas.', tex: '\\lambda_\\text{máx}T = \\text{const.}', href: '#/teoria/luz-telescopios' }
        ]
    },
    groups: [
        { id: 'ceu', title: 'O céu visto daqui', icon: 'fa-star' },
        { id: 'orbitas', title: 'Kepler e Newton', icon: 'fa-circle-notch' },
        { id: 'sistema', title: 'Sistema Solar', icon: 'fa-sun' },
        { id: 'alem', title: 'Luz e distâncias', icon: 'fa-binoculars' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'esfera-celeste', file: 'content/01-esfera-celeste.md', group: 'ceu', minutes: 35, lab: 'planetario',
          title: 'O céu a olho nu',
          summary: 'Esfera celeste, movimento diário, estrelas circumpolares, constelações e a escala de magnitudes.' },
        { id: 'coordenadas', file: 'content/02-coordenadas.md', group: 'ceu', minutes: 45, lab: 'planetario',
          title: 'Coordenadas celestes e tempo',
          summary: 'Altura e azimute, ascensão reta e declinação, latitude, tempo sideral e precessão.' },
        { id: 'sol-estacoes', file: 'content/03-sol-estacoes.md', group: 'ceu', minutes: 40, lab: 'planetario',
          title: 'O Sol, a eclíptica e as estações',
          summary: 'Eclíptica, equinócios e solstícios, a verdadeira causa das estações e os trópicos.' },
        { id: 'lua', file: 'content/04-lua.md', group: 'ceu', minutes: 45, lab: 'lua',
          title: 'A Lua: fases, marés e eclipses',
          summary: 'Fases, meses sideral e sinódico, face oculta, marés e por que não há eclipse todo mês.' },
        { id: 'planetas-copernico', file: 'content/05-planetas-copernico.md', group: 'orbitas', minutes: 40, lab: 'sistema',
          title: 'Planetas, movimento retrógrado e Copérnico',
          summary: 'Geocentrismo, epiciclos, o modelo heliocêntrico, períodos sinódicos e as observações de Galileu.' },
        { id: 'kepler', file: 'content/06-kepler.md', group: 'orbitas', minutes: 40, lab: 'kepler',
          title: 'As leis de Kepler',
          summary: 'Órbitas elípticas, lei das áreas e a lei harmônica P² = a³.' },
        { id: 'gravitacao', file: 'content/07-gravitacao.md', group: 'orbitas', minutes: 50, lab: 'kepler',
          title: 'Gravitação de Newton e órbitas',
          summary: 'Gravitação universal, velocidades orbital e de escape, como pesar o Sol e as cônicas.' },
        { id: 'sistema-solar', file: 'content/08-sistema-solar.md', group: 'sistema', minutes: 40, lab: 'sistema',
          title: 'O Sistema Solar',
          summary: 'O Sol, planetas rochosos e gigantes, luas, a escala do sistema e a linha de neve.' },
        { id: 'corpos-menores', file: 'content/09-corpos-menores.md', group: 'sistema', minutes: 40,
          title: 'Corpos menores e a formação do Sistema Solar',
          summary: 'Planetas anões, asteroides, cometas, meteoros e a hipótese nebular.' },
        { id: 'luz-telescopios', file: 'content/10-luz-telescopios.md', group: 'alem', minutes: 50,
          title: 'Luz e telescópios',
          summary: 'Espectro eletromagnético, corpo negro, linhas espectrais, Doppler e telescópios.' },
        { id: 'distancias', file: 'content/11-distancias.md', group: 'alem', minutes: 40,
          title: 'Distâncias no universo',
          summary: 'UA, ano-luz e parsec, paralaxe, magnitude absoluta e a escada de distâncias.' },
        { id: 'exoplanetas', file: 'content/12-exoplanetas.md', group: 'alem', minutes: 40, lab: 'kepler',
          title: 'Exoplanetas',
          summary: 'Trânsitos, velocidade radial, outros métodos e a zona habitável.' },
        { id: 'resumo', file: 'content/13-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Fórmulas, constantes e as ideias erradas mais frequentes sobre o céu.' }
    ],
    paths: [
        {
            id: 'ceu-7', icon: 'fa-star', color: 'indigo',
            title: 'Entender o céu',
            duration: '7 dias · ~40 min/dia',
            audience: 'Quer olhar para o céu e saber o que está vendo, sem muita conta.',
            steps: [
                { day: 'Dia 1', chapter: 'esfera-celeste', lab: 'planetario', task: 'Abra o planetário na sua cidade, à noite, e ache Órion ou o Cruzeiro do Sul.' },
                { day: 'Dia 2', chapter: 'coordenadas', lab: 'planetario', task: 'Clique em estrelas e compare altura/azimute com ascensão reta/declinação.' },
                { day: 'Dia 3', chapter: 'sol-estacoes', task: 'Calcule a altura do Sol ao meio-dia na sua cidade nos dois solstícios.' },
                { day: 'Dia 4', chapter: 'lua', lab: 'lua', task: 'Fases e eclipses. Depois, olhe a Lua real e diga a fase e a hora em que ela nasceu.' },
                { day: 'Dia 5', chapter: 'planetas-copernico', lab: 'sistema', task: 'Veja o laço retrógrado de Marte no simulador.' },
                { day: 'Dia 6', chapter: 'sistema-solar', task: 'Monte mentalmente o modelo em escala do Sistema Solar.' },
                { day: 'Dia 7', chapter: 'resumo', task: 'Erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completo-20', icon: 'fa-seedling', color: 'emerald',
            title: 'Astronomia completa',
            duration: '20 dias · ~1 h/dia',
            audience: 'Quer estudar o livro inteiro na ordem, com as contas.',
            steps: [
                { day: 'Dias 1–2', chapter: 'esfera-celeste', lab: 'planetario', task: 'Esfera celeste e magnitudes.' },
                { day: 'Dias 3–4', chapter: 'coordenadas', lab: 'planetario', task: 'Coordenadas e tempo sideral.' },
                { day: 'Dia 5', chapter: 'sol-estacoes', task: 'Estações.' },
                { day: 'Dias 6–7', chapter: 'lua', lab: 'lua', task: 'Lua, marés e eclipses.' },
                { day: 'Dia 8', chapter: 'planetas-copernico', lab: 'sistema', task: 'Retrógrado e Copérnico.' },
                { day: 'Dias 9–10', chapter: 'kepler', lab: 'kepler', task: 'Leis de Kepler.' },
                { day: 'Dias 11–12', chapter: 'gravitacao', lab: 'kepler', task: 'Gravitação e órbitas.' },
                { day: 'Dia 13', chapter: 'sistema-solar', lab: 'sistema', task: 'O Sistema Solar.' },
                { day: 'Dia 14', chapter: 'corpos-menores', task: 'Corpos menores e formação.' },
                { day: 'Dias 15–16', chapter: 'luz-telescopios', task: 'Luz e telescópios.' },
                { day: 'Dia 17', chapter: 'distancias', task: 'Distâncias.' },
                { day: 'Dias 18–19', chapter: 'exoplanetas', lab: 'kepler', task: 'Exoplanetas.' },
                { day: 'Dia 20', chapter: 'resumo', task: 'Revisão geral.' }
            ]
        },
        {
            id: 'fisica-8', icon: 'fa-calculator', color: 'amber',
            title: 'Astronomia para a Física',
            duration: '8 dias · ~1 h/dia',
            audience: 'Já cursa Física ou Engenharia e quer a parte quantitativa: órbitas, luz e distâncias.',
            steps: [
                { day: 'Dia 1', chapter: 'kepler', lab: 'kepler', task: 'Leis de Kepler.' },
                { day: 'Dia 2', chapter: 'gravitacao', lab: 'kepler', task: 'Gravitação, escape e a terceira lei geral.' },
                { day: 'Dia 3', chapter: 'gravitacao', task: 'Vis-viva e cônicas. Refaça os exercícios.' },
                { day: 'Dia 4', chapter: 'luz-telescopios', task: 'Wien, Stefan-Boltzmann e Doppler.' },
                { day: 'Dia 5', chapter: 'luz-telescopios', task: 'Resolução e telescópios.' },
                { day: 'Dia 6', chapter: 'distancias', task: 'Paralaxe e módulo de distância.' },
                { day: 'Dia 7', chapter: 'exoplanetas', lab: 'kepler', task: 'Trânsito e velocidade radial.' },
                { day: 'Dia 8', chapter: 'resumo', task: 'Formulário e constantes.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'A principal causa das estações do ano é:', opts: ['a distância Terra–Sol', 'a inclinação do eixo da Terra', 'a rotação da Terra', 'a Lua'], correct: 1, chapter: 'sol-estacoes' },
        { q: 'As fases da Lua acontecem porque:', opts: ['a sombra da Terra cobre a Lua', 'vemos a metade iluminada da Lua de ângulos diferentes', 'a Lua gira em torno de si', 'nuvens cobrem a Lua'], correct: 1, chapter: 'lua' },
        { q: 'Entre uma estrela de magnitude 1 e uma de magnitude 3, a mais brilhante é:', opts: ['a de magnitude 3', 'a de magnitude 1', 'as duas têm o mesmo brilho', 'depende da cor'], correct: 1, chapter: 'esfera-celeste' },
        { q: 'O movimento retrógrado de Marte é explicado por:', opts: ['epiciclos reais', 'a Terra ultrapassando Marte na órbita', 'Marte girando ao contrário', 'a gravidade de Júpiter'], correct: 1, chapter: 'planetas-copernico' },
        { q: 'Um planeta a 4 UA do Sol tem período de:', opts: ['4 anos', '8 anos', '16 anos', '2 anos'], correct: 1, chapter: 'kepler' },
        { q: 'Se a distância entre dois corpos dobra, a atração gravitacional:', opts: ['dobra', 'cai pela metade', 'cai para um quarto', 'fica igual'], correct: 2, chapter: 'gravitacao' },
        { q: 'Uma estrela azulada, comparada a uma avermelhada, é:', opts: ['mais fria', 'mais quente', 'mais distante', 'mais nova, sempre'], correct: 1, chapter: 'luz-telescopios' },
        { q: 'Uma estrela com paralaxe de 0,2″ está a:', opts: ['0,2 pc', '2 pc', '5 pc', '20 pc'], correct: 2, chapter: 'distancias' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'ceu-7', msg: 'Comece pelo céu visto daqui, sem pressa: em uma semana você reconhece o que vê e entende por quê.' };
        if (needs.length) return { path: 'completo-20', msg: 'Você tem boa intuição, mas há lacunas. O livro completo, na ordem, fecha todas elas.' };
        return { path: 'fisica-8', msg: 'Excelente! Você já domina o essencial. Aprofunde a parte quantitativa e siga para Astrofísica e Cosmologia quando estiver disponível.' };
    }
};
