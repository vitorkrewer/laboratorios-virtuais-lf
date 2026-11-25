# Resumo, teorema das equivalências e erros comuns

Este capítulo é para consultar antes de provas. Ele junta as fórmulas do livro, o teorema que conecta todos os capítulos e os erros que mais aparecem em Álgebra Linear.

## 1. Fórmulas essenciais

**Vetores.**
$$\|\vec v\| = \sqrt{\vec v \cdot \vec v} \qquad \vec u \cdot \vec v = \|\vec u\|\|\vec v\|\cos\theta \qquad \text{proj}_{\vec v}\vec u = \frac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\vec v$$

**Matrizes.**
$$(AB)^T = B^TA^T \qquad (AB)^{-1} = B^{-1}A^{-1} \qquad \begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

**Determinantes.**
$$\det(AB) = \det A\det B \qquad \det(A^{-1}) = \frac{1}{\det A} \qquad \det(kA) = k^n\det A \qquad \det A^T = \det A$$

**Posto.** $\text{posto}(A) + \dim N(A)$ é igual ao número de colunas.

**Autovalores.** $\det(A - \lambda I) = 0$; soma dos autovalores $= \text{tr}\,A$; produto $= \det A$; $A = PDP^{-1}$ e $A^k = PD^kP^{-1}$.

**Mínimos quadrados.** $A^TA\hat x = A^T\vec b$.

## 2. O teorema das equivalências

> [!TEOREMA] Para $A$ quadrada $n \times n$, são **equivalentes**:
> 1. $A$ é inversível;
> 2. $\det A \neq 0$;
> 3. $A\vec x = \vec b$ tem solução única para todo $\vec b$;
> 4. $A\vec x = \vec 0$ só tem a solução trivial, isto é, $N(A) = \{\vec 0\}$;
> 5. a forma escalonada reduzida de $A$ é $I$;
> 6. $\text{posto}(A) = n$;
> 7. as colunas (ou as linhas) de $A$ são LI;
> 8. as colunas de $A$ geram $\mathbb{R}^n$ e formam uma base;
> 9. a transformação $\vec x \mapsto A\vec x$ é injetora e sobrejetora;
> 10. $\lambda = 0$ **não** é autovalor de $A$.

> [!DICA] Na prova, este teorema é um atalho: se a questão pergunta se as colunas são LI, basta um determinante; se pergunta se a matriz é inversível, basta mostrar que o núcleo é trivial. Escolha o item mais fácil de verificar.

## 3. Como responder cada pergunta

| Pergunta | O que fazer |
|---|---|
| O sistema tem solução? | escalonar a aumentada e procurar linha $0 = b \neq 0$ |
| Os vetores são LI? | colunas, escalonar, pivô em todas? (ou $\det \neq 0$ se quadrada) |
| $\vec b$ está no espaço gerado? | resolver $A\vec c = \vec b$ com os vetores nas colunas |
| Base do núcleo? | solução geral de $A\vec x = \vec 0$, um vetor por variável livre |
| Base da imagem? | colunas **originais** nas posições dos pivôs |
| $W$ é subespaço? | $\vec 0 \in W$? fechado para soma e escalar? |
| Matriz de $T$? | colunas $= T(\vec e_1), \ldots, T(\vec e_n)$ |
| Autovalores? | raízes de $\det(A - \lambda I)$ |

## 4. Erros mais comuns

| # | Errado | Certo |
|---|---|---|
| 1 | $AB = BA$ | em geral, **não** comuta |
| 2 | $(A + B)^2 = A^2 + 2AB + B^2$ | $A^2 + AB + BA + B^2$ |
| 3 | $(AB)^{-1} = A^{-1}B^{-1}$ | $B^{-1}A^{-1}$ |
| 4 | $(AB)^T = A^TB^T$ | $B^TA^T$ |
| 5 | $\det(A + B) = \det A + \det B$ | não vale em geral |
| 6 | $\det(2A) = 2\det A$ | $2^n\det A$ |
| 7 | $AB = AC \Rightarrow B = C$ | só se $A$ for inversível |
| 8 | $AB = O \Rightarrow A = O$ ou $B = O$ | pode ser $A \neq O$ e $B \neq O$ |
| 9 | base da imagem com colunas da escalonada | colunas **originais** de $A$ |
| 10 | Sarrus para $4 \times 4$ | Sarrus é só $3 \times 3$ |
| 11 | $\vec 0$ pode ser autovetor | autovetor é sempre **não nulo** |
| 12 | multiplicar uma linha por $0$ "para simplificar" | operação proibida |
| 13 | reta $y = x + 1$ é subespaço | não passa por $\vec 0$ |
| 14 | 3 vetores sem múltiplos entre si são LI | podem ser LD (um é soma dos outros) |
| 15 | $\vec u \cdot \vec v$ é um vetor | é um **número** |
| 16 | $A^{-1}$ = inverter cada entrada | use $ad - bc$ ou Gauss-Jordan |

> [!ATENÇÃO] Quase todos os erros da tabela vêm de tratar matrizes como números. Matrizes **não comutam**, **não se dividem** e **não se cancelam** livremente. Na dúvida, teste com duas matrizes $2 \times 2$ simples.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Uma matriz $4 \times 4$ tem colunas LD. Então:
- $\det A \neq 0$
+ $A$ não é inversível
- $A\vec x = \vec b$ sempre tem solução única
- o posto é $4$
> Pelo teorema das equivalências, todas as condições falham juntas.

? $\det(3A)$ para $A$ de ordem $2$ com $\det A = 5$:
- $15$
+ $45$
- $135$
- $8$
> $3^2 \cdot 5$.

? Se $AB = AC$ e $A$ é inversível, então:
+ $B = C$
- nada se pode concluir
- $A = I$
- $B = C^{-1}$
> Multiplique à esquerda por $A^{-1}$.

? O que **não** é equivalente a "$A$ é inversível" ($A$ quadrada)?
- $N(A) = \{\vec 0\}$
- $0$ não é autovalor
+ $A$ é diagonalizável
- as linhas de $A$ são LI
> Há matrizes diagonalizáveis não inversíveis (com $\lambda = 0$) e inversíveis não diagonalizáveis (cisalhamento).

? Para achar uma base do núcleo de $A$:
- pegamos as colunas com pivô
+ escrevemos a solução geral de $A\vec x = \vec 0$ e separamos por variável livre
- calculamos $\det A$
- transpomos $A$
> Um vetor da base para cada variável livre.
```

## 5. Próximos passos

- Pratique nos três simuladores do livro até as manobras ficarem automáticas.
- Consulte o **Glossário** sempre que um símbolo travar a leitura (há uma categoria só de Álgebra Linear).
- No **Cálculo II**, a Álgebra Linear volta em derivadas de várias variáveis (a matriz jacobiana) e na classificação de pontos críticos (autovalores da hessiana).
