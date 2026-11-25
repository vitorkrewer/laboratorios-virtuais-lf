# Produto cartesiano e relações

O plano cartesiano, os gráficos e a própria definição de **função** nascem de uma operação simples: formar pares ordenados. Este capítulo faz a ponte entre conjuntos e funções.

## 1. Par ordenado

Um **par ordenado** $(a, b)$ é um par em que a **ordem importa**:

$$(a, b) = (c, d) \iff a = c \ \text{ e } \ b = d.$$

Por isso $(1, 2) \neq (2, 1)$, enquanto os conjuntos $\{1, 2\}$ e $\{2, 1\}$ são iguais.

## 2. Produto cartesiano

> [!DEFINIÇÃO] O **produto cartesiano** de $A$ por $B$ é o conjunto de todos os pares com o primeiro elemento em $A$ e o segundo em $B$:
> $$A \times B = \{(a, b) \mid a \in A \ \text{e}\ b \in B\}.$$

**Exemplo.** Se $A = \{1, 2\}$ e $B = \{x, y, z\}$:

$$A \times B = \{(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)\}.$$

> [!TEOREMA] Se $A$ e $B$ são finitos, $n(A \times B) = n(A) \cdot n(B)$.

> [!ATENÇÃO] Em geral $A \times B \neq B \times A$. No exemplo, $(1, x) \in A \times B$, mas $(1, x) \notin B \times A$.

### O plano cartesiano

$\mathbb{R} \times \mathbb{R} = \mathbb{R}^2$ é o conjunto de todos os pares de números reais: o **plano cartesiano**. Cada ponto do plano é um par $(x, y)$.

**Exemplo.** Se $A = [1, 3]$ e $B = [0, 2]$ são intervalos, $A \times B$ é o **retângulo** $1 \le x \le 3$, $0 \le y \le 2$ no plano.

## 3. Relações

> [!DEFINIÇÃO] Uma **relação** de $A$ em $B$ é qualquer subconjunto $R \subset A \times B$. Quando $(a, b) \in R$, dizemos que $a$ está relacionado com $b$.

**Exemplo.** Com $A = \{1, 2, 3\}$ e $B = \{1, 2, 3, 4\}$, a relação "$b = a + 1$" é

$$R = \{(1, 2), (2, 3), (3, 4)\}.$$

O **domínio** de $R$ é o conjunto dos primeiros elementos que aparecem; a **imagem** é o conjunto dos segundos elementos.

## 4. Função como relação especial

> [!DEFINIÇÃO] Uma relação $f \subset A \times B$ é uma **função de $A$ em $B$** quando **cada** elemento de $A$ está relacionado com **exatamente um** elemento de $B$.

Duas exigências:

1. **Todo** $a \in A$ tem imagem (nenhum fica sem par).
2. Cada $a$ tem **uma única** imagem (nenhum tem dois pares).

**Exemplo.** Com $A = \{1, 2, 3\}$ e $B = \{a, b\}$:

- $\{(1,a), (2,a), (3,b)\}$ **é** função (cada elemento de $A$ aparece uma vez).
- $\{(1,a), (2,b)\}$ **não é** função de $A$ em $B$ (o $3$ ficou sem imagem).
- $\{(1,a), (1,b), (2,a), (3,a)\}$ **não é** função (o $1$ tem duas imagens).

> [!DICA] No gráfico de $\mathbb{R}$ em $\mathbb{R}$, isso vira o **teste da reta vertical**: um conjunto de pontos é gráfico de função se toda reta vertical (dentro do domínio) o corta em exatamente um ponto. O círculo $x^2 + y^2 = 1$ não passa no teste.

Repare que **não** se exige que todo elemento de $B$ seja atingido: a imagem pode ser menor que $B$ (o **contradomínio**). Esse assunto continua no livro **Funções**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $n(A) = 3$ e $n(B) = 4$, quanto vale $n(A \times B)$?
- $7$
+ $12$
- $64$
- $81$
> $n(A\times B) = n(A)\cdot n(B) = 12$.

? Para que $(x + 1, 5) = (3, y - 2)$, devemos ter:
+ $x = 2$ e $y = 7$
- $x = 3$ e $y = 5$
- $x = 4$ e $y = 3$
- $x = 2$ e $y = 3$
> Igualdade de pares: $x + 1 = 3$ e $5 = y - 2$.

? Sendo $A = \{1,2\}$ e $B = \{3\}$, qual par pertence a $B \times A$?
- $(1, 3)$
+ $(3, 1)$
- $(1, 2)$
- $(3, 3)$
> Em $B \times A$, o primeiro elemento vem de $B$.

? Com $A = \{1,2,3\}$ e $B = \{0,1\}$, qual relação é uma função de $A$ em $B$?
- $\{(1,0), (2,1)\}$
+ $\{(1,1), (2,1), (3,1)\}$
- $\{(1,0), (1,1), (2,0), (3,0)\}$
- $\{(0,1), (1,2), (1,3)\}$
> Cada elemento de $A$ aparece exatamente uma vez como primeira coordenada. Imagens repetidas são permitidas.

? O conjunto $\{(x, y) \in \mathbb{R}^2 \mid x^2 + y^2 = 4\}$ é gráfico de uma função $y = f(x)$?
- Sim, de $\mathbb{R}$ em $\mathbb{R}$
+ Não: há valores de $x$ com duas imagens
- Sim, porque é uma curva fechada
- Não, porque não passa pela origem
> É um círculo; para $x = 0$ temos $y = 2$ e $y = -2$. Falha no teste da reta vertical.
```

## 5. Exercícios

**1.** Sendo $A = \{0, 1\}$ e $B = \{1, 2, 3\}$, escreva $A \times B$ e $B \times A$.

<details>
<summary>Ver solução</summary>

$A\times B = \{(0,1),(0,2),(0,3),(1,1),(1,2),(1,3)\}$. $B \times A = \{(1,0),(1,1),(2,0),(2,1),(3,0),(3,1)\}$. Ambos têm $6$ elementos, mas são diferentes.

</details>

**2.** Determine $x$ e $y$ tais que $(2x - y,\ x + y) = (1, 5)$.

<details>
<summary>Ver solução</summary>

$2x - y = 1$ e $x + y = 5$. Somando: $3x = 6$, então $x = 2$ e $y = 3$.

</details>

**3.** Com $A = \{1, 2, 3, 4\}$, escreva a relação $R = \{(a, b) \in A \times A \mid a < b\}$. Ela é função?

<details>
<summary>Ver solução</summary>

$R = \{(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)\}$. Não é função de $A$ em $A$: o $1$ tem três imagens e o $4$ nenhuma.

</details>

**4.** Desenhe no plano $A \times B$ para $A = [0, 2]$ e $B = \{1, 3\}$.

<details>
<summary>Ver solução</summary>

São dois segmentos horizontais: de $(0,1)$ a $(2,1)$ e de $(0,3)$ a $(2,3)$.

</details>
