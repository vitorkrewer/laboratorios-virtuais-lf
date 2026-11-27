# O diagrama HR e a sequência principal

Por volta de 1910, Ejnar Hertzsprung e Henry Norris Russell fizeram, cada um, o mesmo gráfico: luminosidade contra temperatura. Se as estrelas fossem uma mistura aleatória, os pontos se espalhariam por toda parte. Não se espalham: ficam em poucas faixas bem definidas. O **diagrama de Hertzsprung-Russell** é a ferramenta mais importante da astrofísica estelar, porque cada faixa corresponde a uma fase da vida das estrelas.

> [!DICA] No simulador [Evolução estelar](#/lab/evolucao), escolha uma massa e aperte "viver": a estrela percorre o diagrama HR desde o nascimento até a morte.

## 1. Como ler o diagrama

- **Eixo vertical:** luminosidade (escala logarítmica), de $10^{-4}$ a $10^{6}\,L_\odot$.
- **Eixo horizontal:** temperatura, **crescendo para a esquerda** (por tradição, na ordem O, B, A, F, G, K, M).
- **Linhas de raio constante** cortam o diagrama na diagonal: pela lei de Stefan-Boltzmann, uma estrela no canto superior direito (fria e luminosa) tem de ser enorme.

> [!ATENÇÃO] No diagrama HR, a temperatura **aumenta para a esquerda**. As estrelas quentes ficam à esquerda e as frias, à direita.

## 2. As regiões do diagrama

| Região | Onde | Quem | Fração das estrelas |
|---|---|---|---|
| **Sequência principal** | diagonal, do canto superior esquerdo ao inferior direito | estrelas fundindo hidrogênio no núcleo, como o Sol | cerca de 90% |
| **Gigantes e supergigantes** | acima e à direita | estrelas velhas e infladas: Aldebarã, Betelgeuse | poucas, mas brilhantes |
| **Anãs brancas** | embaixo e à esquerda | núcleos mortos de estrelas como o Sol: Sírius B | cerca de 10% |

> [!INTUIÇÃO] A sequência principal é tão povoada porque é a fase **mais longa** da vida de uma estrela, como numa foto aleatória de uma cidade a maioria das pessoas seria adulta, não bebê nem centenária.

## 3. A massa manda em tudo

Na sequência principal, a posição de uma estrela é determinada pela **massa**: as mais massivas são quentes, azuis e luminosas (no topo à esquerda); as menos massivas, frias, vermelhas e fracas (embaixo à direita).

> [!TEOREMA] **(Relação massa-luminosidade)** Na sequência principal, aproximadamente,
> $$\frac{L}{L_\odot} \approx \left(\frac{M}{M_\odot}\right)^{3{,}5}.$$

Uma estrela com 10 vezes a massa do Sol é cerca de $10^{3{,}5} \approx 3\,000$ vezes mais luminosa.

## 4. Quanto tempo vive uma estrela

O combustível é proporcional à massa; o consumo, à luminosidade. O tempo na sequência principal é
$$t \approx 10\ \text{bilhões de anos} \times \frac{M/M_\odot}{L/L_\odot} \approx 10\ \text{bilhões de anos} \times \left(\frac{M}{M_\odot}\right)^{-2{,}5}.$$

| Massa | Luminosidade | Vida na sequência principal |
|---|---|---|
| $0{,}1\,M_\odot$ | $0{,}0003\,L_\odot$ | trilhões de anos (mais que a idade do universo) |
| $1\,M_\odot$ | $1\,L_\odot$ | 10 bilhões de anos |
| $10\,M_\odot$ | cerca de $3\,000\,L_\odot$ | cerca de 30 milhões de anos |
| $40\,M_\odot$ | cerca de $400\,000\,L_\odot$ | poucos milhões de anos |

> [!ATENÇÃO] Mais massa **não** significa vida mais longa. É o contrário: estrelas massivas têm mais combustível, mas queimam muito mais depressa. Nenhuma anã vermelha jamais saiu da sequência principal: o universo é jovem demais para isso.

## 5. Aglomerados: relógios cósmicos

As estrelas de um **aglomerado** nasceram juntas, da mesma nuvem, e estão à mesma distância. No diagrama HR de um aglomerado, a sequência principal é "comida" de cima para baixo com o tempo: as estrelas mais massivas saem primeiro. O **ponto de desvio** (onde as estrelas começam a deixar a sequência principal) indica a idade.

- As **Plêiades** ainda têm estrelas B na sequência principal: cerca de 100 milhões de anos.
- **Aglomerados globulares** só têm estrelas abaixo de cerca de $0{,}8\,M_\odot$ na sequência principal: mais de 12 bilhões de anos, entre os objetos mais antigos da Via Láctea.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? No diagrama HR, a temperatura:
- cresce para a direita
+ cresce para a esquerda
- está no eixo vertical
- não aparece
> Convenção histórica: O à esquerda, M à direita.

? A maioria das estrelas está:
+ na sequência principal
- entre as gigantes
- entre as anãs brancas
- entre as supergigantes
> É a fase mais longa da vida.

? Uma estrela de 4 massas solares, comparada ao Sol, vive na sequência principal:
- 4 vezes mais
- o mesmo tempo
+ cerca de 32 vezes menos
- 4 vezes menos
> $4^{-2{,}5} = \frac{1}{32}$.

? Uma estrela fria e muito luminosa (canto superior direito) é necessariamente:
+ muito grande
- muito pequena
- muito próxima
- muito jovem
> $L = 4\pi R^2\sigma T^4$.

? O ponto de desvio de um aglomerado revela:
- a distância
+ a idade
- a composição
- a massa total
> As estrelas mais massivas saem da sequência principal primeiro.
```

## 6. Exercícios

**1.** Qual é a luminosidade de uma estrela de $2\,M_\odot$ na sequência principal?

<details>
<summary>Ver solução</summary>

$2^{3{,}5} \approx 11{,}3\,L_\odot$.

</details>

**2.** E quanto tempo ela vive na sequência principal?

<details>
<summary>Ver solução</summary>

$10 \times 2^{-2{,}5} \approx 1{,}8$ bilhão de anos.

</details>

**3.** Um aglomerado tem ponto de desvio em $3\,M_\odot$. Estime a idade.

<details>
<summary>Ver solução</summary>

$10 \times 3^{-2{,}5} \approx 0{,}64$ bilhão de anos, cerca de 640 milhões de anos.

</details>

**4.** Por que não se conhece nenhuma anã branca com mais de 1,4 massa solar, e por que não há anãs vermelhas "velhas" que já saíram da sequência principal?

<details>
<summary>Ver solução</summary>

A primeira parte vem do limite de Chandrasekhar (capítulo 5). A segunda: uma anã vermelha vive centenas de bilhões a trilhões de anos, muito mais que os 13,8 bilhões de anos do universo.

</details>
