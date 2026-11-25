# Produtos notáveis e fatoração

**Produto notável** é uma multiplicação que aparece tanto que vale a pena reconhecer de olho. **Fatoração** é o caminho inverso: transformar uma soma em multiplicação. É a ferramenta mais usada para simplificar frações algébricas e resolver limites.

> [!DICA] Use o simulador [Modelo de áreas](#/lab/areas) para **ver** cada fórmula como um quadrado ou retângulo recortado.

## 1. Os produtos notáveis

| Nome | Fórmula |
|---|---|
| Quadrado da soma | $(a + b)^2 = a^2 + 2ab + b^2$ |
| Quadrado da diferença | $(a - b)^2 = a^2 - 2ab + b^2$ |
| Produto da soma pela diferença | $(a + b)(a - b) = a^2 - b^2$ |
| Produto de Stevin | $(x + p)(x + q) = x^2 + (p + q)x + pq$ |
| Cubo da soma | $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ |
| Cubo da diferença | $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ |

> [!INTUIÇÃO] Um quadrado de lado $a + b$ se divide em quatro peças: um quadrado $a \times a$, um quadrado $b \times b$ e **dois** retângulos $a \times b$. Por isso aparece $2ab$, e por isso $(a + b)^2$ **não** é $a^2 + b^2$.

> [!DICA] Para lembrar o quadrado da soma: "o quadrado do primeiro, **mais duas vezes o primeiro vezes o segundo**, mais o quadrado do segundo".

**Exemplos.**

$$(x + 5)^2 = x^2 + 10x + 25 \qquad (2x - 3)^2 = 4x^2 - 12x + 9$$

$$(3x + 2)(3x - 2) = 9x^2 - 4 \qquad (x + 2)(x - 7) = x^2 - 5x - 14$$

> [!ATENÇÃO] $(x + 5)^2 \neq x^2 + 25$. Teste com $x = 1$: $36 \neq 26$.

## 2. Fatoração: os cinco casos

### Caso 1. Fator comum (sempre tente primeiro)

Coloque em evidência o que aparece em todos os termos (MDC dos coeficientes e menor potência de cada letra).

$$6x^3 - 9x^2 = 3x^2(2x - 3) \qquad ax + ay = a(x + y)$$

### Caso 2. Agrupamento

Agrupe de dois em dois e use o fator comum duas vezes.

$$ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b)$$

### Caso 3. Diferença de quadrados

$$a^2 - b^2 = (a + b)(a - b)$$

$x^2 - 9 = (x + 3)(x - 3)$; $4x^2 - 25 = (2x + 5)(2x - 5)$; $x^4 - 1 = (x^2 + 1)(x + 1)(x - 1)$.

> [!ATENÇÃO] A **soma** de quadrados $x^2 + 9$ não se fatora nos reais.

### Caso 4. Trinômio quadrado perfeito

Se o primeiro e o último termos são quadrados e o do meio é $\pm 2 \cdot$ (raiz do primeiro) $\cdot$ (raiz do último):

$$x^2 + 6x + 9 = (x + 3)^2 \qquad 4x^2 - 20x + 25 = (2x - 5)^2$$

### Caso 5. Trinômio $x^2 + Sx + P$ (soma e produto)

Procure dois números com **soma** $S$ e **produto** $P$.

$x^2 + 7x + 12$: soma $7$ e produto $12$ são $3$ e $4$. Logo, $(x + 3)(x + 4)$.

$x^2 - x - 6$: soma $-1$ e produto $-6$ são $-3$ e $2$. Logo, $(x - 3)(x + 2)$.

> [!DICA] Comece pelo **produto**: liste os pares de fatores de $P$ e veja qual dá a soma $S$. Se $P > 0$, os dois têm o mesmo sinal (o de $S$); se $P < 0$, sinais opostos.

Com coeficiente líder diferente de $1$, coloque-o em evidência ou use as raízes (capítulo 9): $ax^2 + bx + c = a(x - x_1)(x - x_2)$.

### Roteiro

1. Tem fator comum? Coloque em evidência.
2. Dois termos? Teste diferença de quadrados.
3. Três termos? Teste quadrado perfeito; senão, soma e produto.
4. Quatro termos? Agrupamento.
5. Fatore de novo cada fator, até não dar mais.

**Exemplo completo.** $2x^3 - 18x = 2x(x^2 - 9) = 2x(x + 3)(x - 3)$.

## 3. Frações algébricas

Simplificar uma fração algébrica = **fatorar** em cima e embaixo e cancelar **fatores** iguais.

$$\frac{x^2 - 9}{x^2 + 3x} = \frac{(x + 3)(x - 3)}{x(x + 3)} = \frac{x - 3}{x} \qquad (x \neq 0,\ x \neq -3)$$

> [!ATENÇÃO] Nunca cancele **parcelas**: em $\frac{x + 3}{x}$ não se corta o $x$. Só se cancela o que multiplica o numerador inteiro e o denominador inteiro.

Soma de frações algébricas: mesmo método das numéricas, com o MMC dos denominadores fatorados.

$$\frac{1}{x} + \frac{2}{x + 1} = \frac{(x + 1) + 2x}{x(x + 1)} = \frac{3x + 1}{x(x + 1)}$$

> [!INTUIÇÃO] No Cálculo, $\displaystyle\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$ dá $\frac00$ ao substituir. Fatorando, $\frac{(x+3)(x-3)}{x-3} = x + 3$, e o limite é $6$. Fatoração é a chave desse tipo de limite.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $(x - 4)^2$ é igual a:
- $x^2 - 16$
- $x^2 + 16$
+ $x^2 - 8x + 16$
- $x^2 - 4x + 16$
> Quadrado da diferença: $x^2 - 2 \cdot 4 \cdot x + 16$.

? A fatoração de $x^2 - 49$ é:
+ $(x + 7)(x - 7)$
- $(x - 7)^2$
- $(x + 7)^2$
- não se fatora
> Diferença de quadrados.

? A fatoração de $x^2 + 2x - 15$ é:
- $(x + 3)(x - 5)$
+ $(x + 5)(x - 3)$
- $(x - 5)(x - 3)$
- $(x + 15)(x - 1)$
> Soma $2$ e produto $-15$: $5$ e $-3$.

? Simplificando $\dfrac{3x^2 + 6x}{3x}$ (para $x \neq 0$):
- $x + 6x$
+ $x + 2$
- $3x + 2$
- $x^2 + 2$
> $\frac{3x(x + 2)}{3x} = x + 2$.

? Qual das igualdades é **verdadeira** para todo $x$?
- $(x + 1)^2 = x^2 + 1$
- $\dfrac{x + 2}{x} = 2$
+ $x^2 - 1 = (x - 1)(x + 1)$
- $\sqrt{x^2 + 9} = x + 3$
> As outras três são erros clássicos.
```

## 4. Exercícios

**1.** Desenvolva $(2a + 3b)^2$ e $(x^2 - 1)(x^2 + 1)$.

<details>
<summary>Ver solução</summary>

$4a^2 + 12ab + 9b^2$ e $x^4 - 1$.

</details>

**2.** Fatore completamente $3x^2 - 12$.

<details>
<summary>Ver solução</summary>

$3(x^2 - 4) = 3(x + 2)(x - 2)$.

</details>

**3.** Fatore $x^3 - 2x^2 - 3x$.

<details>
<summary>Ver solução</summary>

$x(x^2 - 2x - 3) = x(x - 3)(x + 1)$.

</details>

**4.** Fatore $x^3 + x^2 - 4x - 4$ por agrupamento.

<details>
<summary>Ver solução</summary>

$x^2(x + 1) - 4(x + 1) = (x + 1)(x^2 - 4) = (x + 1)(x + 2)(x - 2)$.

</details>

**5.** Simplifique $\dfrac{x^2 - 4x + 4}{x^2 - 4}$.

<details>
<summary>Ver solução</summary>

$\frac{(x - 2)^2}{(x + 2)(x - 2)} = \frac{x - 2}{x + 2}$, para $x \neq \pm 2$.

</details>

**6.** Calcule $101^2 - 99^2$ sem calculadora.

<details>
<summary>Ver solução</summary>

$(101 + 99)(101 - 99) = 200 \cdot 2 = 400$.

</details>
