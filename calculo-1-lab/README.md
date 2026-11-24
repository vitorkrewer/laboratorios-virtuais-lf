# Cálculo I Lab | Cálculo Diferencial e Integral I

Laboratório virtual para estudantes que precisam aprender **Cálculo Diferencial e Integral I** com urgência. Combina uma landing page, **trilhas de aprendizagem**, uma **wiki de teoria em Markdown** (estilo wiki/GitBook, com fórmulas em KaTeX) e **simuladores interativos**.

[Acessar laboratório](https://vitorkrewer.github.io/laboratorios-virtuais-lf/calculo-1-lab/)

## Seções

- **Início:** landing page com o mapa do curso e os três passos para começar.
- **Trilhas:** diagnóstico de 2 minutos (7 questões que apontam o que revisar) e 4 trilhas com cronograma por dia:
  - *Resgate em 7 dias*, *P1: Limites e Derivadas (14 dias)*, *P2: Integrais e Aplicações (10 dias)* e *Base sólida em 30 dias*.
  - O progresso (capítulos concluídos) fica salvo no `localStorage` do navegador.
- **Teoria:** 14 capítulos em Markdown, com índice lateral, busca full-text sem distinção de acentos (atalho `/`), sumário "Nesta página", links diretos para seções (`#/teoria/limites/5-limites-no-infinito`), navegação anterior/próximo e exercícios com gabarito recolhível.
- **Testes rápidos:** 12 capítulos têm um quiz de fixação com correção imediata e explicação. Com 70% de acerto, o capítulo é marcado como concluído; a melhor nota aparece no índice e nas trilhas.
- **Continue de onde parou:** a página inicial retoma o último capítulo aberto (ou sugere o próximo).
- **Laboratório:** três simuladores em canvas:
  - **Limites:** tabelas e zoom em 9 exemplos (buraco removível, laterais diferentes, infinitos, oscilação, limites fundamentais).
  - **Derivada:** secante tendendo à tangente, com $h$ ajustável e animação $h \to 0$.
  - **Integral:** somas de Riemann (esquerda, direita, ponto médio e trapézios), comparação com o valor exato pelo TFC.
  - Nos simuladores de derivada e integral, a opção **Digitar minha função** aceita expressões como `x^2 sen(x)`, `e^(-x^2)`, `ln(x)/x` e `|x-2|`. O parser é próprio (sem `eval`), mostra em KaTeX como a expressão foi interpretada e usa derivada numérica e regra de Simpson como referência.

## Conteúdo

| Área | Capítulos |
|---|---|
| Base | Pré-cálculo essencial |
| Limites e continuidade | Limites · Continuidade |
| Derivadas | Definição · Regras · Implícita e taxas relacionadas · Aplicações |
| Integrais | Integral definida e TFC · Primitivas e substituição · Partes e técnicas · Aplicações |
| Apoio | Formulário · Erros comuns · Como estudar com pouco tempo |

## Estrutura

```
calculo-1-lab/
├── index.html          # casca da aplicação (views: início, trilhas, teoria, laboratório)
├── style.css
├── js/
│   ├── data.js         # capítulos, trilhas e diagnóstico (edite aqui para adicionar conteúdo)
│   ├── markdown.js     # pipeline Markdown + KaTeX + callouts
│   ├── labs.js         # simuladores (canvas)
│   └── app.js          # roteador por hash, trilhas, wiki, busca, progresso
└── content/            # um arquivo .md por capítulo
```

## Como adicionar ou editar conteúdo

1. Crie ou edite um arquivo em `content/` (Markdown).
2. Registre o capítulo em `CALC.chapters` no arquivo `js/data.js` (id, arquivo, grupo, minutos, resumo e, opcionalmente, `lab`).
3. Se quiser, inclua o capítulo em uma trilha em `CALC.paths`.

### Sintaxe especial no Markdown

- Fórmulas: `$ ... $` (inline) e `$$ ... $$` (bloco), renderizadas com KaTeX.
- Callouts: `> [!DEFINIÇÃO]`, `> [!TEOREMA]`, `> [!EXEMPLO]`, `> [!DICA]`, `> [!ATENÇÃO]`, `> [!INTUIÇÃO]`.
- Dentro de callouts (`>`), escreva fórmulas em bloco **em uma única linha**.
- Quiz de fixação: um bloco de código com a linguagem `quiz`. Cada questão começa com `?`, a alternativa correta com `+`, as erradas com `-` e a explicação com `>`; uma linha em branco separa as questões. As alternativas são embaralhadas a cada tentativa.

  ````
  ```quiz
  ? Quanto vale $\lim_{x\to 0}\frac{\sin x}{x}$?
  + $1$
  - $0$
  - Não existe
  > É o limite trigonométrico fundamental.
  ```
  ````

- Soluções recolhíveis: `<details><summary>Ver solução</summary>`, com uma **linha em branco** antes e depois do conteúdo.
- Links internos: `[texto](#/teoria/limites)`, `[texto](#/lab/derivada)`.

## Execução

O laboratório é estático, sem build. Como os capítulos são carregados com `fetch`, sirva a pasta por HTTP em vez de abrir o arquivo direto (`file://`):

```bash
cd calculo-1-lab
python -m http.server 8000   # depois acesse http://localhost:8000
```

No GitHub Pages funciona sem configuração.

## Tecnologias

HTML5, CSS3 e JavaScript (ES6+) sem framework. Bibliotecas via CDN: [KaTeX](https://katex.org/) (fórmulas), [marked](https://marked.js.org/) (Markdown) e Font Awesome (ícones).
