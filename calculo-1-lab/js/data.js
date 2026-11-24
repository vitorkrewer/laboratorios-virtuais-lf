/* Dados do currículo, trilhas e diagnóstico do Cálculo I Lab */
window.CALC = window.CALC || {};

CALC.groups = [
    { id: 'base',      title: 'Base',                   icon: 'fa-seedling' },
    { id: 'limites',   title: 'Limites e Continuidade', icon: 'fa-arrows-to-dot' },
    { id: 'derivadas', title: 'Derivadas',              icon: 'fa-chart-line' },
    { id: 'integrais', title: 'Integrais',              icon: 'fa-chart-area' },
    { id: 'apoio',     title: 'Apoio para a prova',     icon: 'fa-life-ring' }
];

CALC.chapters = [
    { id: 'pre-calculo', file: 'content/00-pre-calculo.md', group: 'base', minutes: 40,
      title: 'Pré-cálculo essencial',
      summary: 'Funções, fatoração, trigonometria, exponencial e logaritmo: o que você precisa dominar antes de começar.' },
    { id: 'limites', file: 'content/01-limites.md', group: 'limites', minutes: 60, lab: 'limites',
      title: 'Limites',
      summary: 'Ideia intuitiva, limites laterais, propriedades, indeterminações e limites fundamentais.' },
    { id: 'continuidade', file: 'content/02-continuidade.md', group: 'limites', minutes: 30, lab: 'limites',
      title: 'Continuidade',
      summary: 'Definição, tipos de descontinuidade e o Teorema do Valor Intermediário.' },
    { id: 'derivada-definicao', file: 'content/03-derivada-definicao.md', group: 'derivadas', minutes: 45, lab: 'derivada',
      title: 'A derivada: definição e significado',
      summary: 'Taxa de variação, reta tangente, derivada pela definição e relação com continuidade.' },
    { id: 'regras-derivacao', file: 'content/04-regras-derivacao.md', group: 'derivadas', minutes: 60,
      title: 'Regras de derivação',
      summary: 'Potência, produto, quociente, cadeia e derivadas das funções elementares.' },
    { id: 'derivacao-implicita', file: 'content/05-derivacao-implicita.md', group: 'derivadas', minutes: 40,
      title: 'Derivação implícita e taxas relacionadas',
      summary: 'Derivar curvas sem isolar y e resolver problemas de variação ligada.' },
    { id: 'aplicacoes-derivadas', file: 'content/06-aplicacoes-derivadas.md', group: 'derivadas', minutes: 75, lab: 'derivada',
      title: 'Aplicações da derivada',
      summary: 'Crescimento, máximos e mínimos, concavidade, otimização, L’Hôpital e esboço de gráficos.' },
    { id: 'integral-definida', file: 'content/07-integral-definida.md', group: 'integrais', minutes: 60, lab: 'integral',
      title: 'Integral definida e o TFC',
      summary: 'Somas de Riemann, integral definida e o Teorema Fundamental do Cálculo.' },
    { id: 'primitivas-substituicao', file: 'content/08-primitivas-substituicao.md', group: 'integrais', minutes: 50,
      title: 'Primitivas e substituição',
      summary: 'Integral indefinida, tabela básica e o método da substituição.' },
    { id: 'integracao-por-partes', file: 'content/09-integracao-por-partes.md', group: 'integrais', minutes: 45,
      title: 'Integração por partes e técnicas',
      summary: 'Integração por partes, integrais trigonométricas básicas e frações parciais simples.' },
    { id: 'aplicacoes-integrais', file: 'content/10-aplicacoes-integrais.md', group: 'integrais', minutes: 45, lab: 'integral',
      title: 'Aplicações da integral',
      summary: 'Área entre curvas, volume de sólidos de revolução e valor médio.' },
    { id: 'formulario', file: 'content/11-formulario.md', group: 'apoio', minutes: 15,
      title: 'Formulário completo',
      summary: 'Tabela de limites, derivadas, integrais e identidades para consulta rápida.' },
    { id: 'erros-comuns', file: 'content/12-erros-comuns.md', group: 'apoio', minutes: 20,
      title: 'Erros comuns de prova',
      summary: 'Os deslizes que mais tiram pontos e como evitá-los.' },
    { id: 'plano-de-estudo', file: 'content/13-plano-de-estudo.md', group: 'apoio', minutes: 15,
      title: 'Como estudar com pouco tempo',
      summary: 'Método prático para quem precisa aprender rápido sem cair na ilusão de saber.' }
];

CALC.paths = [
    {
        id: 'resgate-7', icon: 'fa-bolt', color: 'amber',
        title: 'Resgate em 7 dias',
        duration: '7 dias · ~2 h/dia',
        audience: 'Prova muito próxima e pouco tempo. Foca no que mais cai.',
        steps: [
            { day: 'Dia 1', chapter: 'pre-calculo', task: 'Revise fatoração, funções, trigonometria básica, exponencial e log. Faça o diagnóstico.' },
            { day: 'Dia 2', chapter: 'limites', lab: 'limites', task: 'Domine 0/0 (fatorar/racionalizar), limites laterais e os limites fundamentais.' },
            { day: 'Dia 3', chapter: 'continuidade', task: 'Entenda as 3 condições de continuidade e o TVI.' },
            { day: 'Dia 3', chapter: 'derivada-definicao', lab: 'derivada', task: 'Veja a secante virar tangente e derive pela definição pelo menos 3 funções.' },
            { day: 'Dia 4', chapter: 'regras-derivacao', task: 'Decore a tabela e treine a regra da cadeia até ficar automática (meta: 20 derivadas).' },
            { day: 'Dia 5', chapter: 'aplicacoes-derivadas', task: 'Máximos/mínimos, otimização e L’Hôpital valem muitos pontos. Resolva 2 problemas de otimização.' },
            { day: 'Dia 6', chapter: 'integral-definida', lab: 'integral', task: 'Entenda soma de Riemann e o TFC. Calcule 5 integrais definidas.' },
            { day: 'Dia 6', chapter: 'primitivas-substituicao', task: 'Tabela de primitivas e substituição simples (meta: 10 integrais).' },
            { day: 'Dia 7', chapter: 'formulario', task: 'Releia o formulário e refaça de cabeça as fórmulas principais.' },
            { day: 'Dia 7', chapter: 'erros-comuns', task: 'Refaça os exercícios que você errou e revise os erros clássicos.' }
        ]
    },
    {
        id: 'p1-14', icon: 'fa-chart-line', color: 'indigo',
        title: 'P1: Limites e Derivadas',
        duration: '14 dias · ~1,5 h/dia',
        audience: 'Primeira prova do semestre: limites, continuidade e derivadas.',
        steps: [
            { day: 'Dias 1–2', chapter: 'pre-calculo', task: 'Fatoração, produtos notáveis, trigonometria e propriedades de exp/log.' },
            { day: 'Dias 3–5', chapter: 'limites', lab: 'limites', task: 'Limites por tabela, álgebra, laterais e fundamentais. Use o simulador.' },
            { day: 'Dia 6', chapter: 'continuidade', task: 'Continuidade, tipos de descontinuidade e TVI.' },
            { day: 'Dias 7–8', chapter: 'derivada-definicao', lab: 'derivada', task: 'Derivada pela definição, tangente e relação com continuidade.' },
            { day: 'Dias 9–11', chapter: 'regras-derivacao', task: 'Todas as regras. Treine produto, quociente e cadeia misturados.' },
            { day: 'Dia 12', chapter: 'derivacao-implicita', task: 'Derivação implícita e taxas relacionadas.' },
            { day: 'Dia 13', chapter: 'aplicacoes-derivadas', lab: 'derivada', task: 'Estudo de crescimento, extremos, concavidade e otimização.' },
            { day: 'Dia 14', chapter: 'erros-comuns', task: 'Revisão final: formulário e erros de prova.' }
        ]
    },
    {
        id: 'p2-10', icon: 'fa-chart-area', color: 'emerald',
        title: 'P2: Integrais e Aplicações',
        duration: '10 dias · ~1,5 h/dia',
        audience: 'Já sabe derivar e precisa dominar integração.',
        steps: [
            { day: 'Dia 1', chapter: 'regras-derivacao', task: 'Reative as regras de derivação: integrar é “derivar ao contrário”.' },
            { day: 'Dias 2–3', chapter: 'integral-definida', lab: 'integral', task: 'Somas de Riemann, propriedades e Teorema Fundamental.' },
            { day: 'Dias 4–5', chapter: 'primitivas-substituicao', task: 'Tabela de primitivas e substituição (troca de variável).' },
            { day: 'Dias 6–7', chapter: 'integracao-por-partes', task: 'Partes (LIATE), integrais trigonométricas e frações parciais simples.' },
            { day: 'Dias 8–9', chapter: 'aplicacoes-integrais', lab: 'integral', task: 'Área entre curvas, volume de revolução e valor médio.' },
            { day: 'Dia 10', chapter: 'formulario', task: 'Revisão com formulário e lista de erros comuns.' }
        ]
    },
    {
        id: 'base-30', icon: 'fa-seedling', color: 'sky',
        title: 'Base sólida em 30 dias',
        duration: '30 dias · ~1 h/dia',
        audience: 'Quem quer aprender direito, sem pressa, a partir do pré-cálculo.',
        steps: [
            { day: 'Dias 1–4', chapter: 'pre-calculo', task: 'Funções, álgebra, trigonometria, exponencial e logaritmo.' },
            { day: 'Dia 4', chapter: 'plano-de-estudo', task: 'Monte sua rotina de estudo e a revisão espaçada.' },
            { day: 'Dias 5–8', chapter: 'limites', lab: 'limites', task: 'Limites com calma: intuição, álgebra e simulador.' },
            { day: 'Dias 9–10', chapter: 'continuidade', task: 'Continuidade e Teorema do Valor Intermediário.' },
            { day: 'Dias 11–13', chapter: 'derivada-definicao', lab: 'derivada', task: 'O que é a derivada, geometricamente e como limite.' },
            { day: 'Dias 14–17', chapter: 'regras-derivacao', task: 'Regras de derivação com muita prática.' },
            { day: 'Dias 18–19', chapter: 'derivacao-implicita', task: 'Implícita e taxas relacionadas.' },
            { day: 'Dias 20–22', chapter: 'aplicacoes-derivadas', task: 'Aplicações: extremos, otimização, L’Hôpital, gráficos.' },
            { day: 'Dias 23–25', chapter: 'integral-definida', lab: 'integral', task: 'Integral definida e Teorema Fundamental.' },
            { day: 'Dias 26–27', chapter: 'primitivas-substituicao', task: 'Primitivas e substituição.' },
            { day: 'Dia 28', chapter: 'integracao-por-partes', task: 'Integração por partes e técnicas.' },
            { day: 'Dia 29', chapter: 'aplicacoes-integrais', task: 'Áreas, volumes e valor médio.' },
            { day: 'Dia 30', chapter: 'erros-comuns', task: 'Revisão geral: formulário e erros comuns.' }
        ]
    }
];

/* Diagnóstico: cada questão aponta o capítulo a revisar se errar. */
CALC.diagnostic = [
    { q: 'Fatore $x^2 - 9$.', opts: ['$(x-3)^2$', '$(x-3)(x+3)$', '$(x+9)(x-1)$', '$x(x-9)$'], correct: 1, chapter: 'pre-calculo' },
    { q: 'Quanto vale $\\log_2 8$?', opts: ['$2$', '$3$', '$4$', '$16$'], correct: 1, chapter: 'pre-calculo' },
    { q: 'Calcule $\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}$.', opts: ['$0$', '$2$', '$4$', 'Não existe'], correct: 2, chapter: 'limites' },
    { q: 'Qual é a derivada de $x^3$?', opts: ['$x^4/4$', '$3x^2$', '$x^2$', '$3x$'], correct: 1, chapter: 'regras-derivacao' },
    { q: 'Qual é a derivada de $\\sin(2x)$?', opts: ['$\\cos(2x)$', '$2\\cos(2x)$', '$-2\\cos(2x)$', '$2\\sin(2x)$'], correct: 1, chapter: 'regras-derivacao' },
    { q: 'Se $f\'(x) > 0$ em um intervalo, então $f$ é nesse intervalo:', opts: ['Decrescente', 'Constante', 'Crescente', 'Côncava para cima'], correct: 2, chapter: 'aplicacoes-derivadas' },
    { q: 'Calcule $\\displaystyle\\int_0^1 2x\\,dx$.', opts: ['$0$', '$1/2$', '$1$', '$2$'], correct: 2, chapter: 'integral-definida' }
];
