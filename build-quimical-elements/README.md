# Laboratório de Química Virtual ⚗️

O **Laboratório de Química Virtual** é um ambiente interativo e gamificado onde estudantes podem explorar a formação de moléculas combinando elementos da tabela periódica.

A ferramenta foi projetada para tornar o aprendizado de estequiometria e ligações químicas mais visual e intuitivo, permitindo que os alunos "brinquem" com os átomos em um espaço seguro.

[🔗 Acessar Laboratório Online](https://vitorkrewer.github.io/laboratorios-virtuais-lf/build-quimical-elements/)

## 🚀 Funcionalidades Principais

### 1. Workspace Interativo

Uma área de trabalho livre onde os alunos podem adicionar átomos clicando na Tabela Periódica.

* Os átomos são renderizados como esferas coloridas que podem ser posicionadas aleatoriamente.
* Suporte a todos os 118 elementos da tabela periódica, com categorização por cores (metais, não-metais, gases nobres, etc.).
* **Bancada como Grafo Molecular:** cada átomo é um nó e cada ligação química formada é uma aresta visual, com métricas de nós e ligações em tempo real.
* **Fórmula Instantânea:** contador de átomos e prévia da fórmula em subscritos enquanto a molécula é montada.
* **Biblioteca Pesquisável:** filtro por nome, símbolo e categoria química para tornar a seleção dos 118 elementos prática em qualquer tela.

### 2. Motor de Combinação & Receitas

O núcleo do laboratório é um sistema inteligente que verifica se os átomos presentes no workspace correspondem a uma molécula conhecida.

* **Receitas Prontas:** 16 moléculas guiadas, incluindo Água (H₂O), Hidrogênio (H₂), Nitrogênio (N₂), Oxigênio (O₂), Amônia (NH₃), Cloreto de Sódio (NaCl), Peróxido de Hidrogênio (H₂O₂), Dióxido de Carbono (CO₂), Dióxido de Enxofre (SO₂), Metano (CH₄), Etanol (C₂H₆O), Ácido Acético (C₂H₄O₂), Benzeno (C₆H₆), Glicose (C₆H₁₂O₆), Cafeína e Dopamina.
* **Validação em Tempo Real:** Ao clicar em "Combinar", o sistema conta os átomos e verifica se formam uma estrutura estável.
* **Auditoria de Composição:** Na inicialização, cada receita é conferida contra a quantidade real de átomos da estrutura, evitando fórmulas inconsistentes. A estrutura da cafeína foi ajustada para C₈H₁₀N₄O₂.

### 3. Animações Procedurais (Anime.js)

Se a combinação for válida, uma animação complexa é acionada:

1. **Organização:** Os átomos se movem suavemente para suas posições corretas na estrutura molecular.
2. **Convergência Controlada:** Em receitas guiadas, os átomos surgem em uma nuvem central organizada, em vez de serem espalhados aleatoriamente pela tela.
3. **Ligação:** Somente após os nós atingirem as coordenadas finais, as arestas químicas "crescem" entre eles, formando o grafo molecular.
4. **Vida:** A molécula final fica pulsando levemente, dando uma sensação orgânica.
5. **Feedback de Erro:** Se a combinação estiver errada, os átomos "tremem" em vermelho, indicando instabilidade.
6. **Responsividade Estrutural:** ao mudar do desktop para o mobile, a geometria da molécula é recalculada para manter nós e ligações dentro da bancada.
7. **Estabilidade da Geometria:** após formada, a molécula mantém os nós e arestas fixos; o feedback visual ocorre por brilho, sem deslocar ligações químicas.
8. **Formação Atômica:** receitas ficam temporariamente bloqueadas durante a animação para impedir que duas estruturas se sobreponham na bancada.

### 4. Sugestões de Receitas

Uma barra lateral oferece atalhos para moléculas complexas (como Cafeína e Dopamina). Ao clicar, o laboratório é preenchido automaticamente com os átomos necessários, servindo como uma demonstração visual da complexidade dessas estruturas.

### 5. Interface Elementa Lab

O laboratório foi redesenhado como uma bancada científica responsiva:

* Cabeçalho compacto com acesso ao Hub e indicação de simulação segura.
* Painéis organizados em **Biblioteca de Elementos**, **Bancada Molecular** e **Receitas Moleculares**.
* Layout adaptativo: em tablets e desktops os painéis ficam lado a lado; em celulares passam a uma sequência vertical sem cortar a molécula.

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3**
* **Bootstrap 5:** Para o layout responsivo e componentes de interface (botões, painéis).
* **JavaScript (Vanilla JS):** Lógica principal, validação estequiométrica e manipulação do DOM.
* **Anime.js:** Biblioteca poderosa para orquestrar as timelines de animação (movimento dos átomos e crescimento das ligações).

## 📦 Como Usar

1. Clone o repositório.
2. Abra o arquivo `index.html` no navegador.
3. **Modo Livre:** Adicione átomos manualmente (ex: 2 Hidrogênios + 1 Oxigênio) e clique em "Combinar".
4. **Modo Receita:** Clique em uma das sugestões na direita (ex: "Metano") para ver a mágica acontecer automaticamente.

## 🔬 Estruturas Suportadas

O sistema atualmente suporta a visualização estrutural detalhada de:

* Água
* Hidrogênio Molecular
* Nitrogênio Molecular
* Oxigênio Molecular
* Amônia
* Cloreto de Sódio
* Peróxido de Hidrogênio
* Metano
* Dióxido de Carbono
* Dióxido de Enxofre
* Etanol
* Ácido Acético
* Benzeno
* Glicose
* Cafeína
* Dopamina

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
