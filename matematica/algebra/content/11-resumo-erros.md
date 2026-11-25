# Resumo e os 20 erros mais comuns

Este capítulo é para consultar antes de provas e sempre que uma conta "não fechar". A primeira parte resume as regras; a segunda lista os erros que mais derrubam alunos de Cálculo, todos com o teste rápido para pegá-los.

> [!DICA] O melhor detector de erro algébrico é **testar com um número**. Se você transformou $A$ em $B$, escolha $x = 2$ (evite $0$ e $1$, que escondem erros) e veja se $A$ e $B$ dão o mesmo valor.

## 1. Resumo de regras

**Sinais.** Iguais dão $+$, diferentes dão $-$ (só na multiplicação e na divisão). Ordem: parênteses, potências, multiplicação e divisão, soma e subtração.

**Frações.**
$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd} \qquad \frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd} \qquad \frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}$$

**Potências.**
$$a^m a^n = a^{m+n} \quad \frac{a^m}{a^n} = a^{m-n} \quad (a^m)^n = a^{mn} \quad a^0 = 1 \quad a^{-n} = \frac{1}{a^n} \quad a^{m/n} = \sqrt[n]{a^m}$$

**Produtos notáveis.**
$$(a \pm b)^2 = a^2 \pm 2ab + b^2 \qquad (a + b)(a - b) = a^2 - b^2$$

**Equação do 2º grau.**
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \qquad x_1 + x_2 = -\frac{b}{a} \qquad x_1 x_2 = \frac{c}{a}$$

**Proporção e porcentagem.** $\frac{a}{b} = \frac{c}{d} \iff ad = bc$. Aumento de $p\%$: multiplique por $1 + \frac{p}{100}$; desconto: por $1 - \frac{p}{100}$.

## 2. Os 20 erros mais comuns

| # | Errado | Certo | Teste ou motivo |
|---|---|---|---|
| 1 | $-3^2 = 9$ | $-3^2 = -9$ | A potência vem antes do sinal |
| 2 | $-2(x - 3) = -2x - 6$ | $-2x + 6$ | O $-2$ multiplica o $-3$ também |
| 3 | $-(a - b) = -a - b$ | $-a + b$ | O menos troca **todos** os sinais |
| 4 | $2 + 3 \cdot 4 = 20$ | $14$ | Multiplicação antes da soma |
| 5 | $\frac{a}{b} + \frac{c}{d} = \frac{a + c}{b + d}$ | $\frac{ad + bc}{bd}$ | $\frac12 + \frac12 \neq \frac24$ |
| 6 | $\frac{x + 3}{x} = 3$ | $1 + \frac{3}{x}$ | Só se cancelam fatores |
| 7 | $\frac{a}{b + c} = \frac{a}{b} + \frac{a}{c}$ | não se separa | $\frac{2}{1 + 1} = 1 \neq 4$ |
| 8 | $\frac{a + b}{c} \neq \frac{a}{c} + \frac{b}{c}$ | são **iguais** | Separar o numerador é permitido |
| 9 | $(a + b)^2 = a^2 + b^2$ | $a^2 + 2ab + b^2$ | $(1 + 1)^2 = 4 \neq 2$ |
| 10 | $\sqrt{a + b} = \sqrt{a} + \sqrt{b}$ | não se separa | $\sqrt{9 + 16} = 5 \neq 7$ |
| 11 | $\sqrt{x^2} = x$ | $\lvert x \rvert$ | $\sqrt{(-3)^2} = 3$ |
| 12 | $x^2 = 9 \Rightarrow x = 3$ | $x = \pm 3$ | $(-3)^2 = 9$ também |
| 13 | $2^3 \cdot 2^4 = 2^{12}$ | $2^7$ | Produto de mesma base **soma** expoentes |
| 14 | $(2x)^3 = 2x^3$ | $8x^3$ | O expoente vale para o $2$ também |
| 15 | $x^{-2} = -x^2$ | $\frac{1}{x^2}$ | Expoente negativo inverte, não troca sinal |
| 16 | $x + x = x^2$ | $2x$ | $x \cdot x$ é que dá $x^2$ |
| 17 | $x^2 = 3x \Rightarrow x = 3$ | $x = 0$ ou $x = 3$ | Dividir por $x$ perde $x = 0$ |
| 18 | $-2x < 6 \Rightarrow x < -3$ | $x > -3$ | Dividir por negativo inverte a desigualdade |
| 19 | $+10\%$ e $-10\%$ volta ao início | fica $-1\%$ | $1{,}1 \cdot 0{,}9 = 0{,}99$ |
| 20 | $\frac{x}{2} - \frac{x - 1}{3}$, com MMC: $3x - 2x - 1$ | $3x - 2x + 2$ | O menos atinge o numerador inteiro: $-2(x - 1)$ |

> [!ATENÇÃO] O erro 8 é um "falso erro": muita gente tem medo de separar $\frac{a + b}{c}$ e acaba travando. Separar o **numerador** pode; separar o **denominador** (erro 7) não pode.

## 3. Checklist antes de entregar

1. Substituí números negativos **entre parênteses**?
2. Distribuí o sinal de menos em **todos** os termos?
3. Cancelei só **fatores** (nunca parcelas)?
4. Na equação, **verifiquei** a resposta na equação original?
5. Na equação do 2º grau, considerei **as duas** raízes (e descartei as que não fazem sentido)?
6. A resposta tem **unidade** e faz sentido no contexto?

## 4. Próximos passos

- Pratique no [Treino infinito](#/lab/treino) misturando todos os temas, até manter uma sequência de 15 acertos.
- Siga para o livro **Fundamentos**: conjuntos, intervalos, inequações e módulo.
- Consulte o **Glossário** sempre que um símbolo travar a leitura.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual destas transformações está **correta**?
- $\dfrac{x + 4}{4} = x$
+ $\dfrac{x + 4}{4} = \dfrac{x}{4} + 1$
- $\dfrac{4}{x + 4} = \dfrac{4}{x} + 1$
- $\dfrac{x + 4}{4} = x + 1$
> Separar o numerador é permitido; cada parcela é dividida por $4$.

? $(3x)^2$ é igual a:
- $3x^2$
- $6x^2$
+ $9x^2$
- $6x$
> O expoente vale para o $3$ e para o $x$.

? Qual o melhor valor para testar se $(x + 1)^2 = x^2 + 1$?
- $x = 0$
- $x = 1$ ou $x = 0$, tanto faz
+ $x = 2$
- não dá para testar com números
> Com $x = 0$ os dois lados dão $1$ e o erro fica escondido. Com $x = 2$: $9 \neq 5$.

? Ao resolver $x^2 = 5x$, as soluções são:
- só $x = 5$
+ $x = 0$ e $x = 5$
- $x = \pm 5$
- $x = \pm\sqrt{5}$
> $x(x - 5) = 0$. Dividir por $x$ perderia o zero.

? $-(2x - 3y + 1)$ é igual a:
- $-2x - 3y - 1$
+ $-2x + 3y - 1$
- $-2x + 3y + 1$
- $2x - 3y + 1$
> O menos troca o sinal de cada termo.
```

## 5. Exercícios de revisão geral

**1.** Calcule $\dfrac{2^{-1} + 3^{-1}}{(-2)^2 - 3}$.

<details>
<summary>Ver solução</summary>

Numerador: $\frac12 + \frac13 = \frac56$. Denominador: $4 - 3 = 1$. Resultado: $\frac56$.

</details>

**2.** Simplifique $\dfrac{x^2 - 1}{x^2 + 2x + 1}$.

<details>
<summary>Ver solução</summary>

$\frac{(x + 1)(x - 1)}{(x + 1)^2} = \frac{x - 1}{x + 1}$, para $x \neq -1$.

</details>

**3.** Resolva $\dfrac{x}{x - 2} = \dfrac{3}{x - 2} + 1$ e explique o que acontece.

<details>
<summary>Ver solução</summary>

Multiplicando por $x - 2$: $x = 3 + x - 2$, ou seja, $0 = 1$. Nenhuma solução.

</details>

**4.** Resolva $\begin{cases} x + y = 7 \\ xy = 12 \end{cases}$.

<details>
<summary>Ver solução</summary>

São dois números com soma $7$ e produto $12$: raízes de $t^2 - 7t + 12 = 0$, que são $3$ e $4$. Soluções: $(3, 4)$ e $(4, 3)$.

</details>

**5.** Um produto subiu $30\%$ e depois teve desconto de $30\%$. Qual a variação total?

<details>
<summary>Ver solução</summary>

$1{,}3 \cdot 0{,}7 = 0{,}91$: queda de $9\%$.

</details>
