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

### 2. 🕸️ Graph & RAG Lab

**Diretório:** `graph-rag-lab`

Laboratório didático de Bancos de Dados em Grafo, Cypher e Retrieval-Augmented Generation (RAG).

- **Funcionalidades:** Grafo de conhecimento navegável, console Cypher simulado, inspeção de nós e relações, recuperação local de chunks com pontuação de relevância e geração de resposta contextual com fontes explícitas.
- **Destaque:** Explica visualmente como GraphRAG combina relações estruturadas e contexto recuperado para responder perguntas multi-hop sem depender de APIs ou chaves externas.

### 3. 🗣️ TextoLab: Fundamentos de PLN

**Diretório:** `nlp-textlab`

Laboratório híbrido para o ensino de Fundamentos de Processamento de Linguagem Natural.

- **Funcionalidades:** Oficina visual de normalização, tokenização, stop words e lematização; comparador Bag of Words e TF-IDF com n-gramas; classificador local Naive Bayes de sentimentos com métricas; painel Python equivalente com `scikit-learn`.
- **Destaque:** Conecta a experimentação imediata no navegador à implementação reproduzível em notebooks, ressaltando o efeito de cada decisão de pré-processamento sobre vetores e modelos.

### 4. ♾️ Ecossistema de Matemática

**Diretório:** `matematica`

Conjunto de livros interativos de Matemática do ensino superior, conectados por pré-requisitos e construídos sobre um motor compartilhado com as demais áreas (`shared/engine`).

- **Livros disponíveis:** **Álgebra elementar** (sinais, frações, MMC e MDC, potências e raízes, produtos notáveis e fatoração, equações do 1º e 2º grau, sistemas, proporção e porcentagem, para quem está longe da escola), **Fundamentos** (lógica, conjuntos, produto cartesiano, conjuntos numéricos, intervalos, inequações e módulo), **Funções** (conceito, transformações, afim, quadrática, composta e inversa, exponencial, logaritmo e trigonométricas) **Cálculo I** (limites, derivadas, integrais e aplicações) **Álgebra Linear** (vetores, escalonamento, matrizes, determinantes, espaços vetoriais, base e dimensão, transformações lineares, autovalores e mínimos quadrados) **Geometria Analítica** (vetores e os produtos escalar, vetorial e misto, retas, circunferência, parábola, elipse, hipérbole, retas e planos no espaço) **Probabilidade e Estatística** (estatística descritiva, contagem, probabilidade condicional e Bayes, binomial, Poisson e normal, Teorema Central do Limite, intervalos de confiança, testes de hipóteses e regressão) e **Cálculo II** (frações parciais, integrais impróprias, sequências e séries, Taylor, derivadas parciais, gradiente, máximos e mínimos com Lagrange, integrais duplas e triplas).
- **Funcionalidades:** hub com rotas por objetivo e mapa de pré-requisitos; em cada livro, diagnóstico, trilhas, teoria em Markdown com KaTeX, testes rápidos com correção imediata, progresso salvo no navegador e simuladores (balança de equações, modelo de áreas, treino infinito com correção passo a passo, transformações 2D, escalonamento com frações exatas, caçador de autovetores, retas e distâncias, cônicas, vetores em 3D, estatística descritiva, binomial com simulação, normal e Teorema Central do Limite, Bayes com falsos positivos, séries e polinômios de Taylor, superfícies com curvas de nível e gradiente, integrais duplas em colunas 3D, Venn, intervalos, inequações, transformações de gráficos, afim e quadrática, composta e inversa, limites, derivada e integral).
- **Glossário:** 216 verbetes de símbolos, termos e fórmulas (aritmética, lógica, conjuntos, funções, exponencial e logaritmo, trigonometria, cálculo, séries e várias variáveis, álgebra linear, geometria analítica, probabilidade e estatística, e alfabeto grego), cada um com como se lê (com áudio), significado, exemplo, como lembrar, erro comum e onde estudar. Tem cartões com repetição espaçada, teste e folha para imprimir. Cada capítulo dos livros mostra automaticamente os símbolos que usa.
- **Destaque:** adicionar um livro exige só conteúdo (`book.js` + arquivos `.md`), sem duplicar código. O antigo endereço `calculo-1-lab/` redireciona para `matematica/calculo-1/`.

### 5. 🔭 Ecossistema de Física

**Diretório:** `fisica`

Livros interativos de Física, no mesmo formato do ecossistema de Matemática e sobre o mesmo motor (`shared/engine`), com mapa de pré-requisitos que aponta também para os livros de Matemática de que cada assunto precisa.

- **Livros disponíveis:** **Astronomia** (esfera celeste e coordenadas, tempo sideral, estações, fases da Lua, marés e eclipses, movimento retrógrado e Copérnico, leis de Kepler, gravitação e órbitas, Sistema Solar, corpos menores e formação, luz e telescópios, distâncias e exoplanetas). **Astrofísica e Cosmologia** (o Sol, propriedades das estrelas, diagrama HR, nascimento e morte das estrelas, supernovas, estrelas de nêutrons, pulsares, magnetares, buracos negros, galáxias e matéria escura, quasares, expansão do universo, Big Bang e energia escura). Planejados: Mecânica, Oscilações e ondas, Termodinâmica, Eletromagnetismo, Óptica e Física moderna.
- **Simuladores:** planetário com cerca de 5 000 estrelas reais (catálogo Hipparcos, via projeto d3-celestial, licença BSD), as 88 constelações e Sol, Lua e planetas nas posições calculadas para qualquer data entre 1800 e 2050 e qualquer lugar; Sistema Solar animado com o movimento retrógrado visto da Terra; leis de Kepler, canhão de Newton e exoplanetas (trânsito e velocidade radial); fases da Lua e busca de eclipses reais; uma estrela percorrendo o diagrama HR até virar anã branca, estrela de nêutrons ou buraco negro; pulsar e magnetar com feixes, curva de luz e o som dos pulsos; buraco negro com a luz das estrelas e do disco de acreção traçada raio a raio na métrica de Schwarzschild; galáxia girando com e sem matéria escura; universo em expansão com diagrama de Hubble, desvio para o vermelho, linha do tempo e destino.
- **Efemérides:** `fisica/dados/astro.js` (elementos orbitais do JPL e série lunar de baixa precisão), sem dependências externas.
- **Glossário:** 88 verbetes de Astronomia, Astrofísica e Cosmologia, cada um ligado aos verbetes de Matemática que usa.

### 6. 🧪 Tabela Periódica Interativa & Construtor Atômico

**Diretório:** `tabela-periodica-interativa`

Ferramenta visual para o ensino de Química.

- **Funcionalidades:** Tabela periódica completa e clicável com detalhes dos elementos.
- **Destaque:** **Construtor de Átomos** onde alunos podem adicionar prótons/nêutrons e ver o elemento e massa resultante em tempo real.

### 7. ✒️ Gerador de Prompt para Material Didático

**Diretório:** `build-prompter-writer`

Uma ferramenta otimizada para educadores criarem prompts estruturados para IAs Generativas.

- **Funcionalidades:** Templates prontos para Apostilas, Livros Didáticos, Fichamentos e Questões de Concurso.
- **Destaque:** Interface guiada que ajuda o professor a definir público-alvo, taxonomia de Bloom e formato pedagógico antes de gerar o prompt.

### 8. 📐 Desenho Universal para Engenharias

**Diretório:** `desenho-universal-engenharias`

Um material rico e interativo sobre Desenho Técnico e Acessibilidade.

- **Funcionalidades:** Infográficos sobre instrumentos de desenho, gráficos interativos de normas ABNT (papel, linhas) e calculadora visual de inclinação de rampas (NBR 9050).
- **Destaque:** Comparativo visual dos "7 Princípios do Desenho Universal" aplicados à engenharia.

### 9. 💡 Laboratório de Design Thinking

**Diretório:** `design-thinking-build-projects`

Um guia passo a passo para desenvolver projetos seguindo a metodologia de Design Thinking.

- **Funcionalidades:** Trilho interativo passando pelas 5 fases (Empatia, Definição, Ideação, Prototipagem, Teste).
- **Destaque:** Permite exportar o projeto desenvolvido como um relatório PDF completo ao final do processo.

### 10. ⚗️ Laboratório de Química Virtual (Combinador)

**Diretório:** `build-quimical-elements`

Um ambiente gamificado para experimentação química.

- **Funcionalidades:** Workspace para arrastar e combinar elementos, sugestões de "Receitas" e visualização de resultados.

### 11. 🛡️ Laboratório Virtual - Kali Linux (Iniciante)

**Diretório:** `kali-linux-labs-beginner`

Uma interface interativa simulando o Kali Linux para ensino de cibersegurança e ética hacker.

- **Funcionalidades:** Terminal simulado (Xterm.js), missões práticas (Nmap, SQLMap), guias de instalação e vídeos integrados.
- **Destaque:** Ambiente seguro (sandbox) no navegador que recria a experiência de uso das ferramentas reais sem riscos.

### 12. 🌿 Laboratório Virtual de Git & Controle de Versão (DAG Simulator)

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
