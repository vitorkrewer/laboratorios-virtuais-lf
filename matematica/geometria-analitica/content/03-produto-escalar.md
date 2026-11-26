# Produto escalar, ângulos e projeções

O produto escalar transforma dois vetores em um número que carrega a informação de **ângulo**. Com ele se testa perpendicularismo, se calculam ângulos entre retas e planos e se projeta um vetor sobre outro.

## 1. Definição e fórmula do ângulo

$$\vec u \cdot \vec v = u_1v_1 + u_2v_2 + u_3v_3$$

> [!TEOREMA] $\vec u \cdot \vec v = \|\vec u\|\,\|\vec v\|\cos\theta$, em que $\theta \in [0°, 180°]$ é o ângulo entre os vetores. Logo
> $$\cos\theta = \frac{\vec u \cdot \vec v}{\|\vec u\|\,\|\vec v\|}.$$

**Exemplo.** $\vec u = (1, 1, 0)$ e $\vec v = (1, 0, 1)$: $\cos\theta = \frac{1}{\sqrt2\sqrt2} = \frac12$, logo $\theta = 60°$.

> [!INTUIÇÃO] A fórmula vem da lei dos cossenos aplicada ao triângulo formado por $\vec u$, $\vec v$ e $\vec u - \vec v$. Não é preciso decorar a demonstração, mas vale saber que não caiu do céu.

## 2. Perpendicularismo

> [!TEOREMA] $\vec u \perp \vec v \iff \vec u \cdot \vec v = 0$.

É o teste mais usado do livro: retas perpendiculares, vetor normal a um plano, altura de um triângulo.

**Exemplo.** O triângulo $A = (1, 1)$, $B = (4, 2)$, $C = (0, 4)$ é retângulo em $A$? $\overrightarrow{AB} = (3, 1)$, $\overrightarrow{AC} = (-1, 3)$, e $\overrightarrow{AB} \cdot \overrightarrow{AC} = -3 + 3 = 0$. Sim.

## 3. Ângulos diretores

Os ângulos $\alpha$, $\beta$, $\gamma$ que $\vec v$ forma com os eixos $x$, $y$, $z$ têm cossenos

$$\cos\alpha = \frac{v_1}{\|\vec v\|}, \quad \cos\beta = \frac{v_2}{\|\vec v\|}, \quad \cos\gamma = \frac{v_3}{\|\vec v\|}$$

e $\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$. Os três cossenos são exatamente as componentes do versor de $\vec v$.

## 4. Projeção ortogonal

A projeção de $\vec u$ na direção de $\vec v$:

$$\text{proj}_{\vec v}\,\vec u = \left(\frac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\right)\vec v$$

O **comprimento** da projeção (com sinal) é $\dfrac{\vec u \cdot \vec v}{\|\vec v\|}$.

**Exemplo.** Uma força $\vec F = (3, 4)$ N puxa um carrinho que só anda no eixo $x$. A parte útil da força é $\text{proj}_{\vec i}\vec F = (3, 0)$. O **trabalho** num deslocamento $\vec d$ é $W = \vec F \cdot \vec d$; com $\vec d = (5, 0)$ m, $W = 15$ J.

> [!INTUIÇÃO] Projeção é a sombra de $\vec u$ sobre a reta de $\vec v$ com a luz perpendicular a essa reta. O que sobra, $\vec u - \text{proj}_{\vec v}\vec u$, é perpendicular a $\vec v$.

## 5. Aplicação: altura de um triângulo

Para achar o pé da altura que sai de $C$ sobre o lado $AB$: projete $\overrightarrow{AC}$ sobre $\overrightarrow{AB}$ e some a $A$.

**Exemplo.** $A = (0, 0)$, $B = (4, 0)$, $C = (1, 3)$: $\text{proj}_{\overrightarrow{AB}}\overrightarrow{AC} = \frac{4}{16}(4, 0) = (1, 0)$. Pé da altura: $H = (1, 0)$, e a altura mede $\|C - H\| = 3$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $(2, -1, 3) \cdot (1, 5, 1)$ vale:
- $(2, -5, 3)$
+ $0$
- $10$
- $-2$
> $2 - 5 + 3 = 0$: são perpendiculares.

? Se $\vec u \cdot \vec v < 0$, o ângulo entre eles é:
- agudo
- reto
+ obtuso
- zero
> Cosseno negativo.

? O ângulo entre $(1, 0)$ e $(1, \sqrt3)$ é:
- $30°$
+ $60°$
- $45°$
- $90°$
> $\cos\theta = \frac{1}{1 \cdot 2} = \frac12$.

? A projeção de $(5, 2)$ sobre $(1, 0)$ é:
+ $(5, 0)$
- $(0, 2)$
- $(5, 2)$
- $5$
> A sombra no eixo $x$.

? Para que $k$ os vetores $(k, 2)$ e $(3, -6)$ são perpendiculares?
- $k = -4$
+ $k = 4$
- $k = 2$
- $k = -1$
> $3k - 12 = 0$.
```

## 6. Exercícios

**1.** Calcule o ângulo entre $(1, 2, 2)$ e $(2, 1, -2)$.

<details>
<summary>Ver solução</summary>

Produto $2 + 2 - 4 = 0$: $90°$.

</details>

**2.** Calcule os ângulos internos do triângulo $A = (0, 0)$, $B = (2, 0)$, $C = (1, \sqrt3)$.

<details>
<summary>Ver solução</summary>

Os três lados medem $2$: equilátero. Em $A$: $\cos = \frac{(2,0)\cdot(1,\sqrt3)}{2 \cdot 2} = \frac12$, $60°$. Todos $60°$.

</details>

**3.** Decomponha $\vec u = (4, 2)$ em uma parte paralela a $\vec v = (1, 1)$ e outra perpendicular.

<details>
<summary>Ver solução</summary>

Paralela: $\frac{6}{2}(1, 1) = (3, 3)$. Perpendicular: $(4, 2) - (3, 3) = (1, -1)$. Confira: $(1, -1) \cdot (1, 1) = 0$.

</details>

**4.** Uma força $\vec F = (2, 3, 1)$ N desloca um objeto de $A = (0, 1, 0)$ até $B = (4, 1, 2)$ (em metros). Calcule o trabalho.

<details>
<summary>Ver solução</summary>

$\vec d = (4, 0, 2)$; $W = 8 + 0 + 2 = 10$ J.

</details>
