# Pré-cálculo essencial

Quase todo erro em Cálculo I é, na verdade, um erro de **álgebra, fatoração ou trigonometria**. Este capítulo reúne o mínimo que você precisa dominar. Se algum item parecer estranho, pare aqui e treine antes de seguir.

> [!DICA] Se você tem pouco tempo, leia as seções 2 e 3 com atenção e passe os olhos nas demais. Volte aqui sempre que travar em um exercício.

## 1. Funções

Uma **função** $f$ associa a cada $x$ do **domínio** exatamente um valor $f(x)$ da **imagem**.

> [!DEFINIÇÃO] O **domínio** de $f$ é o conjunto dos $x$ para os quais a expressão faz sentido. Regras práticas: não dividir por zero, não tirar raiz quadrada de número negativo e só aceitar logaritmo de número positivo.

| Expressão | Condição para o domínio |
|---|---|
| $\dfrac{1}{g(x)}$ | $g(x) \neq 0$ |
| $\sqrt{g(x)}$ | $g(x) \geq 0$ |
| $\ln g(x)$ | $g(x) > 0$ |
| $\tan x$ | $x \neq \frac{\pi}{2} + k\pi$ |

**Exemplo.** O domínio de $f(x) = \dfrac{\sqrt{x-1}}{x-3}$ exige $x \geq 1$ e $x \neq 3$. Logo, $D = [1, 3) \cup (3, \infty)$.

### Composição e inversa

A **composta** $(f \circ g)(x) = f(g(x))$ aplica $g$ primeiro e depois $f$. Ela é a base da **regra da cadeia** que você usará em derivadas.

Se $f$ é bijetora, a **inversa** $f^{-1}$ desfaz $f$: $f^{-1}(f(x)) = x$. Seu gráfico é o reflexo do gráfico de $f$ na reta $y = x$.

### Gráficos que você deve reconhecer de cabeça

- **Reta** $y = mx + b$: inclinação $m$. É o modelo da derivada.
- **Parábola** $y = x^2$: simétrica em relação ao eixo $y$, vértice na origem.
- **Cúbica** $y = x^3$: cresce sempre, passa pela origem.
- **Hipérbole** $y = 1/x$: assíntotas nos eixos.
- **Raiz** $y = \sqrt{x}$: começa em $0$ e cresce devagar.
- **Exponencial** $y = e^x$: sempre positiva, cresce rápido, passa por $(0,1)$.
- **Logaritmo** $y = \ln x$: definido para $x > 0$, passa por $(1, 0)$.
- **Seno e cosseno**: ondas entre $-1$ e $1$, com período $2\pi$.

## 2. Álgebra que mais cai

### Produtos notáveis

$$(a+b)^2 = a^2 + 2ab + b^2 \qquad (a-b)^2 = a^2 - 2ab + b^2$$

$$a^2 - b^2 = (a-b)(a+b)$$

$$a^3 - b^3 = (a-b)(a^2 + ab + b^2) \qquad a^3 + b^3 = (a+b)(a^2 - ab + b^2)$$

> [!ATENÇÃO] $(a+b)^2 \neq a^2 + b^2$. Este é o erro mais frequente de todos. Falta o termo $2ab$.

### Fatoração

Fatorar é o **superpoder dos limites**: quase toda indeterminação $0/0$ some depois de fatorar.

1. **Fator comum:** $x^2 - 3x = x(x-3)$.
2. **Diferença de quadrados:** $x^2 - 9 = (x-3)(x+3)$.
3. **Trinômio do 2º grau:** $x^2 - 5x + 6 = (x-2)(x-3)$ (procure dois números com soma $-5$ e produto $6$).
4. **Bhaskara:** as raízes de $ax^2 + bx + c$ são $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, e então $ax^2+bx+c = a(x - x_1)(x - x_2)$.
5. **Briot-Ruffini** para polinômios de grau maior: teste raízes inteiras divisoras do termo independente.

**Exemplo.** Fatore $x^3 - 8$. Pela diferença de cubos, $x^3 - 8 = (x-2)(x^2 + 2x + 4)$.

### Racionalização

Para eliminar raízes de uma diferença, multiplique pelo **conjugado**:

$$\frac{1}{\sqrt{x} - \sqrt{a}} = \frac{\sqrt{x} + \sqrt{a}}{(\sqrt{x}-\sqrt{a})(\sqrt{x}+\sqrt{a})} = \frac{\sqrt{x}+\sqrt{a}}{x - a}$$

### Frações e potências

$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd} \qquad a^m a^n = a^{m+n} \qquad (a^m)^n = a^{mn} \qquad a^{-n} = \frac{1}{a^n} \qquad a^{1/n} = \sqrt[n]{a}$$

> [!DICA] Antes de derivar ou integrar, **reescreva raízes e frações como potências**: $\sqrt{x} = x^{1/2}$, $\dfrac{1}{x^3} = x^{-3}$, $\dfrac{1}{\sqrt[3]{x}} = x^{-1/3}$. Isso transforma tudo em potências.

### Módulo e desigualdades

$|x|$ é a distância de $x$ a $0$. Valem $|x| < a \iff -a < x < a$ e $|x| > a \iff x < -a$ ou $x > a$. Ao multiplicar ou dividir uma desigualdade por um número **negativo**, inverta o sentido.

## 3. Trigonometria

### Valores notáveis

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ | $\pi$ |
|---|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ | $0$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ | $-1$ |
| $\tan\theta$ | $0$ | $\frac{\sqrt3}{3}$ | $1$ | $\sqrt3$ | n/d | $0$ |

Trabalhe **sempre em radianos**: $180^\circ = \pi$ rad. As fórmulas de derivada só valem assim.

### Identidades indispensáveis

$$\sin^2 x + \cos^2 x = 1 \qquad 1 + \tan^2 x = \sec^2 x$$

$$\sin 2x = 2\sin x \cos x \qquad \cos 2x = \cos^2 x - \sin^2 x = 1 - 2\sin^2 x = 2\cos^2 x - 1$$

$$\sin^2 x = \frac{1 - \cos 2x}{2} \qquad \cos^2 x = \frac{1 + \cos 2x}{2}$$

$$\sin(a \pm b) = \sin a\cos b \pm \cos a \sin b \qquad \cos(a \pm b) = \cos a\cos b \mp \sin a \sin b$$

As duas fórmulas de $\sin^2$ e $\cos^2$ (redução de grau) aparecem muito em **integrais**.

## 4. Exponencial e logaritmo

$\ln x$ é o logaritmo na base $e \approx 2{,}718$, a inversa de $e^x$: $\ln(e^x) = x$ e $e^{\ln x} = x$.

$$\ln(ab) = \ln a + \ln b \qquad \ln\frac{a}{b} = \ln a - \ln b \qquad \ln(a^k) = k\ln a$$

$$e^{a+b} = e^a e^b \qquad \log_b x = \frac{\ln x}{\ln b} \qquad a^x = e^{x \ln a}$$

> [!ATENÇÃO] $\ln(a+b) \neq \ln a + \ln b$. O logaritmo transforma **produto** em soma, nunca soma em soma.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual é o domínio de $f(x)=\sqrt{x-2}$?
+ $[2,\infty)$
- $(2,\infty)$
- $(-\infty,2]$
- $\mathbb{R}$
> A raiz quadrada exige $x-2\ge 0$, isto é, $x\ge 2$. O próprio $2$ entra, porque $\sqrt{0}=0$.

? Expandindo $(x+3)^2$ obtemos:
- $x^2+9$
+ $x^2+6x+9$
- $x^2+3x+9$
- $2x+6$
> $(a+b)^2=a^2+2ab+b^2$. O termo do meio, $2ab=6x$, não pode faltar.

? Quanto vale $\ln\left(e^3\cdot e^2\right)$?
+ $5$
- $6$
- $\ln 5$
- $e^5$
> $e^3\cdot e^2=e^5$ e $\ln e^5=5$.

? Quanto vale $\sin\left(\frac{\pi}{6}\right)$?
- $\frac{\sqrt3}{2}$
+ $\frac12$
- $\frac{\sqrt2}{2}$
- $1$
> $\frac{\pi}{6}$ rad $=30^\circ$, e $\sin 30^\circ=\frac12$.

? Reescrevendo $\dfrac{1}{\sqrt[3]{x^2}}$ como potência de $x$:
- $x^{2/3}$
- $x^{-3/2}$
+ $x^{-2/3}$
- $x^{3/2}$
> $\sqrt[3]{x^2}=x^{2/3}$; no denominador, o expoente fica negativo.
```

## 5. Exercícios

**1.** Fatore $x^2 - 7x + 12$.

<details>
<summary>Ver solução</summary>

Procuramos dois números de soma $-7$ e produto $12$: são $-3$ e $-4$. Logo, $x^2 - 7x + 12 = (x-3)(x-4)$.

</details>

**2.** Simplifique $\dfrac{x^2 - 16}{x - 4}$ para $x \neq 4$.

<details>
<summary>Ver solução</summary>

$\dfrac{(x-4)(x+4)}{x-4} = x + 4$.

</details>

**3.** Determine o domínio de $f(x) = \ln(x - 2) + \dfrac{1}{x-5}$.

<details>
<summary>Ver solução</summary>

Exigimos $x - 2 > 0$, ou seja, $x > 2$, e $x \neq 5$. Logo, $D = (2, 5) \cup (5, \infty)$.

</details>

**4.** Racionalize $\dfrac{x - 1}{\sqrt{x} - 1}$ e simplifique.

<details>
<summary>Ver solução</summary>

Multiplicando por $\dfrac{\sqrt{x}+1}{\sqrt{x}+1}$, o denominador vira $x - 1$. O resultado é $\sqrt{x} + 1$, para $x \neq 1$.

</details>

**5.** Resolva $2\sin^2 x - 1 = 0$ em $[0, \pi]$.

<details>
<summary>Ver solução</summary>

Como $1 - 2\sin^2 x = \cos 2x$, a equação equivale a $\cos 2x = 0$. Então $2x = \frac{\pi}{2} + k\pi$, ou seja, $x = \frac{\pi}{4} + \frac{k\pi}{2}$. Em $[0,\pi]$: $x = \frac{\pi}{4}$ e $x = \frac{3\pi}{4}$.

</details>
