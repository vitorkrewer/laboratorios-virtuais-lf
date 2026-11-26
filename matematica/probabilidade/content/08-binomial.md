# Distribuições binomial e de Poisson

Muitas situações reais seguem o mesmo molde: repetir uma tentativa com dois resultados (sucesso ou fracasso) e contar os sucessos. Esse molde tem nome, fórmula e propriedades prontas: é a **distribuição binomial**. Para eventos raros contados num intervalo de tempo ou espaço, entra a **Poisson**.

> [!DICA] No simulador [Binomial](#/lab/binomial), mexa em $n$ e $p$, marque um intervalo de valores e compare a distribuição teórica com uma simulação de verdade.

## 1. Ensaios de Bernoulli

Uma tentativa com dois resultados, **sucesso** (probabilidade $p$) ou **fracasso** ($1 - p$), é um **ensaio de Bernoulli**. Exemplos: uma peça é defeituosa ou não; um paciente responde ao tratamento ou não; um chute vira gol ou não.

## 2. A distribuição binomial

> [!DEFINIÇÃO] Se fazemos $n$ ensaios de Bernoulli **independentes**, com a **mesma** probabilidade $p$, o número $X$ de sucessos tem distribuição **binomial** $B(n, p)$:
> $$P(X = k) = \binom{n}{k}\,p^k\,(1 - p)^{n - k}, \qquad k = 0, 1, \ldots, n.$$

> [!INTUIÇÃO] Cada sequência específica com $k$ sucessos tem probabilidade $p^k(1 - p)^{n-k}$ (regra do produto, ensaios independentes). E há $\binom{n}{k}$ sequências com $k$ sucessos (escolher **quais** tentativas foram sucesso). Multiplica-se uma coisa pela outra.

**Exemplo.** Uma prova tem 10 questões de múltipla escolha com 4 alternativas. Chutando tudo, qual a chance de acertar exatamente 5?

$$P(X = 5) = \binom{10}{5}(0{,}25)^5(0{,}75)^5 = 252 \cdot 0{,}000977 \cdot 0{,}2373 \approx 0{,}058$$

Cerca de 5,8%. E de acertar **pelo menos 5**, somando $k = 5, \ldots, 10$: cerca de 7,8%.

### Média e variância

> [!TEOREMA] Se $X \sim B(n, p)$: $\quad E[X] = np \quad$ e $\quad \text{Var}(X) = np(1 - p)$.

No exemplo do chute: espera-se $10 \cdot 0{,}25 = 2{,}5$ acertos, com desvio padrão $\sqrt{10 \cdot 0{,}25 \cdot 0{,}75} \approx 1{,}37$.

> [!ATENÇÃO] Confira as condições antes de usar a binomial: número **fixo** de tentativas, **dois** resultados, **mesma** $p$ e **independência**. Tirar cartas sem reposição quebra a independência (a distribuição certa seria a hipergeométrica), mas se a população é muito grande perto da amostra, a binomial é uma boa aproximação.

## 3. A distribuição de Poisson

Para **contagens de eventos raros** num intervalo (chamadas por minuto, defeitos por metro de tecido, acidentes por mês), quando a taxa média $\lambda$ é conhecida:

> [!DEFINIÇÃO] $X$ tem distribuição de **Poisson** com parâmetro $\lambda > 0$ se
> $$P(X = k) = \frac{e^{-\lambda}\,\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots$$
> com $E[X] = \text{Var}(X) = \lambda$.

**Exemplo.** Um site recebe em média 3 reclamações por dia. Probabilidade de um dia sem reclamações: $e^{-3} \approx 0{,}0498$. De exatamente 2: $\frac{e^{-3} \cdot 9}{2} \approx 0{,}224$.

> [!DICA] Ajuste $\lambda$ ao intervalo pedido: 3 por dia equivale a $\lambda = 21$ por semana.

> [!INTUIÇÃO] A Poisson é o limite da binomial quando $n$ é grande e $p$ é pequeno, com $np = \lambda$. Muitas oportunidades, cada uma com chance pequena: é o retrato de um evento raro.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Lançando uma moeda 4 vezes, $P(\text{exatamente 2 caras})$ é:
- $\frac12$
+ $\frac{6}{16}$
- $\frac{4}{16}$
- $\frac{2}{16}$
> $\binom42 \left(\frac12\right)^4 = \frac{6}{16}$.

? Se $X \sim B(20;\ 0{,}3)$, então $E[X]$ é:
+ $6$
- $0{,}3$
- $4{,}2$
- $14$
> $np = 20 \cdot 0{,}3$.

? A variância de $B(100;\ 0{,}5)$ é:
- $50$
+ $25$
- $5$
- $0{,}25$
> $100 \cdot 0{,}5 \cdot 0{,}5$.

? Qual situação **não** é binomial?
- número de caras em 10 lançamentos de moeda
- número de peças defeituosas em 50, com 2% de defeito cada, independentes
+ número de lançamentos até sair a primeira cara
- número de acertos chutando 20 questões
> O número de tentativas não é fixo.

? Na Poisson com $\lambda = 4$, a variância é:
- $2$
- $16$
+ $4$
- $\sqrt4$
> Média e variância são iguais a $\lambda$.
```

## 4. Exercícios

**1.** 80% das sementes de um lote germinam. Plantando 5, qual a probabilidade de todas germinarem? E de pelo menos 4?

<details>
<summary>Ver solução</summary>

$0{,}8^5 \approx 0{,}328$. $P(X = 4) = 5 \cdot 0{,}8^4 \cdot 0{,}2 \approx 0{,}410$. Pelo menos 4: $\approx 0{,}737$.

</details>

**2.** Uma família tem 4 filhos. Supondo $P(\text{menina}) = \frac12$, qual a probabilidade de pelo menos uma menina?

<details>
<summary>Ver solução</summary>

$1 - P(X = 0) = 1 - \frac{1}{16} = \frac{15}{16}$.

</details>

**3.** Um texto tem em média 1 erro de digitação a cada 2 páginas. Qual a probabilidade de uma página não ter erros?

<details>
<summary>Ver solução</summary>

$\lambda = 0{,}5$ por página: $e^{-0{,}5} \approx 0{,}607$.

</details>

**4.** Em $B(n, p)$ com $n = 50$, a média é $10$. Qual é $p$ e qual o desvio padrão?

<details>
<summary>Ver solução</summary>

$p = 0{,}2$; $\sigma = \sqrt{50 \cdot 0{,}2 \cdot 0{,}8} = \sqrt8 \approx 2{,}83$.

</details>
