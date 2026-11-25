# Sistemas de equações 2×2

Quando há **duas** incógnitas, uma equação só não basta: $x + y = 10$ tem infinitas soluções. Com **duas** equações, em geral, sobra um único par $(x, y)$ que satisfaz as duas ao mesmo tempo.

## 1. O que é a solução

$$\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}$$

A solução é o par $(x, y) = (7, 3)$: confira que $7 + 3 = 10$ e $7 - 3 = 4$. Dois métodos chegam lá sem tentativa e erro.

## 2. Método da substituição

1. Isole uma letra em uma das equações (escolha a mais fácil).
2. Substitua na **outra** equação: sobra uma equação com uma letra só.
3. Resolva e volte para achar a outra letra.

**Exemplo.**
$$\begin{cases} 2x + y = 11 \\ 3x - 2y = 6 \end{cases}$$

Da primeira, $y = 11 - 2x$. Na segunda:

$$3x - 2(11 - 2x) = 6 \;\Rightarrow\; 3x - 22 + 4x = 6 \;\Rightarrow\; 7x = 28 \;\Rightarrow\; x = 4$$

Então $y = 11 - 8 = 3$. Solução: $(4, 3)$.

## 3. Método da adição (eliminação)

1. Multiplique uma (ou as duas) equações para que uma letra tenha coeficientes **opostos**.
2. Some as equações: essa letra desaparece.
3. Resolva e volte para achar a outra.

**Mesmo exemplo.** Multiplique a primeira por $2$:

$$\begin{cases} 4x + 2y = 22 \\ 3x - 2y = 6 \end{cases} \;\xrightarrow{\text{somando}}\; 7x = 28 \;\Rightarrow\; x = 4$$

> [!DICA] Substituição é melhor quando alguma letra já tem coeficiente $1$ ou $-1$. Adição é melhor quando os coeficientes são "redondos" ou já opostos.

> [!ATENÇÃO] Ao multiplicar uma equação, multiplique **todos** os termos, inclusive o do lado direito. Esquecer o $11 \to 22$ é o erro mais comum.

## 4. Interpretação gráfica

Cada equação do 1º grau com duas letras é uma **reta** no plano. A solução do sistema é o **ponto de encontro** das retas.

| Situação das retas | Soluções | Classificação |
|---|---|---|
| concorrentes (se cruzam) | uma | SPD (possível e determinado) |
| coincidentes (a mesma reta) | infinitas | SPI (possível e indeterminado) |
| paralelas (não se cruzam) | nenhuma | SI (impossível) |

**Exemplos.**
- $\begin{cases} x + y = 2 \\ 2x + 2y = 4 \end{cases}$: a segunda é o dobro da primeira. SPI.
- $\begin{cases} x + y = 2 \\ x + y = 5 \end{cases}$: somar dá $2$ e dá $5$ ao mesmo tempo é impossível. SI.

> [!INTUIÇÃO] Ao resolver algebricamente, o SPI termina em $0 = 0$ e o SI termina em algo falso como $0 = 3$, igual às equações especiais do capítulo 7.

## 5. Problemas

**Exemplo.** Em um estacionamento há carros e motos, $30$ veículos e $96$ rodas. Quantos de cada?

$$\begin{cases} c + m = 30 \\ 4c + 2m = 96 \end{cases}$$

Da primeira, $m = 30 - c$: $4c + 60 - 2c = 96 \Rightarrow 2c = 36 \Rightarrow c = 18$, $m = 12$.

**Exemplo.** Dois cafés e um pão custam R\$ 14; um café e três pães custam R\$ 12. Preço de cada?

$$\begin{cases} 2c + p = 14 \\ c + 3p = 12 \end{cases}$$

Da segunda, $c = 12 - 3p$: $2(12 - 3p) + p = 14 \Rightarrow 24 - 5p = 14 \Rightarrow p = 2$, $c = 6$. Café R\$ 6, pão R\$ 2.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A solução de $\begin{cases} x + y = 8 \\ x - y = 2 \end{cases}$ é:
+ $(5, 3)$
- $(3, 5)$
- $(6, 2)$
- $(4, 4)$
> Somando: $2x = 10$, $x = 5$ e $y = 3$.

? Em $\begin{cases} y = 2x \\ x + y = 9 \end{cases}$, quanto vale $y$?
- $3$
+ $6$
- $9$
- $4{,}5$
> $x + 2x = 9 \Rightarrow x = 3$ e $y = 6$.

? Para eliminar $y$ em $\begin{cases} 3x + 2y = 7 \\ x - y = 1 \end{cases}$ pela adição, multiplique a segunda equação por:
- $-1$
- $3$
+ $2$
- $-2$
> Fica $2x - 2y = 2$, e $+2y - 2y$ se cancelam.

? O sistema $\begin{cases} x + 2y = 3 \\ 2x + 4y = 10 \end{cases}$ é:
- possível e determinado
- possível e indeterminado
+ impossível
- tem solução $(1, 1)$
> Dobrando a primeira, $2x + 4y = 6 \neq 10$: retas paralelas.

? Geometricamente, a solução de um sistema SPD é:
- uma reta
+ o ponto onde as retas se cruzam
- a origem
- a distância entre as retas
> Um par $(x, y)$ é um ponto no plano.
```

## 6. Exercícios

**1.** Resolva $\begin{cases} 3x + y = 5 \\ 2x - 3y = 18 \end{cases}$.

<details>
<summary>Ver solução</summary>

$y = 5 - 3x$; $2x - 15 + 9x = 18 \Rightarrow 11x = 33 \Rightarrow x = 3$, $y = -4$.

</details>

**2.** Resolva $\begin{cases} 5x + 2y = 1 \\ 3x + 4y = -5 \end{cases}$ pela adição.

<details>
<summary>Ver solução</summary>

Multiplique a primeira por $-2$: $-10x - 4y = -2$. Somando com a segunda: $-7x = -7$, $x = 1$; então $5 + 2y = 1$, $y = -2$.

</details>

**3.** A soma de dois números é $50$ e a diferença é $14$. Quais são?

<details>
<summary>Ver solução</summary>

$x + y = 50$, $x - y = 14$: $x = 32$, $y = 18$.

</details>

**4.** Um teatro vendeu $200$ ingressos e arrecadou R\$ 4.500. Inteira custa R\$ 30 e meia, R\$ 15. Quantas meias foram vendidas?

<details>
<summary>Ver solução</summary>

$i + m = 200$ e $30i + 15m = 4500$. Com $i = 200 - m$: $6000 - 30m + 15m = 4500 \Rightarrow 15m = 1500 \Rightarrow m = 100$ meias (e $100$ inteiras). Confira: $3000 + 1500 = 4500$. ✓

</details>

**5.** Classifique $\begin{cases} 2x - y = 3 \\ -4x + 2y = -6 \end{cases}$.

<details>
<summary>Ver solução</summary>

A segunda é a primeira multiplicada por $-2$: mesma reta. SPI, infinitas soluções ($y = 2x - 3$).

</details>
