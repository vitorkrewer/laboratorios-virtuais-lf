# Corpo negro e a energia em pacotes

A segunda revolução de 1900 começou num problema que parecia técnico: qual é a cor da luz emitida por um objeto quente? A física clássica dava uma resposta absurda. Para consertá-la, Max Planck teve de supor que a energia da luz vem em **pacotes**. Ele próprio achou que era um truque matemático. Era o nascimento da física quântica.

## 1. O espectro do corpo negro

Todo objeto quente emite luz: o ferro em brasa fica vermelho, depois amarelo, depois branco-azulado. Um **corpo negro** é um objeto ideal que absorve toda a luz que recebe; a luz que ele emite depende **só da temperatura**. Estrelas, o filamento de uma lâmpada e a radiação cósmica de fundo são ótimos corpos negros.

As medidas de 1900 mostravam uma curva com um pico:
- **Lei de Wien:** o pico fica em $\lambda_\text{máx} = \frac{2{,}898\times10^{-3}\ \text{m·K}}{T}$. Sol (5 772 K): cerca de 500 nm. Corpo humano (310 K): cerca de 9 µm, no infravermelho.
- **Lei de Stefan-Boltzmann:** a potência emitida por área cresce com $T^4$.

## 2. A catástrofe do ultravioleta

A física clássica tratava a radiação dentro de uma cavidade quente como ondas, e cada modo de vibração recebia, em média, a mesma energia $kT$. Como há mais modos quanto menor o comprimento de onda, a previsão (lei de Rayleigh-Jeans) era que a emissão **crescesse sem limite** no ultravioleta: um forno aceso emitiria energia infinita. Foi chamada de **catástrofe do ultravioleta**.

## 3. A hipótese de Planck

> [!TEOREMA] **Planck (1900):** a energia de uma oscilação de frequência $f$ só pode ser trocada em múltiplos inteiros de um **quantum**
> $$E = h\,f,$$
> onde $h = 6{,}626\times10^{-34}$ J·s é a **constante de Planck**.

Com isso, os modos de alta frequência, cujo quantum $hf$ é muito maior que $kT$, quase nunca são excitados: o espectro cai no ultravioleta, exatamente como as medidas mostravam. A fórmula de Planck acertou a curva inteira em todas as temperaturas.

> [!INTUIÇÃO] É como uma máquina de venda que só aceita notas grandes: se você tem só moedas ($kT$ pequeno), não consegue comprar os produtos caros (frequências altas). As frequências altas ficam "sem energia" e a catástrofe some.

## 4. Quão grande é um quantum?

Com $c = \lambda f$, a energia de um quantum de luz é $E = \frac{hc}{\lambda}$. Uma conta útil:
$$E\ (\text{eV}) \approx \frac{1\,240}{\lambda\ (\text{nm})}.$$

| Radiação | $\lambda$ | Energia por quantum |
|---|---|---|
| rádio FM | 3 m | $4\times10^{-7}$ eV |
| micro-ondas | 12 cm | $10^{-5}$ eV |
| infravermelho | 10 µm | 0,12 eV |
| vermelho | 700 nm | 1,8 eV |
| violeta | 400 nm | 3,1 eV |
| ultravioleta C | 250 nm | 5 eV |
| raios X | 0,1 nm | 12 400 eV |

> [!ATENÇÃO] Uma lâmpada emite trilhões de trilhões de quanta por segundo: por isso a "granulação" da luz passa despercebida no dia a dia. A constante $h$ é minúscula, e o mundo quântico só aparece em escalas atômicas.

O quantum explica por que a luz ultravioleta queima a pele e a luz visível de uma lâmpada não: cada fóton UV tem energia suficiente para quebrar ligações químicas no DNA; nenhum número de fótons vermelhos faz isso sozinho. Einstein levou a ideia de Planck adiante no capítulo seguinte.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O espectro de um corpo negro depende:
- do material do objeto
+ só da temperatura
- só do tamanho
- da cor da superfície
> É a definição de corpo negro ideal.

? A catástrofe do ultravioleta era a previsão clássica de que:
+ a emissão cresceria sem limite em comprimentos de onda curtos
- o Sol emitiria só ultravioleta
- a luz ultravioleta não existe
- os objetos quentes não emitem luz
> Lei de Rayleigh-Jeans.

? Segundo Planck, a energia de um quantum de frequência f é:
- f/h
+ hf
- h/f
- hf²
> $h = 6{,}626\times10^{-34}$ J·s.

? Um fóton de 620 nm tem energia de cerca de:
- 0,5 eV
+ 2 eV
- 20 eV
- 620 eV
> $1240/620 = 2$.

? Por que a luz UV causa queimaduras e a luz vermelha forte não?
- porque o UV é mais intenso
+ porque cada fóton UV tem energia suficiente para quebrar ligações químicas
- porque a luz vermelha não chega à pele
- porque o UV é mais quente
> O que importa é a energia de cada quantum.
```

## 5. Exercícios

**1.** Em que comprimento de onda fica o pico de emissão de um filamento de lâmpada a 2 800 K? Que fração da luz é visível?

<details>
<summary>Ver solução</summary>

$\lambda = \frac{2{,}898\times10^{-3}}{2\,800} \approx 1{,}03\ \mu$m, no infravermelho. A maior parte da energia sai como calor: só cerca de 5% a 10% é luz visível. Por isso as lâmpadas incandescentes são ineficientes.

</details>

**2.** Uma lâmpada de LED emite 1 W de luz verde (530 nm). Quantos fótons por segundo?

<details>
<summary>Ver solução</summary>

Cada fóton: $\frac{1\,240}{530} \approx 2{,}34$ eV $= 3{,}75\times10^{-19}$ J. Fótons por segundo: $\frac{1}{3{,}75\times10^{-19}} \approx 2{,}7\times10^{18}$.

</details>
