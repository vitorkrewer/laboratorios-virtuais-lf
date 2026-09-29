# Laboratório Virtual de Git & Controle de Versão 🚀

![Status](https://img.shields.io/badge/status-active-success.svg)
![Target](https://img.shields.io/badge/graduação-Engenharia_&_TI-blue)
![Git Engine](https://img.shields.io/badge/git-DAG_Simulator-orange)

O **Laboratório Virtual de Git & Controle de Versão** é uma plataforma interativa de aprendizagem projetada especialmente para estudantes de graduação em Ciência da Computação, Engenharia de Software e cursos de Tecnologia.

A ferramenta combina um **Terminal CLI simulado**, um **Visualizador de Grafo Direcionado Acíclico (DAG)** em tempo real, um **Diagrama das 4 Áreas do Git** e um **Sistema de 8 Missões Guiadas**.

[🔗 Acessar Laboratório Online](https://vitorkrewer.github.io/laboratorios-virtuais-lf/git-labs-simulator/)

---

## 🎯 Por que um Laboratório Visual de Git?

O Git é uma das ferramentas mais essenciais e, ao mesmo tempo, uma das maiores fontes de confusão para estudantes de computação. A dificuldade reside no modelo mental abstrato de ponteiros e grafos.

Este laboratório resolve essa barreira pedagógica tornando **visível e imediato** o efeito de cada comando executado.

---

## 🚀 Funcionalidades Principais

### 1. 🌐 Grafo de Commits Interativo (DAG Viewport)
- Renderização visual imediata de nós de commits em SVG com curvas Bezier.
- Marcadores dinâmicos de branches (`main`, `feature`, `HEAD`), tags e status de detached HEAD.
- Suporte visual a **Commits de Mesclagem (Merge Commits)** com dois nós pais interligados.
- Clique em qualquer commit do grafo para abrir o **Modal de Inspeção** (SHA-1, Mensagem, Autor, Data e Árvore de Arquivos).

### 2. 🏗️ Arquitetura das 4 Áreas do Git
Acompanhamento em tempo real da transição de arquivos entre:
1. **Working Directory:** Arquivos modificados localmente ou não rastreados (*Untracked*).
2. **Staging Area (Index):** Arquivos preparados com `git add` para o próximo snapshot.
3. **Local Repository:** Histórico de commits no HEAD local.
4. **Remote Repository (origin):** Repositório remoto simulado (GitHub).

### 3. 💻 Terminal CLI Realista no Navegador
- Suporte a comandos Git autênticos (`init`, `status`, `add`, `commit`, `branch`, `checkout`, `switch`, `merge`, `log`, `diff`, `stash`, `reset`, `remote`, `push`, `pull`, `tag`).
- Utilitários Unix inclusos (`touch`, `echo`, `cat`, `rm`, `ls`, `clear`, `help`).
- Histórico de comandos (navegação por setas `↑` e `↓`) e autocompletar com a tecla `Tab`.
- Botões de atalho rápido para comandos frequentes.

### 4. 🎓 8 Missões Práticas Guiadas com Validação Automática
1. **Missão 1:** *Inicialização & Primeiro Commit* (`git init`, `add`, `commit`).
2. **Missão 2:** *Ramificação (Branches) & Paralelismo* (`git checkout -b feature`, criação de arquivos e commit).
3. **Missão 3:** *Integração Fast-Forward (Merge)* (Mesclagem linear sem conflitos).
4. **Missão 4:** *3-Way Merge (Branches Divergentes)* (Mesclagem com commit de 2 pais).
5. **Missão 5:** *Guardando Trabalho com Git Stash* (Uso de `git stash` e `git stash pop`).
6. **Missão 6:** *Voltando no Tempo com Git Reset* (`git reset --soft/mixed/hard`).
7. **Missão 7:** *Criando Marcos com Git Tag* (Versionamento com `git tag v1.0.0`).
8. **Missão 8:** *Conexão Remota & Git Push* (`git remote add origin`, `git push origin main`).

### 5. � Biblioteca de Padrões & Conventional Commits (Módulo Educacional)
O laboratório ensina ativamente as convenções e boas práticas adotadas pela indústria global de software:
- **Dicionário Completo de Tipos:**
  - `feat:` Novas funcionalidades (*SemVer MINOR*).
  - `fix:` Correção de bugs (*SemVer PATCH*).
  - `docs:` Alterações puramente em documentação.
  - `style:` Formatação de código e linters (sem alterar lógica e sem relação com CSS).
  - `refactor:` Refatoração estrutural sem alterar comportamento externo.
  - `perf:` Otimizações de desempenho e memória (*SemVer PATCH*).
  - `test:` Criação ou manutenção de testes automatizados.
  - `chore:` Tarefas rotineiras, ferramentas auxiliares e dependências.
  - `build:` Build system, bundlers e gerenciadores de pacotes (npm, Vite, Maven).
  - `ci:` Pipelines de integração contínua (GitHub Actions, GitLab CI).
  - `revert:` Reversão de commits anteriores.
  - `BREAKING CHANGE:` ou `!` Quebras de compatibilidade retroativa (*SemVer MAJOR*).
- **Construtor Interativo de Commits:** Interface guiada para montar a mensagem com tipo, escopo, descrição e quebra de compatibilidade.
- **Commit Linter em Tempo Real:** Validador ao vivo que confere se o cabeçalho usa o imperativo, inicia em minúscula, não possui ponto final e respeita o limite de 72 caracteres.
- **Dicas Inteligentes no Terminal:** Quando um aluno executa um commit sem padrão semântico, o terminal exibe orientações construtivas para aprimorar sua escrita.

### 6. �📁 Explorador de Arquivos Virtuais & Live Diff
- Lista de arquivos no diretório de trabalho com status (*Untracked*, *Modified*, *Staged*).
- Edição de arquivos in-place e visualizador de diferenças no estilo `git diff` com linhas coloridas.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & SVG:** Estruturação semântica e renderização gráfica vetorial de alta precisão.
- **TailwindCSS (via CDN):** Estilização moderna e responsiva com tema escuro.
- **JavaScript (Vanilla ES6+):** Motor simulador de repositório Git com sistema de arquivos em memória.
- **Fontes & Ícones:** Fira Code, Plus Jakarta Sans, Outfit e Font Awesome 6.

---

## 🏁 Como Executar Localmente

Como toda a plataforma é 100% client-side:

1. Clone o repositório principal:
   ```bash
   git clone https://github.com/vitorkrewer/laboratorios-virtuais-lf.git
   ```
2. Navegue até a pasta do laboratório:
   ```bash
   cd laboratorios-virtuais-lf/git-labs-simulator
   ```
3. Abra o arquivo `index.html` diretamente no seu navegador.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
