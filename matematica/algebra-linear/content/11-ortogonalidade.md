# Ortogonalidade, Gram-Schmidt e mínimos quadrados

Bases ortogonais são as mais confortáveis que existem: coordenadas saem com um produto escalar, sem resolver sistema nenhum. Este capítulo mostra como construí-las (Gram-Schmidt) e como usar projeções para resolver o problema mais aplicado da Álgebra Linear: ajustar uma reta a dados que não se alinham perfeitamente.

## 1. Conjuntos ortogonais e ortonormais

> [!DEFINIÇÃO] Um conjunto de vetores é **ortogonal** se cada par tem produto escalar zero. É **ortonormal** se, além disso, todos têm norma $1$.

Exemplos em $\mathbb{R}^2$: $\{(1, 1), (1, -1)\}$ é ortogonal; $\left\{\frac{1}{\sqrt2}(1, 1), \frac{1}{\sqrt2}(1, -1)\right\}$ é ortonormal.

> [!TEOREMA] Se $\{\vec u_1, \ldots, \vec u_n\}$ é uma base **ortogonal**, as coordenadas de $\vec x$ são
> $$c_i = \frac{\vec x \cdot \vec u_i}{\vec u_i \cdot \vec u_i}.$$
> Numa base **ortonormal**, simplesmente $c_i = \vec x \cdot \vec u_i$.

**Exemplo.** $(5, 1)$ na base $\{(1, 1), (1, -1)\}$: $c_1 = \frac{6}{2} = 3$, $c_2 = \frac{4}{2} = 2$. Sem escalonar nada. (Compare com o capítulo 8, onde o mesmo resultado exigiu um sistema.)

## 2. Matrizes ortogonais

> [!DEFINIÇÃO] Uma matriz quadrada $Q$ é **ortogonal** se suas colunas são ortonormais. Equivalentemente, $Q^TQ = I$, ou seja, $Q^{-1} = Q^T$.

Rotações e reflexões são ortogonais. Elas preservam comprimentos e ângulos: $\|Q\vec x\| = \|\vec x\|$. E $\det Q = \pm 1$.

> [!DICA] Inverter uma matriz ortogonal é de graça: basta transpor.

## 3. Projeção sobre um subespaço

Se $W$ tem base ortogonal $\{\vec u_1, \ldots, \vec u_k\}$, a projeção de $\vec x$ sobre $W$ é a soma das projeções sobre cada direção:

$$\text{proj}_W\,\vec x = \frac{\vec x \cdot \vec u_1}{\vec u_1 \cdot \vec u_1}\vec u_1 + \cdots + \frac{\vec x \cdot \vec u_k}{\vec u_k \cdot \vec u_k}\vec u_k$$

> [!TEOREMA] $\text{proj}_W\,\vec x$ é o ponto de $W$ **mais próximo** de $\vec x$, e o erro $\vec x - \text{proj}_W\,\vec x$ é ortogonal a $W$.

> [!INTUIÇÃO] É a sombra de $\vec x$ num chão inclinado, com o sol a pino em relação a esse chão. O caminho mais curto até o chão é a perpendicular.

## 4. Gram-Schmidt

Transforma qualquer base $\{\vec v_1, \vec v_2, \ldots\}$ numa base ortogonal do mesmo espaço, tirando de cada vetor a "parte" que já está nas direções anteriores:

$$\vec u_1 = \vec v_1$$
$$\vec u_2 = \vec v_2 - \frac{\vec v_2 \cdot \vec u_1}{\vec u_1 \cdot \vec u_1}\vec u_1$$
$$\vec u_3 = \vec v_3 - \frac{\vec v_3 \cdot \vec u_1}{\vec u_1 \cdot \vec u_1}\vec u_1 - \frac{\vec v_3 \cdot \vec u_2}{\vec u_2 \cdot \vec u_2}\vec u_2$$

Para ortonormal, divida cada $\vec u_i$ pela norma no final.

**Exemplo.** $\vec v_1 = (1, 1, 0)$, $\vec v_2 = (1, 0, 1)$.

$\vec u_1 = (1, 1, 0)$. $\vec u_2 = (1, 0, 1) - \frac{1}{2}(1, 1, 0) = \left(\frac12, -\frac12, 1\right)$.

**Confira:** $\vec u_1 \cdot \vec u_2 = \frac12 - \frac12 + 0 = 0$. ✓ (Para evitar frações, pode-se usar $2\vec u_2 = (1, -1, 2)$, que tem a mesma direção.)

## 5. Mínimos quadrados

Dados reais quase nunca cabem exatamente numa reta, e o sistema $A\vec x = \vec b$ fica **impossível**. A ideia: em vez de exigir igualdade, procure o $\hat x$ que deixa $A\hat x$ o **mais perto possível** de $\vec b$. Esse ponto é a projeção de $\vec b$ sobre $C(A)$, e o erro é ortogonal às colunas de $A$, o que dá:

> [!TEOREMA] **(Equações normais)** A solução de mínimos quadrados satisfaz $A^TA\,\hat x = A^T\vec b$.

**Exemplo: reta $y = a + bx$ pelos pontos $(0, 1)$, $(1, 2)$, $(2, 2)$.**

$$A = \begin{bmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{bmatrix}, \quad \vec b = \begin{bmatrix} 1 \\ 2 \\ 2 \end{bmatrix}, \quad A^TA = \begin{bmatrix} 3 & 3 \\ 3 & 5 \end{bmatrix}, \quad A^T\vec b = \begin{bmatrix} 5 \\ 6 \end{bmatrix}$$

Resolvendo $3a + 3b = 5$ e $3a + 5b = 6$: $b = \frac12$, $a = \frac76$. A reta de melhor ajuste é $y = \frac76 + \frac12 x$.

> [!INTUIÇÃO] "Mínimos quadrados" porque a reta escolhida minimiza a soma dos **quadrados** dos erros verticais. É o que a função de tendência de uma planilha faz, e é a base da regressão linear em estatística e em aprendizado de máquina.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual conjunto é ortonormal?
- $\{(1, 0), (1, 1)\}$
- $\{(2, 0), (0, 2)\}$
+ $\{(0, 1), (-1, 0)\}$
- $\{(1, 1), (1, -1)\}$
> Ortogonais e com norma $1$. O último é ortogonal, mas a norma é $\sqrt2$.

? Se $Q$ é uma matriz ortogonal, então $Q^{-1}$ é:
- $-Q$
+ $Q^T$
- $Q$
- $\frac{1}{\det Q}Q$
> $Q^TQ = I$.

? Na base ortogonal $\{(1, 1), (1, -1)\}$, a primeira coordenada de $(3, 7)$ é:
+ $5$
- $10$
- $-2$
- $3$
> $\frac{(3,7)\cdot(1,1)}{2} = \frac{10}{2}$.

? Gram-Schmidt serve para:
- calcular determinantes
+ transformar uma base qualquer em uma base ortogonal
- encontrar autovalores
- resolver sistemas impossíveis exatamente
> Tira de cada vetor as componentes nas direções anteriores.

? As equações normais dos mínimos quadrados são:
- $A\hat x = \vec b$
+ $A^TA\hat x = A^T\vec b$
- $AA^T\hat x = \vec b$
- $\hat x = A^{-1}\vec b$
> O erro $\vec b - A\hat x$ é ortogonal às colunas de $A$.
```

## 6. Exercícios

**1.** Verifique que $\{(1, 2, 2), (2, 1, -2), (2, -2, 1)\}$ é ortogonal e escreva $(3, 0, 3)$ nessa base.

<details>
<summary>Ver solução</summary>

Produtos: $2 + 2 - 4 = 0$; $2 - 4 + 2 = 0$; $4 - 2 - 2 = 0$. Cada vetor tem norma ao quadrado $9$. Coordenadas: $\frac{3 + 6}{9} = 1$; $\frac{6 - 6}{9} = 0$; $\frac{6 + 3}{9} = 1$. Logo $(3, 0, 3) = (1, 2, 2) + (2, -2, 1)$.

</details>

**2.** Aplique Gram-Schmidt a $(1, 0)$ e $(3, 2)$.

<details>
<summary>Ver solução</summary>

$\vec u_1 = (1, 0)$; $\vec u_2 = (3, 2) - 3(1, 0) = (0, 2)$.

</details>

**3.** Encontre a reta de mínimos quadrados pelos pontos $(1, 1)$, $(2, 3)$, $(3, 4)$.

<details>
<summary>Ver solução</summary>

$A^TA = \begin{bmatrix} 3 & 6 \\ 6 & 14 \end{bmatrix}$, $A^T\vec b = \begin{bmatrix} 8 \\ 19 \end{bmatrix}$. $3a + 6b = 8$ e $6a + 14b = 19$: $2b = 3 \Rightarrow b = \frac32$, $a = -\frac13$. Reta $y = -\frac13 + \frac32 x$.

</details>

**4.** Mostre que, se $Q$ é ortogonal, $\|Q\vec x\| = \|\vec x\|$.

<details>
<summary>Ver solução</summary>

$\|Q\vec x\|^2 = (Q\vec x)^T(Q\vec x) = \vec x^TQ^TQ\vec x = \vec x^T\vec x = \|\vec x\|^2$.

</details>
