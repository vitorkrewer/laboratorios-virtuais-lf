# Medindo o movimento: velocidade, aceleração e gráficos

Na primeira volta, descrevemos o movimento com palavras. Agora vamos **medir**: quanto tempo, quantos metros, quão rápido. Com duas fórmulas simples e a leitura de gráficos, dá para prever onde um carro vai estar daqui a 10 segundos ou quanto ele precisa para frear.

> [!DICA] **Volta 2 · Aplicar.** Ao terminar, você vai conseguir:
> - **calcular** velocidade média e aceleração média;
> - **converter** km/h em m/s;
> - **ler** gráficos de posição e de velocidade e dizer que movimento eles mostram.

> [!DICA] **De volta à espiral.** No capítulo 1, você viu que velocidade é rapidez com direção e que aceleração é mudança de velocidade. Agora essas ideias ganham números.

> [!INTUIÇÃO] **Pense antes de ler.** Um carro a 100 km/h anda quantos metros em 1 segundo, a distância que você percorre "piscando"? Chute um número.

## 1. Velocidade média

> [!DEFINIÇÃO] $$v_m = \frac{\Delta s}{\Delta t} = \frac{\text{distância (deslocamento)}}{\text{tempo}}.$$
> O símbolo $\Delta$ (delta) quer dizer "variação": $\Delta s$ é quanto a posição mudou; $\Delta t$, quanto tempo passou.

**Exemplo.** Uma viagem de 240 km em 3 horas: $v_m = \frac{240}{3} = 80$ km/h. Não quer dizer que o carro andou sempre a 80 km/h: é a velocidade que, constante, faria a mesma viagem no mesmo tempo.

**Converter unidades.** 1 km/h = $\frac{1\,000\ \text{m}}{3\,600\ \text{s}}$, ou seja:
$$\text{km/h} \xrightarrow{\ \div\,3{,}6\ } \text{m/s}, \qquad \text{m/s} \xrightarrow{\ \times\,3{,}6\ } \text{km/h}.$$

A resposta da pergunta do início: $\frac{100}{3{,}6} \approx 28$ m/s. Em 1 segundo de distração ao celular, o carro anda quase 28 metros, o comprimento de uma quadra de basquete.

## 2. Aceleração média

> [!DEFINIÇÃO] $$a_m = \frac{\Delta v}{\Delta t}.$$
> Unidade: (m/s) por segundo, escrito m/s². Uma aceleração de 2 m/s² quer dizer que a velocidade aumenta 2 m/s a cada segundo.

**Exemplo.** Um carro vai de 0 a 108 km/h (30 m/s) em 10 s: $a = \frac{30}{10} = 3$ m/s².

| Situação | Aceleração aproximada |
|---|---|
| carro popular arrancando | 2 a 3 m/s² |
| freada forte de um carro | 7 a 8 m/s² (negativa) |
| queda livre na Terra | 9,8 m/s² |
| avião decolando | cerca de 3 m/s² |
| montanha-russa forte | até 40 m/s² por instantes |

## 3. Gráficos do movimento

Gráficos mostram um movimento inteiro de uma vez. Os dois mais importantes:

**Posição × tempo** ($s \times t$):
- reta horizontal: parado;
- reta inclinada: velocidade **constante** (quanto mais inclinada, mais rápido);
- curva que fica mais inclinada: **acelerando**; que fica menos inclinada: **freando**.

**Velocidade × tempo** ($v \times t$):
- reta horizontal: velocidade constante;
- reta subindo: acelerando com aceleração constante;
- a **área** sob a linha é a distância percorrida.

> [!INTUIÇÃO] A **inclinação** do gráfico de posição é a velocidade; a **inclinação** do gráfico de velocidade é a aceleração. Ler gráfico é ler inclinações.

> [!DICA] No simulador [Gráficos do movimento](#/lab/movimento), modo desafio, controle o carro com o acelerador e o freio para reproduzir um gráfico de posição dado. É o melhor jeito de aprender a ler gráficos: com o corpo.

## 4. Movimento com aceleração constante

Quando a aceleração é constante, partindo do repouso:
$$v = a\,t, \qquad s = \frac{a\,t^2}{2}.$$

O tempo aparece **ao quadrado** na distância: em 2 s, o carro anda **4 vezes** o que andou em 1 s; em 3 s, **9 vezes**. Galileu descobriu isso rolando bolas em rampas, no século XVII.

> [!ATENÇÃO] **Distância de frenagem.** A distância para parar cresce com o **quadrado** da velocidade: a 100 km/h, um carro precisa de cerca de **quatro vezes** a distância que precisa a 50 km/h. Some a isso o tempo de reação (cerca de 1 s, já com o carro andando sem frear).

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? 72 km/h correspondem a:
- 7,2 m/s
+ 20 m/s
- 260 m/s
- 36 m/s
> 72 ÷ 3,6.

? Um ciclista vai de 2 m/s a 8 m/s em 3 s. Sua aceleração média é:
- 6 m/s²
+ 2 m/s²
- 3 m/s²
- 10 m/s²
> (8 − 2) / 3.

? Num gráfico posição × tempo, uma reta horizontal indica que o objeto está:
+ parado
- com velocidade constante
- acelerando
- freando
> A posição não muda.

? Num gráfico velocidade × tempo, a área sob a linha representa:
- a aceleração
+ a distância percorrida
- o tempo
- a força
> Velocidade × tempo = distância.

? Dobrando a velocidade de um carro, a distância de frenagem fica:
- igual
- o dobro
+ cerca de quatro vezes maior
- a metade
> Cresce com o quadrado da velocidade.
```

## 5. Exercícios

**1.** Um ônibus percorre 18 km em 20 minutos. Qual a velocidade média em km/h e em m/s?

<details>
<summary>Ver solução</summary>

20 min = $\frac{1}{3}$ h. $v_m = \frac{18}{1/3} = 54$ km/h $= 15$ m/s.

</details>

**2.** Um carro parte do repouso com aceleração de 2 m/s². Qual a velocidade e a distância depois de 5 s?

<details>
<summary>Ver solução</summary>

$v = 2 \times 5 = 10$ m/s (36 km/h); $s = \frac{2 \times 25}{2} = 25$ m.

</details>

**3.** Desenhe (à mão) o gráfico $v \times t$ de um carro que sai do semáforo, anda um tempo com velocidade constante e depois freia até parar no próximo semáforo.

<details>
<summary>Ver solução</summary>

Uma rampa subindo (aceleração), um trecho horizontal (velocidade constante) e uma rampa descendo até zero (freada). A forma lembra um trapézio. A área do trapézio é a distância entre os semáforos.

</details>
