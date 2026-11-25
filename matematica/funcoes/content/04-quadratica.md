# Função quadrática

A parábola aparece em trajetórias de projéteis, em lucro máximo e área máxima, e é o primeiro exemplo de **otimização**, um dos temas que mais caem em Cálculo I. Aqui você aprende a resolver esses problemas sem derivadas, pelo vértice.

> [!INTUIÇÃO] No [simulador de afim e quadrática](#/lab/familias), mexa em $a$, $b$ e $c$ e veja o vértice, as raízes e o discriminante mudarem em tempo real.

## 1. Definição

> [!DEFINIÇÃO] Uma **função quadrática** é $f(x) = ax^2 + bx + c$, com $a \neq 0$. Seu gráfico é uma **parábola**.

- $a > 0$: concavidade para **cima** (tem ponto de mínimo).
- $a < 0$: concavidade para **baixo** (tem ponto de máximo).
- $c = f(0)$: onde a parábola corta o eixo $y$.

## 2. Raízes e discriminante

$$x = \frac{-b \pm \sqrt{\Delta}}{2a}, \qquad \Delta = b^2 - 4ac$$

| $\Delta$ | Raízes reais | Gráfico |
|---|---|---|
| $\Delta > 0$ | duas distintas | corta o eixo $x$ em dois pontos |
| $\Delta = 0$ | uma (dupla) | tangencia o eixo $x$ |
| $\Delta < 0$ | nenhuma | não toca o eixo $x$ |

Soma e produto das raízes: $x_1 + x_2 = -\frac{b}{a}$ e $x_1 x_2 = \frac{c}{a}$. Com raízes reais, vale a **forma fatorada** $f(x) = a(x - x_1)(x - x_2)$.

## 3. Vértice

> [!TEOREMA] O vértice da parábola é $$V = \left(x_v,\ y_v\right) = \left(-\frac{b}{2a},\ -\frac{\Delta}{4a}\right).$$

Na prática, calcule $x_v = -\frac{b}{2a}$ e depois $y_v = f(x_v)$ (é mais fácil e evita erro de sinal).

- O eixo de simetria é a reta $x = x_v$; ele fica exatamente no meio das raízes.
- Se $a > 0$, $y_v$ é o **valor mínimo** e a imagem é $[y_v, +\infty)$.
- Se $a < 0$, $y_v$ é o **valor máximo** e a imagem é $(-\infty, y_v]$.

**Exemplo.** $f(x) = x^2 - 6x + 5$: $x_v = 3$, $y_v = 9 - 18 + 5 = -4$. Mínimo $-4$ em $x = 3$; imagem $[-4, +\infty)$; raízes $1$ e $5$ (simétricas em torno de $3$).

## 4. Forma canônica (completar quadrado)

$$ax^2 + bx + c = a\,(x - x_v)^2 + y_v$$

**Exemplo.** $2x^2 + 8x + 3 = 2(x^2 + 4x) + 3 = 2\big[(x + 2)^2 - 4\big] + 3 = 2(x + 2)^2 - 5$. O vértice é $(-2, -5)$, e a parábola é $x^2$ transformada como no capítulo anterior.

Completar quadrado reaparece em integrais (como $\int \frac{dx}{x^2 + 4x + 8}$).

## 5. Estudo de sinal

Com $a > 0$ e raízes $x_1 < x_2$: $f < 0$ entre as raízes e $f > 0$ fora. Com $a < 0$, o contrário. Sem raízes reais, $f$ tem sempre o sinal de $a$. (Detalhes no capítulo de inequações do livro Fundamentos.)

## 6. Problemas de máximo e mínimo

**Exemplo (área).** Com $40$ m de tela, cerca-se um retângulo encostado em um muro (o muro dispensa tela em um lado). Qual é a maior área?

Lados $x$ (dois lados perpendiculares ao muro) e $40 - 2x$ (paralelo ao muro). Área $A(x) = x(40 - 2x) = -2x^2 + 40x$. Vértice: $x_v = -\frac{40}{2(-2)} = 10$. Área máxima $A(10) = 10 \cdot 20 = 200$ m².

**Exemplo (projétil).** Uma bola tem altura $h(t) = -5t^2 + 20t$ (metros, segundos). Altura máxima em $t_v = 2$ s: $h(2) = 20$ m. Ela volta ao chão quando $h(t) = 0$, em $t = 4$ s.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual é o vértice de $f(x) = x^2 - 4x + 1$?
+ $(2, -3)$
- $(-2, 13)$
- $(4, 1)$
- $(2, 1)$
> $x_v = \frac{4}{2} = 2$ e $f(2) = 4 - 8 + 1 = -3$.

? A parábola $y = -x^2 + 2x + 3$ tem:
+ concavidade para baixo e valor máximo $4$
- concavidade para cima e valor mínimo $4$
- concavidade para baixo e valor máximo $3$
- concavidade para cima e valor mínimo $-4$
> $a < 0$; $x_v = 1$ e $y_v = -1 + 2 + 3 = 4$.

? Para quais valores de $k$ a equação $x^2 + 4x + k = 0$ não tem raízes reais?
- $k < 4$
+ $k > 4$
- $k = 4$
- $k > -4$
> $\Delta = 16 - 4k < 0 \iff k > 4$.

? As raízes de $x^2 - 7x + 10$ têm soma e produto iguais a:
+ soma $7$ e produto $10$
- soma $-7$ e produto $10$
- soma $10$ e produto $7$
- soma $7$ e produto $-10$
> $-\frac{b}{a} = 7$ e $\frac{c}{a} = 10$ (as raízes são $2$ e $5$).

? Qual é a imagem de $f(x) = 2(x - 1)^2 + 3$?
- $\mathbb{R}$
- $[1, +\infty)$
+ $[3, +\infty)$
- $(-\infty, 3]$
> Vértice $(1, 3)$ com $a > 0$: mínimo $3$.
```

## 7. Exercícios

**1.** Escreva $f(x) = x^2 + 6x + 2$ na forma canônica e dê sua imagem.

<details>
<summary>Ver solução</summary>

$(x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$. Vértice $(-3, -7)$, imagem $[-7, +\infty)$.

</details>

**2.** Encontre a quadrática com raízes $-1$ e $3$ que passa por $(0, 6)$.

<details>
<summary>Ver solução</summary>

$f(x) = a(x + 1)(x - 3)$. Com $f(0) = -3a = 6$, temos $a = -2$: $f(x) = -2x^2 + 4x + 6$.

</details>

**3.** O lucro de uma loja é $L(p) = -2p^2 + 120p - 1000$, com preço $p$ em reais. Qual preço maximiza o lucro e qual é o lucro máximo?

<details>
<summary>Ver solução</summary>

$p_v = -\frac{120}{2(-2)} = 30$. $L(30) = -1800 + 3600 - 1000 = 800$ reais.

</details>

**4.** Dois números somam $20$. Qual é o maior produto possível entre eles?

<details>
<summary>Ver solução</summary>

$P(x) = x(20 - x) = -x^2 + 20x$; $x_v = 10$, $P = 100$.

</details>
