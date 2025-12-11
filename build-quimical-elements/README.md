# Laboratório de Química Virtual ⚗️

O **Laboratório de Química Virtual** é um ambiente interativo e gamificado onde estudantes podem explorar a formação de moléculas combinando elementos da tabela periódica.

A ferramenta foi projetada para tornar o aprendizado de estequiometria e ligações químicas mais visual e intuitivo, permitindo que os alunos "brinquem" com os átomos em um espaço seguro.

[Preview do Projeto](https://learningfly.b-cdn.net/labs/build-quimical-elements/index.html)

## 🚀 Funcionalidades Principais

### 1. Workspace Interativo

Uma área de trabalho livre onde os alunos podem adicionar átomos clicando na Tabela Periódica.

* Os átomos são renderizados como esferas coloridas que podem ser posicionadas aleatoriamente.
* Suporte a todos os 118 elementos da tabela periódica, com categorização por cores (metais, não-metais, gases nobres, etc.).

### 2. Motor de Combinação & Receitas

O núcleo do laboratório é um sistema inteligente que verifica se os átomos presentes no workspace correspondem a uma molécula conhecida.

* **Receitas Prontas:** Água (H₂O), Metano (CH₄), Dióxido de Carbono (CO₂), Glicose (C₆H₁₂O₆), Etanol (C₂H₆O), Cafeína e Dopamina.
* **Validação em Tempo Real:** Ao clicar em "Combinar", o sistema conta os átomos e verifica se formam uma estrutura estável.

### 3. Animações Procedurais (Anime.js)

Se a combinação for válida, uma animação complexa é acionada:

1. **Organização:** Os átomos se movem suavemente para suas posições corretas na estrutura molecular.
2. **Ligação:** Linhas de ligação química "crescem" entre os átomos, conectando-os fisicamente.
3. **Vida:** A molécula final fica pulsando levemente, dando uma sensação orgânica.
4. **Feedback de Erro:** Se a combinação estiver errada, os átomos "tremem" em vermelho, indicando instabilidade.

### 4. Sugestões de Receitas

Uma barra lateral oferece atalhos para moléculas complexas (como Cafeína e Dopamina). Ao clicar, o laboratório é preenchido automaticamente com os átomos necessários, servindo como uma demonstração visual da complexidade dessas estruturas.

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
* Metano
* Dióxido de Carbono
* Etanol
* Glicose
* Cafeína
* Dopamina

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
