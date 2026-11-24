# A derivada: definição e significado

A derivada responde a uma pergunta simples e poderosa: **com que rapidez uma grandeza está mudando, neste exato instante?** Velocidade, crescimento populacional, taxa de juros, inclinação de uma curva: tudo é derivada.

## 1. Da taxa média à taxa instantânea

A **taxa média** de variação de $f$ entre $x_0$ e $x_0 + h$ é a inclinação da **reta secante**:

$$\frac{\Delta f}{\Delta x} = \frac{f(x_0 + h) - f(x_0)}{h}$$

Quando $h$ fica cada vez menor, o segundo ponto se aproxima do primeiro, e a secante vai se transformando na **reta tangente**.

> [!INTUIÇÃO] No [simulador de derivada](#/lab/derivada), arraste $h$ até zero e veja a reta amarela (secante) cair sobre a verde (tangente). A inclinação da tangente é a derivada. Em **Função**, escolha *Digitar minha função* para testar qualquer $f(x)$ da sua lista de exercícios.

## 2. Definição

> [!DEFINIÇÃO] A **derivada** de $f$ em $x_0$ é
> $$f'(x_0) = \lim_{h \to 0}\frac{f(x_0 + h) - f(x_0)}{h},$$
> quando esse limite existe. Dizemos então que $f$ é **derivável** (ou diferenciável) em $x_0$.

Uma forma equivalente, útil em alguns exercícios:

$$f'(a) = \lim_{x \to a}\frac{f(x) - f(a)}{x - a}$$

Notações equivalentes para a derivada: $f'(x)$, $\dfrac{dy}{dx}$, $\dfrac{d}{dx}f(x)$, $y'$.

### Significados

- **Geométrico:** $f'(x_0)$ é a inclinação da reta tangente ao gráfico em $(x_0, f(x_0))$.
- **Físico:** se $s(t)$ é a posição, $s'(t)$ é a **velocidade** instantânea e $s''(t)$ é a **aceleração**.
- **Geral:** $f'(x_0)$ é a taxa de variação instantânea de $f$ em relação a $x$.

## 3. Calculando pela definição

Para $f(x) = x^2$:

$$f'(x) = \lim_{h \to 0}\frac{(x+h)^2 - x^2}{h} = \lim_{h\to 0}\frac{2xh + h^2}{h} = \lim_{h \to 0}(2x + h) = 2x$$

Para $f(x) = \sqrt{x}$ (com $x > 0$), racionalizando:

$$f'(x) = \lim_{h\to 0}\frac{\sqrt{x+h} - \sqrt{x}}{h} = \lim_{h \to 0}\frac{1}{\sqrt{x+h} + \sqrt{x}} = \frac{1}{2\sqrt{x}}$$

Para $f(x) = \dfrac{1}{x}$:

$$f'(x) = \lim_{h \to 0}\frac{\frac{1}{x+h} - \frac1x}{h} = \lim_{h\to0}\frac{-h}{h\,x(x+h)} = -\frac{1}{x^2}$$

> [!DICA] O padrão é sempre o mesmo: expanda, **cancele o $h$ do numerador** com o do denominador e só então faça $h \to 0$. Se o $h$ não cancelar, você errou alguma conta.

## 4. A reta tangente

A reta tangente ao gráfico de $f$ em $x_0$ é

$$y - f(x_0) = f'(x_0)\,(x - x_0).$$

**Exemplo.** Tangente a $y = x^2$ em $x_0 = 3$: $f(3) = 9$ e $f'(3) = 6$. Logo, $y - 9 = 6(x - 3)$, ou seja, $y = 6x - 9$.

A **reta normal** é perpendicular à tangente e tem inclinação $-\dfrac{1}{f'(x_0)}$ (quando $f'(x_0) \neq 0$).

## 5. Derivabilidade e continuidade

> [!TEOREMA] Se $f$ é derivável em $a$, então $f$ é contínua em $a$.

A **recíproca é falsa**: $f(x) = |x|$ é contínua em $0$, mas não é derivável ali. As derivadas laterais são diferentes:

$$\lim_{h\to0^+}\frac{|h|}{h} = 1 \qquad \lim_{h\to0^-}\frac{|h|}{h} = -1$$

Uma função **não é derivável** em pontos com:

- **bico** (quina), como $|x|$ em $0$;
- **descontinuidade**;
- **tangente vertical**, como $\sqrt[3]{x}$ em $0$.

## 6. A função derivada

Se $f'(x)$ existe para cada $x$ de um conjunto, temos uma nova função $f'$. A derivada de $f'$ é a **derivada segunda** $f''$, e assim por diante.

Em movimento retilíneo: $s \to v = s' \to a = s''$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Geometricamente, $f'(a)$ é:
+ a inclinação da reta tangente ao gráfico em $(a,f(a))$
- a área sob o gráfico de $0$ até $a$
- o valor de $f$ no ponto $a$
- a inclinação de qualquer reta secante
> A derivada é o limite das inclinações das secantes: a inclinação da tangente.

? Qual expressão define $f'(x)$?
+ $\displaystyle\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$
- $\dfrac{f(x+h)-f(x)}{h}$
- $\displaystyle\lim_{h\to0}f(x+h)$
- $\displaystyle\lim_{h\to0}\frac{f(x)-f(h)}{x-h}$
> Sem o limite, a expressão é só a inclinação de uma secante.

? A reta tangente a $y=x^2$ em $x=1$ é:
+ $y=2x-1$
- $y=2x$
- $y=x+1$
- $y=2x+1$
> $f(1)=1$ e $f'(1)=2$, então $y-1=2(x-1)$.

? Sobre $f(x)=|x|$ em $x=0$:
+ é contínua, mas não é derivável
- é contínua e derivável
- não é contínua nem derivável
- é derivável, mas não é contínua
> Há um bico em $0$: as derivadas laterais são $-1$ e $1$. E derivável implica contínua, nunca o contrário.

? Se a posição é $s(t)=5t^2$ (metros), qual é a velocidade em $t=3$ s?
- $45$ m/s
+ $30$ m/s
- $15$ m/s
- $10$ m/s
> $v(t)=s'(t)=10t$, logo $v(3)=30$ m/s.
```

## 7. Exercícios

**1.** Use a definição para encontrar $f'(x)$ se $f(x) = 3x^2 - 2x$.

<details>
<summary>Ver solução</summary>

$$\frac{3(x+h)^2 - 2(x+h) - 3x^2 + 2x}{h} = \frac{6xh + 3h^2 - 2h}{h} = 6x + 3h - 2 \to 6x - 2.$$

</details>

**2.** Determine a reta tangente a $f(x) = \sqrt{x}$ em $x_0 = 4$.

<details>
<summary>Ver solução</summary>

$f(4) = 2$ e $f'(x) = \dfrac{1}{2\sqrt x}$, então $f'(4) = \dfrac14$. A tangente é $y - 2 = \dfrac14(x - 4)$, isto é, $y = \dfrac{x}{4} + 1$.

</details>

**3.** A função $f(x) = |x - 2|$ é derivável em $x = 2$?

<details>
<summary>Ver solução</summary>

Não. As derivadas laterais em $2$ são $+1$ (direita) e $-1$ (esquerda); como diferem, a derivada não existe. O gráfico tem um bico em $x=2$.

</details>

**4.** Se $s(t) = t^2 + 3t$ (em metros, com $t$ em segundos), qual é a velocidade em $t = 2$?

<details>
<summary>Ver solução</summary>

$s'(t) = 2t + 3$ (pela definição ou pelas regras do próximo capítulo). Em $t = 2$, $v = 7$ m/s.

</details>
