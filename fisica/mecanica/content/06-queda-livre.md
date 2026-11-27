# Queda livre: o que cai mais rápido?

Solte ao mesmo tempo uma bola de borracha e uma bola de chumbo do mesmo tamanho. Qual chega antes ao chão? Aristóteles dizia que a mais pesada; muita gente ainda acha isso. Galileu mostrou que, sem o ar atrapalhando, **todos os corpos caem juntos**. Em 1971, um astronauta comprovou isso na Lua, com um martelo e uma pena.

> [!DICA] **Volta 2 · Aplicar.** Ao terminar, você vai conseguir:
> - **explicar** por que, sem ar, corpos de massas diferentes caem juntos;
> - **calcular** velocidade e altura em quedas simples;
> - **explicar** a velocidade terminal e o funcionamento do paraquedas.

> [!INTUIÇÃO] **Pense antes de ler.** Você solta uma folha de papel aberta e outra igual, amassada em bolinha. Qual chega antes? E se fosse na Lua?

## 1. Galileu contra Aristóteles

O argumento de Galileu, sem experimento nenhum: amarre uma pedra leve a uma pesada. Se as leves caem mais devagar, a leve deveria **frear** a pesada, e o conjunto cairia mais devagar que a pesada sozinha. Mas o conjunto é **mais pesado** que a pesada sozinha, então deveria cair mais rápido. As duas conclusões não podem ser verdadeiras: a ideia de Aristóteles se contradiz. A única saída é que todos caiam juntos.

> [!EXEMPLO] Em 2 de agosto de 1971, na missão Apollo 15, o astronauta David Scott soltou na Lua, sem ar, um martelo e uma pena de falcão ao mesmo tempo. Os dois chegaram juntos ao chão.

A resposta da pergunta do início: na Terra, a bolinha chega antes, porque o ar freia muito mais a folha aberta. Na Lua, as duas chegam juntas.

## 2. A aceleração da gravidade

> [!TEOREMA] Perto da superfície da Terra e sem resistência do ar, todo corpo cai com a mesma aceleração,
> $$g \approx 9{,}8\ \text{m/s}^2$$
> (para contas rápidas, usamos 10 m/s²). A cada segundo de queda, a velocidade aumenta cerca de 10 m/s, ou 36 km/h.

> [!INTUIÇÃO] Por que a massa não importa? Um corpo com o dobro da massa é puxado com o dobro da força (o dobro do peso), mas também tem o dobro de inércia para "acelerar". Os dois efeitos se cancelam. O capítulo 7 mostra isso em números.

## 3. As contas da queda

Soltando do repouso, com $g = 10$ m/s²:

| Tempo de queda | Velocidade | Altura caída |
|---|---|---|
| 1 s | 10 m/s (36 km/h) | 5 m |
| 2 s | 20 m/s (72 km/h) | 20 m |
| 3 s | 30 m/s (108 km/h) | 45 m |
| 4 s | 40 m/s (144 km/h) | 80 m |

São as fórmulas do capítulo anterior com $a = g$: $v = g\,t$ e $h = \frac{g\,t^2}{2}$.

> [!EXEMPLO] **Medindo uma altura com um cronômetro.** Solte uma pedra num poço e cronometre até ouvir o barulho: 2 s. Profundidade aproximada: $\frac{10 \times 2^2}{2} = 20$ m (um pouco menos, porque o som também leva tempo para subir).

## 4. O ar e a velocidade terminal

Na vida real, o ar empurra contra quem cai, e esse empurrão **cresce com a velocidade**. Começando do repouso:
1. no início, a resistência do ar é pequena e o corpo acelera quase como $g$;
2. com mais velocidade, a resistência cresce e a aceleração diminui;
3. quando a resistência fica igual ao peso, a força resultante é zero, e o corpo segue com velocidade constante: a **velocidade terminal**.

| Objeto | Velocidade terminal aproximada |
|---|---|
| gota de chuva | 30 km/h |
| paraquedista de barriga para baixo | 200 km/h |
| paraquedista de cabeça para baixo | 300 km/h ou mais |
| paraquedista com o paraquedas aberto | 20 km/h |

> [!DICA] **De volta à espiral.** A velocidade terminal é o equilíbrio do capítulo 3: peso e resistência do ar se compensam, e pela primeira lei (capítulo 2) a velocidade fica constante.

> [!DICA] No simulador [Queda livre](#/lab/queda), solte objetos diferentes com e sem ar, na Terra e na Lua, e acompanhe o gráfico da velocidade chegando à velocidade terminal.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Sem ar, uma bola de 10 kg e uma de 1 kg soltas juntas:
- a de 10 kg chega muito antes
- a de 1 kg chega antes
+ chegam juntas
- depende da altura
> Mesma aceleração g.

? Depois de 3 s de queda livre (g = 10 m/s²), a velocidade é:
- 10 m/s
+ 30 m/s
- 45 m/s
- 90 m/s
> v = g t.

? Uma pedra solta do alto de um prédio leva 2 s para cair. A altura é de cerca de:
- 10 m
+ 20 m
- 40 m
- 4 m
> h = g t²/2.

? Um paraquedista atinge a velocidade terminal quando:
- o peso desaparece
+ a resistência do ar fica igual ao peso
- a gravidade diminui
- ele abre os braços
> Força resultante zero.

? Na Lua, um martelo e uma pena soltos juntos:
- o martelo chega antes
- a pena flutua
+ chegam juntos
- a pena chega antes
> Não há ar.
```

## 5. Exercícios

**1.** Uma bola cai de 45 m. Quanto tempo leva e com que velocidade chega ao chão (sem ar, $g = 10$ m/s²)?

<details>
<summary>Ver solução</summary>

$45 = 5\,t^2 \Rightarrow t = 3$ s; $v = 30$ m/s (108 km/h).

</details>

**2.** Você joga uma bola para cima a 20 m/s. Quanto tempo ela sobe e qual a altura máxima?

<details>
<summary>Ver solução</summary>

A velocidade diminui 10 m/s a cada segundo: para em 2 s. A subida é a queda "ao contrário": $h = 5 \times 2^2 = 20$ m.

</details>

**3.** Por que gotas de chuva não machucam, mesmo caindo de mais de 1 km?

<details>
<summary>Ver solução</summary>

Por causa da velocidade terminal: o ar limita a velocidade a cerca de 30 km/h. Sem ar, uma gota que caísse de 1 km chegaria a cerca de 500 km/h.

</details>
