# Primitivas e substituição

Pelo Teorema Fundamental, calcular integrais exige **encontrar primitivas**. Este capítulo traz a tabela básica e a técnica que resolve a maioria das integrais de prova: a **substituição**.

## 1. Primitivas e integral indefinida

> [!DEFINIÇÃO] $F$ é uma **primitiva** de $f$ se $F' = f$. O conjunto de todas as primitivas é a **integral indefinida**:
> $$\int f(x)\,dx = F(x) + C,$$
> em que $C$ é uma constante arbitrária.

O $+C$ existe porque a derivada de uma constante é zero: $x^2$, $x^2 + 5$ e $x^2 - \pi$ têm todas derivada $2x$.

> [!ATENÇÃO] Em **integrais indefinidas**, esquecer o $+C$ custa ponto. Em **integrais definidas**, o $C$ cancela e não se escreve.

## 2. Tabela de primitivas

| $f(x)$ | $\displaystyle\int f(x)\,dx$ |
|---|---|
| $x^n \ (n \neq -1)$ | $\dfrac{x^{n+1}}{n+1} + C$ |
| $\dfrac1x$ | $\ln\lvert x\rvert + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |
| $\csc^2 x$ | $-\cot x + C$ |
| $\sec x\tan x$ | $\sec x + C$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x + C$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ |

A integral é linear: $\int (a f + b g) = a\int f + b\int g$.

**Exemplo.** Reescreva antes de integrar:

$$\int\left(3x^2 + \frac{2}{\sqrt{x}} - \frac{1}{x^2}\right)dx = \int\left(3x^2 + 2x^{-1/2} - x^{-2}\right)dx = x^3 + 4\sqrt{x} + \frac{1}{x} + C$$

> [!DICA] **Sempre confira derivando** o resultado. Se a derivada devolver o integrando, você acertou. Essa verificação leva 10 segundos.

## 3. Integração por substituição

É a regra da cadeia **ao contrário**. Se há uma função $g(x)$ e, multiplicando, sua derivada $g'(x)$ (a menos de constante), troque tudo por uma nova variável.

> [!TEOREMA] Com $u = g(x)$ e $du = g'(x)\,dx$:
> $$\int f\big(g(x)\big)\,g'(x)\,dx = \int f(u)\,du.$$

**Roteiro:**

1. Escolha $u$: geralmente o "miolo" de uma composta (dentro de parênteses, raiz, expoente, argumento de $\sin$ ou $\ln$).
2. Calcule $du = u'\,dx$ e **troque tudo** (inclusive o $dx$) por $u$ e $du$.
3. Integre em $u$.
4. **Volte** para $x$.

### Exemplos

**(a)** $\displaystyle\int 2x\,\cos(x^2)\,dx$. Com $u = x^2$, $du = 2x\,dx$: $\displaystyle\int\cos u\,du = \sin u + C = \sin(x^2) + C$.

**(b)** $\displaystyle\int \frac{x}{x^2 + 1}\,dx$. Com $u = x^2 + 1$, $du = 2x\,dx$, ou seja, $x\,dx = \tfrac12du$:

$$\frac12\int\frac{du}{u} = \frac12\ln|u| + C = \frac12\ln(x^2+1) + C$$

**(c)** $\displaystyle\int (3x+1)^5\,dx$. Com $u = 3x+1$, $du = 3\,dx$: $\dfrac13\displaystyle\int u^5du = \dfrac{u^6}{18} + C = \dfrac{(3x+1)^6}{18} + C$.

**(d)** $\displaystyle\int \tan x\,dx = \int\frac{\sin x}{\cos x}dx$. Com $u = \cos x$, $du = -\sin x\,dx$: $-\displaystyle\int\frac{du}{u} = -\ln|\cos x| + C$.

**(e)** $\displaystyle\int e^{\sqrt x}\frac{dx}{\sqrt x}$. Com $u = \sqrt{x}$, $du = \dfrac{dx}{2\sqrt x}$: $2\displaystyle\int e^u du = 2e^{\sqrt x} + C$.

## 4. Substituição em integral definida

Há dois caminhos equivalentes:

1. Integre em $u$, **volte** para $x$ e use os limites originais.
2. **Troque os limites** junto com a variável (mais limpo): se $x = a \Rightarrow u = g(a)$ e $x = b \Rightarrow u = g(b)$.

**Exemplo.** $\displaystyle\int_0^1 x\,e^{x^2}dx$. Com $u = x^2$, $du = 2x\,dx$; $x=0 \Rightarrow u=0$ e $x = 1 \Rightarrow u=1$:

$$\frac12\int_0^1 e^u du = \frac12\Big[e^u\Big]_0^1 = \frac{e - 1}{2}$$

> [!ATENÇÃO] Se você trocou para $u$ e **não** trocou os limites, **não** use os limites de $x$ com a expressão em $u$. Esse é o erro mais comum em integral definida.

## 5. Como escolher $u$

- Procure uma função cuja **derivada aparece** (ou quase) no integrando.
- Em $\dfrac{f'(x)}{f(x)}$, use $u = f(x)$, e o resultado é $\ln|f(x)|$.
- Em $e^{g(x)}g'(x)$, use $u = g(x)$.
- Em potências $(\ldots)^n$ de uma expressão cuja derivada sobra, use $u$ igual ao interior.
- Se faltar uma constante, ajuste. Se faltar uma **variável**, a substituição provavelmente não é a técnica certa.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\displaystyle\int x^3\,dx=$
+ $\frac{x^4}{4}+C$
- $3x^2+C$
- $x^4+C$
- $\frac{x^3}{3}+C$
> Some $1$ ao expoente e divida pelo novo expoente. Confira derivando.

? $\displaystyle\int \frac{1}{x}\,dx=$
+ $\ln|x|+C$
- $\frac{x^0}{0}+C$
- $-\frac{1}{x^2}+C$
- $\ln x$
> A regra da potência não vale para $n=-1$. E não esqueça o módulo e o $+C$.

? Em $\displaystyle\int 2x\cos\left(x^2\right)dx$, a substituição natural é:
+ $u=x^2$
- $u=\cos\left(x^2\right)$
- $u=2x$
- $u=\cos x$
> $u=x^2$ dá $du=2x\,dx$, que já está no integrando.

? $\displaystyle\int e^{3x}\,dx=$
- $e^{3x}+C$
+ $\frac{e^{3x}}{3}+C$
- $3e^{3x}+C$
- $\frac{e^{3x+1}}{3x+1}+C$
> Com $u=3x$, $dx=\frac{du}{3}$. Derivando $\frac{e^{3x}}{3}$ volta $e^{3x}$.

? $\displaystyle\int \frac{x}{x^2+4}\,dx=$
+ $\frac12\ln\left(x^2+4\right)+C$
- $\ln\left(x^2+4\right)+C$
- $\arctan\frac{x}{2}+C$
- $\frac{x^2}{2}\ln\left(x^2+4\right)+C$
> $u=x^2+4$, $du=2x\,dx$, então $x\,dx=\frac{du}{2}$.
```

## 6. Exercícios

**1.** $\displaystyle\int (4x^3 - 6x + 5)\,dx$.

<details>
<summary>Ver solução</summary>

$x^4 - 3x^2 + 5x + C$.

</details>

**2.** $\displaystyle\int \sin(5x)\,dx$.

<details>
<summary>Ver solução</summary>

Com $u = 5x$: $\dfrac15\displaystyle\int\sin u\,du = -\dfrac{\cos 5x}{5} + C$.

</details>

**3.** $\displaystyle\int \frac{\ln x}{x}\,dx$.

<details>
<summary>Ver solução</summary>

Com $u = \ln x$, $du = \dfrac{dx}{x}$: $\displaystyle\int u\,du = \dfrac{u^2}{2} + C = \dfrac{(\ln x)^2}{2} + C$.

</details>

**4.** $\displaystyle\int \frac{2x + 3}{x^2 + 3x + 1}\,dx$.

<details>
<summary>Ver solução</summary>

O numerador é a derivada do denominador. Logo, o resultado é $\ln\lvert x^2 + 3x + 1\rvert + C$.

</details>

**5.** $\displaystyle\int_0^{\pi/2}\sin x\cos^3 x\,dx$.

<details>
<summary>Ver solução</summary>

Com $u = \cos x$, $du = -\sin x\,dx$; $x=0\Rightarrow u=1$ e $x = \pi/2 \Rightarrow u = 0$:

$$-\int_1^0 u^3du = \int_0^1 u^3 du = \frac14.$$

</details>

**6.** $\displaystyle\int \frac{dx}{\sqrt{1 - 4x^2}}$.

<details>
<summary>Ver solução</summary>

Com $u = 2x$, $du = 2\,dx$: $\dfrac12\displaystyle\int\dfrac{du}{\sqrt{1-u^2}} = \dfrac12\arcsin(2x) + C$.

</details>
