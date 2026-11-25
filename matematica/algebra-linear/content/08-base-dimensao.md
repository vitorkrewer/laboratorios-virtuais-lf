# Base, dimensão e posto

Uma base é um "sistema de coordenadas" para um espaço vetorial: o menor conjunto de direções que alcança tudo. O número de vetores de uma base, a **dimensão**, mede o "tamanho" do espaço.

## 1. Base

> [!DEFINIÇÃO] Uma **base** de um espaço $V$ é um conjunto de vetores que (1) **gera** $V$ e (2) é **LI**.

- **Base canônica** de $\mathbb{R}^3$: $\vec e_1 = (1, 0, 0)$, $\vec e_2 = (0, 1, 0)$, $\vec e_3 = (0, 0, 1)$.
- $\{(1, 1), (1, -1)\}$ também é base de $\mathbb{R}^2$: são LI ($\det = -2 \neq 0$) e dois vetores LI em $\mathbb{R}^2$ geram tudo.
- Base de $P_2$: $\{1, x, x^2\}$. Base de $M_{2\times2}$: as quatro matrizes com um único $1$.

> [!INTUIÇÃO] "Gera" garante que não falta nada; "LI" garante que não sobra nada. Base é a lista mínima e suficiente de ingredientes.

## 2. Coordenadas

> [!TEOREMA] Se $B = \{\vec v_1, \ldots, \vec v_n\}$ é base de $V$, todo $\vec x \in V$ se escreve de **um único jeito** como $\vec x = c_1\vec v_1 + \cdots + c_n\vec v_n$. Os números $(c_1, \ldots, c_n)$ são as **coordenadas** de $\vec x$ na base $B$, escritas $[\vec x]_B$.

**Exemplo.** Na base $B = \{(1, 1), (1, -1)\}$, o vetor $(5, 1)$: $a + b = 5$, $a - b = 1$, logo $a = 3$, $b = 2$ e $[\vec x]_B = (3, 2)$.

> [!INTUIÇÃO] O mesmo ponto do plano tem "endereços" diferentes em bases diferentes, como uma cidade que pode ser descrita por GPS ou por "3 quadras ao norte da praça". O ponto não muda; muda a régua.

## 3. Dimensão

> [!TEOREMA] Todas as bases de um mesmo espaço têm **o mesmo número de vetores**. Esse número é a **dimensão** de $V$, $\dim V$.

| Espaço | Dimensão |
|---|---|
| $\mathbb{R}^n$ | $n$ |
| $P_n$ (grau $\le n$) | $n + 1$ |
| $M_{m\times n}$ | $mn$ |
| $\{\vec 0\}$ | $0$ |
| reta pela origem | $1$ |
| plano pela origem | $2$ |

> [!TEOREMA] Em um espaço de dimensão $n$:
> - mais de $n$ vetores são sempre LD;
> - menos de $n$ vetores nunca geram o espaço;
> - **exatamente $n$ vetores**: ser LI e gerar são equivalentes. Basta verificar um dos dois.

> [!DICA] O terceiro item economiza muito trabalho: para saber se 3 vetores formam base de $\mathbb{R}^3$, basta ver se são LI (por exemplo, $\det \neq 0$).

## 4. Base do núcleo e do espaço coluna

Escalone $A$ e leia as respostas:

- **Espaço coluna:** as colunas **originais** de $A$ que têm pivô na forma escalonada formam uma base de $C(A)$.
- **Núcleo:** escreva a solução geral de $A\vec x = \vec 0$; os vetores que multiplicam cada variável livre formam uma base de $N(A)$.

**Exemplo.** $A = \begin{bmatrix} 1 & 2 & 0 & 3 \\ 2 & 4 & 1 & 8 \end{bmatrix} \to \begin{bmatrix} 1 & 2 & 0 & 3 \\ 0 & 0 & 1 & 2 \end{bmatrix}$.

- Pivôs nas colunas 1 e 3. Base de $C(A)$: $\{(1, 2), (0, 1)\}$ (colunas 1 e 3 **de $A$**). Logo $C(A) = \mathbb{R}^2$.
- Livres: $x_2 = s$, $x_4 = t$. Então $x_3 = -2t$ e $x_1 = -2s - 3t$:
$$\vec x = s(-2, 1, 0, 0) + t(-3, 0, -2, 1)$$
Base de $N(A)$: $\{(-2, 1, 0, 0), (-3, 0, -2, 1)\}$.

> [!ATENÇÃO] Para o espaço coluna, use as colunas da matriz **original**, não as da escalonada. O escalonamento muda o espaço coluna (mas não muda o núcleo).

## 5. Posto e o teorema do núcleo e da imagem

> [!DEFINIÇÃO] O **posto** de $A$ é $\dim C(A)$, igual ao número de pivôs. A **nulidade** é $\dim N(A)$, igual ao número de variáveis livres.

> [!TEOREMA] **(Teorema do posto)** Para $A$ com $n$ colunas: $\text{posto}(A) + \dim N(A) = n$.

> [!INTUIÇÃO] Cada coluna ou tem pivô ou é livre. As com pivô contam para a imagem; as livres contam para o núcleo. É a conta mais simples do mundo, e uma das mais úteis: no exemplo, $2 + 2 = 4$.

Item novo para o teorema das equivalências ($A$ quadrada $n \times n$): $A$ é inversível $\iff$ $\text{posto}(A) = n$ $\iff$ $N(A) = \{\vec 0\}$ $\iff$ as colunas formam uma base de $\mathbb{R}^n$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual conjunto é base de $\mathbb{R}^2$?
- $\{(1, 2)\}$
- $\{(1, 2), (2, 4)\}$
+ $\{(1, 2), (2, 1)\}$
- $\{(1, 0), (0, 1), (1, 1)\}$
> Dois vetores LI ($\det = 1 - 4 \neq 0$). O último é LD (três vetores em $\mathbb{R}^2$).

? A dimensão de $P_3$ (polinômios de grau até 3) é:
- $3$
+ $4$
- $6$
- infinita
> Base $\{1, x, x^2, x^3\}$.

? Uma matriz $3 \times 5$ tem posto $3$. A dimensão do núcleo é:
- $0$
+ $2$
- $3$
- $5$
> $5 - 3 = 2$.

? Para obter uma base do espaço coluna de $A$, usamos:
- as colunas da forma escalonada
+ as colunas de $A$ nas posições dos pivôs
- as linhas de $A$
- os vetores do núcleo
> O escalonamento muda o espaço coluna; só as posições dos pivôs servem.

? Três vetores LI em $\mathbb{R}^3$:
+ formam uma base de $\mathbb{R}^3$
- podem não gerar $\mathbb{R}^3$
- geram um plano
- são sempre ortogonais
> Com exatamente $n$ vetores, LI basta.
```

## 6. Exercícios

**1.** Verifique se $\{(1, 0, 1), (1, 1, 0), (0, 1, 1)\}$ é base de $\mathbb{R}^3$.

<details>
<summary>Ver solução</summary>

São 3 vetores em $\mathbb{R}^3$; $\det = 2 \neq 0$ (é o exercício 1 do capítulo anterior). São LI, logo base.

</details>

**2.** Encontre as coordenadas de $(4, 2)$ na base $\{(1, 1), (2, -1)\}$.

<details>
<summary>Ver solução</summary>

$a + 2b = 4$, $a - b = 2$: $b = \frac23$, $a = \frac83$. $[\vec x]_B = \left(\frac83, \frac23\right)$.

</details>

**3.** Encontre uma base e a dimensão do plano $x - 2y + z = 0$.

<details>
<summary>Ver solução</summary>

$x = 2y - z$; com $y = s$, $z = t$: $s(2, 1, 0) + t(-1, 0, 1)$. Base $\{(2, 1, 0), (-1, 0, 1)\}$, dimensão $2$.

</details>

**4.** Para $A = \begin{bmatrix} 1 & 1 & 2 \\ 2 & 2 & 4 \\ 1 & 0 & 1 \end{bmatrix}$, calcule o posto, uma base do núcleo e confira o teorema do posto.

<details>
<summary>Ver solução</summary>

$L_2 - 2L_1$ zera $L_2$; $L_3 - L_1$: $[0\;\,{-1}\;\,{-1}]$. Pivôs nas colunas 1 e 2: posto $2$. Núcleo: $z = t$, $y = -t$, $x = -y - 2z = -t$. Base $\{(-1, -1, 1)\}$. $2 + 1 = 3$ ✓.

</details>
