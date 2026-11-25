# Função exponencial

A exponencial descreve crescimento e decaimento **proporcional ao que já existe**: juros compostos, populações, contágio, decaimento radioativo, resfriamento. A base $e$ é a "natural" do Cálculo, porque $(e^x)' = e^x$.

## 1. Definição

> [!DEFINIÇÃO] A **função exponencial** de base $a$ é $f(x) = a^x$, com $a > 0$ e $a \neq 1$.

As restrições existem porque com $a = 1$ a função é constante e com $a \le 0$ potências como $a^{1/2}$ não são reais.

## 2. Propriedades das potências

$$a^{x}a^{y} = a^{x+y} \qquad \frac{a^x}{a^y} = a^{x-y} \qquad (a^x)^y = a^{xy} \qquad a^{-x} = \frac{1}{a^x} \qquad a^0 = 1$$

## 3. Gráfico

| | $a > 1$ | $0 < a < 1$ |
|---|---|---|
| Comportamento | crescente | decrescente |
| $x \to +\infty$ | $a^x \to +\infty$ | $a^x \to 0$ |
| $x \to -\infty$ | $a^x \to 0$ | $a^x \to +\infty$ |

Em ambos os casos: domínio $\mathbb{R}$, imagem $(0, +\infty)$, o gráfico passa por $(0, 1)$ e a reta $y = 0$ é **assíntota horizontal**. Note que $\left(\frac12\right)^x = 2^{-x}$ é o reflexo de $2^x$ no eixo $y$.

> [!ATENÇÃO] $a^x > 0$ para todo $x$. Uma equação como $2^x = -4$ **não tem solução**.

## 4. O número $e$

$$e = \lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \approx 2{,}71828$$

Ele surge dos juros compostos capitalizados continuamente. A função $e^x$ (às vezes escrita $\exp x$) tem uma propriedade única: em cada ponto, sua taxa de crescimento é igual ao seu valor.

## 5. Equações exponenciais

**Mesma base:** como $a^x$ é injetora, $a^{u} = a^{v} \iff u = v$.

**Exemplo.** $4^{x+1} = 8^x \Rightarrow 2^{2x+2} = 2^{3x} \Rightarrow 2x + 2 = 3x \Rightarrow x = 2$.

**Mudança de variável.** $4^x - 6 \cdot 2^x + 8 = 0$: com $t = 2^x > 0$, vem $t^2 - 6t + 8 = 0$, logo $t = 2$ ou $t = 4$, e então $x = 1$ ou $x = 2$.

**Bases diferentes:** aplique logaritmo (próximo capítulo). Ex.: $3^x = 7 \Rightarrow x = \frac{\ln 7}{\ln 3}$.

### Inequações

Para $a > 1$, $a^u < a^v \iff u < v$ (o sentido se mantém). Para $0 < a < 1$, **o sentido inverte**.

**Exemplo.** $\left(\frac13\right)^{x} > 9 = \left(\frac13\right)^{-2} \Rightarrow x < -2$.

## 6. Modelos

Crescimento/decaimento: $Q(t) = Q_0\,e^{kt}$ ($k > 0$ cresce, $k < 0$ decai). Juros compostos: $M = C(1 + i)^t$.

**Exemplo.** R\$ 1.000 a $1\%$ ao mês por $12$ meses: $M = 1000 \cdot 1{,}01^{12} \approx 1126{,}83$.

**Exemplo.** Uma cultura dobra a cada $3$ horas, partindo de $500$ bactérias: $N(t) = 500 \cdot 2^{t/3}$. Em $9$ horas, $N = 500 \cdot 2^3 = 4000$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual é a imagem de $f(x) = 3^x$?
- $\mathbb{R}$
- $[0, +\infty)$
+ $(0, +\infty)$
- $[1, +\infty)$
> A exponencial é sempre positiva e chega tão perto de $0$ quanto se queira, sem atingir.

? A solução de $2^{x - 1} = 16$ é:
- $x = 4$
+ $x = 5$
- $x = 3$
- $x = 8$
> $16 = 2^4 \Rightarrow x - 1 = 4$.

? A função $f(x) = (0{,}5)^x$ é:
- crescente
+ decrescente
- constante
- crescente apenas para $x > 0$
> Base entre $0$ e $1$.

? A solução de $\left(\frac12\right)^x \geq 8$ é:
- $x \ge 3$
+ $x \le -3$
- $x \ge -3$
- $x \le 3$
> $8 = \left(\frac12\right)^{-3}$ e, com base menor que $1$, o sentido inverte.

? Uma população de $200$ triplica a cada $5$ anos. Qual o tamanho em $10$ anos?
- $600$
- $1200$
+ $1800$
- $6000$
> Dois períodos: $200 \cdot 3^2 = 1800$.
```

## 7. Exercícios

**1.** Resolva $9^x = 27$.

<details>
<summary>Ver solução</summary>

$3^{2x} = 3^3 \Rightarrow x = \frac32$.

</details>

**2.** Resolva $9^x - 4 \cdot 3^x + 3 = 0$.

<details>
<summary>Ver solução</summary>

Com $t = 3^x$: $t^2 - 4t + 3 = 0 \Rightarrow t = 1$ ou $t = 3$. Logo $x = 0$ ou $x = 1$.

</details>

**3.** Esboce $y = 2^x - 4$ e encontre a raiz e a assíntota.

<details>
<summary>Ver solução</summary>

É $2^x$ deslocada $4$ para baixo. Raiz: $2^x = 4 \Rightarrow x = 2$. Assíntota horizontal $y = -4$; corta o eixo $y$ em $-3$.

</details>

**4.** Uma substância perde $20\%$ da massa por ano. Escreva $m(t)$ para $m_0 = 50$ g e calcule a massa após $3$ anos.

<details>
<summary>Ver solução</summary>

$m(t) = 50 \cdot 0{,}8^t$; $m(3) = 50 \cdot 0{,}512 = 25{,}6$ g.

</details>
