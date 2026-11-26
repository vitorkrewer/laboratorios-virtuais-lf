# Séries de potências e séries de Taylor

Uma calculadora não sabe "o que é" $\sin(0{,}3)$ ou $e^{1{,}7}$: ela soma e multiplica. Séries de Taylor transformam funções complicadas em **polinômios infinitos**, e truncar a série dá aproximações tão boas quanto se queira. É também assim que se integram funções sem primitiva elementar, como $e^{-x^2}$.

> [!DICA] No simulador [Séries e Taylor](#/lab/series), modo "Polinômio de Taylor": aumente o grau e veja o polinômio "abraçar" a função num intervalo cada vez maior.

## 1. Séries de potências

> [!DEFINIÇÃO] Uma **série de potências** em torno de $a$ é $\displaystyle\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x - a) + c_2(x - a)^2 + \cdots$

> [!TEOREMA] Para cada série de potências existe um **raio de convergência** $R$ ($0 \le R \le \infty$): ela converge absolutamente para $|x - a| < R$ e diverge para $|x - a| > R$. Nas extremidades ($|x - a| = R$), é preciso testar separadamente.

O raio costuma sair do **teste da razão**: $R = \displaystyle\lim \left|\frac{c_n}{c_{n+1}}\right|$.

**Exemplo.** $\sum \frac{x^n}{n}$: $R = \lim \frac{n + 1}{n} = 1$. Em $x = 1$ é a harmônica (diverge); em $x = -1$, a harmônica alternada (converge). Intervalo de convergência: $[-1, 1)$.

Dentro do intervalo, séries de potências podem ser **derivadas e integradas termo a termo**, e o raio não muda.

## 2. Série de Taylor

> [!TEOREMA] Se $f$ tem uma representação em série de potências perto de $a$, ela é necessariamente
> $$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots$$
> Com $a = 0$, chama-se **série de Maclaurin**.

> [!INTUIÇÃO] O polinômio de grau 1 é a reta tangente: acerta o valor e a inclinação. O de grau 2 acerta também a curvatura ($f''$). Cada grau a mais copia mais uma derivada de $f$ no ponto, e o polinômio passa a imitar a função num trecho maior.

## 3. As séries que valem decorar

| Função | Série de Maclaurin | Converge para |
|---|---|---|
| $e^x$ | $\displaystyle\sum \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ | todo $x$ |
| $\sin x$ | $x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \cdots$ | todo $x$ |
| $\cos x$ | $1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \cdots$ | todo $x$ |
| $\dfrac{1}{1 - x}$ | $1 + x + x^2 + x^3 + \cdots$ | $\lvert x \rvert < 1$ |
| $\ln(1 + x)$ | $x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \cdots$ | $-1 < x \le 1$ |
| $\arctan x$ | $x - \dfrac{x^3}{3} + \dfrac{x^5}{5} - \cdots$ | $\lvert x \rvert \le 1$ |

> [!DICA] Muitas séries saem das outras por substituição, derivação ou integração, sem calcular derivadas: $e^{-x^2} = \sum \frac{(-1)^n x^{2n}}{n!}$ (troque $x$ por $-x^2$); $\frac{1}{1 + x^2} = \sum (-1)^n x^{2n}$; integrando, sai a série do $\arctan$.

**Aplicações.**
- $\displaystyle\int_0^1 e^{-x^2}\,dx = \sum \frac{(-1)^n}{n!(2n + 1)} = 1 - \frac13 + \frac1{10} - \frac1{42} + \cdots \approx 0{,}7468$.
- $\displaystyle\lim_{x \to 0} \frac{\sin x - x}{x^3} = \lim \frac{-x^3/6 + \cdots}{x^3} = -\frac16$, sem L'Hôpital.
- $\arctan 1 = \frac{\pi}{4} = 1 - \frac13 + \frac15 - \cdots$ (converge devagar, mas é uma fórmula para $\pi$).

## 4. Quão boa é a aproximação

> [!TEOREMA] **(Resto de Lagrange)** O erro ao usar o polinômio de grau $n$ é $R_n(x) = \dfrac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}$ para algum $c$ entre $a$ e $x$. Se $|f^{(n+1)}| \le M$ no intervalo, $|R_n(x)| \le \dfrac{M|x - a|^{n+1}}{(n+1)!}$.

**Exemplo.** Aproximar $e^{0{,}5}$ por $1 + 0{,}5 + \frac{0{,}25}{2} = 1{,}625$ (grau 2). Erro $\le \frac{e^{0{,}5}(0{,}5)^3}{6} < \frac{2 \cdot 0{,}125}{6} \approx 0{,}042$. O valor real é $1{,}6487$; o erro de fato é $0{,}024$.

Para séries alternadas que cumprem Leibniz, há um atalho: o erro é menor que o **primeiro termo desprezado**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O polinômio de Taylor de grau 1 de $f$ em $a$ é:
+ a reta tangente ao gráfico em $a$
- a reta secante
- sempre $f(a)$
- a derivada de $f$
> $f(a) + f'(a)(x - a)$.

? O coeficiente de $x^3$ na série de Maclaurin de $e^x$ é:
- $3$
- $\frac13$
+ $\frac16$
- $1$
> $\frac{1}{3!}$.

? O raio de convergência de $\sum x^n$ é:
+ $1$
- $0$
- $\infty$
- $2$
> Série geométrica.

? A série de $\sin x$ contém:
- só potências pares
+ só potências ímpares
- todas as potências
- só termos positivos
> $\sin$ é ímpar.

? $\displaystyle\lim_{x \to 0}\frac{1 - \cos x}{x^2}$ vale:
- $0$
+ $\frac12$
- $1$
- $2$
> $1 - \cos x = \frac{x^2}{2} - \cdots$.
```

## 5. Exercícios

**1.** Escreva os quatro primeiros termos não nulos da série de Maclaurin de $x e^{x}$.

<details>
<summary>Ver solução</summary>

$x\left(1 + x + \frac{x^2}{2} + \frac{x^3}{6}\right) = x + x^2 + \frac{x^3}{2} + \frac{x^4}{6}$.

</details>

**2.** Encontre o raio e o intervalo de convergência de $\displaystyle\sum \frac{(x - 2)^n}{3^n}$.

<details>
<summary>Ver solução</summary>

Geométrica de razão $\frac{x - 2}{3}$: converge se $|x - 2| < 3$, ou seja, $-1 < x < 5$. Nas pontas, $|r| = 1$: diverge. $R = 3$, intervalo $(-1, 5)$.

</details>

**3.** Encontre o polinômio de Taylor de grau 2 de $\sqrt x$ em $a = 4$ e use-o para estimar $\sqrt{4{,}1}$.

<details>
<summary>Ver solução</summary>

$f(4) = 2$, $f'(4) = \frac14$, $f''(4) = -\frac{1}{32}$. $P_2 = 2 + \frac{x - 4}{4} - \frac{(x - 4)^2}{64}$. Em $4{,}1$: $2 + 0{,}025 - 0{,}000156 \approx 2{,}024844$ (real: $2{,}024846$).

</details>

**4.** Use séries para calcular $\displaystyle\lim_{x \to 0}\frac{e^x - 1 - x}{x^2}$.

<details>
<summary>Ver solução</summary>

$e^x - 1 - x = \frac{x^2}{2} + \frac{x^3}{6} + \cdots$; dividido por $x^2$ tende a $\frac12$.

</details>
