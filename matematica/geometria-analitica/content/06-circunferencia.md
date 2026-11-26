# A circunferência

A circunferência é o lugar dos pontos a uma distância fixa de um centro. Traduzida em coordenadas, vira uma equação do 2º grau, e a principal habilidade do capítulo é **completar quadrados** para ler o centro e o raio.

## 1. Equação reduzida

> [!DEFINIÇÃO] A circunferência de centro $C = (a, b)$ e raio $r > 0$ é o conjunto dos pontos $P$ com $d(P, C) = r$:
> $$(x - a)^2 + (y - b)^2 = r^2.$$

**Exemplo.** Centro $(2, -1)$, raio $3$: $(x - 2)^2 + (y + 1)^2 = 9$.

> [!ATENÇÃO] Os sinais dentro dos parênteses são o **oposto** das coordenadas do centro: $(x + 1)^2$ indica $a = -1$. E o lado direito é $r^2$, não $r$: em $(x - 1)^2 + y^2 = 16$, o raio é $4$.

## 2. Equação geral e completar quadrados

Desenvolvendo a reduzida, chega-se à forma geral:

$$x^2 + y^2 + Dx + Ey + F = 0$$

Para voltar (e descobrir centro e raio), **complete os quadrados** em $x$ e em $y$.

**Exemplo.** $x^2 + y^2 - 6x + 4y - 3 = 0$.

$$(x^2 - 6x + 9) + (y^2 + 4y + 4) = 3 + 9 + 4 \;\Rightarrow\; (x - 3)^2 + (y + 2)^2 = 16$$

Centro $(3, -2)$, raio $4$.

> [!DICA] Atalho: centro $= \left(-\frac{D}{2}, -\frac{E}{2}\right)$ e $r^2 = \frac{D^2 + E^2}{4} - F$. Mas completar quadrados é o método que você vai reusar em parábolas, elipses e hipérboles, então vale treinar.

Nem toda equação desse tipo é uma circunferência:

- Se $x^2$ e $y^2$ têm coeficientes **diferentes**, ou há termo $xy$, não é circunferência.
- Se o lado direito der **zero**, é um único ponto.
- Se der **negativo**, não existe nenhum ponto (conjunto vazio).

## 3. Posição de um ponto

Calcule $d(P, C)$ e compare com $r$:

| | Posição |
|---|---|
| $d < r$ | interior |
| $d = r$ | sobre a circunferência |
| $d > r$ | exterior |

Na prática, basta substituir o ponto no lado esquerdo da equação geral: negativo, interior; zero, sobre; positivo, exterior.

## 4. Posição de uma reta

Compare a distância do **centro** à reta com o raio:

| | Posição | Pontos comuns |
|---|---|---|
| $d < r$ | secante | 2 |
| $d = r$ | **tangente** | 1 |
| $d > r$ | exterior | 0 |

**Exemplo.** $x^2 + y^2 = 25$ e a reta $3x + 4y - 25 = 0$: $d = \frac{25}{5} = 5 = r$. Tangente.

> [!TEOREMA] A reta tangente à circunferência num ponto $T$ é **perpendicular** ao raio $CT$.

**Exemplo.** Tangente a $x^2 + y^2 = 25$ em $T = (3, 4)$: o raio tem direção $(3, 4)$, que é o vetor normal da tangente. Logo $3x + 4y = 25$.

## 5. Aplicação: circunferência por três pontos

Três pontos não alinhados determinam uma única circunferência. Substitua cada ponto na equação geral e resolva o sistema em $D$, $E$, $F$.

**Exemplo.** Por $(0, 0)$, $(4, 0)$ e $(0, 2)$: de $(0, 0)$, $F = 0$; de $(4, 0)$, $16 + 4D = 0$, $D = -4$; de $(0, 2)$, $4 + 2E = 0$, $E = -2$. Então $x^2 + y^2 - 4x - 2y = 0$, ou $(x - 2)^2 + (y - 1)^2 = 5$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O centro e o raio de $(x + 2)^2 + (y - 5)^2 = 49$ são:
- $(2, -5)$ e $49$
+ $(-2, 5)$ e $7$
- $(-2, 5)$ e $49$
- $(2, 5)$ e $7$
> Sinais opostos no centro; raio $\sqrt{49}$.

? A equação $x^2 + y^2 - 2x = 0$ é a circunferência de:
+ centro $(1, 0)$ e raio $1$
- centro $(-1, 0)$ e raio $1$
- centro $(2, 0)$ e raio $2$
- centro $(0, 0)$ e raio $\sqrt2$
> $(x - 1)^2 + y^2 = 1$.

? O ponto $(1, 2)$ em relação a $x^2 + y^2 = 4$ é:
- interior
- sobre
+ exterior
- o centro
> $1 + 4 = 5 > 4$.

? A equação $x^2 + y^2 + 4 = 0$ representa:
- uma circunferência de raio $2$
- um ponto
+ o conjunto vazio
- uma reta
> $x^2 + y^2 = -4$ não tem solução real.

? Uma reta tangente a uma circunferência tem com ela:
- nenhum ponto comum
+ exatamente um ponto comum
- dois pontos comuns
- infinitos pontos comuns
> E a distância do centro à reta é igual ao raio.
```

## 6. Exercícios

**1.** Encontre centro e raio de $x^2 + y^2 + 8x - 2y + 8 = 0$.

<details>
<summary>Ver solução</summary>

$(x + 4)^2 + (y - 1)^2 = -8 + 16 + 1 = 9$. Centro $(-4, 1)$, raio $3$.

</details>

**2.** Escreva a equação da circunferência de diâmetro $AB$, com $A = (1, 2)$ e $B = (7, 10)$.

<details>
<summary>Ver solução</summary>

Centro no ponto médio $(4, 6)$; raio $= \frac{d(A,B)}{2} = \frac{10}{2} = 5$. $(x - 4)^2 + (y - 6)^2 = 25$.

</details>

**3.** Para que valores de $k$ a reta $y = x + k$ é tangente a $x^2 + y^2 = 8$?

<details>
<summary>Ver solução</summary>

Reta: $x - y + k = 0$. $\frac{|k|}{\sqrt2} = \sqrt8 = 2\sqrt2 \Rightarrow |k| = 4$, $k = \pm4$.

</details>

**4.** Encontre a tangente a $(x - 1)^2 + (y - 1)^2 = 25$ no ponto $(4, 5)$.

<details>
<summary>Ver solução</summary>

Raio: $(4, 5) - (1, 1) = (3, 4)$, normal da tangente. $3(x - 4) + 4(y - 5) = 0 \Rightarrow 3x + 4y - 32 = 0$.

</details>
