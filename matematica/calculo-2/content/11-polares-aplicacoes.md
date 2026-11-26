# Integrais duplas em coordenadas polares e aplicações

Discos, anéis, setores e qualquer integrando com $x^2 + y^2$ ficam desajeitados em coordenadas cartesianas e simples em polares. A única novidade é o fator $r$ no elemento de área. Com isso em mãos, a integral dupla calcula massas, centros de massa, probabilidades e até a famosa integral $\int e^{-x^2}\,dx$.

## 1. A mudança para polares

Com $x = r\cos\theta$, $y = r\sin\theta$ (e $x^2 + y^2 = r^2$):

> [!TEOREMA] Se $D$ é descrita por $\alpha \le \theta \le \beta$ e $r_1(\theta) \le r \le r_2(\theta)$:
> $$\iint_D f(x, y)\,dA = \int_\alpha^\beta \int_{r_1(\theta)}^{r_2(\theta)} f(r\cos\theta, r\sin\theta)\;r\,dr\,d\theta.$$

> [!INTUIÇÃO] Um "retângulo polar" pequeno, com lados $\Delta r$ e $\Delta\theta$, é quase um retângulo de lados $\Delta r$ e $r\,\Delta\theta$ (o arco). Daí $dA = r\,dr\,d\theta$: longe da origem, o mesmo $\Delta\theta$ cobre mais área.

> [!ATENÇÃO] O erro mais comum do capítulo é esquecer o $r$. Sem ele, a área do disco de raio $a$ daria $2\pi a$ em vez de $\pi a^2$.

**Exemplo.** $\displaystyle\iint_D (x^2 + y^2)\,dA$, com $D$ o disco $x^2 + y^2 \le 4$:
$$\int_0^{2\pi}\int_0^2 r^2 \cdot r\,dr\,d\theta = 2\pi \cdot \frac{2^4}{4} = 8\pi.$$

**Exemplo (volume da esfera).** A metade superior da esfera de raio $a$ é $z = \sqrt{a^2 - r^2}$:
$$V = 2\int_0^{2\pi}\int_0^a \sqrt{a^2 - r^2}\;r\,dr\,d\theta = 2 \cdot 2\pi \cdot \frac{a^3}{3} = \frac43\pi a^3.$$

## 2. A integral de Gauss

Não há primitiva elementar para $e^{-x^2}$, mas o valor de $I = \int_{-\infty}^{\infty} e^{-x^2}\,dx$ sai por um truque: calcular $I^2$ como integral dupla.

$$I^2 = \iint_{\mathbb{R}^2} e^{-(x^2 + y^2)}\,dA = \int_0^{2\pi}\int_0^\infty e^{-r^2}\,r\,dr\,d\theta = 2\pi \cdot \frac12 = \pi.$$

Logo $I = \sqrt{\pi}$. É esse resultado que garante que a área sob a curva normal da Estatística é $1$ (o fator $\frac{1}{\sqrt{2\pi}}$ da densidade vem daqui).

## 3. Aplicações

| Grandeza | Fórmula (densidade $\rho(x, y)$) |
|---|---|
| Área | $A = \iint_D 1\,dA$ |
| Massa | $m = \iint_D \rho\,dA$ |
| Centro de massa | $\bar x = \frac{1}{m}\iint_D x\rho\,dA$, $\bar y = \frac{1}{m}\iint_D y\rho\,dA$ |
| Momento de inércia (em torno da origem) | $I_0 = \iint_D (x^2 + y^2)\rho\,dA$ |
| Probabilidade (densidade conjunta $f$) | $P\big((X, Y) \in D\big) = \iint_D f\,dA$ |

Com densidade constante, o centro de massa chama-se **centroide** e só depende da forma.

**Exemplo.** Centroide do semidisco $x^2 + y^2 \le a^2$, $y \ge 0$. Por simetria $\bar x = 0$. Área $\frac{\pi a^2}{2}$.
$$\iint_D y\,dA = \int_0^\pi\int_0^a r\sin\theta\cdot r\,dr\,d\theta = \frac{a^3}{3}\cdot 2.$$
Então $\bar y = \frac{2a^3/3}{\pi a^2/2} = \frac{4a}{3\pi} \approx 0{,}42a$.

**Exemplo (probabilidade).** Se $X$ e $Y$ são independentes e uniformes em $[0, 1]$, a densidade conjunta é $1$ no quadrado. $P(X + Y \le 1)$ é a área do triângulo abaixo de $x + y = 1$: $\frac12$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Em polares, o elemento de área é:
- $dr\,d\theta$
+ $r\,dr\,d\theta$
- $r^2\,dr\,d\theta$
- $\frac{1}{r}\,dr\,d\theta$
> O arco tem comprimento $r\,d\theta$.

? O anel $1 \le x^2 + y^2 \le 4$ em polares é:
+ $1 \le r \le 2$, $0 \le \theta \le 2\pi$
- $1 \le r \le 4$, $0 \le \theta \le 2\pi$
- $0 \le r \le 2$, $0 \le \theta \le \pi$
- $1 \le r \le 2$, $0 \le \theta \le \pi$
> $r = \sqrt{x^2 + y^2}$.

? $\displaystyle\int_{-\infty}^{\infty} e^{-x^2}\,dx$ vale:
- $\pi$
+ $\sqrt\pi$
- $1$
- $2\pi$
> Integral de Gauss.

? O centroide de uma região com densidade constante depende:
+ só da forma da região
- do valor da densidade
- da massa total
- do sistema de coordenadas escolhido
> A densidade constante cancela.

? $\displaystyle\int_0^{2\pi}\int_0^1 r\,dr\,d\theta$ é:
- $2\pi$
+ $\pi$
- $\frac{\pi}{2}$
- $1$
> Área do disco unitário.
```

## 4. Exercícios

**1.** Calcule $\displaystyle\iint_D \sqrt{x^2 + y^2}\,dA$, com $D$ o disco de raio $3$.

<details>
<summary>Ver solução</summary>

$\int_0^{2\pi}\int_0^3 r \cdot r\,dr\,d\theta = 2\pi \cdot 9 = 18\pi$.

</details>

**2.** Calcule a área de uma pétala da rosa $r = \cos(2\theta)$, para $-\frac{\pi}{4} \le \theta \le \frac{\pi}{4}$.

<details>
<summary>Ver solução</summary>

$\int_{-\pi/4}^{\pi/4}\int_0^{\cos 2\theta} r\,dr\,d\theta = \frac12\int_{-\pi/4}^{\pi/4}\cos^2 2\theta\,d\theta = \frac12\cdot\frac{\pi}{4} = \frac{\pi}{8}$.

</details>

**3.** Calcule o volume sob o paraboloide $z = 9 - x^2 - y^2$ e acima do plano $z = 0$.

<details>
<summary>Ver solução</summary>

O paraboloide corta $z = 0$ em $r = 3$. $\int_0^{2\pi}\int_0^3 (9 - r^2)\,r\,dr\,d\theta = 2\pi\left(\frac{81}{2} - \frac{81}{4}\right) = \frac{81\pi}{2}$.

</details>

**4.** Uma placa no quarto de disco $x^2 + y^2 \le 1$, $x, y \ge 0$, tem densidade $\rho = x^2 + y^2$. Calcule a massa.

<details>
<summary>Ver solução</summary>

$\int_0^{\pi/2}\int_0^1 r^3\,dr\,d\theta = \frac{\pi}{2}\cdot\frac14 = \frac{\pi}{8}$.

</details>
