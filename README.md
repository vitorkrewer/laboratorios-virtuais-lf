# Laboratórios Virtuais - Learning Fly 🚀

Este repositório reúne uma coleção de **Laboratórios Virtuais** e ferramentas interativas desenvolvidas para apoiar o ensino e aprendizagem em diversas áreas, como Engenharia, Química, Tecnologia e Design.

Cada projeto é independente e utiliza tecnologias web modernas para oferecer experiências imersivas diretamente no navegador.

---

## 🌐 Portal Central (GitHub Pages)

O repositório conta com um **Portal Institucional / Hub de Navegação** hospedado na raiz (`/index.html`), permitindo navegar entre todos os laboratórios com busca em tempo real e filtros por área de conhecimento.

- **URL de Produção:** `https://vitorkrewer.github.io/laboratorios-virtuais-lf/`
- **Execução Local:** Basta abrir o arquivo `index.html` da raiz no navegador ou rodar um servidor HTTP local.

---

## 📚 Projetos e Funcionalidades

### 1. 🗄️ SQL Playground Pro

**Diretório:** `sql-playground`

Um laboratório interativo avançado para prática de Banco de Dados Relacional e comandos SQL.

- **Funcionalidades:** Execução em tempo real via WebAssembly com suporte a 5 dialetos relacionais (**SQLite, MySQL, PostgreSQL, Microsoft SQL Server e Oracle Database**), pontos de restauração no tempo (**Time-Travel Snapshots**), datasets pré-carregados (E-Commerce, Universidade, RH), visualizador de plano de execução (**EXPLAIN Query Plan**), formatador de código, histórico de queries e trilha de desafios práticos com validação.
- **Destaque:** Permite aos estudantes testar qualquer comando DDL e DML (como `DROP TABLE` e `DELETE`) com total segurança, revertendo o estado do banco instantaneamente com 1 clique.

### 2. 🧪 Tabela Periódica Interativa & Construtor Atômico

**Diretório:** `tabela-periodica-interativa`

Ferramenta visual para o ensino de Química.

- **Funcionalidades:** Tabela periódica completa e clicável com detalhes dos elementos.
- **Destaque:** **Construtor de Átomos** onde alunos podem adicionar prótons/nêutrons e ver o elemento e massa resultante em tempo real.

### 3. ✒️ Gerador de Prompt para Material Didático

**Diretório:** `build-prompter-writer`

Uma ferramenta otimizada para educadores criarem prompts estruturados para IAs Generativas.

- **Funcionalidades:** Templates prontos para Apostilas, Livros Didáticos, Fichamentos e Questões de Concurso.
- **Destaque:** Interface guiada que ajuda o professor a definir público-alvo, taxonomia de Bloom e formato pedagógico antes de gerar o prompt.

### 4. 📐 Desenho Universal para Engenharias

**Diretório:** `desenho-universal-engenharias`

Um material rico e interativo sobre Desenho Técnico e Acessibilidade.

- **Funcionalidades:** Infográficos sobre instrumentos de desenho, gráficos interativos de normas ABNT (papel, linhas) e calculadora visual de inclinação de rampas (NBR 9050).
- **Destaque:** Comparativo visual dos "7 Princípios do Desenho Universal" aplicados à engenharia.

### 5. 💡 Laboratório de Design Thinking

**Diretório:** `design-thinking-build-projects`

Um guia passo a passo para desenvolver projetos seguindo a metodologia de Design Thinking.

- **Funcionalidades:** Trilho interativo passando pelas 5 fases (Empatia, Definição, Ideação, Prototipagem, Teste).
- **Destaque:** Permite exportar o projeto desenvolvido como um relatório PDF completo ao final do processo.

### 6. ⚗️ Laboratório de Química Virtual (Combinador)

**Diretório:** `build-quimical-elements`

Um ambiente gamificado para experimentação química.

- **Funcionalidades:** Workspace para arrastar e combinar elementos, sugestões de "Receitas" e visualização de resultados.

### 7. 🛡️ Laboratório Virtual - Kali Linux (Iniciante)

**Diretório:** `kali-linux-labs-beginner`

Uma interface interativa simulando o Kali Linux para ensino de cibersegurança e ética hacker.

- **Funcionalidades:** Terminal simulado (Xterm.js), missões práticas (Nmap, SQLMap), guias de instalação e vídeos integrados.
- **Destaque:** Ambiente seguro (sandbox) no navegador que recria a experiência de uso das ferramentas reais sem riscos.

### 8. 🌿 Laboratório Virtual de Git & Controle de Versão (DAG Simulator)

**Diretório:** `git-labs-simulator`

Simulador visual avançado de Git desenvolvido para estudantes de graduação em Computação e Engenharia de Software.

- **Funcionalidades:** Grafo Direcionado Acíclico (DAG) renderizado dinamicamente em SVG com nós de commits, ramificações (branches), merge commits de múltiplos pais, visualização das 4 áreas (Working Directory, Staging, Local Repo e Remote), terminal CLI interativo e 8 missões práticas guiadas com validação automática.
- **Destaque:** Permite aos alunos visualizar instantaneamente o impacto de cada comando no grafo de versionamento e entender a fundo o modelo de ponteiros e snapshots do Git.

---

## 🛠️ Tecnologias Utilizadas

Os laboratórios foram construídos com foco em performance e usabilidade, utilizando principalmente HTML5, CSS3 e JavaScript Moderno (ES6+), além de bibliotecas específicas:

- **Estilização:** TailwindCSS, Bootstrap 5, CSS Modules.
- **Interatividade:** Anime.js (animações), Chart.js (gráficos), SQL.js (banco de dados WASM).
- **Utilitários:** jsPDF e html2canvas (geração de relatórios), FontAwesome e Bootstrap Icons.

## 🚀 Como Executar

A maioria dos projetos é estática e pode ser executada simplesmente abrindo o arquivo `index.html` em seu navegador.

Para projetos que utilizam ES Modules (como o **SQL Playground** e o **Kali Linux Labs**), é recomendável usar um servidor local simples para evitar bloqueios de CORS:

```bash
# Exemplo com Python
python -m http.server

# Exemplo com Node/NPM (http-server)
npx http-server .
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar os laboratórios existentes ou propor novos.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  

Para qualquer uso comercial, entre em contato diretamente.
