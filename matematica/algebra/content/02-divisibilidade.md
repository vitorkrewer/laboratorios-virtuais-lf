# Múltiplos, divisores, MMC e MDC

Este capítulo parece "coisa de escola", mas é a ferramenta que faz frações (e, depois, frações algébricas) ficarem fáceis. O MMC dá o denominador comum; o MDC simplifica.

## 1. Múltiplos e divisores

- Os **múltiplos** de $6$ são $0, 6, 12, 18, 24, \ldots$ (a tabuada do 6).
- Os **divisores** de $12$ são $1, 2, 3, 4, 6, 12$: os números que dividem $12$ sem deixar resto.

$a$ é divisor de $b$ (e $b$ é múltiplo de $a$) quando a divisão $b \div a$ é exata.

### Critérios de divisibilidade

| Divisível por | Quando |
|---|---|
| $2$ | termina em $0, 2, 4, 6$ ou $8$ |
| $3$ | a soma dos algarismos é divisível por $3$ |
| $4$ | os dois últimos algarismos formam número divisível por $4$ |
| $5$ | termina em $0$ ou $5$ |
| $6$ | é divisível por $2$ **e** por $3$ |
| $9$ | a soma dos algarismos é divisível por $9$ |
| $10$ | termina em $0$ |

**Exemplo.** $2\,346$: soma dos algarismos $= 15$, divisível por $3$; termina em $6$, divisível por $2$. Logo, é divisível por $6$.

## 2. Números primos

> [!DEFINIÇÃO] Um número natural maior que $1$ é **primo** se tem **exatamente dois** divisores: $1$ e ele mesmo.

Primos até 50: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47$.

> [!ATENÇÃO] $1$ **não** é primo (tem um divisor só). E $2$ é o **único** primo par.

> [!TEOREMA] **(Fatoração em primos)** Todo número natural maior que $1$ se escreve, de modo único, como produto de primos.

**Exemplo.** $360 = 2^3 \cdot 3^2 \cdot 5$. Divida sucessivamente pelo menor primo possível:

| Número | Primo |
|---|---|
| $360$ | $2$ |
| $180$ | $2$ |
| $90$ | $2$ |
| $45$ | $3$ |
| $15$ | $3$ |
| $5$ | $5$ |
| $1$ | |

## 3. MMC: mínimo múltiplo comum

> [!DEFINIÇÃO] O **MMC** de dois ou mais números é o **menor** número positivo que é múltiplo de todos eles.

**Pela fatoração:** pegue **todos** os primos que aparecem, cada um com o **maior** expoente.

**Exemplo.** $12 = 2^2 \cdot 3$ e $18 = 2 \cdot 3^2$. Então $\text{mmc}(12, 18) = 2^2 \cdot 3^2 = 36$.

**Uso:** somar frações. $\frac{5}{12} + \frac{1}{18}$ usa o denominador comum $36$.

## 4. MDC: máximo divisor comum

> [!DEFINIÇÃO] O **MDC** é o **maior** número que divide todos eles.

**Pela fatoração:** pegue só os primos **comuns**, cada um com o **menor** expoente.

**Exemplo.** $\text{mdc}(12, 18) = 2 \cdot 3 = 6$.

**Uso:** simplificar frações. $\frac{12}{18} = \frac{12 \div 6}{18 \div 6} = \frac{2}{3}$.

> [!DICA] Para dois números, vale $\text{mmc}(a, b) \cdot \text{mdc}(a, b) = a \cdot b$. Confira: $36 \cdot 6 = 216 = 12 \cdot 18$.

### Problemas típicos

- **"Quando voltam a coincidir?"** é MMC. Um ônibus passa a cada $12$ minutos e outro a cada $18$: saindo juntos, voltam a coincidir em $36$ minutos.
- **"Maior tamanho possível para dividir em partes iguais"** é MDC. Cortar fitas de $12$ m e $18$ m em pedaços iguais, do maior tamanho possível, sem sobra: pedaços de $6$ m.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual destes números é primo?
- $1$
- $21$
+ $23$
- $27$
> $21 = 3 \cdot 7$ e $27 = 3^3$; $1$ não é primo.

? $\text{mmc}(8, 12)$ é:
- $4$
+ $24$
- $48$
- $96$
> $8 = 2^3$ e $12 = 2^2 \cdot 3$: maiores expoentes, $2^3 \cdot 3 = 24$.

? $\text{mdc}(30, 45)$ é:
+ $15$
- $5$
- $90$
- $3$
> $30 = 2 \cdot 3 \cdot 5$ e $45 = 3^2 \cdot 5$: comuns com menor expoente, $3 \cdot 5$.

? O número $5\,124$ é divisível por:
- $5$
+ $3$
- $9$
- $10$
> Soma dos algarismos: $12$, divisível por $3$ mas não por $9$. Não termina em $0$ ou $5$.

? Dois faróis piscam a cada $6$ s e $10$ s. Se piscaram juntos agora, em quantos segundos piscam juntos de novo?
- $16$
- $60$
+ $30$
- $2$
> É o $\text{mmc}(6, 10) = 30$.
```

## 5. Exercícios

**1.** Fatore $84$ em primos.

<details>
<summary>Ver solução</summary>

$84 = 2^2 \cdot 3 \cdot 7$.

</details>

**2.** Calcule $\text{mmc}(15, 20, 6)$.

<details>
<summary>Ver solução</summary>

$15 = 3 \cdot 5$, $20 = 2^2 \cdot 5$, $6 = 2 \cdot 3$. MMC $= 2^2 \cdot 3 \cdot 5 = 60$.

</details>

**3.** Simplifique $\dfrac{84}{126}$ ao máximo.

<details>
<summary>Ver solução</summary>

$126 = 2 \cdot 3^2 \cdot 7$; $\text{mdc}(84, 126) = 2 \cdot 3 \cdot 7 = 42$. Logo, $\frac{84}{126} = \frac{2}{3}$.

</details>

**4.** Uma loja tem $48$ canetas azuis e $72$ pretas e quer montar kits iguais, com o maior número possível de kits, sem sobras. Quantos kits e o que vai em cada um?

<details>
<summary>Ver solução</summary>

$\text{mdc}(48, 72) = 24$ kits, cada um com $2$ azuis e $3$ pretas.

</details>
