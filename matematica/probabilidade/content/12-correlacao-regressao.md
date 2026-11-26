# Correlação e regressão linear

Horas de estudo e nota, temperatura e venda de sorvete, idade e preço de um carro usado: quando há duas variáveis numéricas, a pergunta é se elas andam juntas e, se andam, como prever uma a partir da outra. A ferramenta visual é o **gráfico de dispersão**; as numéricas são a **correlação** e a **reta de regressão**.

## 1. Gráfico de dispersão

Cada par $(x_i, y_i)$ vira um ponto. Olhe três coisas: a **direção** (sobe ou desce), a **forma** (reta, curva) e a **força** (pontos colados numa linha ou espalhados). Pontos isolados (atípicos) merecem atenção especial.

## 2. Coeficiente de correlação

> [!DEFINIÇÃO] O **coeficiente de correlação de Pearson** é
> $$r = \frac{1}{n - 1}\sum \left(\frac{x_i - \bar x}{s_x}\right)\left(\frac{y_i - \bar y}{s_y}\right),$$
> a média dos produtos dos escores $z$ de $x$ e $y$. Sempre $-1 \le r \le 1$.

| $r$ | Interpretação |
|---|---|
| perto de $1$ | relação linear forte e crescente |
| perto de $-1$ | relação linear forte e decrescente |
| perto de $0$ | nenhuma relação **linear** |

> [!INTUIÇÃO] Quando $x$ está acima da média e $y$ também (ou os dois abaixo), o produto dos $z$ é positivo. Se isso acontece na maioria dos pontos, $r > 0$.

> [!ATENÇÃO] $r$ mede só relação **linear**. Pontos sobre uma parábola perfeita podem ter $r = 0$. E um único valor atípico pode mudar $r$ drasticamente. Sempre olhe o gráfico.

## 3. Correlação não é causalidade

> [!ATENÇÃO] Venda de sorvete e afogamentos são fortemente correlacionados, mas sorvete não afoga ninguém: os dois aumentam no **verão** (uma **variável de confusão**). Para afirmar causa, é preciso um **experimento controlado e aleatorizado**, não só observar dados.

Outras armadilhas: causalidade reversa (quem vai ao hospital morre mais, mas é porque já estava doente) e coincidências (com dados suficientes, sempre aparecem correlações absurdas).

## 4. Reta de regressão (mínimos quadrados)

> [!DEFINIÇÃO] A **reta de regressão** $\hat y = a + bx$ é a reta que minimiza a soma dos quadrados dos resíduos $y_i - \hat y_i$:
> $$b = r\,\frac{s_y}{s_x} = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad a = \bar y - b\,\bar x.$$

A reta sempre passa pelo ponto $(\bar x, \bar y)$. A inclinação $b$ diz quanto $\hat y$ muda, **em média**, para cada unidade a mais de $x$.

**Exemplo.** Horas de estudo e nota de 5 alunos: $(1, 50)$, $(2, 55)$, $(3, 65)$, $(4, 70)$, $(5, 80)$.

$\bar x = 3$, $\bar y = 64$. Desvios de $x$: $-2, -1, 0, 1, 2$; de $y$: $-14, -9, 1, 6, 16$.

$$b = \frac{28 + 9 + 0 + 6 + 32}{4 + 1 + 0 + 1 + 4} = \frac{75}{10} = 7{,}5 \qquad a = 64 - 7{,}5 \cdot 3 = 41{,}5$$

$\hat y = 41{,}5 + 7{,}5x$: cada hora de estudo está associada a 7,5 pontos a mais. Para 4 horas, prevê $71{,}5$.

> [!DEFINIÇÃO] O **coeficiente de determinação** $r^2$ é a fração da variação de $y$ "explicada" pela reta. Aqui $r \approx 0{,}99$ e $r^2 \approx 0{,}98$.

> [!ATENÇÃO] **Não extrapole.** A reta vale na faixa dos dados observados. Usá-la para 20 horas de estudo preveria nota $191{,}5$, o que não faz sentido.

> [!INTUIÇÃO] É exatamente o problema de mínimos quadrados do livro [Álgebra Linear](../algebra-linear/#/teoria/ortogonalidade), visto pelo lado da estatística.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Um coeficiente de correlação $r = -0{,}9$ indica:
- relação fraca
+ relação linear forte e decrescente
- ausência de relação
- erro de cálculo
> Perto de $-1$.

? Qual valor de $r$ é impossível?
- $0$
- $-1$
- $0{,}99$
+ $1{,}2$
> $r$ fica sempre entre $-1$ e $1$.

? Cidades com mais bombeiros têm mais incêndios. Isso mostra que:
- bombeiros causam incêndios
+ há correlação, possivelmente explicada pelo tamanho da cidade
- a correlação é negativa
- a regressão é inválida
> Variável de confusão: cidades maiores têm mais dos dois.

? A reta de regressão sempre passa por:
- a origem
+ $(\bar x, \bar y)$
- o primeiro ponto
- o ponto mais alto
> Consequência de $a = \bar y - b\bar x$.

? Pontos exatamente sobre a parábola $y = x^2$, com $x$ de $-3$ a $3$, têm $r$:
- perto de $1$
- perto de $-1$
+ igual a $0$
- indefinido
> Relação perfeita, mas não linear; a simetria anula $r$.
```

## 5. Exercícios

**1.** Para $(1, 2)$, $(2, 4)$, $(3, 5)$, $(4, 4)$, $(5, 5)$, calcule a reta de regressão.

<details>
<summary>Ver solução</summary>

$\bar x = 3$, $\bar y = 4$. Desvios de $y$: $-2, 0, 1, 0, 1$. $b = \frac{4 + 0 + 0 + 0 + 2}{10} = 0{,}6$; $a = 4 - 1{,}8 = 2{,}2$. $\hat y = 2{,}2 + 0{,}6x$.

</details>

**2.** Se $r = 0{,}8$, $s_x = 2$, $s_y = 10$, $\bar x = 5$, $\bar y = 50$, qual a reta de regressão?

<details>
<summary>Ver solução</summary>

$b = 0{,}8 \cdot \frac{10}{2} = 4$; $a = 50 - 20 = 30$. $\hat y = 30 + 4x$.

</details>

**3.** Um estudo encontra correlação entre consumo de chocolate num país e número de prêmios Nobel. Que explicações alternativas existem?

<details>
<summary>Ver solução</summary>

Variável de confusão (renda: países ricos consomem mais chocolate e investem mais em pesquisa) ou simples coincidência. Correlação não estabelece causa.

</details>
