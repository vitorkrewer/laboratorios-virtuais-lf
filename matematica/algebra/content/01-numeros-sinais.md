# Números, sinais e ordem das operações

Se faz tempo que você não estuda matemática, comece aqui. Quase todo erro em Cálculo nasce de três coisas deste capítulo: **regra de sinais**, **ordem das operações** e **distributiva**. Vale ir devagar.

> [!DICA] Faça cada exemplo no papel antes de ler a resolução. E use o [treino](#/lab/treino) com o tema "Sinais e ordem das operações" até acertar dez seguidas.

## 1. Os números inteiros e a reta

Os **inteiros** são $\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots$ Na reta numérica, os negativos ficam à esquerda do zero.

- O **oposto** (ou simétrico) de um número tem o sinal trocado: o oposto de $5$ é $-5$, e o de $-5$ é $5$. Um número somado ao seu oposto dá zero.
- O **valor absoluto** (módulo) é a distância até o zero: $|-5| = 5$.

> [!INTUIÇÃO] Pense em dinheiro: $+50$ é ter 50 reais, $-50$ é dever 50. Ou em temperatura: $-3\,°C$ é mais frio que $2\,°C$, então $-3 < 2$.

## 2. Soma e subtração com sinais

- **Sinais iguais:** some os valores e mantenha o sinal. $(-3) + (-4) = -7$.
- **Sinais diferentes:** subtraia os valores e fique com o sinal do maior (em valor absoluto). $(-7) + 4 = -3$; $7 + (-4) = 3$.
- **Subtrair é somar o oposto:** $5 - (-2) = 5 + 2 = 7$.

> [!INTUIÇÃO] Saldo bancário: deve 3 e gasta mais 4, passa a dever 7. Deve 7 e recebe 4, ainda deve 3. "Tirar uma dívida" ($-(-2)$) é o mesmo que ganhar.

## 3. Multiplicação e divisão com sinais

> [!TEOREMA] **(Regra de sinais)** Sinais **iguais** dão resultado **positivo**; sinais **diferentes** dão **negativo**.

| | $+$ | $-$ |
|---|---|---|
| $+$ | $+$ | $-$ |
| $-$ | $-$ | $+$ |

$(-3)(-4) = 12$; $(-12) \div 3 = -4$; $(-2)(-2)(-2) = -8$ (três negativos: o resultado é negativo).

> [!DICA] Em um produto, conte os sinais de menos: quantidade **par** dá positivo, quantidade **ímpar** dá negativo.

> [!ATENÇÃO] A regra "menos com menos dá mais" vale para **multiplicação e divisão**. Na soma, $-3 - 4 = -7$, que é negativo.

## 4. Ordem das operações

1. **Parênteses** (depois colchetes e chaves, de dentro para fora).
2. **Potências e raízes.**
3. **Multiplicações e divisões**, na ordem em que aparecem, da esquerda para a direita.
4. **Somas e subtrações**, da esquerda para a direita.

**Exemplos.**

$$2 + 3 \cdot 4 = 2 + 12 = 14 \qquad (2 + 3) \cdot 4 = 20 \qquad 20 \div 4 \cdot 5 = 5 \cdot 5 = 25$$

$$-3^2 = -9 \qquad (-3)^2 = 9 \qquad 10 - 2 \cdot (3 - 5)^2 = 10 - 2 \cdot 4 = 2$$

> [!ATENÇÃO] Em $-3^2$, a potência vem **antes** do sinal: é $-(3^2) = -9$. Para elevar o $-3$, escreva $(-3)^2$.

## 5. Propriedades que você usará o tempo todo

| Propriedade | Soma | Multiplicação |
|---|---|---|
| Comutativa | $a + b = b + a$ | $ab = ba$ |
| Associativa | $(a + b) + c = a + (b + c)$ | $(ab)c = a(bc)$ |
| Elemento neutro | $a + 0 = a$ | $a \cdot 1 = a$ |
| Oposto / inverso | $a + (-a) = 0$ | $a \cdot \frac{1}{a} = 1$ $(a \neq 0)$ |

> [!DEFINIÇÃO] **(Distributiva)** $a(b + c) = ab + ac$. O número de fora multiplica **cada** parcela de dentro.

**Exemplos.** $3(x + 4) = 3x + 12$; $-2(x - 5) = -2x + 10$; $-(a - b) = -a + b$.

> [!ATENÇÃO] O erro mais comum: $-2(x - 5) = -2x - 10$. O $-2$ multiplica o $-5$ também: $(-2)(-5) = +10$.

**Divisão por zero não existe.** $\frac{5}{0}$ não tem valor: não há número que, multiplicado por $0$, dê $5$. Já $\frac{0}{5} = 0$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Quanto vale $-8 + 3$?
- $-11$
+ $-5$
- $5$
- $11$
> Sinais diferentes: $8 - 3 = 5$, com o sinal do maior ($-8$).

? Quanto vale $(-6) \cdot (-7)$?
- $-42$
- $-13$
+ $42$
- $13$
> Sinais iguais na multiplicação: positivo.

? Quanto vale $5 - 2 \cdot 3$?
- $9$
+ $-1$
- $1$
- $-9$
> Multiplicação primeiro: $5 - 6 = -1$.

? Quanto vale $-2^4$?
+ $-16$
- $16$
- $-8$
- $8$
> A potência vem antes do sinal: $-(2^4) = -16$.

? Aplicando a distributiva, $-3(2x - 4)$ é igual a:
- $-6x - 12$
+ $-6x + 12$
- $6x - 12$
- $-6x - 4$
> $(-3)(2x) = -6x$ e $(-3)(-4) = +12$.
```

## 6. Exercícios

**1.** Calcule $-15 + 8 - (-4) - 6$.

<details>
<summary>Ver solução</summary>

$-15 + 8 + 4 - 6 = -9$.

</details>

**2.** Calcule $\dfrac{(-24) \div (-3) + 2 \cdot (-5)}{-2}$.

<details>
<summary>Ver solução</summary>

Numerador: $8 + (-10) = -2$. Então $\frac{-2}{-2} = 1$.

</details>

**3.** Calcule $3 - [2 - (5 - 8)] \cdot 2$.

<details>
<summary>Ver solução</summary>

De dentro para fora: $5 - 8 = -3$; $2 - (-3) = 5$; $5 \cdot 2 = 10$; $3 - 10 = -7$.

</details>

**4.** Simplifique $4(x - 2) - 3(2x - 5)$.

<details>
<summary>Ver solução</summary>

$4x - 8 - 6x + 15 = -2x + 7$.

</details>

**5.** Quanto vale $(-1)^{7} + (-1)^{10}$?

<details>
<summary>Ver solução</summary>

Expoente ímpar dá $-1$; expoente par dá $1$. Soma: $0$.

</details>
