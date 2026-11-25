# Resumo e erros comuns

Consulta rápida de todo o livro. Use antes da prova e nos primeiros capítulos de Cálculo I.

## Catálogo de funções

| Função | Domínio | Imagem | Marca registrada |
|---|---|---|---|
| $ax + b$ | $\mathbb{R}$ | $\mathbb{R}$ ($a \ne 0$) | taxa constante $a$ |
| $ax^2 + bx + c$ | $\mathbb{R}$ | $[y_v, \infty)$ ou $(-\infty, y_v]$ | vértice $x_v = -\frac{b}{2a}$ |
| $\lvert x\rvert$ | $\mathbb{R}$ | $[0, \infty)$ | bico na origem |
| $\sqrt{x}$ | $[0, \infty)$ | $[0, \infty)$ | inversa de $x^2$ ($x \ge 0$) |
| $\frac1x$ | $\mathbb{R} - \{0\}$ | $\mathbb{R} - \{0\}$ | assíntotas nos eixos |
| $a^x$ | $\mathbb{R}$ | $(0, \infty)$ | assíntota $y = 0$, passa por $(0,1)$ |
| $\log_a x$ | $(0, \infty)$ | $\mathbb{R}$ | assíntota $x = 0$, passa por $(1,0)$ |
| $\sin x$, $\cos x$ | $\mathbb{R}$ | $[-1, 1]$ | período $2\pi$ |
| $\tan x$ | $x \ne \frac{\pi}{2} + k\pi$ | $\mathbb{R}$ | período $\pi$ |
| $\arctan x$ | $\mathbb{R}$ | $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$ | assíntotas $y = \pm\frac{\pi}{2}$ |

## Transformações

$$y = a\,f\big(b(x - h)\big) + k$$

$h > 0$: direita; $k > 0$: cima; $a < 0$: reflete no eixo $x$; $b < 0$: reflete no eixo $y$; $|a| > 1$ estica na vertical; $|b| > 1$ comprime na horizontal.

## Fórmulas-chave

$$\Delta = b^2 - 4ac \qquad x = \frac{-b \pm\sqrt\Delta}{2a} \qquad V = \left(-\frac{b}{2a},\ -\frac{\Delta}{4a}\right)$$

$$\log_a x = y \iff a^y = x \qquad \log_a(xy) = \log_a x + \log_a y \qquad \log_a x^k = k\log_a x \qquad \log_a x = \frac{\ln x}{\ln a}$$

$$(f\circ g)(x) = f(g(x)) \qquad f^{-1}(f(x)) = x \qquad \text{período de } \sin(Bx) = \frac{2\pi}{|B|}$$

## Erros comuns

> [!ATENÇÃO] **Deslocar para o lado errado.** $f(x - 3)$ vai para a **direita**.

> [!ATENÇÃO] **Esquecer de fatorar o coeficiente.** $\sqrt{2x - 6} = \sqrt{2(x - 3)}$: deslocamento $3$, não $6$.

> [!ATENÇÃO] **Confundir $f^{-1}(x)$ com $\frac{1}{f(x)}$.**

> [!ATENÇÃO] **Inverter a ordem da composta.** Em $f \circ g$, $g$ age primeiro.

> [!ATENÇÃO] **Esquecer a condição de existência do logaritmo** e aceitar soluções com argumento negativo ou nulo.

> [!ATENÇÃO] **Inventar propriedades:** $\log(x + y) \ne \log x + \log y$ e $(a + b)^x \ne a^x + b^x$.

> [!ATENÇÃO] **Esquecer de inverter a desigualdade** com base entre $0$ e $1$, tanto em exponenciais quanto em logaritmos.

> [!ATENÇÃO] **Usar graus no Cálculo.** Calculadora e fórmulas em radianos.

> [!ATENÇÃO] **Calcular o vértice e não responder à pergunta.** Em otimização, diga *qual* valor de $x$ e *qual* o máximo ou mínimo, com unidade.

## Próximo passo

Você tem agora as ferramentas que o Cálculo I usa em todo capítulo. Siga para o livro [Cálculo I](../calculo-1/). Se travar em intervalos, inequações ou módulo, volte ao livro [Fundamentos](../fundamentos/).
