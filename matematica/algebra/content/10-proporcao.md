# Razão, proporção, regra de três e porcentagem

Este é o capítulo mais "do dia a dia": receitas, escalas de mapa, velocidade, juros, descontos. E é também a base das taxas de variação, a ideia central da derivada.

## 1. Razão

> [!DEFINIÇÃO] A **razão** entre $a$ e $b$ ($b \neq 0$) é o quociente $\dfrac{a}{b}$, também escrito $a : b$ (lê-se "$a$ está para $b$").

- Em uma turma com $12$ mulheres e $18$ homens, a razão mulheres/homens é $\frac{12}{18} = \frac{2}{3}$.
- **Velocidade média:** $\frac{\text{distância}}{\text{tempo}}$. $180$ km em $2$ h dá $90$ km/h.
- **Escala:** $\frac{\text{desenho}}{\text{real}}$. $1 : 50\,000$ quer dizer que $1$ cm no mapa vale $50\,000$ cm $= 500$ m.
- **Densidade demográfica:** habitantes por km².

## 2. Proporção

> [!DEFINIÇÃO] Uma **proporção** é uma igualdade entre duas razões: $\dfrac{a}{b} = \dfrac{c}{d}$.

> [!TEOREMA] **(Propriedade fundamental)** Em uma proporção, o produto dos meios é igual ao produto dos extremos: $\dfrac{a}{b} = \dfrac{c}{d} \iff ad = bc$. É a famosa "multiplicação cruzada".

$$\frac{3}{4} = \frac{x}{20} \;\Rightarrow\; 4x = 60 \;\Rightarrow\; x = 15$$

## 3. Grandezas diretamente e inversamente proporcionais

| Tipo | O que acontece | Relação | Exemplo |
|---|---|---|---|
| **Diretamente** proporcionais | uma dobra, a outra dobra | $\dfrac{y}{x} = k$ (constante) | quantidade e preço |
| **Inversamente** proporcionais | uma dobra, a outra cai pela metade | $x \cdot y = k$ (constante) | velocidade e tempo de viagem |

> [!ATENÇÃO] Nem tudo que "aumenta junto" é proporcional. Conta de luz com taxa fixa: dobrar o consumo **não** dobra a conta. Proporcional mesmo é só quando a razão é constante.

## 4. Regra de três simples

1. Monte uma tabela com as duas grandezas.
2. Decida se são **diretas** ou **inversas** (pergunte: "se uma aumenta, a outra aumenta ou diminui?").
3. Diretas: multiplicação cruzada. Inversas: multiplicação **em linha** (inverta uma das razões).

**Direta.** $3$ kg de café custam R\$ 54. Quanto custam $5$ kg?

| kg | R\$ |
|---|---|
| $3$ | $54$ |
| $5$ | $x$ |

Mais café, mais caro: direta. $3x = 5 \cdot 54 \Rightarrow x = 90$ reais.

**Inversa.** $6$ pedreiros fazem um muro em $10$ dias. Em quantos dias $4$ pedreiros fazem o mesmo muro?

Menos pedreiros, mais dias: inversa. $6 \cdot 10 = 4 \cdot x \Rightarrow x = 15$ dias.

> [!DICA] Na inversa, a quantidade "total de trabalho" (pedreiros × dias $= 60$) fica constante. Pensar assim evita decorar regra.

## 5. Regra de três composta

Com três ou mais grandezas, compare **cada uma** com a incógnita separadamente.

**Exemplo.** $5$ máquinas produzem $400$ peças em $8$ horas. Quantas peças $3$ máquinas produzem em $10$ horas?

- Máquinas × peças: mais máquinas, mais peças (direta).
- Horas × peças: mais horas, mais peças (direta).

$$\frac{400}{x} = \frac{5}{3} \cdot \frac{8}{10} = \frac{40}{30} \;\Rightarrow\; 40x = 12\,000 \;\Rightarrow\; x = 300 \text{ peças}$$

## 6. Porcentagem: os casos que confundem

**Aumentos e descontos sucessivos** multiplicam os fatores (não somam as taxas):

$$\text{aumento de } 10\% \text{ e depois } 10\%: \quad 1{,}1 \cdot 1{,}1 = 1{,}21 \;\to\; 21\% \text{ (não } 20\%)$$

**Valor original a partir do final:** divida pelo fator.

Depois de um aumento de $25\%$, um produto custa R\$ 150. Antes custava $150 \div 1{,}25 = 120$ reais.

> [!ATENÇÃO] Errado: tirar $25\%$ de $150$ ($= 112{,}50$). O $25\%$ era sobre o valor **antigo**, não sobre o novo.

**Variação percentual:** $\dfrac{\text{novo} - \text{antigo}}{\text{antigo}} \times 100\%$.

**Ponto percentual × porcentagem:** se a taxa de juros passou de $10\%$ para $12\%$, subiu **2 pontos percentuais**, ou seja, **20%** em relação à taxa anterior.

## 7. Juros simples e compostos

| | Juros simples | Juros compostos |
|---|---|---|
| Juros calculados sobre | sempre o capital inicial | o montante do período anterior |
| Montante | $M = C(1 + it)$ | $M = C(1 + i)^t$ |
| Crescimento | linear (reta) | exponencial |

$C$ = capital, $i$ = taxa por período (em decimal), $t$ = número de períodos.

**Exemplo.** R\$ 1.000 a $2\%$ ao mês, por $3$ meses:

- Simples: $1000(1 + 0{,}02 \cdot 3) = 1060$ reais.
- Compostos: $1000 \cdot 1{,}02^3 \approx 1061{,}21$ reais.

> [!ATENÇÃO] Taxa e tempo na **mesma unidade**: taxa mensal com tempo em meses. E $2\%$ entra como $0{,}02$.

> [!INTUIÇÃO] Juros simples crescem como uma função afim; juros compostos crescem como uma exponencial. Os dois tipos de função estão no livro **Funções**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Em $\dfrac{x}{6} = \dfrac{10}{15}$, quanto vale $x$?
- $9$
+ $4$
- $25$
- $2{,}5$
> $15x = 60$.

? Um carro faz $240$ km com $20$ L. Quantos litros gasta em $360$ km?
- $25$
+ $30$
- $13{,}3$
- $40$
> Direta: $240x = 360 \cdot 20$.

? $8$ torneiras enchem um tanque em $6$ horas. Em quanto tempo $12$ torneiras enchem o mesmo tanque?
- $9$ h
- $8$ h
+ $4$ h
- $3$ h
> Inversa: $8 \cdot 6 = 12x$.

? Dois aumentos sucessivos de $20\%$ equivalem a um aumento de:
- $40\%$
+ $44\%$
- $20\%$
- $42\%$
> $1{,}2 \cdot 1{,}2 = 1{,}44$.

? R\$ 2.000 a juros simples de $3\%$ ao mês por $5$ meses rendem quanto de juros?
- R\$ 30
- R\$ 150
+ R\$ 300
- R\$ 318,55
> $J = Cit = 2000 \cdot 0{,}03 \cdot 5$.
```

## 8. Exercícios

**1.** Em um mapa de escala $1 : 200\,000$, duas cidades estão a $7{,}5$ cm. Qual a distância real?

<details>
<summary>Ver solução</summary>

$7{,}5 \cdot 200\,000 = 1\,500\,000$ cm $= 15$ km.

</details>

**2.** Uma receita usa $3$ ovos para $4$ porções. Quantos ovos para $10$ porções?

<details>
<summary>Ver solução</summary>

Direta: $4x = 30 \Rightarrow x = 7{,}5$. Na prática, $7$ ou $8$ ovos.

</details>

**3.** A $80$ km/h uma viagem leva $3$ h. Quanto leva a $120$ km/h?

<details>
<summary>Ver solução</summary>

Inversa: $80 \cdot 3 = 120x \Rightarrow x = 2$ h.

</details>

**4.** Após um desconto de $20\%$, uma TV custa R\$ 1.600. Qual era o preço original?

<details>
<summary>Ver solução</summary>

$1600 \div 0{,}8 = 2000$ reais.

</details>

**5.** $4$ costureiras fazem $60$ camisas em $5$ dias. Quantas camisas $6$ costureiras fazem em $8$ dias?

<details>
<summary>Ver solução</summary>

Ambas diretas: $\frac{60}{x} = \frac{4}{6} \cdot \frac{5}{8} = \frac{20}{48}$. Então $20x = 2880$, $x = 144$ camisas.

</details>

**6.** Quanto rende R\$ 5.000 a juros compostos de $1\%$ ao mês em $2$ meses?

<details>
<summary>Ver solução</summary>

$5000 \cdot 1{,}01^2 = 5000 \cdot 1{,}0201 = 5100{,}50$. Juros: R\$ 100,50.

</details>
