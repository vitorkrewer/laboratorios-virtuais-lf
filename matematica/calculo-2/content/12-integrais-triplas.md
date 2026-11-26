# Integrais triplas: cilíndricas e esféricas

A integral tripla soma uma grandeza distribuída num **sólido**: massa de um objeto com densidade variável, carga numa região, ou simplesmente o volume. O cálculo segue a mesma lógica da dupla (três integrais encaixadas), e a escolha das coordenadas certas, cilíndricas ou esféricas, costuma decidir entre uma conta de uma linha e uma de uma página.

## 1. Definição e Fubini

> [!DEFINIÇÃO] $\displaystyle\iiint_E f(x, y, z)\,dV$ é o limite das somas $\sum f(\cdot)\,\Delta V$ sobre caixinhas que preenchem o sólido $E$. Com $f = 1$, dá o **volume** de $E$; com $f = \rho$ (densidade), a **massa**.

Numa caixa $[a, b] \times [c, d] \times [p, q]$, integra-se em qualquer ordem. Ex.:
$$\int_0^1\int_0^1\int_0^1 xyz\,dz\,dy\,dx = \frac12 \cdot \frac12 \cdot \frac12 = \frac18.$$

Num sólido entre duas superfícies, $u_1(x, y) \le z \le u_2(x, y)$, sobre uma região $D$ do plano:
$$\iiint_E f\,dV = \iint_D\left(\int_{u_1(x,y)}^{u_2(x,y)} f\,dz\right)dA.$$

**Exemplo.** Volume do tetraedro $x, y, z \ge 0$, $x + y + z \le 1$:
$$\int_0^1\int_0^{1 - x}\int_0^{1 - x - y} dz\,dy\,dx = \int_0^1\frac{(1 - x)^2}{2}\,dx = \frac16.$$

## 2. Coordenadas cilíndricas

São as polares no plano $xy$ com a altura $z$ mantida: $x = r\cos\theta$, $y = r\sin\theta$, $z = z$.

> [!TEOREMA] $dV = r\,dz\,dr\,d\theta$.

Use quando o sólido tem **simetria em torno do eixo $z$**: cilindros, cones, paraboloides.

**Exemplo.** Volume sob o paraboloide $z = 4 - x^2 - y^2$, acima de $z = 0$:
$$\int_0^{2\pi}\int_0^2\int_0^{4 - r^2} r\,dz\,dr\,d\theta = 2\pi\int_0^2 (4r - r^3)\,dr = 2\pi(8 - 4) = 8\pi.$$

## 3. Coordenadas esféricas

Um ponto é descrito pela distância à origem $\rho$, pelo ângulo $\varphi$ medido a partir do eixo $z$ positivo ($0 \le \varphi \le \pi$) e pelo mesmo $\theta$ das polares:
$$x = \rho\sin\varphi\cos\theta, \quad y = \rho\sin\varphi\sin\theta, \quad z = \rho\cos\varphi.$$

> [!TEOREMA] $dV = \rho^2\sin\varphi\;d\rho\,d\varphi\,d\theta$.

Use quando o sólido é uma **esfera, parte de esfera ou cone com vértice na origem**, ou quando o integrando tem $x^2 + y^2 + z^2 = \rho^2$.

**Exemplo (volume da bola).** $\displaystyle\int_0^{2\pi}\int_0^\pi\int_0^a \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = 2\pi \cdot 2 \cdot \frac{a^3}{3} = \frac43\pi a^3$.

**Exemplo.** $\displaystyle\iiint_B (x^2 + y^2 + z^2)\,dV$ na bola unitária $= \int_0^{2\pi}\int_0^\pi\int_0^1 \rho^4\sin\varphi\,d\rho\,d\varphi\,d\theta = 2\pi\cdot 2\cdot\frac15 = \frac{4\pi}{5}$.

> [!INTUIÇÃO] A caixinha esférica tem lados $d\rho$, $\rho\,d\varphi$ (arco de meridiano) e $\rho\sin\varphi\,d\theta$ (arco de paralelo, cujo raio é $\rho\sin\varphi$). O produto é $\rho^2\sin\varphi$.

## 4. O jacobiano (o padrão por trás dos fatores)

Os fatores $r$ e $\rho^2\sin\varphi$ não são acidentes. Numa mudança de variáveis $x = x(u, v)$, $y = y(u, v)$, a área se deforma pelo módulo do **jacobiano**:

> [!DEFINIÇÃO] $J = \dfrac{\partial(x, y)}{\partial(u, v)} = \det\begin{pmatrix} x_u & x_v \\ y_u & y_v \end{pmatrix}$, e $dA = |J|\,du\,dv$.

Para polares: $J = \det\begin{pmatrix}\cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta\end{pmatrix} = r$. É o mesmo determinante da Álgebra Linear: o fator de mudança de área da transformação (aqui, localmente).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Em coordenadas cilíndricas, $dV$ é:
- $dz\,dr\,d\theta$
+ $r\,dz\,dr\,d\theta$
- $r^2\,dz\,dr\,d\theta$
- $\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$
> Polares mais a altura.

? Em coordenadas esféricas, $dV$ é:
- $\rho\,d\rho\,d\varphi\,d\theta$
+ $\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$
- $\rho^2\cos\varphi\,d\rho\,d\varphi\,d\theta$
- $\rho\sin\varphi\,d\rho\,d\varphi\,d\theta$
> Lados $d\rho$, $\rho\,d\varphi$ e $\rho\sin\varphi\,d\theta$.

? Para o sólido dentro do cilindro $x^2 + y^2 = 1$ entre $z = 0$ e $z = 3$, a melhor escolha é:
+ cilíndricas
- esféricas
- cartesianas, sempre
- polares no plano $xz$
> Simetria em torno do eixo $z$.

? $\displaystyle\iiint_E 1\,dV$ dá:
- a área da superfície de $E$
+ o volume de $E$
- a massa, para qualquer densidade
- zero
> Caixinhas de valor $1$.

? Em esféricas, o semiespaço $z \ge 0$ corresponde a:
- $0 \le \theta \le \pi$
+ $0 \le \varphi \le \frac{\pi}{2}$
- $0 \le \rho \le 1$
- $\frac{\pi}{2} \le \varphi \le \pi$
> $z = \rho\cos\varphi \ge 0$ exige $\cos\varphi \ge 0$.
```

## 5. Exercícios

**1.** Calcule $\displaystyle\iiint_E z\,dV$, com $E = [0, 1] \times [0, 2] \times [0, 3]$.

<details>
<summary>Ver solução</summary>

$1 \cdot 2 \cdot \frac{9}{2} = 9$.

</details>

**2.** Calcule o volume do cilindro de raio $a$ e altura $h$ em coordenadas cilíndricas.

<details>
<summary>Ver solução</summary>

$\int_0^{2\pi}\int_0^a\int_0^h r\,dz\,dr\,d\theta = 2\pi\cdot\frac{a^2}{2}\cdot h = \pi a^2 h$.

</details>

**3.** Calcule o volume do sólido acima do cone $\varphi = \frac{\pi}{4}$ e dentro da esfera $\rho = 2$ (um "sorvete").

<details>
<summary>Ver solução</summary>

$\int_0^{2\pi}\int_0^{\pi/4}\int_0^2 \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = 2\pi\left(1 - \frac{\sqrt2}{2}\right)\frac{8}{3} = \frac{16\pi}{3}\left(1 - \frac{\sqrt2}{2}\right) \approx 4{,}91$.

</details>

**4.** Calcule o jacobiano de $x = 2u$, $y = 3v$ e use-o para achar a área da elipse $\frac{x^2}{4} + \frac{y^2}{9} \le 1$.

<details>
<summary>Ver solução</summary>

$J = \det\begin{pmatrix}2 & 0 \\ 0 & 3\end{pmatrix} = 6$. A elipse vira o disco unitário $u^2 + v^2 \le 1$, de área $\pi$. Área: $6\pi$.

</details>
