# Laboratório Virtual - Desenho Universal para Engenharias

Bem-vindo ao repositório do **Laboratório Virtual de Desenho Universal para Engenharias**, um hub educacional interativo que une a precisão técnica da engenharia com os princípios da inclusão e acessibilidade. Este projeto faz parte da iniciativa **LearningFly**, focado em transformar conceitos complexos em experiências visuais e práticas.

[🔗 Acessar Laboratório Online](https://vitorkrewer.github.io/laboratorios-virtuais-lf/desenho-universal-engenharias/)

## 🎯 Objetivo

O objetivo deste projeto é democratizar o ensino do Desenho Técnico e da Geometria Descritiva, demonstrando como essas disciplinas fundamentais se conectam diretamente com a criação de espaços e produtos acessíveis para todos. O laboratório serve como um guia interativo para estudantes e profissionais, cobrindo:

- 📐 **Fundamentos do Desenho Técnico:** Instrumentos, normas e convenções.
- 🎲 **Geometria Descritiva:** Compreensão do espaço tridimensional e sua representação plana (Épura).
- 🏗️ **Desenho Projetivo:** Vistas ortográficas, cortes e leitura de projetos.
- ♿ **Acessibilidade Aplicada (NBR 9050):** Como projetar rampas, acessos e mobiliário seguindo as normas brasileiras de inclusão.

## 🚀 Funcionalidades

O projeto oferece uma série de simuladores e infográficos interativos:

- **Infográficos Dinâmicos:** Visualização interativa dos tipos de linhas (NBR 8403) e formatos de papel (NBR 16752) com gráficos comparativos.
- **Simulador de Épura:** Manipulação em tempo real de cotas e afastamentos para entender o Sistema Mongeano e os diedros.
- **Visualizador de Projeções:** Comparativo visual entre projeções Cônicas, Cilíndricas (Oblíqua e Ortogonal).
- **Calculadora de Acessibilidade:** Ferramenta prática para verificar a inclinação de rampas conforme a NBR 9050, com feedback visual imediato de aprovação/reprovação.
- **Comparativo de Perspectivas:** Gráficos radar que explicam as diferenças de distorção entre as perspectivas Isométrica, Dimétrica e Cavaleira.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido com foco em acessibilidade web e performance, utilizando tecnologias padrão e bibliotecas leves:

- **HTML5 & CSS3:** Estrutura semântica e estilização moderna.
- **[Tailwind CSS](https://tailwindcss.com/) & [Bootstrap 5](https://getbootstrap.com/):** Combinação de frameworks para layout responsivo e componentes de interface ágeis.
- **[Chart.js](https://www.chartjs.org/):** Biblioteca poderosa para a renderização de gráficos de dados (barras, linhas, radar e doughnut).
- **JavaScript (Vanilla):** Lógica de interação, manipulação do DOM e cálculos matemáticos para as simulações, sem dependência de frameworks complexos.

## 📂 Estrutura do Projeto

```bash
desenho-universal-engenharias/
├── index.html          # Menu principal e dashboard de acesso aos módulos
├── style.css           # Estilização global e customizações visuais
├── pages/              # Diretório contendo os módulos de conteúdo
│   ├── intro-desenho-tecnico.html              # Módulo 1: Fundamentos e Instrumentos
│   ├── intro-desenho-tecnico-infografico.html  # Infográfico: Normas e Linguagem Gráfica
│   ├── geometria-descritiva-basica.html        # Módulo 2: Épura e Diedros
│   ├── desenho-projetivo.html                  # Módulo 3: Vistas, Cortes e CAD
│   └── perspectiva.html                        # Módulo 4: Perspectivas e NBR 9050
└── README.md           # Documentação do projeto
```

## 🏁 Como Executar

O projeto é estático e pode ser executado facilmente em qualquer ambiente local.

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/vitorkrewer/laboratorios-virtuais-lf.git
    ```

2. **Navegue até a pasta do projeto:**

    ```bash
    cd laboratorios-virtuais-lf/desenho-universal-engenharias
    ```

3. **Execute:**
    - Abra o arquivo `index.html` diretamente em seu navegador.
    - *Recomendado:* Utilize uma extensão como "Live Server" no VS Code ou rode `python -m http.server` para evitar bloqueios de CORS em alguns navegadores (embora o projeto seja majoritariamente compatível com execução direta).

## 📚 Módulos de Aprendizagem

1. **Introdução ao Desenho Técnico:** Explore os instrumentos (esquadros, compassos) e entenda sua função prática.
2. **A Linguagem Gráfica (Infográfico):** Um mergulho visual nas normas ABNT, com gráficos interativos sobre tamanhos de papel e tipos de linhas.
3. **Geometria Descritiva:** Interaja com o "Espaço x Plano". Altere coordenadas e veja o ponto se mover na Épura instantaneamente.
4. **Desenho Projetivo:** Aprenda a criar vistas ortográficas a partir de modelos 3D sólidos e entenda a importância dos cortes.
5. **Perspectiva & Acessibilidade:** Entenda como representar o mundo em 3D e aplique esse conhecimento para projetar postos de trabalho e rampas acessíveis.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.

