# Operações com conjuntos

Assim como somamos e multiplicamos números, combinamos conjuntos com **união**, **interseção**, **diferença** e **complementar**. Essas operações aparecem em domínios de funções, soluções de sistemas de inequações e problemas de contagem.

> [!INTUIÇÃO] Abra o [simulador de conjuntos](#/lab/venn) ao lado deste capítulo: digite os elementos, escolha a operação e veja a região correspondente no diagrama de Venn.

## 1. União

> [!DEFINIÇÃO] $A \cup B = \{x \mid x \in A \ \text{ou}\ x \in B\}$.

Os elementos que estão em **pelo menos um** dos conjuntos. Exemplo: $\{1,2,3\} \cup \{3,4\} = \{1,2,3,4\}$.

## 2. Interseção

> [!DEFINIÇÃO] $A \cap B = \{x \mid x \in A \ \text{e}\ x \in B\}$.

Os elementos **comuns**. Exemplo: $\{1,2,3\} \cap \{3,4\} = \{3\}$. Se $A \cap B = \varnothing$, os conjuntos são **disjuntos**.

## 3. Diferença

> [!DEFINIÇÃO] $A - B = A \setminus B = \{x \mid x \in A \ \text{e}\ x \notin B\}$.

O que está em $A$ mas não em $B$. Exemplo: $\{1,2,3\} - \{3,4\} = \{1,2\}$, enquanto $\{3,4\} - \{1,2,3\} = \{4\}$.

> [!ATENÇÃO] A diferença **não é comutativa**: em geral $A - B \neq B - A$.

## 4. Complementar

Dentro de um universo $U$, o **complementar** de $A$ é tudo que não está em $A$:

$$A^c = \overline{A} = U - A.$$

Quando $B \subset A$, também se fala no complementar de $B$ em relação a $A$: $C_A B = A - B$.

## 5. Propriedades

| Propriedade | União | Interseção |
|---|---|---|
| Comutativa | $A \cup B = B \cup A$ | $A \cap B = B \cap A$ |
| Associativa | $(A \cup B) \cup C = A \cup (B \cup C)$ | $(A \cap B) \cap C = A \cap (B \cap C)$ |
| Elemento neutro | $A \cup \varnothing = A$ | $A \cap U = A$ |
| Distributiva | $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |

### Leis de De Morgan

> [!TEOREMA] $$(A \cup B)^c = A^c \cap B^c \qquad (A \cap B)^c = A^c \cup B^c$$

São a versão em conjuntos das negações do capítulo de lógica: "não (está em $A$ ou em $B$)" é o mesmo que "não está em $A$ **e** não está em $B$". Confirme no simulador comparando as regiões de $(A\cup B)^c$ e $A^c \cap B^c$.

## 6. Contando elementos: princípio da inclusão-exclusão

Somar $n(A) + n(B)$ conta **duas vezes** quem está na interseção. Por isso:

> [!TEOREMA] $$n(A \cup B) = n(A) + n(B) - n(A \cap B)$$
> $$n(A \cup B \cup C) = n(A) + n(B) + n(C) - n(A\cap B) - n(A\cap C) - n(B\cap C) + n(A\cap B\cap C)$$

### Problemas com diagrama

**Exemplo.** Em uma turma de $40$ alunos, $25$ gostam de Cálculo, $18$ de Física e $8$ das duas. Quantos não gostam de nenhuma?

Gostam de pelo menos uma: $25 + 18 - 8 = 35$. Não gostam de nenhuma: $40 - 35 = 5$.

> [!DICA] Em problemas com diagrama, **preencha sempre de dentro para fora**: comece pela interseção de todos, depois as interseções de dois, depois as regiões "só A", "só B". Assim você nunca conta alguém duas vezes.

**Exemplo com três conjuntos.** Numa pesquisa com $100$ pessoas sobre os aplicativos X, Y e Z: $50$ usam X, $40$ usam Y, $30$ usam Z, $15$ usam X e Y, $10$ usam X e Z, $8$ usam Y e Z e $5$ usam os três. Quantas não usam nenhum?

Pelo princípio: $n(X\cup Y\cup Z) = 50 + 40 + 30 - 15 - 10 - 8 + 5 = 92$. Logo $100 - 92 = 8$ pessoas não usam nenhum.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $A = \{1,2,3,4\}$ e $B = \{3,4,5\}$, então $A - B$ é:
+ $\{1, 2\}$
- $\{5\}$
- $\{3, 4\}$
- $\{1, 2, 5\}$
> Elementos de $A$ que não estão em $B$.

? Com os mesmos $A$ e $B$, quanto vale $n(A \cup B)$?
- $7$
+ $5$
- $4$
- $2$
> $4 + 3 - 2 = 5$: o $3$ e o $4$ seriam contados duas vezes.

? Pela lei de De Morgan, $(A \cap B)^c$ é igual a:
- $A^c \cap B^c$
+ $A^c \cup B^c$
- $A \cup B$
- $(A \cup B)^c$
> O complementar troca $\cap$ por $\cup$.

? Se $A \subset B$, então $A \cap B$ é igual a:
+ $A$
- $B$
- $\varnothing$
- $A \cup B$
> Todo elemento de $A$ já está em $B$, então os comuns são exatamente os de $A$.

? Numa turma, $30$ estudam inglês, $20$ estudam espanhol e $10$ estudam os dois. Quantos estudam pelo menos um idioma?
- $50$
+ $40$
- $60$
- $30$
> $30 + 20 - 10 = 40$.
```

## 7. Exercícios

**1.** Dados $U = \{1,\dots,10\}$, $A = \{1,2,3,4,5\}$ e $B = \{4,5,6,7\}$, calcule $A \cap B$, $A \cup B$, $B - A$ e $(A \cup B)^c$.

<details>
<summary>Ver solução</summary>

$A \cap B = \{4,5\}$; $A \cup B = \{1,\dots,7\}$; $B - A = \{6,7\}$; $(A \cup B)^c = \{8, 9, 10\}$.

</details>

**2.** Verifique, com o exercício anterior, que $(A \cap B)^c = A^c \cup B^c$.

<details>
<summary>Ver solução</summary>

$(A\cap B)^c = U - \{4,5\} = \{1,2,3,6,7,8,9,10\}$. Por outro lado, $A^c = \{6,\dots,10\}$ e $B^c = \{1,2,3,8,9,10\}$, e $A^c \cup B^c = \{1,2,3,6,7,8,9,10\}$. São iguais.

</details>

**3.** Em uma prova com duas questões, $70\%$ acertaram a primeira, $55\%$ a segunda e $15\%$ erraram as duas. Qual porcentagem acertou as duas?

<details>
<summary>Ver solução</summary>

Acertaram pelo menos uma: $100\% - 15\% = 85\%$. Então $85 = 70 + 55 - x$, logo $x = 40\%$.

</details>

**4.** Mostre que $A - B = A \cap B^c$.

<details>
<summary>Ver solução</summary>

$x \in A - B \iff x \in A \text{ e } x \notin B \iff x \in A \text{ e } x \in B^c \iff x \in A \cap B^c$.

</details>
