# Dados, variáveis e gráficos

Estatística é a ciência de aprender com dados: coletar, organizar, resumir e, no fim, tirar conclusões sobre o que não foi observado. Antes de qualquer fórmula, é preciso saber **que tipo de dado** se tem nas mãos, porque isso decide quais gráficos e medidas fazem sentido.

> [!DICA] No simulador [Estatística descritiva](#/lab/descritiva), cole uma lista de números e veja o histograma e as medidas mudarem na hora.

## 1. População, amostra e variável

- **População**: o conjunto inteiro que interessa (todos os eleitores do país, todas as peças de um lote).
- **Amostra**: a parte que de fato foi observada (os 2.000 entrevistados, as 50 peças testadas).
- **Variável**: a característica medida em cada elemento (idade, cor, nota).

> [!INTUIÇÃO] Quase nunca dá para medir a população inteira. A estatística existe para responder: o que a amostra permite concluir sobre a população, e com que margem de erro?

## 2. Tipos de variáveis

| Tipo | Subtipo | Exemplos |
|---|---|---|
| **Qualitativa** (categorias) | nominal (sem ordem) | cor dos olhos, curso, cidade |
| | ordinal (com ordem) | escolaridade, nível de satisfação |
| **Quantitativa** (números) | discreta (contagem) | número de filhos, gols, defeitos |
| | contínua (medida) | altura, tempo, salário |

> [!ATENÇÃO] Número nem sempre é quantitativo: CEP e número de matrícula são **rótulos**. Calcular a "média dos CEPs" não tem significado nenhum.

## 3. Tabela de frequências

Para dados discretos ou categóricos, conte quantas vezes cada valor aparece.

**Exemplo.** Número de filhos de 20 famílias:

| Filhos | Frequência $f$ | Frequência relativa | Acumulada |
|---|---|---|---|
| 0 | 4 | 20% | 20% |
| 1 | 7 | 35% | 55% |
| 2 | 6 | 30% | 85% |
| 3 | 3 | 15% | 100% |

A frequência relativa é $f / n$. A acumulada responde perguntas como "que fração das famílias tem até 1 filho?" (55%).

Para dados contínuos, agrupe em **classes** (intervalos de mesma largura), como $[150, 160)$, $[160, 170)$ etc.

## 4. Gráficos: qual usar

| Gráfico | Para | Observação |
|---|---|---|
| Barras | categorias ou discretos | barras separadas |
| Setores (pizza) | partes de um todo | poucas categorias, somando 100% |
| **Histograma** | contínuos agrupados em classes | barras encostadas; a **área** representa a frequência |
| Linha | evolução no tempo | eixo $x$ é o tempo |
| Dispersão | relação entre duas variáveis | capítulo 12 |
| Boxplot | resumo de cinco números | capítulo 2 |

### Lendo a forma de um histograma

- **Simétrico**: a metade esquerda espelha a direita (alturas de adultos).
- **Assimétrico à direita**: cauda longa para a direita (salários, preços de imóveis). Poucos valores muito altos.
- **Assimétrico à esquerda**: cauda para a esquerda (notas de uma prova fácil).
- **Bimodal**: dois picos, sinal de que há dois grupos misturados.

> [!ATENÇÃO] Gráficos também enganam. Eixo vertical que não começa em zero exagera diferenças; pizza em 3D distorce áreas. Desconfie de gráfico sem escala.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? "Tempo de espera numa fila, em minutos" é uma variável:
- qualitativa nominal
- qualitativa ordinal
- quantitativa discreta
+ quantitativa contínua
> É uma medida que pode assumir qualquer valor num intervalo.

? "Nível de satisfação: ruim, regular, bom, ótimo" é:
- quantitativa discreta
+ qualitativa ordinal
- qualitativa nominal
- quantitativa contínua
> Categorias com ordem natural.

? Uma pesquisa ouve 1.500 eleitores para estimar a intenção de voto do país. Os 1.500 são:
- a população
+ a amostra
- a variável
- o parâmetro
> A parte observada.

? O gráfico adequado para mostrar a distribuição de alturas de 300 alunos é:
- pizza
+ histograma
- linha
- nenhum
> Variável contínua, agrupada em classes.

? Um histograma de salários com cauda longa para a direita é:
- simétrico
+ assimétrico à direita
- assimétrico à esquerda
- bimodal
> A cauda indica o lado da assimetria.
```

## 5. Exercícios

**1.** Classifique: (a) marca do celular; (b) número de faltas; (c) peso; (d) classe social A, B, C.

<details>
<summary>Ver solução</summary>

(a) qualitativa nominal; (b) quantitativa discreta; (c) quantitativa contínua; (d) qualitativa ordinal.

</details>

**2.** Monte a tabela de frequências (absoluta e relativa) dos dados: 2, 3, 3, 1, 2, 3, 4, 2, 3, 2.

<details>
<summary>Ver solução</summary>

1: 1 (10%); 2: 4 (40%); 3: 4 (40%); 4: 1 (10%). Total 10.

</details>

**3.** Por que o histograma tem barras encostadas e o gráfico de barras não?

<details>
<summary>Ver solução</summary>

No histograma as classes são intervalos consecutivos de uma variável contínua: não há "buraco" entre $[160, 170)$ e $[170, 180)$. No gráfico de barras, as categorias são separadas.

</details>
