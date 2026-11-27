# A Lua: fases, marés e eclipses

A Lua é o astro mais próximo e o único que muda de forma a olho nu. Suas fases, a face que sempre vemos, as marés e os eclipses saem de uma mesma geometria: a posição relativa de Sol, Terra e Lua.

> [!DICA] O simulador [Lua e eclipses](#/lab/lua) mostra a órbita vista de cima e, ao lado, a Lua como aparece no céu. Arraste a Lua na órbita e veja a fase mudar.

## 1. Dados básicos

| Grandeza | Valor |
|---|---|
| Distância média à Terra | $384\,400$ km (cerca de 30 diâmetros da Terra) |
| Raio | $1\,737$ km (cerca de $\frac{3}{11}$ do raio da Terra) |
| Massa | $\frac{1}{81}$ da massa da Terra |
| Gravidade na superfície | $1{,}62\ \text{m/s}^2$ (cerca de $\frac16$ da terrestre) |
| Inclinação da órbita em relação à eclíptica | $5{,}1^\circ$ |

## 2. Fases

> [!DEFINIÇÃO] A Lua não tem luz própria: metade dela está sempre iluminada pelo Sol. A **fase** é a parte dessa metade iluminada que conseguimos ver da Terra, e depende do ângulo Sol–Terra–Lua.

| Fase | Posição | Quando está no céu |
|---|---|---|
| Nova | entre a Terra e o Sol | junto com o Sol (invisível) |
| Quarto crescente | $90^\circ$ a leste do Sol | nasce por volta do meio-dia, visível à tarde e no início da noite |
| Cheia | oposta ao Sol | nasce ao pôr do sol e fica a noite toda |
| Quarto minguante | $90^\circ$ a oeste do Sol | nasce por volta da meia-noite, visível de madrugada e de manhã |

> [!ATENÇÃO] As fases **não** são causadas pela sombra da Terra. A sombra da Terra só cai sobre a Lua nos eclipses lunares, que acontecem na Lua cheia e são raros. Nas fases, o que muda é só o ângulo de onde vemos a metade iluminada.

**A parte iluminada aponta sempre para o Sol.** No hemisfério sul, olhando para o norte, a Lua crescente tem o lado iluminado à **esquerda** (o lado oeste, onde o Sol se pôs), o contrário do que se vê na Europa. Perto do equador, a Lua crescente do entardecer aparece deitada, como um barco. Por isso o ditado europeu "a Lua mente" não serve para o Brasil.

## 3. Dois meses diferentes

> [!DEFINIÇÃO]
> - **Mês sideral** ($27{,}32$ dias): uma volta completa da Lua em relação às estrelas.
> - **Mês sinódico** ($29{,}53$ dias): de uma Lua nova à próxima, ou seja, uma volta em relação ao Sol.

O sinódico é mais longo porque, enquanto a Lua dá a volta, a Terra avança na órbita, e a Lua precisa andar um pouco mais para alcançar de novo o alinhamento com o Sol. As duas grandezas se relacionam por
$$\frac{1}{P_\text{sin}} = \frac{1}{P_\text{sid}} - \frac{1}{P_\text{ano}}, \qquad \frac{1}{27{,}32} - \frac{1}{365{,}25} = \frac{1}{29{,}53}.$$

## 4. A face oculta

A Lua gira em torno do próprio eixo no **mesmo tempo** em que orbita a Terra (27,32 dias). Por isso mostra sempre a mesma face. Essa **rotação síncrona** é efeito das marés que a Terra causou na Lua ao longo de bilhões de anos.

> [!ATENÇÃO] A face que não vemos não é "o lado escuro": ela recebe tanta luz do Sol quanto a nossa. Na Lua nova, é ela que está toda iluminada. O nome certo é **face oculta**.

## 5. Marés

> [!INTUIÇÃO] A gravidade da Lua diminui com a distância. O lado da Terra voltado para a Lua é puxado com mais força que o centro da Terra, e o centro, mais que o lado oposto. O resultado é um "esticamento" ao longo da linha Terra–Lua: **dois** bojos de água, um de cada lado. Por isso a maioria dos lugares tem **duas** marés altas por dia (a cada 12 h 25 min, porque a Lua também anda na órbita).

A força de maré decresce com o **cubo** da distância ($\propto \frac{M}{d^3}$), não com o quadrado. O Sol é 27 milhões de vezes mais massivo que a Lua, mas está 390 vezes mais longe: sua maré é cerca de **46%** da lunar.

- **Marés de sizígia** (mais fortes): Lua nova e cheia, com Sol e Lua alinhados somando os efeitos.
- **Marés de quadratura** (mais fracas): quartos crescente e minguante.

## 6. Eclipses

> [!DEFINIÇÃO]
> - **Eclipse solar:** a Lua passa na frente do Sol e projeta sua sombra na Terra. Só pode ocorrer na **Lua nova**.
> - **Eclipse lunar:** a Lua entra na sombra da Terra. Só pode ocorrer na **Lua cheia**.

Se fosse só isso, haveria eclipses todo mês. Não há porque a órbita da Lua é inclinada $5{,}1^\circ$: na maioria das luas novas e cheias, a Lua passa acima ou abaixo do alinhamento. O eclipse exige que a lua nova ou cheia ocorra perto de um **nodo** (onde a órbita da Lua cruza a eclíptica). Isso acontece em duas **temporadas de eclipses** por ano, com 4 a 7 eclipses ao todo.

**Tipos de eclipse solar.** Por coincidência, o Sol é cerca de 400 vezes maior que a Lua e está cerca de 400 vezes mais longe: os dois têm quase o mesmo tamanho aparente (cerca de $0{,}5^\circ$).
- **Total:** a Lua cobre o disco inteiro; aparece a coroa solar. A faixa de totalidade na Terra tem só algumas centenas de quilômetros de largura.
- **Anular:** com a Lua mais longe (perto do apogeu), ela parece menor e sobra um anel de Sol.
- **Parcial:** visto fora da faixa central.

**Eclipse lunar total.** A Lua não some: fica **avermelhada**, porque a atmosfera da Terra desvia para dentro da sombra a luz vermelha de todos os nasceres e pores do sol do planeta. É visível de todo o lado noturno da Terra, por isso é mais fácil de ver que um eclipse solar total.

> [!ATENÇÃO] Nunca olhe para o Sol, nem num eclipse parcial, sem filtro solar certificado. Óculos escuros comuns não protegem.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? As fases da Lua são causadas:
- pela sombra da Terra sobre a Lua
+ pelo ângulo de onde vemos a metade iluminada da Lua
- pela rotação da Lua
- pelas nuvens
> A sombra da Terra só atua nos eclipses lunares.

? A Lua cheia nasce:
- ao meio-dia
+ por volta do pôr do sol
- à meia-noite
- ao nascer do sol
> Está oposta ao Sol.

? Um eclipse solar só pode ocorrer na Lua:
+ nova
- cheia
- crescente
- minguante
> A Lua precisa estar entre o Sol e a Terra.

? Não há eclipses todo mês porque:
- a Lua é pequena demais
+ a órbita da Lua é inclinada em relação à eclíptica
- a Terra é redonda
- a Lua gira em torno de si mesma
> O alinhamento só ocorre perto dos nodos.

? Por que vemos sempre a mesma face da Lua?
- a Lua não gira
+ ela gira em torno de si no mesmo tempo em que orbita a Terra
- a Terra bloqueia a outra face
- a outra face está sempre no escuro
> Rotação síncrona.
```

## 7. Exercícios

**1.** Se a Lua está em quarto crescente, a que horas ela passa pelo meridiano (ponto mais alto)?

<details>
<summary>Ver solução</summary>

Está $90^\circ$ a leste do Sol, ou seja, 6 h "atrás" dele: passa pelo meridiano por volta das 18 h.

</details>

**2.** A luz leva quanto tempo para ir da Lua à Terra? ($c = 300\,000$ km/s)

<details>
<summary>Ver solução</summary>

$\frac{384\,400}{300\,000} \approx 1{,}28$ s.

</details>

**3.** Calcule a razão entre as forças de maré do Sol e da Lua: $M_\odot = 2{,}0\times10^{30}$ kg, $d_\odot = 1{,}5\times10^{8}$ km, $M_L = 7{,}35\times10^{22}$ kg, $d_L = 3{,}84\times10^{5}$ km.

<details>
<summary>Ver solução</summary>

$\frac{M_\odot}{M_L}\left(\frac{d_L}{d_\odot}\right)^3 = 2{,}72\times10^{7}\cdot(2{,}56\times10^{-3})^3 \approx 2{,}72\times10^{7}\cdot 1{,}68\times10^{-8} \approx 0{,}46$.

</details>

**4.** Por que um eclipse lunar total é visto de metade da Terra, mas um eclipse solar total só de uma faixa estreita?

<details>
<summary>Ver solução</summary>

No eclipse lunar, a própria Lua escurece, e qualquer pessoa que veja a Lua no céu vê o eclipse. No solar, só quem está dentro da sombra da Lua, que é pequena ao chegar na Terra, vê o Sol totalmente coberto.

</details>
