# Elipse

A elipse é o "círculo achatado". Órbitas de planetas são elipses (com o Sol num dos focos), e ela aparece sempre que um círculo é visto de lado. Sua definição usa **dois** focos.

> [!DICA] No simulador [Cônicas](#/lab/conicas), escolha "Elipse" e mova o ponto: as duas distâncias até os focos mudam, mas a soma fica sempre igual a $2a$.

## 1. Definição

> [!DEFINIÇÃO] Dados dois pontos $F_1$ e $F_2$ (os **focos**) e um número $2a$ maior que a distância entre eles, a **elipse** é o conjunto dos pontos $P$ tais que
> $$d(P, F_1) + d(P, F_2) = 2a.$$

> [!INTUIÇÃO] O "método do jardineiro": prenda as pontas de um barbante de comprimento $2a$ em duas estacas (os focos) e, com o barbante esticado, risque o chão. A soma das distâncias é sempre o comprimento do barbante.

## 2. Elementos e a relação fundamental

- **Centro**: ponto médio dos focos.
- **Eixo maior**: mede $2a$; seus extremos são os **vértices**.
- **Eixo menor**: mede $2b$.
- **Distância focal**: $2c$ (distância entre os focos).

> [!TEOREMA] $a^2 = b^2 + c^2$, com $a > b$ e $a > c$.

> [!INTUIÇÃO] Do extremo do eixo menor, as distâncias aos dois focos são iguais e somam $2a$, então cada uma vale $a$. Com metade do eixo menor ($b$) e metade da distância focal ($c$), forma-se um triângulo retângulo de hipotenusa $a$.

## 3. Equações

**Eixo maior horizontal** (focos em $(\pm c, 0)$), centro na origem:

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$$

**Eixo maior vertical** (focos em $(0, \pm c)$):

$$\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1$$

> [!DICA] O **maior** denominador é sempre $a^2$, e ele fica sob a variável do eixo maior. Em $\frac{x^2}{9} + \frac{y^2}{25} = 1$, o $25$ está sob $y$: eixo maior vertical, $a = 5$, $b = 3$, $c = 4$.

Com centro em $(h, k)$: $\dfrac{(x - h)^2}{a^2} + \dfrac{(y - k)^2}{b^2} = 1$ (ou com $a^2$ sob $y$).

**Exemplo.** $\frac{x^2}{25} + \frac{y^2}{9} = 1$: $a = 5$, $b = 3$, $c = \sqrt{25 - 9} = 4$. Focos $(\pm4, 0)$; vértices $(\pm5, 0)$; extremos do eixo menor $(0, \pm3)$.

## 4. Excentricidade

> [!DEFINIÇÃO] A **excentricidade** é $e = \dfrac{c}{a}$, com $0 \le e < 1$ na elipse.

- $e$ perto de $0$: focos quase juntos, elipse quase circular. (Com $e = 0$, é uma circunferência.)
- $e$ perto de $1$: elipse muito achatada.

A órbita da Terra tem $e \approx 0{,}017$: quase um círculo. A do cometa Halley, $e \approx 0{,}97$.

## 5. Completando quadrados

**Exemplo.** $4x^2 + 9y^2 - 16x + 18y - 11 = 0$.

$$4(x^2 - 4x + 4) + 9(y^2 + 2y + 1) = 11 + 16 + 9 \;\Rightarrow\; 4(x - 2)^2 + 9(y + 1)^2 = 36$$

Dividindo por $36$: $\dfrac{(x - 2)^2}{9} + \dfrac{(y + 1)^2}{4} = 1$. Centro $(2, -1)$, $a = 3$ (horizontal), $b = 2$, $c = \sqrt5$.

> [!ATENÇÃO] Ao completar quadrados com coeficiente na frente ($4x^2$), coloque-o em evidência **antes**: $4(x^2 - 4x)$. E o que você soma dentro do parêntese entra multiplicado por $4$ do outro lado.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Na elipse, para todo ponto $P$:
+ $d(P, F_1) + d(P, F_2) = 2a$
- $d(P, F_1) - d(P, F_2) = 2a$
- $d(P, F_1) = d(P, F_2)$
- $d(P, F) = d(P, \text{diretriz})$
> Soma constante.

? Em $\frac{x^2}{16} + \frac{y^2}{25} = 1$, o eixo maior:
- é horizontal e mede $8$
- é horizontal e mede $10$
+ é vertical e mede $10$
- é vertical e mede $5$
> $a^2 = 25$ está sob $y$; $2a = 10$.

? Se $a = 13$ e $b = 5$, então $c$ vale:
- $8$
+ $12$
- $18$
- $\sqrt{194}$
> $c^2 = 169 - 25 = 144$.

? Uma elipse com excentricidade próxima de zero é:
+ quase uma circunferência
- muito achatada
- uma parábola
- uma reta
> Focos quase coincidentes.

? Os focos de $\frac{x^2}{25} + \frac{y^2}{16} = 1$ são:
- $(0, \pm3)$
+ $(\pm3, 0)$
- $(\pm5, 0)$
- $(\pm4, 0)$
> $c = \sqrt{25 - 16} = 3$, eixo horizontal.
```

## 6. Exercícios

**1.** Encontre vértices, focos e excentricidade de $\frac{x^2}{100} + \frac{y^2}{36} = 1$.

<details>
<summary>Ver solução</summary>

$a = 10$, $b = 6$, $c = 8$. Vértices $(\pm10, 0)$, focos $(\pm8, 0)$, $e = 0{,}8$.

</details>

**2.** Escreva a elipse de focos $(0, \pm2)$ e eixo maior $6$.

<details>
<summary>Ver solução</summary>

$a = 3$, $c = 2$, $b^2 = 5$. Eixo vertical: $\frac{x^2}{5} + \frac{y^2}{9} = 1$.

</details>

**3.** Identifique $9x^2 + 4y^2 + 36x - 8y + 4 = 0$.

<details>
<summary>Ver solução</summary>

$9(x + 2)^2 + 4(y - 1)^2 = -4 + 36 + 4 = 36 \Rightarrow \frac{(x + 2)^2}{4} + \frac{(y - 1)^2}{9} = 1$. Centro $(-2, 1)$, eixo maior vertical, $a = 3$, $b = 2$, $c = \sqrt5$.

</details>
