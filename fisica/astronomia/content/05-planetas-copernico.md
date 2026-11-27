# Planetas, movimento retrógrado e a revolução copernicana

"Planeta" vem do grego para "errante": cinco pontos de luz que andam entre as estrelas fixas. E andam de um jeito estranho: às vezes param e voltam para trás por algumas semanas. Explicar essas voltas levou 2 000 anos e mudou o lugar da Terra no universo.

> [!DICA] No simulador [Sistema Solar](#/lab/sistema), ligue "retrógrado": a linha da Terra até Marte aponta para o fundo de estrelas, e o rastro desenha o laço que vemos no céu.

## 1. O que se vê

- Os planetas andam, em geral, de **oeste para leste** entre as estrelas, como o Sol e a Lua (movimento **direto**).
- Periodicamente, param (estacionários), andam para **oeste** (movimento **retrógrado**) e voltam ao movimento direto, desenhando um laço ou um "Z".
- **Mercúrio e Vênus** nunca se afastam muito do Sol: no máximo $28^\circ$ e $47^\circ$, respectivamente. Por isso só aparecem perto do amanhecer ou do anoitecer ("estrela d'alva" e "estrela vespertina" são Vênus).
- **Marte, Júpiter e Saturno** podem ficar em qualquer ângulo do Sol, inclusive opostos a ele, a noite toda; e fazem os laços retrógrados justamente quando estão em **oposição**, mais brilhantes.

## 2. O modelo geocêntrico

Para Aristóteles e Ptolomeu (século II), a Terra estava parada no centro. Para manter órbitas circulares e explicar o retrógrado, Ptolomeu pôs cada planeta num círculo pequeno, o **epiciclo**, cujo centro gira num círculo grande, o **deferente**. Ajustando tamanhos e velocidades (e alguns truques a mais, como o equante), o modelo previa posições com erro de poucos graus durante mais de 1 000 anos.

> [!INTUIÇÃO] Um bom modelo não precisa estar certo para funcionar: precisa prever. O de Ptolomeu previa razoavelmente bem, mas exigia ajustes independentes para cada planeta, sem explicar **por que** Mercúrio e Vênus ficam presos ao Sol ou por que o retrógrado coincide com a oposição.

## 3. Copérnico: o Sol no centro

Em 1543, Nicolau Copérnico propôs que a Terra é um planeta que gira em torno de si e orbita o Sol, como os outros. Com isso:

- **O retrógrado é um efeito de perspectiva.** A Terra, mais interna, é mais rápida. Quando ultrapassa Marte, Marte parece andar para trás em relação às estrelas distantes, como um carro mais lento visto de outro que o ultrapassa na estrada.
- **Mercúrio e Vênus ficam perto do Sol** porque suas órbitas são internas à da Terra: vistos daqui, nunca podem estar "atrás" de nós.
- **A ordem e as distâncias** dos planetas saem das observações. Copérnico calculou as distâncias relativas com boa precisão.

> [!ATENÇÃO] O modelo de Copérnico, com órbitas circulares, não previa melhor que o de Ptolomeu: também precisava de epiciclos. O que ele trouxe de superior foi a **explicação** unificada. A precisão só veio com as elipses de Kepler (próximo capítulo).

## 4. Períodos sinódico e sideral

> [!DEFINIÇÃO]
> - **Período sideral** $P$: tempo de uma volta em torno do Sol, em relação às estrelas.
> - **Período sinódico** $S$: tempo entre duas configurações iguais vistas da Terra (por exemplo, de uma oposição à próxima).

Como a Terra também se move:
$$\text{planeta exterior: } \frac{1}{S} = \frac{1}{1\text{ ano}} - \frac{1}{P}, \qquad \text{planeta interior: } \frac{1}{S} = \frac{1}{P} - \frac{1}{1\text{ ano}}$$

**Exemplo.** Marte tem $P = 1{,}88$ ano: $\frac1S = 1 - \frac{1}{1{,}88} = 0{,}468$, logo $S = 2{,}14$ anos, cerca de **780 dias**. É o intervalo entre oposições de Marte (e entre janelas de lançamento de sondas para lá).

## 5. Galileu e o telescópio

Em 1609–1610, Galileu apontou um telescópio para o céu e encontrou evidências fortes contra o modelo geocêntrico:

| Observação | Por que importa |
|---|---|
| **Quatro luas de Júpiter** | Há corpos que não orbitam a Terra. |
| **Fases de Vênus**, de cheio a crescente, com tamanho variando muito | Só se explicam se Vênus orbita o Sol; no modelo de Ptolomeu, Vênus nunca apareceria cheio. |
| Montanhas e crateras na Lua; manchas no Sol | Os céus não são "perfeitos" e imutáveis. |
| A Via Láctea resolvida em incontáveis estrelas | O universo é muito maior que o imaginado. |

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? No modelo heliocêntrico, o movimento retrógrado de Marte ocorre:
+ quando a Terra ultrapassa Marte, perto da oposição
- quando Marte para na órbita
- quando Marte está atrás do Sol
- porque Marte gira para trás
> É um efeito de perspectiva.

? Por que Vênus nunca é visto à meia-noite?
- porque é pequeno demais
+ porque sua órbita é interna à da Terra
- porque é ofuscado pela Lua
- porque gira ao contrário
> Fica sempre a menos de $47^\circ$ do Sol.

? Qual observação de Galileu foi decisiva contra o modelo de Ptolomeu?
- crateras na Lua
+ a sequência completa de fases de Vênus
- as estrelas da Via Láctea
- as manchas solares
> Vênus cheio só é possível se ele passar atrás do Sol.

? O período sinódico de um planeta é:
- o tempo de uma volta em torno do Sol
+ o tempo entre duas configurações iguais vistas da Terra
- o tempo de rotação do planeta
- sempre igual a 1 ano
> Por exemplo, de uma oposição à seguinte.

? Júpiter tem período sideral de 11,86 anos. Seu período sinódico é de aproximadamente:
- 11,86 anos
- 1 ano
+ 1,09 ano
- 0,92 ano
> $\frac1S = 1 - \frac{1}{11{,}86}$.
```

## 6. Exercícios

**1.** Saturno tem $P = 29{,}46$ anos. De quanto em quanto tempo ele fica em oposição?

<details>
<summary>Ver solução</summary>

$\frac1S = 1 - \frac{1}{29{,}46} = 0{,}966$: $S = 1{,}035$ ano, cerca de 378 dias.

</details>

**2.** Vênus tem $P = 0{,}615$ ano. Calcule o período sinódico.

<details>
<summary>Ver solução</summary>

$\frac1S = \frac{1}{0{,}615} - 1 = 0{,}626$: $S \approx 1{,}60$ ano, cerca de 584 dias.

</details>

**3.** Por que os planetas exteriores ficam mais brilhantes justamente quando fazem o laço retrógrado?

<details>
<summary>Ver solução</summary>

O retrógrado acontece na oposição, quando a Terra está entre o Sol e o planeta: é quando a distância Terra–planeta é mínima e o planeta mostra a face toda iluminada.

</details>

**4.** Um planeta hipotético tem período sinódico de 2 anos e é exterior. Qual é o período sideral?

<details>
<summary>Ver solução</summary>

$\frac1P = 1 - \frac12 = \frac12$: $P = 2$ anos.

</details>
