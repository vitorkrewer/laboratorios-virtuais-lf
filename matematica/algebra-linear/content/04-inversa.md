# Matriz inversa

Com números, resolver $3x = 6$ é dividir por $3$, ou seja, multiplicar pelo inverso $\frac13$. Com matrizes não existe divisão, mas existe a **inversa**: a matriz que desfaz o que $A$ fez.

## 1. Definição

> [!DEFINIÇÃO] Uma matriz quadrada $A$ é **inversível** se existe $A^{-1}$ tal que $A A^{-1} = A^{-1} A = I$.

Se $A$ é inversível, o sistema $A\vec x = \vec b$ tem solução única:

$$A\vec x = \vec b \;\Rightarrow\; A^{-1}A\vec x = A^{-1}\vec b \;\Rightarrow\; \vec x = A^{-1}\vec b$$

> [!ATENÇÃO] $A^{-1}$ **não** é $\frac{1}{A}$ e não se calcula invertendo entrada por entrada. E só matrizes **quadradas** podem ter inversa, mas nem todas têm.

> [!INTUIÇÃO] Pense em $A$ como uma transformação do plano. Ela tem inversa se não "achata" o plano: se dois vetores diferentes nunca vão parar no mesmo lugar. Uma projeção sobre uma reta, por exemplo, perde informação e não pode ser desfeita.

## 2. A fórmula 2×2

> [!TEOREMA] Se $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ e $ad - bc \neq 0$, então $A^{-1} = \dfrac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$. Se $ad - bc = 0$, $A$ não tem inversa.

> [!DICA] Para lembrar: **troca** os da diagonal principal, **troca o sinal** dos da outra diagonal e **divide** pelo determinante $ad - bc$.

**Exemplo.** $A = \begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}$: $ad - bc = 6 - 5 = 1$.

$$A^{-1} = \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}$$

**Confira:** $\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}\begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$. ✓

## 3. Gauss-Jordan: inversa de qualquer tamanho

Escreva $[\,A \;\vdots\; I\,]$ e escalone até o lado esquerdo virar $I$. O lado direito será $A^{-1}$:

$$[\,A \;\vdots\; I\,] \;\longrightarrow\; [\,I \;\vdots\; A^{-1}\,]$$

Se aparecer uma linha de zeros no lado esquerdo, $A$ **não** é inversível.

**Exemplo.** $A = \begin{bmatrix} 1 & 2 & 0 \\ 0 & 1 & 0 \\ 2 & 0 & 1 \end{bmatrix}$.

$$\left[\begin{array}{ccc:ccc} 1 & 2 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & 0 & 1 & 0 \\ 2 & 0 & 1 & 0 & 0 & 1 \end{array}\right] \xrightarrow{L_3 - 2L_1} \left[\begin{array}{ccc:ccc} 1 & 2 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & 0 & 1 & 0 \\ 0 & -4 & 1 & -2 & 0 & 1 \end{array}\right]$$

$L_3 \leftarrow L_3 + 4L_2$ e depois $L_1 \leftarrow L_1 - 2L_2$:

$$\left[\begin{array}{ccc:ccc} 1 & 0 & 0 & 1 & -2 & 0 \\ 0 & 1 & 0 & 0 & 1 & 0 \\ 0 & 0 & 1 & -2 & 4 & 1 \end{array}\right] \quad\Rightarrow\quad A^{-1} = \begin{bmatrix} 1 & -2 & 0 \\ 0 & 1 & 0 \\ -2 & 4 & 1 \end{bmatrix}$$

> [!INTUIÇÃO] Por que funciona? Cada operação elementar é a multiplicação por uma matriz simples. Se uma sequência delas transforma $A$ em $I$, o produto dessas matrizes é $A^{-1}$. Aplicando a mesma sequência a $I$, sobra exatamente esse produto.

## 4. Propriedades

- $(A^{-1})^{-1} = A$.
- $(AB)^{-1} = B^{-1}A^{-1}$: a ordem **inverte** (para desfazer "calçar meia e depois sapato", tira-se primeiro o sapato).
- $(A^T)^{-1} = (A^{-1})^T$.
- $(kA)^{-1} = \frac{1}{k}A^{-1}$, para $k \neq 0$.

> [!ATENÇÃO] Não existe fórmula para $(A + B)^{-1}$. Em particular, $(A + B)^{-1} \neq A^{-1} + B^{-1}$.

## 5. O teorema das equivalências

> [!TEOREMA] Para uma matriz quadrada $A$, $n \times n$, as afirmações abaixo são **todas equivalentes** (ou são todas verdadeiras, ou todas falsas):
> 1. $A$ é inversível.
> 2. $A\vec x = \vec b$ tem solução única para todo $\vec b$.
> 3. $A\vec x = \vec 0$ só tem a solução nula.
> 4. A forma escalonada reduzida de $A$ é $I$ (posto $n$).
> 5. As colunas de $A$ são linearmente independentes.
> 6. $\det A \neq 0$.

Este teorema cresce ao longo do livro: cada capítulo novo acrescenta uma condição. Ele é a "costura" da Álgebra Linear.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A inversa de $\begin{bmatrix} 4 & 3 \\ 1 & 1 \end{bmatrix}$ é:
+ $\begin{bmatrix} 1 & -3 \\ -1 & 4 \end{bmatrix}$
- $\begin{bmatrix} \frac14 & \frac13 \\ 1 & 1 \end{bmatrix}$
- $\begin{bmatrix} 1 & 3 \\ 1 & 4 \end{bmatrix}$
- não existe
> $ad - bc = 4 - 3 = 1$; troca a diagonal e o sinal da outra.

? Qual matriz **não** tem inversa?
- $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$
+ $\begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$
- $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$
- $\begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix}$
> $2\cdot2 - 4\cdot1 = 0$: a segunda linha é metade da primeira.

? $(AB)^{-1}$ é igual a:
- $A^{-1}B^{-1}$
+ $B^{-1}A^{-1}$
- $\frac{1}{AB}$
- $A^{-1} + B^{-1}$
> Desfaz-se na ordem contrária.

? Se $A$ é inversível, a solução de $A\vec x = \vec b$ é:
- $\vec x = \vec b A^{-1}$
+ $\vec x = A^{-1}\vec b$
- $\vec x = \vec b / A$
- pode não existir
> Multiplique os dois lados por $A^{-1}$ **pela esquerda**.

? Ao fazer Gauss-Jordan em $[A \,\vdots\, I]$, aparece uma linha de zeros do lado esquerdo. Então:
- erramos a conta
- $A^{-1}$ é a matriz da direita
+ $A$ não é inversível
- $A = I$
> Posto menor que $n$: não há inversa.
```

## 6. Exercícios

**1.** Calcule a inversa de $\begin{bmatrix} 3 & 2 \\ 4 & 3 \end{bmatrix}$ e use-a para resolver $\begin{cases} 3x + 2y = 1 \\ 4x + 3y = 2 \end{cases}$.

<details>
<summary>Ver solução</summary>

$ad - bc = 1$; $A^{-1} = \begin{bmatrix} 3 & -2 \\ -4 & 3 \end{bmatrix}$. $\vec x = A^{-1}\begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} -1 \\ 2 \end{bmatrix}$.

</details>

**2.** Para que valores de $k$ a matriz $\begin{bmatrix} k & 2 \\ 8 & k \end{bmatrix}$ é inversível?

<details>
<summary>Ver solução</summary>

$k^2 - 16 \neq 0$, ou seja, $k \neq \pm 4$.

</details>

**3.** Calcule por Gauss-Jordan a inversa de $\begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix}$.

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - L_3$ e depois $L_1 \leftarrow L_1 - L_2$. Resultado: $\begin{bmatrix} 1 & -1 & 1 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{bmatrix}$.

</details>

**4.** Mostre que, se $A^2 = I$, então $A^{-1} = A$. Dê um exemplo além da identidade.

<details>
<summary>Ver solução</summary>

$AA = I$ é a própria definição de $A$ ser inversa de si mesma. Exemplo: $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ (reflexão na reta $y = x$; refletir duas vezes volta ao início).

</details>
