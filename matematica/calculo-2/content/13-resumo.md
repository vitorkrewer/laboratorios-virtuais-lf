# Resumo e erros comuns

Este capítulo reúne as fórmulas do livro numa página de consulta e lista os erros que mais custam pontos em prova, cada um com a versão correta ao lado.

## 1. Formulário

### Integração

| Tema | Fórmula |
|---|---|
| Frações parciais | $\dfrac{px + q}{(x - a)(x - b)} = \dfrac{A}{x - a} + \dfrac{B}{x - b}$ |
| Substituição trigonométrica | $\sqrt{a^2 - x^2}$: $x = a\sin\theta$; $\sqrt{a^2 + x^2}$: $x = a\tan\theta$; $\sqrt{x^2 - a^2}$: $x = a\sec\theta$ |
| $p$-integral no infinito | $\int_1^\infty \frac{dx}{x^p}$ converge $\iff p > 1$ |
| $p$-integral perto de zero | $\int_0^1 \frac{dx}{x^p}$ converge $\iff p < 1$ |

### Sequências e séries

| Tema | Fórmula |
|---|---|
| Geométrica | $\sum_{n\ge0} ar^n = \frac{a}{1 - r}$, se $\lvert r \rvert < 1$ |
| $p$-série | $\sum \frac{1}{n^p}$ converge $\iff p > 1$ |
| Termo geral | $a_n \not\to 0 \Rightarrow$ diverge |
| Razão | $L = \lim \left\lvert \frac{a_{n+1}}{a_n} \right\rvert$: $L < 1$ converge, $L > 1$ diverge |
| Leibniz | $b_n \downarrow 0 \Rightarrow \sum (-1)^n b_n$ converge |
| Taylor | $f(x) = \sum \frac{f^{(n)}(a)}{n!}(x - a)^n$ |
| Resto de Lagrange | $\lvert R_n \rvert \le \frac{M\lvert x - a \rvert^{n+1}}{(n+1)!}$ |

### Várias variáveis

| Tema | Fórmula |
|---|---|
| Plano tangente | $z = f(a,b) + f_x(x - a) + f_y(y - b)$ |
| Regra da cadeia | $\frac{dz}{dt} = f_x x'(t) + f_y y'(t)$ |
| Derivada implícita | $\frac{dy}{dx} = -\frac{F_x}{F_y}$ |
| Gradiente | $\nabla f = (f_x, f_y)$; $D_{\vec u}f = \nabla f\cdot\vec u$, com $\lVert\vec u\rVert = 1$ |
| Teste da hessiana | $D = f_{xx}f_{yy} - f_{xy}^2$: $D > 0$ extremo, $D < 0$ sela |
| Lagrange | $\nabla f = \lambda\nabla g$ e $g = k$ |

### Integrais múltiplas

| Coordenadas | Elemento |
|---|---|
| Cartesianas | $dA = dx\,dy$; $dV = dx\,dy\,dz$ |
| Polares | $dA = r\,dr\,d\theta$ |
| Cilíndricas | $dV = r\,dz\,dr\,d\theta$ |
| Esféricas | $dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$ |
| Mudança geral | $dA = \lvert J \rvert\,du\,dv$ |

## 2. Erros comuns

> [!ATENÇÃO] **"$a_n \to 0$, então a série converge."** Falso: a harmônica $\sum \frac1n$ tem $a_n \to 0$ e diverge. O termo geral só prova **divergência**.

> [!ATENÇÃO] **Confundir sequência com série.** $a_n = \frac{n}{n+1} \to 1$ (a sequência converge), mas por isso mesmo $\sum \frac{n}{n+1}$ diverge.

> [!ATENÇÃO] **Concluir algo com razão $L = 1$.** O teste é inconclusivo: $\sum\frac1n$ e $\sum\frac1{n^2}$ têm ambas $L = 1$, e uma diverge, a outra converge.

> [!ATENÇÃO] **Esquecer as extremidades do intervalo de convergência.** O teste da razão dá só o raio; em $\lvert x - a \rvert = R$ é preciso testar à parte.

> [!ATENÇÃO] **Integrar "através" de uma assíntota.** $\int_{-1}^1 \frac{dx}{x^2}$ não é $-2$: o integrando explode em $0$, e a integral imprópria diverge.

> [!ATENÇÃO] **Provar que um limite em duas variáveis existe testando só retas.** Retas concordarem não basta; use polares ou confronto.

> [!ATENÇÃO] **Usar vetor não unitário na derivada direcional.** Com $\vec v = (3, 4)$, divida por $5$ antes do produto escalar.

> [!ATENÇÃO] **Parar no $\nabla f = \vec 0$.** Ponto crítico pode ser sela; aplique o teste da hessiana. Em regiões fechadas, verifique também a fronteira.

> [!ATENÇÃO] **Limites variáveis na integral de fora.** Em $\int\int$, só a integral de **dentro** pode ter limites que dependem da outra variável.

> [!ATENÇÃO] **Esquecer o $r$ (ou o $\rho^2\sin\varphi$).** É o erro mais frequente em integrais em polares, cilíndricas e esféricas.

## 3. Mapa do livro

1. **Integração avançada** (caps. 1–2) completa o Cálculo I e prepara a comparação entre séries e integrais.
2. **Séries** (caps. 3–5) culminam em Taylor, que liga derivadas a aproximações.
3. **Várias variáveis** (caps. 6–9) repetem as ideias do Cálculo I com gradiente no lugar da derivada.
4. **Integrais múltiplas** (caps. 10–12) repetem a integral com colunas e caixinhas, e o jacobiano generaliza a substituição.

> [!DICA] Próximos passos naturais: equações diferenciais (que usam séries e derivadas parciais) e cálculo vetorial (integrais de linha e de superfície, teoremas de Green, Stokes e Gauss).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual série converge?
- $\sum \frac{1}{\sqrt n}$
+ $\sum \frac{1}{n\sqrt n}$
- $\sum \frac{n}{n + 1}$
- $\sum 1{,}01^n$
> $p$-série com $p = \frac32 > 1$.

? $\displaystyle\int_1^\infty \frac{dx}{x}$:
- vale $1$
- vale $0$
+ diverge
- vale $\ln 2$
> $p = 1$ no infinito diverge.

? O gradiente de $f = x^2 y$ em $(1, 3)$ é:
+ $(6, 1)$
- $(2, 1)$
- $(6, 3)$
- $(3, 6)$
> $(2xy, x^2)$.

? Um ponto crítico com $D = -4$ é:
- máximo local
- mínimo local
+ sela
- inconclusivo
> $D < 0$.

? $\displaystyle\iint_{x^2 + y^2 \le 1} 1\,dA$ escrita em polares é:
- $\int_0^{2\pi}\int_0^1 dr\,d\theta$
+ $\int_0^{2\pi}\int_0^1 r\,dr\,d\theta$
- $\int_0^{\pi}\int_0^1 r\,dr\,d\theta$
- $\int_0^{2\pi}\int_0^1 r^2\,dr\,d\theta$
> Não esqueça o $r$; o valor é $\pi$.
```
