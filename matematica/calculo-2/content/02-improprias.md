# Integrais impróprias

A integral definida do Cálculo I pede um intervalo **limitado** e uma função **limitada**. Mas faz sentido perguntar pela área sob $\frac{1}{x^2}$ de $1$ até o infinito, ou sob $\frac{1}{\sqrt x}$ perto do zero, onde a função explode. Essas são as integrais impróprias, e a resposta (surpreendente) pode ser um número finito.

## 1. Intervalo infinito

> [!DEFINIÇÃO] $\displaystyle\int_a^{\infty} f(x)\,dx = \lim_{b \to \infty} \int_a^b f(x)\,dx$. Se o limite existe (é um número), a integral **converge**; senão, **diverge**.

**Exemplo.**
$$\int_1^{\infty} \frac{dx}{x^2} = \lim_{b \to \infty}\left[-\frac1x\right]_1^b = \lim_{b \to \infty}\left(1 - \frac1b\right) = 1$$

Uma região infinitamente comprida com área $1$.

**Exemplo.** $\displaystyle\int_1^{\infty} \frac{dx}{x} = \lim_{b \to \infty} \ln b = \infty$: diverge.

> [!INTUIÇÃO] $\frac{1}{x}$ e $\frac{1}{x^2}$ vão a zero, mas com velocidades diferentes. $\frac{1}{x^2}$ cai rápido o bastante para a área acumulada se estabilizar; $\frac{1}{x}$ cai devagar demais e a área cresce sem limite (como $\ln b$).

> [!TEOREMA] **($p$-integrais)** $\displaystyle\int_1^{\infty} \frac{dx}{x^p}$ converge se $p > 1$ (e vale $\frac{1}{p - 1}$) e diverge se $p \le 1$.

Com os dois limites infinitos, divide-se num ponto qualquer: $\int_{-\infty}^{\infty} = \int_{-\infty}^{0} + \int_0^{\infty}$, e **as duas** partes precisam convergir.

**Exemplo.** $\displaystyle\int_{-\infty}^{\infty} \frac{dx}{1 + x^2} = \lim \arctan b - \lim \arctan a = \frac{\pi}{2} - \left(-\frac{\pi}{2}\right) = \pi$.

## 2. Integrando ilimitado

> [!DEFINIÇÃO] Se $f$ explode em $x = a$: $\displaystyle\int_a^b f(x)\,dx = \lim_{t \to a^+} \int_t^b f(x)\,dx$.

**Exemplo.** $\displaystyle\int_0^1 \frac{dx}{\sqrt x} = \lim_{t \to 0^+} \left[2\sqrt x\right]_t^1 = 2$. Converge.

> [!TEOREMA] $\displaystyle\int_0^1 \frac{dx}{x^p}$ converge se $p < 1$ e diverge se $p \ge 1$. (O oposto do caso no infinito.)

> [!ATENÇÃO] Uma descontinuidade **no meio** do intervalo é fácil de não ver. $\displaystyle\int_{-1}^{1} \frac{dx}{x^2}$ "dá" $-2$ se você aplicar o Teorema Fundamental sem cuidado, mas a função é positiva e explode em $0$: a integral **diverge**. Sempre procure pontos onde o integrando não existe.

## 3. Testes de comparação

Muitas vezes não dá para calcular a primitiva, mas dá para saber se converge.

> [!TEOREMA] **(Comparação)** Se $0 \le f(x) \le g(x)$ para $x \ge a$:
> - se $\int_a^\infty g$ converge, $\int_a^\infty f$ converge;
> - se $\int_a^\infty f$ diverge, $\int_a^\infty g$ diverge.

**Exemplo.** $\displaystyle\int_1^{\infty} \frac{dx}{x^2 + e^x}$ converge, pois $\frac{1}{x^2 + e^x} \le \frac{1}{x^2}$.

**Exemplo.** $\displaystyle\int_1^{\infty} e^{-x^2}\,dx$ converge, pois $e^{-x^2} \le e^{-x}$ para $x \ge 1$, e $\int_1^\infty e^{-x}\,dx = e^{-1}$. (O valor exato de $\int_{-\infty}^{\infty} e^{-x^2}dx$ é $\sqrt\pi$, e é por causa dele que a densidade normal tem o fator $\frac{1}{\sqrt{2\pi}}$.)

> [!DICA] Para comparar, olhe o comportamento **dominante** para $x$ grande: $\frac{3x + 1}{x^3 + 2}$ se parece com $\frac{3}{x^2}$, então converge.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\int_1^\infty \frac{dx}{x^3}$:
+ converge para $\frac12$
- converge para $1$
- diverge
- vale $3$
> $p = 3 > 1$: $\frac{1}{p - 1} = \frac12$.

? $\displaystyle\int_1^\infty \frac{dx}{\sqrt x}$:
- converge para $2$
+ diverge
- converge para $\frac12$
- vale zero
> $p = \frac12 \le 1$ no infinito.

? $\displaystyle\int_0^1 \frac{dx}{\sqrt x}$:
+ converge para $2$
- diverge
- vale $\frac12$
- não é imprópria
> Perto de zero, $p = \frac12 < 1$ converge.

? Por que $\displaystyle\int_{-1}^{1}\frac{dx}{x^2}$ não vale $-2$?
- porque a função é ímpar
+ porque o integrando explode em $x = 0$ e a integral diverge
- porque o intervalo é simétrico
- porque $-2$ é negativo e a área é zero
> O Teorema Fundamental exige continuidade no intervalo.

? Se $0 \le f \le g$ e $\int_1^\infty f$ diverge, então $\int_1^\infty g$:
- converge
+ diverge
- pode convergir
- é igual a $\int f$
> A maior não pode ter área finita se a menor tem área infinita.
```

## 4. Exercícios

**1.** Calcule $\displaystyle\int_0^\infty e^{-2x}\,dx$.

<details>
<summary>Ver solução</summary>

$\lim_{b \to \infty} \left[-\frac12 e^{-2x}\right]_0^b = \frac12$.

</details>

**2.** Calcule $\displaystyle\int_0^\infty x e^{-x}\,dx$.

<details>
<summary>Ver solução</summary>

Por partes: $\left[-xe^{-x} - e^{-x}\right]_0^b \to 0 - (-1) = 1$. (Usa $\lim_{b\to\infty} b e^{-b} = 0$.)

</details>

**3.** Decida se converge: $\displaystyle\int_2^\infty \frac{x}{x^3 - 1}\,dx$.

<details>
<summary>Ver solução</summary>

Para $x$ grande, parece $\frac{1}{x^2}$: converge (por comparação no limite).

</details>

**4.** Calcule $\displaystyle\int_0^3 \frac{dx}{(x - 1)^{2/3}}$.

<details>
<summary>Ver solução</summary>

Explode em $x = 1$; divida. Primitiva $3(x - 1)^{1/3}$. De $0$ a $1$: $0 - 3(-1) = 3$. De $1$ a $3$: $3\sqrt[3]{2}$. Total $3 + 3\sqrt[3]2 \approx 6{,}78$.

</details>
