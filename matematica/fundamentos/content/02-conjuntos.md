# Conjuntos: noções básicas

Quase toda a matemática moderna é escrita na linguagem dos conjuntos: domínio de função, solução de inequação, intervalos, espaço amostral. Aqui está o vocabulário.

## 1. Conjunto, elemento e pertinência

Um **conjunto** é uma coleção de objetos, chamados **elementos**. Usamos letras maiúsculas para conjuntos e minúsculas para elementos.

- $a \in A$: "$a$ **pertence** a $A$".
- $a \notin A$: "$a$ não pertence a $A$".

**Exemplo.** Se $A = \{1, 2, 3\}$, então $2 \in A$ e $5 \notin A$.

> [!ATENÇÃO] O símbolo $\in$ relaciona **elemento** com **conjunto**. Escrever $\{2\} \in \{1,2,3\}$ está errado: $\{2\}$ é um conjunto, e o certo é $\{2\} \subset \{1,2,3\}$.

## 2. Formas de descrever um conjunto

**Por extensão (listando):** $A = \{1, 3, 5, 7\}$.

**Por compreensão (propriedade):**

$$A = \{x \in \mathbb{N} \mid x \text{ é ímpar e } x < 8\}$$

Lê-se: "o conjunto dos $x$ naturais **tais que** $x$ é ímpar e menor que $8$". A barra $\mid$ (ou dois-pontos) significa "tal que".

**Por diagrama de Venn:** uma região fechada com os elementos dentro. Experimente no [simulador de conjuntos](#/lab/venn).

### Observações

- A ordem não importa: $\{1, 2\} = \{2, 1\}$.
- Repetição não importa: $\{1, 1, 2\} = \{1, 2\}$.
- **Conjunto vazio:** $\varnothing = \{\ \}$, sem elementos. Atenção: $\{\varnothing\}$ **não** é vazio; tem um elemento.
- **Conjunto unitário:** um só elemento, como $\{7\}$.
- **Conjunto universo** $U$: o conjunto de referência de um problema.

## 3. Inclusão e subconjuntos

> [!DEFINIÇÃO] $A$ é **subconjunto** de $B$, e escrevemos $A \subset B$ (ou $A \subseteq B$), quando todo elemento de $A$ também é elemento de $B$:
> $$A \subset B \iff \forall x\,(x \in A \Rightarrow x \in B).$$

Propriedades:

- $\varnothing \subset A$ para todo conjunto $A$.
- $A \subset A$.
- Se $A \subset B$ e $B \subset C$, então $A \subset C$.

> [!TEOREMA] **(Igualdade de conjuntos)** $A = B \iff A \subset B \text{ e } B \subset A$.

É assim que se **prova** que dois conjuntos são iguais: mostra-se as duas inclusões.

**Exemplo.** $\{x \in \mathbb{R} \mid x^2 = 1\} = \{-1, 1\}$. De fato, as soluções de $x^2=1$ são exatamente $\pm 1$.

> [!DICA] Por que $\varnothing \subset A$? Para negar, precisaríamos de um elemento do vazio que não está em $A$, e o vazio não tem elementos. A afirmação é verdadeira "por vacuidade".

## 4. Conjunto das partes

> [!DEFINIÇÃO] O **conjunto das partes** de $A$ é o conjunto de todos os subconjuntos de $A$: $\mathcal{P}(A) = \{X \mid X \subset A\}$.

**Exemplo.** Se $A = \{a, b\}$, então $\mathcal{P}(A) = \{\varnothing, \{a\}, \{b\}, \{a, b\}\}$.

> [!TEOREMA] Se $A$ tem $n$ elementos, então $\mathcal{P}(A)$ tem $2^n$ elementos.

*Por quê?* Para montar um subconjunto, decidimos para cada um dos $n$ elementos: entra ou não entra. São $2 \cdot 2 \cdots 2 = 2^n$ escolhas.

## 5. Cardinalidade

O número de elementos de um conjunto finito $A$ é sua **cardinalidade**, indicada por $n(A)$ ou $|A|$. Exemplo: $n(\{2, 4, 6\}) = 3$ e $n(\varnothing) = 0$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Sendo $A = \{1, 2, \{3\}\}$, qual afirmação é verdadeira?
- $3 \in A$
+ $\{3\} \in A$
- $\{1, 3\} \subset A$
- $n(A) = 4$
> Os elementos de $A$ são $1$, $2$ e o conjunto $\{3\}$. O número $3$ sozinho não é elemento.

? Qual afirmação é verdadeira para qualquer conjunto $A$?
+ $\varnothing \subset A$
- $\varnothing \in A$
- $A \in A$
- $\{A\} \subset A$
> O vazio é subconjunto de todo conjunto, mas não necessariamente elemento.

? Quantos elementos tem $\mathcal{P}(\{1, 2, 3\})$?
- $3$
- $6$
+ $8$
- $9$
> $2^3 = 8$ subconjuntos, contando $\varnothing$ e o próprio conjunto.

? $\{x \in \mathbb{Z} \mid -2 < x \leq 1\}$ é igual a:
- $\{-2, -1, 0, 1\}$
+ $\{-1, 0, 1\}$
- $\{-1, 0\}$
- $\{-2, -1, 0\}$
> O $-2$ fica de fora (desigualdade estrita) e o $1$ entra.

? Para provar que $A = B$, basta mostrar que:
- $A$ e $B$ têm o mesmo número de elementos
+ $A \subset B$ e $B \subset A$
- $A \cap B \neq \varnothing$
- existe um elemento comum
> Igualdade de conjuntos é dupla inclusão. Mesma cardinalidade não basta: $\{1\}$ e $\{2\}$.
```

## 6. Exercícios

**1.** Escreva por extensão $A = \{x \in \mathbb{N} \mid x^2 < 20\}$ (considere $0 \in \mathbb{N}$).

<details>
<summary>Ver solução</summary>

$0, 1, 4, 9, 16$ são menores que $20$ e $25$ não é. Logo, $A = \{0, 1, 2, 3, 4\}$.

</details>

**2.** Liste todos os subconjuntos de $\{x, y, z\}$.

<details>
<summary>Ver solução</summary>

$\varnothing$, $\{x\}$, $\{y\}$, $\{z\}$, $\{x,y\}$, $\{x,z\}$, $\{y,z\}$, $\{x,y,z\}$. São $2^3 = 8$.

</details>

**3.** Verdadeiro ou falso: $\{\varnothing\} = \varnothing$.

<details>
<summary>Ver solução</summary>

Falso. $\{\varnothing\}$ tem um elemento (o vazio), enquanto $\varnothing$ não tem nenhum.

</details>

**4.** Se $\mathcal{P}(A)$ tem $64$ elementos, quantos elementos tem $A$?

<details>
<summary>Ver solução</summary>

$2^n = 64 \Rightarrow n = 6$.

</details>
