# Sistemas lineares e escalonamento

Resolver sistemas é a tarefa mais frequente da Álgebra Linear. Quase todas as perguntas do curso ("esses vetores são LI?", "essa matriz tem inversa?", "qual é o núcleo?") viram, no fim, **um sistema para escalonar**. Por isso este capítulo vem logo no começo.

> [!DICA] Pratique no simulador [Escalonamento](#/lab/escalonamento): você aplica as operações elementares com frações exatas e ele avisa quando a matriz está escalonada e classifica o sistema.

## 1. Sistema linear

> [!DEFINIÇÃO] Um **sistema linear** tem equações em que as incógnitas aparecem só com expoente $1$, multiplicadas por números e somadas: $a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b$. Nada de $x^2$, $xy$ ou $\sin x$.

$$\begin{cases} x + 2y - z = 3 \\ 2x + 5y + z = 9 \\ -x + y + 4z = 6 \end{cases}$$

Todo sistema tem **nenhuma**, **uma** ou **infinitas** soluções. Nunca exatamente duas.

| Tipo | Soluções | Nome |
|---|---|---|
| Possível e determinado | uma | SPD |
| Possível e indeterminado | infinitas | SPI |
| Impossível | nenhuma | SI |

> [!INTUIÇÃO] Com duas incógnitas, cada equação é uma reta; com três, um plano. Três planos podem se cruzar em um ponto (SPD), em uma reta inteira (SPI) ou não ter ponto comum (SI).

## 2. Matriz aumentada

Só os números importam: escreva os coeficientes em uma tabela, com os termos independentes separados por uma linha tracejada.

$$\left[\begin{array}{ccc:c} 1 & 2 & -1 & 3 \\ 2 & 5 & 1 & 9 \\ -1 & 1 & 4 & 6 \end{array}\right]$$

Cada **linha** é uma equação; cada **coluna** (antes do tracejado) é uma incógnita.

## 3. Operações elementares

> [!TEOREMA] As três operações abaixo **não mudam as soluções** do sistema:
> 1. Trocar duas linhas: $L_i \leftrightarrow L_j$.
> 2. Multiplicar uma linha por um número **não nulo**: $L_i \leftarrow k\,L_i$.
> 3. Somar a uma linha um múltiplo de outra: $L_i \leftarrow L_i + k\,L_j$.

> [!INTUIÇÃO] São as mesmas manobras do método da adição da escola: trocar a ordem das equações, multiplicar uma equação inteira, somar equações. Só ficou organizado.

## 4. Eliminação de Gauss

**Objetivo:** chegar à **forma escalonada**: em cada linha, o primeiro número não nulo (o **pivô**) fica mais à direita que o pivô da linha de cima, e linhas de zeros ficam no fim.

**Roteiro.**
1. Escolha um pivô não nulo na primeira coluna (troque linhas se precisar).
2. Zere tudo **abaixo** dele com $L_i \leftarrow L_i - k\,L_1$, onde $k = \frac{\text{número a zerar}}{\text{pivô}}$.
3. Repita na submatriz que sobra (próxima linha, próxima coluna).
4. Resolva de baixo para cima (**substituição regressiva**).

**Exemplo** (o sistema acima).

$L_2 \leftarrow L_2 - 2L_1$ e $L_3 \leftarrow L_3 + L_1$:

$$\left[\begin{array}{ccc:c} 1 & 2 & -1 & 3 \\ 0 & 1 & 3 & 3 \\ 0 & 3 & 3 & 9 \end{array}\right]$$

$L_3 \leftarrow L_3 - 3L_2$:

$$\left[\begin{array}{ccc:c} 1 & 2 & -1 & 3 \\ 0 & 1 & 3 & 3 \\ 0 & 0 & -6 & 0 \end{array}\right]$$

De baixo para cima: $-6z = 0 \Rightarrow z = 0$; $y + 0 = 3 \Rightarrow y = 3$; $x + 6 - 0 = 3 \Rightarrow x = -3$. Solução única: $(-3, 3, 0)$.

> [!DICA] **Sempre confira** substituindo na equação original que você ainda não usou, por exemplo a terceira: $3 + 3 + 0 = 6$. ✓

## 5. Gauss-Jordan e forma escalonada reduzida

Continuando o processo, também zeramos **acima** dos pivôs e deixamos cada pivô igual a $1$. O resultado é a **forma escalonada reduzida**, em que a solução se lê diretamente:

$$\left[\begin{array}{ccc:c} 1 & 0 & 0 & -3 \\ 0 & 1 & 0 & 3 \\ 0 & 0 & 1 & 0 \end{array}\right]$$

A forma reduzida de uma matriz é **única**: qualquer sequência de operações correta chega à mesma.

## 6. Classificando pela forma escalonada

Olhe a forma escalonada:

- Aparece uma linha $\left[\,0 \;\; 0 \;\; \cdots \;\; 0 \;\vdots\; b\,\right]$ com $b \neq 0$? Ela diz $0 = b$: **SI**.
- Senão, compare o número de pivôs com o número de incógnitas:
  - pivô em todas as colunas: **SPD**;
  - menos pivôs que incógnitas: **SPI**. As incógnitas sem pivô são **variáveis livres**.

**Exemplo SPI.**

$$\left[\begin{array}{ccc:c} 1 & 2 & 0 & 4 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{array}\right]$$

Pivôs nas colunas de $x$ e $z$; $y$ é livre. Fazendo $y = t$: $z = 1$ e $x = 4 - 2t$. Solução geral:

$$(x, y, z) = (4, 0, 1) + t\,(-2, 1, 0), \quad t \in \mathbb{R}$$

Uma reta de soluções: um ponto mais múltiplos de uma direção.

> [!DEFINIÇÃO] O **posto** de uma matriz é o número de pivôs da forma escalonada. Um sistema com $n$ incógnitas é possível se e só se o posto da matriz dos coeficientes é igual ao posto da aumentada; e é determinado quando esse posto é $n$.

## 7. Sistemas homogêneos

Um sistema é **homogêneo** quando todos os termos independentes são zero: $A\vec x = \vec 0$. Ele **sempre** tem a solução $\vec x = \vec 0$ (a trivial). A pergunta é se tem outras, e isso acontece exatamente quando há variável livre.

> [!TEOREMA] Um sistema homogêneo com **mais incógnitas que equações** sempre tem infinitas soluções.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual **não** é uma operação elementar?
- trocar duas linhas
- multiplicar uma linha por $-3$
+ multiplicar uma linha por $0$
- somar a uma linha o dobro de outra
> Multiplicar por zero apaga a equação e muda as soluções.

? Na forma escalonada aparece a linha $[0 \;\; 0 \;\; 0 \;\vdots\; 5]$. O sistema é:
- SPD
- SPI
+ SI
- não dá para saber
> A linha diz $0 = 5$: impossível.

? Um sistema com 3 incógnitas tem forma escalonada com 2 pivôs e nenhuma linha contraditória. Ele é:
- SPD
+ SPI, com uma variável livre
- SI
- SPI, com duas variáveis livres
> $3 - 2 = 1$ variável livre.

? Para zerar o $6$ da linha 2 usando o pivô $2$ da linha 1, a operação é:
- $L_2 \leftarrow L_2 - 6L_1$
+ $L_2 \leftarrow L_2 - 3L_1$
- $L_2 \leftarrow L_2 + 3L_1$
- $L_2 \leftarrow 2L_2 - L_1$
> $k = \frac{6}{2} = 3$.

? Um sistema homogêneo:
+ sempre tem pelo menos a solução nula
- nunca tem solução
- sempre tem infinitas soluções
- sempre é SPD
> $\vec x = \vec 0$ satisfaz $A\vec x = \vec 0$.
```

## 8. Exercícios

**1.** Resolva por escalonamento: $\begin{cases} x + y + z = 6 \\ 2x - y + z = 3 \\ x + 2y - z = 2 \end{cases}$.

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - 2L_1$: $[0\;\,{-3}\;\,{-1} \;\vdots\; {-9}]$. $L_3 \leftarrow L_3 - L_1$: $[0\;\,1\;\,{-2} \;\vdots\; {-4}]$. Troque $L_2 \leftrightarrow L_3$ e faça $L_3 \leftarrow L_3 + 3L_2$: $[0\;\,0\;\,{-7} \;\vdots\; {-21}]$. Então $z = 3$, $y = -4 + 6 = 2$, $x = 6 - 2 - 3 = 1$. Solução $(1, 2, 3)$.

</details>

**2.** Classifique e resolva: $\begin{cases} x + 2y = 3 \\ 2x + 4y = 6 \end{cases}$.

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - 2L_1$ zera a segunda linha inteira. SPI: $y = t$, $x = 3 - 2t$.

</details>

**3.** Classifique: $\begin{cases} x - y + z = 1 \\ 2x - 2y + 2z = 5 \end{cases}$.

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - 2L_1$ dá $[0\;\,0\;\,0 \;\vdots\; 3]$: SI.

</details>

**4.** Encontre todas as soluções de $\begin{cases} x + y - z = 0 \\ 2x + 3y + z = 0 \end{cases}$.

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - 2L_1$: $y + 3z = 0$. Com $z = t$: $y = -3t$, $x = -y + z = 4t$. Soluções $t(4, -3, 1)$.

</details>

**5.** Para que valores de $k$ o sistema $\begin{cases} x + y = 1 \\ 2x + ky = 3 \end{cases}$ é impossível?

<details>
<summary>Ver solução</summary>

$L_2 \leftarrow L_2 - 2L_1$: $(k - 2)y = 1$. Se $k = 2$, fica $0 = 1$: SI. Para $k \neq 2$, SPD.

</details>
