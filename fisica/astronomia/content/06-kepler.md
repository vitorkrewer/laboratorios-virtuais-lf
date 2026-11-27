# As leis de Kepler

Johannes Kepler herdou as observações de Tycho Brahe, as mais precisas da era antes do telescópio, com erros de cerca de $1'$ de arco. Tentou encaixar a órbita de Marte em círculos e sobrou uma diferença de $8'$: pouco, mas maior que o erro de Tycho. Kepler não descartou a diferença; descartou o círculo. Entre 1609 e 1619, publicou três leis que descrevem o movimento de todos os planetas.

> [!DICA] No simulador [Órbitas e Kepler](#/lab/kepler), aumente a excentricidade e ligue as "áreas iguais": as fatias varridas em tempos iguais têm a mesma área, mesmo com formatos bem diferentes.

## 1. Primeira lei: órbitas elípticas

> [!TEOREMA] **(Lei das órbitas)** Cada planeta descreve uma **elipse** com o Sol em um dos **focos**.

Revisão da elipse (veja o capítulo de elipse da [Geometria Analítica](../../matematica/geometria-analitica/#/teoria/elipse)):

| Elemento | Significado |
|---|---|
| Semieixo maior $a$ | metade do maior diâmetro; é a **distância média** ao Sol |
| Excentricidade $e$ | quão "achatada" é a elipse: $0 \le e < 1$; $e = 0$ é a circunferência |
| Periélio $r_p$ | ponto mais próximo do Sol: $r_p = a(1 - e)$ |
| Afélio $r_a$ | ponto mais distante: $r_a = a(1 + e)$ |

A excentricidade da Terra é só $0{,}0167$: a órbita é quase um círculo, com o Sol ligeiramente fora do centro. A de Marte é $0{,}093$; a do cometa Halley, $0{,}967$.

**Exemplo.** Terra: $a = 1$ UA, $e = 0{,}0167$. Periélio $0{,}983$ UA, afélio $1{,}017$ UA. A distância varia cerca de 3,4%.

## 2. Segunda lei: áreas iguais

> [!TEOREMA] **(Lei das áreas)** A linha que liga o Sol ao planeta varre **áreas iguais em tempos iguais**.

Consequência: o planeta anda **mais depressa no periélio** e mais devagar no afélio. A Terra passa pelo periélio no início de janeiro e anda um pouco mais rápido nessa época: o verão do hemisfério sul (de dezembro a março) é quase 5 dias mais curto que o inverno.

> [!INTUIÇÃO] Perto do Sol, o "raio" é curto: para varrer a mesma área, o planeta precisa percorrer um arco mais longo no mesmo tempo. É a conservação do momento angular, que Newton explicaria depois: como uma patinadora que recolhe os braços e gira mais rápido.

A razão entre as velocidades no periélio e no afélio é $\frac{v_p}{v_a} = \frac{r_a}{r_p} = \frac{1 + e}{1 - e}$.

## 3. Terceira lei: períodos e distâncias

> [!TEOREMA] **(Lei harmônica)** O quadrado do período é proporcional ao cubo do semieixo maior. Com $P$ em **anos** e $a$ em **unidades astronômicas** (UA), para planetas do Sistema Solar:
> $$P^2 = a^3$$

| Planeta | $a$ (UA) | $P$ (anos) | $a^3$ | $P^2$ |
|---|---|---|---|---|
| Mercúrio | $0{,}387$ | $0{,}241$ | $0{,}058$ | $0{,}058$ |
| Terra | $1{,}000$ | $1{,}000$ | $1{,}000$ | $1{,}000$ |
| Marte | $1{,}524$ | $1{,}881$ | $3{,}54$ | $3{,}54$ |
| Júpiter | $5{,}203$ | $11{,}86$ | $140{,}8$ | $140{,}7$ |
| Netuno | $30{,}07$ | $164{,}8$ | $27\,190$ | $27\,160$ |

**Exemplo.** Um asteroide com $a = 2{,}8$ UA tem $P = \sqrt{2{,}8^3} = \sqrt{21{,}95} \approx 4{,}7$ anos.

> [!ATENÇÃO] Na forma $P^2 = a^3$, as unidades são obrigatoriamente **anos e UA**, e a lei vale para corpos que orbitam **o Sol**. Para a Lua, satélites ou exoplanetas, use a forma geral de Newton, com a massa do corpo central (próximo capítulo).

## 4. Por que três leis?

Kepler descobriu as leis **empiricamente**, a partir dos dados, sem saber o porquê. Em 1687, Newton mostrou que as três saem de uma única hipótese: uma força de atração dirigida ao Sol que decresce com o **quadrado** da distância. A primeira lei vem da forma $\frac{1}{r^2}$; a segunda, de a força ser central (momento angular conservado); a terceira, do valor da constante $G$ e da massa do Sol.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Na primeira lei de Kepler, o Sol fica:
- no centro da elipse
+ em um dos focos da elipse
- fora da elipse
- no periélio
> Lei das órbitas.

? Um planeta anda mais depressa:
+ no periélio
- no afélio
- sempre com a mesma velocidade
- quando está mais longe do Sol
> Lei das áreas.

? Um planeta com $a = 4$ UA tem período de:
- 4 anos
- 16 anos
+ 8 anos
- 64 anos
> $P = \sqrt{4^3} = \sqrt{64}$.

? Para uma órbita com $a = 2$ UA e $e = 0{,}5$, o afélio fica a:
- 1 UA
- 2 UA
+ 3 UA
- 4 UA
> $a(1 + e)$.

? A forma $P^2 = a^3$ (anos, UA) pode ser usada para:
+ um cometa que orbita o Sol
- a Lua em torno da Terra
- um satélite artificial
- um exoplaneta de outra estrela
> Ela já embute a massa do Sol.
```

## 5. Exercícios

**1.** O cometa Halley tem período de 76 anos. Qual é o semieixo maior da órbita?

<details>
<summary>Ver solução</summary>

$a = P^{2/3} = 76^{2/3} \approx 17{,}9$ UA.

</details>

**2.** Com $e = 0{,}967$ e o resultado anterior, calcule o periélio e o afélio do Halley.

<details>
<summary>Ver solução</summary>

$r_p = 17{,}9 \times 0{,}033 \approx 0{,}59$ UA (dentro da órbita de Vênus); $r_a = 17{,}9 \times 1{,}967 \approx 35{,}2$ UA (além de Netuno).

</details>

**3.** Para Marte ($e = 0{,}093$), quanto mais rápido ele anda no periélio do que no afélio?

<details>
<summary>Ver solução</summary>

$\frac{1{,}093}{0{,}907} \approx 1{,}21$: cerca de 21% mais rápido.

</details>

**4.** Plutão tem $a = 39{,}5$ UA. Quanto dura o "ano" de Plutão?

<details>
<summary>Ver solução</summary>

$P = \sqrt{39{,}5^3} = \sqrt{61\,630} \approx 248$ anos.

</details>
