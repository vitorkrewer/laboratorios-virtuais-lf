# Teorema de Bayes

Um exame para uma doença rara acerta 99% das vezes. Seu resultado deu positivo. Qual a chance de você estar doente? A maioria das pessoas (inclusive muitos médicos) responde "99%". A resposta certa costuma ser **muito menor**, e o Teorema de Bayes explica por quê.

> [!DICA] Use o simulador [Bayes: testes e falsos positivos](#/lab/bayes). Ele desenha 1.000 pessoas e mostra quantas são verdadeiros e falsos positivos.

## 1. O teorema

> [!TEOREMA] **(Bayes)** Se $B_1, \ldots, B_k$ dividem o espaço amostral em casos exclusivos:
> $$P(B_i \mid A) = \frac{P(B_i)\,P(A \mid B_i)}{\sum_j P(B_j)\,P(A \mid B_j)}.$$
> O denominador é $P(A)$, dada pela probabilidade total.

É só a definição de probabilidade condicional, com o numerador escrito pela regra do produto e o denominador pela probabilidade total. Serve para **inverter** a condicional: de $P(A \mid B)$, que costuma ser conhecida, para $P(B \mid A)$, que é o que se quer.

## 2. O exemplo do teste

Uma doença atinge **1%** da população. O teste tem:

- **sensibilidade** de 99%: $P(+ \mid \text{doente}) = 0{,}99$;
- **especificidade** de 95%: $P(- \mid \text{saudável}) = 0{,}95$, ou seja, 5% de falsos positivos.

$$P(\text{doente} \mid +) = \frac{0{,}01 \cdot 0{,}99}{0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05} = \frac{0{,}0099}{0{,}0099 + 0{,}0495} \approx 0{,}167$$

Só **16,7%**.

> [!INTUIÇÃO] Pense em **10.000 pessoas**. 100 estão doentes; o teste acusa 99 delas. Das 9.900 saudáveis, 5% (495) também dão positivo. Entre os $99 + 495 = 594$ positivos, só 99 estão doentes: $\frac{99}{594} \approx 16{,}7\%$. Os falsos positivos são poucos **em proporção**, mas a população saudável é tão grande que eles são maioria **em número**.

Este raciocínio com **frequências naturais** (contar pessoas em vez de multiplicar probabilidades) é o jeito mais seguro de resolver qualquer problema de Bayes.

## 3. O papel da probabilidade a priori

| Prevalência | $P(\text{doente} \mid +)$ (mesmo teste) |
|---|---|
| 0,1% | ≈ 1,9% |
| 1% | ≈ 16,7% |
| 10% | ≈ 68,8% |
| 50% | ≈ 95,2% |

O mesmo exame vale muito mais num grupo de risco (prevalência alta) do que num rastreamento da população geral. Por isso um resultado positivo em rastreamento costuma ser confirmado por um segundo teste.

> [!DEFINIÇÃO] Vocabulário bayesiano: $P(B)$ é a probabilidade **a priori** (antes da evidência); $P(B \mid A)$ é a **a posteriori** (depois); $P(A \mid B)$ é a **verossimilhança**.

> [!DICA] Depois de um positivo, a posteriori vira a nova priori. Um segundo teste positivo independente, no exemplo, leva a $P(\text{doente}) \approx 80\%$.

## 4. Outras aplicações

- **Filtros de spam**: a probabilidade de ser spam dado que contém certas palavras.
- **Justiça**: "a chance de uma pessoa inocente ter esse DNA é 1 em 1 milhão" **não** é "a chance de o réu ser inocente é 1 em 1 milhão" (a falácia do promotor).
- **Diagnóstico de falhas**: qual máquina provavelmente produziu a peça defeituosa.

**Exemplo** (fábrica do capítulo 5). Uma peça é defeituosa. Qual a chance de ter vindo da máquina 2?

$$P(M_2 \mid D) = \frac{0{,}4 \cdot 0{,}05}{0{,}032} = \frac{0{,}020}{0{,}032} = 0{,}625$$

A máquina 2 faz menos peças, mas é a culpada mais provável.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O Teorema de Bayes serve principalmente para:
- somar probabilidades de eventos exclusivos
+ obter $P(B \mid A)$ a partir de $P(A \mid B)$
- calcular combinações
- testar independência
> Ele "inverte" a condicional.

? Num teste com poucos falsos positivos, para uma doença muito rara, um resultado positivo:
- garante a doença
+ pode ter probabilidade baixa de indicar doença
- tem sempre probabilidade igual à sensibilidade
- não traz informação
> Os falsos positivos da enorme população saudável podem superar os verdadeiros positivos.

? Em 1.000 pessoas, 20 têm uma doença. O teste detecta 18 delas e dá falso positivo em 49 das saudáveis. $P(\text{doente} \mid +)$ é:
- $\frac{18}{20}$
+ $\frac{18}{67}$
- $\frac{49}{67}$
- $\frac{18}{1000}$
> Positivos: $18 + 49 = 67$; doentes entre eles: 18.

? Aumentando a prevalência da doença (mesmo teste), $P(\text{doente} \mid +)$:
+ aumenta
- diminui
- não muda
- vira a sensibilidade
> A priori maior, posteriori maior.

? "Sensibilidade" de um teste é:
+ $P(+ \mid \text{doente})$
- $P(\text{doente} \mid +)$
- $P(- \mid \text{saudável})$
- a prevalência
> A capacidade de detectar quem tem a doença.
```

## 5. Exercícios

**1.** Refaça o exemplo do teste com prevalência de 10%.

<details>
<summary>Ver solução</summary>

$\frac{0{,}1 \cdot 0{,}99}{0{,}1 \cdot 0{,}99 + 0{,}9 \cdot 0{,}05} = \frac{0{,}099}{0{,}144} \approx 0{,}6875$.

</details>

**2.** Na situação do spam (30% spam; filtro marca 95% dos spams e 2% dos normais), um e-mail foi marcado. Qual a chance de ser spam?

<details>
<summary>Ver solução</summary>

$\frac{0{,}285}{0{,}299} \approx 0{,}953$.

</details>

**3.** Três urnas: I tem 2 brancas e 1 preta; II tem 1 branca e 2 pretas; III tem 3 brancas. Escolhe-se uma urna ao acaso e tira-se uma bola branca. Qual a probabilidade de ter sido a urna III?

<details>
<summary>Ver solução</summary>

$P(B) = \frac13\left(\frac23 + \frac13 + 1\right) = \frac23$. $P(III \mid B) = \frac{\frac13 \cdot 1}{\frac23} = \frac12$.

</details>
