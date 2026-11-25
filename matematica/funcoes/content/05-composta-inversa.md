# Função composta e função inversa

Composição é "encadear máquinas": a saída de uma vira a entrada da outra. É a base da **regra da cadeia**. A inversa é "desfazer a máquina", e é por ela que nascem o logaritmo e as funções trigonométricas inversas.

> [!INTUIÇÃO] No [simulador de composição e inversa](#/lab/inversa), veja o gráfico de $f^{-1}$ surgir como o reflexo de $f$ na reta $y = x$, e o que acontece quando $f$ não é injetora.

## 1. Função composta

> [!DEFINIÇÃO] A **composta** de $f$ com $g$ é $(f \circ g)(x) = f\big(g(x)\big)$: primeiro aplica $g$, depois $f$.

**Exemplo.** Com $f(x) = x^2$ e $g(x) = x + 3$:

$$(f \circ g)(x) = f(x + 3) = (x + 3)^2 \qquad (g \circ f)(x) = g(x^2) = x^2 + 3$$

> [!ATENÇÃO] Em geral $f \circ g \neq g \circ f$. A ordem se lê **da direita para a esquerda**: em $f \circ g$, quem age primeiro é $g$.

**Domínio da composta:** $x$ precisa estar no domínio de $g$ **e** $g(x)$ precisa estar no domínio de $f$.

**Exemplo.** $f(x) = \sqrt{x}$ e $g(x) = 1 - x$: $(f \circ g)(x) = \sqrt{1 - x}$ exige $1 - x \ge 0$, isto é, $x \le 1$.

### Decompor (o que o Cálculo pede)

Para usar a regra da cadeia, você precisa enxergar uma função como composta. Exemplos:

| $h(x)$ | "de fora" $f(u)$ | "de dentro" $u = g(x)$ |
|---|---|---|
| $(3x + 1)^5$ | $u^5$ | $3x + 1$ |
| $\sin(x^2)$ | $\sin u$ | $x^2$ |
| $e^{-x^2}$ | $e^u$ | $-x^2$ |
| $\sqrt{\ln x}$ | $\sqrt{u}$ | $\ln x$ |

## 2. Injetora, sobrejetora e bijetora

- **Injetora:** entradas diferentes dão saídas diferentes ($x_1 \neq x_2 \Rightarrow f(x_1) \neq f(x_2)$). No gráfico: **teste da reta horizontal**, que deve cortar o gráfico no máximo uma vez.
- **Sobrejetora:** a imagem é todo o contradomínio.
- **Bijetora:** injetora e sobrejetora.

**Exemplo.** $f(x) = x^2$ em $\mathbb{R}$ não é injetora, porque $f(-2) = f(2)$. Restrita a $[0, +\infty)$, é injetora. Funções estritamente crescentes ou decrescentes são sempre injetoras.

## 3. Função inversa

> [!DEFINIÇÃO] Se $f: A \to B$ é bijetora, sua **inversa** $f^{-1}: B \to A$ é a função tal que $$f^{-1}(y) = x \iff f(x) = y.$$ Vale $f^{-1}(f(x)) = x$ e $f(f^{-1}(y)) = y$.

> [!ATENÇÃO] $f^{-1}(x)$ **não** é $\dfrac{1}{f(x)}$. O expoente $-1$ aqui indica a inversa da composição, não o inverso multiplicativo.

### Como calcular

1. Escreva $y = f(x)$.
2. Isole $x$ em função de $y$.
3. Troque os nomes: $f^{-1}(x) = \ldots$

**Exemplo.** $f(x) = 2x + 3$: $y = 2x + 3 \Rightarrow x = \frac{y - 3}{2}$, logo $f^{-1}(x) = \frac{x - 3}{2}$.

**Exemplo.** $f(x) = \frac{x + 1}{x - 2}$, $x \neq 2$: $y(x - 2) = x + 1 \Rightarrow x(y - 1) = 2y + 1 \Rightarrow f^{-1}(x) = \frac{2x + 1}{x - 1}$, $x \neq 1$.

### Gráfico

> [!TEOREMA] O gráfico de $f^{-1}$ é o **reflexo** do gráfico de $f$ na reta $y = x$. O domínio de $f^{-1}$ é a imagem de $f$, e a imagem de $f^{-1}$ é o domínio de $f$.

Pares famosos: $e^x$ e $\ln x$; $x^2$ (com $x \ge 0$) e $\sqrt{x}$; $\sin x$ (com $-\frac{\pi}{2} \le x \le \frac{\pi}{2}$) e $\arcsin x$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Com $f(x) = 2x$ e $g(x) = x + 1$, quanto vale $(f \circ g)(3)$?
- $7$
+ $8$
- $6$
- $9$
> $g(3) = 4$ e $f(4) = 8$. Já $(g \circ f)(3) = 7$.

? Se $h(x) = \sqrt{x^2 + 1}$ é escrita como $f(g(x))$, uma escolha correta é:
+ $f(u) = \sqrt{u}$ e $g(x) = x^2 + 1$
- $f(u) = u^2 + 1$ e $g(x) = \sqrt{x}$
- $f(u) = \sqrt{u} + 1$ e $g(x) = x^2$
- $f(u) = u + 1$ e $g(x) = x^2$
> A raiz é a função "de fora"; o radicando é a "de dentro". A terceira opção dá $|x| + 1$.

? A inversa de $f(x) = \dfrac{x - 5}{3}$ é:
+ $f^{-1}(x) = 3x + 5$
- $f^{-1}(x) = \dfrac{3}{x - 5}$
- $f^{-1}(x) = 3x - 5$
- $f^{-1}(x) = \dfrac{x + 5}{3}$
> $y = \frac{x-5}{3} \Rightarrow x = 3y + 5$.

? Qual função é injetora em $\mathbb{R}$?
- $f(x) = x^2$
- $f(x) = |x|$
+ $f(x) = x^3$
- $f(x) = \cos x$
> $x^3$ é estritamente crescente; as outras repetem valores.

? Se $f$ é bijetora e $f(2) = 7$, então:
- $f^{-1}(2) = 7$
+ $f^{-1}(7) = 2$
- $f^{-1}(7) = \frac17$
- $f(7) = 2$
> A inversa troca entrada e saída.
```

## 4. Exercícios

**1.** Com $f(x) = x^2 - 1$ e $g(x) = 2x + 3$, calcule $f \circ g$ e $g \circ f$.

<details>
<summary>Ver solução</summary>

$(f \circ g)(x) = (2x + 3)^2 - 1 = 4x^2 + 12x + 8$. $(g \circ f)(x) = 2(x^2 - 1) + 3 = 2x^2 + 1$.

</details>

**2.** Determine o domínio de $f \circ g$ para $f(x) = \ln x$ e $g(x) = x^2 - 4$.

<details>
<summary>Ver solução</summary>

$\ln(x^2 - 4)$ exige $x^2 - 4 > 0$: $D = (-\infty, -2) \cup (2, +\infty)$.

</details>

**3.** Encontre a inversa de $f(x) = e^{2x} + 1$ e dê seu domínio.

<details>
<summary>Ver solução</summary>

$y - 1 = e^{2x} \Rightarrow x = \frac12\ln(y - 1)$. $f^{-1}(x) = \frac12\ln(x - 1)$, com domínio $(1, +\infty)$, que é a imagem de $f$.

</details>

**4.** Restrinja $f(x) = (x - 2)^2$ a um domínio em que seja injetora e calcule a inversa.

<details>
<summary>Ver solução</summary>

Em $[2, +\infty)$, $y = (x - 2)^2 \Rightarrow x = 2 + \sqrt{y}$. Logo $f^{-1}(x) = 2 + \sqrt{x}$, com $x \ge 0$.

</details>
