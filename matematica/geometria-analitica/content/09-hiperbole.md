# Hipérbole e identificação das cônicas

A hipérbole é a "elipse com sinal trocado": em vez da soma, a **diferença** das distâncias aos focos é constante. Ela tem dois ramos e duas assíntotas. No fim do capítulo, juntamos as quatro cônicas e aprendemos a reconhecer qualquer uma pela equação.

> [!DICA] No simulador [Cônicas](#/lab/conicas), escolha "Hipérbole" e veja os ramos se aproximarem das assíntotas tracejadas. Na opção "Identificar equação", digite os coeficientes de uma equação geral e ele completa os quadrados para você.

## 1. Definição

> [!DEFINIÇÃO] Dados os focos $F_1$ e $F_2$ e um número $2a$ menor que a distância entre eles, a **hipérbole** é o conjunto dos pontos $P$ com
> $$|d(P, F_1) - d(P, F_2)| = 2a.$$

## 2. Elementos e equações

Aqui $c > a$, e a relação muda de sinal:

> [!TEOREMA] Na hipérbole, $c^2 = a^2 + b^2$.

**Focos no eixo $x$** (centro na origem):

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \qquad \text{focos } (\pm c, 0), \quad \text{vértices } (\pm a, 0)$$

**Focos no eixo $y$:**

$$\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1 \qquad \text{focos } (0, \pm c), \quad \text{vértices } (0, \pm a)$$

> [!DICA] Na hipérbole quem manda é o **sinal**, não o tamanho do denominador: o termo **positivo** indica o eixo dos focos, e o denominador dele é $a^2$. Em $\frac{y^2}{4} - \frac{x^2}{9} = 1$, $a = 2$ (eixo $y$), mesmo com $9 > 4$.

## 3. Assíntotas

> [!TEOREMA] A hipérbole $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ tem assíntotas $y = \pm\frac{b}{a}x$. Para $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$, as assíntotas são $y = \pm\frac{a}{b}x$.

> [!INTUIÇÃO] Truque infalível: troque o $1$ por $0$ e resolva. $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0 \Rightarrow y = \pm\frac{b}{a}x$. Longe do centro, o $1$ fica desprezível perto de $x^2$ e $y^2$, e a curva "vira" as duas retas.

**Exemplo.** $\frac{x^2}{9} - \frac{y^2}{16} = 1$: $a = 3$, $b = 4$, $c = 5$. Vértices $(\pm3, 0)$, focos $(\pm5, 0)$, assíntotas $y = \pm\frac43 x$, excentricidade $e = \frac{c}{a} = \frac53 > 1$.

A hipérbole **equilátera** $xy = k$ (com assíntotas nos eixos) é o gráfico de $y = \frac{k}{x}$, a função de proporção inversa.

## 4. As quatro cônicas lado a lado

| Cônica | Propriedade | Equação típica | $e$ |
|---|---|---|---|
| Circunferência | distância ao centro $= r$ | $x^2 + y^2 = r^2$ | $0$ |
| Elipse | soma das distâncias aos focos $= 2a$ | $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ | $0 < e < 1$ |
| Parábola | distância ao foco = distância à diretriz | $y^2 = 4px$ | $1$ |
| Hipérbole | diferença das distâncias $= 2a$ | $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ | $e > 1$ |

> [!INTUIÇÃO] O nome "cônica" vem de cortar um cone duplo com um plano. Plano perpendicular ao eixo: circunferência. Inclinado: elipse. Paralelo à geratriz: parábola. Mais inclinado que isso, cortando as duas folhas: hipérbole.

## 5. Identificando pela equação geral

Uma equação $Ax^2 + Cy^2 + Dx + Ey + F = 0$ (sem termo $xy$) é, em geral:

| Coeficientes $A$ e $C$ | Cônica |
|---|---|
| $A = C \neq 0$ | circunferência |
| mesmo sinal, $A \neq C$ | elipse |
| sinais opostos | hipérbole |
| um deles é zero | parábola |

Depois de identificar, **complete os quadrados** para achar centro (ou vértice) e os parâmetros. Casos degenerados existem: o lado direito pode dar zero ou negativo (um ponto, par de retas, vazio).

**Exemplo.** $x^2 - 4y^2 - 2x - 16y - 19 = 0$. Sinais opostos: hipérbole.

$$(x - 1)^2 - 1 - 4(y + 2)^2 + 16 - 19 = 0 \;\Rightarrow\; (x - 1)^2 - 4(y + 2)^2 = 4 \;\Rightarrow\; \frac{(x - 1)^2}{4} - \frac{(y + 2)^2}{1} = 1$$

Centro $(1, -2)$, focos na horizontal, $a = 2$, $b = 1$, $c = \sqrt5$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Na hipérbole, a relação entre $a$, $b$ e $c$ é:
- $a^2 = b^2 + c^2$
+ $c^2 = a^2 + b^2$
- $b^2 = a^2 + c^2$
- $c = a + b$
> Na elipse é $a^2 = b^2 + c^2$; na hipérbole, $c$ é o maior.

? Os focos de $\frac{y^2}{16} - \frac{x^2}{9} = 1$ estão:
- no eixo $x$, em $(\pm5, 0)$
+ no eixo $y$, em $(0, \pm5)$
- no eixo $y$, em $(0, \pm4)$
- no eixo $x$, em $(\pm4, 0)$
> O termo positivo é o de $y$; $c = \sqrt{16 + 9}$.

? As assíntotas de $\frac{x^2}{4} - \frac{y^2}{9} = 1$ são:
+ $y = \pm\frac32 x$
- $y = \pm\frac23 x$
- $y = \pm\frac94 x$
- $x = \pm2$
> Troque o $1$ por $0$: $\frac{y}{3} = \pm\frac{x}{2}$.

? A equação $3x^2 + 5y^2 - 6x = 7$ representa:
- uma circunferência
+ uma elipse
- uma hipérbole
- uma parábola
> $A$ e $C$ com mesmo sinal e diferentes.

? A equação $y^2 - 4x + 2y = 0$ representa:
- uma elipse
- uma hipérbole
+ uma parábola
- uma circunferência
> Não há $x^2$.
```

## 6. Exercícios

**1.** Encontre vértices, focos e assíntotas de $\frac{x^2}{16} - \frac{y^2}{9} = 1$.

<details>
<summary>Ver solução</summary>

$a = 4$, $b = 3$, $c = 5$. Vértices $(\pm4, 0)$, focos $(\pm5, 0)$, assíntotas $y = \pm\frac34 x$.

</details>

**2.** Escreva a hipérbole de focos $(0, \pm10)$ e vértices $(0, \pm6)$.

<details>
<summary>Ver solução</summary>

$a = 6$, $c = 10$, $b = 8$. $\frac{y^2}{36} - \frac{x^2}{64} = 1$.

</details>

**3.** Identifique cada equação: (a) $x^2 + y^2 - 4y = 0$; (b) $4x^2 + y^2 = 16$; (c) $x^2 - y^2 = 1$; (d) $x^2 + 4y = 0$.

<details>
<summary>Ver solução</summary>

(a) circunferência de centro $(0, 2)$ e raio $2$; (b) elipse $\frac{x^2}{4} + \frac{y^2}{16} = 1$, eixo maior vertical; (c) hipérbole equilátera com assíntotas $y = \pm x$; (d) parábola $x^2 = -4y$, abrindo para baixo.

</details>

**4.** Identifique e encontre o centro de $9x^2 - 4y^2 - 18x - 16y - 43 = 0$.

<details>
<summary>Ver solução</summary>

$9(x - 1)^2 - 9 - 4(y + 2)^2 + 16 - 43 = 0 \Rightarrow 9(x - 1)^2 - 4(y + 2)^2 = 36 \Rightarrow \frac{(x - 1)^2}{4} - \frac{(y + 2)^2}{9} = 1$. Hipérbole de centro $(1, -2)$, focos na horizontal, $c = \sqrt{13}$.

</details>
