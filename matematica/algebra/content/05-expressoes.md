# Expressões algébricas e polinômios

Álgebra é aritmética com letras. A letra guarda o lugar de um número que você ainda não conhece, ou que pode variar. Todas as regras dos capítulos 1 a 4 continuam valendo.

## 1. Linguagem algébrica

| Em palavras | Em símbolos |
|---|---|
| o dobro de um número | $2x$ |
| um número mais 5 | $x + 5$ |
| o quadrado de um número | $x^2$ |
| a metade de um número menos 3 | $\frac{x}{2} - 3$ |
| a metade de (um número menos 3) | $\frac{x - 3}{2}$ |
| dois números consecutivos | $n$ e $n + 1$ |
| um número par / ímpar | $2n$ / $2n + 1$ |

> [!DICA] Escrever $2x$ é o mesmo que $2 \cdot x$. Entre letras e números, o sinal de vezes fica implícito: $3ab = 3 \cdot a \cdot b$.

## 2. Valor numérico

Substitua a letra pelo número, **sempre entre parênteses**, e calcule.

**Exemplo.** $E = 2x^2 - 3x + 1$ para $x = -2$:

$$E = 2(-2)^2 - 3(-2) + 1 = 2 \cdot 4 + 6 + 1 = 15$$

> [!ATENÇÃO] Sem os parênteses, $-2^2$ viraria $-4$ e a conta sairia errada. Esse erro é responsável por boa parte das questões perdidas em provas de Cálculo.

## 3. Termos e termos semelhantes

Em $5x^2y$, o número $5$ é o **coeficiente** e $x^2y$ é a **parte literal**.

**Termos semelhantes** têm a mesma parte literal (mesmas letras com os mesmos expoentes): $3x^2$ e $-7x^2$ são semelhantes; $3x^2$ e $3x$ não são.

> [!TEOREMA] Só se somam termos semelhantes: somam-se os coeficientes e mantém-se a parte literal.

$$3x^2 + 5x - x^2 + 2x - 4 = 2x^2 + 7x - 4$$

> [!ATENÇÃO] $2x + 3y$ não vira $5xy$, e $x + x$ é $2x$ (não $x^2$). Já $x \cdot x = x^2$.

## 4. Polinômios

Um **polinômio** em $x$ é uma soma de termos do tipo $a x^n$, com $n$ natural:

$$P(x) = 4x^3 - 2x^2 + x - 7$$

- **Grau:** o maior expoente (aqui, $3$).
- **Coeficiente líder:** o que acompanha a maior potência ($4$).
- **Termo independente:** o que não tem $x$ ($-7$), igual a $P(0)$.

Escreva sempre em ordem decrescente dos expoentes. Isso evita esquecer termos.

### Soma e subtração

Some os semelhantes. Na subtração, troque o sinal de **todos** os termos do segundo polinômio:

$$(3x^2 - 2x + 5) - (x^2 - 4x - 1) = 3x^2 - 2x + 5 - x^2 + 4x + 1 = 2x^2 + 2x + 6$$

### Multiplicação

Distributiva: cada termo de um multiplica **cada** termo do outro.

$$(2x + 3)(x - 4) = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12$$

$$(x + 1)(x^2 - x + 1) = x^3 - x^2 + x + x^2 - x + 1 = x^3 + 1$$

> [!DICA] Confira o resultado com um número qualquer. Para $x = 1$: $(2 + 3)(1 - 4) = -15$ e $2 - 5 - 12 = -15$. Se não bater, há erro.

### Divisão por monômio

Divida cada termo: $\dfrac{6x^3 - 4x^2 + 2x}{2x} = 3x^2 - 2x + 1$ (para $x \neq 0$).

A divisão de polinômio por polinômio (chave, Briot-Ruffini) está no livro **Funções**, capítulo de polinomiais.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual o valor de $x^2 - 3x$ para $x = -1$?
- $-4$
- $-2$
+ $4$
- $2$
> $(-1)^2 - 3(-1) = 1 + 3 = 4$.

? Reduzindo $5a - 2b + 3a + b$, obtemos:
+ $8a - b$
- $8a - 3b$
- $7ab$
- $8a + b$
> Some só os semelhantes: $5a + 3a$ e $-2b + b$.

? "O triplo de um número diminuído de 4" se escreve:
- $3(x - 4)$
+ $3x - 4$
- $x^3 - 4$
- $3 - 4x$
> O triplo é calculado primeiro e depois se subtrai $4$. Com parênteses seria "o triplo de (um número menos 4)".

? $(x + 2)(x - 5)$ é igual a:
- $x^2 - 10$
+ $x^2 - 3x - 10$
- $x^2 + 3x - 10$
- $x^2 - 7x - 10$
> $x^2 - 5x + 2x - 10$.

? Qual o grau de $P(x) = 7 - 2x^4 + x^2$?
- $7$
- $2$
+ $4$
- $1$
> O maior expoente de $x$ é $4$.
```

## 5. Exercícios

**1.** Calcule o valor de $\dfrac{a^2 - b}{2a}$ para $a = -3$ e $b = 5$.

<details>
<summary>Ver solução</summary>

$\frac{9 - 5}{-6} = \frac{4}{-6} = -\frac{2}{3}$.

</details>

**2.** Simplifique $2(x^2 - 3x) - (x^2 + x - 4)$.

<details>
<summary>Ver solução</summary>

$2x^2 - 6x - x^2 - x + 4 = x^2 - 7x + 4$.

</details>

**3.** Calcule $(3x - 1)(2x^2 + x - 2)$.

<details>
<summary>Ver solução</summary>

$6x^3 + 3x^2 - 6x - 2x^2 - x + 2 = 6x^3 + x^2 - 7x + 2$.

</details>

**4.** Escreva a expressão do perímetro e da área de um retângulo de lados $x + 3$ e $2x$.

<details>
<summary>Ver solução</summary>

Perímetro: $2(x + 3) + 2(2x) = 6x + 6$. Área: $2x(x + 3) = 2x^2 + 6x$.

</details>

**5.** A soma de três números consecutivos é $48$. Escreva a expressão da soma e descubra os números.

<details>
<summary>Ver solução</summary>

$n + (n + 1) + (n + 2) = 3n + 3 = 48$, então $n = 15$: os números são $15, 16, 17$.

</details>
