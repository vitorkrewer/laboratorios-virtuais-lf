# Força e aceleração: a segunda lei de Newton

A primeira lei diz o que acontece quando as forças se equilibram: nada muda. A segunda diz o que acontece quando **não** se equilibram: o objeto acelera, e quanto mais massa, menos acelera. É a lei mais usada de toda a mecânica.

> [!DICA] **Volta 2 · Aplicar.** Ao terminar, você vai conseguir:
> - **calcular** a aceleração a partir da força resultante e da massa;
> - **diferenciar** massa e peso;
> - **explicar** por que você se sente mais pesado num elevador subindo.

> [!DICA] **De volta à espiral.** No capítulo 2, as forças eram setas; no capítulo 3, pares e equilíbrio; no capítulo 5, aceleração em m/s². Agora juntamos tudo numa equação.

> [!INTUIÇÃO] **Pense antes de ler.** Você empurra, com a mesma força, um carrinho de supermercado vazio e outro cheio. Qual acelera mais? Quantas vezes mais, se o cheio tem o triplo da massa?

## 1. A segunda lei

> [!TEOREMA] **Segunda lei de Newton:**
> $$F_\text{resultante} = m\,a.$$
> A aceleração tem a direção e o sentido da força resultante; é proporcional à força e inversamente proporcional à massa.

**1 newton** é a força que dá a 1 kg uma aceleração de 1 m/s².

**Lendo a equação ao contrário,** $a = \frac{F}{m}$:
- mesma massa, o dobro da força: o dobro da aceleração;
- mesma força, o triplo da massa: um terço da aceleração (a resposta da pergunta do início).

> [!ATENÇÃO] $F$ é a força **resultante**: a soma de todas as forças, com seus sentidos. Empurrando um armário com 100 N contra um atrito de 80 N, a resultante é 20 N.

**Exemplo.** Um carro de 1 000 kg acelera a 3 m/s². A força resultante é $1\,000 \times 3 = 3\,000$ N.

## 2. Massa não é peso

| | Massa | Peso |
|---|---|---|
| O que é | quantidade de matéria; mede a **inércia** | força com que um planeta puxa o corpo |
| Unidade | quilograma (kg) | newton (N) |
| Muda de lugar para lugar? | não | sim |
| Fórmula | — | $P = m\,g$ |

Um astronauta de 70 kg:
- Na Terra ($g = 9{,}8$ m/s²): peso de cerca de 690 N.
- Na Lua ($g = 1{,}6$ m/s²): peso de cerca de 110 N, um sexto.
- No espaço profundo: peso quase zero, **massa ainda de 70 kg**. Continua difícil de empurrar e de parar.

> [!DICA] **De volta à espiral.** Agora a queda livre do capítulo 6 sai em uma linha: na queda, a única força é o peso, $m\,g = m\,a$, então $a = g$, **qualquer que seja a massa**.

## 3. O elevador

Num elevador, a balança mede a força **normal** do piso em você, não o seu peso.
- Parado ou com velocidade constante: normal = peso; a balança marca seu peso.
- Acelerando para cima: a normal precisa ser **maior** que o peso para dar a aceleração: você se sente mais pesado.
- Acelerando para baixo: a normal é **menor**: você se sente mais leve.
- Em queda livre (cabo partido): normal zero: você "flutua". É a sensação dos astronautas em órbita.

## 4. Atrito e plano inclinado

Para começar a empurrar um armário, a força precisa vencer o **atrito estático máximo**. Ele é proporcional à normal: $f = \mu\,N$, onde $\mu$ (mi) é o **coeficiente de atrito**, que depende dos materiais.

| Superfícies | $\mu$ aproximado |
|---|---|
| borracha em asfalto seco | 0,7 a 0,9 |
| borracha em asfalto molhado | 0,4 a 0,6 |
| madeira em madeira | 0,3 a 0,5 |
| gelo em gelo | 0,03 a 0,1 |

Num **plano inclinado**, parte do peso puxa o objeto rampa abaixo. Quanto mais inclinada, maior essa parte; se for maior que o atrito, o objeto escorrega.

> [!DICA] No simulador [Forças e inércia](#/lab/forcas), modo rampa, aumente a inclinação até a caixa começar a escorregar e compare com o coeficiente de atrito.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Uma força resultante de 20 N age sobre um corpo de 4 kg. A aceleração é:
- 80 m/s²
+ 5 m/s²
- 0,2 m/s²
- 24 m/s²
> a = F/m.

? Na Lua, a massa de um astronauta, comparada com a da Terra:
- é seis vezes menor
+ é a mesma
- é zero
- é seis vezes maior
> O que muda é o peso.

? Num elevador que acelera para cima, a balança marca:
+ mais que o seu peso
- menos que o seu peso
- exatamente o seu peso
- zero
> A normal precisa ser maior que o peso.

? Você empurra uma caixa com 50 N e o atrito é de 50 N. A caixa:
- acelera
+ fica parada ou segue com velocidade constante
- freia até parar, sempre
- sobe
> Resultante zero.

? Sem ar, todos os corpos caem com a mesma aceleração porque:
- o peso é igual para todos
+ força e inércia crescem juntas com a massa
- a massa não existe na queda
- a Terra puxa todos igual
> P = mg e a = P/m = g.
```

## 5. Exercícios

**1.** Uma caixa de 20 kg é empurrada com 100 N num piso com atrito de 60 N. Qual a aceleração?

<details>
<summary>Ver solução</summary>

Resultante: $100 - 60 = 40$ N; $a = \frac{40}{20} = 2$ m/s².

</details>

**2.** Uma pessoa de 60 kg está num elevador que acelera para cima a 2 m/s². Quanto marca a balança, em newtons? ($g = 10$ m/s².)

<details>
<summary>Ver solução</summary>

$N - P = m\,a \Rightarrow N = 60 \times 10 + 60 \times 2 = 720$ N. A balança (em kg) mostraria 72 kg.

</details>

**3.** Por que caminhões carregados precisam de distâncias maiores para frear?

<details>
<summary>Ver solução</summary>

Com mais massa, a mesma força de freio produz menos desaceleração ($a = \frac{F}{m}$), e a distância de frenagem aumenta.

</details>
