# Gráficos e transformações

Você não precisa decorar dezenas de gráficos. Basta conhecer **meia dúzia de gráficos básicos** e saber como eles se **deslocam, esticam e refletem**. Com isso, esboça em segundos funções como $y = 2(x-3)^2 + 1$ ou $y = -\sqrt{x + 4}$.

> [!INTUIÇÃO] Abra o [simulador de transformações](#/lab/transformacoes): escolha uma função base e mexa nos parâmetros $a$, $b$, $h$ e $k$ de $y = a\,f\big(b(x - h)\big) + k$.

## 1. Os gráficos básicos

| Função | Domínio | Imagem | Forma |
|---|---|---|---|
| $x^2$ | $\mathbb{R}$ | $[0, +\infty)$ | parábola, vértice na origem |
| $x^3$ | $\mathbb{R}$ | $\mathbb{R}$ | sobe sempre, inflexão na origem |
| $\lvert x\rvert$ | $\mathbb{R}$ | $[0, +\infty)$ | "V" com bico na origem |
| $\sqrt{x}$ | $[0, +\infty)$ | $[0, +\infty)$ | meia parábola deitada |
| $\frac1x$ | $\mathbb{R}-\{0\}$ | $\mathbb{R}-\{0\}$ | hipérbole, assíntotas nos eixos |
| $e^x$ | $\mathbb{R}$ | $(0, +\infty)$ | cresce rápido, passa por $(0,1)$ |
| $\ln x$ | $(0, +\infty)$ | $\mathbb{R}$ | cresce devagar, passa por $(1,0)$ |
| $\sin x$ | $\mathbb{R}$ | $[-1, 1]$ | onda de período $2\pi$ |

## 2. Translações

| Transformação | Efeito no gráfico |
|---|---|
| $y = f(x) + k$ | sobe $k$ (desce se $k < 0$) |
| $y = f(x - h)$ | vai $h$ para a **direita** (esquerda se $h < 0$) |

> [!ATENÇÃO] O deslocamento horizontal é "ao contrário": $f(x - 3)$ vai para a **direita**, e $f(x + 3)$ para a **esquerda**. Motivo: o ponto que antes estava em $x = 0$ agora aparece quando $x - 3 = 0$, isto é, em $x = 3$.

**Exemplo.** $y = (x - 2)^2 + 1$ é a parábola $x^2$ com vértice levado para $(2, 1)$.

## 3. Reflexões

| Transformação | Efeito |
|---|---|
| $y = -f(x)$ | reflete no eixo $x$ (vira de cabeça para baixo) |
| $y = f(-x)$ | reflete no eixo $y$ (espelha esquerda/direita) |

**Exemplo.** $y = -\sqrt{x}$ fica abaixo do eixo; $y = \sqrt{-x}$ fica à esquerda, com domínio $(-\infty, 0]$.

## 4. Dilatações (esticar e comprimir)

| Transformação | Efeito |
|---|---|
| $y = a\,f(x)$, $a > 1$ | estica **verticalmente** pelo fator $a$ |
| $y = a\,f(x)$, $0 < a < 1$ | comprime verticalmente |
| $y = f(bx)$, $b > 1$ | comprime **horizontalmente** pelo fator $b$ |
| $y = f(bx)$, $0 < b < 1$ | estica horizontalmente |

De novo, o horizontal é "ao contrário": $\sin(2x)$ completa a onda duas vezes mais rápido (período $\pi$).

## 5. Combinando: a ordem importa

Para $y = a\,f\big(b(x - h)\big) + k$, aplique a partir de $f$:

1. dilatação horizontal por $b$ (e reflexão se $b < 0$);
2. translação horizontal de $h$;
3. dilatação vertical por $a$ (e reflexão se $a < 0$);
4. translação vertical de $k$.

> [!DICA] Fatore o coeficiente de $x$ antes de ler o deslocamento. Em $y = \sqrt{2x - 6}$, escreva $\sqrt{2(x - 3)}$: o deslocamento é $3$ para a direita, e **não** $6$.

**Exemplo.** Esboce $y = -2|x + 1| + 3$. Parta de $|x|$: desloque $1$ para a esquerda, estique verticalmente por $2$, reflita no eixo $x$ (fica um "V" invertido) e suba $3$. O bico vai para $(-1, 3)$, que é o ponto de máximo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O gráfico de $y = (x + 4)^2$ é o de $y = x^2$ deslocado:
- 4 unidades para a direita
+ 4 unidades para a esquerda
- 4 unidades para cima
- 4 unidades para baixo
> $f(x + 4) = f(x - (-4))$: deslocamento horizontal de $-4$.

? Qual é o vértice de $y = (x - 1)^2 - 5$?
+ $(1, -5)$
- $(-1, -5)$
- $(1, 5)$
- $(-1, 5)$
> Desloca $1$ para a direita e $5$ para baixo.

? O gráfico de $y = -e^x$ é o de $e^x$:
- refletido no eixo $y$
+ refletido no eixo $x$
- deslocado para baixo
- comprimido horizontalmente
> O sinal multiplica a saída: reflete no eixo $x$. Já $e^{-x}$ seria a reflexão no eixo $y$.

? Qual é o período de $y = \sin(3x)$?
- $6\pi$
- $3\pi$
+ $\frac{2\pi}{3}$
- $2\pi$
> Compressão horizontal por $3$: o período $2\pi$ vira $\frac{2\pi}{3}$.

? Em $y = \sqrt{2x + 8}$, o gráfico começa no ponto:
- $(8, 0)$
- $(4, 0)$
+ $(-4, 0)$
- $(-8, 0)$
> $\sqrt{2(x + 4)}$: deslocamento de $4$ para a esquerda. O domínio é $x \ge -4$.
```

## 6. Exercícios

**1.** Descreva as transformações que levam $y = x^2$ em $y = 3(x + 2)^2 - 4$ e dê o vértice.

<details>
<summary>Ver solução</summary>

Desloca $2$ para a esquerda, estica verticalmente por $3$ e desce $4$. Vértice $(-2, -4)$.

</details>

**2.** Qual é o domínio e a imagem de $y = -\sqrt{x - 1} + 2$?

<details>
<summary>Ver solução</summary>

Domínio: $x \ge 1$, isto é, $[1, +\infty)$. Como $\sqrt{x-1} \ge 0$, temos $y \le 2$: imagem $(-\infty, 2]$.

</details>

**3.** Escreva a função obtida ao deslocar $y = \frac1x$ três unidades para a direita e uma para cima. Quais são as assíntotas?

<details>
<summary>Ver solução</summary>

$y = \dfrac{1}{x - 3} + 1$. Assíntota vertical $x = 3$ e horizontal $y = 1$.

</details>

**4.** Qual é a imagem de $y = 2\sin x - 1$?

<details>
<summary>Ver solução</summary>

$\sin x \in [-1, 1] \Rightarrow 2\sin x \in [-2, 2] \Rightarrow y \in [-3, 1]$.

</details>
