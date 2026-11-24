# Aplicações da derivada

A derivada não é só um cálculo: ela **diz como a função se comporta**. Neste capítulo você a usa para achar máximos e mínimos, resolver problemas de otimização, calcular limites difíceis e esboçar gráficos.

## 1. Crescimento e decrescimento

> [!TEOREMA] Em um intervalo:
> - se $f'(x) > 0$, então $f$ é **crescente**;
> - se $f'(x) < 0$, então $f$ é **decrescente**;
> - se $f'(x) = 0$ em todo o intervalo, então $f$ é **constante**.

## 2. Pontos críticos e extremos

> [!DEFINIÇÃO] Um **ponto crítico** de $f$ é um $c$ do domínio onde $f'(c) = 0$ ou $f'(c)$ **não existe**.

Máximos e mínimos locais **só** podem ocorrer em pontos críticos (Teorema de Fermat). Mas atenção: nem todo ponto crítico é extremo. Em $f(x) = x^3$, $f'(0) = 0$ e não há máximo nem mínimo.

### Teste da derivada primeira

Em um ponto crítico $c$, observe o sinal de $f'$ ao redor:

| Sinal de $f'$ | Conclusão em $c$ |
|---|---|
| $+$ antes, $-$ depois | **máximo local** |
| $-$ antes, $+$ depois | **mínimo local** |
| mesmo sinal dos dois lados | não é extremo |

### Teste da derivada segunda

Se $f'(c) = 0$:

- $f''(c) > 0 \Rightarrow$ **mínimo local**;
- $f''(c) < 0 \Rightarrow$ **máximo local**;
- $f''(c) = 0 \Rightarrow$ o teste é inconclusivo (use a primeira derivada).

## 3. Extremos absolutos em intervalo fechado

> [!TEOREMA] **(Weierstrass)** Toda função contínua em $[a, b]$ atinge máximo e mínimo absolutos nesse intervalo.

**Método do intervalo fechado:**

1. Ache os pontos críticos dentro de $(a, b)$.
2. Calcule $f$ nesses pontos **e nas extremidades** $a$ e $b$.
3. O maior valor é o máximo absoluto, e o menor é o mínimo absoluto.

**Exemplo.** Extremos de $f(x) = x^3 - 3x$ em $[-2, 3]$.

$f' = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$. Calculamos: $f(-2) = -2$, $f(-1) = 2$, $f(1) = -2$, $f(3) = 18$. Logo, máximo absoluto $18$ (em $x=3$) e mínimo absoluto $-2$ (em $x=-2$ e $x=1$).

## 4. Concavidade e pontos de inflexão

- $f'' > 0$: gráfico **côncavo para cima** (forma de taça).
- $f'' < 0$: gráfico **côncavo para baixo** (forma de capelo).
- **Ponto de inflexão:** onde a concavidade **muda** (e $f''$ troca de sinal).

## 5. Problemas de otimização

Muito comuns em prova. Roteiro:

1. Desenhe e nomeie as variáveis.
2. Escreva a **função objetivo** (o que se quer maximizar ou minimizar).
3. Use a **restrição** para deixar a função com uma só variável.
4. Ache o ponto crítico, justifique que é máximo/mínimo e **responda à pergunta**.

**Exemplo (a cerca).** Com $100$ m de cerca, quer-se cercar um retângulo de área máxima. Sejam $x$ e $y$ os lados: $2x + 2y = 100$, então $y = 50 - x$. A área é $A(x) = x(50 - x) = 50x - x^2$. Como $A' = 50 - 2x = 0$, temos $x = 25$ e $A'' = -2 < 0$ (máximo). O retângulo ótimo é o **quadrado** $25 \times 25$, com área $625$ m².

**Exemplo (a lata).** Uma lata cilíndrica de volume $V$ fixo usa o mínimo de material (área $A = 2\pi r^2 + 2\pi r h$) quando $h = 2r$. Com $h = V/(\pi r^2)$, temos $A(r) = 2\pi r^2 + \dfrac{2V}{r}$, e $A' = 4\pi r - \dfrac{2V}{r^2} = 0$ dá $V = 2\pi r^3$, ou seja, $h = 2r$.

## 6. Regra de L'Hôpital

> [!TEOREMA] **(L'Hôpital)** Se $\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)}$ tem a forma $\dfrac00$ ou $\dfrac{\pm\infty}{\pm\infty}$, e o limite $\displaystyle\lim\frac{f'(x)}{g'(x)}$ existe (ou é infinito), então $$\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}.$$

> [!ATENÇÃO] Derive numerador e denominador **separadamente**; não é a derivada do quociente. E só use quando houver indeterminação $0/0$ ou $\infty/\infty$.

**Exemplos:**

$$\lim_{x\to 0}\frac{e^x - 1}{x} \overset{L'H}{=} \lim_{x\to0}\frac{e^x}{1} = 1 \qquad \lim_{x \to \infty}\frac{\ln x}{x} \overset{L'H}{=} \lim_{x\to\infty}\frac{1/x}{1} = 0$$

**Outras formas** precisam ser convertidas para $0/0$ ou $\infty/\infty$:

- $0\cdot\infty$: reescreva $f g = \dfrac{f}{1/g}$. Ex.: $\displaystyle\lim_{x\to0^+}x\ln x = \lim\frac{\ln x}{1/x} = \lim\frac{1/x}{-1/x^2} = \lim(-x) = 0$.
- $\infty - \infty$: combine em uma só fração.
- $1^\infty,\ 0^0,\ \infty^0$: tome $\ln$ e use L'Hôpital sobre o expoente.

## 7. Teoremas de Rolle e do Valor Médio

> [!TEOREMA] **(Valor Médio)** Se $f$ é contínua em $[a,b]$ e derivável em $(a,b)$, existe $c \in (a,b)$ tal que $$f'(c) = \frac{f(b) - f(a)}{b - a}.$$

*Interpretação:* em algum instante, a taxa **instantânea** coincide com a taxa **média**. Se um carro percorre $120$ km em $1$ h, em algum momento sua velocidade foi exatamente $120$ km/h. O **Teorema de Rolle** é o caso $f(a) = f(b)$, que garante $f'(c) = 0$.

## 8. Roteiro para esboçar gráficos

1. **Domínio** e simetrias (par ou ímpar).
2. **Interceptos** com os eixos.
3. **Assíntotas** (verticais e horizontais, via limites).
4. $f'$: **crescimento** e pontos críticos (máximos e mínimos).
5. $f''$: **concavidade** e pontos de inflexão.
6. Junte tudo em um gráfico.

**Exemplo.** $f(x) = x^3 - 3x$. Temos $f' = 3(x-1)(x+1)$, que é positiva para $x<-1$, negativa em $(-1,1)$ e positiva para $x>1$. Assim, há máximo local em $x=-1$ ($f=2$) e mínimo local em $x=1$ ($f=-2$). Como $f'' = 6x$, a concavidade muda em $x=0$ (inflexão). Compare com o [simulador](#/lab/derivada) escolhendo $f(x) = x^3 - 3x$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Se $f'(c)=0$ e $f''(c)<0$, então em $c$ há:
+ um máximo local
- um mínimo local
- um ponto de inflexão
- nada se pode concluir
> Teste da derivada segunda: concavidade para baixo no ponto crítico indica máximo.

? Os pontos críticos de $f(x)=x^3-3x$ são:
+ $x=\pm1$
- $x=0$
- $x=\pm\sqrt3$
- $x=3$
> $f'(x)=3x^2-3=0\Rightarrow x=\pm1$. Já $\pm\sqrt3$ são as raízes de $f$, não de $f'$.

? Usando L'Hôpital, $\displaystyle\lim_{x\to0}\frac{e^x-1}{x}=$
+ $1$
- $0$
- $e$
- $+\infty$
> É $\frac00$; derivando em cima e embaixo, $\frac{e^x}{1}\to 1$.

? Em $[a,b]$, onde pode estar o máximo absoluto de uma função contínua?
+ Em um ponto crítico ou em uma extremidade do intervalo
- Só nos pontos críticos
- Só nas extremidades
- Onde $f''=0$
> Por isso o método do intervalo fechado compara $f$ nos pontos críticos e em $a$ e $b$.

? Se $f''(x)>0$ em um intervalo, o gráfico de $f$ é nele:
+ côncavo para cima
- côncavo para baixo
- crescente
- decrescente
> O sinal de $f''$ indica concavidade; o de $f'$ indica crescimento.

? Para $f(x)=x^3$, o ponto $x=0$ é:
- um máximo local
- um mínimo local
+ um ponto crítico que não é extremo
- não é ponto crítico
> $f'(0)=0$, mas $f'\ge0$ dos dois lados: a função continua crescendo. É um ponto de inflexão.
```

## 9. Exercícios

**1.** Encontre os extremos locais de $f(x) = x^3 - 6x^2 + 9x + 1$.

<details>
<summary>Ver solução</summary>

$f' = 3x^2 - 12x + 9 = 3(x-1)(x-3)$, então os pontos críticos são $x = 1$ e $x = 3$. Como $f'' = 6x - 12$: $f''(1) = -6 < 0$ dá máximo local em $x=1$ ($f=5$); $f''(3) = 6 > 0$ dá mínimo local em $x=3$ ($f=1$).

</details>

**2.** Calcule $\displaystyle\lim_{x \to 0}\frac{\sin x - x}{x^3}$.

<details>
<summary>Ver solução</summary>

É $0/0$. Aplicando L'Hôpital: $\dfrac{\cos x - 1}{3x^2}$, ainda $0/0$. De novo: $\dfrac{-\sin x}{6x} \to -\dfrac16$.

</details>

**3.** Qual é o ponto da reta $y = 2x + 1$ mais próximo da origem?

<details>
<summary>Ver solução</summary>

Minimize $d^2 = x^2 + (2x+1)^2 = 5x^2 + 4x + 1$. Como $(d^2)' = 10x + 4 = 0$, temos $x = -\tfrac25$ e $y = \tfrac15$. O ponto é $\left(-\tfrac25, \tfrac15\right)$.

</details>

**4.** Uma caixa sem tampa é feita de uma folha quadrada de lado $12$ cm, recortando quadrados de lado $x$ nos cantos. Qual $x$ maximiza o volume?

<details>
<summary>Ver solução</summary>

$V(x) = x(12 - 2x)^2$, com $0 < x < 6$. Então $V' = (12-2x)^2 - 4x(12-2x) = (12-2x)(12 - 6x)$, e $V'=0$ em $x = 2$ (o valor $x=6$ dá volume nulo). Logo, $x = 2$ cm e $V = 128$ cm³.

</details>

**5.** Calcule $\displaystyle\lim_{x\to\infty}\frac{x^2}{e^x}$.

<details>
<summary>Ver solução</summary>

É $\infty/\infty$. Por L'Hôpital duas vezes: $\dfrac{2x}{e^x} \to \dfrac{2}{e^x} \to 0$. A exponencial vence qualquer potência.

</details>
