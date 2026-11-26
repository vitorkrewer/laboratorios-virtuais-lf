# Mais técnicas de integração

O Cálculo I apresentou a substituição e a integração por partes. Duas famílias de integrais ainda resistem a elas: **frações de polinômios** e **raízes de expressões quadráticas**. Este capítulo fecha a caixa de ferramentas com frações parciais e substituição trigonométrica, e dá um roteiro para escolher o método.

> [!DICA] Revise antes [Substituição](../calculo-1/#/teoria/primitivas-substituicao) e [Integração por partes](../calculo-1/#/teoria/integracao-por-partes) no livro Cálculo I. Elas continuam sendo as mais usadas.

## 1. Frações parciais

Serve para integrar $\dfrac{P(x)}{Q(x)}$ (quociente de polinômios). A ideia: quebrar uma fração complicada numa soma de frações simples, cada uma com primitiva conhecida.

**Passo 0.** Se o grau de $P$ é maior ou igual ao de $Q$, faça antes a **divisão de polinômios**.

**Passo 1.** Fatore o denominador. Para cada tipo de fator, escreva:

| Fator de $Q(x)$ | Parcelas |
|---|---|
| linear $(x - a)$ | $\dfrac{A}{x - a}$ |
| linear repetido $(x - a)^2$ | $\dfrac{A}{x - a} + \dfrac{B}{(x - a)^2}$ |
| quadrático irredutível $x^2 + bx + c$ | $\dfrac{Ax + B}{x^2 + bx + c}$ |

**Passo 2.** Ache as constantes (multiplique tudo pelo denominador e escolha valores convenientes de $x$, ou compare coeficientes).

**Exemplo.**
$$\int \frac{x + 5}{x^2 + x - 2}\,dx, \qquad x^2 + x - 2 = (x - 1)(x + 2)$$

$$\frac{x + 5}{(x - 1)(x + 2)} = \frac{A}{x - 1} + \frac{B}{x + 2} \;\Rightarrow\; x + 5 = A(x + 2) + B(x - 1)$$

Com $x = 1$: $6 = 3A$, $A = 2$. Com $x = -2$: $3 = -3B$, $B = -1$. Logo

$$\int \frac{x + 5}{x^2 + x - 2}\,dx = 2\ln|x - 1| - \ln|x + 2| + C.$$

> [!DICA] Escolher para $x$ as **raízes** do denominador zera todos os termos menos um: é o jeito mais rápido de achar as constantes dos fatores lineares.

**Exemplo com fator repetido.** $\dfrac{1}{x^2(x - 1)} = \dfrac{A}{x} + \dfrac{B}{x^2} + \dfrac{C}{x - 1}$ dá $A = -1$, $B = -1$, $C = 1$, e a primitiva é $-\ln|x| + \frac{1}{x} + \ln|x - 1| + C$.

## 2. Substituição trigonométrica

Para raízes de $a^2 - x^2$, $a^2 + x^2$ ou $x^2 - a^2$, uma substituição trigonométrica transforma a raiz numa expressão sem raiz, graças às identidades $1 - \sin^2\theta = \cos^2\theta$ e $1 + \tan^2\theta = \sec^2\theta$.

| Expressão | Substituição | Identidade usada |
|---|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta$ | $a^2 - a^2\sin^2\theta = a^2\cos^2\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta$ | $a^2 + a^2\tan^2\theta = a^2\sec^2\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta$ | $a^2\sec^2\theta - a^2 = a^2\tan^2\theta$ |

**Exemplo.** $\displaystyle\int \frac{dx}{\sqrt{4 - x^2}}$: com $x = 2\sin\theta$, $dx = 2\cos\theta\,d\theta$ e $\sqrt{4 - x^2} = 2\cos\theta$.

$$\int \frac{2\cos\theta}{2\cos\theta}\,d\theta = \theta + C = \arcsin\frac{x}{2} + C$$

> [!INTUIÇÃO] Desenhe um triângulo retângulo com os lados que a substituição sugere (para $x = a\sin\theta$: hipotenusa $a$, cateto oposto $x$). Ele permite voltar de $\theta$ para $x$ no final.

**Exemplo clássico: a área do círculo.** $\displaystyle\int_{-r}^{r} 2\sqrt{r^2 - x^2}\,dx$ com $x = r\sin\theta$ vira $\displaystyle\int_{-\pi/2}^{\pi/2} 2r^2\cos^2\theta\,d\theta = \pi r^2$.

## 3. Roteiro: qual método usar

1. Existe primitiva imediata (tabela)? Use.
2. Aparece uma função **e a sua derivada** (a menos de constante)? **Substituição**.
3. Produto de tipos diferentes ($x\,e^x$, $x\ln x$, $e^x\sin x$)? **Por partes** (LIATE para escolher $u$).
4. Fração de polinômios? **Frações parciais** (dividindo antes, se preciso).
5. Raiz de expressão quadrática? **Substituição trigonométrica** (ou complete o quadrado antes).
6. Potências de seno e cosseno? Identidades: $\sin^2 x = \frac{1 - \cos 2x}{2}$, $\cos^2 x = \frac{1 + \cos 2x}{2}$.

> [!ATENÇÃO] Nem toda função elementar tem primitiva elementar: $\int e^{-x^2}\,dx$ e $\int \frac{\sin x}{x}\,dx$ não se escrevem com as funções usuais. Para elas, usam-se séries (capítulo 5) ou métodos numéricos.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Para $\int \frac{3}{(x - 2)(x + 1)}\,dx$, o método indicado é:
- por partes
+ frações parciais
- substituição trigonométrica
- primitiva imediata
> Fração de polinômios com denominador fatorado.

? Em $\frac{1}{(x + 3)^2}$ como parte de uma decomposição, as parcelas para o fator $(x + 3)^2$ são:
- só $\frac{A}{x + 3}$
- só $\frac{B}{(x + 3)^2}$
+ $\frac{A}{x + 3} + \frac{B}{(x + 3)^2}$
- $\frac{Ax + B}{(x + 3)^2}$ apenas para fatores quadráticos
> Fator linear repetido gera uma parcela para cada potência.

? Para $\int \sqrt{9 - x^2}\,dx$, a substituição adequada é:
+ $x = 3\sin\theta$
- $x = 3\tan\theta$
- $x = 3\sec\theta$
- $u = 9 - x^2$
> Forma $a^2 - x^2$.

? $\int \frac{dx}{x^2 + 1}$ vale:
- $\ln(x^2 + 1) + C$
+ $\arctan x + C$
- $\frac{1}{2x} + C$
- $\arcsin x + C$
> Primitiva imediata (ou $x = \tan\theta$).

? Antes de usar frações parciais em $\frac{x^3}{x^2 - 1}$, é preciso:
- derivar
+ dividir os polinômios
- substituir $x = \sin\theta$
- nada
> O grau do numerador é maior que o do denominador.
```

## 4. Exercícios

**1.** Calcule $\displaystyle\int \frac{5x - 4}{x^2 - x - 2}\,dx$.

<details>
<summary>Ver solução</summary>

$x^2 - x - 2 = (x - 2)(x + 1)$. $5x - 4 = A(x + 1) + B(x - 2)$: com $x = 2$, $A = 2$; com $x = -1$, $B = 3$. Resultado: $2\ln|x - 2| + 3\ln|x + 1| + C$.

</details>

**2.** Calcule $\displaystyle\int \frac{dx}{x^2 - 4}$.

<details>
<summary>Ver solução</summary>

$\frac{1}{(x - 2)(x + 2)} = \frac{1/4}{x - 2} - \frac{1/4}{x + 2}$. Primitiva: $\frac14\ln\left|\frac{x - 2}{x + 2}\right| + C$.

</details>

**3.** Calcule $\displaystyle\int \frac{dx}{x^2\sqrt{x^2 + 9}}$.

<details>
<summary>Ver solução</summary>

$x = 3\tan\theta$, $dx = 3\sec^2\theta\,d\theta$, raiz $= 3\sec\theta$. Integral $= \frac19\int \frac{\cos\theta}{\sin^2\theta}\,d\theta = -\frac{1}{9\sin\theta} + C = -\frac{\sqrt{x^2 + 9}}{9x} + C$.

</details>

**4.** Calcule $\displaystyle\int \sin^2 x\,dx$.

<details>
<summary>Ver solução</summary>

$\int \frac{1 - \cos 2x}{2}\,dx = \frac{x}{2} - \frac{\sin 2x}{4} + C$.

</details>
