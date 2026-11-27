# Exoplanetas

Até 1995, não se conhecia nenhum planeta em volta de outra estrela como o Sol. Em outubro de 2026, o arquivo de exoplanetas da NASA já listava mais de **6 400** planetas confirmados, com milhares de candidatos à espera. A maioria nunca foi "vista": foi deduzida pelo efeito que causa na luz da estrela. Este capítulo junta quase tudo o que o livro ensinou: gravitação, Kepler, espectros e Doppler.

> [!DICA] No simulador [Órbitas e Kepler](#/lab/kepler), modo "Exoplaneta": o planeta passa na frente da estrela e o gráfico mostra a queda de brilho, enquanto a estrela balança e o espectro se desloca.

## 1. Por que é tão difícil

Uma estrela é cerca de um **bilhão** de vezes mais brilhante que um planeta como a Terra na luz visível, e, vista de longe, os dois ficam separados por uma fração de segundo de arco. Fotografar o planeta é como ver um vaga-lume ao lado de um farol, a quilômetros de distância. Por isso, os métodos principais são **indiretos**.

## 2. Método do trânsito

> [!DEFINIÇÃO] Quando o planeta passa na frente da estrela (um **trânsito**), bloqueia uma pequena fração da luz. A queda de brilho é
> $$\frac{\Delta F}{F} = \left(\frac{R_p}{R_\star}\right)^2.$$

- A **profundidade** dá o raio do planeta (conhecendo o da estrela).
- O **intervalo** entre trânsitos dá o período; com a terceira lei de Kepler, a distância à estrela.
- Durante o trânsito, a luz da estrela atravessa a atmosfera do planeta: comparando os espectros, o telescópio James Webb já detectou água, CO₂ e outras moléculas em atmosferas de exoplanetas.

**Exemplo.** Júpiter passando na frente do Sol: $\left(\frac{0{,}10}{1}\right)^2 = 1\%$. A Terra: $\left(\frac{1}{109}\right)^2 \approx 0{,}0084\%$, ou 84 partes por milhão.

> [!ATENÇÃO] Só vemos trânsitos se a órbita estiver alinhada, quase de perfil, com a nossa linha de visada. Para um planeta como a Terra, a chance de alinhamento é de só cerca de 0,5%. Para cada planeta em trânsito, há muitos que não detectamos assim.

As missões **Kepler** (2009–2018) e **TESS** (desde 2018) descobriram milhares de planetas por esse método.

## 3. Método da velocidade radial

A estrela e o planeta orbitam o **centro de massa** comum. A estrela descreve uma pequena órbita e, vista daqui, se aproxima e se afasta periodicamente. O efeito Doppler mostra esse balanço nas linhas do espectro.

- O **período** da oscilação é o período orbital do planeta.
- A **amplitude** dá a massa mínima do planeta ($m\sin i$, porque não sabemos a inclinação da órbita).

| Planeta, visto de fora | Balanço que causa no Sol |
|---|---|
| Júpiter | cerca de $12{,}5$ m/s |
| Terra | cerca de $0{,}09$ m/s (9 cm/s) |

Os melhores espectrógrafos atuais chegam a algumas dezenas de centímetros por segundo. Foi assim que se descobriu, em 1995, **51 Pegasi b**: um planeta com metade da massa de Júpiter que dá uma volta na estrela em **4,2 dias**, um "Júpiter quente" que nenhuma teoria previa.

Combinando trânsito (raio) e velocidade radial (massa), obtém-se a **densidade**, que diz se o planeta é rochoso, aquático ou gasoso.

## 4. Outros métodos

- **Imagem direta:** bloqueando a luz da estrela com um coronógrafo, é possível fotografar planetas gigantes, jovens (ainda quentes, brilhantes no infravermelho) e distantes da estrela.
- **Microlente gravitacional:** quando uma estrela com planeta passa na frente de outra mais distante, sua gravidade funciona como lente e amplia a luz de fundo; o planeta acrescenta um pico breve. Detecta planetas frios e distantes da estrela.
- **Astrometria:** mede o balanço da estrela no plano do céu, em vez de na linha de visada. A missão Gaia deve revelar milhares de gigantes assim.

## 5. O que se encontrou

- Planetas são **comuns**: em média, há pelo menos um por estrela na Via Láctea.
- O tipo mais comum não existe no Sistema Solar: planetas entre a Terra e Netuno em tamanho (**super-Terras** e **mininetunos**).
- Há **Júpiteres quentes**, planetas de **lava**, planetas com densidade de isopor e sistemas compactos como **TRAPPIST-1**, com sete planetas do tamanho da Terra mais perto da estrela do que Mercúrio está do Sol.

> [!DEFINIÇÃO] A **zona habitável** é a faixa de distâncias de uma estrela em que um planeta rochoso, com atmosfera adequada, poderia manter **água líquida** na superfície. Para o Sol, vai de cerca de 0,95 a 1,7 UA (as estimativas variam). Para estrelas frias e pequenas, fica bem mais perto.

Estar na zona habitável não significa ter vida, nem mesmo água: Marte está perto da borda externa e Vênus, perto da borda interna.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? No método do trânsito, a profundidade da queda de brilho revela:
+ o raio do planeta (em relação ao da estrela)
- a massa do planeta
- a temperatura da estrela
- a idade do sistema
> $\Delta F/F = (R_p/R_\star)^2$.

? O método da velocidade radial se baseia:
- na sombra do planeta
+ no efeito Doppler causado pelo balanço da estrela
- na luz refletida pelo planeta
- na paralaxe
> A estrela orbita o centro de massa comum.

? Por que a maioria dos exoplanetas não pode ser detectada por trânsito?
- porque são pequenos demais
+ porque a órbita precisa estar alinhada com a nossa linha de visada
- porque a estrela é fria
- porque estão longe demais
> Para a Terra vista de fora, a chance é de cerca de 0,5%.

? Combinando trânsito e velocidade radial, obtém-se:
- a idade do planeta
+ a densidade do planeta
- a cor do planeta
- a distância da estrela à Terra
> Raio e massa dão a densidade.

? A zona habitável é a região onde:
- certamente há vida
+ um planeta poderia ter água líquida na superfície
- não há radiação
- os planetas são gigantes
> É uma condição de temperatura, não de vida.
```

## 6. Exercícios

**1.** Um planeta com raio 2 vezes o da Terra transita uma estrela igual ao Sol. Qual é a profundidade do trânsito?

<details>
<summary>Ver solução</summary>

$\left(\frac{2}{109}\right)^2 \approx 3{,}4\times10^{-4}$: 0,034%, ou 340 partes por milhão.

</details>

**2.** Uma estrela de massa igual à do Sol tem um planeta com período de 4,2 dias. A que distância ele orbita?

<details>
<summary>Ver solução</summary>

$P = \frac{4{,}2}{365{,}25} = 0{,}0115$ ano; $a = P^{2/3} \approx 0{,}051$ UA, oito vezes mais perto que Mercúrio.

</details>

**3.** Um trânsito tem profundidade de 1% numa estrela com raio de $0{,}5\,R_\odot$. Qual é o raio do planeta em raios de Júpiter ($R_\odot \approx 10\,R_J$)?

<details>
<summary>Ver solução</summary>

$R_p = 0{,}1 \cdot 0{,}5\,R_\odot = 0{,}05\,R_\odot = 0{,}5\,R_J$.

</details>

**4.** Por que estrelas pequenas e frias (anãs vermelhas) são boas para procurar planetas do tamanho da Terra?

<details>
<summary>Ver solução</summary>

Com a estrela pequena, o mesmo planeta bloqueia uma fração maior da luz (trânsito mais profundo); com a estrela leve, ele causa um balanço maior (velocidade radial maior). E a zona habitável fica perto, com períodos curtos e muitos trânsitos para observar.

</details>
