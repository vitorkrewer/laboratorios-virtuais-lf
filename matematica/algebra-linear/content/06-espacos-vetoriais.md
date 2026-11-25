# Espaços vetoriais e subespaços

Até aqui, vetor era lista de números. Mas polinômios, matrizes e funções também podem ser somados e multiplicados por números, com as mesmas regras. A ideia de **espaço vetorial** junta todos esses objetos sob uma só teoria: o que provarmos uma vez vale para todos.

## 1. A definição

> [!DEFINIÇÃO] Um **espaço vetorial** é um conjunto $V$ com uma soma e uma multiplicação por escalar que dão resultados ainda em $V$ e satisfazem as regras usuais: comutativa e associativa da soma, existe $\vec 0$, todo vetor tem oposto, $1\vec v = \vec v$, e as distributivas $c(\vec u + \vec v) = c\vec u + c\vec v$ e $(a + b)\vec v = a\vec v + b\vec v$.

Os elementos de $V$ são chamados de **vetores**, mesmo que não sejam setas.

| Espaço | Seus "vetores" | Vetor nulo |
|---|---|---|
| $\mathbb{R}^n$ | listas $(x_1, \ldots, x_n)$ | $(0, \ldots, 0)$ |
| $M_{m \times n}$ | matrizes $m \times n$ | matriz nula |
| $P_n$ | polinômios de grau $\le n$ | polinômio $0$ |
| $C(\mathbb{R})$ | funções contínuas | função $f(x) = 0$ |

> [!INTUIÇÃO] Um espaço vetorial é qualquer "mundo" em que **combinações lineares fazem sentido** e não saem do mundo. É só isso que a definição exige, escrito com cuidado.

## 2. Subespaços

Na prática, quase nunca se verificam todos os axiomas. O que se faz é olhar para um pedaço de um espaço conhecido.

> [!TEOREMA] **(Teste do subespaço)** Um subconjunto $W$ de $V$ é um **subespaço** (e portanto um espaço vetorial) se e só se:
> 1. $\vec 0 \in W$;
> 2. $\vec u, \vec v \in W \Rightarrow \vec u + \vec v \in W$ (fechado para a soma);
> 3. $\vec v \in W,\ c \in \mathbb{R} \Rightarrow c\,\vec v \in W$ (fechado para o escalar).

> [!DICA] Comece sempre pelo item 1: se o vetor nulo não está em $W$, acabou, não é subespaço. É o teste mais rápido.

### Exemplos em ℝ²

- **Uma reta pela origem**, como $W = \{(x, y) : y = 2x\}$: é subespaço. $(a, 2a) + (b, 2b) = (a + b, 2(a + b)) \in W$ e $c(a, 2a) = (ca, 2ca) \in W$.
- **Uma reta que não passa pela origem**, como $y = 2x + 1$: **não** é ($\vec 0$ não está nela).
- **O primeiro quadrante** $\{x \ge 0, y \ge 0\}$: contém $\vec 0$ e é fechado para a soma, mas $-1 \cdot (1, 1) = (-1, -1)$ sai dele. **Não** é.
- **Os dois eixos juntos** (a união): $(1, 0) + (0, 1) = (1, 1)$ não está em nenhum eixo. **Não** é.

> [!TEOREMA] Os subespaços de $\mathbb{R}^2$ são só três tipos: $\{\vec 0\}$, retas pela origem e o próprio $\mathbb{R}^2$. Em $\mathbb{R}^3$: $\{\vec 0\}$, retas pela origem, planos pela origem e $\mathbb{R}^3$.

### Exemplos em outros espaços

- Em $M_{2\times2}$, as matrizes simétricas formam subespaço (soma e múltiplo de simétricas são simétricas).
- Em $M_{2\times2}$, as matrizes inversíveis **não** formam: $I + (-I) = O$, que não tem inversa (e $O$ nem está no conjunto).
- Em $P_2$, os polinômios com $p(1) = 0$ formam subespaço. Os com $p(1) = 5$ não.

## 3. Os dois subespaços de uma matriz

Toda matriz $A$ ($m \times n$) carrega dois subespaços fundamentais:

> [!DEFINIÇÃO] O **núcleo** (ou espaço nulo) é $N(A) = \{\vec x : A\vec x = \vec 0\}$, dentro de $\mathbb{R}^n$. O **espaço coluna** (ou imagem) é $C(A) = \{A\vec x\}$, o conjunto de todas as combinações lineares das colunas, dentro de $\mathbb{R}^m$.

- O núcleo é subespaço: $A\vec 0 = \vec 0$; se $A\vec u = \vec 0$ e $A\vec v = \vec 0$, então $A(\vec u + \vec v) = \vec 0$ e $A(c\vec u) = \vec 0$.
- $A\vec x = \vec b$ tem solução $\iff \vec b \in C(A)$.

> [!ATENÇÃO] O conjunto das soluções de $A\vec x = \vec b$ com $\vec b \neq \vec 0$ **não** é subespaço (não contém $\vec 0$). Ele é o núcleo "deslocado": solução particular + núcleo, como a reta $(4, 0, 1) + t(-2, 1, 0)$ do capítulo 2.

**Exemplo.** Núcleo de $A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix}$. Escalonando: $x + 2y - z = 0$, com $y = s$ e $z = t$ livres:

$$N(A) = \{ s(-2, 1, 0) + t(1, 0, 1) \}$$

Um plano pela origem de $\mathbb{R}^3$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual destes subconjuntos de $\mathbb{R}^2$ é um subespaço?
- a reta $y = x + 1$
+ a reta $y = -3x$
- o círculo $x^2 + y^2 = 1$
- o semiplano $y \ge 0$
> Retas pela origem são subespaços.

? O jeito mais rápido de mostrar que $W$ **não** é subespaço costuma ser:
+ verificar se $\vec 0 \notin W$
- verificar todos os 8 axiomas
- calcular o determinante
- mostrar que $W$ é infinito
> Se o nulo não está, acabou.

? O núcleo de uma matriz $A$ é:
- o conjunto das colunas de $A$
+ o conjunto de soluções de $A\vec x = \vec 0$
- a diagonal de $A$
- o conjunto de soluções de $A\vec x = \vec b$
> E é sempre subespaço.

? A união dos eixos $x$ e $y$ em $\mathbb{R}^2$:
- é subespaço
+ não é subespaço, porque não é fechada para a soma
- não é subespaço, porque não contém $\vec 0$
- é o próprio $\mathbb{R}^2$
> $(1, 0) + (0, 1) = (1, 1)$ fica fora.

? Em $P_2$ (polinômios de grau até 2), o conjunto $\{p : p(0) = 0\}$:
+ é subespaço
- não é, porque não contém o polinômio nulo
- não é, porque não é fechado para a soma
- não é um conjunto de vetores
> Contém o nulo e é fechado: $(p + q)(0) = 0$ e $(cp)(0) = 0$.
```

## 4. Exercícios

**1.** $W = \{(x, y, z) : x + y + z = 0\}$ é subespaço de $\mathbb{R}^3$? E $\{(x, y, z) : x + y + z = 1\}$?

<details>
<summary>Ver solução</summary>

O primeiro é (é o núcleo de $[1\;\,1\;\,1]$; é um plano pela origem). O segundo não: $(0, 0, 0)$ não satisfaz.

</details>

**2.** $W = \{(x, y) : xy = 0\}$ é subespaço de $\mathbb{R}^2$?

<details>
<summary>Ver solução</summary>

Não. É a união dos eixos: $(1, 0)$ e $(0, 1)$ estão em $W$, mas a soma não.

</details>

**3.** As matrizes $2 \times 2$ com traço zero ($a_{11} + a_{22} = 0$) formam subespaço?

<details>
<summary>Ver solução</summary>

Sim: a nula tem traço $0$; o traço da soma é a soma dos traços; o traço de $cA$ é $c$ vezes o traço.

</details>

**4.** Encontre o núcleo de $\begin{bmatrix} 1 & -1 \\ -2 & 2 \end{bmatrix}$ e descreva-o geometricamente.

<details>
<summary>Ver solução</summary>

$x - y = 0$: $N(A) = \{t(1, 1)\}$, a reta $y = x$.

</details>

**5.** O vetor $(3, 6)$ está no espaço coluna de $\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$? E $(1, 0)$?

<details>
<summary>Ver solução</summary>

As colunas são múltiplas de $(1, 2)$, então $C(A)$ é a reta gerada por $(1, 2)$. $(3, 6) = 3(1, 2)$ está; $(1, 0)$ não.

</details>
