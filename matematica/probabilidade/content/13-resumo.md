# Resumo, formulário e erros comuns

Este capítulo reúne as fórmulas do livro, um roteiro para escolher a ferramenta certa e os erros de raciocínio mais frequentes em probabilidade e estatística (vários deles aparecem até em jornais).

## 1. Formulário

**Descritiva.**
$$\bar x = \frac{\sum x_i}{n} \qquad s^2 = \frac{\sum (x_i - \bar x)^2}{n - 1} \qquad z = \frac{x - \bar x}{s} \qquad AIQ = Q_3 - Q_1$$

**Contagem.**
$$n! \qquad A_{n,k} = \frac{n!}{(n-k)!} \qquad \binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

**Probabilidade.**
$$P(A^c) = 1 - P(A) \qquad P(A \cup B) = P(A) + P(B) - P(A \cap B) \qquad P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

$$\text{independentes: } P(A \cap B) = P(A)P(B) \qquad \text{Bayes: } P(B \mid A) = \frac{P(B)P(A \mid B)}{P(A)}$$

**Variáveis aleatórias.**
$$E[X] = \sum x\,P(X = x) \qquad \text{Var}(X) = E[X^2] - (E[X])^2 \qquad E[aX + b] = aE[X] + b \qquad \text{Var}(aX + b) = a^2\text{Var}(X)$$

**Distribuições.**

| Distribuição | $P(X = k)$ ou forma | Média | Variância |
|---|---|---|---|
| Binomial $B(n, p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson ($\lambda$) | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Normal $N(\mu, \sigma^2)$ | sino; $Z = \frac{X - \mu}{\sigma}$ | $\mu$ | $\sigma^2$ |

**Inferência.**
$$\bar X \approx N\!\left(\mu, \frac{\sigma^2}{n}\right) \qquad \text{IC: } \bar x \pm z\frac{s}{\sqrt n} \qquad \hat p \pm z\sqrt{\frac{\hat p(1 - \hat p)}{n}} \qquad z_{95\%} = 1{,}96$$

**Regressão.** $\hat y = a + bx$, $b = r\frac{s_y}{s_x}$, $a = \bar y - b\bar x$.

## 2. Qual ferramenta usar

| A pergunta envolve... | Use |
|---|---|
| quantas maneiras, ordem importa | arranjo / princípio multiplicativo |
| quantas maneiras, ordem não importa | combinação |
| "pelo menos um" | complemento |
| "dado que", informação nova | probabilidade condicional |
| inverter a condicional (teste, diagnóstico) | Bayes, com frequências naturais |
| nº de sucessos em $n$ tentativas iguais | binomial |
| eventos raros por intervalo | Poisson |
| medidas contínuas em forma de sino | normal |
| média de muitos valores | TCL |
| estimar com margem de erro | intervalo de confiança |
| decidir entre duas hipóteses | teste de hipóteses |
| relação entre duas variáveis | dispersão, $r$ e regressão |

## 3. Erros mais comuns

| # | Erro | O certo |
|---|---|---|
| 1 | confundir $P(A \mid B)$ com $P(B \mid A)$ | são diferentes; use Bayes |
| 2 | "saíram 5 caras, agora vem coroa" | lançamentos independentes não têm memória |
| 3 | exclusivos = independentes | exclusivos (com prob. positiva) são **dependentes** |
| 4 | somar probabilidades de eventos não exclusivos | subtraia $P(A \cap B)$ |
| 5 | multiplicar probabilidades de eventos dependentes | use a condicional |
| 6 | usar média com dados muito assimétricos | prefira a mediana |
| 7 | variância amostral dividindo por $n$ | divida por $n - 1$ |
| 8 | $\text{Var}(X - Y) = \text{Var}(X) - \text{Var}(Y)$ | **soma** (se independentes) |
| 9 | tratar somas de dois dados como igualmente prováveis | conte os 36 pares ordenados |
| 10 | p-valor = probabilidade de $H_0$ ser verdadeira | é a probabilidade dos dados supondo $H_0$ |
| 11 | "não rejeito $H_0$" = "provei $H_0$" | só falta evidência |
| 12 | significativo = importante | veja o tamanho do efeito |
| 13 | correlação implica causa | pode haver confusão ou causa reversa |
| 14 | extrapolar a regressão | vale só na faixa dos dados |
| 15 | amostra grande corrige viés | viés de seleção não some com $n$ |

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Para "probabilidade de pelo menos um 6 em 4 lançamentos de dado", o caminho mais curto é:
+ $1 - \left(\frac56\right)^4$
- $4 \cdot \frac16$
- $\binom{4}{1}\frac16$
- $\left(\frac16\right)^4$
> Complemento de "nenhum 6".

? Uma pesquisa online com 1 milhão de respostas voluntárias:
- tem margem de erro desprezível
+ pode ser muito enviesada, apesar do tamanho
- é sempre melhor que uma amostra aleatória de 1.000
- dispensa intervalo de confiança
> Viés de seleção não diminui com $n$.

? O número de clientes que chegam a uma loja por hora (média 12) é bem modelado por:
- binomial
+ Poisson
- normal padrão
- uniforme
> Contagem de eventos num intervalo, com taxa média.

? Se $X$ e $Y$ são independentes com variâncias 4 e 9, $\text{Var}(X - Y)$ é:
- $-5$
- $5$
+ $13$
- $\sqrt{13}$
> As variâncias somam também na diferença.

? Para comparar o desempenho de alunos em provas diferentes, o melhor é usar:
- as notas brutas
+ os escores $z$
- as modas
- as amplitudes
> O $z$ coloca tudo na mesma escala.
```

## 4. Próximos passos

- Treine nos quatro simuladores.
- Consulte o **Glossário** (há uma categoria de probabilidade e estatística).
- Conexões: as integrais do **Cálculo I** calculam áreas sob densidades; os **mínimos quadrados** da Álgebra Linear são a regressão linear; e a análise combinatória é o capítulo 3 deste livro aplicado a probabilidades.
