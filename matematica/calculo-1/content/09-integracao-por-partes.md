# Integração por partes e técnicas

Quando a substituição não funciona, a próxima ferramenta é a **integração por partes**: a regra do produto ao contrário.

## 1. A fórmula

Da regra do produto $(uv)' = u'v + uv'$, integrando dos dois lados e reorganizando:

> [!TEOREMA] $$\int u\,dv = u\,v - \int v\,du$$
> Para integral definida: $\displaystyle\int_a^b u\,dv = \Big[uv\Big]_a^b - \int_a^b v\,du$.

A estratégia é transformar uma integral difícil ($\int u\,dv$) em outra mais fácil ($\int v\,du$).

**Receita:**

1. Escolha $u$ e $dv$.
2. Calcule $du = u'\,dx$ e $v = \int dv$ (sem $+C$).
3. Monte $uv - \int v\,du$.

## 2. Como escolher: a regra LIATE

Escolha $u$ como a **primeira** categoria que aparece nesta ordem:

| Letra | Tipo | Exemplo |
|---|---|---|
| **L** | Logarítmica | $\ln x$ |
| **I** | Inversa trigonométrica | $\arctan x$ |
| **A** | Algébrica (polinômio) | $x^2$ |
| **T** | Trigonométrica | $\sin x$ |
| **E** | Exponencial | $e^x$ |

O que sobra vira $dv$. A ideia é que $u$ **simplifique** ao derivar e $dv$ seja **fácil de integrar**.

## 3. Exemplos

**(a)** $\displaystyle\int x\,e^x\,dx$. Aqui $u = x$ (A) e $dv = e^x dx$, então $du = dx$ e $v = e^x$:

$$\int x e^x dx = x e^x - \int e^x dx = x e^x - e^x + C = e^x(x - 1) + C$$

**(b)** $\displaystyle\int \ln x\,dx$. Truque: $u = \ln x$ e $dv = dx$, então $du = \dfrac{dx}{x}$ e $v = x$:

$$\int\ln x\,dx = x\ln x - \int x\cdot\frac1x\,dx = x\ln x - x + C$$

**(c)** $\displaystyle\int x^2\sin x\,dx$. É preciso aplicar **duas vezes**. Com $u = x^2$ e $dv = \sin x\,dx$:

$$\int x^2\sin x\,dx = -x^2\cos x + 2\int x\cos x\,dx$$

Na segunda, $u = x$ e $dv = \cos x\,dx$: $\int x\cos x\,dx = x\sin x - \int\sin x\,dx = x\sin x + \cos x$. Portanto

$$\int x^2\sin x\,dx = -x^2\cos x + 2x\sin x + 2\cos x + C.$$

**(d)** $\displaystyle\int e^x\sin x\,dx$ (**integral cíclica**). Aplique partes duas vezes e a integral original reaparece:

$$I = e^x\sin x - \int e^x\cos x\,dx = e^x\sin x - \Big(e^x\cos x + \int e^x\sin x\,dx\Big) = e^x(\sin x - \cos x) - I$$

Isolando, $2I = e^x(\sin x - \cos x)$, então $I = \dfrac{e^x(\sin x - \cos x)}{2} + C$.

**(e)** $\displaystyle\int_0^1 \arctan x\,dx$. Com $u = \arctan x$ e $dv = dx$: $\Big[x\arctan x\Big]_0^1 - \displaystyle\int_0^1\frac{x}{1+x^2}dx = \dfrac{\pi}{4} - \dfrac12\ln 2$.

> [!DICA] Se, depois de aplicar partes, a nova integral ficou **pior**, troque os papéis de $u$ e $dv$ (ou reconsidere a técnica).

## 4. Integrais trigonométricas básicas

**Potências de seno e cosseno:**

- Se a potência de $\sin$ é **ímpar**: guarde um $\sin x$, converta o resto com $\sin^2 = 1 - \cos^2$ e use $u = \cos x$.
- Se a potência de $\cos$ é **ímpar**: guarde um $\cos x$, converta com $\cos^2 = 1 - \sin^2$ e use $u = \sin x$.
- Se **ambas pares**: use as fórmulas de redução $\sin^2 x = \frac{1 - \cos 2x}{2}$ e $\cos^2 x = \frac{1+\cos 2x}{2}$.

**Exemplos:**

$$\int\sin^3 x\,dx = \int (1 - \cos^2 x)\sin x\,dx = -\cos x + \frac{\cos^3 x}{3} + C$$

$$\int\cos^2 x\,dx = \int\frac{1 + \cos 2x}{2}dx = \frac{x}{2} + \frac{\sin 2x}{4} + C$$

## 5. Frações parciais (caso simples)

Para integrar $\dfrac{P(x)}{Q(x)}$ com $\text{gr}\,P < \text{gr}\,Q$ e $Q$ com raízes reais distintas, decomponha em frações simples.

**Exemplo.** $\displaystyle\int\frac{1}{x^2 - 1}\,dx$. Como $x^2 - 1 = (x-1)(x+1)$, escrevemos

$$\frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}.$$

Multiplicando: $1 = A(x+1) + B(x-1)$. Em $x = 1$: $A = \tfrac12$. Em $x=-1$: $B = -\tfrac12$. Então

$$\int\frac{dx}{x^2-1} = \frac12\ln|x-1| - \frac12\ln|x+1| + C = \frac12\ln\left|\frac{x-1}{x+1}\right| + C.$$

Se $\text{gr}\,P \geq \text{gr}\,Q$, faça primeiro a **divisão de polinômios**.

## 6. Qual técnica usar?

1. A integral está na **tabela** (ou vira tabela com um ajuste simples)? Use-a.
2. Aparece uma função **e sua derivada**? **Substituição.**
3. É um **produto** de tipos diferentes (polinômio $\times$ exp/trig, ou um $\ln$ sozinho)? **Partes.**
4. É uma **fração de polinômios**? Divida, se necessário, e use **frações parciais**.
5. Tem **potências de $\sin$/$\cos$**? Use as regras de paridade.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A fórmula da integração por partes é:
+ $\displaystyle\int u\,dv=uv-\int v\,du$
- $\displaystyle\int u\,dv=uv+\int v\,du$
- $\displaystyle\int uv\,dx=\int u\,dx\int v\,dx$
- $\displaystyle\int u\,dv=u'v-\int v\,du$
> Vem da regra do produto $(uv)'=u'v+uv'$ integrada.

? Em $\displaystyle\int x\,e^x\,dx$, a escolha certa (LIATE) é:
+ $u=x$ e $dv=e^x\,dx$
- $u=e^x$ e $dv=x\,dx$
- $u=x\,e^x$ e $dv=dx$
- Não se usa partes aqui
> Algébrica vem antes de Exponencial: $u=x$ simplifica ao derivar.

? $\displaystyle\int \ln x\,dx=$
+ $x\ln x-x+C$
- $\frac{1}{x}+C$
- $\frac{(\ln x)^2}{2}+C$
- $x\ln x+C$
> Partes com $u=\ln x$ e $dv=dx$: $x\ln x-\int x\cdot\frac1x\,dx$.

? Qual é o caminho mais rápido para $\displaystyle\int\cos^2x\,dx$?
+ Usar $\cos^2x=\frac{1+\cos 2x}{2}$
- Substituir $u=\cos x$
- Frações parciais
- Integrar direto: o resultado é $\frac{\cos^3x}{3}$
> Potências pares de seno/cosseno: reduza o grau. A substituição $u=\cos x$ falha porque não há $\sin x$ sobrando.

? Em $\dfrac{1}{(x-1)(x+2)}=\dfrac{A}{x-1}+\dfrac{B}{x+2}$, quanto vale $A$?
+ $\frac13$
- $1$
- $-\frac13$
- $\frac12$
> $1=A(x+2)+B(x-1)$; em $x=1$: $1=3A$.
```

## 7. Exercícios

**1.** $\displaystyle\int x\cos x\,dx$.

<details>
<summary>Ver solução</summary>

$u = x$, $dv = \cos x\,dx$: $x\sin x - \displaystyle\int\sin x\,dx = x\sin x + \cos x + C$.

</details>

**2.** $\displaystyle\int_1^e x\ln x\,dx$.

<details>
<summary>Ver solução</summary>

$u = \ln x$ e $dv = x\,dx$, então $v = \dfrac{x^2}{2}$:

$$\Big[\tfrac{x^2}{2}\ln x\Big]_1^e - \int_1^e\frac{x}{2}dx = \frac{e^2}{2} - \Big[\frac{x^2}{4}\Big]_1^e = \frac{e^2}{2} - \frac{e^2 - 1}{4} = \frac{e^2 + 1}{4}.$$

</details>

**3.** $\displaystyle\int x\,e^{2x}\,dx$.

<details>
<summary>Ver solução</summary>

$u = x$ e $dv = e^{2x}dx$, então $v = \dfrac{e^{2x}}{2}$: $\dfrac{x e^{2x}}{2} - \dfrac12\displaystyle\int e^{2x}dx = \dfrac{xe^{2x}}{2} - \dfrac{e^{2x}}{4} + C$.

</details>

**4.** $\displaystyle\int\sin^2 x\cos x\,dx$.

<details>
<summary>Ver solução</summary>

Com $u = \sin x$: $\displaystyle\int u^2du = \dfrac{\sin^3 x}{3} + C$.

</details>

**5.** $\displaystyle\int\frac{3x + 5}{(x+1)(x+2)}\,dx$.

<details>
<summary>Ver solução</summary>

$\dfrac{3x+5}{(x+1)(x+2)} = \dfrac{A}{x+1} + \dfrac{B}{x+2}$. Em $x=-1$: $A = 2$. Em $x = -2$: $B = 1$. Logo, a integral é $2\ln|x+1| + \ln|x+2| + C$.

</details>
