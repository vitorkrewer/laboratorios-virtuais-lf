# Conceito de função

Função é a ideia central de toda a matemática aplicada: uma grandeza que **depende** de outra. A posição depende do tempo, o custo depende da quantidade produzida, a área depende do raio. Este capítulo fixa o vocabulário que você usará em todo o Cálculo.

## 1. Definição

> [!DEFINIÇÃO] Uma **função** $f$ de $A$ em $B$, escrita $f: A \to B$, é uma regra que associa a **cada** elemento $x \in A$ **um único** elemento $y = f(x) \in B$.

- $A$ é o **domínio** $D(f)$: as entradas permitidas.
- $B$ é o **contradomínio**: onde as saídas "moram".
- A **imagem** $\text{Im}(f) = \{f(x) \mid x \in A\}$ é o conjunto das saídas que **de fato** ocorrem. Sempre $\text{Im}(f) \subset B$.

**Exemplo.** $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$. Domínio $\mathbb{R}$, contradomínio $\mathbb{R}$, imagem $[0, +\infty)$: nenhum quadrado é negativo.

> [!INTUIÇÃO] Pense em uma máquina: você coloca $x$, ela devolve $f(x)$. A mesma entrada **sempre** dá a mesma saída. Duas entradas diferentes podem dar a mesma saída ($f(2) = f(-2) = 4$), mas uma entrada nunca dá duas saídas.

No livro Fundamentos, isso aparece como "relação em que cada elemento do domínio tem exatamente uma imagem".

## 2. Notação e cálculo de valores

Em $f(x) = 2x^2 - 3$, a letra $x$ é só um "lugar". Substitua o que estiver entre parênteses **inteiro**:

$$f(-1) = 2(-1)^2 - 3 = -1 \qquad f(a+1) = 2(a+1)^2 - 3 = 2a^2 + 4a - 1$$

> [!ATENÇÃO] $f(a + h) \neq f(a) + h$ e $f(2x) \neq 2f(x)$, em geral. Com $f(x) = x^2$: $f(a+h) = a^2 + 2ah + h^2$. Essa conta aparece na definição de derivada.

## 3. Domínio natural

Quando só a fórmula é dada, o domínio é o **maior subconjunto de $\mathbb{R}$** em que ela faz sentido. As restrições usuais:

| Expressão | Exige |
|---|---|
| $\dfrac{1}{g(x)}$ | $g(x) \neq 0$ |
| $\sqrt{g(x)}$ (índice par) | $g(x) \geq 0$ |
| $\ln g(x)$ | $g(x) > 0$ |

**Exemplo.** $f(x) = \dfrac{\sqrt{x+3}}{x-1}$ exige $x \geq -3$ e $x \neq 1$: $D(f) = [-3, 1) \cup (1, +\infty)$.

**Exemplo.** $g(x) = \ln(4 - x^2)$ exige $4 - x^2 > 0$, isto é, $-2 < x < 2$: $D(g) = (-2, 2)$.

As inequações do livro **Fundamentos** são exatamente a ferramenta para isso.

## 4. Gráfico

> [!DEFINIÇÃO] O **gráfico** de $f$ é o conjunto de pontos $\{(x, f(x)) \mid x \in D(f)\} \subset \mathbb{R}^2$.

Lendo o gráfico:

- o **domínio** é a "sombra" do gráfico no eixo $x$;
- a **imagem** é a "sombra" no eixo $y$;
- os **zeros** (raízes) são os pontos onde o gráfico toca o eixo $x$;
- $f(x) > 0$ onde o gráfico está acima do eixo.

> [!TEOREMA] **(Teste da reta vertical)** Uma curva no plano é gráfico de uma função de $x$ se, e somente se, nenhuma reta vertical a corta em mais de um ponto.

## 5. Funções definidas por partes

Uma função pode ter fórmulas diferentes em partes diferentes do domínio:

$$f(x) = \begin{cases} x + 2, & x < 0 \\ x^2, & x \geq 0 \end{cases}$$

Para calcular $f(a)$, primeiro descubra **em qual parte** $a$ está: $f(-3) = -1$ e $f(3) = 9$. O módulo é o exemplo mais famoso: $|x| = x$ para $x \ge 0$ e $-x$ para $x < 0$.

## 6. Crescimento, decrescimento e paridade

- $f$ é **crescente** em $I$ se $x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$ (o gráfico "sobe").
- $f$ é **decrescente** em $I$ se $x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$.
- $f$ é **par** se $f(-x) = f(x)$: gráfico simétrico em relação ao eixo $y$ (ex.: $x^2$, $\cos x$, $|x|$).
- $f$ é **ímpar** se $f(-x) = -f(x)$: simétrico em relação à origem (ex.: $x^3$, $\sin x$, $\frac1x$).

A maioria das funções não é par nem ímpar: $f(x) = x^2 + x$ dá $f(-1) = 0$ e $f(1) = 2$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual é a imagem de $f: \mathbb{R}\to\mathbb{R}$, $f(x) = x^2 + 1$?
- $\mathbb{R}$
- $[0, +\infty)$
+ $[1, +\infty)$
- $(1, +\infty)$
> $x^2 \ge 0$, então $x^2 + 1 \ge 1$, e o valor $1$ é atingido em $x = 0$.

? Qual é o domínio de $f(x) = \dfrac{1}{\sqrt{x - 2}}$?
- $[2, +\infty)$
+ $(2, +\infty)$
- $\mathbb{R} - \{2\}$
- $(-\infty, 2)$
> A raiz exige $x - 2 \ge 0$ e o denominador não pode ser zero, então $x - 2 > 0$.

? Se $f(x) = x^2 - x$, então $f(a + 1)$ é:
+ $a^2 + a$
- $a^2 - a + 1$
- $a^2 - a$
- $a^2 + 1$
> $(a+1)^2 - (a+1) = a^2 + 2a + 1 - a - 1 = a^2 + a$.

? Qual função é ímpar?
- $f(x) = x^2 + 1$
- $f(x) = |x|$
+ $f(x) = x^3 - x$
- $f(x) = x^3 + 1$
> $f(-x) = -x^3 + x = -(x^3 - x) = -f(x)$. A última tem o termo constante, que estraga a simetria.

? Com $f(x) = 2x$ para $x < 1$ e $f(x) = 5 - x$ para $x \ge 1$, quanto vale $f(1)$?
- $2$
+ $4$
- $5$
- Não está definida
> $1$ está na segunda parte ($x \ge 1$): $f(1) = 5 - 1 = 4$.
```

## 7. Exercícios

**1.** Determine o domínio de $f(x) = \sqrt{6 - 2x} + \dfrac{1}{x}$.

<details>
<summary>Ver solução</summary>

$6 - 2x \ge 0 \Rightarrow x \le 3$, e $x \ne 0$. Logo, $D = (-\infty, 0) \cup (0, 3]$.

</details>

**2.** Com $f(x) = x^2$, simplifique $\dfrac{f(x+h) - f(x)}{h}$ para $h \neq 0$.

<details>
<summary>Ver solução</summary>

$\dfrac{x^2 + 2xh + h^2 - x^2}{h} = \dfrac{h(2x + h)}{h} = 2x + h$. (É a conta da derivada de $x^2$.)

</details>

**3.** Verifique se $f(x) = \dfrac{x}{x^2 + 1}$ é par, ímpar ou nenhuma das duas.

<details>
<summary>Ver solução</summary>

$f(-x) = \dfrac{-x}{x^2 + 1} = -f(x)$. É ímpar.

</details>

**4.** Qual é a imagem de $f(x) = 3 - |x|$, com domínio $\mathbb{R}$?

<details>
<summary>Ver solução</summary>

$|x| \ge 0$, então $3 - |x| \le 3$, e qualquer valor $\le 3$ é atingido. $\text{Im}(f) = (-\infty, 3]$.

</details>
