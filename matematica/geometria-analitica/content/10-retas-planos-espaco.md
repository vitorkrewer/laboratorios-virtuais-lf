# Retas e planos no espaço

No espaço, a reta perde a equação $y = mx + n$: uma única equação em $x, y, z$ descreve um **plano**, não uma reta. Retas passam a ser descritas por um ponto e uma **direção**, e planos por um ponto e uma **normal**. Os produtos do capítulo 3 e 4 fazem todo o trabalho.

> [!DICA] No simulador [Vetores no espaço](#/lab/espaco), ative "Plano" para ver o plano gerado por dois vetores e sua normal $\vec u \times \vec v$.

## 1. A reta no espaço

> [!DEFINIÇÃO] A reta que passa por $A = (x_0, y_0, z_0)$ com **vetor diretor** $\vec v = (a, b, c)$ é
> $$r: (x, y, z) = (x_0, y_0, z_0) + t\,(a, b, c), \quad t \in \mathbb{R}.$$

Três formas equivalentes:

| Forma | Equação |
|---|---|
| Vetorial | $P = A + t\,\vec v$ |
| Paramétrica | $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$ |
| Simétrica (se $a, b, c \neq 0$) | $\dfrac{x - x_0}{a} = \dfrac{y - y_0}{b} = \dfrac{z - z_0}{c}$ |

**Exemplo.** Reta por $A = (1, 0, 2)$ e $B = (3, 1, 1)$: $\vec v = \overrightarrow{AB} = (2, 1, -1)$.

$$x = 1 + 2t, \quad y = t, \quad z = 2 - t$$

> [!INTUIÇÃO] Pense em $t$ como tempo: no instante $t = 0$ você está em $A$, e a cada unidade de tempo anda $\vec v$. Em $t = 1$ chega a $B$.

## 2. O plano

> [!DEFINIÇÃO] O plano que passa por $A = (x_0, y_0, z_0)$ e tem **vetor normal** $\vec n = (a, b, c)$ é o conjunto dos $P$ com $\overrightarrow{AP} \perp \vec n$:
> $$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \quad\Longleftrightarrow\quad ax + by + cz + d = 0.$$

> [!DICA] Na equação geral $ax + by + cz + d = 0$, **os coeficientes de $x$, $y$, $z$ são a normal**. É a mesma ideia da reta $ax + by + c = 0$ no plano.

**Plano por três pontos.** Calcule dois vetores no plano, a normal pelo produto vetorial e use um dos pontos.

**Exemplo.** $A = (1, 0, 0)$, $B = (0, 2, 0)$, $C = (0, 0, 3)$: $\overrightarrow{AB} \times \overrightarrow{AC} = (6, 3, 2)$ (capítulo 4). Plano: $6(x - 1) + 3y + 2z = 0$, ou $6x + 3y + 2z = 6$. (Na forma segmentária, $\frac{x}{1} + \frac{y}{2} + \frac{z}{3} = 1$: os cortes nos eixos.)

## 3. Posições relativas

**Duas retas** com diretores $\vec v_1$, $\vec v_2$:

| | Condição |
|---|---|
| paralelas (ou coincidentes) | $\vec v_1 \parallel \vec v_2$ |
| concorrentes | não paralelas e se cruzam (o sistema tem solução) |
| **reversas** | não paralelas e não se cruzam |

> [!ATENÇÃO] No espaço existem retas que **não se cruzam e não são paralelas**: as reversas. Pense numa rua e num viaduto que passa por cima em outra direção. Teste: $[\vec v_1, \vec v_2, \overrightarrow{A_1A_2}] \neq 0$.

**Reta e plano** (diretor $\vec v$, normal $\vec n$):

- $\vec v \cdot \vec n = 0$: a reta é paralela ao plano (ou está contida nele).
- $\vec v \cdot \vec n \neq 0$: a reta fura o plano num ponto. Para achá-lo, substitua a paramétrica na equação do plano e resolva em $t$.

**Dois planos**: paralelos se as normais são paralelas; senão, cortam-se numa **reta**, cujo diretor é $\vec n_1 \times \vec n_2$.

**Exemplo.** Onde $x = 1 + 2t$, $y = t$, $z = 2 - t$ fura $x + y + z = 6$? $1 + 2t + t + 2 - t = 6 \Rightarrow t = \frac32$. Ponto $\left(4, \frac32, \frac12\right)$.

## 4. Ângulos

- Entre retas: ângulo agudo entre os diretores.
- Entre planos: ângulo agudo entre as normais.
- Entre reta e plano: $\sin\varphi = \dfrac{|\vec v \cdot \vec n|}{\|\vec v\|\,\|\vec n\|}$ (complemento do ângulo entre diretor e normal).

## 5. Distâncias

> [!TEOREMA] **(Ponto a plano)** A distância de $P = (x_0, y_0, z_0)$ ao plano $ax + by + cz + d = 0$ é
> $$\frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}.$$

**Exemplo.** De $(1, 1, 1)$ a $2x + y - 2z + 6 = 0$: $\frac{|2 + 1 - 2 + 6|}{3} = \frac73$.

**Ponto a reta** (reta por $A$ com diretor $\vec v$): $d = \dfrac{\|\overrightarrow{AP} \times \vec v\|}{\|\vec v\|}$ (área do paralelogramo dividida pela base).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? No espaço, a equação $2x - y + 3z = 5$ representa:
- uma reta
+ um plano
- um ponto
- uma esfera
> Uma única equação linear em três variáveis.

? Um vetor normal ao plano $x - 4y + 2z + 7 = 0$ é:
+ $(1, -4, 2)$
- $(1, 4, 2)$
- $(7, 0, 0)$
- $(-4, 2, 7)$
> Os coeficientes de $x, y, z$.

? Duas retas no espaço que não se cruzam e não são paralelas são:
- coincidentes
- concorrentes
+ reversas
- perpendiculares
> Só existem no espaço.

? A reta com diretor $(1, 2, 3)$ e o plano $2x - y + 0z = 4$:
+ são paralelos (ou a reta está contida no plano)
- se cruzam em um ponto
- são perpendiculares
- não dá para saber
> $\vec v \cdot \vec n = 2 - 2 + 0 = 0$.

? A distância da origem ao plano $x + 2y + 2z - 9 = 0$ é:
- $9$
+ $3$
- $\frac{9}{5}$
- $1$
> $\frac{9}{\sqrt{9}}$.
```

## 6. Exercícios

**1.** Escreva as equações paramétricas da reta por $(2, -1, 3)$ paralela a $\vec v = (1, 4, -2)$ e verifique se $(4, 7, -1)$ está nela.

<details>
<summary>Ver solução</summary>

$x = 2 + t$, $y = -1 + 4t$, $z = 3 - 2t$. Com $t = 2$: $(4, 7, -1)$. Sim, está.

</details>

**2.** Encontre o plano que passa por $(1, 2, 3)$ e é perpendicular à reta $x = t$, $y = 1 + 2t$, $z = -t$.

<details>
<summary>Ver solução</summary>

Normal $= (1, 2, -1)$. $1(x - 1) + 2(y - 2) - (z - 3) = 0 \Rightarrow x + 2y - z - 2 = 0$.

</details>

**3.** Encontre a reta de interseção dos planos $x + y + z = 1$ e $x - y + z = 3$.

<details>
<summary>Ver solução</summary>

Diretor: $(1, 1, 1) \times (1, -1, 1) = (2, 0, -2)$, ou $(1, 0, -1)$. Um ponto: somando, $2x + 2z = 4$; com $z = 0$, $x = 2$ e $y = -1$. Reta: $(2, -1, 0) + t(1, 0, -1)$.

</details>

**4.** Calcule a distância entre os planos paralelos $x + 2y + 2z = 3$ e $x + 2y + 2z = 12$.

<details>
<summary>Ver solução</summary>

Ponto do primeiro: $(3, 0, 0)$. Distância ao segundo: $\frac{|3 - 12|}{3} = 3$.

</details>

**5.** As retas $(1, 0, 0) + t(1, 1, 0)$ e $(0, 0, 1) + s(0, 1, 1)$ são reversas?

<details>
<summary>Ver solução</summary>

Não são paralelas. $\overrightarrow{A_1A_2} = (-1, 0, 1)$ e $\det\begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ -1 & 0 & 1 \end{bmatrix} = 1(1 - 0) - 1(0 + 1) + 0 = 0$. Produto misto zero: são coplanares, logo **concorrentes** (não reversas). Para achar o encontro, iguale as coordenadas: $1 + t = 0$, $t = s$, $0 = 1 + s$, o que dá $t = s = -1$ e o ponto $(0, -1, 0)$.

</details>
