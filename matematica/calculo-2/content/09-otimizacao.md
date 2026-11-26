# Máximos, mínimos e multiplicadores de Lagrange

Otimizar com várias variáveis segue o roteiro do Cálculo I: encontrar onde a derivada zera e decidir o que acontece ali. A diferença é que agora o "zero" é o gradiente, e o teste da segunda derivada usa uma matriz, a **hessiana**. Quando há uma restrição (orçamento fixo, área fixa), entram os **multiplicadores de Lagrange**.

> [!DICA] No simulador [Superfícies](#/lab/superficies), carregue o exemplo "sela" e o "paraboloide" e compare as curvas de nível perto do ponto crítico: elipses em volta de um mínimo, hipérboles cruzando numa sela.

## 1. Pontos críticos

> [!DEFINIÇÃO] $(a, b)$ é **ponto crítico** de $f$ se $\nabla f(a, b) = \vec 0$ (ou se alguma derivada parcial não existe ali).

> [!TEOREMA] Se $f$ tem máximo ou mínimo local em $(a, b)$ e as parciais existem, então $\nabla f(a, b) = \vec 0$. O plano tangente é horizontal.

Nem todo ponto crítico é extremo. Em $f = x^2 - y^2$, a origem é crítica, mas $f$ cresce no eixo $x$ e decresce no eixo $y$: é um **ponto de sela**.

## 2. Teste da segunda derivada

> [!TEOREMA] Seja $(a, b)$ crítico e $D = f_{xx}f_{yy} - (f_{xy})^2$, o determinante da **matriz hessiana** $H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{xy} & f_{yy}\end{pmatrix}$, calculado em $(a, b)$.
> - $D > 0$ e $f_{xx} > 0$: **mínimo local**.
> - $D > 0$ e $f_{xx} < 0$: **máximo local**.
> - $D < 0$: **ponto de sela**.
> - $D = 0$: o teste é **inconclusivo**.

> [!INTUIÇÃO] $D > 0$ significa que a superfície curva para o mesmo lado em todas as direções (tigela para cima ou para baixo). $D < 0$ significa que curva para cima numa direção e para baixo em outra (sela). Quem conhece Álgebra Linear reconhece: é o sinal dos autovalores da hessiana.

**Exemplo.** $f(x, y) = x^3 - 3x + y^2 - 4y$.
- $f_x = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$; $f_y = 2y - 4 = 0 \Rightarrow y = 2$.
- $f_{xx} = 6x$, $f_{yy} = 2$, $f_{xy} = 0$, então $D = 12x$.
- $(1, 2)$: $D = 12 > 0$, $f_{xx} = 6 > 0$: **mínimo local**, $f = -6$.
- $(-1, 2)$: $D = -12 < 0$: **sela**.

## 3. Extremos absolutos em regiões fechadas

> [!TEOREMA] Uma função contínua numa região **fechada e limitada** atinge máximo e mínimo absolutos. Para achá-los: (1) avalie $f$ nos pontos críticos do interior; (2) encontre os extremos de $f$ na **fronteira** (que vira um problema de uma variável); (3) compare todos os valores.

**Exemplo.** $f = x^2 + y^2 - 2x$ no quadrado $[0, 2] \times [-1, 1]$. Interior: $\nabla f = (2x - 2, 2y) = \vec 0$ em $(1, 0)$, $f = -1$. Fronteira: nos cantos $(0, \pm1)$ e $(2, \pm1)$, $f = 1$; nos lados não há valores menores que $-1$ nem maiores que $1$. Mínimo absoluto $-1$, máximo absoluto $1$.

## 4. Multiplicadores de Lagrange

Agora o problema é otimizar $f(x, y)$ **sujeito a** uma restrição $g(x, y) = k$.

> [!TEOREMA] Nos extremos de $f$ restrita à curva $g = k$ (com $\nabla g \ne \vec 0$), vale
> $$\nabla f = \lambda\,\nabla g, \qquad g(x, y) = k,$$
> para algum número $\lambda$ (o **multiplicador de Lagrange**).

> [!INTUIÇÃO] Ande pela curva da restrição observando as curvas de nível de $f$. Enquanto você cruza curvas de nível, $f$ ainda pode crescer. No extremo, a restrição apenas **tangencia** uma curva de nível. Curvas tangentes têm normais paralelas, e as normais são os gradientes: $\nabla f \parallel \nabla g$.

**Exemplo.** Minimizar $x^2 + y^2$ (distância ao quadrado até a origem) sobre a reta $x + 2y = 5$.
- $(2x, 2y) = \lambda(1, 2)$, então $y = 2x$.
- Na restrição: $x + 4x = 5$, logo $x = 1$, $y = 2$. Valor mínimo: $5$ (distância $\sqrt5$, a mesma da fórmula da Geometria Analítica).

**Exemplo.** Uma caixa sem tampa com volume $32$ deve gastar o mínimo de material. Minimizar $S = xy + 2xz + 2yz$ com $xyz = 32$. As equações de Lagrange levam a $x = y = 2z$; então $4z^3 = 32$, $z = 2$, e a caixa é $4 \times 4 \times 2$, com $S = 48$.

> [!ATENÇÃO] Lagrange dá **candidatos**. Compare os valores de $f$ neles; se a curva da restrição não for fechada e limitada, confirme pelo contexto que o extremo existe.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Num ponto crítico com $f_{xx} = 2$, $f_{yy} = 3$ e $f_{xy} = 1$:
+ há mínimo local
- há máximo local
- há sela
- o teste é inconclusivo
> $D = 6 - 1 = 5 > 0$ e $f_{xx} > 0$.

? Se $D < 0$ num ponto crítico, ele é:
- mínimo local
- máximo local
+ ponto de sela
- inconclusivo
> Curvaturas de sinais opostos.

? O ponto crítico de $f = x^2 + y^2 - 4x + 6y$ é:
- $(-2, 3)$
+ $(2, -3)$
- $(4, -6)$
- $(0, 0)$
> $2x - 4 = 0$ e $2y + 6 = 0$.

? Pela condição de Lagrange, no extremo:
- $\nabla f = \vec 0$
+ $\nabla f$ é paralelo a $\nabla g$
- $\nabla f$ é perpendicular a $\nabla g$
- $f = g$
> A restrição tangencia uma curva de nível de $f$.

? O máximo de $xy$ com $x + y = 10$ (e $x, y > 0$) é:
- $10$
+ $25$
- $50$
- $100$
> $(y, x) = \lambda(1, 1)$ dá $x = y = 5$.
```

## 5. Exercícios

**1.** Classifique os pontos críticos de $f = x^2 + xy + y^2 - 3y$.

<details>
<summary>Ver solução</summary>

$f_x = 2x + y = 0$, $f_y = x + 2y - 3 = 0$: $x = -1$, $y = 2$. $D = 2\cdot2 - 1 = 3 > 0$, $f_{xx} = 2 > 0$: mínimo local, $f(-1, 2) = 1 - 2 + 4 - 6 = -3$.

</details>

**2.** Classifique os pontos críticos de $f = xy - x^3 - y^3$ (dica: são dois).

<details>
<summary>Ver solução</summary>

$f_x = y - 3x^2 = 0$, $f_y = x - 3y^2 = 0$. Pontos: $(0, 0)$ e $\left(\frac13, \frac13\right)$. $f_{xx} = -6x$, $f_{yy} = -6y$, $f_{xy} = 1$. Em $(0, 0)$: $D = -1$, sela. Em $\left(\frac13, \frac13\right)$: $D = 4 - 1 = 3 > 0$, $f_{xx} = -2 < 0$: máximo local, $f = \frac1{27}$.

</details>

**3.** Encontre os extremos de $f = x + y$ sobre a circunferência $x^2 + y^2 = 2$.

<details>
<summary>Ver solução</summary>

$(1, 1) = \lambda(2x, 2y)$ dá $x = y$; então $x = \pm1$. Máximo $2$ em $(1, 1)$, mínimo $-2$ em $(-1, -1)$.

</details>

**4.** Um retângulo inscrito na elipse $\frac{x^2}{4} + y^2 = 1$, com lados paralelos aos eixos, tem área máxima de quanto?

<details>
<summary>Ver solução</summary>

Área $4xy$ com o vértice $(x, y)$ no 1º quadrante. Lagrange: $(4y, 4x) = \lambda\left(\frac{x}{2}, 2y\right)$, que dá $x^2 = 4y^2$, logo $x = 2y$. Na elipse: $2y^2 = 1$, $y = \frac{1}{\sqrt2}$, $x = \sqrt2$. Área $= 4 \cdot \sqrt2 \cdot \frac{1}{\sqrt2} = 4$.

</details>
