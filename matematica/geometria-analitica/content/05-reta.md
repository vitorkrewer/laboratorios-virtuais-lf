# A reta no plano

A reta é o primeiro lugar geométrico do curso e a figura que mais aparece em provas. Ela tem várias equações, cada uma boa para uma tarefa; o essencial é saber passar de uma para outra.

> [!DICA] No simulador [Retas e distâncias](#/lab/retas), arraste os pontos e veja todas as formas da equação mudarem juntas, além do ângulo e da distância de um ponto à reta.

## 1. Coeficiente angular

> [!DEFINIÇÃO] O **coeficiente angular** (ou declividade) da reta que passa por $A = (x_1, y_1)$ e $B = (x_2, y_2)$, com $x_1 \neq x_2$, é
> $$m = \frac{y_2 - y_1}{x_2 - x_1} = \tan\theta,$$
> em que $\theta$ é o ângulo que a reta faz com o eixo $x$ (medido no sentido anti-horário).

| $m$ | A reta |
|---|---|
| $m > 0$ | sobe (da esquerda para a direita) |
| $m < 0$ | desce |
| $m = 0$ | horizontal |
| não existe | vertical, do tipo $x = c$ |

## 2. As equações da reta

| Forma | Equação | Quando usar |
|---|---|---|
| Ponto-declividade | $y - y_0 = m(x - x_0)$ | conheço um ponto e $m$ |
| Reduzida | $y = mx + n$ | ler inclinação e corte no eixo $y$ |
| Geral | $ax + by + c = 0$ | distâncias, posições relativas; inclui verticais |
| Segmentária | $\dfrac{x}{p} + \dfrac{y}{q} = 1$ | cortes nos eixos em $(p, 0)$ e $(0, q)$ |
| Paramétrica | $(x, y) = (x_0, y_0) + t\,(v_1, v_2)$ | movimento, generaliza para o espaço |

**Exemplo.** Reta por $A = (1, 2)$ e $B = (3, 8)$: $m = \frac{6}{2} = 3$.

- Ponto-declividade: $y - 2 = 3(x - 1)$.
- Reduzida: $y = 3x - 1$.
- Geral: $3x - y - 1 = 0$.
- Paramétrica: $(x, y) = (1, 2) + t(2, 6)$, ou com o vetor mais simples $(1, 3)$.

> [!INTUIÇÃO] Na forma geral $ax + by + c = 0$, o vetor $\vec n = (a, b)$ é **perpendicular** à reta (vetor normal), e $\vec v = (-b, a)$ é paralelo a ela (vetor diretor). No exemplo, $\vec n = (3, -1)$ e $\vec v = (1, 3)$.

## 3. Posições relativas

Para $r: y = m_1x + n_1$ e $s: y = m_2x + n_2$:

| Situação | Condição |
|---|---|
| paralelas distintas | $m_1 = m_2$ e $n_1 \neq n_2$ |
| coincidentes | $m_1 = m_2$ e $n_1 = n_2$ |
| concorrentes | $m_1 \neq m_2$ |
| **perpendiculares** | $m_1 \cdot m_2 = -1$ |

> [!DICA] Perpendicular: **inverte e troca o sinal**. A perpendicular a uma reta de declividade $\frac23$ tem declividade $-\frac32$.

O ponto de encontro de duas concorrentes é a solução do **sistema** formado pelas duas equações.

**Exemplo.** $y = 2x + 1$ e $y = -x + 7$: $2x + 1 = -x + 7 \Rightarrow x = 2$, $y = 5$. Encontro em $(2, 5)$.

## 4. Ângulo entre retas

$$\tan\varphi = \left|\frac{m_1 - m_2}{1 + m_1 m_2}\right|$$

dá o ângulo agudo $\varphi$ entre duas retas concorrentes não perpendiculares. Alternativa sem casos especiais: o ângulo entre os vetores diretores, pelo produto escalar (capítulo 3), tomando o agudo.

## 5. Distância de ponto a reta

> [!TEOREMA] A distância de $P = (x_0, y_0)$ à reta $ax + by + c = 0$ é
> $$d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}.$$

**Exemplo.** De $(1, 1)$ até $3x + 4y - 2 = 0$: $d = \frac{|3 + 4 - 2|}{5} = 1$.

> [!INTUIÇÃO] O numerador é "quanto o ponto deixa de satisfazer a equação"; o denominador normaliza pelo tamanho do vetor normal. Se $P$ está na reta, o numerador é zero.

Distância entre **retas paralelas** $ax + by + c_1 = 0$ e $ax + by + c_2 = 0$: $\dfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A declividade da reta por $(2, 1)$ e $(4, 7)$ é:
- $\frac13$
+ $3$
- $-3$
- $6$
> $\frac{7 - 1}{4 - 2}$.

? Uma reta perpendicular a $y = 4x - 1$ tem declividade:
- $4$
- $-4$
+ $-\frac14$
- $\frac14$
> Inverte e troca o sinal.

? A reta $2x - y + 3 = 0$ na forma reduzida é:
+ $y = 2x + 3$
- $y = -2x + 3$
- $y = 2x - 3$
- $y = \frac12 x + 3$
> Isole $y$.

? A distância de $(0, 0)$ à reta $3x + 4y - 10 = 0$ é:
- $10$
+ $2$
- $\frac{10}{7}$
- $5$
> $\frac{|-10|}{5}$.

? As retas $y = 3x + 1$ e $y = 3x - 4$ são:
+ paralelas distintas
- perpendiculares
- concorrentes não perpendiculares
- coincidentes
> Mesma declividade, cortes diferentes.
```

## 6. Exercícios

**1.** Encontre a equação reduzida da reta que passa por $(-1, 4)$ e é paralela a $2x + y - 5 = 0$.

<details>
<summary>Ver solução</summary>

Declividade de $y = -2x + 5$ é $-2$. $y - 4 = -2(x + 1) \Rightarrow y = -2x + 2$.

</details>

**2.** Encontre a mediatriz do segmento de $A = (1, 3)$ a $B = (5, 1)$.

<details>
<summary>Ver solução</summary>

Ponto médio $(3, 2)$; $m_{AB} = -\frac12$; perpendicular: $m = 2$. $y - 2 = 2(x - 3) \Rightarrow y = 2x - 4$.

</details>

**3.** Calcule a distância entre as retas $x - 2y + 1 = 0$ e $x - 2y - 4 = 0$.

<details>
<summary>Ver solução</summary>

$\frac{|1 - (-4)|}{\sqrt{1 + 4}} = \frac{5}{\sqrt5} = \sqrt5$.

</details>

**4.** Calcule a altura do triângulo $A = (0, 0)$, $B = (6, 0)$, $C = (2, 4)$ relativa ao lado $BC$.

<details>
<summary>Ver solução</summary>

Reta $BC$: $m = \frac{4}{-4} = -1$, $y = -x + 6$, ou $x + y - 6 = 0$. Distância de $A$: $\frac{6}{\sqrt2} = 3\sqrt2$.

</details>

**5.** Escreva a forma segmentária de $2x + 3y - 12 = 0$ e os pontos de corte com os eixos.

<details>
<summary>Ver solução</summary>

$2x + 3y = 12 \Rightarrow \frac{x}{6} + \frac{y}{4} = 1$. Cortes em $(6, 0)$ e $(0, 4)$.

</details>
