# Formulário completo

Referência rápida para a véspera da prova. **Não é para decorar de uma vez:** use para checar o que você já treinou. Confira também se o seu professor permite consulta.

## Limites

$$\lim_{x\to0}\frac{\sin x}{x} = 1 \qquad \lim_{x\to0}\frac{1-\cos x}{x} = 0 \qquad \lim_{x\to0}\frac{1-\cos x}{x^2} = \frac12 \qquad \lim_{x\to 0}\frac{\tan x}{x} = 1$$

$$\lim_{x\to0}\frac{e^x-1}{x} = 1 \qquad \lim_{x\to0}\frac{\ln(1+x)}{x} = 1 \qquad \lim_{x\to\pm\infty}\Big(1+\frac1x\Big)^x = e \qquad \lim_{x\to0}(1+x)^{1/x} = e$$

| Situação | Ferramenta |
|---|---|
| $0/0$ com polinômios | Fatorar e cancelar |
| $0/0$ com raízes | Multiplicar pelo conjugado |
| $x\to\pm\infty$, razão de polinômios | Dividir pela maior potência |
| $0/0$ ou $\infty/\infty$ com funções transcendentes | L'Hôpital |
| Função limitada $\times$ função que tende a $0$ | Confronto |

## Derivadas

| $f$ | $f'$ | $f$ | $f'$ |
|---|---|---|---|
| $x^n$ | $nx^{n-1}$ | $\sin x$ | $\cos x$ |
| $e^x$ | $e^x$ | $\cos x$ | $-\sin x$ |
| $a^x$ | $a^x\ln a$ | $\tan x$ | $\sec^2x$ |
| $\ln x$ | $1/x$ | $\sec x$ | $\sec x\tan x$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ | $\arctan x$ | $\dfrac{1}{1+x^2}$ |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt x}$ | $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ |

$$(uv)' = u'v + uv' \qquad \left(\frac uv\right)' = \frac{u'v - uv'}{v^2} \qquad \big(f(g(x))\big)' = f'(g(x))\,g'(x)$$

**Reta tangente:** $y - f(a) = f'(a)(x - a)$.

## Aplicações da derivada

| Teste | Conclusão |
|---|---|
| $f' > 0$ | $f$ crescente |
| $f' < 0$ | $f$ decrescente |
| $f'(c) = 0$ e $f''(c) > 0$ | mínimo local |
| $f'(c) = 0$ e $f''(c) < 0$ | máximo local |
| $f'' > 0$ | côncava para cima |
| $f'' < 0$ | côncava para baixo |
| $f''$ muda de sinal | ponto de inflexão |

**Valor Médio:** $f'(c) = \dfrac{f(b)-f(a)}{b-a}$. **L'Hôpital:** $\lim\dfrac fg = \lim\dfrac{f'}{g'}$ (se $\frac00$ ou $\frac\infty\infty$).

## Integrais

| $f$ | $\int f\,dx$ | $f$ | $\int f\,dx$ |
|---|---|---|---|
| $x^n\ (n\ne-1)$ | $\dfrac{x^{n+1}}{n+1}+C$ | $\sin x$ | $-\cos x + C$ |
| $\dfrac1x$ | $\ln\lvert x\rvert+C$ | $\cos x$ | $\sin x + C$ |
| $e^x$ | $e^x + C$ | $\sec^2 x$ | $\tan x + C$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + C$ | $\dfrac1{1+x^2}$ | $\arctan x + C$ |
| $\tan x$ | $-\ln\lvert\cos x\rvert + C$ | $\dfrac1{\sqrt{1-x^2}}$ | $\arcsin x + C$ |

**TFC:** $\displaystyle\int_a^b f\,dx = F(b) - F(a)$ e $\displaystyle\frac{d}{dx}\int_a^{x}f(t)\,dt = f(x)$.

**Substituição:** $\displaystyle\int f(g(x))g'(x)\,dx = \int f(u)\,du$.

**Por partes:** $\displaystyle\int u\,dv = uv - \int v\,du$ (escolha $u$ por LIATE).

## Aplicações da integral

$$A = \int_a^b (f-g)\,dx \qquad V_{\text{disco}} = \pi\int_a^b f^2\,dx \qquad V_{\text{casca}} = 2\pi\int_a^b x f(x)\,dx \qquad f_{\text{méd}} = \frac{1}{b-a}\int_a^b f\,dx$$

## Trigonometria

$$\sin^2x+\cos^2x = 1 \qquad \sin2x = 2\sin x\cos x \qquad \cos 2x = \cos^2x - \sin^2x$$

$$\sin^2x = \frac{1-\cos2x}{2} \qquad \cos^2x = \frac{1+\cos2x}{2} \qquad 1+\tan^2x = \sec^2x$$

## Álgebra

$$a^2 - b^2 = (a-b)(a+b) \qquad a^3\pm b^3 = (a\pm b)(a^2\mp ab+b^2) \qquad x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

$$\ln(ab) = \ln a+\ln b \qquad \ln a^k = k\ln a \qquad e^{\ln x} = x \qquad \ln e^x = x$$
