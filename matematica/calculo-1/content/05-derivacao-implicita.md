# Derivação implícita e taxas relacionadas

Nem toda curva vem escrita como $y = f(x)$. Um círculo, por exemplo, é $x^2 + y^2 = 25$. A **derivação implícita** permite achar $y'$ sem isolar $y$.

## 1. Derivação implícita

A ideia: derive os dois lados da equação em relação a $x$, lembrando que **$y$ é função de $x$**. Toda vez que derivar um termo com $y$, a regra da cadeia gera um fator $y'$.

$$\frac{d}{dx}\big(y^2\big) = 2y\,y' \qquad \frac{d}{dx}\big(\sin y\big) = \cos y \cdot y' \qquad \frac{d}{dx}\big(xy\big) = y + x\,y'$$

**Receita:**

1. Derive os dois lados em relação a $x$.
2. Junte todos os termos com $y'$ de um lado.
3. Isole $y'$.

**Exemplo.** Em $x^2 + y^2 = 25$:

$$2x + 2y\,y' = 0 \implies y' = -\frac{x}{y}$$

No ponto $(3, 4)$, a inclinação é $-\dfrac{3}{4}$, e a tangente é $y - 4 = -\dfrac34(x - 3)$.

**Exemplo.** Em $x^3 + y^3 = 6xy$:

$$3x^2 + 3y^2 y' = 6y + 6x\,y' \implies y'\,(3y^2 - 6x) = 6y - 3x^2 \implies y' = \frac{2y - x^2}{y^2 - 2x}$$

> [!ATENÇÃO] O erro típico é esquecer o fator $y'$ ao derivar termos com $y$. Se $y$ aparece, **sempre** surge $y'$.

## 2. Taxas relacionadas

Quando várias grandezas dependem do tempo $t$ e estão ligadas por uma equação, suas taxas de variação também estão ligadas. Derivamos a relação **em relação a $t$**.

**Roteiro:**

1. Desenhe a situação e nomeie as variáveis.
2. Escreva a relação geométrica ou física entre elas.
3. Derive em relação a $t$ (com a regra da cadeia).
4. **Só agora** substitua os valores do instante pedido.

> [!ATENÇÃO] Não substitua valores numéricos antes de derivar, a menos que sejam constantes durante todo o movimento. Substituir cedo "congela" uma grandeza que deveria variar.

### Exemplo 1: o balão

O raio de uma esfera cresce a $2$ cm/s. Qual a taxa de crescimento do volume quando $r = 5$ cm?

$V = \dfrac43\pi r^3 \implies \dfrac{dV}{dt} = 4\pi r^2\,\dfrac{dr}{dt}$. Com $r = 5$ e $\dfrac{dr}{dt} = 2$: $\dfrac{dV}{dt} = 4\pi\cdot 25\cdot 2 = 200\pi \approx 628$ cm³/s.

### Exemplo 2: a escada

Uma escada de $5$ m está apoiada na parede. O pé escorrega, afastando-se a $1$ m/s. Qual a velocidade com que o topo desce quando o pé está a $3$ m da parede?

Seja $x$ a distância do pé e $y$ a altura do topo: $x^2 + y^2 = 25$. Derivando em $t$: $2x\,x' + 2y\,y' = 0$, então $y' = -\dfrac{x}{y}x'$.

Com $x = 3$, temos $y = 4$ e $x' = 1$, logo $y' = -\dfrac{3}{4}$ m/s. O topo desce a $0{,}75$ m/s.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Derivando $y^3$ em relação a $x$ (com $y=y(x)$):
- $3y^2$
+ $3y^2\,y'$
- $3x^2$
- $(y')^3$
> $y$ depende de $x$: a regra da cadeia gera o fator $y'$.

? Em $x^2+y^2=1$, a derivada $y'$ é:
+ $-\dfrac{x}{y}$
- $\dfrac{x}{y}$
- $-\dfrac{y}{x}$
- $2x+2y$
> $2x+2yy'=0\Rightarrow y'=-\frac{x}{y}$.

? Derivando $x\,y$ em relação a $x$:
- $y'$
- $x\,y'$
+ $y+x\,y'$
- $1$
> Regra do produto: $(x)'y+x(y)'=y+xy'$.

? Em taxas relacionadas, quando se substituem os valores do instante pedido?
- Antes de derivar, para simplificar
+ Depois de derivar a relação em relação a $t$
- Tanto faz
- Nunca: a resposta fica em função de $t$
> Substituir antes "congela" grandezas que variam e zera derivadas que não são nulas.

? O raio de um círculo cresce a $2$ cm/s. Qual a taxa de crescimento da área quando $r=3$ cm?
+ $12\pi$ cm²/s
- $6\pi$ cm²/s
- $9\pi$ cm²/s
- $4\pi$ cm²/s
> $A=\pi r^2\Rightarrow A'=2\pi r\,r'=2\pi\cdot3\cdot2=12\pi$.
```

## 3. Exercícios

**1.** Encontre $y'$ em $x^2 + xy + y^2 = 7$.

<details>
<summary>Ver solução</summary>

$2x + y + x\,y' + 2y\,y' = 0 \implies y'(x + 2y) = -(2x + y) \implies y' = -\dfrac{2x + y}{x + 2y}$.

</details>

**2.** Encontre a tangente a $x^2 + y^2 = 25$ em $(-3, 4)$.

<details>
<summary>Ver solução</summary>

$y' = -x/y = 3/4$. A tangente é $y - 4 = \dfrac34(x + 3)$.

</details>

**3.** Encontre $y'$ em $e^{xy} = x + y$.

<details>
<summary>Ver solução</summary>

$e^{xy}(y + x\,y') = 1 + y'$. Então $y'(x e^{xy} - 1) = 1 - y e^{xy}$, logo $y' = \dfrac{1 - ye^{xy}}{xe^{xy} - 1}$.

</details>

**4.** Um quadrado tem lado crescendo a $3$ cm/s. A que taxa cresce a área quando o lado vale $10$ cm?

<details>
<summary>Ver solução</summary>

$A = \ell^2 \implies A' = 2\ell\,\ell' = 2\cdot 10\cdot 3 = 60$ cm²/s.

</details>

**5.** Um tanque cônico (vértice para baixo) tem raio $4$ m e altura $8$ m no topo. Água entra a $2$ m³/min. A que taxa sobe o nível quando a altura é $4$ m?

<details>
<summary>Ver solução</summary>

Por semelhança, $r = h/2$. O volume é $V = \tfrac13\pi r^2 h = \tfrac{\pi}{12}h^3$. Derivando, $V' = \tfrac{\pi}{4}h^2 h'$. Com $h = 4$ e $V' = 2$: $2 = 4\pi h'$, então $h' = \dfrac{1}{2\pi} \approx 0{,}16$ m/min.

</details>
