# Dilatação do tempo e contração do espaço

Se a velocidade da luz é a mesma para todos, então relógios em movimento andam mais devagar e réguas em movimento ficam mais curtas. Não é ilusão nem defeito dos instrumentos: é o próprio tempo e o próprio espaço. E a natureza confirma isso todos os dias, nos raios cósmicos, nos aceleradores de partículas e nos satélites do GPS.

> [!DICA] No simulador [Relatividade](#/lab/relatividade), modo "gêmeos", envie uma nave a uma estrela próxima e compare os relógios na volta.

## 1. Dilatação do tempo

> [!TEOREMA] Um intervalo de tempo $\Delta t_0$ medido por um relógio em repouso em relação aos eventos (o **tempo próprio**) é medido como
> $$\Delta t = \gamma\,\Delta t_0$$
> por um observador em relação ao qual o relógio se move com velocidade $v$. Como $\gamma \geq 1$, **relógios em movimento andam mais devagar**.

> [!ATENÇÃO] O efeito é **recíproco**: para o passageiro do trem, é o relógio da plataforma que anda devagar. Não há contradição porque, para comparar relógios que se afastam, é preciso combinar o que é "ao mesmo tempo", e a simultaneidade é relativa.

## 2. A prova dos múons

Raios cósmicos batem na alta atmosfera e criam **múons**, partículas instáveis com vida média de $2{,}2\ \mu$s (em repouso). Mesmo a quase $c$, em $2{,}2\ \mu$s um múon percorreria só cerca de 660 m. Eles nascem a cerca de 15 km de altura, e mesmo assim chegam em grande quantidade ao nível do mar.

**Explicação:** a $v = 0{,}998\,c$, $\gamma \approx 15{,}8$. Para nós, a vida do múon dura $15{,}8 \times 2{,}2 \approx 35\ \mu$s, tempo para percorrer mais de 10 km. Sem a dilatação do tempo, quase nenhum chegaria ao chão.

> [!EXEMPLO] No CERN, nos anos 1970, múons girando num anel a $\gamma \approx 29{,}3$ viveram 29,3 vezes mais que múons parados, como a relatividade prevê, com precisão de cerca de 0,1%.

## 3. Contração do comprimento

E do ponto de vista do múon? Para ele, quem se move é a atmosfera, e o relógio dele marca os $2{,}2\ \mu$s normais. A resposta é que, para o múon, **a atmosfera é mais fina**.

> [!TEOREMA] Um objeto com comprimento $L_0$ medido em repouso (o **comprimento próprio**) é medido como
> $$L = \frac{L_0}{\gamma}$$
> por um observador em relação ao qual ele se move, **apenas na direção do movimento**. As dimensões perpendiculares não mudam.

Para o múon a $\gamma = 15{,}8$, os 15 km de atmosfera viram menos de 1 km. Os dois pontos de vista (relógio lento ou distância curta) dão o mesmo resultado: o múon chega.

## 4. O paradoxo dos gêmeos

Ana fica na Terra; Beto viaja a $0{,}8\,c$ até uma estrela a 4 anos-luz e volta.
- Para Ana: a viagem dura $\frac{8}{0{,}8} = 10$ anos.
- Para Beto ($\gamma = \frac{5}{3}$): o caminho está contraído para 2,4 anos-luz em cada sentido; a viagem dura $\frac{2 \times 2{,}4}{0{,}8} = 6$ anos.

Na volta, Ana envelheceu 10 anos e Beto, 6.

> [!INTUIÇÃO] Por que não é simétrico, se "tudo é relativo"? Porque **Beto troca de referencial**: ele freia, dá meia-volta e acelera. Ana fica o tempo todo no mesmo referencial inercial. Só Beto sente as acelerações. O gêmeo que muda de referencial é o que envelhece menos.

O efeito já foi medido com relógios atômicos em aviões (experimento de Hafele e Keating, 1971) e hoje é medido com relógios ópticos separados por poucos centímetros de altura.

## 5. GPS: a relatividade no seu bolso

Os satélites do GPS se movem a cerca de 3,9 km/s e estão a 20 200 km de altura. Dois efeitos agem nos relógios atômicos deles:
- **Velocidade** (relatividade especial): atrasam cerca de **7 µs por dia**.
- **Gravidade mais fraca lá em cima** (relatividade geral, capítulo 5): adiantam cerca de **45 µs por dia**.

Saldo: adiantam cerca de **38 µs por dia**. A luz percorre 11 km em 38 µs: sem a correção, o GPS erraria a posição em quilômetros já no primeiro dia.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Para um observador parado, um relógio que passa a 0,6c (γ = 1,25) marca 1 s enquanto o dele marca:
- 0,8 s
- 1 s
+ 1,25 s
- 1,6 s
> $\Delta t = \gamma \Delta t_0$.

? Uma nave com 100 m de comprimento próprio passa a 0,6c. Para quem está parado, ela mede:
+ 80 m
- 100 m
- 125 m
- 60 m
> $L = L_0 / \gamma = 100 / 1{,}25$.

? Os múons chegam ao nível do mar porque:
- eles são muito pesados
+ a vida deles é dilatada (ou, para eles, a atmosfera é contraída)
- a atmosfera os acelera
- eles se movem mais rápido que a luz
> Os dois pontos de vista dão o mesmo resultado.

? No paradoxo dos gêmeos, envelhece menos:
- quem fica na Terra
+ quem viaja e troca de referencial
- os dois envelhecem igual
- depende de quem está olhando
> Só o viajante acelera.

? Sem correções relativísticas, os relógios do GPS:
- ficariam perfeitos
+ adiantariam cerca de 38 µs por dia, gerando erros de quilômetros
- atrasariam 1 segundo por dia
- parariam
> 45 µs adiantados pela gravidade, 7 µs atrasados pela velocidade.
```

## 6. Exercícios

**1.** Um píon tem vida média de 26 ns em repouso. Num feixe a $0{,}99\,c$ ($\gamma = 7{,}09$), quanto ele vive para o laboratório e que distância percorre?

<details>
<summary>Ver solução</summary>

$\Delta t = 7{,}09 \times 26 \approx 184$ ns. Distância: $0{,}99 \times 3\times10^8 \times 184\times10^{-9} \approx 55$ m (sem a dilatação, seriam 7,7 m).

</details>

**2.** Refaça o paradoxo dos gêmeos com $v = 0{,}6\,c$ e uma estrela a 6 anos-luz.

<details>
<summary>Ver solução</summary>

Para quem fica: $\frac{12}{0{,}6} = 20$ anos. $\gamma = 1{,}25$; para o viajante: $\frac{20}{1{,}25} = 16$ anos.

</details>

**3.** A que velocidade uma régua de 1 m mede 50 cm?

<details>
<summary>Ver solução</summary>

$\gamma = 2$, então $v \approx 0{,}866\,c$.

</details>
