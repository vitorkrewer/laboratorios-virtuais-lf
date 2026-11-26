# Análise combinatória: contar sem listar

Probabilidade, nos casos mais simples, é "casos favoráveis sobre casos possíveis". Mas quantas senhas de 6 dígitos existem? Quantas mãos de pôquer? Listar é impossível; é preciso **contar com método**. Quase tudo sai de uma única ideia, o princípio multiplicativo.

## 1. Princípio multiplicativo

> [!TEOREMA] Se uma decisão tem $m$ opções e, **para cada uma delas**, uma segunda decisão tem $n$ opções, então há $m \cdot n$ maneiras de tomar as duas decisões.

**Exemplos.**
- 3 camisas e 4 calças: $3 \cdot 4 = 12$ combinações de roupa.
- Placas com 3 letras e 4 algarismos: $26^3 \cdot 10^4 = 175\,760\,000$.
- Senhas de 4 dígitos **sem repetir**: $10 \cdot 9 \cdot 8 \cdot 7 = 5\,040$.

> [!DICA] Desenhe "tracinhos", um para cada posição, e escreva em cada um quantas opções restam naquele momento. Depois multiplique. Comece pela posição **mais restrita**.

**Exemplo com restrição.** Números de 3 algarismos distintos que são pares: comece pela unidade. Se ela for $0$: $9 \cdot 8 = 72$. Se for $2, 4, 6$ ou $8$ (4 opções): a centena não pode ser $0$ nem a unidade, $8$ opções; a dezena, $8$. Total $72 + 4 \cdot 8 \cdot 8 = 328$.

**Princípio aditivo:** quando os casos são **exclusivos** (um "ou" outro, sem sobreposição), somam-se, como acabamos de fazer.

## 2. Fatorial e permutações

$$n! = n \cdot (n - 1) \cdot (n - 2) \cdots 2 \cdot 1, \qquad 0! = 1$$

> [!DEFINIÇÃO] **Permutação**: o número de maneiras de **ordenar** $n$ objetos distintos é $P_n = n!$.

5 pessoas numa fila: $5! = 120$. As letras de AMOR: $4! = 24$ anagramas.

**Com repetição.** Anagramas de ARARA (3 A, 2 R): $\dfrac{5!}{3!\,2!} = 10$. Divide-se porque trocar dois A entre si não gera palavra nova.

## 3. Arranjos e combinações: a ordem importa?

Escolher $k$ objetos de um grupo de $n$:

> [!DEFINIÇÃO] 
> - **Arranjo** (a ordem **importa**): $A_{n,k} = \dfrac{n!}{(n - k)!}$.
> - **Combinação** (a ordem **não importa**): $C_{n,k} = \dbinom{n}{k} = \dfrac{n!}{k!\,(n - k)!}$.

**O teste:** troque a ordem de dois escolhidos. Mudou o resultado? Então é arranjo.

| Situação | Ordem importa? | Conta |
|---|---|---|
| Pódio (ouro, prata, bronze) entre 10 atletas | sim | $A_{10,3} = 720$ |
| Comissão de 3 pessoas entre 10 | não | $\binom{10}{3} = 120$ |
| Senha de 3 dígitos distintos | sim | $A_{10,3} = 720$ |
| Aposta de 6 números entre 60 | não | $\binom{60}{6} = 50\,063\,860$ |

> [!INTUIÇÃO] Cada comissão de 3 pessoas pode ser ordenada de $3! = 6$ maneiras. Por isso $\binom{10}{3} = \frac{720}{6} = 120$: a combinação é o arranjo dividido pelas ordens que não interessam.

> [!DICA] Simetria: $\binom{n}{k} = \binom{n}{n - k}$. Escolher os 3 que vão é o mesmo que escolher os 7 que ficam. E $\binom{n}{0} = \binom{n}{n} = 1$, $\binom{n}{1} = n$.

## 4. Triângulo de Pascal

Os números $\binom{n}{k}$ formam o triângulo de Pascal: cada número é a soma dos dois acima dele, $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$. Eles são os coeficientes de $(a + b)^n$ (binômio de Newton) e reaparecem na distribuição binomial (capítulo 8).

$$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4 \qquad (1, 4, 6, 4, 1)$$

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Quantas senhas de 3 dígitos (0 a 9), podendo repetir, existem?
- $30$
- $720$
+ $1\,000$
- $120$
> $10 \cdot 10 \cdot 10$.

? $\dfrac{6!}{4!}$ vale:
- $2$
- $1{,}5$
+ $30$
- $720$
> $6 \cdot 5 = 30$.

? De quantas maneiras escolher 2 representantes (sem cargos) numa turma de 8?
- $16$
+ $28$
- $56$
- $64$
> Ordem não importa: $\binom{8}{2} = \frac{8 \cdot 7}{2}$.

? E se os 2 forem presidente e vice?
- $28$
+ $56$
- $16$
- $64$
> Agora a ordem importa: $8 \cdot 7$.

? O número de anagramas de BANANA é:
- $720$
+ $60$
- $120$
- $36$
> $\frac{6!}{3!\,2!} = \frac{720}{12}$ (3 A, 2 N).
```

## 5. Exercícios

**1.** Quantos números de 4 algarismos distintos podem ser formados com $1, 2, 3, 4, 5$?

<details>
<summary>Ver solução</summary>

$5 \cdot 4 \cdot 3 \cdot 2 = 120$.

</details>

**2.** Uma turma tem 6 homens e 4 mulheres. Quantas comissões de 3 pessoas têm exatamente 1 mulher?

<details>
<summary>Ver solução</summary>

$\binom{4}{1}\binom{6}{2} = 4 \cdot 15 = 60$.

</details>

**3.** De quantas maneiras 5 pessoas podem sentar numa fila se Ana e Beto querem ficar juntos?

<details>
<summary>Ver solução</summary>

Trate o par como um bloco: $4!$ ordens dos blocos, vezes $2$ (ordem dentro do par) $= 48$.

</details>

**4.** Quantos jogos há num campeonato de 10 times em que todos jogam contra todos uma vez? E em turno e returno?

<details>
<summary>Ver solução</summary>

Uma vez: $\binom{10}{2} = 45$. Turno e returno (mandante importa): $A_{10,2} = 90$.

</details>
