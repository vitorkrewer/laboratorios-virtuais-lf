# O efeito fotoelétrico e o fóton

Luz batendo num metal pode arrancar elétrons. Até aí, nada estranho: a luz carrega energia. O estranho é **quais** luzes conseguem e quais não conseguem. Em 1905, o mesmo ano da relatividade, Einstein explicou o efeito supondo que a luz é feita de grãos de energia, os **fótons**. Foi por isso, e não pela relatividade, que ele ganhou o Nobel de 1921.

> [!DICA] No simulador [Efeito fotoelétrico](#/lab/fotoeletrico), mude a cor e a intensidade da luz e a tensão de freamento, e veja os elétrons saírem (ou não) da placa.

## 1. O que os experimentos mostravam

Luz incide sobre uma placa de metal dentro de um tubo a vácuo; os elétrons arrancados chegam a outra placa e formam uma corrente. Os resultados contrariavam a teoria ondulatória:

1. **Existe uma frequência mínima.** Abaixo dela, nenhum elétron sai, por mais intensa que seja a luz. Acima, saem elétrons mesmo com luz fraquíssima.
2. **A energia dos elétrons depende da frequência, não da intensidade.** Luz mais intensa arranca **mais** elétrons, mas não elétrons **mais rápidos**.
3. **Não há atraso.** Os elétrons saem imediatamente, mesmo com luz muito fraca. Pela teoria ondulatória, um elétron levaria minutos acumulando energia.

## 2. A explicação de Einstein

> [!TEOREMA] A luz de frequência $f$ é feita de **fótons** de energia $hf$. Cada fóton é absorvido por **um** elétron. Para sair do metal, o elétron gasta pelo menos a **função trabalho** $\phi$; o que sobra vira energia cinética:
> $$K_\text{máx} = hf - \phi.$$

Tudo se explica:
- Se $hf < \phi$, nenhum fóton sozinho dá conta, e mais fótons não ajudam: existe a **frequência de corte** $f_0 = \frac{\phi}{h}$.
- A intensidade é o **número** de fótons: mais fótons, mais elétrons, mesma energia por elétron.
- A troca é um evento único, fóton com elétron: não há tempo de acumulação.

| Metal | Função trabalho | Comprimento de onda de corte |
|---|---|---|
| césio | cerca de 2,1 eV | cerca de 590 nm (amarelo) |
| sódio | cerca de 2,3 eV | cerca de 540 nm (verde) |
| zinco | cerca de 4,3 eV | cerca de 290 nm (UV) |
| cobre | cerca de 4,7 eV | cerca de 260 nm (UV) |
| platina | cerca de 5,6 eV | cerca de 220 nm (UV) |

## 3. Medindo $h$: a tensão de freamento

Aplicando uma tensão contrária entre as placas, freamos os elétrons. A **tensão de freamento** $V_0$ é a que para até os mais rápidos: $e\,V_0 = K_\text{máx}$. Então
$$e\,V_0 = hf - \phi.$$
O gráfico de $V_0$ contra $f$ é uma **reta**, com inclinação $\frac{h}{e}$, a mesma para todos os metais.

> [!EXEMPLO] Robert Millikan, que não acreditava nos fótons, passou dez anos fazendo essas medidas para refutar Einstein. Em 1916, encontrou exatamente a reta prevista e o valor de $h$ de Planck. Ganhou o Nobel de 1923, em parte por esse trabalho.

## 4. A luz é onda ou partícula?

A interferência e a difração mostram que a luz é onda. O efeito fotoelétrico mostra que ela troca energia em grãos. A resposta da física quântica: **as duas coisas**. A luz se **propaga** como onda e é **absorvida e emitida** como partícula. O capítulo 9 mostra que o mesmo vale para elétrons.

Outras provas de que o fóton carrega momento $p = \frac{h}{\lambda}$:
- **Efeito Compton (1923):** raios X espalhados por elétrons saem com comprimento de onda maior, como numa colisão de bolas de bilhar.
- Velas solares são empurradas pela luz.

## 5. Onde está o efeito fotoelétrico

- **Células solares**: um fóton dá energia a um elétron no semicondutor (efeito fotovoltaico, primo do fotoelétrico).
- **Sensores de câmeras** (CCD e CMOS): cada pixel conta elétrons liberados por fótons.
- **Fotomultiplicadores**: detectam fótons isolados, como nos detectores de neutrinos.
- **Portas automáticas e sensores de luz**.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Aumentar a intensidade de uma luz abaixo da frequência de corte:
- arranca elétrons mais rápidos
- arranca elétrons depois de algum tempo
+ não arranca nenhum elétron
- derrete o metal antes
> Nenhum fóton sozinho tem energia suficiente.

? Aumentar a intensidade de uma luz acima da frequência de corte:
+ aumenta o número de elétrons, mas não a energia de cada um
- aumenta a energia de cada elétron
- não muda nada
- diminui a energia dos elétrons
> Mais fótons, mesma energia por fóton.

? Luz de 4 eV num metal com função trabalho de 2,5 eV. A energia cinética máxima é:
- 6,5 eV
+ 1,5 eV
- 4 eV
- 2,5 eV
> $K = hf - \phi$.

? O gráfico da tensão de freamento contra a frequência é uma reta cuja inclinação é:
- a função trabalho
+ h/e
- a intensidade
- c
> A mesma para todos os metais.

? Einstein ganhou o Nobel de 1921 por:
- a relatividade especial
- a relatividade geral
+ a explicação do efeito fotoelétrico
- E = mc²
> E pelos serviços à física teórica.
```

## 6. Exercícios

**1.** Luz ultravioleta de 200 nm incide sobre cobre ($\phi = 4{,}7$ eV). Qual a energia cinética máxima e a tensão de freamento?

<details>
<summary>Ver solução</summary>

$hf = \frac{1\,240}{200} = 6{,}2$ eV. $K = 6{,}2 - 4{,}7 = 1{,}5$ eV, e $V_0 = 1{,}5$ V.

</details>

**2.** A tensão de freamento de um metal é 0,5 V com luz de 450 nm. Qual a função trabalho?

<details>
<summary>Ver solução</summary>

$hf = \frac{1\,240}{450} \approx 2{,}76$ eV; $\phi = 2{,}76 - 0{,}5 \approx 2{,}26$ eV (perto do sódio).

</details>

**3.** Por que uma câmera digital "vê" a luz de um controle remoto (infravermelho de cerca de 940 nm), mas uma célula de zinco não reage a ela?

<details>
<summary>Ver solução</summary>

Cada fóton de 940 nm tem $\frac{1\,240}{940} \approx 1{,}3$ eV. O silício do sensor precisa de cerca de 1,1 eV para liberar um elétron; o zinco precisa de 4,3 eV.

</details>
