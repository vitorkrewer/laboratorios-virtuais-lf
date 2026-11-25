# Equações do 2º grau

Uma equação do 2º grau tem a forma

$$ax^2 + bx + c = 0 \qquad (a \neq 0)$$

e pode ter duas, uma ou nenhuma solução real. Antes da fórmula de Bhaskara, vale conhecer os atalhos: muitas equações se resolvem em uma linha.

## 1. Equações incompletas

**Sem termo independente ($c = 0$):** fatore o $x$.

$$x^2 - 5x = 0 \;\Rightarrow\; x(x - 5) = 0 \;\Rightarrow\; x = 0 \text{ ou } x = 5$$

> [!TEOREMA] **(Produto nulo)** Se $A \cdot B = 0$, então $A = 0$ ou $B = 0$. É o motivo de fatorar ser tão útil para resolver equações.

> [!ATENÇÃO] Não divida os dois lados por $x$: você perderia a solução $x = 0$.

**Sem termo em $x$ ($b = 0$):** isole $x^2$.

$$2x^2 - 18 = 0 \;\Rightarrow\; x^2 = 9 \;\Rightarrow\; x = \pm 3 \qquad\qquad x^2 + 4 = 0 \;\Rightarrow\; x^2 = -4 \text{ (sem solução real)}$$

## 2. Por fatoração (soma e produto)

Se o trinômio se fatora (capítulo 6), use o produto nulo.

$$x^2 - 7x + 10 = 0 \;\Rightarrow\; (x - 2)(x - 5) = 0 \;\Rightarrow\; x = 2 \text{ ou } x = 5$$

> [!TEOREMA] **(Soma e produto)** As raízes de $ax^2 + bx + c = 0$ satisfazem $x_1 + x_2 = -\dfrac{b}{a}$ e $x_1 \cdot x_2 = \dfrac{c}{a}$.

Com $a = 1$: procure dois números com soma $-b$ e produto $c$. Em $x^2 - 7x + 10$: soma $7$, produto $10$, ou seja, $2$ e $5$.

## 3. Completar o quadrado

É de onde vem Bhaskara, e volta no Cálculo e em Geometria Analítica (círculos e parábolas).

$$x^2 + 6x - 7 = 0 \;\Rightarrow\; x^2 + 6x + 9 = 7 + 9 \;\Rightarrow\; (x + 3)^2 = 16 \;\Rightarrow\; x + 3 = \pm 4$$

Logo, $x = 1$ ou $x = -7$.

> [!DICA] Para completar o quadrado de $x^2 + bx$, some $\left(\frac{b}{2}\right)^2$ dos dois lados: metade do coeficiente de $x$, ao quadrado.

## 4. A fórmula de Bhaskara

> [!TEOREMA] As soluções de $ax^2 + bx + c = 0$ são
> $$x = \frac{-b \pm \sqrt{\Delta}}{2a}, \qquad \Delta = b^2 - 4ac.$$

| Discriminante | Soluções reais |
|---|---|
| $\Delta > 0$ | duas, diferentes |
| $\Delta = 0$ | uma (raiz dupla) |
| $\Delta < 0$ | nenhuma |

**Exemplo.** $2x^2 - 3x - 2 = 0$: $a = 2$, $b = -3$, $c = -2$.

$$\Delta = (-3)^2 - 4 \cdot 2 \cdot (-2) = 9 + 16 = 25 \qquad x = \frac{3 \pm 5}{4} \;\Rightarrow\; x_1 = 2,\ x_2 = -\frac{1}{2}$$

> [!ATENÇÃO] Três erros clássicos: (1) usar $b$ em vez de $-b$ no começo; (2) calcular $-3^2$ em vez de $(-3)^2$; (3) esquecer que o $2a$ divide **tudo**, e não só a raiz.

> [!DICA] Antes de usar Bhaskara, ponha a equação na forma $\ldots = 0$ e, se der, divida tudo por um fator comum. $4x^2 - 8x + 4 = 0$ vira $x^2 - 2x + 1 = 0$, que é $(x - 1)^2 = 0$.

### Forma fatorada

Conhecendo as raízes, $ax^2 + bx + c = a(x - x_1)(x - x_2)$. Do exemplo: $2x^2 - 3x - 2 = 2(x - 2)\left(x + \frac12\right) = (x - 2)(2x + 1)$.

## 5. Equações que viram do 2º grau

**Biquadradas** ($ax^4 + bx^2 + c = 0$): troque $y = x^2$.

$$x^4 - 5x^2 + 4 = 0 \;\to\; y^2 - 5y + 4 = 0 \;\to\; y = 1 \text{ ou } y = 4 \;\to\; x = \pm 1 \text{ ou } x = \pm 2$$

**Com $x$ no denominador:** multiplique pelo MMC e **descarte** valores que zeram um denominador.

$$\frac{6}{x} = x - 1 \;\Rightarrow\; 6 = x^2 - x \;\Rightarrow\; x^2 - x - 6 = 0 \;\Rightarrow\; x = 3 \text{ ou } x = -2$$

## 6. Problemas

**Exemplo.** Um retângulo tem área $40$ m² e um lado $3$ m maior que o outro. Medidas?

$x(x + 3) = 40 \Rightarrow x^2 + 3x - 40 = 0 \Rightarrow (x + 8)(x - 5) = 0$. Como medida não é negativa, $x = 5$: lados de $5$ m e $8$ m.

> [!DICA] Em problemas, sempre confira se as duas raízes fazem sentido. Comprimento, tempo e quantidade negativos costumam ser descartados.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? As soluções de $x^2 - 16 = 0$ são:
- só $x = 4$
+ $x = 4$ e $x = -4$
- $x = 8$ e $x = -8$
- não há soluções reais
> $x^2 = 16 \Rightarrow x = \pm 4$.

? As soluções de $x^2 + 3x = 0$ são:
+ $x = 0$ e $x = -3$
- só $x = -3$
- $x = 0$ e $x = 3$
- só $x = 3$
> $x(x + 3) = 0$.

? Em $x^2 - 4x + 5 = 0$, o discriminante vale:
- $36$
- $4$
+ $-4$
- $0$
> $16 - 20 = -4$: nenhuma raiz real.

? As raízes de $x^2 - 5x + 6 = 0$ são:
- $-2$ e $-3$
+ $2$ e $3$
- $1$ e $6$
- $-1$ e $6$
> Soma $5$ e produto $6$.

? Se as raízes de $x^2 + bx + c = 0$ são $1$ e $4$, quanto vale $c$?
- $5$
- $-5$
+ $4$
- $-4$
> Produto das raízes $= c/a = c$.
```

## 7. Exercícios

**1.** Resolva $3x^2 - 12x = 0$.

<details>
<summary>Ver solução</summary>

$3x(x - 4) = 0$: $x = 0$ ou $x = 4$.

</details>

**2.** Resolva $x^2 - 2x - 15 = 0$ por soma e produto e confira com Bhaskara.

<details>
<summary>Ver solução</summary>

Soma $2$, produto $-15$: $5$ e $-3$. Bhaskara: $\Delta = 4 + 60 = 64$; $x = \frac{2 \pm 8}{2}$, ou seja, $5$ e $-3$.

</details>

**3.** Resolva $3x^2 + x - 2 = 0$.

<details>
<summary>Ver solução</summary>

$\Delta = 1 + 24 = 25$; $x = \frac{-1 \pm 5}{6}$: $x = \frac23$ ou $x = -1$.

</details>

**4.** Resolva completando o quadrado: $x^2 - 8x + 7 = 0$.

<details>
<summary>Ver solução</summary>

$x^2 - 8x + 16 = -7 + 16 \Rightarrow (x - 4)^2 = 9 \Rightarrow x - 4 = \pm 3$: $x = 7$ ou $x = 1$.

</details>

**5.** Resolva $x^4 - 13x^2 + 36 = 0$.

<details>
<summary>Ver solução</summary>

$y = x^2$: $y^2 - 13y + 36 = 0 \Rightarrow y = 4$ ou $y = 9$. Logo, $x = \pm 2$ ou $x = \pm 3$.

</details>

**6.** Para que valor de $k$ a equação $x^2 - 6x + k = 0$ tem uma única raiz (dupla)?

<details>
<summary>Ver solução</summary>

$\Delta = 36 - 4k = 0 \Rightarrow k = 9$. A raiz é $x = 3$.

</details>
