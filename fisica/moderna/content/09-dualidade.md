# Ondas de matéria e o princípio da incerteza

Se a luz, que parecia onda, também se comporta como partícula, será que partículas, como o elétron, também se comportam como ondas? Louis de Broglie propôs que sim em 1924, na tese de doutorado. Três anos depois, elétrons produziram padrões de interferência. O experimento da dupla fenda com partículas isoladas é, nas palavras de Richard Feynman, o coração da mecânica quântica.

> [!DICA] No simulador [Dupla fenda](#/lab/fenda), dispare elétrons um a um e veja o padrão de interferência se formar ponto por ponto. Depois ligue o detector nas fendas.

## 1. O comprimento de onda de de Broglie

> [!TEOREMA] Toda partícula com momento $p$ tem associada uma onda de comprimento
> $$\lambda = \frac{h}{p} = \frac{h}{mv}.$$

| Objeto | Velocidade | $\lambda$ |
|---|---|---|
| bola de futebol (0,43 kg) | 20 m/s | $8\times10^{-35}$ m |
| grão de poeira (1 µg) | 1 mm/s | $7\times10^{-22}$ m |
| elétron acelerado por 100 V | 5 900 km/s | 0,12 nm |
| nêutron térmico | 2,2 km/s | 0,18 nm |

Para objetos do dia a dia, $\lambda$ é trilhões de vezes menor que um próton: nenhum efeito ondulatório é observável. Para elétrons, $\lambda$ é do tamanho de átomos.

> [!EXEMPLO] Em 1927, Clinton Davisson e Lester Germer (EUA) e George Paget Thomson (Reino Unido) observaram a **difração de elétrons** por cristais, exatamente com o $\lambda$ previsto. Curiosidade: J. J. Thomson ganhou o Nobel por mostrar que o elétron é uma partícula; seu filho G. P. Thomson ganhou por mostrar que ele é uma onda. Os **microscópios eletrônicos** usam esse comprimento de onda curto para ver detalhes de átomos.

## 2. A dupla fenda, um elétron por vez

Dispare elétrons, **um de cada vez**, contra uma parede com duas fendas estreitas, e registre onde cada um chega numa tela:

1. Cada elétron chega num **ponto**, como partícula.
2. Os primeiros pontos parecem aleatórios.
3. Com milhares de elétrons, os pontos formam **franjas de interferência**, como as de uma onda passando pelas duas fendas.

Cada elétron, sozinho, interfere consigo mesmo. A posição de cada chegada é imprevisível; só a **distribuição** é determinada.

> [!ATENÇÃO] Se colocarmos um detector para saber **por qual fenda** cada elétron passou, as franjas **desaparecem** e sobra a soma de duas manchas, como se fossem bolinhas. Obter a informação do caminho destrói a interferência. Não é falha do detector: é uma propriedade fundamental.

O experimento foi feito com fótons, elétrons, nêutrons, átomos e até moléculas com mais de 2 000 átomos.

## 3. O princípio da incerteza

> [!TEOREMA] **Princípio da incerteza de Heisenberg (1927):**
> $$\Delta x\,\Delta p \geq \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi} \approx 1{,}055\times10^{-34}\ \text{J·s}.$$
> Não é possível conhecer ao mesmo tempo, com precisão arbitrária, a posição e o momento de uma partícula.

> [!INTUIÇÃO] Uma onda com comprimento de onda bem definido (momento preciso) se estende por muito espaço; um pulso bem localizado (posição precisa) é feito da soma de muitos comprimentos de onda (momento impreciso). Não é falta de bons instrumentos: é como as ondas são.

**Consequências:**
- Um elétron preso num átomo ($\Delta x \sim 0{,}1$ nm) tem $\Delta p$ mínimo, logo uma energia cinética mínima de alguns eV. Ele não pode cair no núcleo: **a incerteza explica a estabilidade dos átomos**.
- Há também uma relação entre energia e tempo, $\Delta E\,\Delta t \gtrsim \frac{\hbar}{2}$: estados que vivem pouco têm energia imprecisa, e suas linhas espectrais são mais largas.

## 4. Complementaridade

Niels Bohr resumiu: onda e partícula são **aspectos complementares**. O arranjo experimental decide qual aparece; nenhum experimento mostra os dois ao mesmo tempo. A pergunta "o elétron é onda ou partícula?" não tem resposta fora de um experimento específico.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O comprimento de onda de de Broglie de uma partícula é:
+ h/p
- p/h
- hp
- h/E
> Proposto em 1924.

? Por que não vemos uma bola de futebol difratar?
- porque ela não tem momento
+ porque seu comprimento de onda é absurdamente pequeno
- porque ela é feita de muitos átomos
- porque a gravidade impede
> Cerca de $10^{-34}$ m.

? Na dupla fenda com elétrons enviados um a um:
- não há interferência
+ cada elétron chega num ponto, e as franjas surgem com muitos elétrons
- cada elétron se divide em dois
- os elétrons chegam só atrás das fendas
> A distribuição é ondulatória, as chegadas são pontuais.

? Ao detectar por qual fenda cada elétron passa:
- as franjas ficam mais nítidas
+ as franjas desaparecem
- os elétrons param
- nada muda
> A informação de caminho destrói a interferência.

? O princípio da incerteza diz que:
- os instrumentos sempre têm erro
+ posição e momento não podem ser ambos precisos ao mesmo tempo
- a energia não se conserva
- os elétrons não existem
> $\Delta x \Delta p \geq \hbar/2$.
```

## 5. Exercícios

**1.** Calcule o comprimento de onda de um elétron acelerado por 100 V.

<details>
<summary>Ver solução</summary>

$K = 100$ eV $= 1{,}6\times10^{-17}$ J. $p = \sqrt{2mK} = \sqrt{2 \times 9{,}11\times10^{-31} \times 1{,}6\times10^{-17}} \approx 5{,}4\times10^{-24}$ kg·m/s. $\lambda = \frac{6{,}63\times10^{-34}}{5{,}4\times10^{-24}} \approx 1{,}2\times10^{-10}$ m = 0,12 nm.

</details>

**2.** Um elétron está confinado numa região de 0,1 nm. Estime a incerteza mínima no momento e a velocidade correspondente.

<details>
<summary>Ver solução</summary>

$\Delta p \geq \frac{1{,}055\times10^{-34}}{2 \times 10^{-10}} \approx 5\times10^{-25}$ kg·m/s; $\Delta v = \frac{\Delta p}{m} \approx 5{,}8\times10^{5}$ m/s, cerca de 580 km/s.

</details>

**3.** Uma bola de 0,1 kg está localizada com precisão de 1 µm. Qual a incerteza mínima na velocidade?

<details>
<summary>Ver solução</summary>

$\Delta v \geq \frac{1{,}055\times10^{-34}}{2 \times 10^{-6} \times 0{,}1} \approx 5\times10^{-28}$ m/s. Totalmente desprezível.

</details>
