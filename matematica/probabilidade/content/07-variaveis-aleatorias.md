# Variáveis aleatórias discretas

Uma variável aleatória transforma resultados de um experimento em **números**: o número de caras, o lucro de uma aposta, a quantidade de clientes numa hora. Com números, dá para calcular médias e dispersões, como no capítulo 2, mas agora para o experimento **antes** de ele acontecer.

## 1. Definição e distribuição

> [!DEFINIÇÃO] Uma **variável aleatória** $X$ associa um número a cada resultado do espaço amostral. Ela é **discreta** se assume valores isolados (que podem ser listados). Sua **distribuição de probabilidade** lista cada valor $x$ com $P(X = x)$, e as probabilidades somam $1$.

**Exemplo.** $X$ = número de caras em 2 lançamentos de moeda. $\Omega = \{CC, CK, KC, KK\}$:

| $x$ | 0 | 1 | 2 |
|---|---|---|---|
| $P(X = x)$ | $\frac14$ | $\frac12$ | $\frac14$ |

A **função de distribuição acumulada** é $F(x) = P(X \le x)$. Aqui, $F(1) = \frac34$.

## 2. Esperança (valor esperado)

> [!DEFINIÇÃO] A **esperança** de $X$ é a média ponderada dos valores pelas probabilidades:
> $$E[X] = \mu = \sum x \cdot P(X = x).$$

No exemplo: $E[X] = 0 \cdot \frac14 + 1 \cdot \frac12 + 2 \cdot \frac14 = 1$.

> [!INTUIÇÃO] A esperança é a **média a longo prazo**. Ela não precisa ser um valor possível: o número esperado de pontos num dado é $3{,}5$, embora nunca saia $3{,}5$. Repetindo muitas vezes, a média dos resultados se aproxima de $3{,}5$.

**Exemplo: vale a pena apostar?** Uma rifa custa R\$ 10, tem 500 bilhetes e um prêmio de R\$ 3.000. O ganho líquido $G$ vale $2.990$ com probabilidade $\frac{1}{500}$ e $-10$ com probabilidade $\frac{499}{500}$:

$$E[G] = 2990 \cdot \frac{1}{500} - 10 \cdot \frac{499}{500} = 5{,}98 - 9{,}98 = -4$$

Em média, perde-se R\$ 4 por bilhete. Todo jogo de azar comercial tem esperança negativa para o jogador.

## 3. Variância e desvio padrão

> [!DEFINIÇÃO] $\text{Var}(X) = \sigma^2 = E\left[(X - \mu)^2\right] = E[X^2] - \mu^2$, e o desvio padrão é $\sigma = \sqrt{\text{Var}(X)}$.

> [!DICA] A forma $E[X^2] - \mu^2$ ("média dos quadrados menos o quadrado da média") costuma dar menos conta.

**Exemplo** (caras em 2 lançamentos). $E[X^2] = 0 \cdot \frac14 + 1 \cdot \frac12 + 4 \cdot \frac14 = \frac32$. $\text{Var}(X) = \frac32 - 1 = \frac12$; $\sigma \approx 0{,}71$.

## 4. Propriedades

| Propriedade | Fórmula |
|---|---|
| Linearidade da esperança | $E[aX + b] = aE[X] + b$ |
| Soma (sempre) | $E[X + Y] = E[X] + E[Y]$ |
| Variância de transformação | $\text{Var}(aX + b) = a^2\,\text{Var}(X)$ |
| Soma de **independentes** | $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ |

> [!ATENÇÃO] A esperança da soma é a soma das esperanças **sempre**. A variância da soma é a soma das variâncias **só se** as variáveis forem independentes. E as variâncias se **somam** mesmo numa diferença: $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ (independentes).

> [!INTUIÇÃO] Somar uma constante ($+b$) desloca tudo sem espalhar: a variância não muda. Multiplicar por $a$ estica o espalhamento por $|a|$, e a variância (que é um quadrado) por $a^2$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A esperança do resultado de um dado honesto é:
- $3$
+ $3{,}5$
- $4$
- $6$
> $\frac{1 + 2 + \cdots + 6}{6} = \frac{21}{6}$.

? $X$ vale $10$ com probabilidade $0{,}2$ e $0$ caso contrário. $E[X]$ é:
+ $2$
- $10$
- $5$
- $0{,}2$
> $10 \cdot 0{,}2$.

? Se $E[X] = 5$, então $E[3X - 2]$ é:
- $15$
+ $13$
- $5$
- $17$
> Linearidade: $3 \cdot 5 - 2$.

? Se $\text{Var}(X) = 4$, então $\text{Var}(3X + 7)$ é:
- $12$
- $19$
+ $36$
- $43$
> $3^2 \cdot 4$; a constante não altera a variância.

? A soma das probabilidades de uma distribuição é:
- qualquer número positivo
+ sempre $1$
- igual à esperança
- igual à variância
> Algum valor sempre ocorre.
```

## 5. Exercícios

**1.** Verifique se $P(X = 1) = 0{,}2$, $P(X = 2) = 0{,}5$, $P(X = 3) = 0{,}4$ é uma distribuição de probabilidade.

<details>
<summary>Ver solução</summary>

Não: a soma é $1{,}1$.

</details>

**2.** Calcule $E[X]$ e $\text{Var}(X)$ para $X$ = resultado de um dado honesto.

<details>
<summary>Ver solução</summary>

$E[X] = 3{,}5$; $E[X^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6}$; $\text{Var} = \frac{91}{6} - \frac{49}{4} = \frac{35}{12} \approx 2{,}92$.

</details>

**3.** Um seguro cobra R\$ 200 por ano e paga R\$ 10.000 em caso de sinistro, que ocorre com probabilidade $1\%$. Qual o lucro esperado da seguradora por apólice?

<details>
<summary>Ver solução</summary>

$200 - 0{,}01 \cdot 10\,000 = 200 - 100 = 100$ reais.

</details>

**4.** Lançam-se dois dados. Qual a esperança da soma?

<details>
<summary>Ver solução</summary>

Pela linearidade: $3{,}5 + 3{,}5 = 7$.

</details>
