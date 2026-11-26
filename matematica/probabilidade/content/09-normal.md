# Variáveis contínuas e a distribuição normal

Alturas, tempos, erros de medida: variáveis contínuas não têm "valores isolados" para listar. Para elas, probabilidade é **área sob uma curva**. A curva mais importante de toda a estatística é a normal, o famoso sino.

> [!DICA] No simulador [Normal e TCL](#/lab/normal), mova $\mu$ e $\sigma$, escolha um intervalo e veja a área (a probabilidade) ser pintada e calculada.

## 1. Densidade de probabilidade

> [!DEFINIÇÃO] Uma variável contínua $X$ tem uma **função densidade** $f(x) \ge 0$, com área total $1$ sob o gráfico. A probabilidade de $X$ cair num intervalo é a **área** sobre ele:
> $$P(a \le X \le b) = \int_a^b f(x)\,dx.$$

> [!ATENÇÃO] Para variáveis contínuas, $P(X = a) = 0$ para qualquer valor exato (a área sobre um ponto é zero). Por isso $P(X < a) = P(X \le a)$. E $f(x)$ **não** é uma probabilidade: pode até ser maior que $1$.

A integral vem do Cálculo ([Integral definida](../calculo-1/#/teoria/integral-definida)), mas na prática usamos tabelas e computadores.

**Exemplo: uniforme.** Um ônibus passa a cada 20 minutos e você chega ao acaso. O tempo de espera é uniforme em $[0, 20]$, com $f(x) = \frac{1}{20}$. $P(\text{esperar mais de 15 min}) = \frac{5}{20} = 0{,}25$: um retângulo.

## 2. A distribuição normal

> [!DEFINIÇÃO] $X \sim N(\mu, \sigma^2)$ tem densidade
> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x - \mu)^2}{2\sigma^2}}.$$
> Média $\mu$ (o centro) e desvio padrão $\sigma$ (a largura).

Propriedades da curva: simétrica em torno de $\mu$; média, mediana e moda coincidem; os pontos de inflexão ficam em $\mu \pm \sigma$; as caudas nunca tocam o eixo, mas ficam desprezíveis rapidamente.

> [!TEOREMA] **(Regra 68–95–99,7)** Numa normal, cerca de **68%** dos valores ficam a até 1 desvio padrão da média, **95%** a até 2 e **99,7%** a até 3.

**Exemplo.** Alturas de adultos com $\mu = 170$ cm e $\sigma = 10$ cm: 68% entre 160 e 180; 95% entre 150 e 190; quase todos entre 140 e 200.

## 3. Padronização e a tabela z

Toda normal vira a **normal padrão** $Z \sim N(0, 1)$ pela padronização:

$$Z = \frac{X - \mu}{\sigma}$$

A tabela (ou a função $\Phi$) dá $\Phi(z) = P(Z \le z)$. Valores que convém conhecer:

| $z$ | $0$ | $1$ | $1{,}28$ | $1{,}645$ | $1{,}96$ | $2$ | $2{,}576$ | $3$ |
|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | $0{,}5$ | $0{,}8413$ | $0{,}90$ | $0{,}95$ | $0{,}975$ | $0{,}9772$ | $0{,}995$ | $0{,}9987$ |

Por simetria, $\Phi(-z) = 1 - \Phi(z)$.

**Exemplo.** Notas $\sim N(60, 8^2)$. Fração acima de 76: $z = \frac{76 - 60}{8} = 2$, então $P(X > 76) = 1 - 0{,}9772 = 0{,}0228$ (cerca de 2,3%).

**Exemplo (inverso).** Qual nota separa os 10% melhores? $\Phi(z) = 0{,}90 \Rightarrow z \approx 1{,}28$, logo $x = 60 + 1{,}28 \cdot 8 \approx 70{,}2$.

> [!DICA] Sempre desenhe o sino e pinte a área pedida antes de olhar a tabela. "Maior que" é $1 - \Phi$; "entre $a$ e $b$" é $\Phi(z_b) - \Phi(z_a)$.

## 4. Aproximação normal da binomial

Se $n$ é grande ($np \ge 5$ e $n(1 - p) \ge 5$), $B(n, p)$ é aproximadamente normal com $\mu = np$ e $\sigma = \sqrt{np(1 - p)}$. Para melhorar a aproximação, usa-se a **correção de continuidade**: $P(X \le k) \approx \Phi\left(\frac{k + 0{,}5 - \mu}{\sigma}\right)$.

**Exemplo.** 100 lançamentos de moeda; $P(X \ge 60)$? $\mu = 50$, $\sigma = 5$; $z = \frac{59{,}5 - 50}{5} = 1{,}9$; $P \approx 1 - 0{,}9713 = 0{,}0287$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Numa variável contínua, $P(X = 5)$ é:
+ $0$
- $f(5)$
- $\frac12$
- depende da distribuição
> A área sobre um único ponto é zero.

? Numa normal, aproximadamente que porcentagem fica entre $\mu - 2\sigma$ e $\mu + 2\sigma$?
- 68%
+ 95%
- 99,7%
- 50%
> Regra 68–95–99,7.

? Se $X \sim N(100, 15^2)$, o escore $z$ de $x = 130$ é:
- $30$
+ $2$
- $1{,}5$
- $0{,}5$
> $\frac{130 - 100}{15}$.

? $P(Z > 1{,}96)$ é aproximadamente:
- $0{,}975$
+ $0{,}025$
- $0{,}05$
- $0{,}95$
> $1 - 0{,}975$.

? Numa normal, média, mediana e moda:
+ são iguais
- a média é maior
- a mediana é maior
- não existem
> A curva é simétrica com um único pico.
```

## 5. Exercícios

**1.** O tempo de montagem de uma peça é $N(30, 4^2)$ minutos. Qual a probabilidade de levar entre 26 e 38 minutos?

<details>
<summary>Ver solução</summary>

$z$ de $-1$ a $2$: $\Phi(2) - \Phi(-1) = 0{,}9772 - 0{,}1587 = 0{,}8185$.

</details>

**2.** QI $\sim N(100, 15^2)$. Que QI separa os 5% mais altos?

<details>
<summary>Ver solução</summary>

$z = 1{,}645$: $100 + 1{,}645 \cdot 15 \approx 124{,}7$.

</details>

**3.** Uma máquina enche pacotes com $\mu = 500$ g e $\sigma = 4$ g. Que fração tem menos de 492 g?

<details>
<summary>Ver solução</summary>

$z = -2$: $1 - 0{,}9772 = 0{,}0228$, cerca de 2,3%.

</details>

**4.** Para a uniforme em $[0, 20]$, calcule $E[X]$ e $P(5 \le X \le 12)$.

<details>
<summary>Ver solução</summary>

$E[X] = 10$ (o meio). $P = \frac{7}{20} = 0{,}35$.

</details>
