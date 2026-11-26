/* Livro Geometria Analítica: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'geometria-analitica',
    title: 'Geometria Analítica',
    subtitle: 'Vetores, retas, planos e cônicas',
    icon: 'fa-draw-polygon',
    storage: 'mat.ga',
    wikiTitle: 'Wiki de Geometria Analítica',
    labs: [
        { id: 'retas', label: 'Retas', icon: 'fa-slash', name: 'Retas e distâncias' },
        { id: 'conicas', label: 'Cônicas', icon: 'fa-circle-half-stroke', name: 'Cônicas' },
        { id: 'espaco', label: 'Espaço', icon: 'fa-cube', name: 'Vetores no espaço' }
    ],
    labsIntro: { title: 'Figuras que viram equações', text: 'Arraste pontos e veja as equações da reta mudarem, percorra as cônicas conferindo a propriedade de cada uma e gire vetores no espaço.' },
    home: {
        eyebrow: 'Geometria Analítica',
        titleHtml: 'Desenhe com equações. <em>Resolva figuras com contas.</em>',
        lead: 'Plano cartesiano, vetores, produtos escalar, vetorial e misto, retas, circunferência, parábola, elipse, hipérbole, retas e planos no espaço. A ideia de Descartes, passo a passo, com teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Arraste pontos e veja todas as formas da equação da reta, confira a propriedade de cada cônica e gire vetores em 3D.',
        formulas: [
            { label: 'DISTÂNCIA', tex: 'd=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}' },
            { label: 'ELIPSE', tex: '\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1' },
            { label: 'ÁREA', tex: '\\|\\vec u\\times\\vec v\\|' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, do ponto ao espaço',
        map: [
            { color: 'sky', icon: 'fa-location-dot', title: 'Pontos e vetores', text: 'Distância, ponto médio, vetores e os três produtos.', tex: '\\overrightarrow{AB}=B-A', href: '#/teoria/plano-cartesiano' },
            { color: 'indigo', icon: 'fa-slash', title: 'Retas', text: 'Declividade, equações, posições e distâncias.', tex: 'm_1m_2=-1', href: '#/teoria/reta' },
            { color: 'emerald', icon: 'fa-circle-half-stroke', title: 'Cônicas', text: 'Circunferência, parábola, elipse e hipérbole.', tex: 'c^2=a^2+b^2', href: '#/teoria/circunferencia' },
            { color: 'amber', icon: 'fa-cube', title: 'Espaço', text: 'Retas e planos em três dimensões.', tex: 'ax+by+cz+d=0', href: '#/teoria/retas-planos-espaco' }
        ]
    },
    groups: [
        { id: 'pontos', title: 'Pontos e vetores', icon: 'fa-location-dot' },
        { id: 'retas', title: 'Retas no plano', icon: 'fa-slash' },
        { id: 'conicas', title: 'Cônicas', icon: 'fa-circle-half-stroke' },
        { id: 'espaco', title: 'Espaço', icon: 'fa-cube' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'plano-cartesiano', file: 'content/01-plano-cartesiano.md', group: 'pontos', minutes: 35,
          title: 'O plano cartesiano',
          summary: 'Distância, ponto médio, baricentro, área de triângulo, alinhamento e lugar geométrico.' },
        { id: 'vetores', file: 'content/02-vetores.md', group: 'pontos', minutes: 40, lab: 'espaco',
          title: 'Vetores no plano e no espaço',
          summary: 'Vetor por dois pontos, o espaço ℝ³, norma, versor, paralelismo e divisão de segmentos.' },
        { id: 'produto-escalar', file: 'content/03-produto-escalar.md', group: 'pontos', minutes: 40, lab: 'espaco',
          title: 'Produto escalar, ângulos e projeções',
          summary: 'Ângulo entre vetores, perpendicularismo, ângulos diretores, projeção e trabalho.' },
        { id: 'produto-vetorial', file: 'content/04-produto-vetorial.md', group: 'pontos', minutes: 45, lab: 'espaco',
          title: 'Produto vetorial e produto misto',
          summary: 'Vetor normal, área de paralelogramo e triângulo, volume e coplanaridade.' },
        { id: 'reta', file: 'content/05-reta.md', group: 'retas', minutes: 50, lab: 'retas',
          title: 'A reta no plano',
          summary: 'Coeficiente angular, as cinco equações, posições relativas, ângulo e distância de ponto a reta.' },
        { id: 'circunferencia', file: 'content/06-circunferencia.md', group: 'conicas', minutes: 45, lab: 'conicas',
          title: 'A circunferência',
          summary: 'Equações reduzida e geral, completar quadrados, posições de pontos e retas, tangentes.' },
        { id: 'parabola', file: 'content/07-parabola.md', group: 'conicas', minutes: 40, lab: 'conicas',
          title: 'Parábola',
          summary: 'Foco e diretriz, equações, vértice fora da origem e a propriedade refletora.' },
        { id: 'elipse', file: 'content/08-elipse.md', group: 'conicas', minutes: 40, lab: 'conicas',
          title: 'Elipse',
          summary: 'Focos, eixos, a relação a² = b² + c², excentricidade e completar quadrados.' },
        { id: 'hiperbole', file: 'content/09-hiperbole.md', group: 'conicas', minutes: 50, lab: 'conicas',
          title: 'Hipérbole e identificação das cônicas',
          summary: 'Focos, assíntotas, c² = a² + b² e como reconhecer qualquer cônica pela equação geral.' },
        { id: 'retas-planos-espaco', file: 'content/10-retas-planos-espaco.md', group: 'espaco', minutes: 55, lab: 'espaco',
          title: 'Retas e planos no espaço',
          summary: 'Equações da reta e do plano, posições relativas, retas reversas, ângulos e distâncias.' },
        { id: 'resumo', file: 'content/11-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Todas as fórmulas, um roteiro por tipo de questão e os 12 erros mais comuns.' }
    ],
    paths: [
        {
            id: 'prova-8', icon: 'fa-bolt', color: 'amber',
            title: 'Prova chegando',
            duration: '8 dias · ~2 h/dia',
            audience: 'Está cursando Geometria Analítica e precisa dominar o conteúdo que cai em prova.',
            steps: [
                { day: 'Dia 1', chapter: 'vetores', lab: 'espaco', task: 'Vetores por dois pontos, norma, versor e paralelismo.' },
                { day: 'Dia 2', chapter: 'produto-escalar', task: 'Ângulos, perpendicularismo e projeção.' },
                { day: 'Dia 3', chapter: 'produto-vetorial', lab: 'espaco', task: 'Produto vetorial e misto: área, volume e coplanaridade. Confira sempre a perpendicularidade.' },
                { day: 'Dia 4', chapter: 'reta', lab: 'retas', task: 'Equações da reta, paralelas, perpendiculares e distância de ponto a reta.' },
                { day: 'Dia 5', chapter: 'circunferencia', lab: 'conicas', task: 'Completar quadrados até ficar automático; tangentes.' },
                { day: 'Dia 6', chapter: 'elipse', lab: 'conicas', task: 'Parábola e elipse (leia o capítulo 7 antes deste).' },
                { day: 'Dia 7', chapter: 'retas-planos-espaco', lab: 'espaco', task: 'Retas e planos no espaço, retas reversas e distâncias.' },
                { day: 'Dia 8', chapter: 'resumo', task: 'Formulário e os 12 erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completa-18', icon: 'fa-seedling', color: 'emerald',
            title: 'Geometria Analítica completa',
            duration: '18 dias · ~1 h/dia',
            audience: 'Quer aprender com calma, na ordem do livro, entendendo de onde vem cada fórmula.',
            steps: [
                { day: 'Dias 1–2', chapter: 'plano-cartesiano', task: 'Distância, ponto médio, área e lugar geométrico.' },
                { day: 'Dias 3–4', chapter: 'vetores', lab: 'espaco', task: 'Vetores no plano e no espaço.' },
                { day: 'Dias 5–6', chapter: 'produto-escalar', task: 'Produto escalar e projeções.' },
                { day: 'Dias 7–8', chapter: 'produto-vetorial', lab: 'espaco', task: 'Produto vetorial e misto.' },
                { day: 'Dias 9–10', chapter: 'reta', lab: 'retas', task: 'A reta no plano.' },
                { day: 'Dia 11', chapter: 'circunferencia', lab: 'conicas', task: 'Circunferência e tangentes.' },
                { day: 'Dia 12', chapter: 'parabola', lab: 'conicas', task: 'Parábola: foco e diretriz.' },
                { day: 'Dia 13', chapter: 'elipse', lab: 'conicas', task: 'Elipse e excentricidade.' },
                { day: 'Dias 14–15', chapter: 'hiperbole', lab: 'conicas', task: 'Hipérbole e identificação das cônicas.' },
                { day: 'Dias 16–17', chapter: 'retas-planos-espaco', lab: 'espaco', task: 'Retas e planos no espaço.' },
                { day: 'Dia 18', chapter: 'resumo', task: 'Revisão geral.' }
            ]
        },
        {
            id: 'conicas-4', icon: 'fa-circle-half-stroke', color: 'indigo',
            title: 'Cônicas em 4 dias',
            duration: '4 dias · ~1,5 h/dia',
            audience: 'Só as cônicas estão travando, ou você precisa delas para o Cálculo ou a Física.',
            steps: [
                { day: 'Dia 1', chapter: 'circunferencia', lab: 'conicas', task: 'Completar quadrados na circunferência: a técnica de todas as cônicas.' },
                { day: 'Dia 2', chapter: 'parabola', lab: 'conicas', task: 'Parábola por foco e diretriz.' },
                { day: 'Dia 3', chapter: 'elipse', lab: 'conicas', task: 'Elipse: soma das distâncias e a² = b² + c².' },
                { day: 'Dia 4', chapter: 'hiperbole', lab: 'conicas', task: 'Hipérbole e o quadro para identificar qualquer cônica. Use "Identificar equação geral" no simulador.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'A distância entre $(1, -2)$ e $(7, 6)$ é:', opts: ['$14$', '$10$', '$\\sqrt{28}$', '$8$'], correct: 1, chapter: 'plano-cartesiano' },
        { q: 'O ângulo entre $(1, 1, 0)$ e $(0, 1, 1)$ é:', opts: ['$30°$', '$45°$', '$60°$', '$90°$'], correct: 2, chapter: 'produto-escalar' },
        { q: '$(1, 0, 0) \\times (0, 1, 0)$ é:', opts: ['$0$', '$(0, 0, 1)$', '$(0, 0, -1)$', '$(1, 1, 0)$'], correct: 1, chapter: 'produto-vetorial' },
        { q: 'A reta perpendicular a $y = 3x + 2$ passando pela origem é:', opts: ['$y = 3x$', '$y = -3x$', '$y = -\\frac13 x$', '$y = \\frac13 x$'], correct: 2, chapter: 'reta' },
        { q: 'O centro e o raio de $x^2 + y^2 - 4x + 6y - 3 = 0$ são:', opts: ['$(2, -3)$ e $4$', '$(-2, 3)$ e $4$', '$(2, -3)$ e $16$', '$(4, -6)$ e $3$'], correct: 0, chapter: 'circunferencia' },
        { q: 'Em $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, os focos são:', opts: ['$(\\pm 5, 0)$', '$(\\pm 4, 0)$', '$(0, \\pm 4)$', '$(\\pm 3, 0)$'], correct: 1, chapter: 'elipse' },
        { q: 'A equação $4x^2 - y^2 + 8x = 0$ representa:', opts: ['uma elipse', 'uma parábola', 'uma hipérbole', 'uma circunferência'], correct: 2, chapter: 'hiperbole' },
        { q: 'Um vetor normal ao plano $2x - y + 5z = 1$ é:', opts: ['$(2, -1, 5)$', '$(1, 2, 0)$', '$(2, 1, 5)$', '$(0, 0, 1)$'], correct: 0, chapter: 'retas-planos-espaco' }
    ],
    recommend(score, total, needs) {
        const con = ['circunferencia', 'elipse', 'hiperbole', 'parabola'];
        if (score <= 3) return { path: 'completa-18', msg: 'Vale construir a Geometria Analítica com calma, na ordem do livro.',
            extra: '<p class="small">Se travar em completar quadrados ou sistemas, revise a <a href="../algebra/#/teoria/equacoes-2grau">Álgebra elementar →</a></p>' };
        if (needs.length && needs.every(n => con.includes(n))) return { path: 'conicas-4', msg: 'Sua dificuldade está nas cônicas. Quatro dias focados resolvem.' };
        if (needs.length) return { path: 'prova-8', msg: 'Você tem base, mas há lacunas em temas que caem em toda prova.' };
        return { path: 'prova-8', msg: 'Excelente! Use a trilha de prova como revisão e os simuladores para fixar a geometria.' };
    }
};
