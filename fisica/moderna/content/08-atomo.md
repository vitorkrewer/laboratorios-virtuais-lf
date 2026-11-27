# O átomo de Bohr e os espectros

Cada elemento químico, quando aquecido ou atravessado por uma descarga elétrica, emite luz em cores muito específicas: um **espectro de linhas**, uma impressão digital. É com ele que sabemos do que são feitas as estrelas. Explicar essas linhas exigiu um novo modelo de átomo, com órbitas permitidas e saltos de energia.

> [!DICA] No simulador [Átomo e espectros](#/lab/espectros), excite o elétron do hidrogênio e veja cada salto produzir uma linha no espectro.

## 1. O núcleo de Rutherford

Em 1909, Hans Geiger e Ernest Marsden, alunos de Ernest Rutherford, atiraram partículas alfa contra uma folha fina de ouro. Quase todas atravessaram, mas cerca de 1 em 8 000 voltou para trás. Rutherford comparou a surpresa a uma bala de canhão ricocheteando num lenço de papel. Conclusão (1911): toda a carga positiva e quase toda a massa do átomo ficam num **núcleo** minúsculo, cerca de 100 000 vezes menor que o átomo.

> [!ATENÇÃO] O modelo "planetário" tinha um problema grave: pela física clássica, um elétron girando em volta do núcleo é uma carga acelerada, que emite radiação, perde energia e cai em espiral no núcleo em cerca de $10^{-11}$ s. Os átomos não deveriam existir.

## 2. As linhas do hidrogênio

O hidrogênio emite no visível quatro linhas, a **série de Balmer**:

| Linha | Cor | $\lambda$ |
|---|---|---|
| H-alfa | vermelho | 656,3 nm |
| H-beta | ciano | 486,1 nm |
| H-gama | azul | 434,0 nm |
| H-delta | violeta | 410,2 nm |

Em 1885, Johann Balmer, professor de escola, encontrou uma fórmula que dava todas, e Johannes Rydberg a generalizou:
$$\frac{1}{\lambda} = R\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \qquad R \approx 1{,}097\times10^{7}\ \text{m}^{-1}.$$
Balmer tem $n_1 = 2$. Com $n_1 = 1$, a série de **Lyman**, no ultravioleta; com $n_1 = 3$, a de **Paschen**, no infravermelho.

## 3. O modelo de Bohr (1913)

> [!TEOREMA] **Postulados de Bohr:**
> 1. O elétron só ocupa certas órbitas, os **estados estacionários**, nas quais não irradia.
> 2. Ao passar de um estado de energia $E_i$ para um de energia menor $E_f$, emite **um fóton** com $hf = E_i - E_f$. Para subir, absorve um fóton com exatamente essa energia.
>
> No hidrogênio, as energias permitidas são
> $$E_n = -\frac{13{,}6\ \text{eV}}{n^2}, \qquad n = 1, 2, 3, \dots$$
> e os raios das órbitas, $r_n = n^2 a_0$, com $a_0 = 0{,}0529$ nm (raio de Bohr).

- $n = 1$ é o **estado fundamental**: $-13{,}6$ eV.
- A energia negativa significa que o elétron está **preso**. Com $13{,}6$ eV, ele escapa: é a **energia de ionização**.
- Os níveis se acumulam perto de zero quando $n$ cresce.

**Conferindo H-alfa** ($3 \to 2$): $\Delta E = 13{,}6\left(\frac{1}{4} - \frac{1}{9}\right) = 1{,}89$ eV, e $\lambda = \frac{1\,240}{1{,}89} \approx 656$ nm. A fórmula de Rydberg sai do modelo, com $R$ calculado a partir de $h$, $e$, $m_e$ e $c$.

> [!INTUIÇÃO] Os níveis de energia são como os degraus de uma escada com alturas fixas: o elétron só pode estar num degrau, nunca entre dois. Cada pulo para baixo solta um fóton com a energia exata da altura do pulo, e por isso só certas cores aparecem.

## 4. Emissão e absorção

- **Espectro de emissão:** gás quente e rarefeito emite linhas brilhantes sobre fundo escuro.
- **Espectro de absorção:** luz contínua atravessando um gás mais frio perde exatamente as mesmas cores: linhas escuras sobre o arco-íris.

As linhas escuras do Sol (linhas de Fraunhofer) revelaram hidrogênio, sódio, ferro, cálcio... e um elemento desconhecido em 1868, batizado de **hélio** (de *hélios*, Sol), só encontrado na Terra 27 anos depois.

## 5. Limites do modelo e aplicações

O modelo de Bohr acerta o hidrogênio (e íons com um elétron, como He⁺, com $E_n = -13{,}6\,\frac{Z^2}{n^2}$ eV), mas falha para átomos com mais elétrons, não explica a intensidade das linhas nem por que as órbitas são estáveis. A mecânica quântica (capítulo 10) substituiu as órbitas por **orbitais**, mas manteve os níveis de energia.

Os níveis explicam:
- **lâmpadas de sódio** (amarelas) e **letreiros de neônio** (vermelho-alaranjados);
- **fogos de artifício**: estrôncio vermelho, bário verde, cobre azul;
- **lasers**: muitos átomos levados ao mesmo nível excitado descem juntos, em fase.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O experimento de Geiger e Marsden mostrou que o átomo tem:
- carga espalhada uniformemente
+ um núcleo minúsculo, denso e positivo
- elétrons no centro
- tamanho zero
> Algumas partículas alfa voltavam para trás.

? A energia do nível n = 2 do hidrogênio é:
- −13,6 eV
+ −3,4 eV
- −6,8 eV
- 0 eV
> $-13{,}6/4$.

? A linha H-alfa (vermelha) corresponde ao salto:
- 2 → 1
+ 3 → 2
- 4 → 2
- 3 → 1
> 1,89 eV, 656 nm.

? Saltos que terminam em n = 1 (série de Lyman) emitem:
+ ultravioleta
- vermelho
- infravermelho
- rádio
> São os saltos de maior energia.

? Linhas escuras no espectro do Sol indicam:
- regiões sem luz
+ elementos no gás mais frio que absorvem cores específicas
- erros do instrumento
- planetas em trânsito
> Espectro de absorção.
```

## 6. Exercícios

**1.** Calcule o comprimento de onda da linha H-beta ($4 \to 2$).

<details>
<summary>Ver solução</summary>

$\Delta E = 13{,}6\left(\frac{1}{4} - \frac{1}{16}\right) = 2{,}55$ eV; $\lambda = \frac{1\,240}{2{,}55} \approx 486$ nm.

</details>

**2.** Qual o maior comprimento de onda da série de Lyman? Está no visível?

<details>
<summary>Ver solução</summary>

$2 \to 1$: $\Delta E = 13{,}6 \times \frac{3}{4} = 10{,}2$ eV; $\lambda \approx 122$ nm. Ultravioleta.

</details>

**3.** Qual é a energia de ionização do He⁺?

<details>
<summary>Ver solução</summary>

$13{,}6 \times Z^2 = 13{,}6 \times 4 = 54{,}4$ eV.

</details>
