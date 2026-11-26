# Séries numéricas e testes de convergência

Somar infinitos números pode dar um resultado finito: $\frac12 + \frac14 + \frac18 + \cdots = 1$. Mas $1 + \frac12 + \frac13 + \frac14 + \cdots$, com termos que também vão a zero, cresce sem limite. Este capítulo ensina a distinguir os dois casos com uma lista de testes e um roteiro para escolher qual usar.

> [!DICA] No simulador [Séries e Taylor](#/lab/series), escolha uma série e veja as somas parciais $S_n$ se aproximarem (ou não) de um valor.

## 1. Somas parciais

> [!DEFINIÇÃO] A série $\displaystyle\sum_{n=1}^{\infty} a_n$ **converge** para $S$ se a sequência de **somas parciais** $S_N = a_1 + \cdots + a_N$ converge para $S$. Caso contrário, diverge.

## 2. Duas séries de referência

> [!TEOREMA] **(Série geométrica)** $\displaystyle\sum_{n=0}^{\infty} ar^n = a + ar + ar^2 + \cdots = \frac{a}{1 - r}$ se $|r| < 1$, e diverge se $|r| \ge 1$.

**Exemplo.** $0{,}\overline{3} = \frac{3}{10} + \frac{3}{100} + \cdots = \frac{3/10}{1 - 1/10} = \frac13$.

> [!TEOREMA] **($p$-série)** $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n^p}$ converge se $p > 1$ e diverge se $p \le 1$. Com $p = 1$, é a **série harmônica**, que diverge.

> [!INTUIÇÃO] A harmônica diverge, mas muito devagar: a soma dos primeiros 1 milhão de termos é só cerca de $14{,}4$. Agrupando, $\frac13 + \frac14 > \frac12$, $\frac15 + \cdots + \frac18 > \frac12$, e assim por diante: infinitos blocos maiores que $\frac12$.

## 3. Os testes

**Teste do termo geral (da divergência).** Se $a_n \not\to 0$, a série **diverge**.

> [!ATENÇÃO] O contrário é falso. $a_n \to 0$ **não** garante convergência (a harmônica é o contraexemplo). O teste só serve para mostrar divergência.

**Teste da integral.** Se $a_n = f(n)$ com $f$ positiva, contínua e decrescente, $\sum a_n$ e $\int_1^\infty f(x)\,dx$ convergem ou divergem juntas. (É daí que vem o resultado da $p$-série.)

**Comparação.** Com termos positivos e $a_n \le b_n$: se $\sum b_n$ converge, $\sum a_n$ converge; se $\sum a_n$ diverge, $\sum b_n$ diverge.

**Comparação no limite.** Se $\displaystyle\lim \frac{a_n}{b_n} = c$, com $0 < c < \infty$, as duas séries têm o mesmo comportamento. Ex.: $\sum \frac{n + 1}{n^3 + 2}$ se comporta como $\sum \frac{1}{n^2}$: converge.

**Teste da razão.** Seja $L = \displaystyle\lim \left|\frac{a_{n+1}}{a_n}\right|$. Se $L < 1$, converge (absolutamente); se $L > 1$, diverge; se $L = 1$, **inconclusivo**.

**Exemplo.** $\sum \frac{2^n}{n!}$: $\frac{a_{n+1}}{a_n} = \frac{2}{n + 1} \to 0 < 1$. Converge.

**Teste da raiz.** $L = \lim \sqrt[n]{|a_n|}$, com as mesmas conclusões da razão. Ótimo quando há potências $n$-ésimas: $\sum \left(\frac{n}{2n + 1}\right)^n$ tem $L = \frac12$, converge.

**Séries alternadas (Leibniz).** Se $b_n$ é decrescente e $b_n \to 0$, então $\sum (-1)^n b_n$ converge. Ex.: $1 - \frac12 + \frac13 - \frac14 + \cdots = \ln 2$.

> [!DEFINIÇÃO] $\sum a_n$ converge **absolutamente** se $\sum |a_n|$ converge, e **condicionalmente** se converge mas $\sum |a_n|$ diverge. A harmônica alternada é condicionalmente convergente. Convergência absoluta implica convergência.

## 4. Roteiro

1. $a_n \not\to 0$? **Diverge.**
2. Geométrica ou $p$-série? Resposta direta.
3. Termos positivos parecidos com uma conhecida? **Comparação** (de preferência no limite).
4. Fatoriais ou exponenciais? **Razão**.
5. Potência $n$-ésima inteira? **Raiz**.
6. Sinais alternados? **Leibniz** (e verifique absoluta).
7. $f(n)$ fácil de integrar? **Integral**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\sum_{n=0}^\infty \left(\frac{2}{3}\right)^n$ vale:
- $\frac23$
+ $3$
- $2$
- diverge
> Geométrica: $\frac{1}{1 - 2/3}$.

? A série harmônica $\sum \frac1n$:
- converge para $\ln 2$
+ diverge
- converge para $1$
- converge para $\frac{\pi^2}{6}$
> $p$-série com $p = 1$.

? Se $a_n \to 0$, então $\sum a_n$:
- converge sempre
- diverge sempre
+ pode convergir ou divergir
- vale zero
> O teste do termo geral é inconclusivo nesse caso.

? Para $\sum \frac{n^2}{3^n}$, o teste mais natural é:
- termo geral
+ razão
- Leibniz
- integral de $\frac{1}{x}$
> Exponencial no denominador; $L = \frac13$.

? $\sum \frac{(-1)^n}{n}$ converge:
- absolutamente
+ condicionalmente
- não converge
- para zero
> Leibniz garante convergência, mas $\sum \frac1n$ diverge.
```

## 5. Exercícios

**1.** Calcule $\displaystyle\sum_{n=1}^\infty \frac{3}{4^n}$.

<details>
<summary>Ver solução</summary>

Geométrica com primeiro termo $\frac34$ e razão $\frac14$: $\frac{3/4}{3/4} = 1$.

</details>

**2.** Decida: $\displaystyle\sum \frac{n}{n + 1}$.

<details>
<summary>Ver solução</summary>

$a_n \to 1 \neq 0$: diverge.

</details>

**3.** Decida: $\displaystyle\sum \frac{1}{n^2 + n}$ e calcule a soma.

<details>
<summary>Ver solução</summary>

Converge (compare com $\frac{1}{n^2}$). Telescópica: $\frac{1}{n} - \frac{1}{n + 1}$, soma $1$.

</details>

**4.** Decida: $\displaystyle\sum \frac{n!}{n^n}$.

<details>
<summary>Ver solução</summary>

Razão: $\frac{a_{n+1}}{a_n} = \left(\frac{n}{n + 1}\right)^n \to \frac1e < 1$. Converge.

</details>

**5.** Decida: $\displaystyle\sum \frac{1}{\sqrt{n}\,(n + 1)}$.

<details>
<summary>Ver solução</summary>

Parece $\frac{1}{n^{3/2}}$, $p = \frac32 > 1$: converge.

</details>
