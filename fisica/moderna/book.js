/* Livro Física Moderna: configuração, capítulos, trilhas e diagnóstico (lido por shared/engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'moderna',
    title: 'Física Moderna',
    subtitle: 'Relatividade, física quântica, núcleo e partículas',
    icon: 'fa-atom',
    storage: 'fis.mod',
    wikiTitle: 'Wiki de Física Moderna',
    labs: [
        { id: 'relatividade', label: 'Relatividade', icon: 'fa-shuttle-space', name: 'Relatividade: relógios, gêmeos e espaço-tempo' },
        { id: 'fotoeletrico', label: 'Fotoelétrico', icon: 'fa-lightbulb', name: 'Efeito fotoelétrico' },
        { id: 'espectros', label: 'Átomo', icon: 'fa-rainbow', name: 'Átomo de hidrogênio e espectros' },
        { id: 'fenda', label: 'Dupla fenda', icon: 'fa-grip-lines-vertical', name: 'Dupla fenda, partícula por partícula' },
        { id: 'quantica', label: 'Quântica', icon: 'fa-wave-square', name: 'Equação de Schrödinger: tunelamento e caixa' },
        { id: 'nuclear', label: 'Nuclear', icon: 'fa-radiation', name: 'Decaimento radioativo e reação em cadeia' }
    ],
    labsIntro: { title: 'O muito rápido e o muito pequeno', text: 'Relógios de luz, gêmeos que envelhecem diferente e o diagrama do espaço-tempo; fótons arrancando elétrons de um metal; o elétron do hidrogênio saltando entre níveis e acendendo as linhas do espectro; elétrons atravessando duas fendas um a um; a equação de Schrödinger resolvida ao vivo; núcleos decaindo ao acaso e uma reação em cadeia.' },
    home: {
        eyebrow: 'Física Moderna',
        titleHtml: 'Quando a física de Newton <em>deixa de funcionar.</em>',
        lead: 'Perto da velocidade da luz, o tempo e o espaço mudam: <strong>relatividade</strong>. Na escala dos átomos, energia vem em pacotes e partículas se comportam como ondas: <strong>física quântica</strong>. E dentro do núcleo está uma energia um milhão de vezes maior que a química. Com testes rápidos, exercícios resolvidos e seis simuladores.',
        labPitch: 'Viaje com um gêmeo a 90% da luz, ilumine metais com cores diferentes, excite o átomo de hidrogênio, dispare elétrons contra duas fendas, veja um pacote de onda atravessar uma barreira e controle uma reação em cadeia.',
        formulas: [
            { label: 'EINSTEIN', tex: 'E = mc^2' },
            { label: 'PLANCK', tex: 'E = hf' },
            { label: 'DE BROGLIE', tex: '\\lambda = \\frac{h}{p}' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, de 1905 ao bóson de Higgs',
        map: [
            { color: 'sky', icon: 'fa-shuttle-space', title: 'Relatividade', text: 'Postulados, dilatação do tempo, espaço-tempo, E = mc² e gravidade como curvatura.', tex: '\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}', href: '#/teoria/relatividade' },
            { color: 'amber', icon: 'fa-lightbulb', title: 'A luz e o átomo', text: 'Corpo negro, fótons, efeito fotoelétrico e o átomo de Bohr.', tex: 'E_n = -\\frac{13{,}6\\ \\text{eV}}{n^2}', href: '#/teoria/corpo-negro' },
            { color: 'violet', icon: 'fa-wave-square', title: 'Mecânica quântica', text: 'Ondas de matéria, incerteza, função de onda e tunelamento.', tex: '\\Delta x\\,\\Delta p \\geq \\frac{\\hbar}{2}', href: '#/teoria/dualidade' },
            { color: 'rose', icon: 'fa-radiation', title: 'Núcleo e partículas', text: 'Radioatividade, fissão, fusão e o Modelo Padrão.', tex: 'N = N_0\\,e^{-\\lambda t}', href: '#/teoria/nucleo' }
        ]
    },
    groups: [
        { id: 'relat', title: 'Relatividade', icon: 'fa-shuttle-space' },
        { id: 'luz', title: 'A luz e o átomo', icon: 'fa-lightbulb' },
        { id: 'quant', title: 'Mecânica quântica', icon: 'fa-wave-square' },
        { id: 'nucleo', title: 'Núcleo e partículas', icon: 'fa-radiation' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'relatividade', file: 'content/01-relatividade.md', group: 'relat', minutes: 40, lab: 'relatividade',
          title: 'A luz e os postulados da relatividade',
          summary: 'O éter, Michelson e Morley, os postulados de Einstein, a simultaneidade e o fator de Lorentz.' },
        { id: 'tempo-espaco', file: 'content/02-tempo-espaco.md', group: 'relat', minutes: 45, lab: 'relatividade',
          title: 'Dilatação do tempo e contração do espaço',
          summary: 'Relógios lentos, réguas curtas, os múons, o paradoxo dos gêmeos e o GPS.' },
        { id: 'espaco-tempo', file: 'content/03-espaco-tempo.md', group: 'relat', minutes: 45, lab: 'relatividade',
          title: 'Espaço-tempo e transformações de Lorentz',
          summary: 'Diagramas de Minkowski, cone de luz, intervalo invariante e soma de velocidades.' },
        { id: 'energia-relativistica', file: 'content/04-energia-relativistica.md', group: 'relat', minutes: 40,
          title: 'Massa, energia e momento',
          summary: 'Momento relativístico, E = mc², a relação energia-momento e a energia de ligação.' },
        { id: 'relatividade-geral', file: 'content/05-relatividade-geral.md', group: 'relat', minutes: 35,
          title: 'Gravidade como curvatura: a relatividade geral',
          summary: 'Princípio de equivalência, desvio da luz, Mercúrio, o tempo e a gravidade, ondas gravitacionais.' },
        { id: 'corpo-negro', file: 'content/06-corpo-negro.md', group: 'luz', minutes: 35,
          title: 'Corpo negro e a energia em pacotes',
          summary: 'A catástrofe do ultravioleta, a hipótese de Planck e o tamanho de um quantum.' },
        { id: 'fotoeletrico', file: 'content/07-fotoeletrico.md', group: 'luz', minutes: 40, lab: 'fotoeletrico',
          title: 'O efeito fotoelétrico e o fóton',
          summary: 'Frequência de corte, função trabalho, a reta de Millikan e a dualidade da luz.' },
        { id: 'atomo', file: 'content/08-atomo.md', group: 'luz', minutes: 45, lab: 'espectros',
          title: 'O átomo de Bohr e os espectros',
          summary: 'O núcleo de Rutherford, as linhas do hidrogênio, níveis de energia, emissão e absorção.' },
        { id: 'dualidade', file: 'content/09-dualidade.md', group: 'quant', minutes: 45, lab: 'fenda',
          title: 'Ondas de matéria e o princípio da incerteza',
          summary: 'De Broglie, a dupla fenda partícula por partícula, Heisenberg e a complementaridade.' },
        { id: 'schrodinger', file: 'content/10-schrodinger.md', group: 'quant', minutes: 50, lab: 'quantica',
          title: 'A função de onda e a equação de Schrödinger',
          summary: 'Regra de Born, partícula na caixa, superposição, tunelamento, orbitais e o princípio de Pauli.' },
        { id: 'nucleo', file: 'content/11-nucleo.md', group: 'nucleo', minutes: 45, lab: 'nuclear',
          title: 'O núcleo e a radioatividade',
          summary: 'Isótopos, força forte, energia de ligação, alfa, beta e gama, meia-vida e carbono-14.' },
        { id: 'fissao-fusao', file: 'content/12-fissao-fusao.md', group: 'nucleo', minutes: 45, lab: 'nuclear',
          title: 'Fissão, fusão e energia nuclear',
          summary: 'Reação em cadeia, reatores, fusão por confinamento magnético e inercial, radiação e saúde.' },
        { id: 'particulas', file: 'content/13-particulas.md', group: 'nucleo', minutes: 40,
          title: 'Partículas elementares e o Modelo Padrão',
          summary: 'Antimatéria, quarks e léptons, as forças, o bóson de Higgs e os neutrinos.' },
        { id: 'resumo', file: 'content/14-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Fórmulas, constantes e as ideias erradas mais frequentes.' }
    ],
    paths: [
        {
            id: 'relatividade-6', icon: 'fa-shuttle-space', color: 'sky',
            title: 'Relatividade em uma semana',
            duration: '6 dias · ~45 min/dia',
            audience: 'Quer entender a dilatação do tempo, o paradoxo dos gêmeos e E = mc² com as contas.',
            steps: [
                { day: 'Dia 1', chapter: 'relatividade', lab: 'relatividade', task: 'Relógio de luz: compare o tique no trem e na plataforma.' },
                { day: 'Dia 2', chapter: 'tempo-espaco', lab: 'relatividade', task: 'Modo gêmeos: mande uma nave a 0,8c até uma estrela a 4 anos-luz.' },
                { day: 'Dia 3', chapter: 'espaco-tempo', lab: 'relatividade', task: 'Modo espaço-tempo: veja os eixos se inclinarem.' },
                { day: 'Dia 4', chapter: 'energia-relativistica', task: 'Faça os exercícios de energia e momento.' },
                { day: 'Dia 5', chapter: 'relatividade-geral', task: 'Calcule a correção do GPS.' },
                { day: 'Dia 6', chapter: 'resumo', task: 'Erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completo-20', icon: 'fa-seedling', color: 'emerald',
            title: 'Física Moderna completa',
            duration: '20 dias · ~1 h/dia',
            audience: 'Quer estudar o livro inteiro na ordem, como num curso de graduação.',
            steps: [
                { day: 'Dia 1', chapter: 'relatividade', lab: 'relatividade', task: 'Postulados e simultaneidade.' },
                { day: 'Dias 2–3', chapter: 'tempo-espaco', lab: 'relatividade', task: 'Dilatação, contração e gêmeos.' },
                { day: 'Dias 4–5', chapter: 'espaco-tempo', lab: 'relatividade', task: 'Diagramas de Minkowski e Lorentz.' },
                { day: 'Dia 6', chapter: 'energia-relativistica', task: 'Energia e momento.' },
                { day: 'Dia 7', chapter: 'relatividade-geral', task: 'Relatividade geral.' },
                { day: 'Dia 8', chapter: 'corpo-negro', task: 'Planck e o quantum.' },
                { day: 'Dias 9–10', chapter: 'fotoeletrico', lab: 'fotoeletrico', task: 'Efeito fotoelétrico.' },
                { day: 'Dias 11–12', chapter: 'atomo', lab: 'espectros', task: 'Átomo de Bohr e espectros.' },
                { day: 'Dia 13', chapter: 'dualidade', lab: 'fenda', task: 'Dupla fenda e incerteza.' },
                { day: 'Dias 14–15', chapter: 'schrodinger', lab: 'quantica', task: 'Função de onda e tunelamento.' },
                { day: 'Dias 16–17', chapter: 'nucleo', lab: 'nuclear', task: 'Radioatividade e meia-vida.' },
                { day: 'Dia 18', chapter: 'fissao-fusao', lab: 'nuclear', task: 'Fissão e fusão.' },
                { day: 'Dia 19', chapter: 'particulas', task: 'Modelo Padrão.' },
                { day: 'Dia 20', chapter: 'resumo', task: 'Revisão geral.' }
            ]
        },
        {
            id: 'quantica-8', icon: 'fa-wave-square', color: 'violet',
            title: 'Física quântica',
            duration: '8 dias · ~1 h/dia',
            audience: 'Já conhece a relatividade (ou não precisa dela agora) e quer ir direto ao mundo quântico.',
            steps: [
                { day: 'Dia 1', chapter: 'corpo-negro', task: 'O quantum de Planck.' },
                { day: 'Dia 2', chapter: 'fotoeletrico', lab: 'fotoeletrico', task: 'Encontre a frequência de corte de cada metal.' },
                { day: 'Dia 3', chapter: 'atomo', lab: 'espectros', task: 'Monte a série de Balmer no simulador.' },
                { day: 'Dia 4', chapter: 'dualidade', lab: 'fenda', task: 'Dispare 2 000 elétrons e depois ligue o detector.' },
                { day: 'Dia 5', chapter: 'schrodinger', lab: 'quantica', task: 'Tunelamento: mude a largura da barreira.' },
                { day: 'Dia 6', chapter: 'schrodinger', lab: 'quantica', task: 'Caixa: superponha os estados 1 e 2.' },
                { day: 'Dia 7', chapter: 'nucleo', lab: 'nuclear', task: 'O tunelamento no decaimento alfa e a meia-vida.' },
                { day: 'Dia 8', chapter: 'resumo', task: 'Formulário e erros comuns.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'Uma nave a 0,5c acende o farol. Para quem está parado, a luz do farol viaja a:', opts: ['1,5c', 'c', '0,5c', 'depende da nave'], correct: 1, chapter: 'relatividade' },
        { q: 'Um relógio que passa em alta velocidade, comparado ao seu:', opts: ['adianta', 'atrasa', 'marca o mesmo', 'para'], correct: 1, chapter: 'tempo-espaco' },
        { q: 'Em E = mc², o que significa m?', opts: ['a massa de repouso', 'o momento', 'a massa que cresce com a velocidade', 'o número de partículas'], correct: 0, chapter: 'energia-relativistica' },
        { q: 'A energia de um fóton é proporcional:', opts: ['à intensidade da luz', 'à frequência', 'ao comprimento de onda', 'à velocidade'], correct: 1, chapter: 'corpo-negro' },
        { q: 'No efeito fotoelétrico, aumentar a intensidade da luz (acima do corte):', opts: ['aumenta a energia de cada elétron', 'aumenta o número de elétrons', 'não muda nada', 'impede a emissão'], correct: 1, chapter: 'fotoeletrico' },
        { q: 'As linhas do espectro do hidrogênio vêm de:', opts: ['saltos do elétron entre níveis de energia', 'colisões entre átomos', 'a rotação do núcleo', 'o calor do gás'], correct: 0, chapter: 'atomo' },
        { q: 'O comprimento de onda de de Broglie de uma partícula aumenta quando:', opts: ['o momento aumenta', 'o momento diminui', 'a carga aumenta', 'nunca muda'], correct: 1, chapter: 'dualidade' },
        { q: 'Depois de duas meias-vidas, uma amostra radioativa tem:', opts: ['nada', 'metade', 'um quarto', 'um terço'], correct: 2, chapter: 'nucleo' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'completo-20', msg: 'Comece pelo começo: o livro completo constrói cada ideia sobre a anterior.', extra: 'Se faltar base de energia, ondas e eletricidade, revise essas ideias à medida que aparecerem.' };
        const quantum = needs.some(c => ['corpo-negro', 'fotoeletrico', 'atomo', 'dualidade', 'nucleo'].includes(c));
        if (needs.length && !quantum) return { path: 'relatividade-6', msg: 'Sua base quântica está boa. Reforce a relatividade com a trilha de uma semana.' };
        if (needs.length) return { path: 'quantica-8', msg: 'Você tem boa base. Reforce a parte quântica e revise os capítulos indicados no caminho.' };
        return { path: 'quantica-8', msg: 'Excelente! Você já domina o essencial. Use a trilha quântica para aprofundar com os simuladores e as contas.', extra: 'Depois, o livro Astrofísica e Cosmologia aplica tudo isso às estrelas e aos buracos negros.' };
    }
};
