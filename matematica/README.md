# Ecossistema de Matemática

Livros interativos de Matemática do ensino superior, conectados por pré-requisitos. Cada livro tem diagnóstico, trilhas por objetivo, teoria em formato wiki (Markdown + KaTeX), testes rápidos com correção imediata, progresso salvo no navegador e simuladores.

[Acessar](https://vitorkrewer.github.io/laboratorios-virtuais-lf/matematica/)

## Livros

| Livro | Pasta | Status | Simuladores |
|---|---|---|---|
| Álgebra elementar | `algebra/` | Disponível (11 capítulos) | Balança de equações, Modelo de áreas, Treino infinito |
| Fundamentos | `fundamentos/` | Disponível (9 capítulos) | Conjuntos (Venn), Intervalos, Inequações |
| Funções | `funcoes/` | Disponível (9 capítulos) | Transformações, Afim e quadrática, Composta e inversa |
| Cálculo I | `calculo-1/` | Disponível (14 capítulos) | Limites, Derivada, Integral |
| Álgebra Linear | `algebra-linear/` | Disponível (12 capítulos) | Transformações 2D, Escalonamento, Caçador de autovetores |
| Geometria Analítica | `geometria-analitica/` | Disponível (11 capítulos) | Retas e distâncias, Cônicas, Vetores no espaço |
| Probabilidade e Estatística | `probabilidade/` | Disponível (13 capítulos) | Estatística descritiva, Binomial e Poisson, Normal e TCL, Bayes |
| Cálculo II | `calculo-2/` | Disponível (13 capítulos) | Séries e Taylor, Superfícies (curvas de nível e gradiente), Integrais duplas |

## Glossário

`glossario/` reúne 216 verbetes (símbolos, termos e fórmulas) em 12 categorias. Cada verbete traz **como se lê** (com botão de áudio via síntese de voz do navegador), o que significa, exemplo, **como lembrar**, o erro mais comum, onde estudar (links para os capítulos) e verbetes relacionados. A página tem quatro modos:

- **Consultar:** busca sem acento, inclusive colando o próprio símbolo (∈, ≤, ∫), filtro por categoria, favoritos e link direto (`glossario/#pertence`).
- **Memorizar:** cartões com repetição espaçada (caixas de Leitner: 1, 2, 4, 8 e 16 dias), por categoria, por livro ou só favoritos. Teclado: espaço vira, 1/2/3 avalia.
- **Testar:** 10 questões sorteadas (símbolo → nome e nome → símbolo).
- **Folha:** tabela de todos os símbolos, pronta para imprimir ou salvar em PDF.

Nos livros, cada capítulo mostra automaticamente a caixa **Símbolos deste capítulo**, detectada a partir do TeX do capítulo; um clique abre a explicação sem sair da página.

### Como adicionar um verbete

Edite `engine/glossary.js` e acrescente um objeto ao `G.push(...)` da categoria: `id`, `c` (categoria), `s` (símbolo em TeX), `t` (nome), `r` (como se lê), `d` (significado), `e` (exemplo), `m` (como lembrar), `w` (cuidado, opcional), `l` (capítulos `'livro/capitulo'`), `k` (ids relacionados) e `x` (expressão regular que detecta o símbolo no TeX dos capítulos, opcional). Os textos usam `String.raw`, então o TeX vai com uma barra só (`\in`). Se criar ou renomear capítulos, atualize também `MATH.chapterTitles` no mesmo arquivo. Em textos com dinheiro, escreva `R\$` para o cifrão não abrir uma fórmula.

O hub (`index.html`) mostra rotas por objetivo ("faz tempo que saí da escola", "tenho prova de Cálculo", "estou começando a graduação", "meu curso começa por conjuntos"), os livros com o progresso do aluno e o mapa de pré-requisitos.

## Estrutura

```
matematica/
├── index.html            # hub: rotas, livros, mapa de pré-requisitos
├── engine/               # motor compartilhado por todos os livros
│   ├── catalog.js        # catálogo de livros (status, pré-requisitos, posição no mapa)
│   ├── app.js            # monta o livro a partir do book.js: roteador, trilhas, wiki, quizzes, progresso
│   ├── markdown.js       # Markdown + KaTeX + callouts + quizzes
│   ├── plot.js           # gráficos em canvas, parser de expressões (sem eval), Simpson, derivada numérica
│   ├── frac.js           # frações exatas (simuladores de Álgebra, Álgebra Linear e Geometria Analítica)
│   ├── hub.js            # lógica do hub
│   ├── glossary.js       # verbetes do glossário (dados)
│   ├── glossary-ui.js    # verbete, janela de explicação, áudio, detecção de símbolos
│   ├── glossary-page.js  # página do glossário: consultar, memorizar, testar, folha
│   └── engine.css
├── glossario/index.html  # página do glossário
├── algebra/              # Álgebra elementar (antes de Fundamentos)
├── fundamentos/
│   ├── index.html        # casca mínima (carrega o motor)
│   ├── book.js           # capítulos, trilhas, diagnóstico, textos da home
│   ├── labs.js           # simuladores do livro
│   └── content/*.md
├── funcoes/              # mesma estrutura
├── algebra-linear/       # mesma estrutura
├── geometria-analitica/  # mesma estrutura
├── probabilidade/        # mesma estrutura
└── calculo-1/            # mesma estrutura
```

## Como criar um livro novo

1. Copie a pasta de um livro existente (por exemplo `fundamentos/`) com outro nome.
2. Edite `book.js`: `id`, `title`, `storage` (prefixo único do progresso), `home`, `groups`, `chapters`, `paths`, `diagnostic` e `recommend`.
3. Escreva os capítulos em `content/`.
4. Em `labs.js`, exporte `MATH.labs = { init: { idDoLab: function (root) { … return draw; } } }` e liste os simuladores em `book.labs`. Um livro sem simuladores pode usar `labs: []` e um `labs.js` com `init: {}`.
5. Registre o livro em `engine/catalog.js` com `status: 'disponivel'`, `requires` (pré-requisitos) e a posição `col`/`row` no mapa. Os blocos "antes/depois" de cada livro e o mapa do hub se atualizam sozinhos.

## Sintaxe dos capítulos

- Fórmulas: `$ ... $` (inline) e `$$ ... $$` (bloco), renderizadas com KaTeX. Dentro de callouts (`>`), fórmulas em bloco ficam em uma única linha. Em tabelas, use `\lvert x\rvert` em vez de `|x|`. Matrizes aumentadas: `\left[\begin{array}{cc:c} … \end{array}\right]` (o `:` desenha o traço tracejado; evite `|`, que o glossário lê como módulo).
- Callouts: `> [!DEFINIÇÃO]`, `> [!TEOREMA]`, `> [!EXEMPLO]`, `> [!DICA]`, `> [!ATENÇÃO]`, `> [!INTUIÇÃO]`.
- Soluções recolhíveis: `<details><summary>Ver solução</summary>`, com linha em branco antes e depois do conteúdo.
- Teste rápido: bloco de código com a linguagem `quiz`. `?` inicia a questão, `+` marca a correta, `-` as erradas e `>` a explicação; linha em branco separa questões. Com 70% de acerto, o capítulo é marcado como concluído.
- Links internos: `#/teoria/<capitulo>`, `#/teoria/<capitulo>/<secao>`, `#/lab/<simulador>`. Entre livros: `../fundamentos/#/teoria/modulo`.

## Execução

Os capítulos são carregados com `fetch`, então sirva o repositório por HTTP (no GitHub Pages funciona direto):

```bash
python -m http.server 8000   # na raiz do repositório
# http://localhost:8000/matematica/
```

Bibliotecas via CDN: KaTeX, marked e Font Awesome. Não há build.
