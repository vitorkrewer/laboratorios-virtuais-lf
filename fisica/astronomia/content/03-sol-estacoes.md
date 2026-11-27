# O Sol, a eclíptica e as estações

Ao longo do ano, o Sol muda de lugar entre as estrelas, nasce em pontos diferentes do horizonte e sobe mais ou menos ao meio-dia. Tudo isso vem de um único fato: o eixo de rotação da Terra é **inclinado** em relação ao plano da órbita. É essa inclinação, e não a distância ao Sol, que produz as estações.

> [!DICA] No [Planetário](#/lab/planetario), ligue a eclíptica, fixe a hora em 12 h e avance a data mês a mês: veja o Sol subir e descer no céu do meio-dia.

## 1. A eclíptica

> [!DEFINIÇÃO] A **eclíptica** é o caminho anual aparente do Sol entre as estrelas. É a projeção do plano da órbita da Terra na esfera celeste.

O Sol percorre a eclíptica de oeste para leste, cerca de $1^\circ$ por dia. As constelações que ela atravessa formam o **zodíaco** (são 13 com Serpentário, não 12). Como as órbitas dos planetas estão em planos parecidos, planetas e Lua também andam sempre perto da eclíptica.

> [!TEOREMA] A eclíptica é inclinada $\varepsilon \approx 23{,}44^\circ$ em relação ao equador celeste. Esse ângulo, a **obliquidade**, é a inclinação do eixo da Terra em relação à perpendicular ao plano da órbita.

## 2. Equinócios e solstícios

A eclíptica corta o equador celeste em dois pontos. Ao longo do ano, a declinação do Sol varia entre $+23{,}44^\circ$ e $-23{,}44^\circ$:

| Data aproximada | Evento (no hemisfério sul) | Declinação do Sol |
|---|---|---|
| 20 de março | equinócio de outono | $0^\circ$ |
| 21 de junho | solstício de inverno | $+23{,}44^\circ$ |
| 22 de setembro | equinócio de primavera | $0^\circ$ |
| 21 de dezembro | solstício de verão | $-23{,}44^\circ$ |

No hemisfério norte, os nomes se invertem: junho é verão lá.

- **Equinócio:** o Sol está no equador celeste, nasce exatamente a leste, se põe exatamente a oeste, e o dia e a noite duram cerca de 12 h em toda a Terra.
- **Solstício:** o Sol chega ao ponto mais ao norte ou mais ao sul; o dia mais longo (ou mais curto) do ano.

## 3. Por que existem estações

> [!ATENÇÃO] As estações **não** são causadas pela distância Terra–Sol. A Terra está mais perto do Sol no início de janeiro (periélio, cerca de 147 milhões de km) e mais longe no início de julho (afélio, cerca de 152 milhões de km), e mesmo assim janeiro é inverno no hemisfério norte. Os dois hemisférios têm estações **opostas** ao mesmo tempo, o que a distância não explicaria.

A causa é a inclinação do eixo, que produz dois efeitos que se somam no hemisfério voltado para o Sol:

1. **Ângulo de incidência.** Com o Sol mais alto, o mesmo feixe de luz se concentra numa área menor do chão. A energia por metro quadrado é proporcional a $\sin h$, onde $h$ é a altura do Sol.
2. **Duração do dia.** Com o Sol mais alto, ele também fica mais horas acima do horizonte.

> [!INTUIÇÃO] Aponte uma lanterna para a mesa: na vertical, ela faz um círculo pequeno e forte; inclinada, faz uma elipse grande e fraca. A mesma luz se espalha mais.

**Altura do Sol ao meio-dia.** Pela fórmula do capítulo anterior, $h_\text{máx} = 90^\circ - \lvert \varphi - \delta_\odot \rvert$. Em São Paulo ($\varphi = -23{,}5^\circ$):
- solstício de dezembro ($\delta_\odot = -23{,}44^\circ$): $h \approx 90^\circ$, o Sol passa praticamente no zênite;
- solstício de junho ($\delta_\odot = +23{,}44^\circ$): $h \approx 90^\circ - 47^\circ = 43^\circ$.

A energia ao meio-dia por metro quadrado cai para $\sin 43^\circ \approx 0{,}68$ do valor de dezembro.

## 4. Trópicos e círculos polares

| Linha | Latitude | Significado |
|---|---|---|
| Trópico de Câncer | $23{,}44^\circ$ N | o Sol passa no zênite no solstício de junho |
| Trópico de Capricórnio | $23{,}44^\circ$ S | o Sol passa no zênite no solstício de dezembro (passa por São Paulo) |
| Círculo polar ártico | $66{,}56^\circ$ N | há pelo menos um dia sem pôr do sol e um sem nascer do sol |
| Círculo polar antártico | $66{,}56^\circ$ S | idem, no sul |

Entre os trópicos, o Sol passa pelo zênite duas vezes por ano. Fora deles, nunca.

## 5. Dia solar, fusos e equação do tempo

O meio-dia do relógio não coincide exatamente com a passagem do Sol pelo meridiano, por dois motivos:
- **Fuso horário:** todo o fuso usa a mesma hora, mas o Sol passa pelo meridiano 4 minutos mais tarde a cada grau a oeste.
- **Equação do tempo:** como a órbita é elíptica e a eclíptica é inclinada, o "Sol verdadeiro" adianta ou atrasa até cerca de 16 minutos em relação a um Sol médio uniforme.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A principal causa das estações do ano é:
- a variação da distância Terra–Sol
+ a inclinação do eixo de rotação da Terra
- a variação do brilho do Sol
- a rotação da Terra
> A distância muda pouco, e os hemisférios têm estações opostas.

? A obliquidade da eclíptica vale cerca de:
- $5^\circ$
+ $23{,}44^\circ$
- $45^\circ$
- $66{,}56^\circ$
> É a inclinação do eixo da Terra.

? No equinócio, o Sol:
+ nasce exatamente a leste
- nasce no ponto mais ao sul do horizonte
- passa no zênite em São Paulo
- fica acima do horizonte 24 h nos polos
> Declinação zero: ele está no equador celeste.

? A Terra passa mais perto do Sol em:
- junho
+ janeiro
- março
- setembro
> Periélio no início de janeiro.

? Em que local o Sol pode passar exatamente pelo zênite?
- em qualquer lugar, no solstício de verão
+ só entre os trópicos
- só nos polos
- só no equador
> A declinação do Sol nunca passa de $\pm 23{,}44^\circ$.
```

## 6. Exercícios

**1.** Qual é a altura do Sol ao meio-dia em Porto Alegre ($\varphi = -30^\circ$) no solstício de junho?

<details>
<summary>Ver solução</summary>

$90^\circ - \lvert -30^\circ - 23{,}44^\circ \rvert = 90^\circ - 53{,}44^\circ \approx 36{,}6^\circ$.

</details>

**2.** E no solstício de dezembro?

<details>
<summary>Ver solução</summary>

$90^\circ - \lvert -30^\circ + 23{,}44^\circ \rvert = 90^\circ - 6{,}56^\circ \approx 83{,}4^\circ$.

</details>

**3.** Usando as respostas anteriores, compare a energia solar por metro quadrado ao meio-dia nos dois solstícios em Porto Alegre.

<details>
<summary>Ver solução</summary>

$\frac{\sin 36{,}6^\circ}{\sin 83{,}4^\circ} = \frac{0{,}596}{0{,}993} \approx 0{,}60$. No inverno chega cerca de 60% da energia do verão, e o dia ainda é mais curto.

</details>

**4.** Se a obliquidade fosse $0^\circ$, como seriam as estações?

<details>
<summary>Ver solução</summary>

Praticamente não existiriam: o Sol estaria sempre no equador celeste, com dias de 12 h em toda a Terra o ano inteiro. Restaria só o pequeno efeito da distância, de cerca de 7% na energia recebida.

</details>
