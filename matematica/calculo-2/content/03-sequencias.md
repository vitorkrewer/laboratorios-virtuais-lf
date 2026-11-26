# Sequências

Uma sequência é uma lista infinita de números, $a_1, a_2, a_3, \ldots$ A pergunta central é para onde ela vai: os termos se aproximam de um número (converge) ou não? Sequências são o degrau para as séries, que somam infinitos termos.

## 1. Definição e notação

> [!DEFINIÇÃO] Uma **sequência** é uma função com domínio nos naturais: $n \mapsto a_n$. Escreve-se $(a_n)$ ou $\{a_n\}_{n \ge 1}$.

| Sequência | Primeiros termos |
|---|---|
| $a_n = \frac{1}{n}$ | $1, \frac12, \frac13, \frac14, \ldots$ |
| $a_n = (-1)^n$ | $-1, 1, -1, 1, \ldots$ |
| $a_n = \frac{n}{n + 1}$ | $\frac12, \frac23, \frac34, \ldots$ |
| $a_n = 2^n$ | $2, 4, 8, 16, \ldots$ |
| Fibonacci: $a_{n+1} = a_n + a_{n-1}$ | $1, 1, 2, 3, 5, 8, \ldots$ |

## 2. Limite de uma sequência

> [!DEFINIÇÃO] $\displaystyle\lim_{n \to \infty} a_n = L$ se os termos ficam tão perto de $L$ quanto se queira, a partir de algum índice. Formalmente: para todo $\varepsilon > 0$ existe $N$ tal que $|a_n - L| < \varepsilon$ para todo $n > N$. Se o limite existe, a sequência **converge**; senão, **diverge**.

Exemplos: $\frac1n \to 0$; $\frac{n}{n + 1} \to 1$; $(-1)^n$ diverge (oscila); $2^n \to \infty$ (diverge).

> [!TEOREMA] Se $a_n = f(n)$ e $\displaystyle\lim_{x \to \infty} f(x) = L$, então $a_n \to L$. Isso permite usar todas as técnicas de limite do Cálculo I, **inclusive L'Hôpital** (aplicado a $f(x)$).

**Exemplo.** $\displaystyle\lim \frac{\ln n}{n}$: com $f(x) = \frac{\ln x}{x}$, L'Hôpital dá $\frac{1/x}{1} \to 0$.

**Limites que valem decorar:**

| Sequência | Limite |
|---|---|
| $r^n$ | $0$ se $\lvert r \rvert < 1$; $1$ se $r = 1$; diverge nos demais |
| $\sqrt[n]{n}$ | $1$ |
| $\left(1 + \frac{x}{n}\right)^n$ | $e^x$ |
| $\frac{x^n}{n!}$ | $0$ (qualquer $x$) |
| hierarquia | $\ln n \ll n^p \ll a^n \ll n! \ll n^n$ |

> [!INTUIÇÃO] A hierarquia diz quem "vence" quando $n$ cresce: o fatorial cresce mais rápido que qualquer exponencial, que cresce mais rápido que qualquer potência, que cresce mais rápido que o logaritmo. Ela resolve de cabeça limites como $\frac{n^{10}}{2^n} \to 0$.

## 3. Ferramentas de convergência

> [!TEOREMA] **(Confronto)** Se $b_n \le a_n \le c_n$ e $b_n, c_n \to L$, então $a_n \to L$. Ex.: $\frac{\sin n}{n} \to 0$, pois fica entre $-\frac1n$ e $\frac1n$.

> [!TEOREMA] **(Sequência monótona e limitada)** Toda sequência **crescente e limitada superiormente** converge (o mesmo para decrescente e limitada inferiormente).

Esse teorema garante convergência mesmo sem saber o limite. Ex.: $a_1 = 1$, $a_{n+1} = \sqrt{2 + a_n}$ é crescente e menor que $2$, logo converge; o limite $L$ satisfaz $L = \sqrt{2 + L}$, ou seja, $L = 2$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\lim_{n \to \infty} \frac{3n^2 + 1}{n^2 - 5}$ é:
- $0$
+ $3$
- $\infty$
- $-\frac15$
> Razão dos termos dominantes.

? A sequência $a_n = (0{,}9)^n$:
+ converge para $0$
- converge para $0{,}9$
- diverge para $\infty$
- oscila
> $|r| < 1$.

? A sequência $a_n = (-1)^n\,\frac{n}{n + 1}$:
- converge para $1$
- converge para $0$
+ diverge
- converge para $-1$
> Os termos se aproximam alternadamente de $1$ e $-1$.

? $\displaystyle\lim \frac{n^5}{3^n}$ é:
+ $0$
- $\infty$
- $1$
- $\frac53$
> A exponencial vence a potência.

? Uma sequência crescente e limitada superiormente:
- pode divergir
+ sempre converge
- converge para zero
- é constante
> Teorema da sequência monótona.
```

## 4. Exercícios

**1.** Calcule $\displaystyle\lim \left(1 + \frac{2}{n}\right)^n$.

<details>
<summary>Ver solução</summary>

$e^2$.

</details>

**2.** Calcule $\displaystyle\lim \frac{n!}{n^n}$.

<details>
<summary>Ver solução</summary>

$\frac{n!}{n^n} = \frac{1}{n}\cdot\frac{2}{n}\cdots\frac{n}{n} \le \frac1n \to 0$. Pelo confronto, $0$.

</details>

**3.** Calcule $\displaystyle\lim \left(\sqrt{n^2 + n} - n\right)$.

<details>
<summary>Ver solução</summary>

Multiplique pelo conjugado: $\frac{n}{\sqrt{n^2 + n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1} \to \frac12$.

</details>

**4.** A sequência $a_n = \frac{\cos(n\pi)}{n}$ converge?

<details>
<summary>Ver solução</summary>

$\cos(n\pi) = (-1)^n$, então $|a_n| = \frac1n \to 0$. Converge para $0$.

</details>
