# Parábola

Você já conhece a parábola como gráfico de $y = ax^2 + bx + c$. Em Geometria Analítica, ela ganha uma definição geométrica, com **foco** e **diretriz**, que explica por que antenas parabólicas e faróis de carro têm esse formato.

> [!DICA] No simulador [Cônicas](#/lab/conicas), escolha "Parábola" e mova o ponto sobre a curva: as duas distâncias (até o foco e até a diretriz) aparecem sempre iguais.

## 1. Definição

> [!DEFINIÇÃO] Dados uma reta $d$ (a **diretriz**) e um ponto $F$ fora dela (o **foco**), a **parábola** é o conjunto dos pontos $P$ equidistantes de $F$ e de $d$:
> $$d(P, F) = d(P, d).$$

Elementos:

- **Vértice** $V$: o ponto da parábola mais próximo do foco, no meio do caminho entre $F$ e $d$.
- **Eixo de simetria**: a reta por $F$ perpendicular a $d$.
- **Parâmetro** $p$: a distância do vértice ao foco (igual à do vértice à diretriz).

## 2. Equações com vértice na origem

**Eixo vertical.** Foco $F = (0, p)$ e diretriz $y = -p$:

$$\sqrt{x^2 + (y - p)^2} = |y + p| \;\Rightarrow\; x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2 \;\Rightarrow\; x^2 = 4py$$

**Eixo horizontal.** Foco $F = (p, 0)$ e diretriz $x = -p$: $y^2 = 4px$.

| Equação | Abre para | Foco | Diretriz |
|---|---|---|---|
| $x^2 = 4py$, $p > 0$ | cima | $(0, p)$ | $y = -p$ |
| $x^2 = 4py$, $p < 0$ | baixo | $(0, p)$ | $y = -p$ |
| $y^2 = 4px$, $p > 0$ | direita | $(p, 0)$ | $x = -p$ |
| $y^2 = 4px$, $p < 0$ | esquerda | $(p, 0)$ | $x = -p$ |

> [!DICA] A variável que **não** está ao quadrado diz o eixo de simetria e para onde a parábola abre. Em $y^2 = 4px$, é $x$: a parábola abre na horizontal.

**Exemplo.** $x^2 = 8y$: $4p = 8$, $p = 2$. Abre para cima, foco $(0, 2)$, diretriz $y = -2$.

## 3. Vértice fora da origem

Com vértice $V = (h, k)$, troque $x$ por $x - h$ e $y$ por $y - k$:

$$(x - h)^2 = 4p(y - k) \qquad (y - k)^2 = 4p(x - h)$$

**Exemplo.** $y = x^2 - 4x + 7$. Complete o quadrado: $y = (x - 2)^2 + 3$, ou $(x - 2)^2 = y - 3$. Vértice $(2, 3)$, $4p = 1$, $p = \frac14$. Foco $\left(2, \frac{13}{4}\right)$, diretriz $y = \frac{11}{4}$.

> [!INTUIÇÃO] Comparando com $y = ax^2$: $a = \frac{1}{4p}$. Parábolas "fechadas" ($a$ grande) têm foco muito perto do vértice; parábolas "abertas" têm foco longe.

## 4. A propriedade refletora

> [!TEOREMA] Todo raio que chega paralelo ao eixo e bate na parábola é refletido **para o foco**. E, ao contrário, a luz que sai do foco é refletida em raios paralelos ao eixo.

É por isso que antenas parabólicas concentram o sinal no receptor (no foco), e faróis e lanternas colocam a lâmpada no foco para produzir um feixe paralelo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Em uma parábola, cada ponto está à mesma distância:
- de dois focos
+ do foco e da diretriz
- do vértice e do foco
- dos dois eixos
> É a definição.

? O foco de $x^2 = 12y$ é:
- $(12, 0)$
+ $(0, 3)$
- $(0, 12)$
- $(3, 0)$
> $4p = 12 \Rightarrow p = 3$; eixo vertical.

? A parábola $y^2 = -8x$ abre para:
- cima
- baixo
- direita
+ esquerda
> Eixo horizontal (o $x$ não está ao quadrado) e $p = -2 < 0$.

? A diretriz de $x^2 = 4y$ é:
+ $y = -1$
- $y = 1$
- $x = -1$
- $y = -4$
> $p = 1$; diretriz $y = -p$.

? O vértice de $(y - 1)^2 = 6(x + 2)$ é:
- $(2, -1)$
+ $(-2, 1)$
- $(1, -2)$
- $(-1, 2)$
> $h = -2$, $k = 1$.
```

## 5. Exercícios

**1.** Encontre foco e diretriz de $y^2 = 10x$.

<details>
<summary>Ver solução</summary>

$4p = 10$, $p = \frac52$. Foco $\left(\frac52, 0\right)$, diretriz $x = -\frac52$.

</details>

**2.** Escreva a equação da parábola de foco $(0, -3)$ e diretriz $y = 3$.

<details>
<summary>Ver solução</summary>

Vértice na origem, $p = -3$: $x^2 = -12y$.

</details>

**3.** Encontre vértice, foco e diretriz de $x^2 + 6x - 8y + 1 = 0$.

<details>
<summary>Ver solução</summary>

$(x + 3)^2 - 9 = 8y - 1 \Rightarrow (x + 3)^2 = 8(y + 1)$. Vértice $(-3, -1)$, $p = 2$. Foco $(-3, 1)$, diretriz $y = -3$.

</details>

**4.** Uma antena parabólica tem $1$ m de diâmetro e $0{,}125$ m de profundidade. Onde fica o receptor?

<details>
<summary>Ver solução</summary>

Com vértice na origem, a borda é $(0{,}5;\ 0{,}125)$ em $x^2 = 4py$: $0{,}25 = 4p \cdot 0{,}125 \Rightarrow p = 0{,}5$. O receptor fica a $0{,}5$ m do fundo, sobre o eixo.

</details>
