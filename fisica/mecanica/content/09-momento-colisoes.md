# Quantidade de movimento e colisões

Por que um airbag salva vidas? Por que a arma "dá um coice" ao disparar? Por que, no bilhar, a bola que bate de frente para e a outra sai com a mesma velocidade? Tudo isso se explica com uma grandeza que se conserva em qualquer colisão: a **quantidade de movimento**.

> [!DICA] **Volta 2 · Aplicar.** Ao terminar, você vai conseguir:
> - **calcular** a quantidade de movimento e o impulso;
> - **usar** a conservação da quantidade de movimento em colisões e explosões;
> - **explicar** como cintos, airbags e capacetes reduzem a força num impacto.

> [!DICA] **De volta à espiral.** A terceira lei (capítulo 3) diz que, numa batida, as forças entre os dois corpos são iguais e opostas. Este capítulo tira daí uma lei de conservação.

> [!INTUIÇÃO] **Pense antes de ler.** Você pula de um muro e cai em pé no chão duro, e depois no colchão. A sua velocidade ao chegar é a mesma. Por que no colchão dói menos?

## 1. Quantidade de movimento

> [!DEFINIÇÃO] **Quantidade de movimento** (ou **momento linear**):
> $$p = m\,v.$$
> Tem a direção e o sentido da velocidade. Unidade: kg·m/s.

Um caminhão a 10 km/h pode ter mais quantidade de movimento que um carro a 100 km/h: é mais difícil pará-lo.

## 2. Impulso: a mesma mudança, com mais ou menos força

Para mudar a quantidade de movimento, é preciso aplicar uma força durante um tempo:

> [!TEOREMA] **Impulso:** $$F\,\Delta t = \Delta p.$$

Para parar um corpo, a variação $\Delta p$ é fixa. Se o tempo $\Delta t$ for **maior**, a força $F$ fica **menor**. A resposta da pergunta do início: o colchão faz você parar em mais tempo, com menos força.

**Aplicações:**
- **airbag** e **cinto de segurança**: aumentam o tempo de parada do corpo;
- **capacete**: a espuma amassa e alonga o impacto;
- dobrar os joelhos ao pousar de um salto;
- **zonas de deformação** dos carros: a frente amassa de propósito.

## 3. Conservação da quantidade de movimento

> [!TEOREMA] Se não há forças externas (ou elas são desprezíveis durante a interação), a **quantidade de movimento total** de um sistema se conserva:
> $$p_\text{antes} = p_\text{depois}.$$

Isso vem da terceira lei: as forças entre os corpos são iguais e opostas durante o mesmo tempo, então o que um ganha de quantidade de movimento o outro perde.

**Explosões e recuos.** Um canhão parado dispara: $p$ total era zero e continua zero. A bala vai para a frente e o canhão recua para trás; como o canhão tem muito mais massa, recua devagar. Foguetes funcionam do mesmo jeito.

## 4. Tipos de colisão

| Colisão | Quantidade de movimento | Energia cinética | Exemplo |
|---|---|---|---|
| **elástica** | conserva | conserva | bolas de bilhar (quase) |
| **inelástica** | conserva | parte vira calor e deformação | carros batendo |
| **perfeitamente inelástica** | conserva | perde o máximo; os corpos seguem grudados | bala de massinha que gruda |

**Exemplo (perfeitamente inelástica).** Um carro de 1 000 kg a 20 m/s bate na traseira de outro igual, parado, e eles seguem juntos:
$$1\,000 \times 20 = 2\,000 \times v \Rightarrow v = 10\ \text{m/s}.$$
A energia cinética caiu de 200 kJ para 100 kJ: metade virou deformação, calor e som.

> [!DICA] No simulador [Colisões](#/lab/colisoes), mude as massas e a elasticidade. Repare que a barra da quantidade de movimento total nunca muda, enquanto a da energia cinética só se mantém na colisão elástica.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? A quantidade de movimento de 2 kg a 3 m/s é:
- 1,5 kg·m/s
+ 6 kg·m/s
- 9 kg·m/s
- 18 kg·m/s
> p = m v.

? O airbag reduz a força sobre o motorista porque:
- diminui a velocidade do carro antes da batida
+ aumenta o tempo em que o corpo é parado
- diminui a massa do motorista
- absorve toda a energia instantaneamente
> F Δt = Δp.

? Um patinador de 60 kg empurra outro de 30 kg, ambos parados. Se o de 30 kg sai a 2 m/s, o de 60 kg sai a:
- 2 m/s
+ 1 m/s, no sentido oposto
- 4 m/s
- 0
> 30 × 2 = 60 × 1.

? Numa colisão perfeitamente inelástica:
+ a quantidade de movimento se conserva, mas parte da energia cinética se perde
- nada se conserva
- só a energia se conserva
- os corpos se afastam com a mesma velocidade
> Eles seguem grudados.

? Uma arma "dá um coice" ao disparar por causa:
- do barulho
+ da conservação da quantidade de movimento
- do calor da pólvora
- da gravidade
> A bala vai para a frente e a arma, para trás.
```

## 5. Exercícios

**1.** Uma bola de 0,5 kg chega a 10 m/s e é parada pela mão de um goleiro em 0,05 s. Qual a força média? E se ele "acompanhar" a bola e pará-la em 0,2 s?

<details>
<summary>Ver solução</summary>

$\Delta p = 0{,}5 \times 10 = 5$ kg·m/s. Em 0,05 s: $F = 100$ N. Em 0,2 s: $F = 25$ N, quatro vezes menos.

</details>

**2.** Um vagão de 2 000 kg a 3 m/s engata em outro de 1 000 kg parado. Qual a velocidade do conjunto?

<details>
<summary>Ver solução</summary>

$2\,000 \times 3 = 3\,000 \times v \Rightarrow v = 2$ m/s.

</details>
