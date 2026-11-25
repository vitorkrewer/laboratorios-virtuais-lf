# Espaço gerado e independência linear

Dois conceitos andam juntos e respondem a perguntas opostas sobre um conjunto de vetores. **Espaço gerado**: até onde eles conseguem chegar? **Independência linear**: algum deles está sobrando?

## 1. Espaço gerado

> [!DEFINIÇÃO] O **espaço gerado** por $\vec v_1, \ldots, \vec v_k$, escrito $\text{ger}\{\vec v_1, \ldots, \vec v_k\}$ (em inglês, *span*), é o conjunto de **todas** as combinações lineares $c_1\vec v_1 + \cdots + c_k\vec v_k$.

Ele é sempre um subespaço, o menor que contém todos os $\vec v_i$.

- $\text{ger}\{(1, 2)\}$ é a reta pela origem na direção $(1, 2)$.
- $\text{ger}\{(1, 0), (0, 1)\} = \mathbb{R}^2$.
- $\text{ger}\{(1, 2), (2, 4)\}$ ainda é só a reta: o segundo vetor não acrescenta nada.
- Em $\mathbb{R}^3$, $\text{ger}\{(1, 0, 0), (0, 1, 0)\}$ é o plano $z = 0$.

> [!INTUIÇÃO] Imagine que cada vetor é uma direção em que você pode andar quanto quiser, para frente ou para trás. O espaço gerado é o conjunto de todos os lugares que você alcança combinando essas caminhadas.

### Como testar se $\vec b \in \text{ger}\{\vec v_1, \ldots, \vec v_k\}$

Monte a matriz com os $\vec v_i$ nas **colunas** e resolva $A\vec c = \vec b$. Se o sistema for possível, $\vec b$ está no espaço gerado, e a solução dá os coeficientes.

**Exemplo.** $(1, 7, 4) \in \text{ger}\{(1, 2, 1), (-1, 1, 1)\}$?

$$\left[\begin{array}{cc:c} 1 & -1 & 1 \\ 2 & 1 & 7 \\ 1 & 1 & 4 \end{array}\right] \to \left[\begin{array}{cc:c} 1 & -1 & 1 \\ 0 & 3 & 5 \\ 0 & 2 & 3 \end{array}\right] \to \left[\begin{array}{cc:c} 1 & -1 & 1 \\ 0 & 3 & 5 \\ 0 & 0 & -\frac{1}{3} \end{array}\right]$$

A última linha diz $0 = -\frac13$: impossível. **Não** está.

## 2. Independência linear

> [!DEFINIÇÃO] Os vetores $\vec v_1, \ldots, \vec v_k$ são **linearmente independentes** (LI) se a única combinação que dá o vetor nulo é a trivial:
> $$c_1\vec v_1 + \cdots + c_k\vec v_k = \vec 0 \;\Rightarrow\; c_1 = \cdots = c_k = 0.$$
> Caso contrário, são **linearmente dependentes** (LD).

> [!TEOREMA] Os vetores são LD se e só se **algum deles é combinação linear dos outros**.

> [!INTUIÇÃO] LD quer dizer "tem vetor sobrando": dá para tirá-lo sem mudar o espaço gerado. LI quer dizer que cada vetor aponta para uma direção genuinamente nova.

### Como testar

Coloque os vetores nas **colunas** e escalone $A\vec c = \vec 0$:

- pivô em **todas** as colunas: só a solução trivial, **LI**;
- alguma coluna sem pivô (variável livre): **LD**.

**Exemplo.** $(1, 2, 3)$, $(4, 5, 6)$, $(7, 8, 9)$:

$$\begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix} \to \begin{bmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{bmatrix} \to \begin{bmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{bmatrix}$$

A 3ª coluna não tem pivô: **LD**. De fato, $(7, 8, 9) = 2(4, 5, 6) - (1, 2, 3)$.

> [!DICA] Com $n$ vetores em $\mathbb{R}^n$ (matriz quadrada), basta o determinante: $\det \neq 0 \iff$ LI. Aqui, $\det = 0$.

### Atalhos que resolvem na hora

- Um conjunto que contém $\vec 0$ é **LD** ($1 \cdot \vec 0 = \vec 0$ é não trivial).
- **Dois** vetores são LD exatamente quando um é múltiplo do outro.
- Em $\mathbb{R}^n$, **mais de $n$ vetores** são sempre LD (há mais colunas que linhas, então sobra variável livre).
- Vetores não nulos e **ortogonais dois a dois** são sempre LI.

> [!ATENÇÃO] Três vetores podem ser LD sem que nenhum seja múltiplo de **outro** individualmente: $(1, 0)$, $(0, 1)$ e $(1, 1)$ são LD, porque o terceiro é a **soma** dos dois primeiros.

## 3. Os dois conceitos juntos

| | Pergunta | Problema típico |
|---|---|---|
| gera $V$? | todo vetor de $V$ é alcançado? | poucos vetores |
| é LI? | algum vetor é redundante? | vetores demais |

O equilíbrio perfeito, gerar tudo **sem** redundância, tem nome: **base**. É o assunto do próximo capítulo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\text{ger}\{(2, 1)\}$ em $\mathbb{R}^2$ é:
- o ponto $(2, 1)$
+ a reta pela origem na direção $(2, 1)$
- todo o plano
- o segmento de $(0, 0)$ a $(2, 1)$
> Todos os múltiplos $c(2, 1)$, com $c$ real.

? Os vetores $(1, 2)$ e $(-3, -6)$ são:
- LI
+ LD
- ortogonais
- uma base de $\mathbb{R}^2$
> $(-3, -6) = -3(1, 2)$.

? Quatro vetores em $\mathbb{R}^3$:
- são sempre LI
+ são sempre LD
- geram sempre $\mathbb{R}^3$
- nunca geram $\mathbb{R}^3$
> Mais vetores que a dimensão: sobra variável livre.

? Para testar se $\vec v_1, \vec v_2, \vec v_3$ são LI, colocamos os vetores:
+ nas colunas e procuramos pivô em todas as colunas
- nas linhas e somamos
- na diagonal
- em um produto escalar
> Pivô em toda coluna = só a solução trivial.

? Se $\{\vec u, \vec v, \vec w\}$ é LI, então $\{\vec u, \vec v\}$:
+ também é LI
- é LD
- pode ser qualquer coisa
- gera o mesmo espaço
> Tirar vetores de um conjunto LI não cria dependência.
```

## 4. Exercícios

**1.** Os vetores $(1, 1, 0)$, $(0, 1, 1)$, $(1, 0, 1)$ são LI?

<details>
<summary>Ver solução</summary>

$\det\begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix} = 1 + 0 + 1 - 0 - 0 - 0 = 2 \neq 0$. São LI.

</details>

**2.** Para que $k$ os vetores $(1, k)$ e $(k, 4)$ são LD?

<details>
<summary>Ver solução</summary>

$\det = 4 - k^2 = 0 \Rightarrow k = \pm 2$.

</details>

**3.** $(3, 5)$ pertence a $\text{ger}\{(1, 1), (1, 2)\}$? Com quais coeficientes?

<details>
<summary>Ver solução</summary>

$a + b = 3$, $a + 2b = 5$: $b = 2$, $a = 1$. Sim: $(3, 5) = 1(1, 1) + 2(1, 2)$.

</details>

**4.** Descreva geometricamente $\text{ger}\{(1, 0, 1), (2, 0, 2)\}$ e $\text{ger}\{(1, 0, 1), (0, 1, 0)\}$.

<details>
<summary>Ver solução</summary>

O primeiro é uma reta (os vetores são múltiplos). O segundo é um plano pela origem: o plano $x = z$.

</details>

**5.** Os polinômios $1 + x$, $1 - x$ e $x^2$ são LI em $P_2$?

<details>
<summary>Ver solução</summary>

$a(1 + x) + b(1 - x) + cx^2 = 0$ para todo $x$ exige $a + b = 0$, $a - b = 0$, $c = 0$. Logo $a = b = c = 0$: LI.

</details>
