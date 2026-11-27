# A expansão do universo

Em 1929, Edwin Hubble juntou as distâncias de dezenas de galáxias com as velocidades medidas pelo desvio para o vermelho e encontrou uma regra simples: quanto mais longe, mais depressa a galáxia se afasta. Georges Lemaître já havia chegado à mesma conclusão em 1927, com a relatividade geral: o universo está se **expandindo**. Foi o fim da ideia de um cosmos eterno e imutável.

> [!DICA] No simulador [Universo em expansão](#/lab/expansao), escolha qualquer galáxia como "casa": de todas elas, as outras se afastam seguindo a mesma lei de Hubble.

## 1. A lei de Hubble-Lemaître

> [!TEOREMA] A velocidade de afastamento de uma galáxia distante é proporcional à distância:
> $$v = H_0\,d.$$
> $H_0$, a **constante de Hubble**, vale cerca de 70 km/s por megaparsec (Mpc): a cada milhão de parsecs (3,26 milhões de anos-luz) de distância, a galáxia se afasta 70 km/s mais depressa.

**Exemplo.** Uma galáxia a 100 Mpc se afasta a cerca de $70 \times 100 = 7\,000$ km/s.

O valor exato de $H_0$ é um dos debates mais quentes da cosmologia, a **tensão de Hubble**:
- A partir da radiação cósmica de fundo (satélite Planck, supondo o modelo padrão): $H_0 \approx 67{,}4$ km/s/Mpc.
- A partir da escada de distâncias (cefeidas e supernovas, equipe SH0ES): $H_0 \approx 73$ km/s/Mpc.

A diferença é pequena, mas maior que os erros das medidas: ou há um erro sistemático ainda não encontrado, ou falta algo no modelo do universo.

## 2. O desvio para o vermelho cosmológico

> [!DEFINIÇÃO] O **desvio para o vermelho** é $z = \frac{\lambda_\text{obs} - \lambda_\text{emit}}{\lambda_\text{emit}}$. Na cosmologia, ele mede quanto o universo se esticou enquanto a luz viajava:
> $$1 + z = \frac{\text{tamanho do universo hoje}}{\text{tamanho quando a luz saiu}}.$$

Uma galáxia com $z = 1$ emitiu sua luz quando todas as distâncias do universo eram a metade das de hoje. A luz do quasar com $z = 7{,}77$ saiu quando o universo era quase 9 vezes menor.

> [!ATENÇÃO] O desvio cosmológico **não** é um efeito Doppler comum: as galáxias não voam através do espaço; é o próprio espaço que se estica, e o comprimento de onda da luz estica junto. Para $z$ pequeno, os dois dão o mesmo resultado ($v \approx cz$); para $z$ grande, só a interpretação cosmológica funciona.

## 3. Expansão sem centro

> [!INTUIÇÃO] Imagine um pão de passas crescendo no forno. Cada passa vê todas as outras se afastarem, e as mais distantes se afastam mais depressa, porque há mais massa crescendo entre elas. Nenhuma passa é o centro. O universo é assim: de qualquer galáxia, observa-se a mesma lei de Hubble.

> [!ATENÇÃO] O Big Bang **não** foi uma explosão num ponto do espaço vazio. Foi o espaço inteiro, em todo lugar, que era muito denso e quente e começou a se expandir. Não há uma "borda" nem um "centro" de onde tudo saiu.

O que se expande são as distâncias **entre** grupos de galáxias. Átomos, pessoas, planetas, estrelas e galáxias não se expandem: estão presos por forças muito mais fortes.

## 4. Idade do universo e horizontes

Se as galáxias sempre se afastassem com a mesma velocidade, o tempo desde que estavam juntas seria $\frac{d}{v} = \frac{1}{H_0}$, o **tempo de Hubble**:
$$\frac{1}{H_0} \approx \frac{977{,}8}{H_0\ (\text{km/s/Mpc})}\ \text{bilhões de anos} \approx 14{,}5 \text{ bilhões de anos (para } H_0 = 67{,}4).$$
A idade calculada com o modelo completo, levando em conta que a expansão desacelerou e depois acelerou, é de **13,8 bilhões de anos**.

> [!INTUIÇÃO] A uma distância $\frac{c}{H_0}$, cerca de 14 bilhões de anos-luz, as galáxias se afastam mais depressa que a luz. Isso não contradiz a relatividade: nada está se movendo **através** do espaço mais rápido que a luz; é o espaço entre nós que cresce. Por causa da expansão, as galáxias mais distantes cuja luz já nos alcançou estão hoje a cerca de **46 bilhões de anos-luz**: é o raio do **universo observável**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Pela lei de Hubble, uma galáxia duas vezes mais distante se afasta:
- com a mesma velocidade
+ duas vezes mais depressa
- quatro vezes mais depressa
- duas vezes mais devagar
> $v = H_0 d$.

? Uma galáxia com $z = 1$ emitiu sua luz quando o universo era:
- igual ao de hoje
+ metade do tamanho de hoje
- o dobro do tamanho de hoje
- um décimo do tamanho de hoje
> $1 + z = 2$.

? O centro da expansão do universo está:
- na Via Láctea
- em Andrômeda
- no ponto onde aconteceu o Big Bang
+ em lugar nenhum: a expansão não tem centro
> Como o pão de passas.

? A tensão de Hubble é:
+ a discordância entre os valores de $H_0$ medidos por métodos diferentes
- a força que segura as galáxias
- o atrito entre galáxias
- a pressão da radiação cósmica
> Cerca de 67 contra cerca de 73 km/s/Mpc.

? Com $H_0 = 70$ km/s/Mpc, o tempo de Hubble é de cerca de:
- 1,4 bilhão de anos
+ 14 bilhões de anos
- 140 bilhões de anos
- 4,6 bilhões de anos
> $977{,}8 / 70 \approx 14$.
```

## 5. Exercícios

**1.** Uma galáxia se afasta a $21\,000$ km/s. Com $H_0 = 70$ km/s/Mpc, a que distância está?

<details>
<summary>Ver solução</summary>

$d = \frac{21\,000}{70} = 300$ Mpc, cerca de 980 milhões de anos-luz.

</details>

**2.** A linha H-alfa (656,3 nm) aparece em 721,9 nm no espectro de uma galáxia. Calcule $z$ e a velocidade aproximada.

<details>
<summary>Ver solução</summary>

$z = \frac{721{,}9 - 656{,}3}{656{,}3} = 0{,}10$; $v \approx cz = 30\,000$ km/s.

</details>

**3.** Calcule o tempo de Hubble para $H_0 = 73$ km/s/Mpc e compare com $H_0 = 67{,}4$.

<details>
<summary>Ver solução</summary>

$\frac{977{,}8}{73} \approx 13{,}4$ bilhões de anos contra $14{,}5$. A tensão de Hubble muda a idade estimada em cerca de 1 bilhão de anos (no modelo completo, a diferença é menor, mas real).

</details>

**4.** Mostre que 1 km/s/Mpc equivale a $\frac{1}{977{,}8}$ por bilhão de anos.

<details>
<summary>Ver solução</summary>

$1$ Mpc $= 3{,}086\times10^{19}$ km, então 1 km/s/Mpc $= 3{,}24\times10^{-20}$ s$^{-1}$. Um bilhão de anos tem $3{,}156\times10^{16}$ s: $3{,}24\times10^{-20} \times 3{,}156\times10^{16} = 1{,}023\times10^{-3} = \frac{1}{977{,}8}$.

</details>
