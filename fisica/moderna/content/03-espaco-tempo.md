# Espaço-tempo e transformações de Lorentz

Em 1908, Hermann Minkowski, que tinha sido professor de Einstein, resumiu a relatividade numa frase: espaço e tempo, separados, viram sombras; só uma união dos dois mantém realidade própria. Essa união é o **espaço-tempo**. Desenhá-lo torna os paradoxos da relatividade quase óbvios.

> [!DICA] No simulador [Relatividade](#/lab/relatividade), modo "espaço-tempo", mude a velocidade e veja os eixos do outro referencial se fecharem em volta da linha da luz.

## 1. Eventos e linhas de mundo

> [!DEFINIÇÃO] Um **evento** é um ponto do espaço-tempo: um lugar e um instante, $(t, x)$. A **linha de mundo** de um objeto é a curva que ele traça no diagrama de espaço-tempo ao longo da vida.

No **diagrama de Minkowski**, o eixo horizontal é a posição $x$ e o vertical é $ct$ (o tempo multiplicado por $c$, medido em metros ou anos-luz). Assim:
- um objeto parado é uma reta vertical;
- um objeto com velocidade constante é uma reta inclinada;
- a luz é uma reta a **45°**;
- nada com massa pode ter linha de mundo mais inclinada que 45°.

## 2. O cone de luz e a causalidade

As retas a 45° que passam por um evento formam o **cone de luz** dele.
- Dentro do cone para cima: o **futuro** do evento, o que ele pode influenciar.
- Dentro do cone para baixo: o **passado**, o que pode tê-lo influenciado.
- Fora do cone: "**em outro lugar**". Nenhum sinal liga esses eventos ao nosso; a ordem temporal deles pode ser diferente para observadores diferentes.

> [!INTUIÇÃO] A relatividade da simultaneidade nunca inverte causa e efeito: só eventos **fora** do cone de luz podem mudar de ordem. Se A pode causar B, todos concordam que A veio antes.

## 3. As transformações de Lorentz

Para passar as coordenadas de um evento de um referencial $S$ para um referencial $S'$ que se move com velocidade $v$ ao longo de $x$:

> [!TEOREMA] **Transformações de Lorentz:**
> $$x' = \gamma\,(x - vt), \qquad t' = \gamma\left(t - \frac{v\,x}{c^2}\right).$$
> Para $v \ll c$, $\gamma \approx 1$ e $\frac{vx}{c^2} \approx 0$: voltam às transformações de Galileu, $x' = x - vt$ e $t' = t$.

O termo $\frac{vx}{c^2}$ é a relatividade da simultaneidade: eventos com o mesmo $t$ e posições $x$ diferentes têm $t'$ diferentes. No diagrama, os eixos de $S'$ ficam **inclinados para dentro**, fechando como uma tesoura em volta da reta da luz quando $v$ se aproxima de $c$.

## 4. O intervalo: o que todos concordam

Distâncias e durações mudam de um referencial para outro, mas uma combinação delas não muda:

> [!TEOREMA] O **intervalo** entre dois eventos,
> $$\Delta s^2 = (c\,\Delta t)^2 - \Delta x^2,$$
> é o **mesmo para todos os observadores inerciais**. Para eventos na mesma linha de mundo de um relógio, $\frac{\Delta s}{c}$ é o tempo próprio que o relógio marca.

Isso explica o paradoxo dos gêmeos: o tempo próprio é o "comprimento" de cada linha de mundo, e, por causa do sinal de menos, a linha reta (de quem fica parado) é a de **maior** tempo próprio. Qualquer desvio, como a viagem de ida e volta, marca menos tempo.

## 5. Soma de velocidades

Uma nave a $u'$ em relação a uma estação que, por sua vez, se move a $v$ em relação à Terra não tem velocidade $u' + v$ em relação à Terra:

> [!TEOREMA] $$u = \frac{u' + v}{1 + \frac{u'v}{c^2}}.$$

**Exemplo.** $u' = v = 0{,}8\,c$: $u = \frac{1{,}6}{1 + 0{,}64}\,c \approx 0{,}976\,c$. Com $u' = c$, o resultado é exatamente $c$: o segundo postulado aparece como consequência.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Num diagrama de Minkowski, a linha de mundo de um raio de luz é:
- vertical
- horizontal
+ uma reta a 45°
- uma curva
> Com $ct$ no eixo vertical.

? Um evento fora do cone de luz de outro:
+ não pode ter relação de causa e efeito com ele
- é sempre posterior
- é sempre anterior
- coincide com ele
> Nenhum sinal mais lento que a luz os liga.

? O intervalo $(c\Delta t)^2 - \Delta x^2$ entre dois eventos:
- depende do observador
+ é o mesmo para todos os observadores inerciais
- é sempre zero
- só vale para a luz
> É o invariante da relatividade.

? Duas naves se aproximam, cada uma a 0,5c em relação à Terra. A velocidade de uma em relação à outra é:
- c
+ 0,8c
- 0,5c
- 1,0c
> $\frac{1}{1 + 0{,}25} = 0{,}8$.

? Para v muito menor que c, as transformações de Lorentz:
- deixam de valer
+ viram as transformações de Galileu
- dão tempos negativos
- ficam iguais a zero
> γ ≈ 1 e $vx/c^2$ ≈ 0.
```

## 6. Exercícios

**1.** Um evento ocorre em $x = 3$ anos-luz, $t = 5$ anos no referencial $S$. Quais são as coordenadas em $S'$, que se move a $0{,}6\,c$?

<details>
<summary>Ver solução</summary>

$\gamma = 1{,}25$. Com $c = 1$ ano-luz/ano: $x' = 1{,}25\,(3 - 0{,}6 \times 5) = 0$; $t' = 1{,}25\,(5 - 0{,}6 \times 3) = 4$ anos. Confira o intervalo: $5^2 - 3^2 = 16 = 4^2 - 0^2$.

</details>

**2.** Calcule o tempo próprio do viajante que vai a 4 anos-luz a $0{,}8\,c$ e volta, usando o intervalo.

<details>
<summary>Ver solução</summary>

Cada trecho: $\Delta t = 5$ anos, $\Delta x = 4$ anos-luz, $\Delta s = \sqrt{25 - 16} = 3$ anos. Total: 6 anos (o mesmo do capítulo anterior).

</details>

**3.** Um foguete a $0{,}9\,c$ dispara um projétil para a frente a $0{,}9\,c$ em relação a ele. Qual a velocidade do projétil para a Terra?

<details>
<summary>Ver solução</summary>

$u = \frac{1{,}8}{1 + 0{,}81}\,c \approx 0{,}9945\,c$.

</details>
