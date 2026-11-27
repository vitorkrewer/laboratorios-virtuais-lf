# Buracos negros

Um buraco negro é uma região do espaço de onde nada escapa, nem a luz. Durante décadas foi só uma solução estranha das equações de Einstein. Hoje temos medidas de órbitas de estrelas em volta deles, centenas de detecções de ondas gravitacionais de suas colisões e até imagens da sombra de dois deles. Perto de um buraco negro, o tempo passa mais devagar, o espaço se estica e a luz faz curvas.

> [!DICA] No simulador [Buraco negro](#/lab/buraco), aproxime-se do horizonte e veja o céu ao fundo se distorcer pela lente gravitacional; o painel mostra quanto tempo passa longe dali enquanto passa uma hora perto.

## 1. A ideia: velocidade de escape igual à da luz

Já em 1783, John Michell perguntou: e se uma estrela fosse tão compacta que a velocidade de escape superasse a da luz? Igualando $\sqrt{\frac{2GM}{r}} = c$:

> [!DEFINIÇÃO] O **raio de Schwarzschild** é
> $$r_s = \frac{2GM}{c^2} \approx 2{,}95\ \text{km} \times \frac{M}{M_\odot}.$$
> A esfera com esse raio é o **horizonte de eventos**: de dentro dele, nada sai.

| Objeto | Massa | Raio do horizonte |
|---|---|---|
| Terra (se fosse comprimida) | $6\times10^{24}$ kg | 9 mm |
| Sol (se fosse comprimido) | $1\,M_\odot$ | 3 km |
| Buraco negro estelar típico | $10\,M_\odot$ | 30 km |
| Sagitário A*, no centro da Via Láctea | $4{,}3\times10^{6}\,M_\odot$ | 12,7 milhões de km (0,08 UA) |
| M87*, na galáxia M87 | $6{,}5\times10^{9}\,M_\odot$ | cerca de 130 UA |

A derivação "newtoniana" dá a fórmula certa por coincidência; a descrição correta é a da **relatividade geral**, em que a massa curva o espaço-tempo. Karl Schwarzschild encontrou essa solução em 1916, poucas semanas depois de Einstein publicar a teoria.

> [!ATENÇÃO] Um buraco negro **não é um aspirador cósmico**. Longe dele, a gravidade é a mesma de qualquer objeto com a mesma massa. Se o Sol virasse um buraco negro de 3 km, a Terra continuaria na mesma órbita (no escuro e no frio, mas na mesma órbita).

## 2. Regiões em volta de um buraco negro (sem rotação)

| Raio | O que acontece |
|---|---|
| $r = r_s$ | **horizonte de eventos**: ponto sem volta |
| $r = 1{,}5\,r_s$ | **esfera de fótons**: a luz pode orbitar em círculo (instável) |
| $r = 3\,r_s$ | **órbita estável mais interna**: abaixo dela, matéria em órbita espirala para dentro; é a borda interna do disco de acreção |
| $r \approx 2{,}6\,r_s$ (visto de fora) | **sombra**: o disco escuro que os telescópios veem, contornado pela luz que passou rente à esfera de fótons |

## 3. O tempo passa mais devagar

> [!TEOREMA] Para um relógio parado à distância $r$ do centro, comparado com um relógio muito longe,
> $$\frac{\Delta t_\text{perto}}{\Delta t_\text{longe}} = \sqrt{1 - \frac{r_s}{r}}.$$

Perto do horizonte, esse fator tende a zero: o tempo de quem está perto quase para, visto de longe.

**Exemplo.** Um relógio parado a $r = 1{,}01\,r_s$ marca $\sqrt{1 - \frac{1}{1{,}01}} \approx 0{,}0995$ do tempo de longe. Uma hora lá equivale a cerca de **10 horas** longe dali.

> [!INTUIÇÃO] Esse efeito não é exclusivo dos buracos negros: os relógios dos satélites de GPS, mais longe da Terra, adiantam cerca de 45 microssegundos por dia em relação aos do chão (e atrasam 7 pela velocidade, pela relatividade especial). Sem corrigir isso, o GPS erraria cerca de 10 km por dia.

Quem cai no buraco negro não sente nada de especial no próprio relógio. Mas quem olha de longe vê a pessoa desacelerar, ficar cada vez mais vermelha (**desvio gravitacional para o vermelho**) e mais apagada, até sumir, sem nunca vê-la cruzar o horizonte.

## 4. Marés: o efeito "espaguete"

A gravidade nos pés de quem cai de pé é maior que na cabeça. A diferença de aceleração num corpo de comprimento $L$ a uma distância $r$ é
$$\Delta a \approx \frac{2GM\,L}{r^3}.$$

No horizonte ($r = r_s$), isso vale $\frac{c^6 L}{4G^2M^2}$: **diminui com o quadrado da massa**.
- Num buraco negro de $10\,M_\odot$, a diferença numa pessoa de 2 m, ainda a 100 km do centro, já passa de 500 mil vezes a gravidade da Terra: a pessoa é esticada como um espaguete muito antes de chegar ao horizonte.
- Num buraco negro supermassivo, as marés no horizonte são fracas; dá para atravessá-lo inteiro e só ser despedaçado muito mais para dentro.

## 5. Como sabemos que existem

| Evidência | O que mostrou |
|---|---|
| **Binárias de raios X** (Cygnus X-1, 1971) | objetos invisíveis com mais de 3 massas solares, pesados demais para ser estrelas de nêutrons, puxando gás de uma companheira |
| **Estrelas no centro da Via Láctea** | a estrela S2 dá uma volta em 16 anos em torno de um objeto de $4\times10^{6}\,M_\odot$ que cabe dentro da órbita de Mercúrio (Nobel de 2020) |
| **Ondas gravitacionais** (2015) | GW150914: dois buracos negros de 36 e 29 massas solares fundindo-se; cerca de 3 massas solares viraram energia de ondas gravitacionais em fração de segundo |
| **Imagens do Event Horizon Telescope** | a sombra de M87* (2019) e de Sagitário A* (2022), com o tamanho previsto pela relatividade geral |

Em maio de 2026, com o catálogo GWTC-5.0, o total de sinais de ondas gravitacionais detectados chegou a **390**, a grande maioria de pares de buracos negros.

## 6. Rotação, radiação de Hawking e o que não sabemos

- **Buracos negros que giram** (de Kerr) arrastam o espaço-tempo em volta, criando a **ergosfera**, de onde ainda é possível escapar e até extrair energia de rotação. Quase todos os buracos negros reais giram.
- **Radiação de Hawking:** a teoria quântica prevê que buracos negros emitem uma radiação fraquíssima e evaporam. A temperatura é inversamente proporcional à massa: para um buraco negro estelar, é bilionésimos de grau, impossível de medir.
- **O centro:** a relatividade geral prevê uma **singularidade**, onde a densidade seria infinita. Isso indica que a teoria deixa de valer ali; uma teoria quântica da gravidade ainda não existe.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? O raio de Schwarzschild de um buraco negro de 10 massas solares é de cerca de:
- 3 km
+ 30 km
- 300 km
- 3 000 km
> $2{,}95$ km por massa solar.

? Se o Sol virasse um buraco negro com a mesma massa, a órbita da Terra:
+ continuaria igual
- seria engolida
- ficaria mais curta
- escaparia do Sistema Solar
> Longe dele, a gravidade é a mesma.

? Para um relógio parado perto do horizonte, comparado com um relógio distante, o tempo:
- passa mais rápido
+ passa mais devagar
- passa igual
- anda para trás
> Fator $\sqrt{1 - r_s/r}$.

? As forças de maré no horizonte são mais fracas num buraco negro:
- de 10 massas solares
+ supermassivo
- que não gira
- pequeno
> Diminuem com o quadrado da massa.

? A primeira detecção direta de ondas gravitacionais (2015) veio de:
- duas estrelas de nêutrons
+ dois buracos negros se fundindo
- uma supernova
- um pulsar
> GW150914.
```

## 7. Exercícios

**1.** Calcule o raio do horizonte de Sagitário A* ($4{,}3\times10^{6}\,M_\odot$) em km e em UA.

<details>
<summary>Ver solução</summary>

$2{,}95 \times 4{,}3\times10^{6} \approx 1{,}27\times10^{7}$ km $\approx 0{,}085$ UA (cerca de um quinto da órbita de Mercúrio).

</details>

**2.** A que distância do centro, em raios de Schwarzschild, um relógio parado anda na metade do ritmo de um relógio distante?

<details>
<summary>Ver solução</summary>

$\sqrt{1 - \frac{r_s}{r}} = \frac12 \Rightarrow \frac{r_s}{r} = \frac34 \Rightarrow r = \frac43 r_s \approx 1{,}33\,r_s$.

</details>

**3.** Calcule a diferença de aceleração de maré numa pessoa de 2 m no horizonte de um buraco negro de $10\,M_\odot$ ($r_s = 29{,}5$ km).

<details>
<summary>Ver solução</summary>

$\Delta a = \frac{2GML}{r_s^3} = \frac{2\cdot6{,}674\times10^{-11}\cdot1{,}989\times10^{31}\cdot2}{(2{,}95\times10^{4})^3} \approx \frac{5{,}3\times10^{21}}{2{,}57\times10^{13}} \approx 2\times10^{8}$ m/s², 20 milhões de vezes a gravidade da Terra.

</details>

**4.** E no horizonte de Sagitário A*?

<details>
<summary>Ver solução</summary>

A maré no horizonte cai com $M^2$: $\frac{2\times10^{8}}{(4{,}3\times10^{5})^2} \approx 1{,}1\times10^{-3}$ m/s², imperceptível.

</details>
