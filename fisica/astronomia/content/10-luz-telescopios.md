# Luz e telescópios

Quase tudo o que sabemos sobre estrelas, galáxias e planetas distantes chega em forma de luz. Ela traz a temperatura, a composição química, a velocidade e até a presença de planetas invisíveis. Este capítulo ensina a "ler" a luz e mostra por que os telescópios são cada vez maiores e por que alguns ficam no espaço.

## 1. A luz como onda eletromagnética

> [!DEFINIÇÃO] A luz é uma onda eletromagnética. No vácuo viaja a $c = 299\,792\,458$ m/s (cerca de $3\times10^{8}$ m/s). Comprimento de onda $\lambda$ e frequência $f$ se relacionam por
> $$c = \lambda f.$$
> A luz também se comporta como partículas, os **fótons**, cada um com energia $E = hf = \frac{hc}{\lambda}$, com $h = 6{,}626\times10^{-34}$ J·s.

| Faixa | Comprimento de onda | Exemplos no céu |
|---|---|---|
| Rádio | mais de 1 mm | hidrogênio frio (21 cm), pulsares, quasares |
| Micro-ondas | 1 mm a 1 m (sobreposta ao rádio) | radiação cósmica de fundo |
| Infravermelho | 700 nm a 1 mm | poeira, estrelas em formação, galáxias muito distantes |
| Visível | 400 a 700 nm | estrelas, o Sol |
| Ultravioleta | 10 a 400 nm | estrelas muito quentes |
| Raios X | 0,01 a 10 nm | gás a milhões de graus perto de buracos negros |
| Raios gama | menos de 0,01 nm | explosões estelares extremas |

## 2. Cor e temperatura: o corpo negro

Um objeto denso e quente emite luz em todas as cores, com um pico que depende **só da temperatura**. Esse espectro ideal é o do **corpo negro**, e as estrelas se aproximam bastante dele.

> [!TEOREMA] **(Lei de Wien)** O comprimento de onda do pico de emissão é inversamente proporcional à temperatura:
> $$\lambda_\text{máx}\,T = 2{,}898\times10^{-3}\ \text{m·K}.$$

- O Sol ($T \approx 5\,770$ K): $\lambda_\text{máx} \approx 502$ nm, no verde-azulado. Somado, o espectro parece branco.
- Betelgeuse (cerca de $3\,500$ K): pico no infravermelho próximo, aparência avermelhada.
- Rigel (cerca de $12\,000$ K): pico no ultravioleta, aparência azulada.

> [!ATENÇÃO] No céu, ao contrário da torneira, **azul é quente e vermelho é frio**. Uma estrela vermelha é das mais frias; uma azul, das mais quentes.

> [!TEOREMA] **(Lei de Stefan-Boltzmann)** A potência emitida por unidade de área é $\sigma T^4$, com $\sigma = 5{,}67\times10^{-8}\ \text{W/(m}^2\text{K}^4)$. Para uma estrela esférica de raio $R$, a **luminosidade** é
> $$L = 4\pi R^2\,\sigma T^4.$$

Dobrar a temperatura multiplica a potência por $2^4 = 16$. Uma estrela fria pode ser muito luminosa se for enorme: é o caso das gigantes vermelhas.

## 3. Espectros: a impressão digital dos elementos

Passando a luz por um prisma ou rede de difração, aparecem **linhas** em comprimentos de onda específicos. Cada elemento químico tem seu próprio conjunto de linhas, determinado pelos níveis de energia dos seus átomos.

- **Espectro contínuo:** sólido, líquido ou gás denso e quente (corpo negro).
- **Linhas de emissão:** gás rarefeito e quente (nebulosas).
- **Linhas de absorção:** luz contínua atravessando um gás mais frio (a atmosfera das estrelas). É o espectro típico de uma estrela.

O hélio foi descoberto **no Sol**, em 1868, pelas suas linhas no espectro, antes de ser encontrado na Terra; o nome vem de *hélios*, Sol em grego.

## 4. Efeito Doppler

> [!TEOREMA] Se a fonte se move ao longo da linha de visada com velocidade $v \ll c$, as linhas se deslocam:
> $$\frac{\Delta\lambda}{\lambda} = \frac{v}{c}.$$
> Afastando-se: $\lambda$ aumenta (**desvio para o vermelho**). Aproximando-se: $\lambda$ diminui (**desvio para o azul**).

Com o Doppler, medimos a rotação do Sol, órbitas de estrelas duplas, planetas em outras estrelas (capítulo 12) e o afastamento das galáxias (livro de Astrofísica e Cosmologia).

**Exemplo.** Uma linha de laboratório em $656{,}3$ nm aparece em $656{,}5$ nm: $v = c\frac{0{,}2}{656{,}3} \approx 91$ km/s, afastando-se.

## 5. Telescópios

Um telescópio tem duas funções principais, e nenhuma delas é "aumentar".

**1. Coletar luz.** A quantidade de luz é proporcional à **área**, ou seja, ao quadrado do diâmetro $D$. Um telescópio de 8 m coleta $\left(\frac{8\text{ m}}{7\text{ mm}}\right)^2 \approx 1{,}3$ milhão de vezes mais luz que o olho humano (pupila de cerca de 7 mm).

**2. Separar detalhes (resolução).** A difração limita o menor ângulo que se consegue separar:
$$\theta \approx 1{,}22\,\frac{\lambda}{D} \text{ (em radianos)}.$$
Quanto maior o espelho e menor o comprimento de onda, mais detalhes.

**Ampliação** é só a razão entre as distâncias focais da objetiva e da ocular. Ampliar sem luz e resolução suficientes só produz uma imagem grande e borrada.

> [!ATENÇÃO] O tamanho que importa num telescópio é o **diâmetro** da objetiva, não a ampliação anunciada na caixa.

**Refratores e refletores.** Os refratores usam lentes; os refletores, espelhos. Todos os grandes telescópios modernos são refletores: um espelho pode ser apoiado por trás, segmentado e não sofre aberração cromática.

**Por que ir ao espaço?** A atmosfera tem dois problemas:
- **Turbulência:** faz as estrelas "piscarem" e borra as imagens (óptica adaptativa corrige parte disso).
- **Absorção:** bloqueia quase todo o ultravioleta, os raios X, os raios gama e boa parte do infravermelho.

Por isso há observatórios no alto de montanhas secas, como o deserto do Atacama, e telescópios espaciais como o Hubble (visível e ultravioleta) e o James Webb (infravermelho).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Uma estrela azulada, comparada a uma avermelhada, é:
+ mais quente
- mais fria
- mais distante
- mais próxima
> Lei de Wien: pico em comprimento de onda menor.

? Se a temperatura de uma estrela dobra e o raio fica igual, a luminosidade:
- dobra
- quadruplica
+ fica 16 vezes maior
- fica igual
> $L \propto T^4$.

? Linhas espectrais deslocadas para o vermelho indicam que a fonte:
+ se afasta
- se aproxima
- é mais quente
- é mais fria
> Efeito Doppler.

? A principal vantagem de um telescópio com o dobro do diâmetro é:
- ampliar o dobro
+ coletar 4 vezes mais luz e ter o dobro da resolução
- ser mais leve
- ver em raios X
> Área $\propto D^2$; $\theta \propto 1/D$.

? Os telescópios de raios X precisam ficar no espaço porque:
- o Sol atrapalha
+ a atmosfera absorve os raios X
- eles são grandes demais
- a gravidade os deforma
> A atmosfera é opaca nessa faixa.
```

## 6. Exercícios

**1.** Qual é o comprimento de onda do pico de uma estrela de $10\,000$ K?

<details>
<summary>Ver solução</summary>

$\lambda = \frac{2{,}898\times10^{-3}}{10^4} = 2{,}9\times10^{-7}$ m $= 290$ nm, no ultravioleta.

</details>

**2.** Uma gigante vermelha tem $T = 3\,000$ K e raio 100 vezes o do Sol ($T_\odot = 5\,770$ K). Quantas vezes é mais luminosa que o Sol?

<details>
<summary>Ver solução</summary>

$\frac{L}{L_\odot} = 100^2\left(\frac{3000}{5770}\right)^4 = 10^4 \cdot 0{,}0731 \approx 730$.

</details>

**3.** Qual é a resolução de um telescópio de 2,4 m (como o Hubble) em luz de 550 nm, em segundos de arco? ($1$ rad $= 206\,265''$)

<details>
<summary>Ver solução</summary>

$\theta = 1{,}22\cdot\frac{5{,}5\times10^{-7}}{2{,}4} = 2{,}8\times10^{-7}$ rad $\approx 0{,}058''$.

</details>

**4.** A frequência da linha de 21 cm do hidrogênio é de quanto?

<details>
<summary>Ver solução</summary>

$f = \frac{3\times10^{8}}{0{,}21} \approx 1{,}43\times10^{9}$ Hz $= 1{,}43$ GHz (o valor exato é 1 420 MHz).

</details>
