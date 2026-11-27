# Fissão, fusão e energia nuclear

A curva da energia de ligação mostra dois caminhos para liberar energia do núcleo: partir núcleos pesados (**fissão**) ou juntar núcleos leves (**fusão**). O primeiro move usinas desde os anos 1950. O segundo move o Sol e, depois de setenta anos de pesquisa, começou a dar mais energia do que consome em laboratório.

> [!DICA] No simulador [Física nuclear](#/lab/nuclear), modo "reação em cadeia", mude a quantidade de urânio e as barras de controle e veja a reação morrer, ficar estável ou disparar.

## 1. A fissão

Em 1938, Otto Hahn e Fritz Strassmann bombardearam urânio com nêutrons e encontraram bário, um elemento com cerca da metade da massa. Lise Meitner e Otto Frisch explicaram: o núcleo havia se **partido em dois**.

> [!TEOREMA] Um nêutron lento absorvido pelo urânio-235 o torna instável, e ele se divide em dois núcleos médios, liberando **2 a 3 nêutrons** e cerca de **200 MeV**:
> $${}^{1}n + {}^{235}\text{U} \to {}^{141}\text{Ba} + {}^{92}\text{Kr} + 3\,{}^{1}n + 200\ \text{MeV}.$$

200 MeV por átomo é cerca de 50 milhões de vezes a energia de uma reação química típica. **1 kg** de urânio-235 fissionado libera cerca de $8\times10^{13}$ J, tanto quanto queimar cerca de 2 700 toneladas de carvão.

## 2. A reação em cadeia

Os nêutrons liberados podem causar novas fissões. Tudo depende do **fator de multiplicação** $k$, o número médio de nêutrons de cada fissão que causam outra fissão:
- $k < 1$: **subcrítico**, a reação morre.
- $k = 1$: **crítico**, a reação se mantém constante. É o regime de um reator.
- $k > 1$: **supercrítico**, a reação cresce exponencialmente.

$k$ depende da quantidade e da forma do material (nêutrons escapam pela superfície: abaixo de uma **massa crítica**, escapam demais), da pureza do U-235 e do que absorve nêutrons.

## 3. O reator nuclear

- **Combustível:** urânio **enriquecido** a 3% a 5% de U-235 (o natural tem 0,7%).
- **Moderador** (água, grafite): desacelera os nêutrons, que assim são absorvidos mais facilmente pelo U-235.
- **Barras de controle** (boro, cádmio): absorvem nêutrons e mantêm $k = 1$.
- **Refrigerante:** leva o calor para gerar vapor e mover turbinas, como numa usina térmica.

> [!ATENÇÃO] Um reator de potência **não pode explodir como uma bomba**: o urânio pouco enriquecido não sustenta uma reação supercrítica rápida. Os acidentes graves (Chernobyl, 1986; Fukushima, 2011) foram perda de controle térmico, incêndio, explosões de vapor e hidrogênio, e liberação de material radioativo. O problema de longo prazo são os **rejeitos**, radioativos por milhares de anos. No Brasil, as usinas Angra 1 e Angra 2 geram cerca de 2% a 3% da eletricidade do país.

## 4. A fusão

> [!TEOREMA] A reação de fusão mais fácil de obter é a de deutério com trítio:
> $${}^{2}\text{H} + {}^{3}\text{H} \to {}^{4}\text{He} + n + 17{,}6\ \text{MeV}.$$
> Por massa de combustível, libera cerca de quatro vezes mais energia que a fissão.

O obstáculo é a repulsão elétrica entre os núcleos: é preciso um gás a **mais de 100 milhões de graus** (um plasma), mantido denso por tempo suficiente.
- **Confinamento magnético (tokamaks):** o plasma é preso por campos magnéticos numa câmara em forma de rosca. O ITER, em construção na França, deve começar a operar com deutério-trítio em 2039, segundo o cronograma revisado em 2024.
- **Confinamento inercial:** lasers comprimem uma cápsula de combustível em bilionésimos de segundo. Em dezembro de 2022, o NIF (EUA) obteve pela primeira vez mais energia de fusão (3,15 MJ) do que a dos lasers que atingiram o alvo (2,05 MJ). Em abril de 2025, o recorde passou a 8,6 MJ com 2,08 MJ de laser, um ganho de mais de 4.

> [!ATENÇÃO] Esse "ganho" compara a energia de fusão com a energia dos lasers que **chegou ao alvo**. Os lasers consomem da rede elétrica centenas de vezes mais. Uma usina de fusão comercial ainda está a décadas de distância.

No **Sol**, a fusão é outra: quatro prótons viram um núcleo de hélio pela cadeia próton-próton, a cerca de 15 milhões de graus, com a ajuda do tunelamento. É lenta, e por isso o Sol dura 10 bilhões de anos.

## 5. Radiação e saúde

A dose de radiação absorvida pelo corpo se mede em **sieverts** (Sv). Valores típicos:
- radiação natural (solo, ar, alimentos, raios cósmicos): cerca de 2,4 mSv por ano;
- radiografia de tórax: cerca de 0,02 a 0,1 mSv;
- tomografia: cerca de 2 a 10 mSv;
- acima de cerca de 1 Sv recebido de uma vez: sintomas agudos; cerca de 5 Sv: frequentemente fatal sem tratamento.

> [!ATENÇÃO] Ser **irradiado** não torna ninguém radioativo (uma radiografia não deixa você emitindo radiação). O perigo maior é a **contaminação**: inalar ou ingerir material radioativo, que continua emitindo dentro do corpo.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Na fissão do urânio-235, cada fissão libera cerca de:
- 2 eV
- 17,6 MeV
+ 200 MeV
- 1 GeV
> Mais 2 ou 3 nêutrons.

? Um reator nuclear em operação normal tem fator de multiplicação:
- k < 1
+ k = 1
- k > 1
- k = 0
> Estado crítico, controlado pelas barras.

? A função do moderador num reator é:
- absorver nêutrons
+ desacelerar os nêutrons
- resfriar as barras
- enriquecer o urânio
> Nêutrons lentos causam fissão no U-235 com mais facilidade.

? A fusão exige temperaturas altíssimas porque:
+ os núcleos se repelem eletricamente
- o hidrogênio é sólido
- é preciso derreter o reator
- os nêutrons são muito lentos
> É preciso vencer (ou tunelar) a barreira elétrica.

? O resultado do NIF de 2022 foi histórico porque:
- gerou eletricidade para a rede
+ produziu mais energia de fusão do que a energia de laser que chegou ao alvo
- foi a primeira fusão já feita
- usou só hidrogênio comum
> 3,15 MJ contra 2,05 MJ.
```

## 6. Exercícios

**1.** Quantas fissões por segundo são necessárias para gerar 1 GW de potência térmica?

<details>
<summary>Ver solução</summary>

200 MeV $= 3{,}2\times10^{-11}$ J. Fissões: $\frac{10^9}{3{,}2\times10^{-11}} \approx 3{,}1\times10^{19}$ por segundo.

</details>

**2.** Na reação D-T, cerca de 80% da energia sai com o nêutron. Quanto é isso?

<details>
<summary>Ver solução</summary>

$0{,}8 \times 17{,}6 \approx 14{,}1$ MeV. Por isso a parede de um reator de fusão precisa capturar nêutrons muito energéticos.

</details>
