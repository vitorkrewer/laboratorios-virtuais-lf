# Integrais duplas

A integral simples soma faixas finas sob uma curva e dá uma área. A integral dupla soma **colunas** finas sob uma superfície e dá um **volume**. O cálculo, felizmente, reduz-se a duas integrais simples, uma dentro da outra.

> [!DICA] No simulador [Integrais duplas](#/lab/duplas), aumente o número de subdivisões e veja a soma das colunas se aproximar do valor da integral.

## 1. Definição

> [!DEFINIÇÃO] Divida a região $R$ em retângulos pequenos de área $\Delta A$ e escolha um ponto $(x_i^*, y_j^*)$ em cada. A **integral dupla** é o limite das somas de Riemann:
> $$\iint_R f(x, y)\,dA = \lim \sum_{i,j} f(x_i^*, y_j^*)\,\Delta A.$$
> Se $f \ge 0$, é o volume do sólido entre a superfície $z = f(x, y)$ e a região $R$. Com $f = 1$, dá a **área** de $R$.

## 2. Teorema de Fubini (regiões retangulares)

> [!TEOREMA] Se $f$ é contínua no retângulo $R = [a, b] \times [c, d]$:
> $$\iint_R f\,dA = \int_a^b\!\left(\int_c^d f(x, y)\,dy\right)dx = \int_c^d\!\left(\int_a^b f(x, y)\,dx\right)dy.$$

Integra-se "de dentro para fora": na integral de dentro, a outra variável é constante (como na derivada parcial).

**Exemplo.** $\displaystyle\iint_R (x + 2y)\,dA$ com $R = [0, 2] \times [0, 1]$.
- Dentro: $\int_0^1 (x + 2y)\,dy = \left[xy + y^2\right]_0^1 = x + 1$.
- Fora: $\int_0^2 (x + 1)\,dx = 2 + 2 = 4$.

> [!DICA] Se $f(x, y) = g(x)\,h(y)$ e a região é um retângulo, a integral dupla é o **produto** de duas integrais simples: $\int_a^b g\,dx \cdot \int_c^d h\,dy$.

## 3. Regiões gerais

**Tipo I** (entre duas curvas em $y$): $a \le x \le b$, $g_1(x) \le y \le g_2(x)$.
$$\iint_D f\,dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x, y)\,dy\,dx.$$

**Tipo II** (entre duas curvas em $x$): $c \le y \le d$, $h_1(y) \le x \le h_2(y)$.
$$\iint_D f\,dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x, y)\,dx\,dy.$$

> [!ATENÇÃO] Os limites da integral de **dentro** podem depender da variável de fora; os de **fora** são sempre constantes. Desenhe a região antes de escrever os limites.

**Exemplo.** $\displaystyle\iint_D xy\,dA$, onde $D$ é a região entre $y = x^2$ e $y = x$ (elas se cruzam em $x = 0$ e $x = 1$; ali $x^2 \le x$).
- Dentro: $\int_{x^2}^{x} xy\,dy = x\cdot\frac{x^2 - x^4}{2}$.
- Fora: $\frac12\int_0^1 (x^3 - x^5)\,dx = \frac12\left(\frac14 - \frac16\right) = \frac{1}{24}$.

## 4. Inverter a ordem de integração

Algumas integrais são impossíveis numa ordem e fáceis na outra. O procedimento: descreva a região pelos limites dados, desenhe-a e descreva-a de novo na outra ordem.

**Exemplo.** $\displaystyle\int_0^1\int_x^1 e^{y^2}\,dy\,dx$. A primitiva de $e^{y^2}$ não é elementar. A região é $0 \le x \le y \le 1$: o triângulo de vértices $(0, 0)$, $(0, 1)$ e $(1, 1)$. Na outra ordem, $0 \le y \le 1$ e $0 \le x \le y$:
$$\int_0^1\int_0^y e^{y^2}\,dx\,dy = \int_0^1 y\,e^{y^2}\,dy = \frac{e - 1}{2}.$$

## 5. Propriedades e valor médio

A integral dupla é linear, respeita desigualdades e se divide em regiões disjuntas. O **valor médio** de $f$ em $D$ é $\displaystyle\frac{1}{\text{Área}(D)}\iint_D f\,dA$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\iint_D 1\,dA$ representa:
- o volume de $D$
+ a área de $D$
- o perímetro de $D$
- sempre $1$
> Colunas de altura $1$.

? $\displaystyle\int_0^1\int_0^2 xy\,dx\,dy$ vale:
- $2$
+ $1$
- $\frac12$
- $4$
> $\int_0^2 x\,dx \cdot \int_0^1 y\,dy = 2 \cdot \frac12$.

? Numa integral iterada, os limites da integral de fora:
+ são constantes
- dependem da variável de dentro
- são sempre $0$ e $1$
- podem depender das duas variáveis
> Só os de dentro podem depender da variável de fora.

? Para a região $0 \le x \le 1$, $0 \le y \le x$, na ordem $dx\,dy$ os limites são:
- $0 \le y \le 1$, $0 \le x \le y$
+ $0 \le y \le 1$, $y \le x \le 1$
- $0 \le y \le x$, $0 \le x \le 1$
- $0 \le y \le 1$, $0 \le x \le 1$
> É o triângulo abaixo de $y = x$: para cada $y$, $x$ vai de $y$ a $1$.

? Inverter a ordem de integração é útil quando:
- a região é um retângulo
+ a integral de dentro não tem primitiva elementar na ordem dada
- $f$ é constante
- nunca muda o resultado, então nunca é útil
> O valor é o mesmo, mas uma das ordens pode ser calculável e a outra não.
```

## 6. Exercícios

**1.** Calcule $\displaystyle\iint_R x^2 y\,dA$ com $R = [0, 3] \times [1, 2]$.

<details>
<summary>Ver solução</summary>

$\int_0^3 x^2\,dx \cdot \int_1^2 y\,dy = 9 \cdot \frac32 = \frac{27}{2}$.

</details>

**2.** Calcule o volume sob $z = 4 - x - y$ acima do triângulo $x \ge 0$, $y \ge 0$, $x + y \le 2$.

<details>
<summary>Ver solução</summary>

$\int_0^2\int_0^{2 - x}(4 - x - y)\,dy\,dx$. Dentro: $(4 - x)(2 - x) - \frac{(2 - x)^2}{2} = (2 - x)\left(4 - x - \frac{2 - x}{2}\right) = (2 - x)\frac{6 - x}{2}$. Fora: $\frac12\int_0^2 (12 - 8x + x^2)\,dx = \frac12\left(24 - 16 + \frac83\right) = \frac{16}{3}$.

</details>

**3.** Calcule a área entre $y = x^2$ e $y = 2x$ por integral dupla.

<details>
<summary>Ver solução</summary>

$\int_0^2\int_{x^2}^{2x} dy\,dx = \int_0^2 (2x - x^2)\,dx = 4 - \frac83 = \frac43$.

</details>

**4.** Inverta a ordem e calcule $\displaystyle\int_0^{\pi}\int_x^{\pi}\frac{\sin y}{y}\,dy\,dx$.

<details>
<summary>Ver solução</summary>

Região $0 \le x \le y \le \pi$. Nova ordem: $\int_0^\pi\int_0^y \frac{\sin y}{y}\,dx\,dy = \int_0^\pi \sin y\,dy = 2$.

</details>
