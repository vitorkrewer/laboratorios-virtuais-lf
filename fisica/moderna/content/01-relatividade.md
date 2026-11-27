# A luz e os postulados da relatividade

No fim do século XIX, a física parecia quase pronta: a mecânica de Newton explicava o movimento, e as equações de Maxwell explicavam a luz como uma onda eletromagnética que viaja a $c \approx 300\,000$ km/s. Mas havia uma pergunta incômoda: **a luz viaja a $c$ em relação a quê?** A resposta de Einstein, em 1905, mudou o que entendemos por espaço e tempo.

> [!DICA] No simulador [Relatividade](#/lab/relatividade), modo "relógio de luz", veja um pulso de luz subindo e descendo dentro de um trem, visto por quem está no trem e por quem está na plataforma.

## 1. O problema do éter

Ondas precisam de um meio: o som viaja no ar, as ondas do mar na água. Os físicos supunham que a luz viajava num meio invisível que enchia o espaço, o **éter**. A Terra, que se move a 30 km/s em volta do Sol, deveria sentir um "vento de éter", e a luz deveria ir mais rápido a favor do vento e mais devagar contra ele.

Em 1887, **Albert Michelson e Edward Morley** compararam, com um interferômetro, a velocidade da luz em duas direções perpendiculares. O aparelho detectaria uma diferença muito menor que a esperada. **Não encontraram nenhuma.** Repetiram em várias épocas do ano, com a Terra indo em direções diferentes: nada. A luz tem a mesma velocidade em todas as direções.

> [!INTUIÇÃO] Imagine nadar num rio: ir e voltar a favor e contra a correnteza demora mais do que atravessar e voltar. Michelson e Morley mediram os dois "trajetos" da luz e encontraram sempre o mesmo tempo. Ou não havia correnteza, ou algo estranho acontecia com as réguas e os relógios.

## 2. Os dois postulados de Einstein

> [!TEOREMA] **Postulados da relatividade especial (1905):**
> 1. **Princípio da relatividade:** as leis da física são as mesmas em todos os referenciais inerciais (que se movem com velocidade constante uns em relação aos outros).
> 2. **Constância da velocidade da luz:** a luz no vácuo tem velocidade $c = 299\,792\,458$ m/s para qualquer observador inercial, independentemente do movimento da fonte ou do observador.

O primeiro postulado já vinha de Galileu: dentro de um avião em voo tranquilo, um copo de água se comporta como no chão, e nenhum experimento feito lá dentro mostra se o avião está "parado" ou "andando". O segundo é o que choca: se você corre atrás de um raio de luz a 99% de $c$, ele continua se afastando de você a $c$.

> [!ATENÇÃO] Na mecânica de Newton, velocidades se somam: se o trem anda a 100 km/h e você joga uma bola a 20 km/h para a frente, a plataforma vê a bola a 120 km/h. Com a luz, isso **não funciona**: a luz do farol do trem tem velocidade $c$ para o maquinista e também para quem está na plataforma. Algo tem de ceder, e o que cede são as medidas de **tempo** e de **comprimento**.

Desde 1983, o metro é **definido** a partir da velocidade da luz: é a distância que a luz percorre no vácuo em $\frac{1}{299\,792\,458}$ de segundo. Por isso o valor de $c$ é exato.

## 3. A simultaneidade é relativa

A primeira consequência dos postulados é a mais profunda: **dois eventos simultâneos para um observador podem não ser simultâneos para outro**.

Um vagão anda para a direita. Uma lâmpada no meio do vagão acende. Para o passageiro, a luz chega às duas portas, à frente e atrás, **ao mesmo tempo**: as distâncias são iguais e a luz vai a $c$ nos dois sentidos. Para quem está na plataforma, a luz também vai a $c$ nos dois sentidos, mas a porta de trás vem ao encontro da luz e a da frente foge dela. A luz chega **primeiro à porta de trás**.

> [!INTUIÇÃO] Nenhum dos dois está errado. "Ao mesmo tempo" não é uma propriedade absoluta do universo: depende do referencial. Essa é a chave para entender todos os efeitos da relatividade.

## 4. O relógio de luz e o fator de Lorentz

Um **relógio de luz** é um pulso de luz que sobe e desce entre dois espelhos separados por $L$. Para quem está junto ao relógio, cada "tique" dura $\Delta t_0 = \frac{2L}{c}$.

Se o relógio está num trem com velocidade $v$, quem está na plataforma vê a luz fazer um caminho **diagonal**, mais longo. Como a luz tem a mesma velocidade $c$ para ele, o tique demora mais. Pelo teorema de Pitágoras:
$$\left(\frac{c\,\Delta t}{2}\right)^2 = L^2 + \left(\frac{v\,\Delta t}{2}\right)^2 \quad\Rightarrow\quad \Delta t = \frac{\Delta t_0}{\sqrt{1 - \frac{v^2}{c^2}}}.$$

> [!DEFINIÇÃO] O **fator de Lorentz** é
> $$\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}.$$
> Vale 1 quando $v = 0$, cresce devagar no começo e dispara perto de $c$.

| $v$ | $\gamma$ |
|---|---|
| 300 m/s (avião) | $1{,}000\,000\,000\,000\,5$ |
| 10% de $c$ | 1,005 |
| 50% de $c$ | 1,155 |
| 87% de $c$ | 2,03 |
| 99% de $c$ | 7,09 |
| 99,99% de $c$ | 70,7 |

> [!ATENÇÃO] Nas velocidades do dia a dia, $\gamma$ é 1 com uma precisão absurda: por isso Newton funciona tão bem para carros, aviões e foguetes. A relatividade não "derruba" Newton: ela o contém como caso limite.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O experimento de Michelson e Morley mostrou que:
- a luz é mais rápida a favor do vento de éter
+ a velocidade da luz é a mesma em todas as direções
- o éter é feito de partículas
- a Terra está parada
> Não detectaram nenhum vento de éter.

? Uma nave a 0,5c acende um farol para a frente. Para um observador parado, a luz do farol viaja a:
- 1,5c
- 0,5c
+ c
- 2c
> Segundo postulado.

? Dois eventos simultâneos para um observador:
- são simultâneos para todos
+ podem não ser simultâneos para outro observador em movimento
- nunca são simultâneos para outros
- só são simultâneos se forem no mesmo lugar e para ninguém mais
> A simultaneidade é relativa.

? O fator de Lorentz a 99% da velocidade da luz é de cerca de:
- 1,01
- 2
+ 7
- 100
> $1/\sqrt{1 - 0{,}99^2} \approx 7{,}09$.

? Por que não notamos efeitos relativísticos no dia a dia?
+ porque nossas velocidades são muito menores que c, e γ fica praticamente igual a 1
- porque a relatividade só vale no espaço
- porque a Terra nos protege
- porque os efeitos só existem para a luz
> Para um avião, γ difere de 1 na 13ª casa decimal.
```

## 5. Exercícios

**1.** Calcule $\gamma$ para $v = 0{,}6\,c$ e para $v = 0{,}8\,c$.

<details>
<summary>Ver solução</summary>

$0{,}6c$: $\gamma = \frac{1}{\sqrt{1 - 0{,}36}} = \frac{1}{0{,}8} = 1{,}25$.

$0{,}8c$: $\gamma = \frac{1}{\sqrt{1 - 0{,}64}} = \frac{1}{0{,}6} \approx 1{,}67$.

</details>

**2.** Um relógio de luz tem espelhos separados por 1,5 m. Quanto dura um tique para quem está junto do relógio?

<details>
<summary>Ver solução</summary>

$\Delta t_0 = \frac{2L}{c} = \frac{3}{3\times10^8} = 10^{-8}$ s, 10 nanossegundos.

</details>

**3.** A que velocidade $\gamma = 2$?

<details>
<summary>Ver solução</summary>

$1 - \frac{v^2}{c^2} = \frac{1}{4}$, então $\frac{v}{c} = \sqrt{0{,}75} \approx 0{,}866$: cerca de 87% de $c$.

</details>
