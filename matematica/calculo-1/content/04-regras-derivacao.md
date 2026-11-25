# Regras de derivação

Calcular derivada pela definição é lento. Felizmente, um pequeno conjunto de regras resolve praticamente tudo. **Memorize a tabela e treine a regra da cadeia** até ficar automática.

## 1. Tabela das derivadas básicas

| $f(x)$ | $f'(x)$ |
|---|---|
| $c$ (constante) | $0$ |
| $x^n$ | $n\,x^{n-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\dfrac{1}{x}$ |
| $\log_a x$ | $\dfrac{1}{x \ln a}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\csc x$ | $-\csc x \cot x$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1 - x^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1 - x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1 + x^2}$ |

> [!DICA] Dá para reduzir a memorização: as derivadas de $\cos$, $\cot$, $\csc$ e $\arccos$ (as "co-funções") são as de $\sin$, $\tan$, $\sec$ e $\arcsin$ com **sinal trocado**, e com a "co-função" correspondente.

## 2. Regras de combinação

Sejam $u(x)$ e $v(x)$ deriváveis e $c$ constante.

$$(c\,u)' = c\,u' \qquad (u \pm v)' = u' \pm v'$$

**Regra do produto:**

$$(u\,v)' = u'\,v + u\,v'$$

**Regra do quociente:**

$$\left(\frac{u}{v}\right)' = \frac{u'\,v - u\,v'}{v^2}$$

> [!ATENÇÃO] A derivada do produto **não** é o produto das derivadas, e a do quociente **não** é o quociente das derivadas. Na regra do quociente, a ordem do numerador importa: $u'v - uv'$ (derivada de cima vezes baixo, menos cima vezes derivada de baixo).

**Exemplo (produto).** $\big(x^2 \sin x\big)' = 2x\sin x + x^2\cos x$.

**Exemplo (quociente).** $\left(\dfrac{x}{x^2+1}\right)' = \dfrac{1\cdot(x^2+1) - x\cdot 2x}{(x^2+1)^2} = \dfrac{1 - x^2}{(x^2+1)^2}$.

## 3. Regra da cadeia

Para funções compostas, a regra mais importante do capítulo:

> [!TEOREMA] **(Regra da cadeia)** Se $y = f(g(x))$, então $y' = f'(g(x)) \cdot g'(x)$. Com $u = g(x)$: $\dfrac{dy}{dx} = \dfrac{dy}{du}\cdot\dfrac{du}{dx}$.

**Receita:** derive a função de **fora** (mantendo o interior intacto) e multiplique pela derivada do **interior**.

Exemplos:

$$\frac{d}{dx}\,(3x+1)^5 = 5(3x+1)^4\cdot 3 = 15(3x+1)^4$$

$$\frac{d}{dx}\,\sin(x^2) = \cos(x^2)\cdot 2x$$

$$\frac{d}{dx}\,e^{-3x} = e^{-3x}\cdot(-3) = -3e^{-3x}$$

$$\frac{d}{dx}\,\ln(x^2+1) = \frac{2x}{x^2+1}$$

$$\frac{d}{dx}\,\sqrt{1 - x^2} = \frac{-2x}{2\sqrt{1-x^2}} = \frac{-x}{\sqrt{1 - x^2}}$$

Regras de cadeia em camadas: $\dfrac{d}{dx}\,\sin^3(2x) = 3\sin^2(2x)\cdot\cos(2x)\cdot 2 = 6\sin^2(2x)\cos(2x)$.

### Forma geral útil

$$\big(u^n\big)' = n\,u^{n-1}u' \qquad \big(e^u\big)' = e^u u' \qquad \big(\ln u\big)' = \frac{u'}{u} \qquad (\sin u)' = u'\cos u$$

## 4. Derivada de $f(x)^{g(x)}$: derivação logarítmica

Para variável no expoente **e** na base, tome $\ln$ dos dois lados antes de derivar.

**Exemplo.** $y = x^x$. Então $\ln y = x\ln x$. Derivando: $\dfrac{y'}{y} = \ln x + 1$. Logo, $y' = x^x(\ln x + 1)$.

## 5. Derivadas de ordem superior

$f''$ é a derivada de $f'$; $f'''$ é a de $f''$. Exemplo: para $f(x) = x^4 - 3x^2$, $f' = 4x^3 - 6x$, $f'' = 12x^2 - 6$, $f''' = 24x$.

## 6. Derivada da função inversa

Se $g = f^{-1}$, então

$$g'(y) = \frac{1}{f'(g(y))}.$$

É assim que se deduzem as derivadas de $\ln x$ (inversa de $e^x$) e de $\arcsin x$, $\arctan x$.

## 7. Estratégia para o dia da prova

1. **Reescreva** raízes e frações como potências antes de derivar.
2. Identifique a **estrutura** da expressão: soma, produto, quociente ou composta?
3. Aplique a regra de fora para dentro.
4. **Simplifique** só no final, e fatore o resultado se for estudar sinais.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? $\dfrac{d}{dx}\left(x^5\right)=$
+ $5x^4$
- $x^4$
- $5x^5$
- $\frac{x^6}{6}$
> Regra da potência: $n\,x^{n-1}$. A opção $\frac{x^6}{6}$ é a primitiva, não a derivada.

? $\dfrac{d}{dx}\left(x^2e^x\right)=$
- $2x\,e^x$
+ $e^x\left(x^2+2x\right)$
- $x^2e^x$
- $2x+e^x$
> Regra do produto: $2x\cdot e^x+x^2\cdot e^x$.

? $\dfrac{d}{dx}\cos(3x)=$
- $\sin(3x)$
- $-\sin(3x)$
+ $-3\sin(3x)$
- $3\sin(3x)$
> Derivada do cosseno é $-\sin$, e a regra da cadeia multiplica pela derivada de $3x$, que é $3$.

? $\dfrac{d}{dx}\ln\left(x^2+1\right)=$
+ $\dfrac{2x}{x^2+1}$
- $\dfrac{1}{x^2+1}$
- $\dfrac{1}{2x}$
- $2x\ln\left(x^2+1\right)$
> $(\ln u)'=\frac{u'}{u}$ com $u=x^2+1$.

? $\dfrac{d}{dx}\sqrt{x}=$
- $\frac{\sqrt{x}}{2}$
+ $\dfrac{1}{2\sqrt{x}}$
- $2\sqrt{x}$
- $\dfrac{1}{\sqrt{x}}$
> $\sqrt x=x^{1/2}$, então a derivada é $\frac12x^{-1/2}$.

? A regra do quociente diz que $\left(\dfrac{u}{v}\right)'=$
+ $\dfrac{u'v-uv'}{v^2}$
- $\dfrac{u'}{v'}$
- $\dfrac{uv'-u'v}{v^2}$
- $\dfrac{u'v+uv'}{v^2}$
> "Derivada de cima vezes baixo, menos cima vezes derivada de baixo, sobre baixo ao quadrado". A ordem do numerador importa.
```

## 8. Exercícios

**1.** Derive $f(x) = 5x^4 - \dfrac{2}{x^3} + \sqrt{x}$.

<details>
<summary>Ver solução</summary>

Reescrevendo: $f = 5x^4 - 2x^{-3} + x^{1/2}$. Então $f' = 20x^3 + 6x^{-4} + \dfrac12 x^{-1/2} = 20x^3 + \dfrac{6}{x^4} + \dfrac{1}{2\sqrt{x}}$.

</details>

**2.** Derive $f(x) = x^3 e^{2x}$.

<details>
<summary>Ver solução</summary>

Produto: $f' = 3x^2 e^{2x} + x^3\cdot 2e^{2x} = x^2e^{2x}(3 + 2x)$.

</details>

**3.** Derive $f(x) = \dfrac{\sin x}{1 + \cos x}$.

<details>
<summary>Ver solução</summary>

$$f' = \frac{\cos x(1+\cos x) - \sin x(-\sin x)}{(1+\cos x)^2} = \frac{\cos x + \cos^2x + \sin^2 x}{(1+\cos x)^2} = \frac{1 + \cos x}{(1+\cos x)^2} = \frac{1}{1+\cos x}.$$

</details>

**4.** Derive $f(x) = \ln\!\big(\sqrt{x^2 + 1}\big)$.

<details>
<summary>Ver solução</summary>

Usando $\ln\sqrt{u} = \tfrac12\ln u$: $f = \tfrac12\ln(x^2+1)$. Então $f' = \tfrac12\cdot\dfrac{2x}{x^2+1} = \dfrac{x}{x^2+1}$.

</details>

**5.** Derive $f(x) = \cos^2(3x)$.

<details>
<summary>Ver solução</summary>

$f' = 2\cos(3x)\cdot(-\sin 3x)\cdot 3 = -6\sin(3x)\cos(3x) = -3\sin(6x)$.

</details>

**6.** Derive $y = (\sin x)^x$ para $0 < x < \pi$.

<details>
<summary>Ver solução</summary>

$\ln y = x\ln(\sin x)$, então $\dfrac{y'}{y} = \ln(\sin x) + x\dfrac{\cos x}{\sin x}$. Portanto, $y' = (\sin x)^x\big[\ln(\sin x) + x\cot x\big]$.

</details>
