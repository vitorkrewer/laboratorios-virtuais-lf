# Derivadas parciais, plano tangente e regra da cadeia

Com duas variáveis, "a taxa de variação" depende da direção. O ponto de partida é o mais simples: variar **uma** variável de cada vez, mantendo a outra fixa. Isso dá as derivadas parciais, e com elas o plano tangente, a aproximação linear e a regra da cadeia.

## 1. Derivadas parciais

> [!DEFINIÇÃO] A **derivada parcial** de $f$ em relação a $x$ é
> $$f_x(a, b) = \frac{\partial f}{\partial x}(a, b) = \lim_{h \to 0} \frac{f(a + h, b) - f(a, b)}{h}.$$
> Na prática: derive em $x$ tratando $y$ como **constante**. Analogamente para $f_y$.

**Exemplo.** $f(x, y) = x^3 y^2 + 4xy - \sin y$.
- $f_x = 3x^2 y^2 + 4y$ (o termo $\sin y$ é constante em $x$).
- $f_y = 2x^3 y + 4x - \cos y$.

> [!INTUIÇÃO] Corte a superfície pelo plano $y = b$: sobra uma curva $z = f(x, b)$. A derivada $f_x(a, b)$ é a inclinação dessa curva em $x = a$, ou seja, a inclinação da superfície andando na direção do eixo $x$.

## 2. Derivadas de segunda ordem

São quatro: $f_{xx}$, $f_{yy}$ e as mistas $f_{xy} = (f_x)_y$ e $f_{yx}$.

> [!TEOREMA] **(Clairaut-Schwarz)** Se as derivadas mistas são contínuas, $f_{xy} = f_{yx}$. A ordem de derivação não importa.

No exemplo acima: $f_{xy} = 6x^2 y + 4 = f_{yx}$.

## 3. Plano tangente e aproximação linear

> [!TEOREMA] O plano tangente ao gráfico de $f$ no ponto $(a, b, f(a, b))$ é
> $$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b).$$

É a versão em duas variáveis da reta tangente. Perto de $(a, b)$, $f(x, y) \approx$ plano tangente (**linearização**), e o **diferencial** estima a variação: $dz = f_x\,dx + f_y\,dy$.

**Exemplo.** $f(x, y) = x^2 + y^2$ em $(1, 2)$: $f = 5$, $f_x = 2$, $f_y = 4$. Plano: $z = 5 + 2(x - 1) + 4(y - 2)$. Estimativa: $f(1{,}1;\ 1{,}9) \approx 5 + 0{,}2 - 0{,}4 = 4{,}8$ (exato: $4{,}82$).

**Exemplo (propagação de erro).** O volume de um cilindro é $V = \pi r^2 h$. Com $r = 5$, $h = 10$ e erros de $0{,}1$ em cada medida: $dV = 2\pi r h\,dr + \pi r^2\,dh = 100\pi(0{,}1) + 25\pi(0{,}1) = 12{,}5\pi \approx 39{,}3$.

> [!ATENÇÃO] Em várias variáveis, ter derivadas parciais não garante continuidade nem que o plano tangente aproxime bem a função. A condição que garante tudo isso é a **diferenciabilidade**; um critério prático é: se $f_x$ e $f_y$ existem e são contínuas perto do ponto, $f$ é diferenciável ali.

## 4. Regra da cadeia

> [!TEOREMA] Se $z = f(x, y)$ com $x = x(t)$ e $y = y(t)$:
> $$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}.$$
> Se $x = x(s, t)$ e $y = y(s, t)$: $\dfrac{\partial z}{\partial s} = f_x\,\dfrac{\partial x}{\partial s} + f_y\,\dfrac{\partial y}{\partial s}$, e analogamente para $t$.

> [!INTUIÇÃO] Desenhe a "árvore": $z$ depende de $x$ e $y$, cada um depende de $t$. Para cada caminho de $z$ até $t$, multiplique as derivadas ao longo dele; some os caminhos.

**Exemplo.** $z = x^2 y$, $x = \cos t$, $y = \sin t$. $\frac{dz}{dt} = 2xy(-\sin t) + x^2 \cos t = -2\cos t\sin^2 t + \cos^3 t$.

**Derivação implícita.** Se $F(x, y) = 0$ define $y(x)$, então $\dfrac{dy}{dx} = -\dfrac{F_x}{F_y}$. Ex.: $x^2 + y^2 = 25$ dá $y' = -\frac{x}{y}$, o mesmo resultado do Cálculo I, agora numa linha.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Para $f(x, y) = x^2 y^3$, $f_x$ vale:
+ $2xy^3$
- $3x^2y^2$
- $2xy^3 + 3x^2y^2$
- $6xy^2$
> $y^3$ é constante.

? Para $f(x, y) = e^{xy}$, $f_y$ vale:
- $e^{xy}$
- $y e^{xy}$
+ $x e^{xy}$
- $xy\,e^{xy}$
> Regra da cadeia com $y$ variando.

? O plano tangente a $z = f(x, y)$ em $(a, b)$ usa:
- só $f(a, b)$
+ $f(a, b)$, $f_x(a, b)$ e $f_y(a, b)$
- $f_{xx}$ e $f_{yy}$
- só as derivadas parciais
> $z = f + f_x(x - a) + f_y(y - b)$.

? Se $f_{xy}$ e $f_{yx}$ são contínuas, então:
+ $f_{xy} = f_{yx}$
- $f_{xy} = -f_{yx}$
- $f_{xy} = 0$
- não há relação
> Teorema de Clairaut.

? Para $z = f(x, y)$ com $x(t)$ e $y(t)$, $\frac{dz}{dt}$ é:
- $f_x + f_y$
- $f_x \cdot f_y$
+ $f_x x'(t) + f_y y'(t)$
- $f_x x'(t) \cdot f_y y'(t)$
> Soma dos caminhos da árvore.
```

## 5. Exercícios

**1.** Calcule $f_x$ e $f_y$ para $f(x, y) = \dfrac{x}{x + y}$.

<details>
<summary>Ver solução</summary>

$f_x = \frac{(x + y) - x}{(x + y)^2} = \frac{y}{(x + y)^2}$; $f_y = -\frac{x}{(x + y)^2}$.

</details>

**2.** Encontre o plano tangente a $z = \ln(x + 2y)$ em $(1, 0)$.

<details>
<summary>Ver solução</summary>

$f(1, 0) = 0$, $f_x = \frac{1}{x + 2y} = 1$, $f_y = \frac{2}{x + 2y} = 2$. Plano: $z = (x - 1) + 2y$.

</details>

**3.** Verifique que $u = e^{-t}\sin x$ satisfaz a equação do calor $u_t = u_{xx}$.

<details>
<summary>Ver solução</summary>

$u_t = -e^{-t}\sin x$; $u_x = e^{-t}\cos x$, $u_{xx} = -e^{-t}\sin x$. Iguais.

</details>

**4.** Se $z = x^2 + y^2$ com $x = s + t$ e $y = s - t$, calcule $\frac{\partial z}{\partial s}$.

<details>
<summary>Ver solução</summary>

$2x \cdot 1 + 2y \cdot 1 = 2(s + t) + 2(s - t) = 4s$. (Confira: $z = 2s^2 + 2t^2$.)

</details>

**5.** Encontre $\frac{dy}{dx}$ se $x^3 + y^3 = 6xy$.

<details>
<summary>Ver solução</summary>

$F = x^3 + y^3 - 6xy$; $y' = -\frac{3x^2 - 6y}{3y^2 - 6x} = \frac{2y - x^2}{y^2 - 2x}$.

</details>
