/* Catálogo do ecossistema de Física: fonte única para o hub, o mapa de
   pré-requisitos e os links "antes/depois" de cada livro.
   status: 'disponivel' | 'em-breve' | 'planejado'
   requires: ids dos livros de Física que devem vir antes (arestas do mapa).
   ext: livros de Matemática que ajudam (href relativo à raiz da área).
   storage: prefixo das chaves de progresso no localStorage (igual ao book.js). */
window.MATH = window.MATH || {};

/* identidade da área (lida pelo motor compartilhado em shared/engine/) */
MATH.area = { id: 'fisica', key: 'fis', name: 'Física', eco: 'Ecossistema de Física', searchEx: '☉, λ ou pc', searchHint: 'parsec, lâmbda, ☉, Kepler' };

MATH.catalog = [
    {
        id: 'mecanica', path: 'mecanica/', status: 'planejado', storage: 'fis.mec', chapters: 0,
        title: 'Mecânica', short: 'Movimento, forças, energia e gravitação',
        icon: 'fa-gears', color: 'orange', requires: [], col: 0, row: 1,
        ext: [{ title: 'Cálculo I', href: '../matematica/calculo-1/', icon: 'fa-infinity', color: 'violet', short: 'Derivadas e integrais' }],
        desc: 'Cinemática, leis de Newton, trabalho e energia, momento linear e colisões, rotação e gravitação universal.',
        topics: ['Cinemática', 'Leis de Newton', 'Energia', 'Momento', 'Rotação']
    },
    {
        id: 'ondas', path: 'ondas/', status: 'planejado', storage: 'fis.ond', chapters: 0,
        title: 'Oscilações e ondas', short: 'MHS, ressonância, ondas e som',
        icon: 'fa-wave-square', color: 'sky', requires: ['mecanica'], col: 1, row: 0,
        desc: 'Movimento harmônico simples, oscilações amortecidas e forçadas, ondas mecânicas, interferência e acústica.',
        topics: ['MHS', 'Ressonância', 'Ondas', 'Som']
    },
    {
        id: 'termodinamica', path: 'termodinamica/', status: 'planejado', storage: 'fis.term', chapters: 0,
        title: 'Termodinâmica', short: 'Calor, gases e entropia',
        icon: 'fa-temperature-half', color: 'rose', requires: ['mecanica'], col: 1, row: 1,
        desc: 'Temperatura e calor, gases ideais, primeira e segunda leis, máquinas térmicas e entropia.',
        topics: ['Calor', 'Gases ideais', 'Leis da termodinâmica', 'Entropia']
    },
    {
        id: 'eletromagnetismo', path: 'eletromagnetismo/', status: 'planejado', storage: 'fis.em', chapters: 0,
        title: 'Eletromagnetismo', short: 'Campos elétrico e magnético, circuitos',
        icon: 'fa-bolt', color: 'amber', requires: ['mecanica'], col: 1, row: 2,
        desc: 'Carga e campo elétrico, potencial, circuitos, campo magnético, indução e as equações de Maxwell.',
        topics: ['Campo elétrico', 'Circuitos', 'Magnetismo', 'Indução', 'Maxwell']
    },
    {
        id: 'optica', path: 'optica/', status: 'planejado', storage: 'fis.opt', chapters: 0,
        title: 'Óptica', short: 'Luz, lentes e interferência',
        icon: 'fa-glasses', color: 'teal', requires: ['ondas'], col: 2, row: 0,
        desc: 'Reflexão e refração, espelhos e lentes, instrumentos ópticos, interferência, difração e polarização.',
        topics: ['Refração', 'Lentes', 'Interferência', 'Difração']
    },
    {
        id: 'moderna', path: 'moderna/', status: 'disponivel', storage: 'fis.mod', chapters: 14,
        title: 'Física Moderna', short: 'Relatividade, física quântica, núcleo e partículas',
        icon: 'fa-atom', color: 'indigo', requires: ['eletromagnetismo', 'optica'], col: 3, row: 1,
        ext: [{ title: 'Funções', href: '../matematica/funcoes/', icon: 'fa-chart-line', color: 'emerald', short: 'Exponenciais e logaritmos (meia-vida)' }, { title: 'Cálculo I', href: '../matematica/calculo-1/', icon: 'fa-chart-area', color: 'indigo', short: 'Derivadas e integrais na equação de Schrödinger' }],
        desc: 'Relatividade especial e geral, E = mc², corpo negro, efeito fotoelétrico, átomo de Bohr e espectros, dualidade onda-partícula, princípio da incerteza, equação de Schrödinger e tunelamento, radioatividade, fissão, fusão e o Modelo Padrão. Com seis simuladores.',
        topics: ['Relatividade', 'E = mc²', 'Fótons', 'Átomo de Bohr', 'Dupla fenda', 'Tunelamento', 'Radioatividade', 'Modelo Padrão']
    },
    {
        id: 'astronomia', path: 'astronomia/', status: 'disponivel', storage: 'fis.astro', chapters: 13,
        title: 'Astronomia', short: 'O céu, a Lua, os planetas e as leis de Kepler',
        icon: 'fa-moon', color: 'violet', requires: [], col: 0, row: 3,
        ext: [{ title: 'Funções', href: '../matematica/funcoes/', icon: 'fa-chart-line', color: 'emerald', short: 'Trigonometria, potências e logaritmos' },
              { title: 'Geometria Analítica', href: '../matematica/geometria-analitica/', icon: 'fa-vector-square', color: 'amber', short: 'Elipses e coordenadas' }],
        desc: 'Esfera celeste e coordenadas, estações, fases da Lua e eclipses, movimento dos planetas, leis de Kepler e gravitação, Sistema Solar, telescópios, distâncias e exoplanetas. Com planetário.',
        topics: ['Esfera celeste', 'Estações', 'Lua e eclipses', 'Kepler', 'Gravitação', 'Sistema Solar', 'Exoplanetas']
    },
    {
        id: 'cosmologia', path: 'cosmologia/', status: 'disponivel', storage: 'fis.cosmo', chapters: 15,
        title: 'Astrofísica e Cosmologia', short: 'Estrelas, pulsares, buracos negros e o Big Bang',
        icon: 'fa-hurricane', color: 'emerald', requires: ['astronomia', 'moderna'], col: 4, row: 3,
        ext: [{ title: 'Funções', href: '../matematica/funcoes/', icon: 'fa-chart-line', color: 'emerald', short: 'Potências, exponenciais e logaritmos' }],
        desc: 'O Sol e as estrelas, diagrama HR, nascimento e morte das estrelas, supernovas, estrelas de nêutrons, pulsares e magnetares, buracos negros, galáxias e matéria escura, quasares, expansão do universo, Big Bang e energia escura. Com cinco simuladores.',
        topics: ['Diagrama HR', 'Supernovas', 'Pulsares e magnetares', 'Buracos negros', 'Quasares', 'Matéria escura', 'Big Bang']
    }
];

MATH.statusLabel = { 'disponivel': 'Disponível', 'em-breve': 'Em breve', 'planejado': 'Planejado' };

/* rotas por objetivo, exibidas no hub */
MATH.routes = [
    { icon: 'fa-star', color: 'violet', title: 'Quero entender o céu',
      text: 'Comece pela Astronomia: o planetário mostra o céu de qualquer lugar e data, e os capítulos explicam o que você está vendo. Nenhum pré-requisito além de contas básicas.',
      steps: [{ b: 'astronomia', label: 'Diagnóstico de Astronomia', href: 'astronomia/#/trilhas' }, { b: 'astronomia', label: 'Planetário', href: 'astronomia/#/lab/planetario' }, { b: 'cosmologia', label: 'Depois: Astrofísica e Cosmologia', href: 'cosmologia/' }] },
    { icon: 'fa-atom', color: 'indigo', title: 'Relatividade e física quântica',
      text: 'Einstein, Planck, Bohr e Schrödinger: tempo que dilata, luz em pacotes, elétrons que interferem consigo mesmos e o núcleo atômico. Os simuladores resolvem as equações ao vivo.',
      steps: [{ b: 'moderna', label: 'Diagnóstico de Física Moderna', href: 'moderna/#/trilhas' }, { b: 'moderna', label: 'Gêmeos e espaço-tempo', href: 'moderna/#/lab/relatividade' }, { b: 'moderna', label: 'Dupla fenda', href: 'moderna/#/lab/fenda' }, { b: 'moderna', label: 'Tunelamento', href: 'moderna/#/lab/quantica' }] },
    { icon: 'fa-circle', color: 'rose', title: 'Pulsares, buracos negros e o Big Bang',
      text: 'Direto aos objetos extremos: a morte das estrelas, pulsares e magnetares, buracos negros, quasares e a história do universo. Os simuladores mostram cada um em movimento.',
      steps: [{ b: 'cosmologia', label: 'Diagnóstico de Astrofísica e Cosmologia', href: 'cosmologia/#/trilhas' }, { b: 'cosmologia', label: 'Pulsar', href: 'cosmologia/#/lab/pulsar' }, { b: 'cosmologia', label: 'Buraco negro', href: 'cosmologia/#/lab/buraco' }, { b: 'cosmologia', label: 'Universo em expansão', href: 'cosmologia/#/lab/expansao' }] },
    { icon: 'fa-graduation-cap', color: 'sky', title: 'Física básica da graduação',
      text: 'Mecânica primeiro, com Cálculo I em paralelo. Depois ondas, termodinâmica e eletromagnetismo.',
      steps: [{ b: 'mecanica', label: 'Mecânica', href: 'mecanica/' }, { b: 'ondas', label: 'Oscilações e ondas', href: 'ondas/' }, { b: 'termodinamica', label: 'Termodinâmica', href: 'termodinamica/' }, { b: 'eletromagnetismo', label: 'Eletromagnetismo', href: 'eletromagnetismo/' }] }
];
