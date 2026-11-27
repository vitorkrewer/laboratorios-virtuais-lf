/* Livro Astrofísica e Cosmologia: configuração, capítulos, trilhas e diagnóstico (lido por shared/engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'cosmologia',
    title: 'Astrofísica e Cosmologia',
    subtitle: 'Estrelas, pulsares, buracos negros e a história do universo',
    icon: 'fa-hurricane',
    storage: 'fis.cosmo',
    wikiTitle: 'Wiki de Astrofísica e Cosmologia',
    labs: [
        { id: 'evolucao', label: 'Estrelas', icon: 'fa-sun', name: 'Evolução estelar e diagrama HR' },
        { id: 'pulsar', label: 'Pulsar', icon: 'fa-tower-broadcast', name: 'Pulsares e magnetares' },
        { id: 'buraco', label: 'Buraco negro', icon: 'fa-circle', name: 'Buraco negro: lente, disco e tempo' },
        { id: 'galaxia', label: 'Galáxia', icon: 'fa-hurricane', name: 'Galáxia e matéria escura' },
        { id: 'expansao', label: 'Expansão', icon: 'fa-maximize', name: 'Universo em expansão' }
    ],
    labsIntro: { title: 'O universo em movimento', text: 'Uma estrela vivendo do nascimento à morte no diagrama HR; um pulsar girando com os feixes e o som dos pulsos; um buraco negro que curva a luz das estrelas ao fundo; uma galáxia girando com e sem matéria escura; e o universo se expandindo desde o Big Bang.' },
    home: {
        eyebrow: 'Astrofísica e Cosmologia',
        titleHtml: 'Do coração do Sol <em>à borda do universo observável.</em>',
        lead: 'Como as estrelas nascem, vivem e morrem; anãs brancas, supernovas, estrelas de nêutrons, <strong>pulsares e magnetares</strong>; <strong>buracos negros</strong>, galáxias, matéria escura e <strong>quasares</strong>; a expansão do universo, o Big Bang e a energia escura. Com testes rápidos, exercícios resolvidos e cinco simuladores.',
        labPitch: 'Acompanhe uma estrela no diagrama HR até a explosão, ouça um pulsar, veja a luz das estrelas se curvar em volta de um buraco negro, gire uma galáxia com e sem matéria escura e expanda o universo.',
        formulas: [
            { label: 'EINSTEIN', tex: 'E = mc^2' },
            { label: 'SCHWARZSCHILD', tex: 'r_s = \\frac{2GM}{c^2}' },
            { label: 'HUBBLE', tex: 'v = H_0\\,d' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, do Sol ao Big Bang',
        map: [
            { color: 'amber', icon: 'fa-sun', title: 'As estrelas', text: 'O Sol, propriedades das estrelas, diagrama HR e nascimento.', tex: 'L = 4\\pi R^2\\sigma T^4', href: '#/teoria/sol' },
            { color: 'rose', icon: 'fa-burst', title: 'A morte das estrelas', text: 'Gigantes vermelhas, anãs brancas e supernovas.', tex: 'M_\\text{Ch} \\approx 1{,}4\\,M_\\odot', href: '#/teoria/morte-estrelas' },
            { color: 'violet', icon: 'fa-tower-broadcast', title: 'Objetos extremos', text: 'Estrelas de nêutrons, pulsares, magnetares e buracos negros.', tex: '\\tau = \\frac{P}{2\\dot P}', href: '#/teoria/pulsares' },
            { color: 'sky', icon: 'fa-hurricane', title: 'Galáxias e universo', text: 'Matéria escura, quasares, expansão, Big Bang e energia escura.', tex: '1 + z = \\frac{a_0}{a}', href: '#/teoria/galaxias' }
        ]
    },
    groups: [
        { id: 'estrelas', title: 'As estrelas', icon: 'fa-sun' },
        { id: 'morte', title: 'A morte das estrelas', icon: 'fa-burst' },
        { id: 'extremos', title: 'Objetos extremos', icon: 'fa-tower-broadcast' },
        { id: 'universo', title: 'Galáxias e universo', icon: 'fa-hurricane' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'sol', file: 'content/01-sol.md', group: 'estrelas', minutes: 40,
          title: 'O Sol, uma estrela de perto',
          summary: 'Fusão nuclear e E = mc², equilíbrio hidrostático, camadas, neutrinos e atividade solar.' },
        { id: 'estrelas', file: 'content/02-estrelas.md', group: 'estrelas', minutes: 40, lab: 'evolucao',
          title: 'Propriedades das estrelas',
          summary: 'Classes espectrais, luminosidade, raio, massa pelas binárias e composição.' },
        { id: 'diagrama-hr', file: 'content/03-diagrama-hr.md', group: 'estrelas', minutes: 40, lab: 'evolucao',
          title: 'O diagrama HR e a sequência principal',
          summary: 'Regiões do diagrama, relação massa-luminosidade, tempo de vida e aglomerados.' },
        { id: 'nascimento', file: 'content/04-nascimento.md', group: 'estrelas', minutes: 35,
          title: 'Nebulosas e o nascimento das estrelas',
          summary: 'Meio interestelar, colapso de Jeans, protoestrelas, discos e anãs marrons.' },
        { id: 'morte-estrelas', file: 'content/05-morte-estrelas.md', group: 'morte', minutes: 40, lab: 'evolucao',
          title: 'Gigantes vermelhas, nebulosas planetárias e anãs brancas',
          summary: 'O fim de estrelas como o Sol, a degenerescência e o limite de Chandrasekhar.' },
        { id: 'supernovas', file: 'content/06-supernovas.md', group: 'morte', minutes: 45, lab: 'evolucao',
          title: 'Estrelas massivas e supernovas',
          summary: 'A cebola nuclear, o colapso do núcleo, supernovas Ia e a origem dos elementos.' },
        { id: 'pulsares', file: 'content/07-pulsares.md', group: 'extremos', minutes: 45, lab: 'pulsar',
          title: 'Estrelas de nêutrons e pulsares',
          summary: 'Matéria nuclear, o farol cósmico, a frenagem, pulsares de milissegundo e ondas gravitacionais.' },
        { id: 'magnetares', file: 'content/08-magnetares.md', group: 'extremos', minutes: 35, lab: 'pulsar',
          title: 'Magnetares',
          summary: 'Os ímãs mais fortes do universo, terremotos estelares, a explosão de 2004 e as rajadas rápidas de rádio.' },
        { id: 'buracos-negros', file: 'content/09-buracos-negros.md', group: 'extremos', minutes: 55, lab: 'buraco',
          title: 'Buracos negros',
          summary: 'Raio de Schwarzschild, órbitas e sombra, dilatação do tempo, marés e as evidências.' },
        { id: 'galaxias', file: 'content/10-galaxias.md', group: 'universo', minutes: 45, lab: 'galaxia',
          title: 'A Via Láctea, as galáxias e a matéria escura',
          summary: 'Nossa galáxia, os tipos de Hubble, curvas de rotação e matéria escura.' },
        { id: 'quasares', file: 'content/11-quasares.md', group: 'universo', minutes: 40, lab: 'buraco',
          title: 'Galáxias ativas e quasares',
          summary: 'Discos de acreção, limite de Eddington, jatos, o modelo unificado e os quasares mais distantes.' },
        { id: 'expansao', file: 'content/12-expansao.md', group: 'universo', minutes: 40, lab: 'expansao',
          title: 'A expansão do universo',
          summary: 'Lei de Hubble-Lemaître, desvio para o vermelho cosmológico, tensão de Hubble e universo observável.' },
        { id: 'big-bang', file: 'content/13-big-bang.md', group: 'universo', minutes: 40, lab: 'expansao',
          title: 'O Big Bang e a radiação cósmica de fundo',
          summary: 'Linha do tempo, nucleossíntese, a radiação de fundo e o paradoxo de Olbers.' },
        { id: 'energia-escura', file: 'content/14-energia-escura.md', group: 'universo', minutes: 40, lab: 'expansao',
          title: 'Energia escura e o destino do universo',
          summary: 'A expansão acelerada, o modelo ΛCDM, geometria plana e os destinos possíveis.' },
        { id: 'resumo', file: 'content/15-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Fórmulas, números úteis e as ideias erradas mais frequentes.' }
    ],
    paths: [
        {
            id: 'extremos-7', icon: 'fa-tower-broadcast', color: 'violet',
            title: 'Pulsares, magnetares e buracos negros',
            duration: '7 dias · ~40 min/dia',
            audience: 'Quer ir direto aos objetos mais extremos do universo, com o mínimo de contas.',
            steps: [
                { day: 'Dia 1', chapter: 'diagrama-hr', lab: 'evolucao', task: 'Veja no simulador como a massa decide o destino de uma estrela.' },
                { day: 'Dia 2', chapter: 'supernovas', lab: 'evolucao', task: 'Escolha 15 massas solares e leve a estrela até a explosão.' },
                { day: 'Dia 3', chapter: 'pulsares', lab: 'pulsar', task: 'Ouça o pulsar do Caranguejo e um pulsar de milissegundo.' },
                { day: 'Dia 4', chapter: 'magnetares', lab: 'pulsar', task: 'Modo magnetar: provoque um terremoto estelar.' },
                { day: 'Dia 5', chapter: 'buracos-negros', lab: 'buraco', task: 'Aproxime-se do horizonte e anote quanto tempo passa lá fora.' },
                { day: 'Dia 6', chapter: 'quasares', lab: 'buraco', task: 'Ligue o disco de acreção de um buraco negro supermassivo.' },
                { day: 'Dia 7', chapter: 'resumo', task: 'Erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completo-20', icon: 'fa-seedling', color: 'emerald',
            title: 'Astrofísica e Cosmologia completas',
            duration: '20 dias · ~1 h/dia',
            audience: 'Quer estudar o livro inteiro na ordem, com as contas.',
            steps: [
                { day: 'Dias 1–2', chapter: 'sol', task: 'O Sol e a fusão nuclear.' },
                { day: 'Dia 3', chapter: 'estrelas', lab: 'evolucao', task: 'Propriedades das estrelas.' },
                { day: 'Dia 4', chapter: 'diagrama-hr', lab: 'evolucao', task: 'Diagrama HR.' },
                { day: 'Dia 5', chapter: 'nascimento', task: 'Nascimento das estrelas.' },
                { day: 'Dias 6–7', chapter: 'morte-estrelas', lab: 'evolucao', task: 'Gigantes vermelhas e anãs brancas.' },
                { day: 'Dia 8', chapter: 'supernovas', lab: 'evolucao', task: 'Supernovas.' },
                { day: 'Dias 9–10', chapter: 'pulsares', lab: 'pulsar', task: 'Estrelas de nêutrons e pulsares.' },
                { day: 'Dia 11', chapter: 'magnetares', lab: 'pulsar', task: 'Magnetares.' },
                { day: 'Dias 12–13', chapter: 'buracos-negros', lab: 'buraco', task: 'Buracos negros.' },
                { day: 'Dia 14', chapter: 'galaxias', lab: 'galaxia', task: 'Galáxias e matéria escura.' },
                { day: 'Dia 15', chapter: 'quasares', lab: 'buraco', task: 'Quasares.' },
                { day: 'Dias 16–17', chapter: 'expansao', lab: 'expansao', task: 'Expansão do universo.' },
                { day: 'Dia 18', chapter: 'big-bang', lab: 'expansao', task: 'Big Bang e radiação de fundo.' },
                { day: 'Dia 19', chapter: 'energia-escura', lab: 'expansao', task: 'Energia escura e destino.' },
                { day: 'Dia 20', chapter: 'resumo', task: 'Revisão geral.' }
            ]
        },
        {
            id: 'cosmo-8', icon: 'fa-maximize', color: 'sky',
            title: 'Cosmologia',
            duration: '8 dias · ~1 h/dia',
            audience: 'Já conhece as estrelas e quer o universo em grande escala: galáxias, expansão, Big Bang.',
            steps: [
                { day: 'Dia 1', chapter: 'galaxias', lab: 'galaxia', task: 'Curva de rotação e matéria escura.' },
                { day: 'Dia 2', chapter: 'quasares', lab: 'buraco', task: 'Quasares e o limite de Eddington.' },
                { day: 'Dia 3', chapter: 'expansao', lab: 'expansao', task: 'Lei de Hubble e desvio para o vermelho.' },
                { day: 'Dia 4', chapter: 'expansao', task: 'Tempo de Hubble e tensão de Hubble. Refaça os exercícios.' },
                { day: 'Dia 5', chapter: 'big-bang', lab: 'expansao', task: 'Linha do tempo do universo.' },
                { day: 'Dia 6', chapter: 'big-bang', task: 'Radiação de fundo: Wien e temperatura com z.' },
                { day: 'Dia 7', chapter: 'energia-escura', lab: 'expansao', task: 'Destino do universo no simulador.' },
                { day: 'Dia 8', chapter: 'resumo', task: 'Formulário e números úteis.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'A energia do Sol vem principalmente de:', opts: ['combustão de gases', 'fusão de hidrogênio em hélio', 'fissão de urânio', 'contração gravitacional'], correct: 1, chapter: 'sol' },
        { q: 'No diagrama HR, a temperatura das estrelas:', opts: ['aumenta para a direita', 'aumenta para a esquerda', 'aumenta para cima', 'não aparece'], correct: 1, chapter: 'diagrama-hr' },
        { q: 'Comparada ao Sol, uma estrela de 10 massas solares vive:', opts: ['muito mais', 'o mesmo tempo', 'muito menos', 'para sempre'], correct: 2, chapter: 'diagrama-hr' },
        { q: 'O Sol vai terminar a vida como:', opts: ['buraco negro', 'estrela de nêutrons', 'anã branca', 'supernova'], correct: 2, chapter: 'morte-estrelas' },
        { q: 'Um pulsar é:', opts: ['uma estrela que pisca', 'uma estrela de nêutrons em rotação com feixes de radiação', 'um buraco negro pequeno', 'um planeta'], correct: 1, chapter: 'pulsares' },
        { q: 'Se o Sol virasse um buraco negro de mesma massa, a órbita da Terra:', opts: ['seria sugada', 'ficaria a mesma', 'escaparia do Sistema Solar', 'dobraria de tamanho'], correct: 1, chapter: 'buracos-negros' },
        { q: 'As curvas de rotação planas das galáxias indicam:', opts: ['buracos negros nas bordas', 'matéria escura', 'energia escura', 'erros de medida'], correct: 1, chapter: 'galaxias' },
        { q: 'Uma galáxia duas vezes mais distante se afasta:', opts: ['igual', 'duas vezes mais depressa', 'quatro vezes mais depressa', 'mais devagar'], correct: 1, chapter: 'expansao' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'completo-20', msg: 'Comece pelas estrelas, na ordem: o livro completo constrói cada ideia sobre a anterior.', extra: 'Se faltar base sobre luz, distâncias e gravitação, veja antes o livro Astronomia.' };
        if (needs.length) return { path: 'extremos-7', msg: 'Você tem boa base. Vá aos objetos extremos e revise os capítulos indicados no caminho.' };
        return { path: 'cosmo-8', msg: 'Excelente! Você já domina as estrelas. Siga para a cosmologia: galáxias, expansão e o Big Bang.' };
    }
};
