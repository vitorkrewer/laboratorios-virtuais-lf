# Potências e raízes

Potências aparecem em toda parte: polinômios, notação científica, exponenciais, derivadas ($x^n$). Este capítulo junta as regras em uma só tabela e mostra **de onde** cada uma vem, para você não precisar decorar.

## 1. O que é uma potência

$$a^n = \underbrace{a \cdot a \cdot \ldots \cdot a}_{n \text{ fatores}} \qquad a = \text{base},\quad n = \text{expoente}$$

$2^5 = 32$; $(-2)^3 = -8$; $(-2)^4 = 16$; $\left(\frac{2}{3}\right)^2 = \frac{4}{9}$.

> [!DICA] Base negativa: expoente **par** dá positivo, **ímpar** dá negativo. E lembre do capítulo 1: $-2^4 = -16$, mas $(-2)^4 = 16$.

## 2. As propriedades

| Propriedade | Regra | Exemplo |
|---|---|---|
| Produto de mesma base | $a^m \cdot a^n = a^{m+n}$ | $2^3 \cdot 2^4 = 2^7$ |
| Divisão de mesma base | $\dfrac{a^m}{a^n} = a^{m-n}$ | $\dfrac{5^6}{5^2} = 5^4$ |
| Potência de potência | $(a^m)^n = a^{m \cdot n}$ | $(3^2)^3 = 3^6$ |
| Potência de produto | $(ab)^n = a^n b^n$ | $(2x)^3 = 8x^3$ |
| Potência de quociente | $\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n}$ | $\left(\dfrac{x}{3}\right)^2 = \dfrac{x^2}{9}$ |
| Expoente zero | $a^0 = 1$ $(a \neq 0)$ | $7^0 = 1$ |
| Expoente negativo | $a^{-n} = \dfrac{1}{a^n}$ | $2^{-3} = \dfrac{1}{8}$ |

> [!INTUIÇÃO] **Por que $a^0 = 1$?** Pela regra da divisão, $\frac{a^3}{a^3} = a^{3-3} = a^0$. Mas qualquer número (não nulo) dividido por ele mesmo é $1$. **Por que $a^{-n} = \frac{1}{a^n}$?** Porque $\frac{a^2}{a^5} = a^{-3}$, e cortando os fatores sobra $\frac{1}{a^3}$.

> [!ATENÇÃO] Não existe regra para **soma**: $(a + b)^2 \neq a^2 + b^2$ e $2^3 + 2^4 \neq 2^7$. Veja o capítulo 6.

**Fração com expoente negativo:** inverta a fração. $\left(\frac{2}{3}\right)^{-2} = \left(\frac{3}{2}\right)^2 = \frac{9}{4}$.

## 3. Notação científica

Um número em notação científica tem a forma $a \times 10^n$, com $1 \le a < 10$.

$$300\,000 = 3 \times 10^5 \qquad 0{,}00042 = 4{,}2 \times 10^{-4}$$

Para multiplicar, multiplique os $a$ e some os expoentes: $(2 \times 10^3)(4 \times 10^5) = 8 \times 10^8$.

## 4. Raízes

> [!DEFINIÇÃO] $\sqrt[n]{a} = b$ significa $b^n = a$. Na raiz quadrada ($n = 2$) não se escreve o índice: $\sqrt{a}$.

$\sqrt{49} = 7$; $\sqrt[3]{8} = 2$; $\sqrt[3]{-27} = -3$; $\sqrt[4]{81} = 3$.

> [!ATENÇÃO] Nos reais, **não existe** raiz de índice par de número negativo: $\sqrt{-4}$ não é real. E $\sqrt{9} = 3$, só o positivo. Quem dá $\pm 3$ é a **equação** $x^2 = 9$. Por isso $\sqrt{x^2} = |x|$.

### Propriedades das raízes

$$\sqrt{ab} = \sqrt{a}\,\sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}} \qquad (a, b \ge 0)$$

> [!ATENÇÃO] $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$. Teste: $\sqrt{9 + 16} = \sqrt{25} = 5$, mas $\sqrt{9} + \sqrt{16} = 7$.

**Simplificar raízes:** procure um fator que seja quadrado perfeito.

$$\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2} \qquad \sqrt{72} = \sqrt{36 \cdot 2} = 6\sqrt{2}$$

**Somar raízes:** só as semelhantes (mesmo radicando). $3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$; $\sqrt{8} + \sqrt{18} = 2\sqrt{2} + 3\sqrt{2} = 5\sqrt{2}$.

## 5. Racionalização

Tirar a raiz do denominador: multiplique em cima e embaixo pelo que "some" com ela.

$$\frac{6}{\sqrt{3}} = \frac{6}{\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$$

Com soma ou diferença no denominador, use o **conjugado** (troca o sinal do meio), porque $(a + b)(a - b) = a^2 - b^2$:

$$\frac{1}{\sqrt{5} - 2} \cdot \frac{\sqrt{5} + 2}{\sqrt{5} + 2} = \frac{\sqrt{5} + 2}{5 - 4} = \sqrt{5} + 2$$

> [!DICA] O conjugado volta no Cálculo para resolver limites do tipo $\frac{0}{0}$ com raízes.

## 6. Expoente fracionário

> [!DEFINIÇÃO] $a^{\frac{m}{n}} = \sqrt[n]{a^m}$. O **denominador** do expoente vira o **índice** da raiz.

$$8^{\frac{2}{3}} = \sqrt[3]{8^2} = \left(\sqrt[3]{8}\right)^2 = 4 \qquad x^{\frac12} = \sqrt{x} \qquad \frac{1}{\sqrt{x}} = x^{-\frac12}$$

> [!DICA] Escrever raízes como potências é o truque que deixa as derivadas fáceis: $\sqrt{x} = x^{1/2}$ e $\frac{1}{x^2} = x^{-2}$. Todas as propriedades da seção 2 continuam valendo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $x^5 \cdot x^3$ é igual a:
+ $x^8$
- $x^{15}$
- $2x^8$
- $x^2$
> Produto de mesma base: soma os expoentes.

? Quanto vale $5^{-2}$?
- $-25$
- $-10$
+ $\dfrac{1}{25}$
- $\dfrac{1}{10}$
> Expoente negativo inverte: $\frac{1}{5^2}$.

? $\sqrt{48}$ simplificada é:
- $2\sqrt{12}$
+ $4\sqrt{3}$
- $6\sqrt{2}$
- $16\sqrt{3}$
> $48 = 16 \cdot 3$, e $\sqrt{16} = 4$. ($2\sqrt{12}$ é igual, mas ainda dá para simplificar.)

? Quanto vale $27^{\frac{2}{3}}$?
- $18$
+ $9$
- $3$
- $81$
> $\sqrt[3]{27} = 3$ e $3^2 = 9$.

? Racionalizando $\dfrac{10}{\sqrt{5}}$, obtemos:
- $\dfrac{\sqrt{5}}{10}$
- $5$
+ $2\sqrt{5}$
- $10\sqrt{5}$
> $\frac{10\sqrt5}{5} = 2\sqrt5$.
```

## 7. Exercícios

**1.** Simplifique $\dfrac{(x^3)^2 \cdot x^{-1}}{x^4}$.

<details>
<summary>Ver solução</summary>

$\frac{x^6 \cdot x^{-1}}{x^4} = \frac{x^5}{x^4} = x$.

</details>

**2.** Calcule $2^{-1} + 4^{0} + 9^{\frac12}$.

<details>
<summary>Ver solução</summary>

$\frac12 + 1 + 3 = \frac{9}{2}$.

</details>

**3.** Simplifique $\sqrt{12} + \sqrt{27} - \sqrt{3}$.

<details>
<summary>Ver solução</summary>

$2\sqrt3 + 3\sqrt3 - \sqrt3 = 4\sqrt3$.

</details>

**4.** Racionalize $\dfrac{4}{\sqrt{3} + 1}$.

<details>
<summary>Ver solução</summary>

Multiplique por $\frac{\sqrt3 - 1}{\sqrt3 - 1}$: $\frac{4(\sqrt3 - 1)}{3 - 1} = 2(\sqrt3 - 1) = 2\sqrt3 - 2$.

</details>

**5.** Escreva $\dfrac{3}{x\sqrt{x}}$ como $3x^k$.

<details>
<summary>Ver solução</summary>

$x\sqrt{x} = x^1 \cdot x^{1/2} = x^{3/2}$. Logo, $3x^{-3/2}$.

</details>

**6.** Calcule $(3 \times 10^{4}) \cdot (5 \times 10^{-7})$ em notação científica.

<details>
<summary>Ver solução</summary>

$15 \times 10^{-3} = 1{,}5 \times 10^{-2}$.

</details>
