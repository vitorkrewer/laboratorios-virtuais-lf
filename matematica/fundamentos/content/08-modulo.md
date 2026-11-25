# Módulo (valor absoluto)

O módulo mede **distância**. Ele aparece em equações e inequações, na definição de limite ($|x - a| < \delta$) e em funções definidas por partes. Quem domina a interpretação geométrica resolve quase tudo de cabeça.

## 1. Definição

> [!DEFINIÇÃO] $$|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}$$

Assim, $|5| = 5$, $|-5| = 5$ e $|0| = 0$. O módulo nunca é negativo.

> [!ATENÇÃO] "$|x| = -x$" não está errado: vale exatamente quando $x \le 0$. Por exemplo, $|-3| = -(-3) = 3$.

Uma identidade útil: $\sqrt{x^2} = |x|$, e **não** $x$. Por exemplo, $\sqrt{(-4)^2} = \sqrt{16} = 4 = |-4|$.

## 2. Interpretação geométrica

> [!INTUIÇÃO] $|x|$ é a distância de $x$ até $0$ na reta. Mais geralmente, $|x - a|$ é a **distância entre $x$ e $a$**.

Isso transforma problemas algébricos em perguntas geométricas:

| Expressão | Significado | Solução |
|---|---|---|
| $\lvert x - 3\rvert = 2$ | pontos a distância $2$ de $3$ | $x = 1$ ou $x = 5$ |
| $\lvert x - 3\rvert < 2$ | pontos a menos de $2$ de $3$ | $(1, 5)$ |
| $\lvert x - 3\rvert \ge 2$ | pontos a pelo menos $2$ de $3$ | $(-\infty, 1] \cup [5, +\infty)$ |
| $\lvert x + 1\rvert \le 4$ | a no máximo $4$ de $-1$ | $[-5, 3]$ |

> [!DICA] $|x + 1| = |x - (-1)|$: o centro é $-1$. Sinal de "mais" dentro do módulo significa centro **negativo**.

## 3. Propriedades

$$|ab| = |a|\,|b| \qquad \left|\frac{a}{b}\right| = \frac{|a|}{|b|} \qquad |a|^2 = a^2$$

> [!TEOREMA] **(Desigualdade triangular)** $|a + b| \le |a| + |b|$.

> [!ATENÇÃO] Em geral $|a + b| \neq |a| + |b|$. Exemplo: $|3 + (-3)| = 0$, mas $|3| + |-3| = 6$.

## 4. Equações modulares

Para $r \ge 0$: $\ |u| = r \iff u = r \ \text{ou}\ u = -r$. Se $r < 0$, não há solução.

**Exemplo.** $|2x - 1| = 5 \Rightarrow 2x - 1 = 5$ ou $2x - 1 = -5$, logo $x = 3$ ou $x = -2$.

**Exemplo.** $|x - 2| = |2x + 1| \Rightarrow x - 2 = 2x + 1$ ou $x - 2 = -(2x + 1)$, logo $x = -3$ ou $x = \frac13$.

**Exemplo (com $x$ fora do módulo).** $|x - 1| = 2x$. Aqui $2x$ precisa ser $\ge 0$, então $x \ge 0$. Casos: $x - 1 = 2x \Rightarrow x = -1$ (descartado, pois $x \ge 0$ falha) ou $x - 1 = -2x \Rightarrow x = \frac13$ (válido). Solução: $x = \frac13$.

> [!DICA] Quando há $x$ fora do módulo, **sempre teste as soluções** na equação original.

## 5. Inequações modulares

Para $r > 0$:

> [!TEOREMA] $$|u| < r \iff -r < u < r \qquad\qquad |u| > r \iff u < -r \ \text{ ou }\ u > r$$

Menor que vira inequação dupla (interseção, **"e"**); maior que vira duas inequações (união, **"ou"**). O mesmo vale com $\le$ e $\ge$.

**Exemplo.** $|2x - 3| \le 5 \Rightarrow -5 \le 2x - 3 \le 5 \Rightarrow -2 \le 2x \le 8 \Rightarrow -1 \le x \le 4$. Solução: $[-1, 4]$.

**Exemplo.** $|x + 2| > 3 \Rightarrow x + 2 < -3$ ou $x + 2 > 3$, logo $x < -5$ ou $x > 1$. Solução: $(-\infty, -5) \cup (1, +\infty)$.

Casos degenerados: $|u| < 0$ não tem solução; $|u| \ge 0$ vale sempre; $|u| > -2$ vale sempre.

## 6. Ponte com o Cálculo

A definição de limite usa $0 < |x - a| < \delta$: "$x$ está a menos de $\delta$ de $a$, mas $x \ne a$". Em intervalos, isso é $(a - \delta, a) \cup (a, a + \delta)$. A condição $|f(x) - L| < \varepsilon$ diz que $f(x) \in (L - \varepsilon, L + \varepsilon)$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Quanto vale $\sqrt{(-7)^2}$?
- $-7$
+ $7$
- $\pm 7$
- $49$
> $\sqrt{x^2} = |x|$, e a raiz quadrada é sempre não negativa.

? As soluções de $|x - 4| = 3$ são:
+ $x = 1$ e $x = 7$
- $x = -1$ e $x = 7$
- $x = 7$ apenas
- $x = 4$ e $x = 3$
> Pontos a distância $3$ de $4$.

? A solução de $|x + 1| < 2$ é:
- $(-1, 3)$
+ $(-3, 1)$
- $(-\infty, -3) \cup (1, +\infty)$
- $(-2, 2)$
> Centro $-1$ e raio $2$: de $-3$ a $1$, aberto.

? A solução de $|2x| \ge 6$ é:
- $[-3, 3]$
- $[3, +\infty)$
+ $(-\infty, -3] \cup [3, +\infty)$
- $(-\infty, -6] \cup [6, +\infty)$
> $|x| \ge 3$: maior ou igual vira união.

? Para quais $x$ vale $|x| = -x$?
- Nenhum
- Só $x = 0$
+ $x \le 0$
- $x \ge 0$
> Pela definição, $|x| = -x$ quando $x$ não é positivo.
```

## 7. Exercícios

**1.** Resolva $|3x + 2| = 7$.

<details>
<summary>Ver solução</summary>

$3x + 2 = 7 \Rightarrow x = \frac53$, ou $3x + 2 = -7 \Rightarrow x = -3$.

</details>

**2.** Resolva $|x - 5| \le 0{,}1$ e interprete.

<details>
<summary>Ver solução</summary>

$4{,}9 \le x \le 5{,}1$: os números que distam no máximo $0{,}1$ de $5$. Solução: $[4{,}9;\ 5{,}1]$.

</details>

**3.** Resolva $|1 - 2x| > 5$.

<details>
<summary>Ver solução</summary>

$1 - 2x < -5 \Rightarrow x > 3$, ou $1 - 2x > 5 \Rightarrow x < -2$. Solução: $(-\infty, -2) \cup (3, +\infty)$.

</details>

**4.** Escreva $f(x) = |x - 2| + |x + 1|$ sem módulo, por partes.

<details>
<summary>Ver solução</summary>

Pontos críticos $-1$ e $2$.

- $x < -1$: $-(x-2) - (x+1) = -2x + 1$.
- $-1 \le x < 2$: $-(x-2) + (x+1) = 3$.
- $x \ge 2$: $(x-2) + (x+1) = 2x - 1$.

</details>

**5.** Resolva $1 < |x - 3| \le 4$.

<details>
<summary>Ver solução</summary>

$|x - 3| \le 4$ dá $[-1, 7]$; $|x - 3| > 1$ dá $(-\infty, 2) \cup (4, +\infty)$. Interseção: $[-1, 2) \cup (4, 7]$.

</details>
