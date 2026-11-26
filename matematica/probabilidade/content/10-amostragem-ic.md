# Amostragem, Teorema Central do Limite e intervalos de confiança

Até aqui, a probabilidade partia de um modelo conhecido e calculava o que os dados devem mostrar. A **inferência** faz o caminho inverso: dos dados de uma amostra, o que se pode afirmar sobre a população? O resultado que torna isso possível é o Teorema Central do Limite.

> [!DICA] No simulador [Normal e TCL](#/lab/normal), escolha o modo "Teorema Central do Limite": sorteie milhares de amostras de uma população nada normal e veja o histograma das médias virar um sino.

## 1. Parâmetro e estatística

| | População | Amostra |
|---|---|---|
| Média | $\mu$ (parâmetro) | $\bar x$ (estatística) |
| Desvio padrão | $\sigma$ | $s$ |
| Proporção | $p$ | $\hat p$ |

O parâmetro é fixo e desconhecido; a estatística é calculada da amostra e **varia de amostra para amostra**. Essa variação tem uma distribuição: a **distribuição amostral**.

> [!ATENÇÃO] Nada disso funciona sem uma **amostra aleatória**: todos os elementos com chance de ser escolhidos. Uma enquete em rede social ou só com quem atendeu o telefone tem **viés** que nenhuma fórmula corrige.

## 2. O Teorema Central do Limite

> [!TEOREMA] **(TCL)** Se $X_1, \ldots, X_n$ são independentes, de uma população com média $\mu$ e desvio padrão $\sigma$, então, para $n$ grande, a média amostral é aproximadamente normal:
> $$\bar X \approx N\!\left(\mu,\ \frac{\sigma^2}{n}\right).$$
> Isso vale **qualquer que seja** a forma da população.

O desvio padrão de $\bar X$, $\dfrac{\sigma}{\sqrt n}$, chama-se **erro padrão**.

> [!INTUIÇÃO] Na média, valores altos e baixos se compensam. Quanto maior a amostra, mais a média "gruda" em $\mu$, e o espalhamento cai com $\sqrt n$: para reduzir o erro pela **metade**, é preciso **quadruplicar** a amostra. Na prática, $n \ge 30$ costuma bastar (menos, se a população já for parecida com uma normal).

**Exemplo.** O tempo de atendimento tem média 8 min e desvio 6 min (bem assimétrico). Para 36 atendimentos, $\bar X \approx N(8, 1^2)$, e $P(\bar X > 10) \approx P(Z > 2) \approx 0{,}023$.

## 3. Intervalo de confiança para a média

Como $\bar x$ costuma cair a menos de $1{,}96$ erros padrão de $\mu$ (95% das vezes), invertemos o raciocínio:

> [!DEFINIÇÃO] Um **intervalo de 95% de confiança** para $\mu$ é
> $$\bar x \pm 1{,}96\,\frac{\sigma}{\sqrt n}.$$
> Com $\sigma$ desconhecido e amostra grande, usa-se $s$ no lugar de $\sigma$. (Para amostras pequenas, troca-se $1{,}96$ pelo valor da distribuição $t$ de Student.)

| Confiança | 90% | 95% | 99% |
|---|---|---|---|
| $z$ | $1{,}645$ | $1{,}96$ | $2{,}576$ |

**Exemplo.** 64 lâmpadas: $\bar x = 1\,200$ h, $s = 80$ h. Erro padrão $\frac{80}{8} = 10$. IC 95%: $1\,200 \pm 19{,}6$, ou seja, $[1\,180{,}4;\ 1\,219{,}6]$ horas.

> [!ATENÇÃO] "95% de confiança" **não** quer dizer que há 95% de probabilidade de $\mu$ estar **neste** intervalo (ou está, ou não está). Quer dizer que o **método** acerta 95% das vezes: de 100 amostras, cerca de 95 intervalos construídos assim conteriam $\mu$.

## 4. Intervalo para uma proporção e margem de erro

$$\hat p \pm 1{,}96\sqrt{\frac{\hat p(1 - \hat p)}{n}}$$

**Exemplo.** Numa pesquisa com 1.000 eleitores, 40% votam no candidato A. Margem: $1{,}96\sqrt{\frac{0{,}4 \cdot 0{,}6}{1000}} \approx 0{,}030$. Resultado: "40%, com margem de erro de 3 pontos para mais ou para menos, e 95% de confiança".

> [!DICA] Tamanho de amostra: o pior caso é $\hat p = 0{,}5$. Para margem $E$ com 95%, $n \approx \left(\frac{1{,}96 \cdot 0{,}5}{E}\right)^2$. Margem de 2 pontos exige $n \approx 2\,401$. Repare que o tamanho da **população** nem aparece: 2.400 entrevistas servem para uma cidade ou para o país.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Pelo TCL, a distribuição da média amostral para $n$ grande é aproximadamente:
- igual à da população
+ normal
- uniforme
- binomial
> Qualquer que seja a forma da população.

? Uma população tem $\sigma = 12$. O erro padrão da média com $n = 36$ é:
- $12$
- $\frac13$
+ $2$
- $0{,}33$
> $\frac{12}{\sqrt{36}}$.

? Para reduzir o erro padrão à metade, o tamanho da amostra deve ser multiplicado por:
- $2$
+ $4$
- $\sqrt2$
- $8$
> O erro cai com $\sqrt n$.

? Aumentando o nível de confiança de 95% para 99% (mesma amostra), o intervalo:
+ fica mais largo
- fica mais estreito
- não muda
- deixa de existir
> Mais confiança exige um intervalo maior ($z = 2{,}576$).

? "IC de 95% para $\mu$: $[48, 52]$" significa que:
- $\mu$ tem 95% de chance de estar entre 48 e 52
+ o método usado acerta $\mu$ em 95% das amostras
- 95% dos dados estão entre 48 e 52
- a média amostral está entre 48 e 52 com 95% de chance
> A confiança é do procedimento, não deste intervalo específico.
```

## 5. Exercícios

**1.** Uma amostra de 100 pessoas tem altura média 168 cm e $s = 10$ cm. Construa o IC de 95% para a média.

<details>
<summary>Ver solução</summary>

Erro padrão $1$. $168 \pm 1{,}96$: $[166{,}04;\ 169{,}96]$.

</details>

**2.** Numa amostra de 400 peças, 20 são defeituosas. Dê o IC de 95% para a proporção de defeituosas.

<details>
<summary>Ver solução</summary>

$\hat p = 0{,}05$; margem $1{,}96\sqrt{\frac{0{,}05 \cdot 0{,}95}{400}} \approx 0{,}021$. IC: $[0{,}029;\ 0{,}071]$.

</details>

**3.** Quantas pessoas entrevistar para uma margem de 4 pontos com 95% de confiança?

<details>
<summary>Ver solução</summary>

$\left(\frac{1{,}96 \cdot 0{,}5}{0{,}04}\right)^2 = 24{,}5^2 \approx 601$.

</details>

**4.** A renda de uma cidade é muito assimétrica, com média 3.000 e desvio 2.500. Qual a probabilidade de a média de 100 rendas sorteadas passar de 3.500?

<details>
<summary>Ver solução</summary>

Erro padrão $250$; $z = 2$; $P \approx 0{,}023$. O TCL permite usar a normal mesmo com a população assimétrica.

</details>
