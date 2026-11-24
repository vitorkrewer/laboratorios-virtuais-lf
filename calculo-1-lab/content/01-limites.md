# Limites

O limite é a ideia que sustenta **todo** o Cálculo: derivada e integral são, ambas, definidas como limites. Entender bem este capítulo faz o resto fluir.

> [!INTUIÇÃO] O limite pergunta: *"para qual valor $f(x)$ está se aproximando quando $x$ chega perto de $a$?"* Não importa o que acontece **em** $a$, só o que acontece **perto** de $a$.

Teste isso no [simulador de limites](#/lab/limites): dê zoom em $a$ e veja os valores se estabilizarem.

## 1. Definição intuitiva

> [!DEFINIÇÃO] Dizemos que $\displaystyle\lim_{x \to a} f(x) = L$ se $f(x)$ fica arbitrariamente próximo de $L$ quando $x$ se aproxima de $a$ (por qualquer dos dois lados), com $x \neq a$.

O valor de $f(a)$ pode ser diferente de $L$ ou nem existir. Exemplo clássico:

$$f(x) = \frac{x^2 - 4}{x - 2}$$

Em $x = 2$ a função **não existe** ($0/0$), mas para $x \neq 2$ vale $x + 2$. Logo $\displaystyle\lim_{x\to 2} f(x) = 4$.

## 2. Limites laterais

- $\displaystyle\lim_{x \to a^-} f(x)$: aproximação **pela esquerda** ($x < a$).
- $\displaystyle\lim_{x \to a^+} f(x)$: aproximação **pela direita** ($x > a$).

> [!TEOREMA] O limite bilateral existe **se, e somente se,** os dois limites laterais existem e são iguais:
> $$\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L.$$

**Exemplo.** Para $f(x) = \dfrac{|x|}{x}$: à direita de $0$, $f = 1$; à esquerda, $f = -1$. Como são diferentes, $\displaystyle\lim_{x \to 0} \frac{|x|}{x}$ **não existe**.

Limites laterais são essenciais em funções definidas por partes e com módulo.

## 3. Propriedades

Se $\lim f(x) = L$ e $\lim g(x) = M$ (ambos finitos), então:

$$\lim (f \pm g) = L \pm M \qquad \lim (f \cdot g) = L \cdot M \qquad \lim \frac{f}{g} = \frac{L}{M} \ (M \neq 0)$$

$$\lim \big(c\,f(x)\big) = cL \qquad \lim \big(f(x)\big)^n = L^n \qquad \lim \sqrt[n]{f(x)} = \sqrt[n]{L}$$

## 4. Como calcular: o roteiro

Siga sempre esta ordem:

1. **Substituição direta.** Troque $x$ por $a$. Se der um número, acabou (para funções contínuas).
2. Se der $\dfrac{k}{0}$ com $k \neq 0$: o limite é infinito (ou não existe). Estude o **sinal** dos dois lados.
3. Se der **indeterminação** $\dfrac{0}{0}$: simplifique algebricamente (fatorar ou racionalizar) e substitua de novo.
4. Se envolver seno, cosseno, exponencial ou log: use os **limites fundamentais** (seção 7).

### Indeterminação $0/0$: fatorar

$$\lim_{x \to 3}\frac{x^2 - 9}{x - 3} = \lim_{x \to 3}\frac{(x-3)(x+3)}{x - 3} = \lim_{x \to 3}(x+3) = 6$$

### Indeterminação $0/0$: racionalizar

$$\lim_{x \to 0}\frac{\sqrt{x + 4} - 2}{x} = \lim_{x \to 0}\frac{(\sqrt{x+4}-2)(\sqrt{x+4}+2)}{x(\sqrt{x+4}+2)} = \lim_{x \to 0}\frac{x}{x(\sqrt{x+4}+2)} = \frac{1}{4}$$

> [!ATENÇÃO] São **sete** formas indeterminadas: $\frac{0}{0},\ \frac{\infty}{\infty},\ 0\cdot\infty,\ \infty - \infty,\ 1^\infty,\ 0^0,\ \infty^0$. "Indeterminada" significa que é preciso trabalhar mais; **não** significa que o limite não existe.

## 5. Limites no infinito

Para $x \to \pm\infty$ em razões de polinômios, **divida numerador e denominador pela maior potência de $x$** do denominador.

$$\lim_{x \to \infty}\frac{3x^2 + 5x}{2x^2 - 1} = \lim_{x \to \infty}\frac{3 + 5/x}{2 - 1/x^2} = \frac{3}{2}$$

Regra rápida para $\dfrac{P(x)}{Q(x)}$ quando $x \to \pm\infty$:

| Grau de $P$ vs. grau de $Q$ | Resultado |
|---|---|
| $\text{gr}\,P < \text{gr}\,Q$ | $0$ |
| $\text{gr}\,P = \text{gr}\,Q$ | razão dos coeficientes líderes |
| $\text{gr}\,P > \text{gr}\,Q$ | $\pm\infty$ |

A reta $y = L$ é uma **assíntota horizontal** quando $\lim_{x\to\pm\infty} f(x) = L$.

## 6. Limites infinitos e assíntotas verticais

Se $f(x)$ cresce sem limite quando $x \to a$, escrevemos $\displaystyle\lim_{x\to a} f(x) = +\infty$ e a reta $x = a$ é uma **assíntota vertical**. Exemplos:

$$\lim_{x \to 0^+}\frac{1}{x} = +\infty \qquad \lim_{x \to 0^-}\frac{1}{x} = -\infty \qquad \lim_{x \to 0}\frac{1}{x^2} = +\infty$$

## 7. Teorema do Confronto e limites fundamentais

> [!TEOREMA] **(Confronto)** Se $g(x) \leq f(x) \leq h(x)$ perto de $a$ e $\lim g = \lim h = L$, então $\lim f = L$.

É assim que se prova o limite mais importante da trigonometria. Outro uso comum: como $-1 \leq \sin\frac{1}{x} \leq 1$, temos $-x^2 \leq x^2\sin\frac{1}{x} \leq x^2$ e, portanto, $\displaystyle\lim_{x\to 0} x^2 \sin\tfrac{1}{x} = 0$.

### Os limites fundamentais

$$\lim_{x \to 0}\frac{\sin x}{x} = 1 \qquad \lim_{x \to 0}\frac{1 - \cos x}{x} = 0 \qquad \lim_{x \to 0}\frac{1 - \cos x}{x^2} = \frac{1}{2}$$

$$\lim_{x \to 0}\frac{e^x - 1}{x} = 1 \qquad \lim_{x \to 0}\frac{\ln(1+x)}{x} = 1 \qquad \lim_{x \to \pm\infty}\left(1 + \frac{1}{x}\right)^x = e$$

**Exemplo.** $\displaystyle\lim_{x\to 0}\frac{\sin 5x}{3x} = \frac{5}{3}\lim_{x\to 0}\frac{\sin 5x}{5x} = \frac{5}{3}\cdot 1 = \frac{5}{3}$.

> [!DICA] O truque é **forçar** o argumento do seno a aparecer também no denominador: multiplique e divida pela constante certa.

## 8. A definição formal (ε–δ)

Para quem quer o rigor: $\displaystyle\lim_{x \to a} f(x) = L$ significa que, para todo $\varepsilon > 0$, existe $\delta > 0$ tal que

$$0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon.$$

Em palavras: dada qualquer tolerância $\varepsilon$ na saída, existe uma vizinhança $\delta$ da entrada que garante essa tolerância. Muitos cursos cobram uma ou duas demonstrações assim; o roteiro é sempre "achar $\delta$ em função de $\varepsilon$".

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Calcule $\displaystyle\lim_{x\to 3}\frac{x^2-9}{x-3}$.
- $0$
- $3$
+ $6$
- Não existe
> Fatorando, $\frac{(x-3)(x+3)}{x-3}=x+3\to 6$.

? Calcule $\displaystyle\lim_{x\to\infty}\frac{5x^2+1}{2x^2-x}$.
+ $\frac52$
- $0$
- $+\infty$
- $5$
> Graus iguais: o limite é a razão dos coeficientes líderes, $\frac52$.

? Calcule $\displaystyle\lim_{x\to 0}\frac{\sin 4x}{x}$.
- $1$
- $\frac14$
+ $4$
- $0$
> $\frac{\sin 4x}{x}=4\cdot\frac{\sin 4x}{4x}\to 4\cdot 1$.

? Se $\displaystyle\lim_{x\to 1^-}f(x)=2$ e $\displaystyle\lim_{x\to 1^+}f(x)=5$, então:
+ $\displaystyle\lim_{x\to1}f(x)$ não existe
- $\displaystyle\lim_{x\to1}f(x)=2$
- $\displaystyle\lim_{x\to1}f(x)=3{,}5$
- $f(1)$ não pode estar definida
> Os limites laterais são diferentes, então o limite bilateral não existe. Sobre $f(1)$, nada se pode afirmar.

? Ao substituir $x=a$ você obtém $\frac00$. Isso significa que:
- o limite é $0$
- o limite não existe
- o limite é $1$
+ é uma indeterminação: é preciso simplificar (fatorar, racionalizar...)
> $\frac00$ não é um valor. O limite pode ser qualquer número, ou infinito, ou não existir; é preciso trabalhar a expressão.
```

## 9. Exercícios

**1.** Calcule $\displaystyle\lim_{x \to 1}\frac{x^2 + x - 2}{x - 1}$.

<details>
<summary>Ver solução</summary>

Substituindo, dá $0/0$. Fatorando: $x^2 + x - 2 = (x-1)(x+2)$. Então o limite é $\lim_{x\to1}(x+2) = 3$.

</details>

**2.** Calcule $\displaystyle\lim_{x \to \infty}\frac{4x^3 - x}{2x^3 + 7x^2}$.

<details>
<summary>Ver solução</summary>

Os graus são iguais, então o limite é a razão dos coeficientes líderes: $4/2 = 2$.

</details>

**3.** Calcule $\displaystyle\lim_{x \to 0}\frac{\tan x}{x}$.

<details>
<summary>Ver solução</summary>

$\dfrac{\tan x}{x} = \dfrac{\sin x}{x}\cdot\dfrac{1}{\cos x}$. Quando $x \to 0$, isso tende a $1 \cdot 1 = 1$.

</details>

**4.** Calcule $\displaystyle\lim_{x \to 0}\frac{\sin 3x}{\sin 5x}$.

<details>
<summary>Ver solução</summary>

$\dfrac{\sin 3x}{\sin 5x} = \dfrac{\sin 3x}{3x}\cdot\dfrac{5x}{\sin 5x}\cdot\dfrac{3}{5} \to 1 \cdot 1 \cdot \dfrac35 = \dfrac35$.

</details>

**5.** Existe $\displaystyle\lim_{x \to 2}\frac{|x - 2|}{x - 2}$?

<details>
<summary>Ver solução</summary>

Pela direita ($x > 2$), vale $1$. Pela esquerda ($x < 2$), vale $-1$. Os laterais são diferentes, então o limite **não existe**.

</details>

**6.** Calcule $\displaystyle\lim_{x \to 0}\frac{\sqrt{1 + x} - 1}{x}$.

<details>
<summary>Ver solução</summary>

Multiplicando pelo conjugado: $\dfrac{(1+x) - 1}{x(\sqrt{1+x}+1)} = \dfrac{1}{\sqrt{1+x}+1} \to \dfrac12$.

</details>
