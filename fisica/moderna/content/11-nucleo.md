# O núcleo e a radioatividade

Em 1896, Henri Becquerel guardou sais de urânio numa gaveta junto com chapas fotográficas embrulhadas e, dias depois, encontrou as chapas veladas. O urânio emitia algo sozinho, sem luz e sem energia externa. Marie e Pierre Curie mostraram que era uma propriedade do átomo e descobriram o polônio e o rádio. Era a primeira janela para o **núcleo atômico** e para uma energia um milhão de vezes maior que a química.

> [!DICA] No simulador [Física nuclear](#/lab/nuclear), veja milhares de núcleos decaírem ao acaso e a curva de decaimento se formar.

## 1. O núcleo

> [!DEFINIÇÃO] O núcleo é formado por **prótons** (carga $+e$) e **nêutrons** (sem carga), os **núcleons**. Um nuclídeo é indicado por ${}^{A}_{Z}\text{X}$: $Z$ é o número atômico (prótons, define o elemento) e $A$ é o número de massa (prótons + nêutrons). **Isótopos** têm o mesmo $Z$ e $A$ diferentes.

**Exemplos:** ${}^{12}_{6}\text{C}$ e ${}^{14}_{6}\text{C}$ são isótopos do carbono; ${}^{235}_{92}\text{U}$ e ${}^{238}_{92}\text{U}$, do urânio.

O raio de um núcleo é $R \approx 1{,}2\ \text{fm} \times A^{1/3}$ (1 fm $= 10^{-15}$ m). Se o átomo fosse um estádio de futebol, o núcleo seria uma ervilha no centro do gramado, com 99,97% da massa.

## 2. A força forte e a energia de ligação

Prótons se repelem eletricamente, e muito, a distâncias tão curtas. O que os mantém juntos é a **força nuclear forte**: muito mais intensa que a elétrica, mas de alcance curtíssimo, cerca de 2 fm. Ela age entre vizinhos próximos.

> [!TEOREMA] A massa de um núcleo é **menor** que a soma das massas de seus núcleons. A diferença $\Delta m$ corresponde à **energia de ligação** $E_L = \Delta m\,c^2$.

A **energia de ligação por núcleon** cresce dos núcleos leves até um máximo de cerca de 8,8 MeV perto do **ferro e do níquel**, e cai devagar para os pesados. Daí saem as duas formas de liberar energia nuclear:
- **Fusão** de núcleos leves: sobe-se na curva.
- **Fissão** de núcleos pesados: também se sobe na curva, vindo do outro lado.

O ferro é o "fundo do poço" nuclear: é por isso que as estrelas massivas param de produzir energia quando o núcleo vira ferro.

## 3. Os três tipos de radioatividade

| Decaimento | O que sai | O que muda no núcleo | Barra |
|---|---|---|---|
| **alfa (α)** | núcleo de hélio-4 | $Z - 2$, $A - 4$ | uma folha de papel |
| **beta menos (β⁻)** | elétron e antineutrino | um nêutron vira próton: $Z + 1$ | alguns mm de alumínio |
| **beta mais (β⁺)** | pósitron e neutrino | um próton vira nêutron: $Z - 1$ | alguns mm de alumínio |
| **gama (γ)** | fóton de alta energia | só perde energia | centímetros de chumbo |

**Exemplos:**
- ${}^{238}\text{U} \to {}^{234}\text{Th} + \alpha$
- ${}^{14}\text{C} \to {}^{14}\text{N} + e^- + \bar\nu$
- No PET (tomografia por emissão de pósitrons), o flúor-18 decai por β⁺; o pósitron se aniquila com um elétron e gera dois fótons gama em sentidos opostos.

## 4. A lei do decaimento e a meia-vida

O decaimento de cada núcleo é **aleatório**: não há como saber quando um núcleo específico vai decair. Mas cada núcleo tem a mesma probabilidade por segundo de decair, e com muitos núcleos o resultado é previsível.

> [!TEOREMA] O número de núcleos que ainda não decaíram cai exponencialmente:
> $$N(t) = N_0\,e^{-\lambda t} = N_0 \left(\frac{1}{2}\right)^{t/T_{1/2}},$$
> onde $T_{1/2} = \frac{\ln 2}{\lambda}$ é a **meia-vida**: o tempo para metade dos núcleos decair.

| Nuclídeo | Meia-vida | Uso |
|---|---|---|
| tecnécio-99m | 6,0 horas | diagnóstico médico |
| iodo-131 | 8,0 dias | tratamento da tireoide |
| radônio-222 | 3,8 dias | gás natural do solo |
| cobalto-60 | 5,3 anos | radioterapia, esterilização |
| carbono-14 | 5 730 anos | datação arqueológica |
| plutônio-239 | 24 100 anos | combustível e armas |
| urânio-235 | 704 milhões de anos | combustível nuclear |
| urânio-238 | 4,47 bilhões de anos | datação de rochas |

> [!EXEMPLO] **Datação por carbono-14.** Seres vivos trocam carbono com o ambiente e mantêm a mesma fração de C-14 da atmosfera. Ao morrer, param de repor, e o C-14 decai. Um osso com 25% do C-14 original tem duas meias-vidas: cerca de 11 500 anos. O método vai até cerca de 50 000 anos.

> [!ATENÇÃO] Meia-vida não é "metade da vida": depois de duas meias-vidas, sobra **um quarto**, não zero. E não importa a idade de um núcleo: um núcleo que já existe há bilhões de anos tem a mesma chance de decair amanhã que um recém-formado.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Isótopos de um elemento têm:
+ o mesmo número de prótons e números de nêutrons diferentes
- o mesmo número de nêutrons
- números de prótons diferentes
- a mesma massa
> Z igual, A diferente.

? No decaimento alfa, o número atômico:
- aumenta 1
+ diminui 2
- diminui 4
- não muda
> Sai um núcleo de hélio: 2 prótons e 2 nêutrons.

? Depois de três meias-vidas, sobra:
- 1/3 da amostra
- nada
+ 1/8 da amostra
- 1/6 da amostra
> $(1/2)^3$.

? A energia de ligação por núcleon é máxima perto do:
- hidrogênio
- urânio
+ ferro
- hélio
> Cerca de 8,8 MeV.

? A radiação mais penetrante é a:
- alfa
- beta
+ gama
- todas igualmente
> Exige centímetros de chumbo.
```

## 5. Exercícios

**1.** Uma amostra de iodo-131 tem atividade de 800 MBq. Quanto terá depois de 24 dias?

<details>
<summary>Ver solução</summary>

24 dias = 3 meias-vidas: $800 \times \frac{1}{8} = 100$ MBq.

</details>

**2.** Um pedaço de madeira tem 1/16 do C-14 de uma árvore viva. Qual a idade?

<details>
<summary>Ver solução</summary>

4 meias-vidas: $4 \times 5\,730 \approx 22\,900$ anos.

</details>

**3.** Complete: ${}^{226}_{88}\text{Ra} \to \ ?\ + \alpha$.

<details>
<summary>Ver solução</summary>

$Z = 86$, $A = 222$: ${}^{222}_{86}\text{Rn}$, o radônio.

</details>
