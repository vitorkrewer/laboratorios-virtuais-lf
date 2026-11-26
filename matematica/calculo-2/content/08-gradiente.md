# Gradiente e derivada direcional

As derivadas parciais medem a inclinação só nas direções dos eixos. Para uma direção qualquer existe a derivada direcional, e toda a informação fica guardada num único vetor, o **gradiente**. Ele aponta para onde a função cresce mais depressa e é perpendicular às curvas de nível. É a ideia por trás do método de otimização mais usado em aprendizado de máquina.

> [!DICA] No simulador [Superfícies](#/lab/superficies), ligue "gradiente" e mova o ponto: a seta sempre cruza a curva de nível em ângulo reto.

## 1. O vetor gradiente

> [!DEFINIÇÃO] O **gradiente** de $f(x, y)$ é o vetor $\nabla f = \left(\dfrac{\partial f}{\partial x}, \dfrac{\partial f}{\partial y}\right)$. Com três variáveis, ganha a terceira componente $f_z$.

**Exemplo.** $f(x, y) = x^2 + 3xy$: $\nabla f = (2x + 3y,\ 3x)$. Em $(1, 2)$: $\nabla f = (8, 3)$.

## 2. Derivada direcional

> [!DEFINIÇÃO] A **derivada direcional** de $f$ em $(a, b)$ na direção do vetor **unitário** $\vec u$ é a taxa de variação de $f$ andando nessa direção:
> $$D_{\vec u} f(a, b) = \lim_{h \to 0} \frac{f((a,b) + h\vec u) - f(a, b)}{h}.$$

> [!TEOREMA] Se $f$ é diferenciável, $D_{\vec u} f = \nabla f \cdot \vec u$.

> [!ATENÇÃO] $\vec u$ precisa ter comprimento $1$. Se a direção vier dada por $\vec v = (3, 4)$, use $\vec u = \frac{\vec v}{\lVert\vec v\rVert} = \left(\frac35, \frac45\right)$.

**Exemplo.** $f = x^2 + 3xy$ em $(1, 2)$, direção $(3, 4)$: $D_{\vec u} f = (8, 3)\cdot\left(\frac35, \frac45\right) = \frac{24 + 12}{5} = 7{,}2$.

## 3. O significado geométrico

Como $\nabla f \cdot \vec u = \lVert\nabla f\rVert\cos\theta$, onde $\theta$ é o ângulo entre $\nabla f$ e $\vec u$:

> [!TEOREMA]
> - O **crescimento máximo** ocorre na direção de $\nabla f$, com taxa $\lVert\nabla f\rVert$.
> - O **decrescimento máximo** ocorre na direção de $-\nabla f$, com taxa $-\lVert\nabla f\rVert$.
> - Na direção perpendicular a $\nabla f$, a taxa é $0$: é a direção da **curva de nível**.
> - Portanto, $\nabla f$ é **perpendicular às curvas de nível**.

> [!INTUIÇÃO] Numa montanha, o gradiente aponta para a subida mais íngreme, e a trilha que contorna a montanha sem subir nem descer (a curva de nível) é perpendicular a ele. A água escorre na direção de $-\nabla f$. O "gradiente descendente" de aprendizado de máquina é isso: dar passos na direção $-\nabla f$ para chegar ao fundo do vale.

**Exemplo.** No ponto $(1, 2)$ acima, a taxa máxima de crescimento é $\lVert(8, 3)\rVert = \sqrt{73} \approx 8{,}54$.

## 4. Planos tangentes a superfícies de nível

Em três variáveis, $\nabla F$ é perpendicular à superfície de nível $F(x, y, z) = k$. Então o plano tangente em $P = (a, b, c)$ é

$$F_x(P)(x - a) + F_y(P)(y - b) + F_z(P)(z - c) = 0.$$

**Exemplo.** Esfera $x^2 + y^2 + z^2 = 14$ em $(1, 2, 3)$: $\nabla F = (2, 4, 6)$. Plano: $2(x - 1) + 4(y - 2) + 6(z - 3) = 0$, ou $x + 2y + 3z = 14$. A normal aponta para fora, na direção do raio, como esperado.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O gradiente de $f(x, y) = xy$ em $(2, 3)$ é:
+ $(3, 2)$
- $(2, 3)$
- $(6, 6)$
- $6$
> $\nabla f = (y, x)$.

? A direção de maior crescimento de $f$ num ponto é:
- perpendicular a $\nabla f$
+ a de $\nabla f$
- a de $-\nabla f$
- sempre a do eixo $x$
> $D_u f = \lVert\nabla f\rVert\cos\theta$, máximo com $\theta = 0$.

? Em relação às curvas de nível, o gradiente é:
- tangente
+ perpendicular
- paralelo ao eixo $z$
- sempre nulo
> Andar na curva de nível dá taxa zero.

? Se $\nabla f(P) = (3, 4)$, a maior taxa de variação de $f$ em $P$ é:
- $7$
+ $5$
- $12$
- $25$
> $\sqrt{9 + 16}$.

? Para calcular $D_{\vec u} f$ com $\vec v = (1, 1)$, o vetor usado é:
- $(1, 1)$
+ $\left(\frac{1}{\sqrt2}, \frac{1}{\sqrt2}\right)$
- $(2, 2)$
- $\left(\frac12, \frac12\right)$
> Normalize: divida por $\sqrt2$.
```

## 5. Exercícios

**1.** Calcule a derivada direcional de $f = x e^{y}$ em $(2, 0)$ na direção de $(-1, 1)$.

<details>
<summary>Ver solução</summary>

$\nabla f = (e^y, xe^y) = (1, 2)$; $\vec u = \frac{1}{\sqrt2}(-1, 1)$. $D_{\vec u} f = \frac{-1 + 2}{\sqrt2} = \frac{1}{\sqrt2} \approx 0{,}71$.

</details>

**2.** A temperatura numa placa é $T = 100 - x^2 - 2y^2$. Em $(1, 1)$, em que direção um inseto deve andar para esfriar mais depressa?

<details>
<summary>Ver solução</summary>

$\nabla T = (-2x, -4y) = (-2, -4)$. Esfriar mais depressa: $-\nabla T = (2, 4)$, ou unitário $\frac{1}{\sqrt5}(1, 2)$.

</details>

**3.** Encontre o plano tangente ao elipsoide $x^2 + 2y^2 + 3z^2 = 6$ em $(1, 1, 1)$.

<details>
<summary>Ver solução</summary>

$\nabla F = (2, 4, 6)$; plano $2(x - 1) + 4(y - 1) + 6(z - 1) = 0$, ou $x + 2y + 3z = 6$.

</details>

**4.** Em que direção, a partir de $(1, 1)$, a função $f = x^2 - y^2$ não varia?

<details>
<summary>Ver solução</summary>

$\nabla f = (2, -2)$. Perpendicular: $(1, 1)$ (ou $(-1, -1)$). De fato, ao longo de $y = x$ a função vale $0$.

</details>
