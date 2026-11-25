# Equações do 1º grau

Uma **equação** é uma igualdade com uma incógnita. Resolver é descobrir o valor que torna a igualdade verdadeira. A ideia central cabe em uma frase: **o que você faz de um lado, faz do outro**.

> [!DICA] Abra o simulador [Balança de equações](#/lab/balanca): você aplica as operações nos dois pratos e vê a balança ficar equilibrada até sobrar $x$ sozinho.

## 1. A balança

> [!INTUIÇÃO] Uma equação é uma balança em equilíbrio. Se você tira $3$ de um prato, precisa tirar $3$ do outro. Se dobra um lado, dobra o outro. O objetivo é deixar $x$ sozinho em um dos pratos.

> [!TEOREMA] **(Princípios de equivalência)** Somar (ou subtrair) o mesmo número dos dois lados, ou multiplicar (ou dividir) os dois lados pelo mesmo número **diferente de zero**, não muda as soluções.

**Exemplo.** $3x + 5 = 20$

$$3x + 5 - 5 = 20 - 5 \;\Rightarrow\; 3x = 15 \;\Rightarrow\; \frac{3x}{3} = \frac{15}{3} \;\Rightarrow\; x = 5$$

**Verificação:** $3 \cdot 5 + 5 = 20$. ✓

> [!DICA] O famoso "passa para o outro lado com o sinal trocado" é só um atalho desses princípios: somar passa subtraindo, multiplicar passa dividindo. Se um dia o atalho confundir, volte à balança.

## 2. Roteiro

1. Elimine parênteses (distributiva).
2. Elimine denominadores (multiplique tudo pelo MMC).
3. Junte os termos com $x$ de um lado e os números do outro.
4. Reduza os termos semelhantes.
5. Divida pelo coeficiente de $x$.
6. **Verifique** substituindo na equação original.

**Exemplo com parênteses.** $2(x - 3) = 5x + 9$

$$2x - 6 = 5x + 9 \;\Rightarrow\; 2x - 5x = 9 + 6 \;\Rightarrow\; -3x = 15 \;\Rightarrow\; x = -5$$

**Exemplo com frações.** $\dfrac{x}{2} + \dfrac{x - 1}{3} = 4$. Multiplique tudo por $6$:

$$3x + 2(x - 1) = 24 \;\Rightarrow\; 5x - 2 = 24 \;\Rightarrow\; x = \frac{26}{5}$$

> [!ATENÇÃO] Ao multiplicar pelo MMC, multiplique **todos** os termos, inclusive os que não têm fração. E o numerador $x - 1$ vira $2(x - 1)$, com parênteses.

## 3. Casos especiais

- $0x = 5$: **nenhuma** solução (conjunto vazio). Ex.: $2x + 1 = 2x + 6$.
- $0x = 0$: **infinitas** soluções (identidade). Ex.: $2(x + 1) = 2x + 2$.

## 4. Problemas

Traduza o texto para símbolos (capítulo 5), resolva e responda **com unidade**.

**Exemplo.** Um plano de celular cobra R\$ 30 fixos mais R\$ 0,50 por minuto. Uma conta deu R\$ 72. Quantos minutos foram usados?

$$30 + 0{,}5m = 72 \;\Rightarrow\; 0{,}5m = 42 \;\Rightarrow\; m = 84 \text{ minutos}$$

**Exemplo.** Pedro tem o triplo da idade do filho. Daqui a $10$ anos terá o dobro. Idades hoje?

Filho: $x$; Pedro: $3x$. Em 10 anos: $3x + 10 = 2(x + 10) \Rightarrow 3x + 10 = 2x + 20 \Rightarrow x = 10$. O filho tem $10$ anos e Pedro, $30$.

## 5. Isolar uma letra em fórmulas

O mesmo método vale para fórmulas com várias letras.

$$v = v_0 + at \;\Rightarrow\; t = \frac{v - v_0}{a} \qquad\qquad C = \frac{5(F - 32)}{9} \;\Rightarrow\; F = \frac{9C}{5} + 32$$

## 6. Inequações do 1º grau (um aviso)

Com $<$, $>$, $\le$, $\ge$ as regras são as mesmas, **com uma exceção**:

> [!ATENÇÃO] Ao multiplicar ou dividir por um número **negativo**, o sinal da desigualdade **inverte**. $-2x < 6 \Rightarrow x > -3$.

O assunto continua no livro **Fundamentos** (capítulo de inequações).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A solução de $4x - 7 = 13$ é:
- $x = \dfrac{3}{2}$
+ $x = 5$
- $x = 6$
- $x = -5$
> $4x = 20$, logo $x = 5$.

? A solução de $3(x + 2) = x - 4$ é:
+ $x = -5$
- $x = -1$
- $x = 5$
- $x = -3$
> $3x + 6 = x - 4 \Rightarrow 2x = -10$.

? A equação $\dfrac{x}{3} - 1 = \dfrac{x}{4}$ tem solução:
- $x = 7$
+ $x = 12$
- $x = 1$
- $x = -12$
> Multiplique por $12$: $4x - 12 = 3x$.

? Quantas soluções tem $5x - 2 = 5x + 3$?
+ nenhuma
- uma
- duas
- infinitas
> Sobra $0x = 5$, que é impossível.

? Resolvendo $-3x \ge 12$:
- $x \ge -4$
+ $x \le -4$
- $x \ge 4$
- $x \le 4$
> Dividir por $-3$ inverte o sinal.
```

## 7. Exercícios

**1.** Resolva $5 - 2(x - 1) = 3x - 8$.

<details>
<summary>Ver solução</summary>

$5 - 2x + 2 = 3x - 8 \Rightarrow 7 + 8 = 5x \Rightarrow x = 3$.

</details>

**2.** Resolva $\dfrac{2x - 1}{3} - \dfrac{x + 2}{2} = 1$.

<details>
<summary>Ver solução</summary>

MMC $6$: $2(2x - 1) - 3(x + 2) = 6 \Rightarrow 4x - 2 - 3x - 6 = 6 \Rightarrow x = 14$.

</details>

**3.** Uma corrida de táxi custa R\$ 5,50 de bandeirada mais R\$ 2,80 por km. Quantos km rende R\$ 61,50?

<details>
<summary>Ver solução</summary>

$5{,}5 + 2{,}8k = 61{,}5 \Rightarrow 2{,}8k = 56 \Rightarrow k = 20$ km.

</details>

**4.** Isole $r$ em $A = P(1 + rt)$.

<details>
<summary>Ver solução</summary>

$\frac{A}{P} = 1 + rt \Rightarrow rt = \frac{A}{P} - 1 \Rightarrow r = \frac{A - P}{Pt}$.

</details>

**5.** Um terreno retangular tem perímetro de $86$ m, e o comprimento tem $7$ m a mais que a largura. Quais as medidas?

<details>
<summary>Ver solução</summary>

$2x + 2(x + 7) = 86 \Rightarrow 4x = 72 \Rightarrow x = 18$. Largura $18$ m e comprimento $25$ m.

</details>
