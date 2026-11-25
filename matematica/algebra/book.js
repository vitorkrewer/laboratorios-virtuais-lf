/* Livro Álgebra elementar: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'algebra',
    title: 'Álgebra elementar',
    subtitle: 'Contas, expressões e equações',
    icon: 'fa-scale-balanced',
    storage: 'mat.alg',
    wikiTitle: 'Wiki de Álgebra',
    labs: [
        { id: 'balanca', label: 'Balança', icon: 'fa-scale-balanced', name: 'Balança de equações' },
        { id: 'areas', label: 'Áreas', icon: 'fa-vector-square', name: 'Modelo de áreas' },
        { id: 'treino', label: 'Treino', icon: 'fa-dumbbell', name: 'Treino infinito' }
    ],
    labsIntro: { title: 'Pratique até ficar automático', text: 'Resolva equações em uma balança, veja os produtos notáveis como áreas e treine contas sem fim, com solução passo a passo.' },
    home: {
        eyebrow: 'Álgebra elementar',
        titleHtml: 'Faz tempo que saiu da escola? <em>Comece por aqui.</em>',
        lead: 'Sinais, frações, potências, produtos notáveis, fatoração, equações, sistemas e porcentagem, explicados do começo e sem pressa. É a <strong>caixa de ferramentas</strong> que todo o resto da matemática usa. Teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Equilibre a balança até isolar o x, veja por que (a + b)² tem o 2ab e treine contas com correção passo a passo.',
        formulas: [
            { label: 'DISTRIBUTIVA', tex: 'a(b+c)=ab+ac' },
            { label: 'PRODUTO NOTÁVEL', tex: '(a+b)^2=a^2+2ab+b^2' },
            { label: 'BHASKARA', tex: 'x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, do número à equação',
        map: [
            { color: 'sky', icon: 'fa-calculator', title: 'Números', text: 'Sinais, ordem das operações, MMC, MDC e frações.', tex: '\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}', href: '#/teoria/numeros-sinais' },
            { color: 'indigo', icon: 'fa-superscript', title: 'Expressões', text: 'Potências, raízes, polinômios, produtos notáveis e fatoração.', tex: 'a^2-b^2=(a+b)(a-b)', href: '#/teoria/potencias-raizes' },
            { color: 'emerald', icon: 'fa-scale-balanced', title: 'Equações', text: '1º grau, sistemas 2×2 e 2º grau.', tex: 'ax+b=0 \\Rightarrow x=-\\tfrac{b}{a}', href: '#/teoria/equacoes-1grau' },
            { color: 'amber', icon: 'fa-percent', title: 'Proporção', text: 'Razão, regra de três, porcentagem e juros.', tex: '\\frac{a}{b}=\\frac{c}{d}\\iff ad=bc', href: '#/teoria/proporcao' }
        ]
    },
    groups: [
        { id: 'numeros', title: 'Números', icon: 'fa-calculator' },
        { id: 'expressoes', title: 'Expressões', icon: 'fa-superscript' },
        { id: 'equacoes', title: 'Equações', icon: 'fa-scale-balanced' },
        { id: 'proporcao', title: 'Proporção', icon: 'fa-percent' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'numeros-sinais', file: 'content/01-numeros-sinais.md', group: 'numeros', minutes: 35, lab: 'treino',
          title: 'Números, sinais e ordem das operações',
          summary: 'Inteiros, regra de sinais, ordem das operações, distributiva, oposto e inverso.' },
        { id: 'divisibilidade', file: 'content/02-divisibilidade.md', group: 'numeros', minutes: 35, lab: 'treino',
          title: 'Múltiplos, divisores, MMC e MDC',
          summary: 'Critérios de divisibilidade, números primos, fatoração em primos, MMC e MDC.' },
        { id: 'fracoes', file: 'content/03-fracoes.md', group: 'numeros', minutes: 45, lab: 'treino',
          title: 'Frações, decimais e porcentagem',
          summary: 'Simplificação, as quatro operações, decimais e o básico de porcentagem.' },
        { id: 'potencias-raizes', file: 'content/04-potencias-raizes.md', group: 'expressoes', minutes: 45, lab: 'treino',
          title: 'Potências e raízes',
          summary: 'Propriedades, expoente negativo e fracionário, notação científica e racionalização.' },
        { id: 'expressoes', file: 'content/05-expressoes.md', group: 'expressoes', minutes: 35, lab: 'treino',
          title: 'Expressões algébricas e polinômios',
          summary: 'Linguagem algébrica, valor numérico, termos semelhantes e operações com polinômios.' },
        { id: 'produtos-fatoracao', file: 'content/06-produtos-fatoracao.md', group: 'expressoes', minutes: 55, lab: 'areas',
          title: 'Produtos notáveis e fatoração',
          summary: 'Quadrado da soma, diferença de quadrados, os cinco casos de fatoração e frações algébricas.' },
        { id: 'equacoes-1grau', file: 'content/07-equacoes-1grau.md', group: 'equacoes', minutes: 45, lab: 'balanca',
          title: 'Equações do 1º grau',
          summary: 'A balança, o roteiro de resolução, casos especiais, problemas e isolar letras em fórmulas.' },
        { id: 'sistemas', file: 'content/08-sistemas.md', group: 'equacoes', minutes: 40,
          title: 'Sistemas de equações 2×2',
          summary: 'Substituição, adição, interpretação gráfica (SPD, SPI, SI) e problemas.' },
        { id: 'equacoes-2grau', file: 'content/09-equacoes-2grau.md', group: 'equacoes', minutes: 50, lab: 'areas',
          title: 'Equações do 2º grau',
          summary: 'Incompletas, soma e produto, completar quadrado, Bhaskara e biquadradas.' },
        { id: 'proporcao', file: 'content/10-proporcao.md', group: 'proporcao', minutes: 45, lab: 'treino',
          title: 'Razão, proporção, regra de três e porcentagem',
          summary: 'Grandezas proporcionais, regra de três simples e composta, porcentagem e juros.' },
        { id: 'resumo', file: 'content/11-resumo-erros.md', group: 'apoio', minutes: 20,
          title: 'Resumo e os 20 erros mais comuns',
          summary: 'Todas as regras em uma página e os erros algébricos que mais derrubam alunos.' }
    ],
    paths: [
        {
            id: 'revisao-7', icon: 'fa-bolt', color: 'amber',
            title: 'Revisão rápida',
            duration: '7 dias · ~1 h/dia',
            audience: 'Já viu tudo isso na escola, mas esqueceu. Quer reativar a memória rápido.',
            steps: [
                { day: 'Dia 1', chapter: 'numeros-sinais', lab: 'treino', task: 'Sinais e ordem das operações. Faça 10 questões seguidas do tema no treino.' },
                { day: 'Dia 2', chapter: 'fracoes', lab: 'treino', task: 'Frações e porcentagem. Leia o capítulo 2 (MMC) só se travar na soma de frações.' },
                { day: 'Dia 3', chapter: 'potencias-raizes', lab: 'treino', task: 'Propriedades de potências, expoente negativo e fracionário.' },
                { day: 'Dia 4', chapter: 'produtos-fatoracao', lab: 'areas', task: 'Produtos notáveis no modelo de áreas e os cinco casos de fatoração.' },
                { day: 'Dia 5', chapter: 'equacoes-1grau', lab: 'balanca', task: 'Equações do 1º grau na balança. Depois, sistemas (capítulo 8) em ritmo de leitura.' },
                { day: 'Dia 6', chapter: 'equacoes-2grau', task: 'Soma e produto, Bhaskara e o discriminante.' },
                { day: 'Dia 7', chapter: 'resumo', lab: 'treino', task: 'Os 20 erros comuns. Termine com o treino em "Misturar todos os temas".' }
            ]
        },
        {
            id: 'do-zero-21', icon: 'fa-seedling', color: 'emerald',
            title: 'Do zero, com calma',
            duration: '21 dias · ~45 min/dia',
            audience: 'Está há anos longe da escola e quer reconstruir a base sem pular nada.',
            steps: [
                { day: 'Dias 1–2', chapter: 'numeros-sinais', lab: 'treino', task: 'Leia devagar, faça todos os exemplos no papel e treine sinais até acertar 10 seguidas.' },
                { day: 'Dias 3–4', chapter: 'divisibilidade', lab: 'treino', task: 'Primos, fatoração, MMC e MDC. Treine o tema MMC e MDC.' },
                { day: 'Dias 5–7', chapter: 'fracoes', lab: 'treino', task: 'Frações sem medo: um dia para soma, um para multiplicação e divisão, um para porcentagem.' },
                { day: 'Dias 8–9', chapter: 'potencias-raizes', lab: 'treino', task: 'Potências e raízes. Releia a intuição de por que $a^0 = 1$.' },
                { day: 'Dia 10', chapter: 'expressoes', lab: 'treino', task: 'Linguagem algébrica e valor numérico (sempre com parênteses).' },
                { day: 'Dias 11–13', chapter: 'produtos-fatoracao', lab: 'areas', task: 'Produtos notáveis com o modelo de áreas; depois um caso de fatoração por vez.' },
                { day: 'Dias 14–15', chapter: 'equacoes-1grau', lab: 'balanca', task: 'Resolva pelo menos 10 equações na balança antes dos exercícios.' },
                { day: 'Dia 16', chapter: 'sistemas', task: 'Substituição e adição. Desenhe as retas de um exemplo.' },
                { day: 'Dias 17–18', chapter: 'equacoes-2grau', lab: 'areas', task: 'Incompletas, soma e produto (com o treino do modelo de áreas) e Bhaskara.' },
                { day: 'Dias 19–20', chapter: 'proporcao', lab: 'treino', task: 'Regra de três, porcentagem e juros: o capítulo mais útil no dia a dia.' },
                { day: 'Dia 21', chapter: 'resumo', lab: 'treino', task: 'Revisão com os erros comuns e uma sequência de 15 acertos no treino misto.' }
            ]
        },
        {
            id: 'para-calculo-5', icon: 'fa-infinity', color: 'indigo',
            title: 'Álgebra para o Cálculo',
            duration: '5 dias · ~1,5 h/dia',
            audience: 'Está em Cálculo I e as contas é que estão derrubando você, não o conceito.',
            steps: [
                { day: 'Dia 1', chapter: 'potencias-raizes', lab: 'treino', task: 'Expoente negativo e fracionário: é como se escrevem as funções antes de derivar.' },
                { day: 'Dia 2', chapter: 'produtos-fatoracao', lab: 'areas', task: 'Fatoração e frações algébricas: a chave dos limites do tipo 0/0.' },
                { day: 'Dia 3', chapter: 'equacoes-2grau', task: 'Raízes, forma fatorada e completar quadrado.' },
                { day: 'Dia 4', chapter: 'fracoes', lab: 'treino', task: 'Revise soma de frações e fração de fração: aparecem em derivadas e integrais.' },
                { day: 'Dia 5', chapter: 'resumo', task: 'Os 20 erros comuns. Depois siga para Fundamentos ou volte ao Cálculo I.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'Quanto vale $-3^2 + (-2)^3$?', opts: ['$1$', '$-17$', '$17$', '$-1$'], correct: 1, chapter: 'numeros-sinais' },
        { q: '$\\text{mmc}(12, 18)$ é:', opts: ['$6$', '$216$', '$36$', '$72$'], correct: 2, chapter: 'divisibilidade' },
        { q: '$\\dfrac{3}{4} - \\dfrac{1}{6}$ é igual a:', opts: ['$\\dfrac{2}{2}$', '$\\dfrac{7}{12}$', '$\\dfrac{1}{12}$', '$\\dfrac{2}{10}$'], correct: 1, chapter: 'fracoes' },
        { q: '$\\left(\\dfrac{1}{2}\\right)^{-3}$ é igual a:', opts: ['$-\\dfrac{1}{8}$', '$-8$', '$8$', '$\\dfrac{1}{8}$'], correct: 2, chapter: 'potencias-raizes' },
        { q: '$(x - 3)^2$ é igual a:', opts: ['$x^2 - 9$', '$x^2 + 9$', '$x^2 - 6x + 9$', '$x^2 - 3x + 9$'], correct: 2, chapter: 'produtos-fatoracao' },
        { q: 'A solução de $3(x - 2) = x + 4$ é:', opts: ['$x = 5$', '$x = 1$', '$x = 3$', '$x = -5$'], correct: 0, chapter: 'equacoes-1grau' },
        { q: 'As raízes de $x^2 - 5x + 6 = 0$ são:', opts: ['$-2$ e $-3$', '$2$ e $3$', '$1$ e $6$', '$-1$ e $6$'], correct: 1, chapter: 'equacoes-2grau' },
        { q: 'Um preço subiu $10\\%$ e depois $10\\%$ de novo. O aumento total foi de:', opts: ['$20\\%$', '$21\\%$', '$11\\%$', '$100\\%$'], correct: 1, chapter: 'proporcao' }
    ],
    recommend(score, total, needs) {
        const calc = ['potencias-raizes', 'produtos-fatoracao', 'equacoes-2grau', 'fracoes'];
        if (score <= 4) return { path: 'do-zero-21', msg: 'Vale reconstruir a base com calma. São 21 dias curtos, e cada capítulo começa do começo.' };
        if (needs.length && needs.every(n => calc.includes(n))) return { path: 'para-calculo-5', msg: 'As dificuldades estão exatamente nas contas que o Cálculo mais usa. Foque nelas.' };
        if (needs.length) return { path: 'revisao-7', msg: 'Você lembra bastante coisa. Uma revisão de uma semana fecha as lacunas.' };
        return { path: 'revisao-7', msg: 'Excelente! Sua álgebra está em dia. Faça o capítulo de erros comuns e siga em frente.',
            extra: '<p class="small"><a href="../fundamentos/">Abrir o livro Fundamentos →</a></p>' };
    }
};
