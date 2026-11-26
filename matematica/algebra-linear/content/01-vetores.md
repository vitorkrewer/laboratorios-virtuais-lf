# Vetores em ℝⁿ

Álgebra Linear é o estudo de **vetores** e das operações que os transformam. Antes das definições formais, fique com a imagem: um vetor é uma **seta** (tem tamanho e direção) e, ao mesmo tempo, uma **lista de números**. As duas visões são a mesma coisa, e o curso inteiro alterna entre elas.

> [!DICA] Se faz tempo que você não vê sistemas de equações, revise o capítulo de sistemas no livro [Álgebra elementar](../algebra/#/teoria/sistemas) antes do capítulo 2. O **produto vetorial**, que só existe em três dimensões, está no livro [Geometria Analítica](../geometria-analitica/#/teoria/produto-vetorial).

## 1. O que é um vetor

> [!DEFINIÇÃO] Um vetor de $\mathbb{R}^n$ é uma lista ordenada de $n$ números reais, as **componentes**: $\vec v = (v_1, v_2, \ldots, v_n)$.

- No plano ($\mathbb{R}^2$), $\vec v = (3, 2)$ é a seta que sai da origem e chega ao ponto $(3, 2)$: anda $3$ para a direita e $2$ para cima.
- No espaço ($\mathbb{R}^3$), $\vec w = (1, -2, 4)$.
- Em $\mathbb{R}^5$ não dá para desenhar, mas as contas são as mesmas. Ex.: as notas de um aluno em cinco provas.

Muitas vezes o vetor é escrito em **coluna**: $\vec v = \begin{bmatrix} 3 \\ 2 \end{bmatrix}$. É o mesmo objeto.

> [!INTUIÇÃO] Um vetor não tem "lugar": a seta de $(0,0)$ até $(3,2)$ e a seta de $(1,1)$ até $(4,3)$ são o **mesmo** vetor, porque têm o mesmo tamanho, direção e sentido. O que importa é o deslocamento.

## 2. Soma e multiplicação por escalar

As duas operações básicas são feitas **componente a componente**.

$$\vec u + \vec v = (u_1 + v_1, \ldots, u_n + v_n) \qquad c\,\vec v = (c v_1, \ldots, c v_n)$$

**Exemplo.** Com $\vec u = (1, 3)$ e $\vec v = (4, -1)$: $\vec u + \vec v = (5, 2)$; $2\vec u = (2, 6)$; $\vec u - \vec v = (-3, 4)$.

> [!INTUIÇÃO] **Soma = andar uma seta e depois a outra** (regra do paralelogramo). **Escalar = esticar ou encolher** a seta; com $c$ negativo, ela também inverte o sentido. "Escalar" é o nome dado a um número comum, para não confundir com vetor.

O **vetor nulo** é $\vec 0 = (0, \ldots, 0)$, e o **oposto** de $\vec v$ é $-\vec v$.

### Combinação linear

> [!DEFINIÇÃO] Uma **combinação linear** de $\vec v_1, \ldots, \vec v_k$ é qualquer vetor da forma $c_1\vec v_1 + c_2\vec v_2 + \cdots + c_k\vec v_k$, com $c_i$ números reais.

Esta é a ideia mais importante do curso. Exemplo: todo vetor do plano é combinação linear de $\vec e_1 = (1, 0)$ e $\vec e_2 = (0, 1)$, porque $(a, b) = a\,\vec e_1 + b\,\vec e_2$.

## 3. Norma (comprimento)

> [!DEFINIÇÃO] A **norma** de $\vec v$ é $\|\vec v\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$.

Em $\mathbb{R}^2$, é o teorema de Pitágoras: $\|(3, 4)\| = \sqrt{9 + 16} = 5$.

- $\|c\,\vec v\| = |c|\,\|\vec v\|$: dobrar o vetor dobra o comprimento.
- **Vetor unitário** tem norma $1$. Para "normalizar", divida pela norma: $\dfrac{\vec v}{\|\vec v\|}$. De $(3, 4)$ sai $\left(\frac35, \frac45\right)$.
- **Distância** entre dois pontos: $d(P, Q) = \|\vec Q - \vec P\|$.

## 4. Produto escalar

> [!DEFINIÇÃO] O **produto escalar** (ou interno) é $\vec u \cdot \vec v = u_1 v_1 + u_2 v_2 + \cdots + u_n v_n$. O resultado é um **número**, não um vetor.

**Exemplo.** $(1, 3) \cdot (4, -1) = 4 - 3 = 1$.

> [!TEOREMA] **(Ângulo)** $\vec u \cdot \vec v = \|\vec u\|\,\|\vec v\| \cos\theta$, em que $\theta$ é o ângulo entre os vetores.

Daí sai a informação geométrica que o produto escalar carrega:

| Sinal de $\vec u \cdot \vec v$ | Ângulo |
|---|---|
| positivo | agudo ($\theta < 90°$) |
| zero | **reto**: os vetores são **ortogonais** |
| negativo | obtuso ($\theta > 90°$) |

> [!DICA] Ortogonal é a palavra da Álgebra Linear para perpendicular. $(2, 1)$ e $(-1, 2)$ são ortogonais porque $-2 + 2 = 0$. Truque no plano: trocar as componentes e o sinal de uma delas dá sempre um vetor ortogonal.

Propriedades: $\vec v \cdot \vec v = \|\vec v\|^2$; $\vec u \cdot \vec v = \vec v \cdot \vec u$; $\vec u \cdot (\vec v + \vec w) = \vec u \cdot \vec v + \vec u \cdot \vec w$.

## 5. Projeção

A **projeção** de $\vec u$ sobre $\vec v$ é a "sombra" de $\vec u$ na direção de $\vec v$:

$$\text{proj}_{\vec v}\,\vec u = \frac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\,\vec v$$

**Exemplo.** $\vec u = (2, 3)$ sobre $\vec v = (1, 0)$: $\frac{2}{1}(1, 0) = (2, 0)$. Faz sentido: a sombra no eixo $x$.

> [!INTUIÇÃO] O que sobra, $\vec u - \text{proj}_{\vec v}\,\vec u$, é ortogonal a $\vec v$. Decompor um vetor em "parte na direção" + "parte perpendicular" é a base de Gram-Schmidt (capítulo 11) e da física de forças.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $\vec u = (2, -1)$ e $\vec v = (3, 4)$, então $2\vec u - \vec v$ é:
+ $(1, -6)$
- $(7, 2)$
- $(1, 2)$
- $(-1, 6)$
> $2\vec u = (4, -2)$; menos $(3, 4)$ dá $(1, -6)$.

? A norma de $(1, 2, 2)$ é:
- $5$
+ $3$
- $\sqrt{5}$
- $9$
> $\sqrt{1 + 4 + 4} = \sqrt{9}$.

? Qual par de vetores é ortogonal?
- $(1, 1)$ e $(1, 2)$
- $(2, 3)$ e $(3, 2)$
+ $(4, -2)$ e $(1, 2)$
- $(1, 0)$ e $(2, 0)$
> $4 - 4 = 0$.

? O produto escalar $\vec u \cdot \vec v$ é:
- um vetor perpendicular aos dois
+ um número
- uma matriz
- sempre positivo
> Soma dos produtos das componentes: um número, que pode ser negativo.

? O vetor $(5, 7)$ é combinação linear de $(1, 0)$ e $(0, 1)$ com coeficientes:
- $1$ e $1$
- $7$ e $5$
+ $5$ e $7$
- $12$ e $0$
> $(5, 7) = 5(1, 0) + 7(0, 1)$.
```

## 6. Exercícios

**1.** Com $\vec u = (1, 2, -1)$ e $\vec v = (0, 3, 2)$, calcule $\vec u + \vec v$, $3\vec u$ e $\vec u \cdot \vec v$.

<details>
<summary>Ver solução</summary>

$(1, 5, 1)$; $(3, 6, -3)$; $0 + 6 - 2 = 4$.

</details>

**2.** Normalize $\vec v = (2, -2, 1)$.

<details>
<summary>Ver solução</summary>

$\|\vec v\| = \sqrt{4 + 4 + 1} = 3$. Unitário: $\left(\frac23, -\frac23, \frac13\right)$.

</details>

**3.** Calcule o ângulo entre $(1, 0)$ e $(1, 1)$.

<details>
<summary>Ver solução</summary>

$\cos\theta = \frac{1}{1 \cdot \sqrt2} = \frac{\sqrt2}{2}$, logo $\theta = 45°$.

</details>

**4.** Para que valor de $k$ os vetores $(k, 3)$ e $(2, -4)$ são ortogonais?

<details>
<summary>Ver solução</summary>

$2k - 12 = 0 \Rightarrow k = 6$.

</details>

**5.** Escreva $(4, 1)$ como combinação linear de $(1, 1)$ e $(1, -1)$.

<details>
<summary>Ver solução</summary>

$a(1, 1) + b(1, -1) = (4, 1)$: $a + b = 4$ e $a - b = 1$. Logo $a = \frac52$, $b = \frac32$.

</details>

**6.** Calcule $\text{proj}_{\vec v}\,\vec u$ para $\vec u = (3, 1)$ e $\vec v = (1, 1)$.

<details>
<summary>Ver solução</summary>

$\frac{3 + 1}{1 + 1}(1, 1) = 2(1, 1) = (2, 2)$.

</details>
