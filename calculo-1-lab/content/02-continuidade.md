# Continuidade

Intuitivamente, uma função é contínua se você consegue desenhar o gráfico **sem tirar o lápis do papel**. Matematicamente, isso é uma afirmação sobre limites.

## 1. Definição

> [!DEFINIÇÃO] Uma função $f$ é **contínua em $a$** se as três condições valem:
>
> 1. $f(a)$ existe;
> 2. $\displaystyle\lim_{x \to a} f(x)$ existe;
> 3. $\displaystyle\lim_{x \to a} f(x) = f(a)$.

Se alguma falha, $f$ é **descontínua** em $a$. Uma função é contínua em um intervalo se for contínua em todos os pontos dele.

**Boa notícia:** polinômios, funções racionais (onde o denominador não zera), $\sin$, $\cos$, $e^x$, $\ln x$ (para $x>0$) e $\sqrt{x}$ (para $x \geq 0$) são contínuas em todo o seu domínio. Somas, produtos, quocientes (com denominador não nulo) e compostas de funções contínuas também são contínuas.

Por isso, para essas funções, **calcular o limite é só substituir**.

## 2. Tipos de descontinuidade

| Tipo | O que acontece | Exemplo |
|---|---|---|
| **Removível** | O limite existe, mas $f(a)$ não existe ou é diferente | $\dfrac{x^2-4}{x-2}$ em $x=2$ |
| **Salto** | Os limites laterais existem, mas são diferentes | $\dfrac{\lvert x\rvert}{x}$ em $x=0$ |
| **Infinita** | Pelo menos um limite lateral é infinito | $\dfrac1x$ em $x=0$ |

A descontinuidade **removível** pode ser "consertada" redefinindo $f(a) = L$.

**Exemplo.** Qual valor de $k$ torna $f$ contínua em $x = 2$?

$$f(x) = \begin{cases} \dfrac{x^2 - 4}{x - 2}, & x \neq 2 \\[2mm] k, & x = 2 \end{cases}$$

Como $\lim_{x \to 2} f(x) = 4$, basta tomar $k = 4$.

## 3. Continuidade lateral e funções por partes

Em funções definidas por partes, a emenda é o ponto crítico: calcule **os dois limites laterais** na emenda e compare com o valor da função.

**Exemplo.** Para que $f$ seja contínua em $x = 1$, determine $a$:

$$f(x) = \begin{cases} x^2 + a, & x < 1 \\ 3x - 1, & x \geq 1 \end{cases}$$

Pela esquerda, o limite é $1 + a$. Pela direita (e em $f(1)$), é $2$. Igualando, $1 + a = 2$, logo $a = 1$.

## 4. Teorema do Valor Intermediário (TVI)

> [!TEOREMA] **(TVI)** Se $f$ é contínua em $[a, b]$ e $N$ é qualquer valor entre $f(a)$ e $f(b)$, então existe pelo menos um $c \in [a, b]$ tal que $f(c) = N$.

*Intuição:* para ir de uma altura a outra sem "pular", a função precisa passar por todas as alturas intermediárias.

O uso mais comum é **provar que uma equação tem solução**: se $f$ é contínua e $f(a)$ e $f(b)$ têm **sinais opostos**, então existe uma raiz entre $a$ e $b$.

**Exemplo.** Mostre que $x^3 + x - 1 = 0$ tem uma raiz em $(0, 1)$.

Seja $f(x) = x^3 + x - 1$, contínua por ser polinômio. Temos $f(0) = -1 < 0$ e $f(1) = 1 > 0$. Pelo TVI, existe $c \in (0,1)$ com $f(c) = 0$.

> [!ATENÇÃO] O TVI **exige continuidade no intervalo fechado**. Sem ela, a conclusão pode falhar: $f(x) = 1/x$ vale $-1$ em $x=-1$ e $1$ em $x=1$, mas nunca vale $0$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual destas condições NÃO é exigida para $f$ ser contínua em $a$?
- $f(a)$ existir
- $\displaystyle\lim_{x\to a}f(x)$ existir
- $\displaystyle\lim_{x\to a}f(x)=f(a)$
+ $f$ ser derivável em $a$
> Derivabilidade é mais forte que continuidade: $|x|$ é contínua em $0$, mas não derivável.

? A descontinuidade de $f(x)=\dfrac{x^2-1}{x-1}$ em $x=1$ é:
+ removível
- de salto
- infinita
- não há descontinuidade
> O limite existe (vale $2$), mas $f(1)$ não existe: basta definir $f(1)=2$.

? A descontinuidade de $f(x)=\dfrac{1}{x-2}$ em $x=2$ é:
- removível
- de salto
+ infinita
- não há descontinuidade
> Perto de $2$, $f$ vai a $\pm\infty$: assíntota vertical.

? O Teorema do Valor Intermediário garante uma raiz de $f$ em $[a,b]$ quando:
+ $f$ é contínua em $[a,b]$ e $f(a)$, $f(b)$ têm sinais opostos
- $f(a)=f(b)$
- $f$ é derivável em algum ponto de $(a,b)$
- $f(a)>0$ e $f(b)>0$
> Contínua e trocando de sinal, $f$ precisa passar pelo zero.
```

## 5. Exercícios

**1.** Classifique a descontinuidade de $f(x) = \dfrac{x^2 - 1}{x - 1}$ em $x = 1$.

<details>
<summary>Ver solução</summary>

Fatorando, $f(x) = x + 1$ para $x \neq 1$, então o limite é $2$, mas $f(1)$ não existe. A descontinuidade é **removível**.

</details>

**2.** Determine $k$ para que $f$ seja contínua em $x=0$, com $f(x) = \dfrac{\sin 4x}{x}$ para $x \neq 0$ e $f(0) = k$.

<details>
<summary>Ver solução</summary>

$\displaystyle\lim_{x\to0}\frac{\sin 4x}{x} = 4\lim_{x\to0}\frac{\sin 4x}{4x} = 4$. Logo, $k = 4$.

</details>

**3.** Mostre que $\cos x = x$ tem solução em $(0, 1)$.

<details>
<summary>Ver solução</summary>

Seja $g(x) = \cos x - x$, contínua. Então $g(0) = 1 > 0$ e $g(1) = \cos 1 - 1 < 0$. Pelo TVI, existe $c \in (0,1)$ com $g(c) = 0$, ou seja, $\cos c = c$.

</details>

**4.** Para que valores de $a$ e $b$ a função é contínua em $\mathbb{R}$?

$$f(x) = \begin{cases} 2x + a, & x < 0 \\ 3, & x = 0 \\ x^2 + b, & x > 0 \end{cases}$$

<details>
<summary>Ver solução</summary>

Em $x = 0$: o limite pela esquerda é $a$, pela direita é $b$, e $f(0)=3$. Precisamos $a = b = 3$.

</details>
