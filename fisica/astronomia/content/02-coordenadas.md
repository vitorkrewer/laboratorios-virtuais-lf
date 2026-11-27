# Coordenadas celestes e tempo

Para dizer "onde" está um astro, precisamos de coordenadas, como latitude e longitude na Terra. Existem dois sistemas principais: um preso ao **observador** (útil para apontar um telescópio agora) e outro preso ao **céu** (útil para catálogos, porque não muda com o lugar nem a hora). Ligar os dois exige uma ideia nova de tempo: o **tempo sideral**.

> [!DICA] No [Planetário](#/lab/planetario), clique numa estrela: aparecem as coordenadas horizontais (altura e azimute) e equatoriais (ascensão reta e declinação). Mude a hora e veja quais mudam.

## 1. Coordenadas horizontais

> [!DEFINIÇÃO]
> - **Altura** $h$: ângulo do astro acima do horizonte, de $0^\circ$ (no horizonte) a $90^\circ$ (no zênite). Negativa: abaixo do horizonte.
> - **Azimute** $A$: direção ao longo do horizonte, medida a partir do **Norte**, girando para o **Leste**: N $= 0^\circ$, L $= 90^\circ$, S $= 180^\circ$, O $= 270^\circ$.

São intuitivas ("$30^\circ$ acima do horizonte, na direção sudeste"), mas valem só para **aquele lugar e aquele instante**: com o giro do céu, a altura e o azimute de cada estrela mudam o tempo todo.

## 2. Coordenadas equatoriais

> [!DEFINIÇÃO]
> - **Declinação** $\delta$: é a "latitude" no céu, de $+90^\circ$ (polo norte celeste) a $-90^\circ$ (polo sul celeste), com $0^\circ$ no equador celeste.
> - **Ascensão reta** $\alpha$: é a "longitude" no céu, medida ao longo do equador celeste a partir do **ponto vernal** (onde o Sol cruza o equador celeste em março), para leste. É dada em **horas**, de $0^\text{h}$ a $24^\text{h}$, com $1^\text{h} = 15^\circ$.

Essas coordenadas giram **junto** com o céu, por isso cada estrela tem $(\alpha, \delta)$ praticamente fixos e listados em catálogos. Sírius, por exemplo: $\alpha = 6^\text{h}\,45^\text{m}$, $\delta = -16^\circ 43'$.

> [!ATENÇÃO] Os minutos de ascensão reta ($^\text{m}$) são minutos de **tempo**: $1^\text{m} = 15'$ de arco. Já os minutos da declinação ($'$) são minutos de **arco**. Não troque um pelo outro.

## 3. A latitude e a altura do polo

> [!TEOREMA] A altura do polo celeste visível acima do horizonte é igual à **latitude** do observador.

Por isso, em São Paulo ($\varphi \approx 23{,}5^\circ$ S), o polo sul celeste fica $23{,}5^\circ$ acima do horizonte sul. Navegadores usavam a altura da Estrela Polar para saber a própria latitude.

Duas consequências úteis, para uma estrela de declinação $\delta$ vista da latitude $\varphi$ (ambas com sinal, sul negativo):
- A **altura máxima** (na passagem pelo meridiano) é $h_\text{máx} = 90^\circ - \lvert \varphi - \delta \rvert$.
- A estrela é **circumpolar** se $\lvert \delta \rvert > 90^\circ - \lvert \varphi \rvert$ com o mesmo sinal de $\varphi$, e **nunca nasce** se o mesmo vale com sinal oposto.

**Exemplo.** Antares ($\delta \approx -26{,}4^\circ$) vista de São Paulo ($\varphi = -23{,}5^\circ$): $h_\text{máx} = 90^\circ - 2{,}9^\circ = 87{,}1^\circ$. Passa quase no zênite.

## 4. Tempo sideral

O céu completa uma volta em relação ao observador a cada **dia sideral**, de 23 h 56 min 4 s. O relógio que acompanha esse giro marca o **tempo sideral local** (TSL).

> [!DEFINIÇÃO] O **tempo sideral local** é a ascensão reta das estrelas que estão passando pelo meridiano naquele momento. O **ângulo horário** de uma estrela é $H = \text{TSL} - \alpha$: quanto tempo se passou desde que ela cruzou o meridiano.

> [!INTUIÇÃO] Pense no meridiano local como o ponteiro de um relógio parado e no céu como o mostrador girando. O TSL diz qual "hora" do mostrador está sob o ponteiro. Uma estrela com $\alpha = \text{TSL}$ está no ponto mais alto do seu trajeto.

Com $H$, $\delta$ e a latitude $\varphi$, a trigonometria esférica dá a altura:
$$\sin h = \sin\varphi\,\sin\delta + \cos\varphi\,\cos\delta\,\cos H$$

É exatamente essa conta que o planetário faz para cada uma das cerca de 5 000 estrelas, a cada quadro.

**Por que 4 minutos de diferença?** O dia solar (24 h) é medido pelo Sol. Como a Terra avança cerca de $1^\circ$ por dia na órbita, o Sol parece andar cerca de $1^\circ$ por dia para leste entre as estrelas, e a Terra precisa girar esse grau a mais para trazê-lo de volta ao meridiano: $\frac{24\text{ h}}{360} \approx 4$ min. Consequência: cada estrela nasce cerca de 4 minutos mais cedo a cada noite, e o céu da meia-noite muda ao longo do ano.

## 5. Precessão

O eixo da Terra não aponta sempre para o mesmo lugar: ele descreve um cone, como um pião, em cerca de **26 000 anos**. Esse movimento, a **precessão dos equinócios**, desloca lentamente os polos celestes e o ponto vernal. Por isso os catálogos indicam a época das coordenadas (por exemplo, **J2000**). Daqui a uns 12 000 anos, a estrela polar do norte será Vega.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Qual par de coordenadas de uma estrela praticamente não muda com o lugar nem com a hora?
- altura e azimute
+ ascensão reta e declinação
- altura e declinação
- azimute e ascensão reta
> As equatoriais giram junto com o céu.

? Em Porto Alegre (latitude $30^\circ$ S), o polo sul celeste fica a que altura?
- $60^\circ$
+ $30^\circ$
- $0^\circ$
- $90^\circ$
> A altura do polo é igual à latitude.

? Uma ascensão reta de $2^\text{h}$ corresponde a:
- $2^\circ$
- $15^\circ$
+ $30^\circ$
- $120^\circ$
> $1^\text{h} = 15^\circ$.

? Uma estrela cuja ascensão reta é igual ao tempo sideral local:
+ está passando pelo meridiano
- está nascendo
- está se pondo
- está no polo
> Ângulo horário $H = 0$.

? A precessão dos equinócios tem período de cerca de:
- 1 ano
- 365 anos
+ 26 000 anos
- 1 milhão de anos
> O eixo da Terra descreve um cone, como um pião.
```

## 6. Exercícios

**1.** Converta $\alpha = 5^\text{h}\,36^\text{m}$ para graus.

<details>
<summary>Ver solução</summary>

$5{,}6 \times 15^\circ = 84^\circ$.

</details>

**2.** Qual é a altura máxima de Sírius ($\delta = -16{,}7^\circ$) vista de Fortaleza ($\varphi = -3{,}7^\circ$)?

<details>
<summary>Ver solução</summary>

$90^\circ - \lvert -3{,}7 + 16{,}7 \rvert = 90^\circ - 13^\circ = 77^\circ$.

</details>

**3.** De que latitudes Acrux ($\delta = -63^\circ$) é circumpolar?

<details>
<summary>Ver solução</summary>

Precisa de $63^\circ > 90^\circ - \lvert\varphi\rvert$ com $\varphi$ ao sul: $\lvert\varphi\rvert > 27^\circ$ S. Porto Alegre ($30^\circ$ S) já vê o Cruzeiro sem nunca se pôr.

</details>

**4.** Se uma estrela passa pelo meridiano às 22 h de hoje, a que horas ela passa daqui a 30 dias?

<details>
<summary>Ver solução</summary>

Cerca de 4 min mais cedo por dia: $30 \times 4 = 120$ min. Por volta das 20 h.

</details>
