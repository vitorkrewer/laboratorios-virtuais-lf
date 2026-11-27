# Distâncias no universo

Medir distâncias é o problema mais difícil da astronomia. Uma estrela fraca pode estar perto ou ser muito luminosa e estar longe: o brilho sozinho não diz qual. A solução foi construir uma **escada**: cada método mede distâncias maiores e é calibrado pelo degrau anterior.

## 1. Unidades de distância

| Unidade | Definição | Valor |
|---|---|---|
| Unidade astronômica (UA) | distância média Terra–Sol | $1{,}496\times10^{8}$ km |
| Ano-luz (al) | distância que a luz percorre em um ano | $9{,}46\times10^{12}$ km $\approx 63\,240$ UA |
| Parsec (pc) | distância em que 1 UA aparece sob um ângulo de $1''$ | $3{,}086\times10^{13}$ km $= 3{,}26$ al $= 206\,265$ UA |

> [!ATENÇÃO] **Ano-luz é distância, não tempo.** "Proxima Centauri está a 4,24 anos-luz" quer dizer que a luz dela leva 4,24 anos para chegar, e que a vemos como era há 4,24 anos.

> [!INTUIÇÃO] Olhar longe é olhar para o passado. Vemos o Sol de 8 minutos atrás, Sírius de 8,6 anos atrás e a galáxia de Andrômeda de cerca de 2,5 milhões de anos atrás.

## 2. Primeiro degrau: o Sistema Solar

A unidade astronômica foi medida com precisão por **radar**: envia-se um pulso a Vênus ou a um asteroide e mede-se o tempo de ida e volta. Com a terceira lei de Kepler, que dá todas as distâncias **relativas**, uma única distância absoluta fixa a escala do Sistema Solar inteiro. Desde 2012, a UA tem valor exato por definição: $149\,597\,870\,700$ m.

## 3. Segundo degrau: a paralaxe

> [!DEFINIÇÃO] A **paralaxe** é o deslocamento aparente de um objeto próximo contra um fundo distante, quando mudamos de ponto de vista. Estique o braço, levante o polegar e alterne os olhos: o polegar "pula".

A Terra muda de posição ao longo do ano, e uma estrela próxima parece descrever uma pequena elipse contra as estrelas distantes. A **paralaxe** $p$ é metade desse deslocamento: o ângulo sob o qual se veria 1 UA a partir da estrela.

> [!TEOREMA] Com $p$ em segundos de arco ($''$), a distância em parsecs é
> $$d\,(\text{pc}) = \frac{1}{p\,('')}.$$

**Exemplo.** Proxima Centauri tem $p = 0{,}768''$: $d = 1{,}30$ pc $= 4{,}24$ al. É a estrela mais próxima depois do Sol, e mesmo a paralaxe dela é menor que um centésimo do diâmetro da Lua cheia. A primeira paralaxe estelar só foi medida em 1838, por Bessel.

> [!INTUIÇÃO] A falta de paralaxe visível foi um argumento antigo contra o movimento da Terra: se a Terra se move, as estrelas deveriam "pular". Elas pulam, mas tão pouco que só telescópios e instrumentos precisos conseguiram ver. As estrelas estavam muito mais longe do que se imaginava.

A missão **Gaia**, da Agência Espacial Europeia, mediu paralaxes de mais de um bilhão de estrelas, com precisão de poucas dezenas de milionésimos de segundo de arco para as mais brilhantes. Para a maioria das estrelas da Via Láctea, as distâncias por paralaxe só existem graças a ela.

## 4. Brilho aparente e luminosidade

Uma estrela de luminosidade $L$ espalha a luz numa esfera de raio $d$. O fluxo que chega aqui é
$$F = \frac{L}{4\pi d^2}.$$
É a lei do **inverso do quadrado**: a $2d$, a estrela parece 4 vezes mais fraca.

> [!DEFINIÇÃO] A **magnitude absoluta** $M$ é a magnitude aparente que a estrela teria se estivesse a **10 pc**. Ela mede a luminosidade verdadeira. A relação com a magnitude aparente $m$ é o **módulo de distância**:
> $$m - M = 5\,\log_{10}\frac{d}{10\ \text{pc}}.$$

**Exemplo.** O Sol tem $m = -26{,}7$ e $M = 4{,}8$. Sírius tem $m = -1{,}46$ e $d = 2{,}64$ pc: $M = -1{,}46 - 5\log_{10}(0{,}264) = -1{,}46 + 2{,}89 = 1{,}43$. Na luz visível, Sírius é $10^{0{,}4(4{,}8 - 1{,}43)} \approx 22$ vezes mais luminoso que o Sol.

## 5. Os degraus seguintes

Se conhecemos a luminosidade de um tipo de objeto (uma **vela-padrão**), a medida do brilho aparente dá a distância. A escada continua assim:

| Degrau | Alcance aproximado | Ideia |
|---|---|---|
| Radar | Sistema Solar | tempo de ida e volta de um sinal |
| Paralaxe | até milhares de pc (Gaia) | geometria pura |
| Cefeidas | até dezenas de milhões de pc | estrelas pulsantes cujo período revela a luminosidade |
| Supernovas do tipo Ia | bilhões de pc | explosões com luminosidade de pico quase padrão |
| Desvio para o vermelho | universo observável | expansão do universo (lei de Hubble) |

Os três últimos são assunto do livro de **Astrofísica e Cosmologia**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O ano-luz é uma unidade de:
- tempo
+ distância
- velocidade
- brilho
> A distância que a luz percorre em um ano.

? Uma estrela com paralaxe de $0{,}1''$ está a:
- 0,1 pc
- 1 pc
+ 10 pc
- 100 pc
> $d = 1/p$.

? Se uma estrela fosse levada para o triplo da distância, seu brilho aparente ficaria:
- 3 vezes menor
+ 9 vezes menor
- 27 vezes menor
- igual
> Inverso do quadrado.

? A magnitude absoluta é a magnitude que a estrela teria a:
- 1 UA
- 1 ano-luz
+ 10 parsecs
- 1 parsec
> Por definição.

? Um parsec equivale a cerca de:
- 1 ano-luz
+ 3,26 anos-luz
- 206 anos-luz
- 0,3 ano-luz
> E a 206 265 UA.
```

## 6. Exercícios

**1.** Uma estrela tem paralaxe $0{,}025''$. Qual é a distância em pc e em anos-luz?

<details>
<summary>Ver solução</summary>

$d = 40$ pc $= 40 \times 3{,}26 \approx 130$ al.

</details>

**2.** Uma estrela a 100 pc tem $m = 7$. Qual é a magnitude absoluta?

<details>
<summary>Ver solução</summary>

$M = m - 5\log_{10}(10) = 7 - 5 = 2$.

</details>

**3.** Duas estrelas têm a mesma luminosidade; uma está a 10 pc e a outra a 1 000 pc. Qual é a diferença de magnitudes aparentes?

<details>
<summary>Ver solução</summary>

Fator de distância 100, fator de brilho $100^2 = 10^4$, que corresponde a $10$ magnitudes.

</details>

**4.** Mostre que 1 pc $\approx 206\,265$ UA.

<details>
<summary>Ver solução</summary>

Num triângulo com cateto oposto de 1 UA e ângulo $1'' = \frac{1}{206\,265}$ rad, a distância é $\frac{1\text{ UA}}{\tan 1''} \approx \frac{1\text{ UA}}{1/206\,265} = 206\,265$ UA.

</details>
