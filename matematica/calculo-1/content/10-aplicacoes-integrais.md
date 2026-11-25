# Aplicações da integral

Com o Teorema Fundamental e as técnicas de integração, você pode calcular áreas, volumes e médias. O padrão é sempre o mesmo: **fatiar, aproximar cada fatia e somar (integrar)**.

## 1. Área entre curvas

Se $f(x) \geq g(x)$ em $[a, b]$, a área entre os gráficos é

$$A = \int_a^b \big[f(x) - g(x)\big]\,dx.$$

*Ideia:* cada fatia vertical tem altura $f - g$ e largura $dx$.

**Roteiro:**

1. **Esboce** as curvas.
2. Encontre os **pontos de interseção** (igualando $f = g$): eles dão os limites.
3. Identifique qual curva fica por **cima** em cada trecho.
4. Integre "de cima menos de baixo". Se as curvas se cruzam no meio, divida em trechos.

**Exemplo.** Área entre $y = x$ e $y = x^2$. Elas se cruzam em $x = 0$ e $x = 1$, com $x \geq x^2$ entre elas:

$$A = \int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac12 - \frac13 = \frac16.$$

**Exemplo.** Área entre $y = \sin x$ e o eixo $x$ de $0$ a $2\pi$ (área **total**, não a integral com sinal):

$$A = \int_0^{\pi}\sin x\,dx + \int_\pi^{2\pi}(-\sin x)\,dx = 2 + 2 = 4.$$

### Integrando em $y$

Às vezes é mais simples fatiar na **horizontal**: escreva $x$ como função de $y$ e integre $\displaystyle\int_c^d \big[x_{\text{dir}}(y) - x_{\text{esq}}(y)\big]\,dy$.

## 2. Volume de sólidos de revolução

Ao girar uma região em torno de um eixo, obtemos um sólido cujo volume também é uma integral.

### Método dos discos

Região sob $y = f(x)$, de $a$ a $b$, girando em torno do **eixo $x$**. Cada fatia é um disco de raio $f(x)$:

$$V = \pi\int_a^b \big[f(x)\big]^2\,dx.$$

**Exemplo.** O volume do sólido gerado por $y = \sqrt{x}$, $0 \leq x \leq 4$, girando em torno do eixo $x$:

$$V = \pi\int_0^4 x\,dx = \pi\left[\frac{x^2}{2}\right]_0^4 = 8\pi.$$

### Método das arruelas

Região entre $y = f(x)$ (externa) e $y = g(x)$ (interna), com $f \geq g \geq 0$, girando em torno do eixo $x$:

$$V = \pi\int_a^b\Big(\big[f(x)\big]^2 - \big[g(x)\big]^2\Big)\,dx.$$

**Exemplo.** A região entre $y = x$ e $y = x^2$ (de $0$ a $1$) girando em torno do eixo $x$:

$$V = \pi\int_0^1 (x^2 - x^4)\,dx = \pi\left(\frac13 - \frac15\right) = \frac{2\pi}{15}.$$

### Método das cascas cilíndricas

Para girar em torno do eixo $y$ a região sob $y = f(x)$ entre $a$ e $b$ (com $0 \leq a < b$):

$$V = 2\pi\int_a^b x\,f(x)\,dx.$$

*Ideia:* cada fatia vertical vira uma casca de raio $x$, altura $f(x)$ e espessura $dx$.

**Exemplo.** Região sob $y = x^2$ de $0$ a $1$, girando em torno do eixo $y$:

$$V = 2\pi\int_0^1 x\cdot x^2\,dx = 2\pi\cdot\frac14 = \frac{\pi}{2}.$$

> [!DICA] Escolha o método pela **orientação da fatia** em relação ao eixo de rotação: fatia **perpendicular** ao eixo gera discos/arruelas; fatia **paralela** ao eixo gera cascas.

## 3. Valor médio de uma função

$$f_{\text{méd}} = \frac{1}{b-a}\int_a^b f(x)\,dx.$$

**Exemplo.** O valor médio de $f(x) = \sin x$ em $[0, \pi]$ é $\dfrac{1}{\pi}\cdot 2 = \dfrac{2}{\pi} \approx 0{,}64$.

## 4. Outras aplicações

- **Deslocamento e distância:** se $v(t)$ é a velocidade, o deslocamento é $\int_{t_1}^{t_2} v\,dt$ e a distância percorrida é $\int_{t_1}^{t_2} |v|\,dt$.
- **Acúmulo:** se $r(t)$ é a taxa (ex.: litros por minuto), a quantidade acumulada entre $t_1$ e $t_2$ é $\int_{t_1}^{t_2} r(t)\,dt$.
- **Comprimento de arco:** $L = \displaystyle\int_a^b\sqrt{1 + [f'(x)]^2}\,dx$.
- **Trabalho** de uma força variável: $W = \displaystyle\int_a^b F(x)\,dx$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A área entre $y=x$ e $y=x^2$ no intervalo $[0,1]$ é:
+ $\frac16$
- $\frac12$
- $\frac13$
- $\frac56$
> $\int_0^1(x-x^2)\,dx=\frac12-\frac13$. Lembre: curva de cima menos curva de baixo.

? O volume pelo método dos discos, girando em torno do eixo $x$, é:
+ $\pi\displaystyle\int_a^b \left[f(x)\right]^2dx$
- $\pi\displaystyle\int_a^b f(x)\,dx$
- $2\pi\displaystyle\int_a^b x\,f(x)\,dx$
- $\pi\displaystyle\int_a^b \left[f'(x)\right]^2dx$
> Cada fatia é um disco de raio $f(x)$ e área $\pi f(x)^2$. A fórmula com $2\pi x$ é a das cascas.

? O valor médio de $f(x)=2x$ em $[0,4]$ é:
+ $4$
- $8$
- $16$
- $2$
> $\frac{1}{4}\int_0^4 2x\,dx=\frac{16}{4}=4$.

? Se $v(t)$ é a velocidade, então $\displaystyle\int_{t_1}^{t_2}v(t)\,dt$ é:
+ o deslocamento no intervalo
- sempre a distância total percorrida
- a aceleração média
- a velocidade média
> A distância total é $\int|v|\,dt$; as duas coincidem só se $v$ não troca de sinal.

? Girando em torno do eixo $y$ a região sob $y=f(x)$, $0\le a\le x\le b$, o método das cascas dá:
+ $2\pi\displaystyle\int_a^b x\,f(x)\,dx$
- $\pi\displaystyle\int_a^b \left[f(x)\right]^2dx$
- $2\pi\displaystyle\int_a^b f(x)\,dx$
- $\pi\displaystyle\int_a^b x^2\,dx$
> Casca de raio $x$, altura $f(x)$ e espessura $dx$: volume $2\pi x\,f(x)\,dx$.
```

## 5. Exercícios

**1.** Calcule a área entre $y = x^2$ e $y = 4$.

<details>
<summary>Ver solução</summary>

Interseções em $x = \pm 2$. Então $A = \displaystyle\int_{-2}^{2}(4 - x^2)\,dx = \Big[4x - \tfrac{x^3}{3}\Big]_{-2}^{2} = \tfrac{16}{3} + \tfrac{16}{3} = \tfrac{32}{3}$.

</details>

**2.** Calcule a área entre as curvas $y = e^x$ e $y = x + 1$ no intervalo $[0, 1]$.

<details>
<summary>Ver solução</summary>

Em $[0,1]$, $e^x \geq x + 1$. Então

$$A = \int_0^1 (e^x - x - 1)\,dx = \Big[e^x - \tfrac{x^2}{2} - x\Big]_0^1 = \left(e - \tfrac12 - 1\right) - 1 = e - \tfrac52 \approx 0{,}218.$$

</details>

**3.** Calcule o volume do sólido obtido girando $y = x^2$, $0\le x\le 2$, em torno do eixo $x$.

<details>
<summary>Ver solução</summary>

$V = \pi\displaystyle\int_0^2 x^4\,dx = \pi\cdot\dfrac{32}{5} = \dfrac{32\pi}{5}$.

</details>

**4.** Uma torneira tem vazão $r(t) = 3t^2$ litros/min. Quantos litros saem entre $t = 0$ e $t = 4$ min?

<details>
<summary>Ver solução</summary>

$\displaystyle\int_0^4 3t^2\,dt = \Big[t^3\Big]_0^4 = 64$ litros.

</details>

**5.** Calcule o volume gerado pela rotação de $y = \sqrt{x}$ ($0 \le x \le 1$) em torno do eixo $y$, usando cascas.

<details>
<summary>Ver solução</summary>

$V = 2\pi\displaystyle\int_0^1 x\sqrt{x}\,dx = 2\pi\int_0^1 x^{3/2}dx = 2\pi\cdot\dfrac{2}{5} = \dfrac{4\pi}{5}$.

</details>
