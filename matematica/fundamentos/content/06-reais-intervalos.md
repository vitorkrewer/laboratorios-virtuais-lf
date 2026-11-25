# Números reais e intervalos

No Cálculo, quase toda resposta é um **intervalo**: o domínio de uma função, onde ela cresce, onde é positiva, onde uma série converge. Este capítulo ensina a escrever, desenhar e operar com intervalos.

## 1. A reta real

Os números reais correspondem, um a um, aos pontos de uma reta orientada. Dizemos $a < b$ quando $a$ está à esquerda de $b$.

### Regras de desigualdade

Para $a, b, c$ reais:

1. Se $a < b$, então $a + c < b + c$.
2. Se $a < b$ e $c > 0$, então $ac < bc$.
3. Se $a < b$ e $c < 0$, então $ac > bc$ (**o sentido inverte**).
4. Se $0 < a < b$, então $\dfrac{1}{a} > \dfrac{1}{b}$.

> [!ATENÇÃO] A regra 3 é a fonte do erro mais comum em inequações. De $-2x < 6$ segue $x > -3$, e não $x < -3$.

## 2. Intervalos

Para $a < b$:

| Notação | Desigualdade | Nome | Na reta |
|---|---|---|---|
| $[a, b]$ | $a \le x \le b$ | fechado | bolinhas cheias nos extremos |
| $(a, b)$ ou $]a, b[$ | $a < x < b$ | aberto | bolinhas vazias |
| $[a, b)$ | $a \le x < b$ | semiaberto à direita | cheia em $a$, vazia em $b$ |
| $(a, b]$ | $a < x \le b$ | semiaberto à esquerda | vazia em $a$, cheia em $b$ |
| $[a, +\infty)$ | $x \ge a$ | infinito | cheia em $a$, seta para a direita |
| $(-\infty, b)$ | $x < b$ | infinito | vazia em $b$, seta para a esquerda |
| $(-\infty, +\infty)$ | todo $x$ | a reta | $\mathbb{R}$ |

> [!ATENÇÃO] $\pm\infty$ **não é número**. Por isso o lado do infinito é **sempre aberto**: $[2, +\infty)$, nunca $[2, +\infty]$.

Os colchetes invertidos $]a, b[$ significam o mesmo que $(a, b)$ e são comuns em livros brasileiros.

## 3. Operações com intervalos

Intervalos são conjuntos, então se aplicam união, interseção e diferença. O método mais seguro é **desenhar os intervalos em retas paralelas** e ler o resultado. Use o [simulador de intervalos](#/lab/intervalos) para conferir.

**Exemplo.** Com $A = [-1, 3)$ e $B = (1, 5]$:

- $A \cap B = (1, 3)$: só o trecho comum. O $1$ fica de fora (não está em $B$) e o $3$ também (não está em $A$).
- $A \cup B = [-1, 5]$.
- $A - B = [-1, 1]$: o $1$ entra, porque está em $A$ e **não** está em $B$.
- $B - A = [3, 5]$.

> [!DICA] Nos extremos, pergunte ponto a ponto: "este número está em $A$? Está em $B$?". A resposta decide se a bolinha é cheia ou vazia no resultado.

## 4. Por que isso importa no Cálculo

- **Domínio:** $f(x) = \sqrt{x - 1} + \ln(5 - x)$ exige $x \ge 1$ **e** $x < 5$, ou seja, $D = [1, +\infty) \cap (-\infty, 5) = [1, 5)$.
- **Sistemas de inequações:** a solução é a **interseção** das soluções de cada inequação.
- **Inequações com "ou"** (como produtos e módulos): a solução é uma **união**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual intervalo representa $-2 < x \le 4$?
- $[-2, 4]$
+ $(-2, 4]$
- $[-2, 4)$
- $(-2, 4)$
> Estrita no $-2$ (aberto) e com igualdade no $4$ (fechado).

? Qual é a forma correta de escrever $x \ge 3$?
+ $[3, +\infty)$
- $[3, +\infty]$
- $(3, +\infty)$
- $(-\infty, 3]$
> O lado do infinito é sempre aberto e o $3$ entra.

? Com $A = [0, 5]$ e $B = (3, 8)$, $A \cap B$ é:
- $[0, 8)$
+ $(3, 5]$
- $[3, 5]$
- $(3, 5)$
> O $3$ não está em $B$; o $5$ está nos dois.

? Com $A = [0, 5]$ e $B = (3, 8)$, $A - B$ é:
- $[0, 3)$
+ $[0, 3]$
- $(0, 3]$
- $[5, 8)$
> O $3$ pertence a $A$ e não pertence a $B$, então fica no resultado.

? Resolvendo $-3x > 9$ obtemos:
- $x > -3$
+ $x < -3$
- $x > 3$
- $x < 3$
> Dividir por $-3$ inverte o sentido da desigualdade.
```

## 5. Exercícios

**1.** Escreva em notação de intervalo: (a) $x < 7$; (b) $-1 \le x < \frac12$; (c) $x \ge -\pi$.

<details>
<summary>Ver solução</summary>

(a) $(-\infty, 7)$; (b) $[-1, \frac12)$; (c) $[-\pi, +\infty)$.

</details>

**2.** Dados $A = (-\infty, 2]$ e $B = (-1, 6)$, calcule $A \cap B$, $A \cup B$, $A - B$ e $B - A$.

<details>
<summary>Ver solução</summary>

$A \cap B = (-1, 2]$; $A \cup B = (-\infty, 6)$; $A - B = (-\infty, -1]$; $B - A = (2, 6)$.

</details>

**3.** Determine o domínio de $f(x) = \dfrac{\sqrt{x + 2}}{x - 3}$ em notação de intervalo.

<details>
<summary>Ver solução</summary>

$x + 2 \ge 0$ e $x \ne 3$: $D = [-2, 3) \cup (3, +\infty)$.

</details>

**4.** Resolva o sistema $2x - 1 > 3$ e $x + 4 \le 10$.

<details>
<summary>Ver solução</summary>

$x > 2$ e $x \le 6$. A solução é a interseção: $(2, 6]$.

</details>
