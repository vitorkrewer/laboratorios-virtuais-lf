# Probabilidade condicional e independência

Informação muda probabilidades. A chance de chover hoje é uma; sabendo que o céu está carregado, é outra. A probabilidade condicional formaliza essa atualização e leva às duas ferramentas mais usadas em problemas: a **regra do produto** e a **árvore de probabilidades**.

## 1. Probabilidade condicional

> [!DEFINIÇÃO] A probabilidade de $A$ **dado que** $B$ ocorreu (com $P(B) > 0$) é
> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}.$$

> [!INTUIÇÃO] Saber que $B$ ocorreu **encolhe o espaço amostral** para $B$. Dentro desse novo mundo, a pergunta é: que fração de $B$ também é $A$?

**Exemplo.** Um dado deu número par. Qual a chance de ser maior que 3? Dentro de $\{2, 4, 6\}$, os maiores que 3 são $\{4, 6\}$: $P = \frac23$. Pela fórmula: $\frac{P(\{4,6\})}{P(\{2,4,6\})} = \frac{2/6}{3/6} = \frac23$.

**Exemplo com tabela.** 200 alunos:

| | Aprovado | Reprovado | Total |
|---|---|---|---|
| Estudou | 90 | 10 | 100 |
| Não estudou | 40 | 60 | 100 |
| Total | 130 | 70 | 200 |

$P(\text{aprovado} \mid \text{estudou}) = \frac{90}{100} = 0{,}9$, mas $P(\text{estudou} \mid \text{aprovado}) = \frac{90}{130} \approx 0{,}69$.

> [!ATENÇÃO] $P(A \mid B) \neq P(B \mid A)$ em geral. Confundir as duas é o erro mais comum (e mais perigoso) da probabilidade, chamado **falácia do condicional transposto**. O capítulo 6 mostra como passar de uma para a outra.

## 2. Regra do produto

Isolando na definição:

$$P(A \cap B) = P(B)\,P(A \mid B) = P(A)\,P(B \mid A)$$

**Exemplo.** Urna com 5 vermelhas e 3 azuis; tiram-se duas, sem reposição. $P(\text{1ª V e 2ª V}) = \frac58 \cdot \frac47 = \frac{20}{56} = \frac{5}{14}$ (o mesmo resultado do capítulo anterior, agora sem combinações).

## 3. Independência

> [!DEFINIÇÃO] $A$ e $B$ são **independentes** se saber de um não muda a probabilidade do outro: $P(A \mid B) = P(A)$. Equivalentemente:
> $$P(A \cap B) = P(A) \cdot P(B).$$

- Lançamentos de moeda ou dado são independentes entre si.
- Retiradas **com reposição** são independentes; **sem reposição**, não.

> [!ATENÇÃO] Independentes **não** é o mesmo que mutuamente exclusivos. Se $A$ e $B$ são exclusivos (e têm probabilidade positiva), saber que $A$ ocorreu garante que $B$ **não** ocorreu: eles são fortemente **dependentes**.

> [!ATENÇÃO] **Falácia do jogador**: depois de 5 caras seguidas, a 6ª jogada continua tendo probabilidade $\frac12$ de dar cara. A moeda não tem memória.

## 4. Árvore de probabilidades e probabilidade total

Para experimentos em etapas, desenhe uma árvore: em cada ramo escreva a probabilidade **condicional** daquela etapa. A probabilidade de um caminho é o **produto** ao longo dele; a de um evento é a **soma** dos caminhos que levam a ele.

> [!TEOREMA] **(Probabilidade total)** Se $B_1, \ldots, B_k$ dividem $\Omega$ em casos exclusivos que cobrem tudo:
> $$P(A) = P(B_1)P(A \mid B_1) + \cdots + P(B_k)P(A \mid B_k).$$

**Exemplo.** Uma fábrica tem duas máquinas. A máquina 1 faz 60% das peças, com 2% de defeito; a 2 faz 40%, com 5% de defeito.

$$P(\text{defeito}) = 0{,}6 \cdot 0{,}02 + 0{,}4 \cdot 0{,}05 = 0{,}012 + 0{,}020 = 0{,}032$$

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $P(A \cap B) = 0{,}12$ e $P(B) = 0{,}4$. Então $P(A \mid B)$ é:
- $0{,}048$
+ $0{,}3$
- $0{,}52$
- $0{,}12$
> $\frac{0{,}12}{0{,}4}$.

? $A$ e $B$ são independentes com $P(A) = 0{,}5$ e $P(B) = 0{,}2$. Então $P(A \cap B)$ é:
+ $0{,}1$
- $0{,}7$
- $0{,}3$
- $0$
> Produto das probabilidades.

? Uma moeda honesta deu 6 caras seguidas. A probabilidade de cara na próxima é:
- menor que $\frac12$
+ $\frac12$
- maior que $\frac12$
- $\frac{1}{128}$
> Lançamentos independentes: a moeda não tem memória.

? Dois eventos mutuamente exclusivos, ambos com probabilidade positiva, são:
- independentes
+ dependentes
- complementares sempre
- impossíveis
> Se um ocorre, o outro com certeza não ocorre.

? Tirando 2 cartas de um baralho **sem reposição**, a probabilidade de dois ases é:
- $\frac{4}{52} \cdot \frac{4}{52}$
+ $\frac{4}{52} \cdot \frac{3}{51}$
- $\frac{8}{52}$
- $\frac{4}{52} + \frac{3}{51}$
> Regra do produto com a condicional da 2ª retirada.
```

## 5. Exercícios

**1.** Na tabela da seção 1, calcule $P(\text{reprovado} \mid \text{não estudou})$ e $P(\text{não estudou} \mid \text{reprovado})$.

<details>
<summary>Ver solução</summary>

$\frac{60}{100} = 0{,}6$ e $\frac{60}{70} \approx 0{,}857$.

</details>

**2.** Um atirador acerta o alvo com probabilidade $0{,}8$, independentemente a cada tiro. Qual a probabilidade de acertar os 3 primeiros tiros? E de errar pelo menos um?

<details>
<summary>Ver solução</summary>

$0{,}8^3 = 0{,}512$; pelo menos um erro: $1 - 0{,}512 = 0{,}488$.

</details>

**3.** 30% dos e-mails são spam. Um filtro marca 95% dos spams e 2% dos e-mails normais. Qual a fração de e-mails marcados?

<details>
<summary>Ver solução</summary>

$0{,}3 \cdot 0{,}95 + 0{,}7 \cdot 0{,}02 = 0{,}285 + 0{,}014 = 0{,}299$.

</details>

**4.** Mostre que, num dado, os eventos "par" e "múltiplo de 3" são independentes.

<details>
<summary>Ver solução</summary>

$P(\text{par}) = \frac12$, $P(\text{mult. 3}) = \frac13$, $P(\text{ambos}) = P(\{6\}) = \frac16 = \frac12 \cdot \frac13$. ✓

</details>
