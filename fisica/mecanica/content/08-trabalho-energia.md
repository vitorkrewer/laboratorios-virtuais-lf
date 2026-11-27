# Trabalho, energia e potência em números

No capítulo 4, a energia mudava de forma e se conservava, só com palavras. Agora ela vira números: quanto de energia tem um carro a 60 km/h, de que altura ele precisaria cair para ganhar essa energia, quanto tempo um motor leva para fornecê-la.

> [!DICA] **Volta 2 · Aplicar.** Ao terminar, você vai conseguir:
> - **calcular** energia cinética, energia potencial e trabalho;
> - **usar** a conservação da energia para prever velocidades e alturas;
> - **calcular** potência e consumo de energia de aparelhos.

> [!DICA] **De volta à espiral.** No capítulo 4: energia se transforma e se conserva; o atrito a converte em calor. No capítulo 6: a velocidade de queda. Aqui as duas ideias se encontram.

> [!INTUIÇÃO] **Pense antes de ler.** Um carro a 100 km/h bate num muro. De que altura ele teria de cair para bater com a mesma energia: do 2º, do 5º ou do 13º andar?

## 1. Trabalho

> [!DEFINIÇÃO] **Trabalho** é a energia transferida por uma força ao longo de um deslocamento:
> $$W = F\,d$$
> (força na direção do movimento × distância). Unidade: **joule** (J) = newton × metro.

**Exemplo.** Levantar uma mala de 10 kg (peso de 100 N) até uma prateleira a 2 m: $W = 100 \times 2 = 200$ J.

> [!ATENÇÃO] Na física, segurar uma mala parada, por mais cansativo que seja, não realiza trabalho sobre a mala: não há deslocamento. (Os músculos gastam energia internamente, que vira calor.)

## 2. Energia cinética e potencial

> [!TEOREMA] $$E_c = \frac{m\,v^2}{2} \qquad\qquad E_p = m\,g\,h$$
> A energia cinética cresce com o **quadrado** da velocidade; a potencial gravitacional, com a altura.

A velocidade ao quadrado explica muita coisa: a 100 km/h, um carro tem **quatro vezes** a energia que tem a 50 km/h. É por isso que a distância de frenagem quadruplica (capítulo 5) e as batidas em alta velocidade são tão mais graves.

## 3. Conservação da energia mecânica

Sem atrito, $E_c + E_p$ é constante. Isso permite resolver problemas sem saber a forma do caminho.

**Exemplo.** Um skatista parte do repouso do alto de uma rampa de 5 m. Com que velocidade chega embaixo (sem atrito)?
$$m\,g\,h = \frac{m\,v^2}{2} \Rightarrow v = \sqrt{2\,g\,h} = \sqrt{2 \times 10 \times 5} = 10\ \text{m/s}.$$
A massa se cancela, e a forma da rampa não importa: reta, curva ou em ondas, a velocidade no fim é a mesma.

A resposta da pergunta do início: 100 km/h ≈ 28 m/s; $h = \frac{v^2}{2g} = \frac{28^2}{20} \approx 39$ m, cerca do **13º andar**.

> [!ATENÇÃO] Com atrito, parte da energia mecânica vira térmica. A soma de todas as formas ($E_c + E_p + E_\text{térmica}$) continua constante.

> [!DICA] No simulador [Energia na pista](#/lab/energia), confira: a velocidade no ponto mais baixo só depende da altura de onde o skatista saiu.

## 4. Potência

> [!DEFINIÇÃO] **Potência** é a rapidez com que a energia é transferida:
> $$P = \frac{E}{\Delta t}.$$
> Unidade: **watt** (W) = joule por segundo.

| Aparelho ou situação | Potência aproximada |
|---|---|
| lâmpada de LED | 9 W |
| pessoa subindo escadas | 200 a 400 W |
| chuveiro elétrico | 5 000 a 7 500 W |
| carro popular (motor) | 60 000 W (cerca de 80 cv) |
| turbina de Itaipu | 700 000 000 W |

**Consumo na conta de luz.** A energia elétrica é cobrada em **quilowatt-hora** (kWh): 1 kWh = 1 000 W durante 1 hora = 3,6 milhões de J. Um chuveiro de 6 000 W ligado 10 minutos por dia gasta $6 \times \frac{1}{6} = 1$ kWh por dia, cerca de 30 kWh por mês.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Dobrando a velocidade de um carro, sua energia cinética:
- dobra
+ quadruplica
- fica igual
- cai à metade
> Cresce com v².

? Levantar 50 N a 3 m de altura exige um trabalho de:
+ 150 J
- 53 J
- 16,7 J
- 47 J
> W = F d.

? Um objeto cai de 20 m sem atrito (g = 10 m/s²). Chega ao chão a:
- 10 m/s
+ 20 m/s
- 200 m/s
- 40 m/s
> v = √(2gh) = √400.

? Um aparelho de 2 000 W ligado por 3 horas consome:
- 2 kWh
+ 6 kWh
- 600 kWh
- 0,67 kWh
> 2 kW × 3 h.

? Segurando uma mala parada no ar, o trabalho sobre a mala é:
+ zero
- igual ao peso
- igual ao peso vezes a altura
- infinito
> Não há deslocamento.
```

## 5. Exercícios

**1.** Qual a energia cinética de um carro de 1 000 kg a 72 km/h?

<details>
<summary>Ver solução</summary>

72 km/h = 20 m/s. $E_c = \frac{1\,000 \times 400}{2} = 200\,000$ J $= 200$ kJ.

</details>

**2.** Uma montanha-russa parte do repouso de 45 m de altura. Qual a velocidade no ponto mais baixo (0 m) e num morro de 25 m (sem atrito)?

<details>
<summary>Ver solução</summary>

Embaixo: $v = \sqrt{2 \times 10 \times 45} = 30$ m/s. No morro de 25 m, desceu 20 m: $v = \sqrt{2 \times 10 \times 20} = 20$ m/s.

</details>

**3.** Uma pessoa de 70 kg sobe 3 andares (9 m) em 15 s. Que potência desenvolveu?

<details>
<summary>Ver solução</summary>

$E = 70 \times 10 \times 9 = 6\,300$ J; $P = \frac{6\,300}{15} = 420$ W.

</details>
