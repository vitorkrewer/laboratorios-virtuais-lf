# Laboratório Virtual de Design Thinking 💡

Este projeto é uma ferramenta educacional interativa projetada para guiar estudantes e profissionais através das 5 fases clássicas do **Design Thinking**: Empatia, Definição, Ideação, Prototipagem e Teste.

A aplicação funciona como um **workshop digital**, onde o usuário aprende fazendo, preenchendo atividades práticas em cada etapa e exportando um relatório completo do seu projeto ao final.

[Preview do Projeto](https://learningfly.b-cdn.net/labs/design-thinking-build-projects/index.html)

## 🎯 Funcionalidades e Fases

O laboratório guia o usuário através de uma trilha linear, onde cada fase possui:

* **Conteúdo Teórico:** Explicações claras e diretas sobre o objetivo de cada etapa (acessíveis via ícone `?`).
* **Atividade Prática:** Ferramentas interativas para aplicar o conhecimento imediatamente.
* **Validação de Progresso:** Um indicador visual ("check") aparece na navegação lateral quando a atividade da fase é concluída.

### As 5 Fases

1. **Empatia:**
    * *Atividade:* Criação de uma **Persona** detalhada.
    * *Ferramentas:* Formulário para definir Nome, Objetivos e Dificuldades, gerando um "Card de Persona" visual.

2. **Definição:**
    * *Atividade:* Construção da frase do desafio ("Como poderíamos...").
    * *Ferramentas:* Coletores drop-down para montar a frase estruturada focada no usuário, ação e contexto.

3. **Ideação:**
    * *Atividade:* Brainstorming virtual.
    * *Ferramentas:* Um quadro de post-its digital onde o usuário pode adicionar suas ideias coloridas livremente.

4. **Prototipagem:**
    * *Atividade:* Escolha e planejamento do protótipo.
    * *Ferramentas:* Seletor de tipo de protótipo (Storyboard, Role-playing, Maquete, Modelo de Serviço) com áreas de texto específicas para descrever a solução. Inclui também um campo para planejar a coleta de feedback.

5. **Teste:**
    * *Atividade:* Simulação de coleta de feedback.
    * *Ferramentas:* Formulário de avaliação com sliders para "Facilidade de Uso" e "Inovação", gerando um resumo final.

### 📄 Exportação em PDF

Ao final da jornada, o usuário pode clicar em **"Exportar Projeto em PDF"**. A aplicação utiliza `html2canvas` e `jspdf` para capturar todas as atividades preenchidas e gerar um relatório profissional, pronto para ser entregue como trabalho ou documentação.

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3**
* **TailwindCSS (via CDN):** Para estilização moderna e responsiva.
* **JavaScript (Vanilla JS):** Lógica da aplicação, manipulação do DOM e controle de estado.
* **Bibliotecas Externas:**
  * `jsPDF`: Geração do arquivo PDF final.
  * `html2canvas`: Captura de screenshots dos elementos HTML (cards, quadros) para inserção no PDF.
  * `Google Fonts (Inter)`: Tipografia.

## 📦 Como Usar

1. Clone o repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Navegue pelas fases usando a barra lateral ou rolando a página.
4. Pressione o botão `?` em cada título para ler a teoria.
5. Preencha os campos interativos.
6. Gere o PDF do seu projeto.

## 🎨 Design System

O projeto utiliza uma paleta de cores sóbria mas focada em ação, com destaque para:

* **Azul Foco:** Para títulos e elementos principais.
* **Laranja:** Para pontos de atenção e ajuda.
* **Design Clean:** Foco total no conteúdo e nas atividades.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
