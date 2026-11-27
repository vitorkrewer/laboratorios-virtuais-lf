# Movimento circular e gravitação

Rodas, ventiladores, carrosséis, curvas na estrada, a Lua em volta da Terra. Para algo andar em círculo, é preciso uma força **puxando para o centro** o tempo todo. Sem ela, pela inércia, o objeto sairia pela tangente, em linha reta. Entender isso explica por que carros derrapam em curvas e como satélites ficam em órbita.

> [!DICA] **Volta 3 · Analisar.** Ao terminar, você vai conseguir:
> - **identificar** qual força faz o papel de força centrípeta em cada situação;
> - **analisar** por que existe velocidade máxima numa curva;
> - **explicar** uma órbita como uma queda que nunca chega ao chão.

> [!DICA] **De volta à espiral.** No capítulo 1, mudar de direção já era acelerar. No capítulo 2, sem forças, o movimento é em linha reta. Agora juntamos as duas ideias.

> [!INTUIÇÃO] **Pense antes de ler.** Você gira uma pedra presa num barbante, e o barbante arrebenta. Para onde a pedra vai: para fora (para longe do centro), para dentro, ou em linha reta pela tangente?

## 1. A força centrípeta

Num círculo com velocidade constante em módulo, a direção da velocidade muda o tempo todo; logo há aceleração, apontando para o **centro**:

> [!TEOREMA] $$a_c = \frac{v^2}{r}, \qquad F_c = \frac{m\,v^2}{r}.$$
> A força centrípeta não é uma força nova: é o **papel** que alguma força real cumpre.

| Situação | Quem faz o papel de força centrípeta |
|---|---|
| pedra girando no barbante | tração do barbante |
| carro numa curva plana | atrito dos pneus com o asfalto |
| Lua em volta da Terra | gravidade |
| roupa na centrífuga da máquina de lavar | a parede do cesto (a água escapa pelos furos) |
| elétron no modelo de Bohr | força elétrica do núcleo |

A resposta da pergunta do início: pela **tangente**, em linha reta, porque sem o barbante não há mais força para o centro.

> [!ATENÇÃO] A "força centrífuga" que você sente numa curva, empurrando para fora, **não** é uma força real vista de fora: é a sua inércia tentando seguir reto enquanto o carro vira. Quem vê de fora vê a porta do carro empurrando você para dentro da curva.

## 2. Curvas e derrapagens

O atrito máximo dos pneus é limitado. Como a força necessária cresce com $v^2$, existe uma velocidade máxima para cada curva:
- dobrar a velocidade exige **quatro vezes** mais atrito;
- curvas mais fechadas (raio menor) exigem mais atrito;
- com chuva, o atrito cai, e a velocidade segura também.

Pistas de corrida e estradas têm curvas **inclinadas** para que parte da normal ajude a empurrar o carro para o centro.

## 3. Órbitas: cair para sempre

Newton imaginou um canhão no alto de uma montanha. Quanto mais rápida a bala, mais longe cai. Com velocidade suficiente, o chão se curva (a Terra é redonda) tanto quanto a bala cai: ela **nunca chega ao chão**. Está em órbita.

> [!DICA] O livro [Astronomia](../astronomia/#/lab/kepler) tem o canhão de Newton animado e as leis de Kepler.

- Perto da superfície da Terra, a velocidade de órbita é de cerca de **7,9 km/s** (28 000 km/h).
- A Estação Espacial Internacional, a cerca de 400 km de altura, dá uma volta a cada **90 minutos**.
- Os astronautas flutuam porque **caem junto** com a estação, não por falta de gravidade.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A força que mantém um carro numa curva plana é:
- o peso
+ o atrito dos pneus
- a força centrífuga
- a resistência do ar
> O atrito faz o papel de força centrípeta.

? Se o barbante de uma pedra girando arrebenta, a pedra sai:
- para o centro
- para fora, na direção do raio
+ pela tangente, em linha reta
- em espiral
> Inércia.

? Dobrando a velocidade numa curva, a força centrípeta necessária:
- dobra
+ quadruplica
- fica igual
- cai à metade
> F = m v²/r.

? Um satélite em órbita circular está:
- parado no céu
- sem nenhuma força
+ em queda livre contínua em volta da Terra
- empurrado pelo foguete o tempo todo
> A gravidade é a força centrípeta.

? A sensação de ser empurrado para fora numa curva vem:
+ da sua inércia, que tende a seguir em linha reta
- de uma força real para fora
- da gravidade
- do vento
> Vista de fora, a porta empurra você para dentro.
```

## 4. Exercícios

**1.** Um carro de 1 000 kg faz uma curva de raio 50 m a 20 m/s. Que força de atrito é necessária?

<details>
<summary>Ver solução</summary>

$F = \frac{1\,000 \times 400}{50} = 8\,000$ N.

</details>

**2.** **Analise:** por que, num carrossel, quem senta na borda sente mais "força" que quem senta perto do centro, se todos dão uma volta no mesmo tempo?

<details>
<summary>Ver solução</summary>

Na borda, o raio é maior e, como a volta leva o mesmo tempo, a velocidade também é maior. $a_c = \frac{v^2}{r}$ cresce: com $v = \frac{2\pi r}{T}$, $a_c = \frac{4\pi^2 r}{T^2}$, proporcional ao raio.

</details>
