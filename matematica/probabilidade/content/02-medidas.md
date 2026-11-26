# Medidas de posição e de dispersão

Um conjunto de dados se resume, em primeira aproximação, por dois números: **onde está o centro** e **quão espalhados estão os valores em torno dele**. Este capítulo mostra as opções para cada um e quando usar qual.

> [!DICA] No simulador [Estatística descritiva](#/lab/descritiva), use o botão "adicionar valor extremo" e veja a média disparar enquanto a mediana quase não se mexe.

## 1. Medidas de tendência central

> [!DEFINIÇÃO] Para dados $x_1, x_2, \ldots, x_n$:
> - **Média**: $\bar x = \dfrac{x_1 + x_2 + \cdots + x_n}{n} = \dfrac{1}{n}\displaystyle\sum_{i=1}^{n} x_i$.
> - **Mediana**: o valor do meio dos dados **ordenados** (com $n$ par, a média dos dois do meio).
> - **Moda**: o valor mais frequente (pode haver mais de uma, ou nenhuma).

**Exemplo.** Salários (em mil reais) de 7 pessoas: $2, 2, 3, 3, 4, 5, 30$.

$$\bar x = \frac{49}{7} = 7 \qquad \text{Mediana} = 3 \qquad \text{Moda} = 2 \text{ e } 3$$

> [!INTUIÇÃO] A média é o **ponto de equilíbrio** (se os dados fossem pesos numa régua, ela é onde a régua equilibra). Um único valor extremo ($30$) puxa a média para longe. A mediana só olha a **posição**, por isso é **robusta**. Em salários e preços de imóveis, prefira a mediana.

| Distribuição | Relação |
|---|---|
| simétrica | média ≈ mediana |
| assimétrica à direita | média > mediana |
| assimétrica à esquerda | média < mediana |

**Média ponderada.** Se cada valor tem um peso $w_i$: $\bar x = \dfrac{\sum w_i x_i}{\sum w_i}$. Ex.: notas $6$ (peso $2$) e $9$ (peso $3$) dão $\frac{12 + 27}{5} = 7{,}8$.

## 2. Medidas de dispersão

Os conjuntos $\{4, 5, 6\}$ e $\{0, 5, 10\}$ têm a mesma média, mas espalhamentos muito diferentes.

- **Amplitude**: máximo menos mínimo. Simples, mas depende só de dois valores.
- **Variância**: a média dos quadrados dos desvios em relação à média.
- **Desvio padrão**: a raiz da variância. Volta à **unidade original** dos dados.

> [!DEFINIÇÃO] Variância e desvio padrão:
> $$\sigma^2 = \frac{1}{N}\sum (x_i - \mu)^2 \;\;(\text{população}) \qquad s^2 = \frac{1}{n - 1}\sum (x_i - \bar x)^2 \;\;(\text{amostra}), \qquad s = \sqrt{s^2}.$$

> [!ATENÇÃO] Na **amostra** divide-se por $n - 1$, e não por $n$. O motivo: os desvios são medidos em relação a $\bar x$, que foi calculada com os próprios dados e fica "perto demais" deles. Dividir por $n - 1$ corrige essa tendência de subestimar a variância da população.

**Exemplo.** Amostra $2, 4, 4, 5, 10$: $\bar x = 5$. Desvios: $-3, -1, -1, 0, 5$. Quadrados: $9, 1, 1, 0, 25$, soma $36$.

$$s^2 = \frac{36}{4} = 9 \qquad s = 3$$

> [!INTUIÇÃO] Por que elevar ao quadrado? Os desvios somam sempre zero (positivos e negativos se cancelam). O quadrado deixa tudo positivo e pesa mais os desvios grandes.

**Coeficiente de variação**: $CV = \dfrac{s}{\bar x}$, a dispersão relativa à média. Útil para comparar variáveis de escalas diferentes.

## 3. Quartis e boxplot

Os **quartis** dividem os dados ordenados em quatro partes iguais: $Q_1$ (25%), $Q_2$ = mediana (50%), $Q_3$ (75%). A **amplitude interquartil** é $AIQ = Q_3 - Q_1$: o espalhamento da metade central.

> [!DICA] Existem várias convenções para calcular quartis (planilhas e livros diferem nos detalhes). Aqui: $Q_1$ é a mediana da metade inferior e $Q_3$ a mediana da metade superior, sem incluir a mediana quando $n$ é ímpar.

O **boxplot** desenha os cinco números: mínimo, $Q_1$, mediana, $Q_3$, máximo. Valores além de $Q_3 + 1{,}5\cdot AIQ$ ou aquém de $Q_1 - 1{,}5\cdot AIQ$ são marcados como **valores atípicos** (outliers).

**Exemplo.** $2, 2, 3, 3, 4, 5, 30$: mediana $3$; metade inferior $2, 2, 3$, logo $Q_1 = 2$; metade superior $4, 5, 30$, logo $Q_3 = 5$. $AIQ = 3$; limite superior $5 + 4{,}5 = 9{,}5$. O $30$ é atípico.

## 4. Escore padronizado (z)

$$z = \frac{x - \bar x}{s}$$

diz **quantos desvios padrão** um valor está acima (ou abaixo) da média. Permite comparar coisas diferentes.

**Exemplo.** Ana tirou $80$ numa prova com média $70$ e desvio $5$ ($z = 2$). Bruno tirou $85$ noutra com média $75$ e desvio $10$ ($z = 1$). Relativamente à turma, Ana foi melhor.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A mediana de $7, 1, 9, 3, 5$ é:
- $9$
+ $5$
- $3$
- $25$
> Ordene: $1, 3, 5, 7, 9$; o do meio.

? Num bairro, a renda média é muito maior que a mediana. A distribuição é:
+ assimétrica à direita
- simétrica
- assimétrica à esquerda
- impossível de saber
> Valores muito altos puxam a média para cima.

? O desvio padrão de $5, 5, 5, 5$ é:
+ $0$
- $5$
- $1$
- $20$
> Não há dispersão nenhuma.

? Na variância **amostral**, a soma dos quadrados dos desvios é dividida por:
- $n$
+ $n - 1$
- $n + 1$
- $\sqrt{n}$
> Correção pelo uso de $\bar x$ no lugar de $\mu$.

? Uma nota com $z = -1{,}5$ está:
- 1,5 ponto abaixo da média
+ 1,5 desvio padrão abaixo da média
- acima da média
- na mediana
> $z$ mede em unidades de desvio padrão.
```

## 5. Exercícios

**1.** Calcule média, mediana e moda de $3, 7, 7, 2, 9, 4, 7, 1$.

<details>
<summary>Ver solução</summary>

Soma $40$, média $5$. Ordenado: $1, 2, 3, 4, 7, 7, 7, 9$; mediana $\frac{4 + 7}{2} = 5{,}5$. Moda $7$.

</details>

**2.** Calcule a variância e o desvio padrão amostrais de $1, 3, 5, 7$.

<details>
<summary>Ver solução</summary>

$\bar x = 4$; desvios ao quadrado $9, 1, 1, 9$, soma $20$; $s^2 = \frac{20}{3} \approx 6{,}67$; $s \approx 2{,}58$.

</details>

**3.** Encontre $Q_1$, $Q_3$ e os valores atípicos de $1, 3, 4, 5, 5, 6, 7, 8, 30$.

<details>
<summary>Ver solução</summary>

Mediana $5$ (5º valor). Metade inferior $1, 3, 4, 5$: $Q_1 = 3{,}5$. Superior $6, 7, 8, 30$: $Q_3 = 7{,}5$. $AIQ = 4$; limites $-2{,}5$ e $13{,}5$. Atípico: $30$.

</details>

**4.** Se somarmos $10$ a todos os dados, o que acontece com a média e o desvio padrão? E se multiplicarmos todos por $2$?

<details>
<summary>Ver solução</summary>

Somar $10$: a média sobe $10$, o desvio não muda (o espalhamento é o mesmo). Multiplicar por $2$: média e desvio dobram (a variância quadruplica).

</details>
