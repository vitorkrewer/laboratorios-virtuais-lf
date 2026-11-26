# Resumo, formulário e erros comuns

Este capítulo reúne as fórmulas do livro e os erros que mais aparecem em provas de Geometria Analítica. Use para revisar e para conferir resultados.

## 1. Formulário

**Pontos.**
$$d(A, B) = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2} \qquad M = \frac{A + B}{2} \qquad \text{Área}_{\triangle} = \frac12 |D|$$

**Vetores.**
$$\overrightarrow{AB} = B - A \qquad \cos\theta = \frac{\vec u \cdot \vec v}{\|\vec u\|\|\vec v\|} \qquad \text{proj}_{\vec v}\vec u = \frac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\vec v$$

$$\|\vec u \times \vec v\| = \text{área do paralelogramo} \qquad |[\vec u, \vec v, \vec w]| = \text{volume do paralelepípedo}$$

**Reta no plano.**
$$m = \frac{y_2 - y_1}{x_2 - x_1} \qquad y - y_0 = m(x - x_0) \qquad m_1 m_2 = -1 \;(\perp) \qquad d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$

**Espaço.**
$$P = A + t\,\vec v \;\;(\text{reta}) \qquad ax + by + cz + d = 0,\ \vec n = (a, b, c) \;\;(\text{plano}) \qquad d = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$$

**Cônicas** (centro ou vértice na origem).

| Cônica | Equação | Relação | Extras |
|---|---|---|---|
| Circunferência | $x^2 + y^2 = r^2$ | | centro e raio |
| Parábola | $x^2 = 4py$ ou $y^2 = 4px$ | | foco a $p$ do vértice, diretriz a $-p$ |
| Elipse | $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ | $a^2 = b^2 + c^2$ | $e = \frac{c}{a} < 1$ |
| Hipérbole | $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ | $c^2 = a^2 + b^2$ | assíntotas $y = \pm\frac{b}{a}x$, $e > 1$ |

## 2. Roteiro para as perguntas mais comuns

| Pergunta | O que fazer |
|---|---|
| Reta por dois pontos | $m$ pelos pontos; ponto-declividade |
| Reta perpendicular | inverter e trocar o sinal de $m$ (ou usar a normal) |
| Encontro de duas retas | resolver o sistema |
| Centro e raio | completar quadrados |
| Tangência | distância do centro à reta $= r$ |
| Identificar cônica | sinais de $A$ e $C$; depois completar quadrados |
| Plano por três pontos | normal $= \overrightarrow{AB} \times \overrightarrow{AC}$ |
| Reta fura plano | paramétrica na equação do plano; resolver $t$ |
| Retas reversas? | não paralelas e produto misto $\neq 0$ |

## 3. Erros mais comuns

| # | Errado | Certo |
|---|---|---|
| 1 | $\overrightarrow{AB} = A - B$ | $B - A$ (final menos inicial) |
| 2 | $\sqrt{a^2 + b^2} = a + b$ na distância | não se separa |
| 3 | em $(x + 3)^2 + \ldots$, centro com $x = 3$ | centro com $x = -3$ |
| 4 | raio de $\ldots = 16$ é $16$ | é $\sqrt{16} = 4$ |
| 5 | perpendicular a $m = 2$ tem $m = -2$ | $m = -\frac12$ |
| 6 | reta vertical tem $m = 0$ | $m$ não existe; $m = 0$ é horizontal |
| 7 | elipse: $c^2 = a^2 + b^2$ | elipse: $a^2 = b^2 + c^2$ (hipérbole é que soma) |
| 8 | hipérbole: $a$ é o maior denominador | $a^2$ é o denominador do termo **positivo** |
| 9 | $\vec u \times \vec v = \vec v \times \vec u$ | trocar a ordem troca o sinal |
| 10 | no espaço, $ax + by + cz = d$ é uma reta | é um **plano** |
| 11 | retas que não se cruzam são paralelas | no espaço podem ser **reversas** |
| 12 | completar quadrado em $4x^2 - 8x$ somando $4$ | $4(x^2 - 2x + 1)$: soma-se $4 \cdot 1$ do outro lado |

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A equação $(x - 1)^2 + (y + 3)^2 = 4$ é a circunferência de:
+ centro $(1, -3)$ e raio $2$
- centro $(-1, 3)$ e raio $2$
- centro $(1, -3)$ e raio $4$
- centro $(1, 3)$ e raio $2$
> Sinais opostos no centro; raio $= \sqrt4$.

? Uma reta perpendicular a $y = -\frac{2}{5}x + 1$ tem declividade:
- $\frac25$
- $-\frac52$
+ $\frac52$
- $-\frac25$
> Inverte e troca o sinal.

? $9x^2 - y^2 = 9$ é:
- elipse
+ hipérbole
- parábola
- circunferência
> Sinais opostos.

? O plano por $A$, $B$, $C$ tem normal:
- $\overrightarrow{AB} + \overrightarrow{AC}$
- $\overrightarrow{AB} \cdot \overrightarrow{AC}$
+ $\overrightarrow{AB} \times \overrightarrow{AC}$
- $A + B + C$
> O produto vetorial é perpendicular aos dois vetores do plano.

? Na elipse $\frac{x^2}{9} + \frac{y^2}{25} = 1$, a distância entre os focos é:
- $4$
+ $8$
- $6$
- $\sqrt{34}$
> $c = \sqrt{25 - 9} = 4$; distância focal $2c$.
```

## 4. Próximos passos

- Use os três simuladores para "ver" cada fórmula.
- Consulte o **Glossário** (há uma categoria de Geometria Analítica).
- A Geometria Analítica volta no **Cálculo II** (planos tangentes, superfícies, integrais duplas em regiões limitadas por cônicas) e na **Álgebra Linear** (transformações do plano e mínimos quadrados).
