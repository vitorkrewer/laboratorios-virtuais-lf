# Testes de hipóteses

Um novo remédio funciona melhor que o antigo? Uma moeda é viciada? A taxa de defeitos aumentou? Testes de hipóteses dão um procedimento para decidir com base em dados, controlando a chance de errar. A lógica lembra a de um tribunal: o réu é presumido inocente até que as provas sejam fortes o bastante.

## 1. As duas hipóteses

- **Hipótese nula** $H_0$: a posição "padrão", sem efeito, sem mudança. Ex.: $H_0: \mu = 500$ g.
- **Hipótese alternativa** $H_1$: o que se quer evidenciar. Ex.: $H_1: \mu < 500$ g (unilateral) ou $H_1: \mu \neq 500$ g (bilateral).

> [!INTUIÇÃO] Nunca "provamos" $H_0$. Ou os dados são **improváveis demais** sob $H_0$ e a rejeitamos, ou não há evidência suficiente e **não rejeitamos**. "Não culpado" não é o mesmo que "inocente".

## 2. Estatística de teste e p-valor

Para a média, com amostra grande:

$$z = \frac{\bar x - \mu_0}{s / \sqrt n}$$

mede quantos erros padrão a média observada está do valor da hipótese nula.

> [!DEFINIÇÃO] O **p-valor** é a probabilidade de, **supondo $H_0$ verdadeira**, obter um resultado tão extremo quanto o observado (ou mais). p-valor pequeno = dado surpreendente sob $H_0$ = evidência contra $H_0$.

> [!DEFINIÇÃO] O **nível de significância** $\alpha$ (em geral $5\%$) é o limite escolhido **antes**: rejeita-se $H_0$ se p-valor $< \alpha$.

**Exemplo.** Pacotes deveriam ter 500 g. Amostra de 36: $\bar x = 497$ g, $s = 6$ g. $H_0: \mu = 500$, $H_1: \mu < 500$.

$$z = \frac{497 - 500}{6/6} = -3 \qquad \text{p-valor} = P(Z \le -3) \approx 0{,}0013$$

Como $0{,}0013 < 0{,}05$, rejeita-se $H_0$: há forte evidência de que os pacotes estão abaixo do peso.

> [!ATENÇÃO] O p-valor **não** é a probabilidade de $H_0$ ser verdadeira. É a probabilidade **dos dados** supondo $H_0$: de novo a diferença entre $P(A \mid B)$ e $P(B \mid A)$ (capítulos 5 e 6).

## 3. Os dois tipos de erro

| | $H_0$ verdadeira | $H_0$ falsa |
|---|---|---|
| Rejeita $H_0$ | **erro tipo I** (prob. $\alpha$) | acerto (**poder** $= 1 - \beta$) |
| Não rejeita $H_0$ | acerto | **erro tipo II** (prob. $\beta$) |

- Tipo I: condenar um inocente; dizer que o remédio funciona quando não funciona (falso positivo).
- Tipo II: absolver um culpado; deixar passar um efeito real (falso negativo).

Diminuir $\alpha$ torna o teste mais exigente e aumenta $\beta$. A forma de reduzir os dois ao mesmo tempo é **aumentar a amostra**.

## 4. Teste para proporção

$$z = \frac{\hat p - p_0}{\sqrt{p_0(1 - p_0)/n}}$$

**Exemplo.** Uma moeda deu 60 caras em 100 lançamentos. É viciada? $H_0: p = 0{,}5$, $H_1: p \neq 0{,}5$ (bilateral).

$$z = \frac{0{,}6 - 0{,}5}{\sqrt{0{,}25/100}} = \frac{0{,}1}{0{,}05} = 2 \qquad \text{p-valor} = 2 \cdot P(Z \ge 2) \approx 0{,}046$$

Com $\alpha = 5\%$, rejeita-se $H_0$, mas por pouco.

> [!ATENÇÃO] "Estatisticamente significativo" não quer dizer "importante". Com uma amostra enorme, diferenças minúsculas (e irrelevantes na prática) dão p-valores pequenos. Olhe sempre o **tamanho do efeito**, de preferência com um intervalo de confiança.

> [!ATENÇÃO] Testar muitas hipóteses e relatar só as "significativas" (o chamado *p-hacking*) fabrica descobertas falsas: com $\alpha = 5\%$, 1 em cada 20 testes de efeitos inexistentes dá positivo por acaso.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O p-valor é:
- a probabilidade de $H_0$ ser verdadeira
+ a probabilidade de dados tão extremos quanto os observados, supondo $H_0$
- o nível de significância
- a probabilidade de erro tipo II
> É calculado sob a hipótese nula.

? Com $\alpha = 0{,}05$ e p-valor $= 0{,}12$, a decisão é:
- rejeitar $H_0$
+ não rejeitar $H_0$
- aceitar $H_1$
- aumentar $\alpha$
> p-valor maior que $\alpha$: evidência insuficiente.

? Erro tipo I é:
+ rejeitar $H_0$ quando ela é verdadeira
- não rejeitar $H_0$ quando ela é falsa
- usar a amostra errada
- calcular errado o p-valor
> O "falso positivo" do teste.

? Para reduzir as probabilidades de erro tipo I e tipo II ao mesmo tempo, deve-se:
- diminuir $\alpha$
- aumentar $\alpha$
+ aumentar a amostra
- usar teste unilateral
> Mais dados, mais precisão.

? Um teste com 1 milhão de pessoas mostra diferença "significativa" de 0,01 kg no peso médio. Isso indica que:
- a diferença é importante
+ a diferença é detectável, mas pode ser irrelevante na prática
- o teste está errado
- $H_0$ é verdadeira
> Significância estatística não é relevância prática.
```

## 5. Exercícios

**1.** Uma escola afirma média 70 no exame. Uma amostra de 49 alunos teve $\bar x = 67$ e $s = 14$. Teste $H_0: \mu = 70$ contra $H_1: \mu \neq 70$ a 5%.

<details>
<summary>Ver solução</summary>

$z = \frac{-3}{2} = -1{,}5$; p-valor bilateral $= 2 \cdot 0{,}0668 \approx 0{,}134 > 0{,}05$. Não se rejeita $H_0$.

</details>

**2.** Um fabricante diz que no máximo 5% das peças são defeituosas. Em 400, há 30 defeituosas. Há evidência contra a afirmação ($\alpha = 5\%$, unilateral)?

<details>
<summary>Ver solução</summary>

$\hat p = 0{,}075$; $z = \frac{0{,}025}{\sqrt{0{,}05 \cdot 0{,}95/400}} \approx \frac{0{,}025}{0{,}0109} \approx 2{,}29$; p-valor $\approx 0{,}011 < 0{,}05$. Rejeita-se $H_0$.

</details>

**3.** Num julgamento, $H_0$ é "o réu é inocente". Descreva os erros tipo I e tipo II.

<details>
<summary>Ver solução</summary>

Tipo I: condenar um inocente. Tipo II: absolver um culpado.

</details>
