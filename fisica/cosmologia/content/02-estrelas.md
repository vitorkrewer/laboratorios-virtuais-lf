# Propriedades das estrelas

Uma estrela é um ponto de luz, mesmo no maior telescópio. Ainda assim, medimos a temperatura, o tamanho, a massa e a composição de estrelas a milhares de anos-luz. Este capítulo mostra como, usando as ferramentas do livro de Astronomia: paralaxe, magnitudes, leis de radiação e as leis de Kepler.

> [!DICA] No simulador [Evolução estelar](#/lab/evolucao), passe o mouse pelo diagrama: cada ponto mostra a temperatura, a luminosidade, o raio e a cor de uma estrela típica.

## 1. Temperatura e classes espectrais

A cor de uma estrela dá a temperatura (lei de Wien). Mais precisas ainda são as **linhas do espectro**: cada temperatura deixa certos átomos no estado certo para absorver certas cores. Com isso, as estrelas se dividem em **classes espectrais**:

| Classe | Temperatura (K) | Cor | Exemplo |
|---|---|---|---|
| O | acima de 30 000 | azul | Mintaka (Três Marias) |
| B | 10 000 a 30 000 | azul-esbranquiçada | Rigel, Espiga |
| A | 7 500 a 10 000 | branca | Sírius, Vega |
| F | 6 000 a 7 500 | branco-amarelada | Prócion, Canopus |
| G | 5 200 a 6 000 | amarela | Sol, Alfa Centauri A |
| K | 3 700 a 5 200 | laranja | Arcturo, Aldebarã |
| M | 2 400 a 3 700 | vermelha | Betelgeuse, Proxima Centauri |

Cada classe se subdivide de 0 a 9: o Sol é **G2**.

> [!INTUIÇÃO] A sequência O, B, A, F, G, K, M parece arbitrária porque é a ordem alfabética antiga, reorganizada por temperatura quando Annie Jump Cannon e Cecilia Payne entenderam a física por trás das linhas, no início do século XX. Payne descobriu, em 1925, que as estrelas são feitas principalmente de **hidrogênio e hélio**, contra o que todos achavam na época.

## 2. Luminosidade

Com a distância (paralaxe) e o brilho aparente, obtém-se a luminosidade:
$$L = 4\pi d^2 F.$$

As luminosidades variam enormemente: de cerca de $10^{-4}\,L_\odot$ (anãs vermelhas fracas) a mais de $10^{6}\,L_\odot$ (supergigantes azuis).

## 3. Raio: a lei de Stefan-Boltzmann de novo

Conhecendo $L$ e $T$, o raio sai de $L = 4\pi R^2\sigma T^4$. Comparando com o Sol, as constantes somem:
$$\frac{R}{R_\odot} = \sqrt{\frac{L}{L_\odot}}\left(\frac{T_\odot}{T}\right)^2.$$

**Exemplo.** Betelgeuse: $L \approx 100\,000\,L_\odot$, $T \approx 3\,500$ K. $\frac{R}{R_\odot} = \sqrt{10^5}\left(\frac{5\,770}{3\,500}\right)^2 \approx 316 \cdot 2{,}72 \approx 860$. No lugar do Sol, ela engoliria Marte e chegaria perto de Júpiter.

## 4. Massa: estrelas binárias

A massa é a propriedade mais importante de uma estrela, e só pode ser medida diretamente pela gravidade. Mais da metade das estrelas como o Sol vive em sistemas **binários**. Medindo o período $P$ e o semieixo $a$ da órbita relativa, a terceira lei de Kepler dá a **soma das massas**:
$$M_1 + M_2 = \frac{a^3}{P^2} \quad (\text{em } M_\odot,\ \text{UA e anos}).$$
O tamanho das órbitas de cada estrela em volta do centro de massa dá a razão $\frac{M_1}{M_2}$, e com isso cada massa separadamente.

**Exemplo.** Sírius A e B: $P = 50{,}1$ anos, $a = 19{,}8$ UA. $M_1 + M_2 = \frac{19{,}8^3}{50{,}1^2} \approx 3{,}1\,M_\odot$.

As massas estelares vão de cerca de $0{,}08\,M_\odot$ (abaixo disso não há fusão de hidrogênio: são **anãs marrons**) a mais de $100\,M_\odot$.

## 5. Composição e movimento

O espectro também mostra:
- **Composição:** quase todas as estrelas são cerca de 3/4 hidrogênio e 1/4 hélio em massa; os "metais" (para os astrônomos, todo elemento além do hélio) variam de quase zero, nas estrelas mais velhas, a cerca de 2%, nas jovens como o Sol.
- **Velocidade radial**, pelo efeito Doppler.
- **Rotação**, pelo alargamento das linhas.
- **Campo magnético**, pela divisão das linhas (efeito Zeeman).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A classe espectral de uma estrela indica principalmente:
+ a temperatura da superfície
- a massa
- a distância
- a idade
> O, B, A, F, G, K, M: das mais quentes às mais frias.

? O Sol é de classe:
- O
- A
+ G
- M
> G2.

? Duas estrelas com a mesma temperatura, uma 100 vezes mais luminosa que a outra. O raio da mais luminosa é:
- 100 vezes maior
+ 10 vezes maior
- 4 vezes maior
- igual
> $R \propto \sqrt{L}$ a temperatura fixa.

? A forma mais direta de medir a massa de uma estrela é:
- pela cor
- pelo brilho
+ pela órbita de uma companheira
- pela paralaxe
> Terceira lei de Kepler.

? Uma anã marrom é:
- uma anã branca resfriada
+ um objeto com massa pequena demais para fundir hidrogênio
- uma estrela de nêutrons
- uma gigante vermelha
> Abaixo de cerca de 0,08 M☉.
```

## 6. Exercícios

**1.** Uma estrela tem $T = 11\,540$ K (o dobro do Sol) e o mesmo raio do Sol. Qual é a luminosidade?

<details>
<summary>Ver solução</summary>

$L = 2^4 L_\odot = 16\,L_\odot$.

</details>

**2.** Uma anã branca tem $L = 0{,}01\,L_\odot$ e $T = 23\,000$ K. Qual é o raio, em raios solares e em km?

<details>
<summary>Ver solução</summary>

$\sqrt{0{,}01}\left(\frac{5\,770}{23\,000}\right)^2 = 0{,}1 \cdot 0{,}0629 \approx 0{,}0063\,R_\odot \approx 4\,400$ km, menor que a Terra.

</details>

**3.** Um sistema binário tem $P = 2$ anos e $a = 2$ UA. Qual é a massa total?

<details>
<summary>Ver solução</summary>

$\frac{8}{4} = 2\,M_\odot$.

</details>

**4.** Aldebarã tem $L \approx 440\,L_\odot$ e $T \approx 3\,900$ K. Estime o raio.

<details>
<summary>Ver solução</summary>

$\sqrt{440}\left(\frac{5\,770}{3\,900}\right)^2 \approx 21 \cdot 2{,}19 \approx 46\,R_\odot$.

</details>
