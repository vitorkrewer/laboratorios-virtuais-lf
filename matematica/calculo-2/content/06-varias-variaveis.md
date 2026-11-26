# Funções de várias variáveis

A temperatura numa sala depende da posição $(x, y, z)$; o lucro depende do preço e da quantidade; a altitude num mapa depende da latitude e da longitude. Funções de várias variáveis descrevem essas situações. Com duas entradas, o gráfico vira uma **superfície** no espaço, e o mapa de contorno vira a ferramenta principal para enxergá-la.

> [!DICA] No simulador [Superfícies](#/lab/superficies), digite $f(x, y)$, gire a superfície com o mouse e compare com as curvas de nível no plano.

## 1. Domínio e imagem

> [!DEFINIÇÃO] Uma função de duas variáveis associa a cada par $(x, y)$ de um conjunto $D \subset \mathbb{R}^2$ (o **domínio**) um único número $z = f(x, y)$. O **gráfico** é o conjunto dos pontos $(x, y, f(x, y))$, uma superfície em $\mathbb{R}^3$.

O domínio natural é o maior conjunto onde a fórmula faz sentido, com as mesmas restrições do Cálculo I: nada de divisão por zero, raiz par de negativo ou logaritmo de não positivo.

| Função | Domínio |
|---|---|
| $f(x, y) = \sqrt{9 - x^2 - y^2}$ | disco $x^2 + y^2 \le 9$ |
| $f(x, y) = \ln(y - x)$ | semiplano $y > x$ |
| $f(x, y) = \dfrac{1}{x^2 - y}$ | plano todo menos a parábola $y = x^2$ |

## 2. Curvas de nível

> [!DEFINIÇÃO] A **curva de nível** $k$ de $f$ é o conjunto $\{(x, y) : f(x, y) = k\}$. É a "fatia" da superfície na altura $z = k$, projetada no plano $xy$.

| Função | Curvas de nível | Superfície |
|---|---|---|
| $x^2 + y^2$ | circunferências | paraboloide (tigela) |
| $\sqrt{x^2 + y^2}$ | circunferências igualmente espaçadas | cone |
| $x^2 - y^2$ | hipérboles | sela |
| $2x + 3y$ | retas paralelas | plano |

> [!INTUIÇÃO] É exatamente o mapa topográfico: curvas de nível próximas significam terreno íngreme; afastadas, terreno plano. As do paraboloide ficam cada vez mais próximas ao se afastar da origem, porque a tigela fica mais inclinada.

Com três variáveis, $f(x, y, z) = k$ define **superfícies de nível** (ex.: esferas para $x^2 + y^2 + z^2$).

## 3. Limites e continuidade

> [!DEFINIÇÃO] $\displaystyle\lim_{(x,y) \to (a,b)} f(x, y) = L$ se $f(x, y)$ fica arbitrariamente perto de $L$ quando $(x, y)$ se aproxima de $(a, b)$ **por qualquer caminho**.

No plano há infinitos caminhos até um ponto (retas, parábolas, espirais), e o limite tem de ser o mesmo em todos.

> [!TEOREMA] **(Teste dos dois caminhos)** Se dois caminhos até $(a, b)$ dão limites diferentes, o limite **não existe**.

**Exemplo.** $f(x, y) = \dfrac{xy}{x^2 + y^2}$ em $(0, 0)$. Pelo eixo $x$ ($y = 0$): $f = 0$. Pela reta $y = x$: $f = \frac{x^2}{2x^2} = \frac12$. Limites diferentes: não existe.

> [!ATENÇÃO] Concordar em muitos caminhos não prova que o limite existe. Para $f = \dfrac{x^2 y}{x^4 + y^2}$, todas as retas pela origem dão $0$, mas a parábola $y = x^2$ dá $\frac12$. Para **provar** a existência, use confronto ou coordenadas polares.

**Exemplo (polares).** $\dfrac{x^2 y}{x^2 + y^2}$ com $x = r\cos\theta$, $y = r\sin\theta$ vira $r\cos^2\theta\sin\theta$, cujo módulo é $\le r \to 0$. O limite é $0$.

Polinômios, e somas, produtos, quocientes (com denominador não nulo) e composições de funções contínuas são contínuos, e o limite se calcula por substituição.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O domínio de $f(x, y) = \sqrt{x - y}$ é:
+ $y \le x$
- $y < x$
- $x \ge 0$ e $y \ge 0$
- o plano todo
> Raiz quadrada exige $x - y \ge 0$.

? As curvas de nível de $f(x, y) = x^2 + 4y^2$ são:
- circunferências
+ elipses
- hipérboles
- retas
> $x^2 + 4y^2 = k$.

? Curvas de nível muito próximas num mapa indicam:
+ superfície íngreme
- superfície plana
- um ponto de máximo
- descontinuidade
> A altura muda muito numa distância pequena.

? Se pelo eixo $x$ o limite é $0$ e pela reta $y = x$ é $1$, o limite:
- é $0$
- é $\frac12$
+ não existe
- é $1$
> Teste dos dois caminhos.

? $\displaystyle\lim_{(x,y)\to(1,2)} (x^2 y + 3)$ vale:
- $3$
+ $5$
- $7$
- não existe
> Polinômio: substitua. $1 \cdot 2 + 3$.
```

## 4. Exercícios

**1.** Determine e descreva o domínio de $f(x, y) = \dfrac{\ln(x + y)}{\sqrt{1 - x^2}}$.

<details>
<summary>Ver solução</summary>

$x + y > 0$ e $1 - x^2 > 0$: a faixa $-1 < x < 1$, acima da reta $y = -x$.

</details>

**2.** Descreva as curvas de nível de $f(x, y) = y - x^2$.

<details>
<summary>Ver solução</summary>

$y = x^2 + k$: parábolas iguais, deslocadas verticalmente.

</details>

**3.** Mostre que $\displaystyle\lim_{(x,y)\to(0,0)} \frac{x^2 - y^2}{x^2 + y^2}$ não existe.

<details>
<summary>Ver solução</summary>

Eixo $x$: $1$. Eixo $y$: $-1$. Diferentes.

</details>

**4.** Calcule $\displaystyle\lim_{(x,y)\to(0,0)} \frac{x^3 + y^3}{x^2 + y^2}$.

<details>
<summary>Ver solução</summary>

Em polares: $r(\cos^3\theta + \sin^3\theta)$, com módulo $\le 2r \to 0$. O limite é $0$.

</details>
