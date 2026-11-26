# Probabilidade: as regras básicas

Probabilidade é a linguagem da incerteza. Ela não diz o que vai acontecer na próxima jogada, mas descreve com precisão o que acontece **a longo prazo**, e é a base de toda a estatística inferencial.

## 1. Experimento, espaço amostral e evento

- **Experimento aleatório**: algo que, repetido nas mesmas condições, pode dar resultados diferentes (lançar um dado).
- **Espaço amostral** $\Omega$: o conjunto de todos os resultados possíveis. Dado: $\Omega = \{1, 2, 3, 4, 5, 6\}$.
- **Evento**: um subconjunto de $\Omega$. "Sair par": $A = \{2, 4, 6\}$.

Eventos são conjuntos, então valem as operações do livro [Fundamentos](../fundamentos/#/teoria/operacoes-conjuntos):

| Evento | Notação | Significado |
|---|---|---|
| A **ou** B | $A \cup B$ | pelo menos um ocorre |
| A **e** B | $A \cap B$ | os dois ocorrem |
| **não** A | $A^c$ ou $\bar A$ | A não ocorre |
| mutuamente exclusivos | $A \cap B = \varnothing$ | não podem ocorrer juntos |

## 2. Probabilidade clássica

> [!DEFINIÇÃO] Se todos os resultados de $\Omega$ (finito) são **igualmente prováveis**:
> $$P(A) = \frac{\text{número de casos favoráveis}}{\text{número de casos possíveis}} = \frac{n(A)}{n(\Omega)}.$$

**Exemplos.** Dado: $P(\text{par}) = \frac36 = \frac12$. Dois dados: $36$ resultados; soma $7$ ocorre em $(1,6), (2,5), \ldots, (6,1)$, ou seja, $P = \frac{6}{36} = \frac16$.

> [!ATENÇÃO] "Igualmente prováveis" é essencial. As somas de dois dados ($2$ a $12$) **não** são igualmente prováveis: soma $2$ só sai de um jeito; soma $7$, de seis. Conte os pares ordenados, não as somas.

**Visão frequentista.** A probabilidade é a frequência relativa a longo prazo. Jogue uma moeda 10 vezes e talvez saiam 7 caras; jogue 10.000 vezes e a proporção ficará muito perto de $0{,}5$. É a **lei dos grandes números**.

## 3. As regras

> [!TEOREMA] **(Propriedades básicas)**
> 1. $0 \le P(A) \le 1$; $P(\varnothing) = 0$; $P(\Omega) = 1$.
> 2. **Complemento**: $P(A^c) = 1 - P(A)$.
> 3. **Regra da soma**: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
> 4. Se A e B são **mutuamente exclusivos**: $P(A \cup B) = P(A) + P(B)$.

> [!INTUIÇÃO] Na regra da soma, quem está em $A \cap B$ foi contado duas vezes (uma em $A$, outra em $B$); subtrai-se uma vez. É o mesmo raciocínio do diagrama de Venn.

**Exemplo.** Uma carta do baralho (52 cartas). $P(\text{copas ou rei}) = \frac{13}{52} + \frac{4}{52} - \frac{1}{52} = \frac{16}{52} = \frac{4}{13}$.

> [!DICA] Quando o problema diz "**pelo menos um**", quase sempre é mais fácil calcular o complemento ("nenhum") e subtrair de $1$.

**Exemplo.** Jogando 3 moedas, $P(\text{pelo menos uma cara}) = 1 - P(\text{nenhuma cara}) = 1 - \frac18 = \frac78$.

## 4. Chance (odds) e probabilidade

Em apostas, fala-se em **chance**: "3 para 1 contra" significa 1 caso favorável para 3 desfavoráveis, ou seja, $P = \frac{1}{4}$. Não confunda chance com probabilidade.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Ao lançar um dado, a probabilidade de sair um número maior que 4 é:
- $\frac12$
+ $\frac13$
- $\frac23$
- $\frac14$
> $\{5, 6\}$: 2 de 6.

? Se $P(A) = 0{,}3$, então $P(A^c)$ é:
- $0{,}3$
+ $0{,}7$
- $1{,}3$
- $0$
> Complemento: $1 - 0{,}3$.

? $P(A) = 0{,}5$, $P(B) = 0{,}4$ e $P(A \cap B) = 0{,}2$. Então $P(A \cup B)$ é:
- $0{,}9$
+ $0{,}7$
- $0{,}2$
- $0{,}1$
> $0{,}5 + 0{,}4 - 0{,}2$.

? Ao lançar dois dados, a probabilidade de a soma ser 12 é:
- $\frac{1}{11}$
- $\frac{1}{12}$
+ $\frac{1}{36}$
- $\frac{2}{36}$
> Só $(6, 6)$, entre 36 pares igualmente prováveis.

? A probabilidade de, em 4 lançamentos de moeda, sair pelo menos uma coroa é:
- $\frac14$
- $\frac12$
+ $\frac{15}{16}$
- $1$
> $1 - \left(\frac12\right)^4$.
```

## 5. Exercícios

**1.** Uma urna tem 5 bolas vermelhas e 3 azuis. Tirando 2 ao acaso (sem reposição), qual a probabilidade de as duas serem vermelhas?

<details>
<summary>Ver solução</summary>

$\frac{\binom52}{\binom82} = \frac{10}{28} = \frac{5}{14}$.

</details>

**2.** Num grupo, 60% leem jornal, 50% veem TV e 30% fazem as duas coisas. Qual a probabilidade de alguém não fazer nenhuma das duas?

<details>
<summary>Ver solução</summary>

$P(J \cup T) = 0{,}6 + 0{,}5 - 0{,}3 = 0{,}8$. Nenhuma: $1 - 0{,}8 = 0{,}2$.

</details>

**3.** Qual a probabilidade de acertar a sena com uma aposta simples (6 números entre 60)?

<details>
<summary>Ver solução</summary>

$\frac{1}{\binom{60}{6}} = \frac{1}{50\,063\,860} \approx 0{,}000002\%$.

</details>

**4.** Lançando dois dados, qual a probabilidade de os números serem diferentes?

<details>
<summary>Ver solução</summary>

Iguais: 6 de 36. Diferentes: $1 - \frac{6}{36} = \frac{5}{6}$.

</details>
