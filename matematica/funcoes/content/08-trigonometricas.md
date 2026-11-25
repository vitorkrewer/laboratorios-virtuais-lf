# Funções trigonométricas

Seno e cosseno descrevem tudo o que **se repete**: ondas, marés, corrente alternada, rotações. No Cálculo, elas aparecem em limites fundamentais, derivadas e integrais. Aqui o foco é o que você precisa saber sobre elas **como funções**.

## 1. Radianos

O radiano mede o ângulo pelo **comprimento do arco** no círculo de raio $1$. Uma volta completa tem comprimento $2\pi$, então:

$$360^\circ = 2\pi \text{ rad} \qquad 180^\circ = \pi \text{ rad} \qquad 1 \text{ rad} \approx 57{,}3^\circ$$

> [!ATENÇÃO] No Cálculo, **sempre radianos**. O limite $\lim_{x\to0}\frac{\sin x}{x} = 1$ e a derivada $(\sin x)' = \cos x$ só valem com $x$ em radianos.

## 2. O círculo trigonométrico

No círculo de raio $1$ centrado na origem, o ponto associado ao ângulo $\theta$ tem coordenadas $(\cos\theta, \sin\theta)$. Daí saem as principais propriedades:

- $\sin^2\theta + \cos^2\theta = 1$ (teorema de Pitágoras no círculo);
- $-1 \le \sin\theta \le 1$ e $-1 \le \cos\theta \le 1$;
- sinais por quadrante: o seno é positivo no 1º e 2º quadrantes; o cosseno, no 1º e 4º.

| $\theta$ | $0$ | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\pi$ | $\frac{3\pi}{2}$ |
|---|---|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ | $0$ | $-1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ | $-1$ | $0$ |

## 3. As funções seno, cosseno e tangente

| Função | Domínio | Imagem | Período | Paridade |
|---|---|---|---|---|
| $\sin x$ | $\mathbb{R}$ | $[-1, 1]$ | $2\pi$ | ímpar |
| $\cos x$ | $\mathbb{R}$ | $[-1, 1]$ | $2\pi$ | par |
| $\tan x = \frac{\sin x}{\cos x}$ | $x \ne \frac{\pi}{2} + k\pi$ | $\mathbb{R}$ | $\pi$ | ímpar |

> [!DEFINIÇÃO] $f$ é **periódica** de período $p > 0$ se $f(x + p) = f(x)$ para todo $x$; o menor $p$ assim é o período.

O gráfico do cosseno é o do seno deslocado: $\cos x = \sin\left(x + \frac{\pi}{2}\right)$. A tangente tem assíntotas verticais onde $\cos x = 0$.

As recíprocas: $\sec x = \frac{1}{\cos x}$, $\csc x = \frac{1}{\sin x}$, $\cot x = \frac{\cos x}{\sin x}$.

## 4. Senoides: $y = A\sin\big(B(x - h)\big) + k$

| Parâmetro | Significado |
|---|---|
| $\lvert A\rvert$ | **amplitude** (meia altura da onda) |
| $\frac{2\pi}{\lvert B\rvert}$ | **período** |
| $h$ | deslocamento horizontal (**fase**) |
| $k$ | linha média (deslocamento vertical) |

A imagem é $[k - |A|,\ k + |A|]$. Teste tudo no [simulador de transformações](#/lab/transformacoes) escolhendo a base $\sin x$.

**Exemplo.** $y = 3\sin(2x) + 1$: amplitude $3$, período $\pi$, linha média $y = 1$, imagem $[-2, 4]$.

## 5. Equações trigonométricas básicas

Por serem periódicas, essas equações têm **infinitas** soluções (a menos que se restrinja o intervalo).

- $\sin x = \frac12 \Rightarrow x = \frac{\pi}{6} + 2k\pi$ ou $x = \frac{5\pi}{6} + 2k\pi$, $k \in \mathbb{Z}$.
- $\cos x = 0 \Rightarrow x = \frac{\pi}{2} + k\pi$.
- $\tan x = 1 \Rightarrow x = \frac{\pi}{4} + k\pi$.

## 6. Inversas trigonométricas

Seno, cosseno e tangente não são injetoras em $\mathbb{R}$. Restringindo o domínio, obtemos inversas:

| Função | Domínio | Imagem |
|---|---|---|
| $\arcsin x$ | $[-1, 1]$ | $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$ |
| $\arccos x$ | $[-1, 1]$ | $[0, \pi]$ |
| $\arctan x$ | $\mathbb{R}$ | $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$ |

Exemplos: $\arcsin\frac12 = \frac{\pi}{6}$, $\arccos(-1) = \pi$, $\arctan 1 = \frac{\pi}{4}$. Elas aparecem como resultado de integrais, como $\int\frac{dx}{1 + x^2} = \arctan x + C$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Quanto vale $120^\circ$ em radianos?
- $\frac{\pi}{3}$
+ $\frac{2\pi}{3}$
- $\frac{3\pi}{4}$
- $\frac{5\pi}{6}$
> $120 \cdot \frac{\pi}{180} = \frac{2\pi}{3}$.

? Qual é o período de $f(x) = \cos\left(\frac{x}{2}\right)$?
- $\pi$
- $2\pi$
+ $4\pi$
- $\frac{\pi}{2}$
> $\frac{2\pi}{1/2} = 4\pi$: o fator $\frac12$ estica a onda.

? Qual é a imagem de $y = -2\cos x + 3$?
- $[-2, 2]$
+ $[1, 5]$
- $[-5, 1]$
- $[3, 5]$
> Linha média $3$ e amplitude $2$.

? Quanto vale $\arctan(-1)$?
+ $-\frac{\pi}{4}$
- $\frac{3\pi}{4}$
- $-\frac{\pi}{2}$
- $\frac{\pi}{4}$
> A imagem do arco-tangente é $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$, e $\tan\left(-\frac{\pi}{4}\right) = -1$.

? Qual afirmação é verdadeira?
- $\sin x$ é par
+ $\cos(-x) = \cos x$ para todo $x$
- $\tan x$ está definida em $x = \frac{\pi}{2}$
- O período de $\tan x$ é $2\pi$
> O cosseno é par. O seno é ímpar e a tangente tem período $\pi$, com assíntota em $\frac{\pi}{2}$.
```

## 7. Exercícios

**1.** Converta $\frac{7\pi}{6}$ rad para graus e dê o seno desse ângulo.

<details>
<summary>Ver solução</summary>

$\frac{7\pi}{6} = 210^\circ$. Está no 3º quadrante, onde o seno é negativo: $\sin 210^\circ = -\frac12$.

</details>

**2.** Determine amplitude, período e imagem de $y = 4\sin(\pi x) - 1$.

<details>
<summary>Ver solução</summary>

Amplitude $4$, período $\frac{2\pi}{\pi} = 2$, imagem $[-5, 3]$.

</details>

**3.** Resolva $2\cos x - 1 = 0$ em $[0, 2\pi]$.

<details>
<summary>Ver solução</summary>

$\cos x = \frac12 \Rightarrow x = \frac{\pi}{3}$ ou $x = \frac{5\pi}{3}$.

</details>

**4.** Qual é o domínio de $f(x) = \arcsin(2x - 1)$?

<details>
<summary>Ver solução</summary>

$-1 \le 2x - 1 \le 1 \Rightarrow 0 \le x \le 1$. $D = [0, 1]$.

</details>
