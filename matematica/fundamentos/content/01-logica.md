# Lógica e linguagem matemática

No ensino superior, a matemática é escrita em uma linguagem precisa: proposições, conectivos, quantificadores e implicações. Quem não lê essa linguagem com fluência trava no enunciado antes mesmo de começar a conta. Este capítulo ensina a **ler** um teorema.

## 1. Proposições

> [!DEFINIÇÃO] Uma **proposição** é uma afirmação que é **verdadeira (V)** ou **falsa (F)**, nunca as duas coisas.

- "$7$ é primo." é uma proposição verdadeira.
- "$2 + 2 = 5$" é uma proposição falsa.
- "Feche a porta." não é proposição (é uma ordem).
- "$x > 3$" não é proposição enquanto não soubermos quem é $x$: é uma **sentença aberta**.

## 2. Conectivos

| Símbolo | Nome | Lê-se | É verdadeira quando |
|---|---|---|---|
| $\neg p$ | negação | "não $p$" | $p$ é falsa |
| $p \wedge q$ | conjunção | "$p$ e $q$" | as duas são verdadeiras |
| $p \vee q$ | disjunção | "$p$ ou $q$" | pelo menos uma é verdadeira |
| $p \Rightarrow q$ | condicional | "se $p$, então $q$" | não é o caso de $p$ V e $q$ F |
| $p \Leftrightarrow q$ | bicondicional | "$p$ se, e somente se, $q$" | $p$ e $q$ têm o mesmo valor |

> [!ATENÇÃO] O "ou" da matemática é **inclusivo**: "$p \vee q$" também é verdadeira quando $p$ e $q$ são ambas verdadeiras.

### Tabela-verdade da condicional

| $p$ | $q$ | $p \Rightarrow q$ |
|---|---|---|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

A condicional só é falsa quando a hipótese é verdadeira e a conclusão é falsa. "Se chover, levo guarda-chuva" só é quebrada se chover e eu **não** levar o guarda-chuva.

## 3. Implicação, recíproca e contrapositiva

Dada a condicional $p \Rightarrow q$:

| Nome | Forma | Equivale à original? |
|---|---|---|
| Recíproca | $q \Rightarrow p$ | **Não** necessariamente |
| Contrapositiva | $\neg q \Rightarrow \neg p$ | **Sim**, sempre |

**Exemplo.** "Se $f$ é derivável, então $f$ é contínua" é verdadeira. A recíproca, "se $f$ é contínua, então $f$ é derivável", é **falsa** ($|x|$ em $0$). A contrapositiva, "se $f$ não é contínua, então não é derivável", é verdadeira.

> [!DICA] Muitos exercícios de prova pedem para "mostrar que" algo **não** acontece. A contrapositiva e o **contraexemplo** são suas ferramentas: para derrubar "para todo $x$, ..." basta **um** $x$ que falhe.

### Condição necessária e suficiente

Em $p \Rightarrow q$, dizemos que $p$ é **suficiente** para $q$ e que $q$ é **necessária** para $p$. "Ser derivável é suficiente para ser contínua; ser contínua é necessário para ser derivável." Quando vale $p \Leftrightarrow q$, $p$ é **necessária e suficiente** para $q$.

## 4. Quantificadores

| Símbolo | Lê-se | Exemplo |
|---|---|---|
| $\forall$ | "para todo" | $\forall x \in \mathbb{R},\ x^2 \geq 0$ |
| $\exists$ | "existe" | $\exists x \in \mathbb{R},\ x^2 = 2$ |
| $\exists!$ | "existe um único" | $\exists!\, x \in \mathbb{R},\ 2x = 6$ |

**A ordem importa.** "$\forall x\ \exists y,\ y > x$" (para todo número existe um maior) é verdadeira. "$\exists y\ \forall x,\ y > x$" (existe um número maior que todos) é falsa.

## 5. Negação: o ponto que mais cai

$$\neg(p \wedge q) \equiv \neg p \vee \neg q \qquad \neg(p \vee q) \equiv \neg p \wedge \neg q$$

$$\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x) \qquad \neg(\exists x,\ P(x)) \equiv \forall x,\ \neg P(x)$$

$$\neg(p \Rightarrow q) \equiv p \wedge \neg q$$

**Exemplo.** A negação de "todo aluno estudou" **não** é "nenhum aluno estudou", e sim "**existe** aluno que não estudou".

**Exemplo.** A negação de "$\forall x > 0,\ x^2 > x$" é "$\exists x > 0,\ x^2 \leq x$" (e é verdadeira: $x = \frac12$).

> [!ATENÇÃO] A negação de "$x > 3$" é "$x \leq 3$", e não "$x < 3$". O caso de igualdade muda de lado.

## 6. Como se lê uma definição de Cálculo

Com essas peças você já consegue ler a definição formal de limite, que assusta muitos alunos:

$$\forall \varepsilon > 0,\ \exists \delta > 0 \ \text{ tal que } \ 0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon.$$

"Para **qualquer** tolerância $\varepsilon$ que você escolher, **existe** uma distância $\delta$ tal que, **se** $x$ estiver a menos de $\delta$ de $a$, **então** $f(x)$ estará a menos de $\varepsilon$ de $L$."

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual das frases é uma proposição?
+ $15$ é divisível por $4$.
- $x + 1 = 5$
- Resolva a equação.
- Que horas são?
> É uma afirmação com valor-verdade definido (no caso, falsa). As outras são sentença aberta, ordem e pergunta.

? Quando $p \Rightarrow q$ é falsa?
- Quando $p$ é falsa
+ Quando $p$ é verdadeira e $q$ é falsa
- Quando $q$ é verdadeira
- Quando $p$ e $q$ são falsas
> A condicional só falha se a hipótese vale e a conclusão não.

? Qual é a **contrapositiva** de "se $n$ é par, então $n^2$ é par"?
- Se $n^2$ é par, então $n$ é par.
- Se $n$ é ímpar, então $n^2$ é ímpar.
+ Se $n^2$ é ímpar, então $n$ é ímpar.
- $n$ é par e $n^2$ é ímpar.
> A contrapositiva de $p \Rightarrow q$ é $\neg q \Rightarrow \neg p$, e sempre equivale à original. A primeira opção é a recíproca; a segunda é a inversa; a última é a negação.

? A negação de "todos os alunos passaram" é:
- Nenhum aluno passou.
+ Algum aluno não passou.
- Todos os alunos reprovaram.
- Algum aluno passou.
> $\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x)$.

? A negação de "$x > 2$ e $y \leq 5$" é:
- $x < 2$ e $y > 5$
+ $x \leq 2$ ou $y > 5$
- $x \leq 2$ e $y > 5$
- $x < 2$ ou $y \geq 5$
> De Morgan troca "e" por "ou", e a negação de $>$ é $\leq$.
```

## 7. Exercícios

**1.** Escreva a negação de "existe um número real $x$ tal que $x^2 < 0$". Ela é verdadeira?

<details>
<summary>Ver solução</summary>

"Para todo $x \in \mathbb{R}$, $x^2 \geq 0$." É verdadeira.

</details>

**2.** A afirmação "se $x^2 = 4$, então $x = 2$" é verdadeira? Justifique.

<details>
<summary>Ver solução</summary>

Falsa. Contraexemplo: $x = -2$ satisfaz a hipótese ($x^2 = 4$), mas não a conclusão.

</details>

**3.** Escreva a recíproca e a contrapositiva de "se um número termina em $0$, então é divisível por $5$". Quais são verdadeiras?

<details>
<summary>Ver solução</summary>

Recíproca: "se é divisível por $5$, então termina em $0$". É falsa: $15$. Contrapositiva: "se não é divisível por $5$, então não termina em $0$". É verdadeira, pois equivale à original, que é verdadeira.

</details>

**4.** "$x > 1$" é condição necessária, suficiente ou necessária e suficiente para "$x^2 > 1$"?

<details>
<summary>Ver solução</summary>

Suficiente, mas não necessária. Se $x>1$ então $x^2>1$; mas $x = -2$ tem $x^2>1$ sem ter $x>1$.

</details>
