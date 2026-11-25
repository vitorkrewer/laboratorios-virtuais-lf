# Resumo, notação e erros comuns

Página de consulta rápida para revisar o livro inteiro e para ter à mão nos primeiros capítulos de Cálculo.

## Símbolos

| Símbolo | Lê-se | Símbolo | Lê-se |
|---|---|---|---|
| $\in$ | pertence | $\notin$ | não pertence |
| $\subset$ | está contido | $\supset$ | contém |
| $\cup$ | união | $\cap$ | interseção |
| $A - B$ | diferença | $A^c$ | complementar |
| $\varnothing$ | conjunto vazio | $\mathcal{P}(A)$ | conjunto das partes |
| $\forall$ | para todo | $\exists$ | existe |
| $\Rightarrow$ | implica | $\Leftrightarrow$ | se, e somente se |
| $\neg p$ | não $p$ | $\mid$ | tal que |
| $\wedge$ | e | $\vee$ | ou |
| $A \times B$ | produto cartesiano | $\lvert x\rvert$ | módulo de $x$ |

## Lógica

$$\neg(\forall x,\ P) \equiv \exists x,\ \neg P \qquad \neg(\exists x,\ P) \equiv \forall x,\ \neg P \qquad (p \Rightarrow q) \equiv (\neg q \Rightarrow \neg p)$$

## Conjuntos

$$n(A \cup B) = n(A) + n(B) - n(A \cap B) \qquad n(\mathcal{P}(A)) = 2^{n(A)} \qquad n(A\times B) = n(A)\,n(B)$$

$$(A\cup B)^c = A^c \cap B^c \qquad (A\cap B)^c = A^c \cup B^c \qquad A - B = A \cap B^c$$

## Números

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \qquad \mathbb{Q} \cap (\mathbb{R} - \mathbb{Q}) = \varnothing$$

## Inequações e módulo

| Situação | Solução |
|---|---|
| $ax^2+bx+c$, $a > 0$, raízes $x_1 < x_2$ | negativo em $(x_1, x_2)$, positivo fora |
| $\Delta < 0$ | sinal constante, igual ao de $a$ |
| $\lvert u\rvert < r$ ($r>0$) | $-r < u < r$ |
| $\lvert u\rvert > r$ ($r>0$) | $u < -r$ ou $u > r$ |
| $\lvert x - a\rvert < r$ | $(a - r,\ a + r)$ |
| quociente $\frac{P}{Q} \ge 0$ | zeros de $P$ entram; zeros de $Q$ nunca |

## Erros comuns

> [!ATENÇÃO] **Confundir $\in$ com $\subset$.** $2 \in \{1,2\}$, mas $\{2\} \subset \{1,2\}$.

> [!ATENÇÃO] **Negar "todo" com "nenhum".** A negação de "todo $x$ satisfaz $P$" é "existe $x$ que não satisfaz $P$".

> [!ATENÇÃO] **Esquecer de inverter a desigualdade** ao multiplicar ou dividir por número negativo.

> [!ATENÇÃO] **Fechar o intervalo no infinito.** O correto é $[a, +\infty)$.

> [!ATENÇÃO] **"Tirar raiz" de inequação.** $x^2 < 4$ é $-2 < x < 2$, e não $x < 2$.

> [!ATENÇÃO] **Multiplicar por expressão de sinal desconhecido.** Em $\frac{1}{x} < 2$, use o quadro de sinais.

> [!ATENÇÃO] **Incluir zero do denominador.** Em $\frac{P}{Q} \ge 0$, os pontos onde $Q = 0$ nunca entram.

> [!ATENÇÃO] **Escrever $\sqrt{x^2} = x$.** O correto é $\sqrt{x^2} = |x|$.

> [!ATENÇÃO] **Contar a interseção duas vezes** em problemas com diagrama de Venn. Preencha de dentro para fora.

## Próximo passo

Com este livro, você tem a linguagem e as ferramentas que o Cálculo pressupõe. O próximo livro do ecossistema é [Funções](../funcoes/). Se a prova de Cálculo está perto, vá direto para o [Cálculo I](../calculo-1/) e volte aqui sempre que travar em domínio, intervalo, inequação ou módulo.
