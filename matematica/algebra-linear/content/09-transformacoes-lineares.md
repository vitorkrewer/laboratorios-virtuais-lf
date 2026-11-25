# Transformações lineares

Uma transformação linear é uma função entre espaços vetoriais que **respeita** soma e multiplicação por escalar. Rotações, reflexões, projeções e mudanças de escala são exemplos, e todas são descritas por uma matriz. É aqui que matriz deixa de ser tabela e vira máquina.

> [!DICA] Abra o simulador [Transformações 2D](#/lab/transformacoes) e mexa nas entradas da matriz: a grade inteira do plano se deforma, e você vê para onde vão $\vec e_1$ e $\vec e_2$.

## 1. Definição

> [!DEFINIÇÃO] $T: V \to W$ é **linear** se, para todos $\vec u, \vec v$ e todo escalar $c$:
> 1. $T(\vec u + \vec v) = T(\vec u) + T(\vec v)$;
> 2. $T(c\,\vec v) = c\,T(\vec v)$.

Consequência imediata: $T(\vec 0) = \vec 0$. Se $T(\vec 0) \neq \vec 0$, a transformação **não** é linear.

**Exemplos.**
- $T(x, y) = (2x - y,\ x + 3y)$ é linear.
- $T(x, y) = (x + 1,\ y)$ **não** é: $T(0, 0) = (1, 0)$. Translação não é linear.
- $T(x, y) = (x^2,\ y)$ **não** é: $T(2 \cdot (1, 0)) = (4, 0) \neq 2\,T(1, 0) = (2, 0)$.

> [!INTUIÇÃO] Geometricamente, uma transformação linear do plano mantém a origem fixa e leva a grade quadriculada em uma grade de **paralelogramos iguais**: retas continuam retas, paralelas continuam paralelas e o espaçamento continua uniforme.

## 2. Toda transformação linear é uma matriz

> [!TEOREMA] Se $T: \mathbb{R}^n \to \mathbb{R}^m$ é linear, então $T(\vec x) = A\vec x$, em que as **colunas** de $A$ são as imagens dos vetores da base canônica:
> $$A = \left[\; T(\vec e_1) \;\; T(\vec e_2) \;\; \cdots \;\; T(\vec e_n) \;\right]$$

Por quê: $\vec x = x_1\vec e_1 + \cdots + x_n\vec e_n$, e a linearidade dá $T(\vec x) = x_1T(\vec e_1) + \cdots + x_nT(\vec e_n)$, que é exatamente $A\vec x$.

> [!DICA] Para achar a matriz de uma transformação, pergunte: **para onde vai $\vec e_1$? E $\vec e_2$?** As respostas são as colunas.

## 3. O catálogo do plano

| Transformação | Matriz | $\det$ |
|---|---|---|
| Rotação de $\theta$ (anti-horária) | $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ | $1$ |
| Reflexão no eixo $x$ | $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ | $-1$ |
| Reflexão na reta $y = x$ | $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ | $-1$ |
| Escala (dilatação) | $\begin{bmatrix} k_1 & 0 \\ 0 & k_2 \end{bmatrix}$ | $k_1k_2$ |
| Cisalhamento horizontal | $\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$ | $1$ |
| Projeção no eixo $x$ | $\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ | $0$ |

**Exemplo.** Rotação de $90°$: $\vec e_1 = (1, 0)$ vai para $(0, 1)$ e $\vec e_2 = (0, 1)$ vai para $(-1, 0)$. Matriz $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$, que confere com a fórmula para $\theta = 90°$.

> [!INTUIÇÃO] Agora o determinante ganha sentido completo: rotações e cisalhamentos preservam área ($\det = 1$); reflexões preservam a área mas invertem a orientação ($\det = -1$); a projeção achata tudo numa reta ($\det = 0$).

## 4. Composição = produto

Aplicar $S$ e depois $T$ é a transformação $T \circ S$, cuja matriz é o produto $AB$ (com $A$ de $T$ e $B$ de $S$). A ordem lê-se **da direita para a esquerda**, como em funções: $(T \circ S)(\vec x) = T(S(\vec x)) = AB\vec x$.

> [!ATENÇÃO] Girar e depois refletir em geral **não** dá o mesmo que refletir e depois girar. É a não comutatividade do produto de matrizes, vista com os olhos.

A transformação inversa, quando existe, tem matriz $A^{-1}$.

## 5. Núcleo e imagem

> [!DEFINIÇÃO] Para $T(\vec x) = A\vec x$: o **núcleo** é $\ker T = \{\vec x : T(\vec x) = \vec 0\} = N(A)$ e a **imagem** é $\text{Im}\,T = \{T(\vec x)\} = C(A)$.

> [!TEOREMA] $T$ é **injetora** (não leva dois vetores diferentes no mesmo lugar) se e só se $\ker T = \{\vec 0\}$.

Pelo teorema do posto: $\dim \ker T + \dim \text{Im}\,T = \dim$ do domínio.

**Exemplo.** Projeção $P(x, y, z) = (x, y, 0)$ em $\mathbb{R}^3$: o núcleo é o eixo $z$ (dimensão $1$), a imagem é o plano $xy$ (dimensão $2$), e $1 + 2 = 3$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual transformação é linear?
- $T(x, y) = (x + 2, y)$
- $T(x, y) = (xy, x)$
+ $T(x, y) = (3x, x - y)$
- $T(x, y) = (|x|, y)$
> Só combinações lineares de $x$ e $y$, sem constantes nem produtos.

? Se $T(\vec e_1) = (2, 1)$ e $T(\vec e_2) = (-1, 3)$, a matriz de $T$ é:
+ $\begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$
- $\begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix}$
- $\begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix}$
- $\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$
> As imagens vão nas **colunas**.

? A matriz $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ representa:
- rotação de $90°$
+ reflexão na reta $y = x$
- projeção
- cisalhamento
> Troca $x$ e $y$: $\det = -1$, inverte a orientação.

? Uma transformação com determinante $0$:
- preserva áreas
- é uma rotação
+ achata o plano e não tem inversa
- é a identidade
> Área zero: dimensão perdida.

? Se $T: \mathbb{R}^4 \to \mathbb{R}^3$ tem imagem de dimensão $3$, o núcleo tem dimensão:
+ $1$
- $0$
- $3$
- $4$
> $4 - 3 = 1$.
```

## 6. Exercícios

**1.** Encontre a matriz da rotação de $45°$ e aplique-a em $(1, 0)$.

<details>
<summary>Ver solução</summary>

$\frac{\sqrt2}{2}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}$. $(1, 0) \mapsto \left(\frac{\sqrt2}{2}, \frac{\sqrt2}{2}\right)$.

</details>

**2.** Mostre que $T(x, y) = (x + y, 2x)$ é linear e encontre sua matriz.

<details>
<summary>Ver solução</summary>

$T(\vec u + \vec v)$ e $T(c\vec u)$ se distribuem porque cada componente é combinação linear de $x$ e $y$. $T(\vec e_1) = (1, 2)$, $T(\vec e_2) = (1, 0)$: $\begin{bmatrix} 1 & 1 \\ 2 & 0 \end{bmatrix}$.

</details>

**3.** Calcule a matriz de "refletir no eixo $x$ e depois girar $90°$" e a de "girar $90°$ e depois refletir". São iguais?

<details>
<summary>Ver solução</summary>

Refletir e girar: $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. Girar e refletir: $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ -1 & 0 \end{bmatrix}$. Diferentes: reflexões em $y = x$ e em $y = -x$.

</details>

**4.** Encontre o núcleo e a imagem de $T(x, y, z) = (x - y,\ y - z)$.

<details>
<summary>Ver solução</summary>

Núcleo: $x = y = z$, a reta $\text{ger}\{(1, 1, 1)\}$. Matriz $\begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix}$ tem posto $2$, então a imagem é $\mathbb{R}^2$. Confere: $1 + 2 = 3$.

</details>
