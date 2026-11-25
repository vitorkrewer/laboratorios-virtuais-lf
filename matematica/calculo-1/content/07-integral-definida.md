# Integral definida e o Teorema Fundamental

A derivada mede **variação**. A integral faz o caminho inverso: **acumula** variações. Este capítulo mostra o que é a integral (uma soma infinita de pedacinhos) e o resultado que a conecta à derivada.

## 1. O problema da área

Como calcular a área sob uma curva $y = f(x)$ entre $x = a$ e $x = b$? Sem fórmula pronta, **aproximamos por retângulos**.

1. Divida $[a, b]$ em $n$ partes iguais de largura $\Delta x = \dfrac{b - a}{n}$.
2. Em cada parte, construa um retângulo com altura $f(x_i^*)$, em que $x_i^*$ é um ponto da parte.
3. Some as áreas.

$$S_n = \sum_{i=1}^{n} f(x_i^*)\,\Delta x$$

Quanto maior $n$, melhor a aproximação. No [simulador de integral](#/lab/integral), aumente $n$ e veja o erro desaparecer. Você também pode digitar sua própria função e conferir o resultado de uma integral definida que calculou à mão.

## 2. Definição

> [!DEFINIÇÃO] A **integral definida** de $f$ em $[a, b]$ é o limite das somas de Riemann:
> $$\int_a^b f(x)\,dx = \lim_{n \to \infty}\sum_{i=1}^{n} f(x_i^*)\,\Delta x.$$

Se $f$ é contínua em $[a, b]$, a integral existe.

**Interpretação como área com sinal:** onde $f \geq 0$, a integral soma área; onde $f < 0$, ela **subtrai**. Por isso $\displaystyle\int_0^{2\pi}\sin x\,dx = 0$: as áreas acima e abaixo do eixo se cancelam.

Para a área **total** (sem cancelamento), integre $|f|$.

### Exemplo pela definição

Para $\displaystyle\int_0^1 x^2\,dx$, com $\Delta x = \dfrac1n$ e $x_i = \dfrac{i}{n}$:

$$S_n = \sum_{i=1}^n \frac{i^2}{n^2}\cdot\frac1n = \frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} \xrightarrow{n\to\infty} \frac{2}{6} = \frac13.$$

## 3. Propriedades

$$\int_a^b c\,f\,dx = c\int_a^b f\,dx \qquad \int_a^b (f \pm g)\,dx = \int_a^b f\,dx \pm \int_a^b g\,dx$$

$$\int_a^a f\,dx = 0 \qquad \int_b^a f\,dx = -\int_a^b f\,dx \qquad \int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$$

Se $f \leq g$ em $[a,b]$, então $\displaystyle\int_a^b f \leq \int_a^b g$. Além disso, $\left|\displaystyle\int_a^b f\right| \leq \displaystyle\int_a^b |f|$.

**Simetria:** se $f$ é **ímpar**, $\displaystyle\int_{-a}^{a} f = 0$; se $f$ é **par**, $\displaystyle\int_{-a}^{a} f = 2\int_0^a f$. Isso economiza muitas contas.

## 4. O Teorema Fundamental do Cálculo

É o resultado mais importante do curso: **derivar e integrar são operações inversas**.

> [!TEOREMA] **(TFC, Parte 1)** Se $f$ é contínua em $[a, b]$ e $G(x) = \displaystyle\int_a^x f(t)\,dt$, então $G'(x) = f(x)$.

*Intuição:* a área acumulada $G(x)$ cresce, em cada ponto, na taxa dada pela altura $f(x)$ da curva.

> [!TEOREMA] **(TFC, Parte 2)** Se $f$ é contínua em $[a, b]$ e $F$ é uma **primitiva** de $f$ (isto é, $F' = f$), então
> $$\int_a^b f(x)\,dx = F(b) - F(a).$$

É assim que se calcula uma integral na prática: **ache uma primitiva e avalie nos extremos**. Notação: $F(b) - F(a) = \Big[F(x)\Big]_a^b$.

**Exemplo.**

$$\int_1^3 x^2\,dx = \left[\frac{x^3}{3}\right]_1^3 = \frac{27}{3} - \frac{1}{3} = \frac{26}{3}$$

$$\int_0^{\pi}\sin x\,dx = \Big[-\cos x\Big]_0^\pi = -\cos\pi + \cos 0 = 1 + 1 = 2$$

### TFC com limite variável (regra de Leibniz simples)

Se $G(x) = \displaystyle\int_a^{u(x)} f(t)\,dt$, então pela regra da cadeia $G'(x) = f(u(x))\,u'(x)$.

**Exemplo.** Se $G(x) = \displaystyle\int_0^{x^2}\sqrt{1 + t^3}\,dt$, então $G'(x) = \sqrt{1 + x^6}\cdot 2x$.

> [!ATENÇÃO] No TFC 2, a função precisa ser **contínua em todo o intervalo**. Por exemplo, $\int_{-1}^{1}\frac{1}{x^2}dx$ **não** vale $\left[-\frac1x\right]_{-1}^{1} = -2$: a função explode em $x=0$ e a integral é imprópria (diverge).

## 5. Valor médio

O **valor médio** de $f$ em $[a, b]$ é

$$f_{\text{méd}} = \frac{1}{b - a}\int_a^b f(x)\,dx.$$

É a altura do retângulo (de base $b-a$) que tem a mesma área que a região sob a curva.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\int_0^2 x\,dx=$
- $1$
+ $2$
- $4$
- $\frac12$
> $\left[\frac{x^2}{2}\right]_0^2=2$. Geometricamente, é a área de um triângulo de base $2$ e altura $2$.

? $\displaystyle\int_0^{\pi}\sin x\,dx=$
- $0$
- $1$
+ $2$
- $\pi$
> $\big[-\cos x\big]_0^\pi=1+1=2$.

? Se $G(x)=\displaystyle\int_1^{x}\cos\left(t^2\right)dt$, então $G'(x)=$
+ $\cos\left(x^2\right)$
- $\sin\left(x^2\right)$
- $2x\cos\left(x^2\right)$
- $\cos\left(x^2\right)-\cos 1$
> TFC parte 1: derivar a integral com limite superior $x$ devolve o integrando em $x$. O fator $2x$ só apareceria com limite $x^2$.

? $\displaystyle\int_{-3}^{3}x^5\,dx=$
+ $0$
- $2\displaystyle\int_0^3x^5\,dx$
- $\frac{3^6}{6}$
- Não dá para saber sem calcular
> $x^5$ é ímpar e o intervalo é simétrico: as áreas se cancelam.

? Por que $\displaystyle\int_0^{2\pi}\sin x\,dx=0$?
+ As áreas acima e abaixo do eixo $x$ se cancelam
- Porque $\sin x$ vale zero no intervalo
- Porque $\sin x$ não é integrável
- Na verdade a integral vale $4$
> A integral mede área com sinal. A área total (sem sinal) é $4$.
```

## 6. Exercícios

**1.** Calcule $\displaystyle\int_0^2 (3x^2 - 2x + 1)\,dx$.

<details>
<summary>Ver solução</summary>

$\Big[x^3 - x^2 + x\Big]_0^2 = (8 - 4 + 2) - 0 = 6$.

</details>

**2.** Calcule $\displaystyle\int_0^{\pi/2}\cos x\,dx$.

<details>
<summary>Ver solução</summary>

$\Big[\sin x\Big]_0^{\pi/2} = 1 - 0 = 1$.

</details>

**3.** Calcule $\displaystyle\int_1^e \frac{1}{x}\,dx$.

<details>
<summary>Ver solução</summary>

$\Big[\ln x\Big]_1^e = \ln e - \ln 1 = 1$.

</details>

**4.** Derive $G(x) = \displaystyle\int_1^{x}\frac{\sin t}{t}\,dt$.

<details>
<summary>Ver solução</summary>

Pelo TFC 1, $G'(x) = \dfrac{\sin x}{x}$ (para $x > 0$).

</details>

**5.** Calcule $\displaystyle\int_{-2}^{2} x^3\,dx$ sem fazer conta.

<details>
<summary>Ver solução</summary>

$x^3$ é ímpar e o intervalo é simétrico, então a integral vale $0$.

</details>

**6.** Qual é o valor médio de $f(x) = x^2$ em $[0, 3]$?

<details>
<summary>Ver solução</summary>

$\dfrac13\displaystyle\int_0^3 x^2dx = \dfrac13\cdot\dfrac{27}{3} = 3$.

</details>
