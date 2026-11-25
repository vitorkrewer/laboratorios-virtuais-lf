# Matrizes e operações

Uma matriz é uma tabela de números. Parece só uma forma de organizar dados, mas tem uma segunda identidade, mais poderosa: **uma matriz é uma máquina que transforma vetores**. O produto de matrizes, que à primeira vista tem uma regra estranha, é exatamente a composição dessas máquinas.

## 1. Notação

$$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \end{bmatrix}$$

- $A$ é $2 \times 3$: **2 linhas** e **3 colunas** (sempre nessa ordem: "linha antes de coluna", como em LC).
- $a_{ij}$ é a entrada da linha $i$, coluna $j$. Aqui, $a_{23}$ está na 2ª linha, 3ª coluna.
- **Quadrada:** mesmo número de linhas e colunas. A **diagonal principal** é $a_{11}, a_{22}, \ldots$

Matrizes especiais:

| Nome | Descrição |
|---|---|
| Nula $O$ | todas as entradas zero |
| Identidade $I_n$ | $1$ na diagonal, $0$ fora |
| Diagonal | zeros fora da diagonal |
| Triangular superior | zeros abaixo da diagonal |
| Simétrica | $A^T = A$ (espelhada na diagonal) |

## 2. Soma e escalar

Mesmas regras dos vetores: entrada a entrada. Só se somam matrizes **do mesmo tamanho**.

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 0 & -1 \\ 5 & 2 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 8 & 6 \end{bmatrix} \qquad 3\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix}$$

## 3. Matriz vezes vetor

> [!DEFINIÇÃO] Se $A$ tem colunas $\vec a_1, \ldots, \vec a_n$ e $\vec x = (x_1, \ldots, x_n)$, então $A\vec x = x_1\vec a_1 + x_2\vec a_2 + \cdots + x_n\vec a_n$: uma **combinação linear das colunas** de $A$.

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 \\ 6 \end{bmatrix} = 5\begin{bmatrix} 1 \\ 3 \end{bmatrix} + 6\begin{bmatrix} 2 \\ 4 \end{bmatrix} = \begin{bmatrix} 17 \\ 39 \end{bmatrix}$$

Na prática, cada entrada do resultado é o **produto escalar** de uma linha de $A$ com $\vec x$: $1\cdot5 + 2\cdot6 = 17$ e $3\cdot5 + 4\cdot6 = 39$.

> [!INTUIÇÃO] Um sistema linear inteiro cabe em uma equação: $A\vec x = \vec b$. E a pergunta "o sistema tem solução?" vira "o vetor $\vec b$ é combinação linear das colunas de $A$?". Essa troca de ponto de vista é o coração da Álgebra Linear.

## 4. Produto de matrizes

> [!DEFINIÇÃO] Se $A$ é $m \times n$ e $B$ é $n \times p$, o produto $AB$ é $m \times p$, e a entrada $(i, j)$ é o produto escalar da **linha $i$ de $A$** com a **coluna $j$ de $B$**.

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix} = \begin{bmatrix} 1\cdot0 + 2\cdot2 & 1\cdot1 + 2\cdot(-1) \\ 3\cdot0 + 4\cdot2 & 3\cdot1 + 4\cdot(-1) \end{bmatrix} = \begin{bmatrix} 4 & -1 \\ 8 & -1 \end{bmatrix}$$

> [!DICA] **Regra do tamanho:** $(m \times \boxed{n}) \cdot (\boxed{n} \times p) = m \times p$. Os números de dentro precisam ser iguais e "somem"; os de fora dão o tamanho. $2 \times 3$ vezes $3 \times 4$ dá $2 \times 4$; $2 \times 3$ vezes $2 \times 3$ não existe.

> [!INTUIÇÃO] Por que essa regra? Aplicar $B$ e depois $A$ em um vetor é o mesmo que aplicar a matriz $AB$: $A(B\vec x) = (AB)\vec x$. O produto foi definido para que isso fosse verdade.

### Propriedades (e a que falta)

- Associativa: $(AB)C = A(BC)$.
- Distributiva: $A(B + C) = AB + AC$.
- Identidade: $AI = IA = A$.

> [!ATENÇÃO] **O produto não é comutativo**: em geral $AB \neq BA$. No exemplo acima, $BA = \begin{bmatrix} 3 & 4 \\ -1 & 0 \end{bmatrix} \neq AB$. Consequências: $(A + B)^2 = A^2 + AB + BA + B^2$ (e **não** $A^2 + 2AB + B^2$), e não se pode "cancelar": $AB = AC$ não garante $B = C$.

Outra surpresa: $AB = O$ pode acontecer com $A \neq O$ e $B \neq O$.

## 5. Transposta

> [!DEFINIÇÃO] A **transposta** $A^T$ troca linhas por colunas: $(A^T)_{ij} = a_{ji}$.

$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}^T = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$$

Propriedades: $(A^T)^T = A$; $(A + B)^T = A^T + B^T$; $(AB)^T = B^T A^T$ (a ordem **inverte**). E o produto escalar se escreve $\vec u \cdot \vec v = \vec u^T \vec v$.

## 6. Potências e aplicações

$A^2 = AA$, $A^3 = AAA$, só para matrizes quadradas. Exemplo de uso: em uma rede de cidades, se $A$ tem $a_{ij} = 1$ quando há estrada de $i$ para $j$, então $(A^2)_{ij}$ conta os caminhos de **duas** etapas de $i$ até $j$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $A$ é $3 \times 2$ e $B$ é $2 \times 5$, o produto $AB$:
- não existe
+ é $3 \times 5$
- é $2 \times 2$
- é $5 \times 3$
> Os números de dentro ($2$) batem; os de fora dão $3 \times 5$.

? $\begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix}\begin{bmatrix} 1 \\ 2 \end{bmatrix}$ é igual a:
+ $\begin{bmatrix} 2 \\ 7 \end{bmatrix}$
- $\begin{bmatrix} 2 \\ 6 \end{bmatrix}$
- $\begin{bmatrix} 4 \\ 3 \end{bmatrix}$
- $\begin{bmatrix} 3 \\ 5 \end{bmatrix}$
> $2\cdot1 + 0\cdot2 = 2$ e $1\cdot1 + 3\cdot2 = 7$.

? Para matrizes quadradas quaisquer, é sempre verdade que:
- $AB = BA$
- $(A + B)^2 = A^2 + 2AB + B^2$
+ $(AB)^T = B^T A^T$
- $AB = O$ implica $A = O$ ou $B = O$
> As outras falham porque o produto não é comutativo (e há "divisores de zero").

? A entrada $a_{32}$ de uma matriz está:
- na 3ª coluna, 2ª linha
+ na 3ª linha, 2ª coluna
- na diagonal
- fora da matriz se ela for $3 \times 3$
> Linha antes de coluna.

? $A\vec x$ é sempre:
- um número
+ uma combinação linear das colunas de $A$
- uma combinação linear das linhas de $A$
- uma matriz quadrada
> Os coeficientes são as componentes de $\vec x$.
```

## 7. Exercícios

**1.** Calcule $AB$ e $BA$ para $A = \begin{bmatrix} 1 & -1 \\ 2 & 0 \end{bmatrix}$ e $B = \begin{bmatrix} 3 & 1 \\ 1 & 2 \end{bmatrix}$.

<details>
<summary>Ver solução</summary>

$AB = \begin{bmatrix} 2 & -1 \\ 6 & 2 \end{bmatrix}$; $BA = \begin{bmatrix} 5 & -3 \\ 5 & -1 \end{bmatrix}$. Diferentes.

</details>

**2.** Escreva o sistema $\begin{cases} 2x - y = 4 \\ x + 3y = -5 \end{cases}$ na forma $A\vec x = \vec b$.

<details>
<summary>Ver solução</summary>

$\begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 4 \\ -5 \end{bmatrix}$.

</details>

**3.** Encontre $A \neq O$ e $B \neq O$, $2 \times 2$, com $AB = O$.

<details>
<summary>Ver solução</summary>

$A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ e $B = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$.

</details>

**4.** Calcule $A^2$ para $A = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$. O que $A$ faz com os vetores do plano?

<details>
<summary>Ver solução</summary>

$A^2 = -I$. $A$ gira $90°$ no sentido anti-horário; girar duas vezes ($180°$) troca o sinal de todo vetor.

</details>

**5.** Mostre com um exemplo que $(AB)^T \neq A^T B^T$ em geral.

<details>
<summary>Ver solução</summary>

Com $A$ e $B$ do exercício 1: $(AB)^T = \begin{bmatrix} 2 & 6 \\ -1 & 2 \end{bmatrix}$ e $A^T B^T = \begin{bmatrix} 5 & 5 \\ -3 & -1 \end{bmatrix}$ (que é $(BA)^T$).

</details>
