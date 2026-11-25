# Inequações

Resolver uma inequação é encontrar **todos** os valores de $x$ que a tornam verdadeira. A resposta é um conjunto, normalmente escrito como intervalo ou união de intervalos. No Cálculo, você fará isso para descobrir domínios, onde uma função cresce ($f' > 0$) e onde é côncava para cima ($f'' > 0$).

> [!INTUIÇÃO] Resolver $f(x) > 0$ é perguntar **onde o gráfico de $f$ está acima do eixo $x$**. Abra o [simulador de inequações](#/lab/inequacoes), digite qualquer $f(x)$ e veja o gráfico e a solução na reta ao mesmo tempo.

## 1. Inequações do 1º grau

Isole $x$ usando as regras de desigualdade. Lembre: multiplicar ou dividir por número **negativo** inverte o sentido.

**Exemplo.** $3 - 2x \ge 7 \Rightarrow -2x \ge 4 \Rightarrow x \le -2$. Solução: $(-\infty, -2]$.

**Exemplo (dupla).** $-1 < 2x + 3 \le 9 \Rightarrow -4 < 2x \le 6 \Rightarrow -2 < x \le 3$. Solução: $(-2, 3]$.

## 2. Inequações do 2º grau

Para $ax^2 + bx + c > 0$ (ou $<$, $\ge$, $\le$):

1. Ache as raízes de $ax^2 + bx + c = 0$.
2. Esboce a parábola: concavidade para cima se $a > 0$, para baixo se $a < 0$.
3. Leia onde ela está acima ou abaixo do eixo.

> [!TEOREMA] Se $a > 0$ e as raízes são $x_1 < x_2$, então $ax^2+bx+c$ é **negativo entre as raízes** e **positivo fora delas**. Se $a < 0$, é o contrário.

**Exemplo.** $x^2 - 5x + 6 < 0$. Raízes $2$ e $3$, $a = 1 > 0$: negativo entre as raízes. Solução: $(2, 3)$.

**Exemplo.** $-x^2 + 4 \le 0$. Raízes $\pm 2$, $a = -1 < 0$: a parábola é negativa fora das raízes. Com o "igual", as raízes entram. Solução: $(-\infty, -2] \cup [2, +\infty)$.

**Sem raízes reais ($\Delta < 0$):** o trinômio tem **sempre o sinal de $a$**. Assim, $x^2 + x + 1 > 0$ vale para todo $x \in \mathbb{R}$, e $x^2 + x + 1 < 0$ não tem solução ($S = \varnothing$).

> [!ATENÇÃO] Nunca "tire a raiz" dos dois lados: de $x^2 > 9$ **não** segue $x > 3$. A solução correta é $x < -3$ ou $x > 3$.

## 3. Inequações produto e quociente: o quadro de sinais

Para $\dfrac{(x - 1)(x + 2)}{x - 4} \ge 0$:

1. Ache os pontos críticos: zeros do numerador ($1$ e $-2$) e do denominador ($4$).
2. Monte o **quadro de sinais**, estudando cada fator em cada intervalo.

| Intervalo | $x - 1$ | $x + 2$ | $x - 4$ | Quociente |
|---|---|---|---|---|
| $x < -2$ | $-$ | $-$ | $-$ | $-$ |
| $-2 < x < 1$ | $-$ | $+$ | $-$ | $+$ |
| $1 < x < 4$ | $+$ | $+$ | $-$ | $-$ |
| $x > 4$ | $+$ | $+$ | $+$ | $+$ |

3. Selecione onde o quociente é $\ge 0$ e decida os extremos: os zeros do **numerador entram** (o quociente vale $0$); os zeros do **denominador nunca entram** (divisão por zero).

Solução: $[-2, 1] \cup (4, +\infty)$.

> [!ATENÇÃO] Não multiplique os dois lados por uma expressão com $x$ (como o denominador) sem saber seu sinal. Em $\frac{1}{x} < 2$, multiplicar por $x$ só é válido se $x > 0$. O quadro de sinais evita esse erro: passe tudo para um lado ($\frac{1}{x} - 2 < 0$, ou seja, $\frac{1 - 2x}{x} < 0$) e estude o sinal.

## 4. Roteiro geral

1. Passe **tudo para um lado**, deixando apenas $0$ do outro lado da desigualdade.
2. Fatore o máximo possível.
3. Encontre os pontos críticos (zeros e pontos fora do domínio).
4. Estude o sinal em cada intervalo (quadro de sinais ou teste de um valor).
5. Escreva a solução, cuidando dos extremos.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A solução de $5 - 3x > 11$ é:
+ $(-\infty, -2)$
- $(-2, +\infty)$
- $(-\infty, 2)$
- $(2, +\infty)$
> $-3x > 6 \Rightarrow x < -2$ (o sentido inverte).

? A solução de $x^2 - 4x < 0$ é:
- $(-\infty, 0) \cup (4, +\infty)$
+ $(0, 4)$
- $[0, 4]$
- $(-4, 0)$
> $x(x-4) < 0$: raízes $0$ e $4$; com $a>0$, negativo entre as raízes.

? A solução de $x^2 \ge 9$ é:
- $[3, +\infty)$
- $[-3, 3]$
+ $(-\infty, -3] \cup [3, +\infty)$
- $(-\infty, 3]$
> $x^2 - 9 \ge 0$ fora das raízes $\pm3$, que entram por causa do "igual".

? A inequação $x^2 + 2x + 5 < 0$:
+ não tem solução real
- vale para todo $x$
- tem solução $(-5, 1)$
- tem solução $(-\infty, -1)$
> $\Delta = 4 - 20 < 0$ e $a > 0$: o trinômio é sempre positivo.

? Na solução de $\dfrac{x + 1}{x - 2} \le 0$, o que acontece com $x = -1$ e $x = 2$?
- Os dois entram
+ $-1$ entra e $2$ não entra
- $2$ entra e $-1$ não entra
- Nenhum dos dois entra
> Zero do numerador anula a fração (entra com $\le$); zero do denominador nunca entra. Solução: $[-1, 2)$.
```

## 5. Exercícios

**1.** Resolva $\dfrac{x}{2} - 1 \le \dfrac{2x + 1}{3}$.

<details>
<summary>Ver solução</summary>

Multiplicando por $6$ (positivo): $3x - 6 \le 4x + 2 \Rightarrow -x \le 8 \Rightarrow x \ge -8$. Solução: $[-8, +\infty)$.

</details>

**2.** Resolva $2x^2 - x - 1 \ge 0$.

<details>
<summary>Ver solução</summary>

Raízes: $x = \frac{1 \pm 3}{4}$, isto é, $1$ e $-\frac12$. Com $a > 0$, é não negativo fora das raízes: $(-\infty, -\frac12] \cup [1, +\infty)$.

</details>

**3.** Resolva $\dfrac{x - 3}{x + 1} > 0$.

<details>
<summary>Ver solução</summary>

Pontos críticos $-1$ e $3$. Positivo para $x < -1$ e para $x > 3$. Solução: $(-\infty, -1) \cup (3, +\infty)$.

</details>

**4.** Resolva $\dfrac{1}{x} < 2$.

<details>
<summary>Ver solução</summary>

$\frac{1}{x} - 2 < 0 \Rightarrow \frac{1 - 2x}{x} < 0$. Pontos críticos $0$ e $\frac12$. O quociente é negativo para $x < 0$ e para $x > \frac12$. Solução: $(-\infty, 0) \cup (\frac12, +\infty)$.

</details>

**5.** Encontre o domínio de $f(x) = \sqrt{\dfrac{x + 2}{3 - x}}$.

<details>
<summary>Ver solução</summary>

Precisamos de $\frac{x+2}{3-x} \ge 0$ com $x \ne 3$. Quadro de sinais: positivo em $(-2, 3)$, zero em $x = -2$. Domínio: $[-2, 3)$.

</details>
