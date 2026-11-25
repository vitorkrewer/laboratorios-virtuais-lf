# Determinantes

O determinante é um único número que resume uma matriz quadrada. Ele responde de uma vez à pergunta "$A$ tem inversa?" e tem um significado geométrico concreto: é o **fator de área** (ou de volume) da transformação.

> [!DICA] No simulador [Transformações 2D](#/lab/transformacoes), o quadrado unitário vira um paralelogramo. A área desse paralelogramo é $|\det A|$, e a cor indica se a orientação foi invertida.

## 1. Determinante 2×2

$$\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$

"Diagonal principal menos diagonal secundária." Exemplo: $\begin{vmatrix} 3 & 1 \\ 2 & 4 \end{vmatrix} = 12 - 2 = 10$.

> [!INTUIÇÃO] As colunas $(a, c)$ e $(b, d)$ formam um paralelogramo. Sua área é $|ad - bc|$. Se o determinante é $0$, as colunas estão na mesma reta, o paralelogramo é "achatado" e a transformação esmaga o plano numa reta: não dá para desfazer, logo não há inversa.

## 2. Determinante 3×3: regra de Sarrus

Repita as duas primeiras colunas à direita. Some os produtos das três diagonais que descem e subtraia os das três que sobem:

$$\begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = aei + bfg + cdh - ceg - afh - bdi$$

**Exemplo.**

$$\begin{vmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{vmatrix} = 0 + 40 + 0 - 15 - 24 - 0 = 1$$

> [!ATENÇÃO] Sarrus só vale para $3 \times 3$. Para $4 \times 4$ ou maior, use Laplace ou escalonamento.

## 3. Expansão de Laplace (cofatores)

Escolha uma linha ou coluna. O determinante é a soma de cada entrada vezes o seu **cofator**:

$$\det A = \sum_j a_{ij}\,C_{ij}, \qquad C_{ij} = (-1)^{i+j} M_{ij}$$

em que $M_{ij}$ (o **menor**) é o determinante da matriz sem a linha $i$ e a coluna $j$. Os sinais $(-1)^{i+j}$ formam um tabuleiro:

$$\begin{bmatrix} + & - & + \\ - & + & - \\ + & - & + \end{bmatrix}$$

> [!DICA] Escolha a linha ou coluna com **mais zeros**: cada zero elimina um termo inteiro da conta.

**Exemplo** (mesma matriz, pela 1ª coluna, que tem um zero):

$$1\begin{vmatrix} 1 & 4 \\ 6 & 0 \end{vmatrix} - 0 + 5\begin{vmatrix} 2 & 3 \\ 1 & 4 \end{vmatrix} = 1(-24) + 5(5) = 1$$

## 4. Propriedades

| Operação / caso | Efeito no determinante |
|---|---|
| trocar duas linhas | troca o sinal |
| multiplicar uma linha por $k$ | multiplica por $k$ |
| somar a uma linha um múltiplo de outra | **não muda** |
| linha (ou coluna) de zeros | $\det = 0$ |
| duas linhas iguais ou proporcionais | $\det = 0$ |
| matriz triangular | produto da diagonal |
| transposta | $\det A^T = \det A$ |

> [!TEOREMA] $\det(AB) = \det A \cdot \det B$, e se $A$ é inversível, $\det(A^{-1}) = \dfrac{1}{\det A}$.

> [!ATENÇÃO] $\det(A + B) \neq \det A + \det B$ em geral. E $\det(kA) = k^n \det A$ para $A$ de ordem $n$ (cada uma das $n$ linhas leva um fator $k$), não $k \det A$.

### Cálculo por escalonamento

Para matrizes grandes, escalone até a forma triangular, anotando as trocas de linha e os fatores. O determinante é o produto da diagonal, ajustado por essas anotações. É assim que computadores calculam determinantes.

## 5. Determinante e inversa

> [!TEOREMA] $A$ é inversível **se e somente se** $\det A \neq 0$.

Este é o item 6 do teorema das equivalências do capítulo anterior.

## 6. Regra de Cramer

Para $A\vec x = \vec b$ com $\det A \neq 0$:

$$x_i = \frac{\det A_i}{\det A}$$

em que $A_i$ é $A$ com a coluna $i$ trocada por $\vec b$.

**Exemplo.** $\begin{cases} 2x + y = 5 \\ x - y = 1 \end{cases}$: $\det A = -2 - 1 = -3$.

$$x = \frac{\begin{vmatrix} 5 & 1 \\ 1 & -1 \end{vmatrix}}{-3} = \frac{-6}{-3} = 2 \qquad y = \frac{\begin{vmatrix} 2 & 5 \\ 1 & 1 \end{vmatrix}}{-3} = \frac{-3}{-3} = 1$$

> [!DICA] Cramer é elegante para $2 \times 2$ e útil em demonstrações, mas para sistemas grandes o escalonamento é muito mais rápido.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\begin{vmatrix} 5 & 2 \\ 3 & 4 \end{vmatrix}$ vale:
- $26$
+ $14$
- $-14$
- $20$
> $20 - 6 = 14$.

? O determinante de $\begin{bmatrix} 2 & 7 & 1 \\ 0 & 3 & 5 \\ 0 & 0 & -1 \end{bmatrix}$ é:
+ $-6$
- $4$
- $0$
- $11$
> Triangular: produto da diagonal, $2 \cdot 3 \cdot (-1)$.

? Se $\det A = 3$ e $A$ é $3 \times 3$, então $\det(2A)$ é:
- $6$
- $12$
+ $24$
- $9$
> $2^3 \cdot 3 = 24$.

? Trocar duas linhas de uma matriz:
- não altera o determinante
+ troca o sinal do determinante
- zera o determinante
- dobra o determinante
> Cada troca inverte a orientação.

? Se $\det A = 0$, então:
- $A = O$
+ $A$ não tem inversa
- $A\vec x = \vec b$ tem sempre solução única
- $A$ é a identidade
> $\det A \neq 0$ é exatamente a condição para a inversa existir.
```

## 7. Exercícios

**1.** Calcule $\begin{vmatrix} 2 & 0 & 1 \\ 1 & 3 & -1 \\ 0 & 2 & 4 \end{vmatrix}$ por Sarrus e confira por Laplace.

<details>
<summary>Ver solução</summary>

Sarrus: $24 + 0 + 2 - 0 - (-4) - 0 = 30$. Laplace pela 1ª linha: $2(12 + 2) - 0 + 1(2 - 0) = 28 + 2 = 30$.

</details>

**2.** Para que valores de $k$ a matriz $\begin{bmatrix} 1 & k \\ k & 4 \end{bmatrix}$ não tem inversa?

<details>
<summary>Ver solução</summary>

$4 - k^2 = 0 \Rightarrow k = \pm 2$.

</details>

**3.** Se $\det A = 5$ e $\det B = -2$ (ambas $3 \times 3$), calcule $\det(AB)$, $\det(A^{-1})$, $\det(A^T)$ e $\det(3B)$.

<details>
<summary>Ver solução</summary>

$-10$; $\frac15$; $5$; $27 \cdot (-2) = -54$.

</details>

**4.** Calcule a área do triângulo de vértices $(0, 0)$, $(4, 1)$ e $(1, 3)$.

<details>
<summary>Ver solução</summary>

Paralelogramo: $\left|\begin{vmatrix} 4 & 1 \\ 1 & 3 \end{vmatrix}\right| = 11$. O triângulo é metade: $\frac{11}{2}$.

</details>

**5.** Resolva por Cramer: $\begin{cases} 3x - 2y = 4 \\ x + y = 3 \end{cases}$.

<details>
<summary>Ver solução</summary>

$\det A = 3 + 2 = 5$. $x = \frac{4 + 6}{5} = 2$; $y = \frac{9 - 4}{5} = 1$.

</details>
