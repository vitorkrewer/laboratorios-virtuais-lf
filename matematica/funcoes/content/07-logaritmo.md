# Logaritmo e função logarítmica

O logaritmo responde à pergunta "**a que expoente** devo elevar a base para obter este número?". É a inversa da exponencial, e é o que permite resolver equações em que a incógnita está no expoente.

## 1. Definição

> [!DEFINIÇÃO] Para $a > 0$, $a \neq 1$ e $x > 0$: $$\log_a x = y \iff a^y = x.$$

**Exemplos.** $\log_2 8 = 3$ (porque $2^3 = 8$); $\log_{10} 0{,}01 = -2$; $\log_5 1 = 0$; $\log_3 3 = 1$.

Notações: $\log x = \log_{10} x$ (logaritmo decimal) e $\ln x = \log_e x$ (logaritmo natural, o do Cálculo).

> [!ATENÇÃO] Só existe logaritmo de número **positivo**. $\log_2 0$ e $\ln(-1)$ não existem nos reais.

Consequências imediatas: $a^{\log_a x} = x$ e $\log_a(a^y) = y$. Em particular, $e^{\ln x} = x$ e $\ln(e^x) = x$.

## 2. Propriedades

> [!TEOREMA] Para $x, y > 0$:
> $$\log_a(xy) = \log_a x + \log_a y \qquad \log_a\frac{x}{y} = \log_a x - \log_a y \qquad \log_a(x^k) = k\log_a x$$

**Mudança de base:**

$$\log_a x = \frac{\ln x}{\ln a} = \frac{\log_b x}{\log_b a}$$

> [!ATENÇÃO] Não existem fórmulas para $\log(x + y)$ nem para $\log x \cdot \log y$. E $\frac{\log x}{\log y} \neq \log\frac{x}{y}$.

**Exemplo.** Com $\log 2 \approx 0{,}301$ e $\log 3 \approx 0{,}477$: $\log 12 = \log(4 \cdot 3) = 2\log 2 + \log 3 \approx 1{,}079$.

## 3. A função logarítmica

$f(x) = \log_a x$ é a **inversa** de $a^x$. Portanto:

- domínio $(0, +\infty)$ e imagem $\mathbb{R}$;
- passa por $(1, 0)$ e por $(a, 1)$;
- assíntota **vertical** $x = 0$;
- crescente se $a > 1$; decrescente se $0 < a < 1$;
- o gráfico é o reflexo de $a^x$ na reta $y = x$.

O logaritmo cresce **muito devagar**: $\ln(1\,000\,000) \approx 13{,}8$.

## 4. Equações logarítmicas

**Roteiro:** (1) imponha a **condição de existência** (argumentos positivos); (2) resolva; (3) descarte soluções fora da condição.

**Exemplo.** $\log_2(x - 1) = 3 \Rightarrow x - 1 = 8 \Rightarrow x = 9$ (e $9 - 1 > 0$, válido).

**Exemplo.** $\log x + \log(x - 3) = 1$. Condição: $x > 3$. Então $\log[x(x - 3)] = 1 \Rightarrow x^2 - 3x - 10 = 0 \Rightarrow x = 5$ ou $x = -2$. Só $x = 5$ satisfaz a condição.

**Exemplo (incógnita no expoente).** $5^x = 12 \Rightarrow x = \log_5 12 = \frac{\ln 12}{\ln 5} \approx 1{,}544$.

### Inequações

Para $a > 1$: $\log_a u < \log_a v \iff 0 < u < v$. Para $0 < a < 1$, o sentido inverte. Nunca esqueça a condição de existência.

**Exemplo.** $\ln(2x - 1) < 0$: precisa $2x - 1 > 0$ e $2x - 1 < 1$. Logo $\frac12 < x < 1$.

## 5. Aplicações

- **Tempo em modelos exponenciais.** Quanto tempo leva para R\$ 1.000 virar R\$ 2.000 a $1\%$ ao mês? $1{,}01^t = 2 \Rightarrow t = \frac{\ln 2}{\ln 1{,}01} \approx 69{,}7$ meses.
- **Escalas logarítmicas:** pH, decibéis, escala Richter. Um terremoto de magnitude $7$ libera cerca de $10^{1{,}5} \approx 32$ vezes mais energia que um de magnitude $6$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Quanto vale $\log_3 81$?
- $3$
+ $4$
- $27$
- $\frac{1}{4}$
> $3^4 = 81$.

? Qual é o domínio de $f(x) = \ln(x - 5)$?
- $\mathbb{R}$
- $[5, +\infty)$
+ $(5, +\infty)$
- $(0, +\infty)$
> O argumento precisa ser positivo: $x - 5 > 0$.

? $\log_2 40 - \log_2 5$ é igual a:
+ $3$
- $\log_2 35$
- $8$
- $\frac{\log_2 40}{\log_2 5}$
> $\log_2\frac{40}{5} = \log_2 8 = 3$.

? A solução de $e^{2x} = 5$ é:
- $x = \frac{5}{2e}$
+ $x = \frac{\ln 5}{2}$
- $x = 2\ln 5$
- $x = \ln\frac52$
> Aplicando $\ln$: $2x = \ln 5$.

? Em $\log(x) + \log(x + 3) = 1$, as soluções válidas são:
+ apenas $x = 2$
- $x = 2$ e $x = -5$
- apenas $x = -5$
- nenhuma
> $x(x+3) = 10 \Rightarrow x = 2$ ou $x = -5$; a condição $x > 0$ elimina $-5$.
```

## 6. Exercícios

**1.** Calcule $\log_4 32$.

<details>
<summary>Ver solução</summary>

$4^y = 32 \Rightarrow 2^{2y} = 2^5 \Rightarrow y = \frac52$.

</details>

**2.** Resolva $\log_3(2x + 1) = 2$.

<details>
<summary>Ver solução</summary>

$2x + 1 = 9 \Rightarrow x = 4$ (argumento positivo, válido).

</details>

**3.** Escreva $\ln\left(\dfrac{x^3\sqrt{y}}{z^2}\right)$ como soma e diferença de logaritmos.

<details>
<summary>Ver solução</summary>

$3\ln x + \frac12\ln y - 2\ln z$.

</details>

**4.** Uma população segue $P(t) = 800\,e^{0{,}05t}$. Em quanto tempo ela chega a $2000$?

<details>
<summary>Ver solução</summary>

$e^{0{,}05t} = 2{,}5 \Rightarrow t = \frac{\ln 2{,}5}{0{,}05} \approx 18{,}3$ unidades de tempo.

</details>

**5.** Resolva $\log_{1/2}(x - 2) > -1$.

<details>
<summary>Ver solução</summary>

Condição $x > 2$. Como $-1 = \log_{1/2} 2$ e a base é menor que $1$, o sentido inverte: $x - 2 < 2 \Rightarrow x < 4$. Solução: $(2, 4)$.

</details>
