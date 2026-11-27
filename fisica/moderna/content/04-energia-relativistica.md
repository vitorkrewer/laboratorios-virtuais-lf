# Massa, energia e momento

Se o tempo e o espaço mudam com a velocidade, a energia e o momento também precisam mudar, para que as leis de conservação continuem valendo em todos os referenciais. O resultado mais famoso da física sai daqui: $E = mc^2$. Ele diz que massa é uma forma de energia, e explica por que nada com massa alcança a velocidade da luz.

## 1. Momento relativístico

> [!DEFINIÇÃO] O **momento relativístico** de uma partícula de massa $m$ e velocidade $v$ é
> $$p = \gamma\,m\,v.$$
> Para $v \ll c$, $\gamma \approx 1$ e volta ao $p = mv$ de Newton.

Perto de $c$, $\gamma$ dispara, e o momento cresce sem limite. Por isso, empurrar uma partícula com força constante a aproxima de $c$ cada vez mais devagar, sem nunca alcançá-la.

## 2. Energia de repouso e energia total

> [!TEOREMA] A **energia total** de uma partícula é
> $$E = \gamma\,m\,c^2.$$
> Parada ($\gamma = 1$), ela ainda tem a **energia de repouso** $E_0 = mc^2$. A **energia cinética** é o que sobra: $K = (\gamma - 1)\,mc^2$.

Para $v \ll c$, $\gamma - 1 \approx \frac{1}{2}\frac{v^2}{c^2}$, e $K \approx \frac{1}{2}mv^2$: de novo, Newton aparece como caso limite.

> [!ATENÇÃO] Na física moderna, $m$ é a massa **de repouso**, a mesma em todos os referenciais. A ideia antiga de uma "massa relativística" que cresce com a velocidade caiu em desuso: o que cresce é a energia e o momento.

## 3. A relação energia-momento

> [!TEOREMA] $$E^2 = (pc)^2 + (mc^2)^2.$$

- Partícula parada: $p = 0$ e $E = mc^2$.
- Partícula sem massa, como o **fóton**: $m = 0$ e $E = pc$. A luz carrega momento (é o que empurra as velas solares) e sempre viaja a $c$.

## 4. A unidade elétron-volt

Na física de partículas, as energias se medem em **elétron-volts**: $1$ eV é a energia que um elétron ganha ao atravessar uma diferença de potencial de 1 V, $1{,}602\times10^{-19}$ J. Massas são dadas em $\text{eV}/c^2$.

| Partícula | Energia de repouso |
|---|---|
| elétron | 0,511 MeV |
| múon | 105,7 MeV |
| próton | 938,3 MeV |
| nêutron | 939,6 MeV |
| bóson de Higgs | cerca de 125 GeV |

No LHC, prótons chegam a 6,8 TeV, com $\gamma \approx 7\,000$: a apenas cerca de 3 m/s abaixo da velocidade da luz.

## 5. Massa vira energia (e vice-versa)

O fator $c^2$ é enorme: **1 grama** de massa equivale a $9\times10^{13}$ J, a energia de cerca de 21 mil toneladas de TNT.

> [!EXEMPLO] **Energia de ligação.** Um núcleo de hélio-4 tem **menos** massa que dois prótons e dois nêutrons separados. A diferença, $\Delta m \approx 0{,}0304$ u, corresponde a $\Delta m\,c^2 \approx 28{,}3$ MeV: a energia liberada quando o núcleo se forma, e a que seria preciso fornecer para desmontá-lo.

Toda energia de ligação tem massa: uma pilha carregada pesa mais que descarregada, e uma mola comprimida, mais que solta. Só que nas reações químicas a diferença é de partes por bilhão; nas nucleares, de partes por mil, um milhão de vezes mais. O processo inverso também acontece: num acelerador, energia de movimento vira **pares partícula-antipartícula** que não existiam antes.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A energia de repouso de um elétron é de cerca de:
- 1 eV
+ 0,511 MeV
- 938 MeV
- 125 GeV
> $m_e c^2$.

? Uma partícula a 0,6c (γ = 1,25) tem energia cinética igual a:
+ 0,25 mc²
- 1,25 mc²
- 0,18 mc²
- mc²
> $K = (\gamma - 1)mc^2$.

? Um fóton tem massa zero. Então:
- não tem energia
- não tem momento
+ tem E = pc e viaja sempre a c
- viaja mais devagar que c
> Pela relação energia-momento.

? Por que nada com massa alcança a velocidade da luz?
- porque o ar freia
+ porque a energia necessária cresce sem limite quando v se aproxima de c
- porque a massa diminui
- porque o tempo para
> $E = \gamma mc^2$ e $\gamma \to \infty$.

? Na formação de um núcleo de hélio a partir de prótons e nêutrons:
- a massa aumenta
+ a massa diminui e a diferença sai como energia
- a massa fica igual
- a energia é absorvida
> Energia de ligação.
```

## 6. Exercícios

**1.** Um elétron é acelerado por 1 MV. Qual é seu $\gamma$?

<details>
<summary>Ver solução</summary>

$K = 1$ MeV. $\gamma = 1 + \frac{K}{mc^2} = 1 + \frac{1}{0{,}511} \approx 2{,}96$, e $v \approx 0{,}94\,c$.

</details>

**2.** Qual é a energia (em joules) de 1 kg de matéria aniquilada por 1 kg de antimatéria?

<details>
<summary>Ver solução</summary>

$E = 2\,\text{kg} \times (3\times10^8)^2 = 1{,}8\times10^{17}$ J, cerca de 43 megatons de TNT.

</details>

**3.** Calcule o momento de um fóton de luz verde (energia 2,3 eV).

<details>
<summary>Ver solução</summary>

$p = \frac{E}{c} = \frac{2{,}3 \times 1{,}602\times10^{-19}}{3\times10^8} \approx 1{,}2\times10^{-27}$ kg·m/s.

</details>
