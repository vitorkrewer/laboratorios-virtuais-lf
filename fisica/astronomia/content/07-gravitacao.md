# Gravitação de Newton e órbitas

A mesma força que derruba uma maçã mantém a Lua em órbita. Essa foi a grande ideia de Newton: uma única lei, válida na Terra e no céu. Com ela, as leis de Kepler deixam de ser regras observadas e viram consequências, e passamos a poder **pesar** o Sol, planetas e estrelas distantes.

> [!DICA] No simulador [Órbitas e Kepler](#/lab/kepler), modo "Canhão de Newton": aumente a velocidade de lançamento até o projétil não cair mais, e depois até escapar.

## 1. A lei da gravitação universal

> [!TEOREMA] Dois corpos de massas $M$ e $m$, a uma distância $r$ entre os centros, se atraem com força
> $$F = \frac{G\,M\,m}{r^2}, \qquad G = 6{,}674 \times 10^{-11}\ \text{N·m}^2/\text{kg}^2.$$

- A força é **mútua**: a Terra puxa a Lua com a mesma força com que a Lua puxa a Terra (terceira lei de Newton).
- Ela cai com o **quadrado** da distância: a $2r$, a força é $\frac14$; a $10r$, $\frac{1}{100}$.
- Para corpos esféricos, tudo se passa como se a massa estivesse concentrada no centro.

**A gravidade na superfície.** Para um corpo de massa $M$ e raio $R$, a aceleração da gravidade é $g = \frac{GM}{R^2}$. Para a Terra: $\frac{6{,}674\times10^{-11}\cdot 5{,}97\times10^{24}}{(6{,}371\times10^{6})^2} \approx 9{,}8\ \text{m/s}^2$.

## 2. A Lua cai

Newton comparou a queda da maçã com a da Lua. A Lua está a cerca de **60 raios terrestres**, então a gravidade lá deve ser $\frac{1}{60^2} = \frac{1}{3600}$ da gravidade na superfície: $\frac{9{,}8}{3600} \approx 2{,}7\times10^{-3}\ \text{m/s}^2$. A aceleração centrípeta da Lua, calculada pelo período e pela distância, é $\frac{4\pi^2 r}{T^2} = \frac{4\pi^2 \cdot 3{,}84\times10^{8}}{(27{,}3 \cdot 86\,400)^2} \approx 2{,}7\times10^{-3}\ \text{m/s}^2$. Os números batem.

> [!INTUIÇÃO] Uma órbita é uma **queda que nunca termina**. A Lua está caindo em direção à Terra o tempo todo, mas anda tão depressa para o lado que a superfície da Terra "foge" por baixo dela na mesma medida.

## 3. Velocidades orbitais

**Órbita circular.** Igualando a gravidade à força centrípeta, $\frac{GMm}{r^2} = \frac{mv^2}{r}$:
$$v_\text{circ} = \sqrt{\frac{GM}{r}}$$

**Velocidade de escape.** A velocidade mínima para nunca mais voltar, sem propulsão, sai da conservação de energia ($\frac12 mv^2 = \frac{GMm}{r}$):
$$v_\text{esc} = \sqrt{\frac{2GM}{r}} = \sqrt2\,v_\text{circ}$$

| Situação | Valor |
|---|---|
| Órbita baixa da Terra (400 km de altura) | $7{,}7$ km/s, uma volta a cada 92 min |
| Escape da superfície da Terra | $11{,}2$ km/s |
| Velocidade da Terra em volta do Sol | $29{,}8$ km/s |
| Escape da superfície do Sol | $618$ km/s |

> [!ATENÇÃO] Na Estação Espacial, a 400 km de altura, a gravidade ainda é cerca de **89%** da que temos no chão. Os astronautas flutuam porque estão em **queda livre** junto com a estação, não porque "não há gravidade".

## 4. A terceira lei de Kepler, completa

Para uma órbita de semieixo maior $a$ e período $P$ em torno de um corpo de massa $M$ (com $m \ll M$):
$$P^2 = \frac{4\pi^2}{G M}\,a^3$$

Essa é a forma universal: vale para planetas, luas, satélites e exoplanetas. Com $M = M_\odot$, anos e UA, ela vira $P^2 = a^3$.

**Pesar o Sol.** Com $a = 1{,}496\times10^{11}$ m e $P = 3{,}156\times10^{7}$ s:
$$M_\odot = \frac{4\pi^2 a^3}{G P^2} \approx 2{,}0\times10^{30}\ \text{kg}.$$
O mesmo método dá a massa de Júpiter pelas luas dele, e a de estrelas pelos seus exoplanetas ou estrelas companheiras.

**Órbita geoestacionária.** Um satélite com período de um dia sideral (86 164 s) fica parado sobre o mesmo ponto do equador. Com $M = 5{,}97\times10^{24}$ kg: $a = \left(\frac{GMP^2}{4\pi^2}\right)^{1/3} \approx 42\,160$ km do centro, ou cerca de **35 790 km de altitude**.

## 5. Energia e forma da órbita

Somando a energia cinética e a potencial, $E = \frac12 mv^2 - \frac{GMm}{r}$:

| Energia total | Órbita |
|---|---|
| $E < 0$ | presa: **elipse** (círculo como caso particular) |
| $E = 0$ | **parábola**: escapa no limite |
| $E > 0$ | **hipérbole**: passa e não volta |

As três são **cônicas**, as mesmas curvas da Geometria Analítica. Para a elipse, a velocidade em qualquer ponto é dada pela equação **vis-viva**:
$$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se a distância entre dois corpos triplica, a força gravitacional fica:
- 3 vezes menor
+ 9 vezes menor
- 3 vezes maior
- igual
> Lei do inverso do quadrado.

? A velocidade de escape é maior que a velocidade de órbita circular, no mesmo raio, por um fator:
- 2
+ $\sqrt2$
- 4
- $\frac12$
> $v_\text{esc} = \sqrt{2GM/r}$.

? Os astronautas flutuam na Estação Espacial porque:
- lá não há gravidade
+ estão em queda livre junto com a estação
- estão fora da atmosfera
- a Lua os atrai
> A gravidade lá é cerca de 89% da do chão.

? Para descobrir a massa de Júpiter, basta conhecer:
+ o período e o semieixo da órbita de uma de suas luas
- o raio de Júpiter
- a distância de Júpiter ao Sol
- o período de rotação de Júpiter
> Terceira lei de Kepler na forma de Newton.

? Uma sonda com energia total positiva em relação ao Sol segue uma:
- elipse
- circunferência
- parábola
+ hipérbole
> Escapa e não volta.
```

## 6. Exercícios

**1.** Calcule a gravidade na superfície de Marte: $M = 6{,}42\times10^{23}$ kg, $R = 3\,390$ km.

<details>
<summary>Ver solução</summary>

$g = \frac{6{,}674\times10^{-11}\cdot6{,}42\times10^{23}}{(3{,}39\times10^{6})^2} = \frac{4{,}28\times10^{13}}{1{,}149\times10^{13}} \approx 3{,}7\ \text{m/s}^2$.

</details>

**2.** Calcule a velocidade de escape da Lua: $M = 7{,}35\times10^{22}$ kg, $R = 1\,737$ km.

<details>
<summary>Ver solução</summary>

$v = \sqrt{\frac{2\cdot6{,}674\times10^{-11}\cdot7{,}35\times10^{22}}{1{,}737\times10^{6}}} = \sqrt{5{,}65\times10^{6}} \approx 2{,}38$ km/s.

</details>

**3.** Io orbita Júpiter a $a = 421\,700$ km com período de $1{,}769$ dia. Estime a massa de Júpiter.

<details>
<summary>Ver solução</summary>

$P = 1{,}528\times10^{5}$ s. $M = \frac{4\pi^2(4{,}217\times10^{8})^3}{6{,}674\times10^{-11}(1{,}528\times10^{5})^2} = \frac{39{,}48\cdot7{,}50\times10^{25}}{1{,}558\times10^{0}} \approx 1{,}90\times10^{27}$ kg, cerca de 318 massas terrestres.

</details>

**4.** Use a vis-viva para achar a velocidade da Terra no periélio ($r = 0{,}983$ UA). Dados: $GM_\odot = 1{,}327\times10^{20}\ \text{m}^3/\text{s}^2$, $1$ UA $= 1{,}496\times10^{11}$ m.

<details>
<summary>Ver solução</summary>

$v^2 = 1{,}327\times10^{20}\left(\frac{2}{1{,}4706\times10^{11}} - \frac{1}{1{,}496\times10^{11}}\right) = 1{,}327\times10^{20}\cdot 6{,}916\times10^{-12} \approx 9{,}18\times10^{8}$, $v \approx 30{,}3$ km/s.

</details>
