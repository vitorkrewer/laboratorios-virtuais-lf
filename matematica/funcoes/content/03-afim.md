# Função afim

A função afim descreve tudo o que varia a **taxa constante**: tarifa de táxi, conversão de temperatura, depreciação linear. Ela também é o modelo da derivada: a reta tangente é uma função afim.

## 1. Definição e coeficientes

> [!DEFINIÇÃO] Uma **função afim** é $f(x) = ax + b$, com $a, b \in \mathbb{R}$. Seu gráfico é uma **reta**.

- $a$ é o **coeficiente angular** (inclinação): quanto $y$ varia quando $x$ aumenta $1$.
- $b$ é o **coeficiente linear**: o valor em $x = 0$, isto é, onde a reta corta o eixo $y$.

Casos particulares: com $b = 0$, $f(x) = ax$ é **linear** (passa pela origem); com $a = 0$, $f(x) = b$ é **constante** (reta horizontal).

## 2. Taxa de variação

> [!TEOREMA] Para quaisquer $x_1 \neq x_2$, $$a = \frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{\Delta y}{\Delta x}.$$

Na função afim, a taxa de variação é a **mesma em todo lugar**. No Cálculo, a derivada generaliza isso para curvas, em que a taxa muda de ponto a ponto.

- $a > 0$: crescente. $a < 0$: decrescente. $a = 0$: constante.

## 3. Reta por dois pontos

**Exemplo.** A reta por $(1, 3)$ e $(4, 9)$: $a = \frac{9 - 3}{4 - 1} = 2$. Usando $(1, 3)$: $3 = 2 \cdot 1 + b \Rightarrow b = 1$. Logo, $f(x) = 2x + 1$.

Forma ponto-inclinação, muito usada para a reta tangente:

$$y - y_0 = a\,(x - x_0)$$

## 4. Raiz e estudo de sinal

A **raiz** (zero) é a solução de $ax + b = 0$: $x = -\frac{b}{a}$ (para $a \neq 0$).

> [!DICA] O sinal de $ax + b$ é o **mesmo de $a$ à direita da raiz** e o **contrário à esquerda**. Esse é o bloco básico do quadro de sinais.

**Exemplo.** $f(x) = -3x + 6$: raiz $x = 2$; como $a < 0$, $f > 0$ para $x < 2$ e $f < 0$ para $x > 2$.

## 5. Retas paralelas e perpendiculares

- Paralelas: mesmo coeficiente angular, $a_1 = a_2$.
- Perpendiculares: $a_1 \cdot a_2 = -1$ (quando nenhuma é vertical).

## 6. Modelagem

**Exemplo.** Um táxi cobra R\$ 5,00 de bandeirada mais R\$ 2,50 por km. O preço é $P(x) = 2{,}5x + 5$. Uma corrida de $12$ km custa $P(12) = 35$ reais. O coeficiente $2{,}5$ é o custo **marginal** por km.

**Exemplo.** A conversão de Celsius para Fahrenheit é afim: $F = 1{,}8\,C + 32$. A água ferve a $100\,°C$, ou seja, $F = 212\,°F$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual é a inclinação da reta que passa por $(2, 1)$ e $(5, 10)$?
+ $3$
- $\frac13$
- $9$
- $-3$
> $\frac{10 - 1}{5 - 2} = \frac{9}{3} = 3$.

? A raiz de $f(x) = 4x - 10$ é:
- $-\frac52$
+ $\frac52$
- $10$
- $\frac25$
> $4x - 10 = 0 \Rightarrow x = \frac{10}{4}$.

? Onde $f(x) = -2x + 8$ é positiva?
+ $x < 4$
- $x > 4$
- $x > -4$
- Em todo $\mathbb{R}$
> Raiz $4$; com $a < 0$, a reta é positiva à esquerda da raiz.

? Qual reta é perpendicular a $y = 2x + 1$?
- $y = 2x - 3$
- $y = -2x + 1$
+ $y = -\frac12 x + 4$
- $y = \frac12 x$
> O produto das inclinações deve ser $-1$: $2 \cdot (-\frac12) = -1$.

? Um plano de celular custa R\$ 40 fixos mais R\$ 0,20 por minuto. Quanto custa um mês com $150$ minutos?
- R\$ 30
- R\$ 60
+ R\$ 70
- R\$ 190
> $P = 40 + 0{,}2 \cdot 150 = 70$.
```

## 7. Exercícios

**1.** Encontre a função afim com $f(-1) = 7$ e $f(3) = -1$.

<details>
<summary>Ver solução</summary>

$a = \frac{-1 - 7}{3 - (-1)} = -2$. Então $7 = -2(-1) + b \Rightarrow b = 5$. Logo, $f(x) = -2x + 5$.

</details>

**2.** Escreva a reta que passa por $(2, -3)$ e é paralela a $y = 4x - 1$.

<details>
<summary>Ver solução</summary>

Inclinação $4$: $y + 3 = 4(x - 2)$, isto é, $y = 4x - 11$.

</details>

**3.** Uma empresa tem custo $C(x) = 12x + 300$ e receita $R(x) = 18x$, com $x$ unidades. A partir de quantas unidades há lucro?

<details>
<summary>Ver solução</summary>

Lucro $L(x) = R - C = 6x - 300 > 0 \Rightarrow x > 50$. A partir de $51$ unidades.

</details>

**4.** Resolva $\dfrac{2x - 1}{3} \geq x - 2$ usando o sinal de uma função afim.

<details>
<summary>Ver solução</summary>

$2x - 1 \ge 3x - 6 \Rightarrow -x + 5 \ge 0 \Rightarrow x \le 5$. Solução: $(-\infty, 5]$.

</details>
