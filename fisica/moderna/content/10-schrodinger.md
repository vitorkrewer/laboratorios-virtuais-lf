# A função de onda e a equação de Schrödinger

Se partículas são ondas, precisam de uma equação de onda. Erwin Schrödinger a escreveu em 1926. A solução dela, a **função de onda** $\psi$, não diz onde a partícula está: diz a **probabilidade** de encontrá-la em cada lugar. Com ela vêm a quantização da energia sem postulados extras, o tunelamento e os orbitais que explicam a tabela periódica.

> [!DICA] No simulador [Mecânica quântica](#/lab/quantica), solte um pacote de onda contra uma barreira e veja parte dele atravessar, ou monte superposições de estados numa caixa.

## 1. A função de onda e a regra de Born

> [!DEFINIÇÃO] A **função de onda** $\psi(x, t)$ descreve o estado de uma partícula. A probabilidade de encontrá-la entre $x$ e $x + dx$ é
> $$|\psi(x, t)|^2\,dx.$$
> É a **regra de Born** (1926). A soma de todas as probabilidades é 1: $\int |\psi|^2\,dx = 1$.

A equação de Schrödinger diz como $\psi$ evolui no tempo, a partir da energia potencial $V(x)$:
$$i\hbar\,\frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m}\,\frac{\partial^2 \psi}{\partial x^2} + V(x)\,\psi.$$

> [!ATENÇÃO] A evolução de $\psi$ é perfeitamente determinística. O acaso aparece na **medida**: ao medir a posição, obtemos um resultado aleatório, com probabilidades $|\psi|^2$. Depois da medida, o estado muda para refletir o resultado.

## 2. A partícula numa caixa

Um elétron preso entre duas paredes impenetráveis separadas por $L$: a onda tem de se anular nas paredes, como uma corda de violão presa nas pontas. Só cabem números inteiros de meias-ondas.

> [!TEOREMA] Na caixa de largura $L$, as energias permitidas são
> $$E_n = \frac{n^2\,h^2}{8\,m\,L^2}, \qquad n = 1, 2, 3, \dots$$
> e $\psi_n(x) = \sqrt{\frac{2}{L}}\,\sin\frac{n\pi x}{L}$.

Três lições:
- A energia é **quantizada** naturalmente, pelas condições de contorno.
- A energia mínima **não é zero**: a partícula nunca fica parada (incerteza).
- No estado $n = 2$, a probabilidade de encontrar a partícula **exatamente no meio** da caixa é zero.

Uma **superposição** de dois estados, como $\psi_1 + \psi_2$, não é estacionária: a densidade de probabilidade **oscila** de um lado para o outro com frequência $\frac{E_2 - E_1}{h}$. É assim que átomos emitem luz nessa frequência.

## 3. O tunelamento

Uma bola sem energia para subir um morro volta. Uma partícula quântica diante de uma barreira de energia maior que a dela tem uma probabilidade de **aparecer do outro lado**: a função de onda não se anula dentro da barreira, só decai exponencialmente. Se a barreira é fina, sobra um pouco de onda do outro lado.

> [!EXEMPLO] O tunelamento está em toda parte:
> - **Decaimento alfa**: a partícula alfa escapa do núcleo atravessando a barreira de energia que a prende (Gamow, 1928).
> - **Fusão no Sol**: prótons não teriam energia para vencer a repulsão elétrica; tunelam.
> - **Memórias flash** (pendrives, SSDs): elétrons tunelam através de um isolante para gravar bits.
> - **Microscópio de tunelamento** (1981): mede a corrente de tunelamento entre uma ponta e a superfície e "vê" átomos individuais.

A probabilidade cai muito depressa com a largura e a altura da barreira: dobrar a largura pode reduzi-la milhares de vezes.

## 4. Do hidrogênio à tabela periódica

Resolvendo a equação de Schrödinger para o elétron do hidrogênio, saem as mesmas energias de Bohr, $E_n = -\frac{13{,}6}{n^2}$ eV, mas no lugar de órbitas aparecem **orbitais**: nuvens de probabilidade com formas definidas, rotuladas por **números quânticos**:
- $n$ (principal): energia e tamanho;
- $\ell$ (de 0 a $n - 1$): forma (s, p, d, f);
- $m_\ell$: orientação;
- $m_s$ (spin, $\pm\frac{1}{2}$): uma propriedade magnética intrínseca, sem análogo clássico.

> [!TEOREMA] **Princípio de exclusão de Pauli:** dois elétrons de um átomo não podem ter os quatro números quânticos iguais.

Por isso os elétrons não se amontoam todos no nível mais baixo: preenchem camadas, e a camada mais externa decide a química do elemento. A tabela periódica é uma consequência da equação de Schrödinger e do princípio de Pauli. É o mesmo princípio que sustenta as anãs brancas e as estrelas de nêutrons.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Segundo a regra de Born, $|\psi|^2$ é:
- a energia da partícula
+ a densidade de probabilidade de encontrar a partícula
- a velocidade da partícula
- a carga elétrica
> Born, 1926.

? Na caixa, se a largura L dobra, a energia do estado fundamental:
- dobra
- cai pela metade
+ cai para um quarto
- não muda
> $E \propto 1/L^2$.

? A energia mínima de uma partícula numa caixa é:
- zero
+ maior que zero
- infinita
- negativa
> A partícula nunca fica parada.

? O tunelamento permite que uma partícula:
+ atravesse uma barreira de energia maior que a dela
- viaje mais rápido que a luz
- crie energia do nada
- fique parada
> A função de onda decai, mas não se anula, dentro da barreira.

? O princípio de exclusão de Pauli explica:
- o tunelamento
+ a estrutura em camadas dos átomos e a tabela periódica
- a dilatação do tempo
- o efeito fotoelétrico
> Elétrons não podem ter todos os números quânticos iguais.
```

## 5. Exercícios

**1.** Um elétron numa caixa de 1 nm. Calcule $E_1$ e $E_2$ em eV e o comprimento de onda do fóton emitido no salto $2 \to 1$.

<details>
<summary>Ver solução</summary>

$E_1 = \frac{h^2}{8 m L^2} = \frac{(6{,}63\times10^{-34})^2}{8 \times 9{,}11\times10^{-31} \times 10^{-18}} \approx 6{,}0\times10^{-20}$ J $\approx 0{,}38$ eV. $E_2 = 4E_1 \approx 1{,}5$ eV. $\Delta E \approx 1{,}13$ eV; $\lambda \approx \frac{1\,240}{1{,}13} \approx 1\,100$ nm. É assim que os **pontos quânticos** escolhem a cor pelo tamanho.

</details>

**2.** Quantos elétrons cabem na camada $n = 2$?

<details>
<summary>Ver solução</summary>

$\ell = 0$ (1 orbital) e $\ell = 1$ (3 orbitais): 4 orbitais × 2 spins = 8 elétrons.

</details>
