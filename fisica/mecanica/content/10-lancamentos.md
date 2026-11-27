# Vetores e lançamentos

Uma bola chutada, um jato d'água, um salto em distância: todos desenham no ar a mesma curva, uma **parábola**. O segredo para entendê-la é uma ideia de Galileu: o movimento na horizontal e o movimento na vertical acontecem **ao mesmo tempo, sem um atrapalhar o outro**.

> [!DICA] **Volta 3 · Analisar.** Ao terminar, você vai conseguir:
> - **decompor** uma velocidade em componentes horizontal e vertical;
> - **analisar** um lançamento separando os dois movimentos;
> - **justificar** por que 45° dá o maior alcance (sem ar) e por que, na prática, o melhor ângulo é menor.

> [!DICA] **De volta à espiral.** O capítulo 1 disse que velocidade tem direção; o capítulo 2 representou forças como setas; o capítulo 6 tratou da queda. Aqui as setas viram **vetores** e a queda ganha um movimento para o lado.

> [!INTUIÇÃO] **Pense antes de ler.** De uma mesa, você deixa uma moeda cair e, no mesmo instante, dá um peteleco em outra, que sai voando na horizontal. Qual chega antes ao chão?

## 1. Vetores e componentes

> [!DEFINIÇÃO] Um **vetor** é uma grandeza com intensidade, direção e sentido, desenhada como uma seta. Todo vetor no plano pode ser escrito como a soma de uma parte **horizontal** e uma **vertical**: suas **componentes**.

Uma bola lançada a $v_0$ com ângulo $\theta$ acima do chão:
$$v_x = v_0\cos\theta, \qquad v_y = v_0\,\text{sen}\,\theta.$$

> [!INTUIÇÃO] Imagine uma lanterna em cima da bola e outra ao lado dela. A sombra no chão faz o movimento **horizontal**; a sombra na parede faz o **vertical**. Cada sombra segue suas próprias regras.

## 2. Os dois movimentos independentes

Sem resistência do ar:
- **Na horizontal,** nenhuma força age: a velocidade $v_x$ é **constante** (primeira lei).
- **Na vertical,** só o peso age: é a queda livre do capítulo 6, com aceleração $g$ para baixo.

A resposta da pergunta do início: as duas moedas chegam **juntas**. A velocidade horizontal não muda nada na queda.

> [!EXEMPLO] Uma bala disparada na horizontal e outra solta da mesma altura no mesmo instante chegam juntas ao chão, sem ar. A disparada só cai muito mais longe.

## 3. Alcance e altura

Lançando do chão, com $g = 10$ m/s²:
- tempo de subida: $\frac{v_y}{g}$; tempo de voo: o dobro;
- altura máxima: $\frac{v_y^2}{2g}$;
- alcance: $v_x \times$ tempo de voo $= \frac{v_0^2\,\text{sen}(2\theta)}{g}$.

O alcance é máximo quando $\text{sen}(2\theta) = 1$, isto é, **$\theta = 45°$**. Ângulos complementares (30° e 60°, 20° e 70°) dão **o mesmo alcance**: um voa baixo e rápido, o outro alto e demorado.

> [!ATENÇÃO] Com resistência do ar, o melhor ângulo é **menor** que 45° (para uma bola de futebol, perto de 30° a 40°), e a trajetória deixa de ser simétrica: desce mais inclinada do que subiu. No salto em distância, os atletas saem a cerca de 20°, porque correr e saltar mais baixo dá mais velocidade.

> [!DICA] No simulador [Lançamentos](#/lab/lancamento), acerte o alvo mudando ângulo e velocidade, compare trajetórias com e sem ar e veja as setas das componentes da velocidade: a horizontal não muda; a vertical diminui, zera no topo e cresce para baixo.

## 4. Analisando: o que muda e o que não muda

| Grandeza | Durante o voo (sem ar) |
|---|---|
| velocidade horizontal | constante |
| velocidade vertical | diminui na subida, é zero no topo, cresce na descida |
| aceleração | sempre $g$, para baixo, **inclusive no topo** |
| força | só o peso |

> [!ATENÇÃO] No ponto mais alto, a velocidade **não** é zero (sobra a horizontal) e a aceleração **não** é zero (é $g$). Só a componente vertical da velocidade se anula.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Uma moeda cai da mesa e outra é lançada na horizontal da mesma altura, ao mesmo tempo. Sem ar:
- a lançada chega antes
- a que cai chega antes
+ chegam juntas
- depende da força do peteleco
> Os movimentos vertical e horizontal são independentes.

? No ponto mais alto de um lançamento oblíquo, a aceleração é:
- zero
+ g, para baixo
- g, para cima
- horizontal
> Só o peso age o tempo todo.

? Sem ar, qual ângulo dá o maior alcance?
- 30°
+ 45°
- 60°
- 90°
> sen(2θ) é máximo para θ = 45°.

? Um lançamento a 30° e outro a 60°, com a mesma velocidade e sem ar, têm:
+ o mesmo alcance
- o de 60° vai mais longe
- o de 30° vai mais longe
- o de 60° sobe menos
> Ângulos complementares.

? Na horizontal, sem ar, a velocidade de um projétil:
- diminui
- aumenta
+ fica constante
- vira zero no topo
> Nenhuma força horizontal.
```

## 5. Exercícios

**1.** Uma bola é chutada a 20 m/s com 30° de inclinação ($\text{sen}\,30° = 0{,}5$; $\cos 30° \approx 0{,}87$). Calcule as componentes da velocidade, o tempo de voo e o alcance (sem ar, $g = 10$ m/s²).

<details>
<summary>Ver solução</summary>

$v_x \approx 17{,}4$ m/s; $v_y = 10$ m/s. Sobe por 1 s; voo de 2 s. Alcance: $17{,}4 \times 2 \approx 35$ m. (Pela fórmula: $\frac{400 \times \text{sen}\,60°}{10} \approx 34{,}6$ m.)

</details>

**2.** **Analise:** um jogador de basquete arremessa de longe com a bola subindo bem alto. Que vantagem e que desvantagem isso tem?

<details>
<summary>Ver solução</summary>

Vantagem: a bola desce mais na vertical e "enxerga" o aro maior, com mais margem de erro, e é mais difícil de bloquear. Desvantagem: precisa de mais velocidade e fica mais tempo no ar, sujeita a erros de força.

</details>
