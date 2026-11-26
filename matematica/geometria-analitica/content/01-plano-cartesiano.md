# O plano cartesiano

Geometria Analítica é a ideia de Descartes: **trocar figuras por equações**. Um ponto vira um par de números, uma reta vira uma equação do 1º grau, um círculo vira uma equação do 2º grau. Assim, perguntas de geometria ("essas retas se cruzam?", "esse ponto está dentro do círculo?") passam a ser respondidas com contas.

> [!DICA] Se a notação de par ordenado ou de produto cartesiano estiver enferrujada, revise [Produto cartesiano](../fundamentos/#/teoria/produto-cartesiano) no livro Fundamentos.

## 1. Coordenadas

Um ponto do plano é $P = (x, y)$: $x$ é a **abscissa** (anda na horizontal) e $y$ a **ordenada** (anda na vertical). Os eixos dividem o plano em quatro **quadrantes**, numerados no sentido anti-horário a partir do canto superior direito.

| Quadrante | Sinais |
|---|---|
| 1º | $x > 0$, $y > 0$ |
| 2º | $x < 0$, $y > 0$ |
| 3º | $x < 0$, $y < 0$ |
| 4º | $x > 0$, $y < 0$ |

Pontos sobre os eixos não pertencem a quadrante nenhum.

## 2. Distância entre dois pontos

> [!TEOREMA] A distância entre $A = (x_1, y_1)$ e $B = (x_2, y_2)$ é
> $$d(A, B) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.$$

> [!INTUIÇÃO] É o teorema de Pitágoras. Desenhe um triângulo retângulo com catetos horizontais e verticais: os catetos medem $|x_2 - x_1|$ e $|y_2 - y_1|$, e a distância é a hipotenusa.

**Exemplo.** $A = (1, 2)$ e $B = (4, 6)$: $d = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.

> [!ATENÇÃO] A ordem não importa, porque as diferenças vão ao quadrado. Mas os quadrados **não** se separam: $\sqrt{9 + 16} \neq 3 + 4$.

## 3. Ponto médio e divisão de segmento

O **ponto médio** de $AB$ é a média das coordenadas:

$$M = \left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)$$

**Exemplo.** Entre $(1, 2)$ e $(5, -4)$: $M = (3, -1)$.

O **baricentro** de um triângulo (encontro das medianas, o "centro de equilíbrio") é a média dos três vértices:

$$G = \left(\frac{x_A + x_B + x_C}{3},\ \frac{y_A + y_B + y_C}{3}\right)$$

## 4. Área de um triângulo e alinhamento

> [!TEOREMA] A área do triângulo de vértices $A$, $B$, $C$ é
> $$\text{Área} = \frac{1}{2}\,|D|, \qquad D = \begin{vmatrix} x_A & y_A & 1 \\ x_B & y_B & 1 \\ x_C & y_C & 1 \end{vmatrix}.$$

**Exemplo.** $A = (0, 0)$, $B = (4, 0)$, $C = (1, 3)$: $D = 12$, área $= 6$. (Confira com base $\times$ altura $\div 2$: $4 \cdot 3 \div 2 = 6$.)

> [!TEOREMA] **(Condição de alinhamento)** Três pontos estão sobre a mesma reta se e só se $D = 0$: o "triângulo" tem área zero.

> [!DICA] Uma forma prática de calcular $D$ sem determinante é a "fórmula do cadarço": $D = (x_Ay_B - x_By_A) + (x_By_C - x_Cy_B) + (x_Cy_A - x_Ay_C)$. O determinante $3 \times 3$ está explicado no livro [Álgebra Linear](../algebra-linear/#/teoria/determinantes).

## 5. Lugar geométrico

> [!DEFINIÇÃO] Um **lugar geométrico** é o conjunto de todos os pontos que satisfazem uma condição. Escrever essa condição em coordenadas dá a **equação** do lugar.

**Exemplo.** Os pontos equidistantes de $A = (0, 0)$ e $B = (4, 2)$:

$$x^2 + y^2 = (x - 4)^2 + (y - 2)^2 \;\Rightarrow\; 0 = -8x + 16 - 4y + 4 \;\Rightarrow\; 2x + y = 5$$

É uma reta: a **mediatriz** do segmento. Este é o método de todo o livro: descrever a figura por uma propriedade, traduzir em distâncias e simplificar.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A distância entre $(-1, 2)$ e $(2, 6)$ é:
- $4$
+ $5$
- $7$
- $\sqrt{7}$
> $\sqrt{3^2 + 4^2} = 5$.

? O ponto médio de $(2, -3)$ e $(6, 7)$ é:
- $(8, 4)$
+ $(4, 2)$
- $(2, 5)$
- $(4, 5)$
> $\left(\frac{8}{2}, \frac{4}{2}\right)$.

? O ponto $(-3, 5)$ está no:
- 1º quadrante
+ 2º quadrante
- 3º quadrante
- 4º quadrante
> $x < 0$ e $y > 0$.

? Os pontos $A$, $B$, $C$ estão alinhados quando:
- $D = 1$
+ $D = 0$
- $D > 0$
- as coordenadas são inteiras
> Área zero: não há triângulo.

? O lugar geométrico dos pontos equidistantes de dois pontos dados é:
- uma circunferência
+ a mediatriz do segmento
- uma parábola
- o ponto médio
> Uma reta perpendicular ao segmento, passando pelo ponto médio.
```

## 6. Exercícios

**1.** Calcule o perímetro do triângulo $A = (0, 0)$, $B = (3, 0)$, $C = (0, 4)$.

<details>
<summary>Ver solução</summary>

$AB = 3$, $AC = 4$, $BC = \sqrt{9 + 16} = 5$. Perímetro $12$.

</details>

**2.** Encontre $k$ para que $(1, 1)$, $(3, 5)$ e $(k, 9)$ estejam alinhados.

<details>
<summary>Ver solução</summary>

$D = (5 - 3) + (27 - 5k) + (k - 9) = 20 - 4k = 0$, logo $k = 5$. (Confira: a reta por $(1,1)$ e $(3,5)$ tem $y = 2x - 1$, e $2 \cdot 5 - 1 = 9$.)

</details>

**3.** Calcule a área do triângulo $(1, 1)$, $(5, 2)$, $(2, 6)$.

<details>
<summary>Ver solução</summary>

$D = (2 - 5) + (30 - 4) + (2 - 6) = -3 + 26 - 4 = 19$. Área $= \frac{19}{2}$.

</details>

**4.** O ponto médio de $AB$ é $(2, 3)$ e $A = (-1, 5)$. Encontre $B$.

<details>
<summary>Ver solução</summary>

$\frac{-1 + x}{2} = 2 \Rightarrow x = 5$; $\frac{5 + y}{2} = 3 \Rightarrow y = 1$. $B = (5, 1)$.

</details>

**5.** Encontre o lugar geométrico dos pontos cuja distância a $(0, 0)$ é $3$.

<details>
<summary>Ver solução</summary>

$\sqrt{x^2 + y^2} = 3 \Rightarrow x^2 + y^2 = 9$: a circunferência de centro na origem e raio $3$ (capítulo 6).

</details>
