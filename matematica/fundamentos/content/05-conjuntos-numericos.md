# Conjuntos numéricos

Os números foram sendo ampliados para resolver equações que antes não tinham solução. Entender essa construção explica por que o Cálculo precisa dos **números reais**.

## 1. A sequência

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$$

| Conjunto | Elementos | Resolve, por exemplo |
|---|---|---|
| $\mathbb{N}$ (naturais) | $0, 1, 2, 3, \ldots$ | $x + 2 = 5$ |
| $\mathbb{Z}$ (inteiros) | $\ldots, -2, -1, 0, 1, 2, \ldots$ | $x + 5 = 2$ |
| $\mathbb{Q}$ (racionais) | $\frac{p}{q}$, com $p, q \in \mathbb{Z}$, $q \ne 0$ | $3x = 2$ |
| $\mathbb{R}$ (reais) | racionais e irracionais | $x^2 = 2$ |

Notações úteis: o asterisco retira o zero ($\mathbb{Z}^* = \mathbb{Z} - \{0\}$); os sinais $+$ e $-$ restringem ao não negativo ou não positivo ($\mathbb{R}_+ = [0, \infty)$).

> [!ATENÇÃO] Há livros que não incluem o $0$ em $\mathbb{N}$. Confira a convenção do seu professor; aqui usamos $0 \in \mathbb{N}$.

## 2. Racionais e dízimas

Todo racional tem representação decimal **finita** ($\frac{3}{4} = 0{,}75$) ou **periódica** ($\frac{1}{3} = 0{,}333\ldots$). E toda dízima periódica é racional.

**Exemplo.** Escreva $0{,}\overline{27} = 0{,}2727\ldots$ como fração.

Seja $x = 0{,}2727\ldots$ Então $100x = 27{,}2727\ldots$ Subtraindo: $99x = 27$, logo $x = \frac{27}{99} = \frac{3}{11}$.

**Exemplo.** $0{,}999\ldots = 1$. Com $x = 0{,}999\ldots$, temos $10x = 9{,}999\ldots$, então $9x = 9$ e $x = 1$. Não é aproximação: são duas escritas do mesmo número.

## 3. Irracionais

> [!DEFINIÇÃO] Um número real é **irracional** quando não pode ser escrito como $\frac{p}{q}$ com $p, q$ inteiros. Sua expansão decimal é infinita e **não periódica**. O conjunto dos irracionais costuma ser indicado por $\mathbb{I}$ ou $\mathbb{R} - \mathbb{Q}$.

Exemplos: $\sqrt{2}$, $\sqrt{3}$, $\pi$, $e$.

> [!TEOREMA] $\sqrt{2}$ é irracional.

*Demonstração (por absurdo).* Suponha $\sqrt2 = \frac{p}{q}$ com a fração **irredutível**. Então $2q^2 = p^2$, logo $p^2$ é par, e portanto $p$ é par: $p = 2k$. Substituindo, $2q^2 = 4k^2$, isto é, $q^2 = 2k^2$, e $q$ também é par. Mas então $p$ e $q$ têm o fator $2$ em comum, contradizendo a irredutibilidade. Logo $\sqrt2$ não é racional. $\blacksquare$

> [!DICA] Essa é a estrutura da **prova por absurdo**: supor a negação, chegar a uma contradição e concluir que a afirmação original é verdadeira. Usa exatamente a lógica do primeiro capítulo.

### Operações com irracionais

- Racional $+$ irracional é **sempre** irracional.
- Racional (não nulo) $\times$ irracional é **sempre** irracional.
- Irracional $+$ irracional **pode** ser racional: $\sqrt2 + (-\sqrt2) = 0$.
- Irracional $\times$ irracional **pode** ser racional: $\sqrt2 \cdot \sqrt2 = 2$.

## 4. Propriedades dos reais que o Cálculo usa

1. **Corpo ordenado:** valem as regras usuais de soma, produto e desigualdade.
2. **Densidade:** entre dois reais distintos sempre há infinitos racionais e infinitos irracionais.
3. **Completude:** a reta real "não tem buracos". É essa propriedade que garante a existência de $\sqrt2$, de limites e de resultados como o Teorema do Valor Intermediário. Em $\mathbb{Q}$, a equação $x^2 = 2$ não tem solução: há um "buraco" ali.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual número é irracional?
- $0{,}\overline{3}$
- $\sqrt{16}$
+ $\sqrt{5}$
- $-\frac{7}{3}$
> $\sqrt{16} = 4$ e as dízimas periódicas são racionais. $\sqrt5$ não é quadrado perfeito.

? A fração geratriz de $0{,}\overline{6} = 0{,}666\ldots$ é:
- $\frac{6}{10}$
+ $\frac{2}{3}$
- $\frac{6}{100}$
- $\frac{3}{5}$
> $10x - x = 6$, então $x = \frac69 = \frac23$.

? Qual afirmação é **falsa**?
- $\mathbb{N} \subset \mathbb{Z}$
- $\mathbb{Z} \subset \mathbb{Q}$
+ $\mathbb{Q} \cap (\mathbb{R}-\mathbb{Q}) = \{0\}$
- $\mathbb{Q} \subset \mathbb{R}$
> Racionais e irracionais são disjuntos: a interseção é vazia. O $0$ é racional.

? A soma de dois números irracionais:
- é sempre irracional
- é sempre racional
+ pode ser racional ou irracional
- nunca é um número real
> $\sqrt2 + \sqrt2 = 2\sqrt2$ é irracional; $\sqrt2 + (-\sqrt2) = 0$ é racional.

? Qual é o menor conjunto numérico em que $x^2 = 2$ tem solução?
- $\mathbb{N}$
- $\mathbb{Z}$
- $\mathbb{Q}$
+ $\mathbb{R}$
> As soluções $\pm\sqrt2$ são irracionais.
```

## 5. Exercícios

**1.** Escreva $1{,}2\overline{5} = 1{,}2555\ldots$ como fração.

<details>
<summary>Ver solução</summary>

$x = 1{,}2555\ldots$; $10x = 12{,}555\ldots$; $100x = 125{,}555\ldots$ Subtraindo: $90x = 113$, logo $x = \frac{113}{90}$.

</details>

**2.** Classifique cada número no menor conjunto a que pertence: $-3$, $\frac{8}{2}$, $0{,}1\overline{6}$, $\sqrt{9}$, $\sqrt{10}$, $\pi - 3$.

<details>
<summary>Ver solução</summary>

$-3 \in \mathbb{Z}$; $\frac82 = 4 \in \mathbb{N}$; $0{,}1\overline6 \in \mathbb{Q}$; $\sqrt9 = 3 \in \mathbb{N}$; $\sqrt{10}$ e $\pi - 3$ são irracionais.

</details>

**3.** Mostre que $3 + \sqrt2$ é irracional.

<details>
<summary>Ver solução</summary>

Se $3 + \sqrt2 = r$ fosse racional, então $\sqrt2 = r - 3$ seria racional (diferença de racionais), o que é falso. Logo $3 + \sqrt2$ é irracional.

</details>

**4.** Dê um número racional e um irracional entre $1{,}41$ e $1{,}42$.

<details>
<summary>Ver solução</summary>

Racional: $1{,}415$. Irracional: $\sqrt2 \approx 1{,}4142$.

</details>
