# Autovalores e autovetores

Quando uma matriz age sobre o plano, quase todo vetor muda de direção. Mas alguns vetores especiais **só são esticados ou encolhidos**, sem sair da própria reta. Esses são os autovetores, e o fator de esticamento é o autovalor. Eles revelam o "esqueleto" de uma transformação e são a chave para calcular potências de matrizes, estudar sistemas dinâmicos, o PageRank do Google e a análise de componentes principais.

> [!DICA] No simulador [Caçador de autovetores](#/lab/autovetores), gire o vetor $\vec v$ até $A\vec v$ ficar na mesma reta que ele. Quando isso acontece, você achou um autovetor, e o painel mostra o $\lambda$.

## 1. Definição

> [!DEFINIÇÃO] Seja $A$ uma matriz $n \times n$. Um vetor **não nulo** $\vec v$ é **autovetor** de $A$ se
> $$A\vec v = \lambda\,\vec v$$
> para algum número $\lambda$, chamado **autovalor** associado a $\vec v$.

**Exemplo.** $A = \begin{bmatrix} 3 & 1 \\ 0 & 2 \end{bmatrix}$ e $\vec v = (1, 0)$: $A\vec v = (3, 0) = 3\vec v$. Autovetor com $\lambda = 3$.

| $\lambda$ | O que acontece com $\vec v$ |
|---|---|
| $\lambda > 1$ | estica, mesmo sentido |
| $0 < \lambda < 1$ | encolhe, mesmo sentido |
| $\lambda < 0$ | inverte o sentido |
| $\lambda = 0$ | vai para $\vec 0$ (está no núcleo) |

> [!ATENÇÃO] O vetor nulo **nunca** é autovetor (senão todo $\lambda$ serviria). Mas o autovalor $\lambda = 0$ é permitido: significa que $A$ não é inversível.

## 2. Como calcular

$A\vec v = \lambda\vec v \iff (A - \lambda I)\vec v = \vec 0$. Queremos solução **não nula**, então $A - \lambda I$ não pode ser inversível:

> [!TEOREMA] $\lambda$ é autovalor de $A$ se e só se $\det(A - \lambda I) = 0$. Esse determinante é um polinômio em $\lambda$, o **polinômio característico**.

**Roteiro.**
1. Calcule $\det(A - \lambda I)$ e iguale a zero. As raízes são os autovalores.
2. Para cada $\lambda$, resolva $(A - \lambda I)\vec v = \vec 0$. As soluções não nulas são os autovetores (o **autoespaço** de $\lambda$).

**Exemplo.** $A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$.

$$\det\begin{bmatrix} 4 - \lambda & 1 \\ 2 & 3 - \lambda \end{bmatrix} = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 2)(\lambda - 5)$$

Autovalores $\lambda_1 = 5$ e $\lambda_2 = 2$.

- $\lambda = 5$: $\begin{bmatrix} -1 & 1 \\ 2 & -2 \end{bmatrix}\vec v = \vec 0 \Rightarrow v_1 = v_2$. Autovetor $(1, 1)$.
- $\lambda = 2$: $\begin{bmatrix} 2 & 1 \\ 2 & 1 \end{bmatrix}\vec v = \vec 0 \Rightarrow v_2 = -2v_1$. Autovetor $(1, -2)$.

**Confira:** $A(1, 1) = (5, 5) = 5(1, 1)$ ✓ e $A(1, -2) = (2, -4) = 2(1, -2)$ ✓.

> [!DICA] Atalho $2 \times 2$: o polinômio característico é $\lambda^2 - (\text{tr}\,A)\lambda + \det A$, em que o **traço** $\text{tr}\,A$ é a soma da diagonal. Logo a soma dos autovalores é o traço e o produto é o determinante. No exemplo: $5 + 2 = 7 = 4 + 3$ e $5 \cdot 2 = 10 = 12 - 2$.

### Casos que surpreendem

- **Matriz triangular:** os autovalores são as entradas da diagonal.
- **Rotação de $90°$:** $\lambda^2 + 1 = 0$, sem autovalores reais. Faz sentido: toda direção gira, nenhuma fica parada. (Nos complexos, $\lambda = \pm i$.)
- **Cisalhamento $\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$:** $\lambda = 1$ (duplo), mas só uma direção de autovetores, $(1, 0)$.

## 3. Diagonalização

> [!TEOREMA] Se $A$ ($n \times n$) tem $n$ autovetores LI $\vec v_1, \ldots, \vec v_n$, então
> $$A = PDP^{-1},$$
> com $P = [\vec v_1 \cdots \vec v_n]$ (autovetores nas colunas) e $D$ diagonal com os autovalores correspondentes.

> [!TEOREMA] Autovetores de autovalores **diferentes** são LI. Logo, uma matriz $n \times n$ com $n$ autovalores distintos é diagonalizável.

> [!INTUIÇÃO] Na base de autovetores, a transformação é só "esticar cada eixo pelo seu $\lambda$". $P^{-1}$ traduz para essa base, $D$ estica, $P$ traduz de volta.

### Potências ficam fáceis

$$A^k = PD^kP^{-1}, \qquad D^k = \begin{bmatrix} \lambda_1^k & & \\ & \ddots & \\ & & \lambda_n^k \end{bmatrix}$$

**Aplicação (cadeia de Markov).** Uma cidade tem dois bairros. Por ano, $10\%$ de quem mora em A muda para B e $20\%$ de B muda para A. Com $M = \begin{bmatrix} 0{,}9 & 0{,}2 \\ 0{,}1 & 0{,}8 \end{bmatrix}$, a população do ano seguinte é $M\vec x$. Os autovalores são $1$ e $0{,}7$. A parte com $0{,}7^k$ desaparece com o tempo, e a população converge para o autovetor de $\lambda = 1$: $(2, 1)$, isto é, $\frac23$ em A e $\frac13$ em B, qualquer que seja o começo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $A\vec v = 4\vec v$ com $\vec v \neq \vec 0$, então:
+ $\vec v$ é autovetor com autovalor $4$
- $A = 4I$
- $\det A = 4$
- $\vec v$ está no núcleo de $A$
> É exatamente a definição.

? Os autovalores de $\begin{bmatrix} 2 & 7 \\ 0 & -3 \end{bmatrix}$ são:
- $2$ e $7$
+ $2$ e $-3$
- $-1$ e $6$
- $9$ e $0$
> Triangular: a diagonal.

? Uma matriz $2 \times 2$ tem traço $5$ e determinante $6$. Seus autovalores são:
- $5$ e $6$
+ $2$ e $3$
- $1$ e $6$
- $-2$ e $-3$
> Soma $5$ e produto $6$.

? $\lambda = 0$ é autovalor de $A$. Então:
- isso é impossível
+ $A$ não é inversível
- $A$ é a matriz nula
- $A$ é diagonalizável
> $\det A = $ produto dos autovalores $= 0$.

? A rotação de $90°$ no plano:
- tem autovalores $1$ e $-1$
- tem todo vetor como autovetor
+ não tem autovalores reais
- tem autovalor $90$
> Nenhuma direção fica fixa.
```

## 4. Exercícios

**1.** Encontre autovalores e autovetores de $\begin{bmatrix} 2 & 3 \\ 3 & 2 \end{bmatrix}$.

<details>
<summary>Ver solução</summary>

$\lambda^2 - 4\lambda - 5 = 0$: $\lambda = 5$ e $\lambda = -1$. Para $5$: $(1, 1)$. Para $-1$: $(1, -1)$.

</details>

**2.** Diagonalize $A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$ e calcule $A^3$.

<details>
<summary>Ver solução</summary>

$P = \begin{bmatrix} 1 & 1 \\ 1 & -2 \end{bmatrix}$, $D = \begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix}$, $P^{-1} = \frac13\begin{bmatrix} 2 & 1 \\ 1 & -1 \end{bmatrix}$. $A^3 = PD^3P^{-1} = \frac13\begin{bmatrix} 250 + 8 & 125 - 8 \\ 250 - 16 & 125 + 16 \end{bmatrix} = \begin{bmatrix} 86 & 39 \\ 78 & 47 \end{bmatrix}$.

</details>

**3.** Mostre que $\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$ não é diagonalizável.

<details>
<summary>Ver solução</summary>

Único autovalor $\lambda = 1$; $(A - I)\vec v = \vec 0$ dá $v_2 = 0$, só a direção $(1, 0)$. Não há 2 autovetores LI.

</details>

**4.** Que autovalores pode ter uma matriz $A$ com $A^2 = A$ (uma projeção)?

<details>
<summary>Ver solução</summary>

Se $A\vec v = \lambda\vec v$, então $A^2\vec v = \lambda^2\vec v$. Como $A^2 = A$: $\lambda^2 = \lambda$, logo $\lambda = 0$ ou $\lambda = 1$.

</details>
