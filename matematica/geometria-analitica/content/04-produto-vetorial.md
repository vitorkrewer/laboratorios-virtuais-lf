# Produto vetorial e produto misto

No espaço há uma operação que o plano não tem: o **produto vetorial**, que recebe dois vetores e devolve um **terceiro vetor perpendicular aos dois**. Seu comprimento é uma área. Combinado com o produto escalar, dá o **produto misto**, que é um volume.

> [!DICA] No simulador [Vetores no espaço](#/lab/espaco), gire a cena arrastando o mouse e veja $\vec u \times \vec v$ sempre perpendicular ao paralelogramo formado por $\vec u$ e $\vec v$.

## 1. Definição

> [!DEFINIÇÃO] Para $\vec u = (u_1, u_2, u_3)$ e $\vec v = (v_1, v_2, v_3)$:
> $$\vec u \times \vec v = \begin{vmatrix} \vec i & \vec j & \vec k \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = (u_2v_3 - u_3v_2,\ \ u_3v_1 - u_1v_3,\ \ u_1v_2 - u_2v_1).$$

O "determinante" com $\vec i, \vec j, \vec k$ na primeira linha é só um **dispositivo de memória**: expanda pela primeira linha (Laplace) e cada cofator vira uma componente.

**Exemplo.** $\vec u = (1, 2, 0)$, $\vec v = (0, 1, 3)$:

$$\vec u \times \vec v = (2 \cdot 3 - 0 \cdot 1,\ 0 \cdot 0 - 1 \cdot 3,\ 1 \cdot 1 - 2 \cdot 0) = (6, -3, 1)$$

**Confira:** $(6, -3, 1) \cdot (1, 2, 0) = 0$ e $(6, -3, 1) \cdot (0, 1, 3) = 0$. ✓

> [!DICA] Faça sempre essa conferência: o resultado tem que ser perpendicular aos dois vetores. Ela pega quase todo erro de sinal.

## 2. Geometria do produto vetorial

> [!TEOREMA] 
> 1. **Direção:** $\vec u \times \vec v$ é perpendicular a $\vec u$ e a $\vec v$.
> 2. **Sentido:** regra da mão direita (dedos de $\vec u$ para $\vec v$, o polegar aponta $\vec u \times \vec v$).
> 3. **Comprimento:** $\|\vec u \times \vec v\| = \|\vec u\|\,\|\vec v\|\sin\theta$, que é a **área do paralelogramo** formado por $\vec u$ e $\vec v$.

Consequências:

- **Área do triângulo** $ABC$: $\frac12\|\overrightarrow{AB} \times \overrightarrow{AC}\|$.
- $\vec u \times \vec v = \vec 0$ $\iff$ $\vec u$ e $\vec v$ são paralelos (área zero).
- $\vec i \times \vec j = \vec k$, $\vec j \times \vec k = \vec i$, $\vec k \times \vec i = \vec j$ (ciclo $i \to j \to k$).

> [!ATENÇÃO] O produto vetorial **não é comutativo**: $\vec v \times \vec u = -(\vec u \times \vec v)$. Trocar a ordem inverte o sentido. Ele também **não é associativo**: $(\vec i \times \vec i) \times \vec j = \vec 0$, mas $\vec i \times (\vec i \times \vec j) = -\vec j$. E só existe em $\mathbb{R}^3$.

**Exemplo.** Área do triângulo $A = (1, 0, 0)$, $B = (0, 2, 0)$, $C = (0, 0, 3)$: $\overrightarrow{AB} = (-1, 2, 0)$, $\overrightarrow{AC} = (-1, 0, 3)$, produto $(6, 3, 2)$, norma $7$. Área $= \frac72$.

## 3. Produto misto

> [!DEFINIÇÃO] O **produto misto** é $[\vec u, \vec v, \vec w] = \vec u \cdot (\vec v \times \vec w) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}$. O resultado é um **número**.

> [!TEOREMA] $|[\vec u, \vec v, \vec w]|$ é o **volume do paralelepípedo** formado pelos três vetores. O volume do **tetraedro** (pirâmide de base triangular) é $\frac16$ disso.

> [!TEOREMA] **(Coplanaridade)** $\vec u$, $\vec v$, $\vec w$ estão no mesmo plano $\iff$ $[\vec u, \vec v, \vec w] = 0$. Para quatro pontos $A, B, C, D$, teste $[\overrightarrow{AB}, \overrightarrow{AC}, \overrightarrow{AD}]$.

**Exemplo.** Volume do paralelepípedo de $\vec u = (1, 0, 0)$, $\vec v = (1, 2, 0)$, $\vec w = (0, 1, 3)$: $\det = 1(6 - 0) - 0 + 0 = 6$.

> [!INTUIÇÃO] $\vec v \times \vec w$ é a área da base apontando para "cima"; o produto escalar com $\vec u$ mede quanto $\vec u$ sobe nessa direção (a altura). Base vezes altura: volume.

## 4. Resumo dos três produtos

| Produto | Resultado | Significado |
|---|---|---|
| $\vec u \cdot \vec v$ | número | ângulo; zero se perpendiculares |
| $\vec u \times \vec v$ | vetor | normal; norma = área do paralelogramo |
| $[\vec u, \vec v, \vec w]$ | número | volume com sinal; zero se coplanares |

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\vec i \times \vec j$ é igual a:
- $\vec 0$
+ $\vec k$
- $-\vec k$
- $1$
> Ciclo $i \to j \to k$.

? $(1, 0, 0) \times (0, 0, 1)$ é:
- $(0, 1, 0)$
+ $(0, -1, 0)$
- $(1, 0, 1)$
- $0$
> $\vec i \times \vec k = -(\vec k \times \vec i) = -\vec j$.

? Se $\vec u \times \vec v = \vec 0$ (ambos não nulos), então:
- são perpendiculares
+ são paralelos
- têm a mesma norma
- $\vec u \cdot \vec v = 0$
> Área do paralelogramo zero.

? A área do triângulo $ABC$ é:
- $\|\overrightarrow{AB} \times \overrightarrow{AC}\|$
+ $\frac12\|\overrightarrow{AB} \times \overrightarrow{AC}\|$
- $\overrightarrow{AB} \cdot \overrightarrow{AC}$
- $\frac16[\overrightarrow{AB}, \overrightarrow{AC}]$
> Metade do paralelogramo.

? Três vetores com produto misto igual a zero são:
+ coplanares
- perpendiculares dois a dois
- unitários
- paralelos ao eixo $z$
> Volume zero: estão no mesmo plano.
```

## 5. Exercícios

**1.** Calcule $(2, 1, -1) \times (1, 3, 2)$ e confira a perpendicularidade.

<details>
<summary>Ver solução</summary>

$(1 \cdot 2 - (-1) \cdot 3,\ (-1) \cdot 1 - 2 \cdot 2,\ 2 \cdot 3 - 1 \cdot 1) = (5, -5, 5)$. Produtos escalares: $10 - 5 - 5 = 0$ e $5 - 15 + 10 = 0$. ✓

</details>

**2.** Calcule a área do triângulo $A = (0, 0, 0)$, $B = (2, 0, 0)$, $C = (0, 3, 4)$.

<details>
<summary>Ver solução</summary>

$(2, 0, 0) \times (0, 3, 4) = (0, -8, 6)$, norma $10$. Área $5$.

</details>

**3.** Os pontos $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$ e $(1, 1, -1)$ são coplanares?

<details>
<summary>Ver solução</summary>

Com $A = (1, 0, 0)$: $\overrightarrow{AB} = (-1, 1, 0)$, $\overrightarrow{AC} = (-1, 0, 1)$, $\overrightarrow{AD} = (0, 1, -1)$. Determinante: $-1(0 - 1) - 1(1 - 0) + 0 = 1 - 1 = 0$. Sim, coplanares (o quarto ponto satisfaz $x + y + z = 1$).

</details>

**4.** Calcule o volume do tetraedro de vértices $(0, 0, 0)$, $(1, 0, 0)$, $(0, 2, 0)$, $(0, 0, 3)$.

<details>
<summary>Ver solução</summary>

Produto misto $= 1 \cdot 2 \cdot 3 = 6$. Tetraedro: $\frac{6}{6} = 1$.

</details>
