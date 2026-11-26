# Vetores no plano e no espaço

Pontos dizem **onde**; vetores dizem **para onde e quanto**. Em Geometria Analítica, vetores são a ferramenta que descreve direções de retas, normais de planos, áreas e volumes. Este capítulo apresenta os vetores do ponto de vista geométrico, no plano ($\mathbb{R}^2$) e no espaço ($\mathbb{R}^3$).

> [!DICA] Este capítulo conversa com [Vetores em ℝⁿ](../algebra-linear/#/teoria/vetores) do livro Álgebra Linear. Lá o foco é algébrico; aqui é a geometria de retas, planos e figuras.

## 1. Vetor definido por dois pontos

> [!DEFINIÇÃO] O vetor que vai de $A$ até $B$ é $\overrightarrow{AB} = B - A$: subtraia as coordenadas, "ponto final menos ponto inicial".

**Exemplo.** $A = (1, 2, 0)$ e $B = (4, 0, 5)$: $\overrightarrow{AB} = (3, -2, 5)$.

> [!INTUIÇÃO] $\overrightarrow{AB}$ é a "instrução de viagem" de $A$ até $B$: ande $3$ em $x$, $-2$ em $y$, $5$ em $z$. Por isso $A + \overrightarrow{AB} = B$.

## 2. O espaço tridimensional

Em $\mathbb{R}^3$, três eixos perpendiculares $x$, $y$, $z$ formam um sistema **dextrogiro** (regra da mão direita: dedos de $x$ para $y$, o polegar aponta para $z$). Um ponto é $P = (x, y, z)$. Distância e ponto médio ganham só uma coordenada a mais:

$$d(A, B) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

Os vetores da base canônica têm nomes próprios: $\vec i = (1, 0, 0)$, $\vec j = (0, 1, 0)$, $\vec k = (0, 0, 1)$. Assim, $(3, -2, 5) = 3\vec i - 2\vec j + 5\vec k$.

## 3. Operações e norma

Soma e multiplicação por escalar são componente a componente:

$$\vec u + \vec v = (u_1 + v_1,\ u_2 + v_2,\ u_3 + v_3) \qquad c\,\vec u = (cu_1,\ cu_2,\ cu_3)$$

A **norma** (comprimento) é $\|\vec v\| = \sqrt{v_1^2 + v_2^2 + v_3^2}$, e o **versor** de $\vec v$ (vetor unitário de mesma direção e sentido) é $\dfrac{\vec v}{\|\vec v\|}$.

**Exemplo.** $\vec v = (2, -1, 2)$: $\|\vec v\| = 3$, versor $\left(\frac23, -\frac13, \frac23\right)$.

> [!INTUIÇÃO] Regra do paralelogramo: $\vec u + \vec v$ é a diagonal do paralelogramo formado por $\vec u$ e $\vec v$ saindo do mesmo ponto. E $\vec u - \vec v$ é a outra diagonal, de $\vec v$ até $\vec u$.

## 4. Vetores paralelos

> [!DEFINIÇÃO] $\vec u$ e $\vec v$ (não nulos) são **paralelos** (ou colineares) se um é múltiplo do outro: $\vec u = k\,\vec v$. Em coordenadas, as componentes são **proporcionais**.

**Exemplo.** $(2, -4, 6)$ e $(-1, 2, -3)$ são paralelos ($k = -2$, sentidos opostos). $(1, 2, 3)$ e $(2, 4, 5)$ não são: $\frac21 = \frac42 \neq \frac53$.

> [!DICA] Para testar se três pontos $A$, $B$, $C$ estão alinhados no espaço, verifique se $\overrightarrow{AB}$ e $\overrightarrow{AC}$ são paralelos.

## 5. Aplicação: pontos que dividem segmentos

O ponto que está a uma fração $t$ do caminho de $A$ até $B$ é $P = A + t\,\overrightarrow{AB}$.

- $t = \frac12$: ponto médio.
- $t = \frac13$: um terço do caminho, mais perto de $A$.
- $t$ variando em todos os reais: **a reta inteira** que passa por $A$ e $B$. Esta é a equação vetorial da reta (capítulo 5).

**Exemplo.** Os pontos que dividem $AB$ em três partes iguais, com $A = (0, 0, 0)$ e $B = (3, 6, -3)$: $A + \frac13\overrightarrow{AB} = (1, 2, -1)$ e $A + \frac23\overrightarrow{AB} = (2, 4, -2)$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Com $A = (2, 5)$ e $B = (-1, 1)$, o vetor $\overrightarrow{AB}$ é:
- $(3, 4)$
+ $(-3, -4)$
- $(1, 6)$
- $(-1, 1)$
> Ponto final menos ponto inicial: $B - A$.

? A norma de $(1, -2, 2)$ é:
+ $3$
- $9$
- $1$
- $\sqrt{5}$
> $\sqrt{1 + 4 + 4}$.

? Qual vetor é paralelo a $(3, -6, 9)$?
- $(1, 2, 3)$
+ $(-1, 2, -3)$
- $(3, 6, 9)$
- $(0, -6, 9)$
> É $-\frac13$ do vetor dado.

? O versor de $(0, 0, 5)$ é:
- $(0, 0, 5)$
- $(0, 0, \frac15)$
+ $(0, 0, 1)$
- $(1, 1, 1)$
> Divida pela norma $5$.

? $2\vec i - \vec k$ em coordenadas é:
- $(2, -1, 0)$
+ $(2, 0, -1)$
- $(2, 1, -1)$
- $(1, 0, -2)$
> $\vec i$ é o eixo $x$; $\vec k$, o eixo $z$.
```

## 6. Exercícios

**1.** Com $A = (1, 0, 2)$, $B = (3, 4, 2)$, calcule $\overrightarrow{AB}$, $\|\overrightarrow{AB}\|$ e o ponto médio.

<details>
<summary>Ver solução</summary>

$(2, 4, 0)$; $\sqrt{4 + 16} = 2\sqrt5$; $(2, 2, 2)$.

</details>

**2.** Verifique se $A = (1, 2, 3)$, $B = (2, 4, 5)$, $C = (4, 8, 9)$ estão alinhados.

<details>
<summary>Ver solução</summary>

$\overrightarrow{AB} = (1, 2, 2)$ e $\overrightarrow{AC} = (3, 6, 6) = 3\overrightarrow{AB}$. Paralelos: alinhados.

</details>

**3.** Encontre o vetor de norma $10$ com a mesma direção e sentido de $(3, 0, 4)$.

<details>
<summary>Ver solução</summary>

Versor $\left(\frac35, 0, \frac45\right)$; vezes $10$: $(6, 0, 8)$.

</details>

**4.** Para que $m$ e $n$ os vetores $(2, m, 6)$ e $(1, 3, n)$ são paralelos?

<details>
<summary>Ver solução</summary>

$(2, m, 6) = 2(1, 3, n)$: $m = 6$ e $n = 3$.

</details>

**5.** Em um paralelogramo $ABCD$, $A = (0, 0)$, $B = (5, 1)$ e $D = (1, 3)$. Encontre $C$.

<details>
<summary>Ver solução</summary>

$C = B + \overrightarrow{AD} = (5, 1) + (1, 3) = (6, 4)$.

</details>
