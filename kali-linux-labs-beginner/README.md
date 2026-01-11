# Laboratório Virtual - Kali Linux (Iniciante)

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)
![Kali](https://img.shields.io/badge/Kali-268BD2?style=flat&logo=kalilinux&logoColor=white)
![Security](https://img.shields.io/badge/Security-Responsible-blue)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

Bem-vindo ao repositório do **Laboratório Virtual de Kali Linux**, uma interface interativa projetada para guiar iniciantes através dos fundamentos do sistema operacional favorito dos profissionais de segurança ofensiva. Este projeto faz parte da iniciativa **LearningFly**, focada em criar experiências educacionais práticas e imersivas.

[Preview do Projeto](https://learningfly.b-cdn.net/labs/kali-linux-labs-beginner/index.html)

## 🎯 Objetivo

Este projeto serve como um **hub educacional interativo**, fornecendo um caminho inicial e estruturado para que estudantes de TI e cibersegurança aprendam:

- 🛡️ **Ética Hacker:** A importância da responsabilidade e autorização no uso de ferramentas ofensivas.
- 💻 **Instalação:** Guia passo a passo para configurar o Kali Linux via WSL (Windows Subsystem for Linux) ou Bare-Metal.
- ⌨️ **Terminal Interativo (Xterm.js):** Um ambiente simulado que permite a execução segura de ferramentas reais em um sandbox navegador.
- 🔬 **Laboratório Prático:** Missões simuladas cobrindo fases reais de um pentest (Reconhecimento, Análise Web, Quebra de Hashes).
- 📚 **Wiki & Guia em Markdown:** Documentação viva de comandos e tutoriais passo a passo (`guide.html`, `wiki.html`).
- 🎥 **Vídeos Integrados:** Curadoria de aulas e demos práticas diretamente na interface.

## 🚀 Funcionalidades

O projeto foi desenhado para oferecer uma experiência de usuário (UX) moderna e temática "Cyber/Terminal":

- **Design Híbrido & Responsivo:** Interface limpa, com foco na estética "Kali Dark", utilizando fontes monoespaçadas (`Fira Code`) e animações de Scanline.
- **Terminal Simulado Realista:** Implementação com **Xterm.js** + `fit-addon` para criar uma experiência de linha de comando autêntica no navegador, com suporte a autocompletar e *streaming* de saída de comandos.
- **Engine de Cenários:** Sistema próprio (`lab-engine.js`) que gerencia missões interativas, validando comandos do usuário e oferecendo feedback em tempo real.
- **Wiki de Comandos:** Base de dados pesquisável (`wiki.html`) com "Copy-Paste" rápido para ferramentas essenciais.
- **Modo Claro / Escuro:** Alternância de tema com persistência local (localStorage) e detecção de preferência do sistema.
- **Sobre (Terminal Style):** Uma página de perfil interativa (`about.html`) que demonstra as capacidades do desenvolvedor e do projeto via terminal.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com foco em simplicidade, performance e facilidade de implantação, utilizando tecnologias web modernas:

- **HTML5 Semântico:** Estrutura robusta e acessível.
- **[Tailwind CSS](https://tailwindcss.com/):** Utilizado via CDN para estilização rápida, sistema de grid, tipografia e suporte nativo a Dark Mode + Cores personalizadas (Kali Blue/Green).
- **[Xterm.js](https://xtermjs.org/):** O padrão da indústria para emuladores de terminal na web.
- **[Marked.js](https://marked.js.org/):** Renderização de Markdown em tempo real para os Guias e Wiki.
- **[Anime.js](https://animejs.com/):** Biblioteca leve para animações fluidas.
- **JavaScript (ES6 Modules):** Arquitetura modular (`lab-engine.js`, `virtual-os.js`, `scenarios/`) para fácil manutenção e expansão de novos laboratórios.

## 📂 Estrutura do Projeto

```bash
kali-linux-labs-beginner/
├── index.html          # Landing Page
├── assets/
│   ├── js/
│   │   ├── lab-engine.js   # Core da simulação
│   │   ├── virtual-os.js   # Sistema de Arquivos Virtual e processador de comandos
│   │   └── scenarios/      # Definição das missões (Nmap, SQLMap, etc.)
│   ├── css/
│   └── img/
├── pages/
│   ├── labs.html      # Galeria de Missões (Nmap, Metasploit, etc.)
│   ├── terminal.html  # Interface principal do Terminal Simulado
│   ├── wiki.html      # Base de Conhecimento de Comandos
│   ├── guide.html     # Leitor de Markdown para tutoriais longos
│   ├── video.html     # Player de vídeo integrado com playlist
│   ├── install.html   # Guia de Instalação do Kali
│   └── about.html     # Perfil do Desenvolvedor (Terminal Style)
├── guide/             # Arquivos Markdown de conteúdo
└── README.md          # Documentação do projeto
```

## 🏁 Como Executar

O projeto é "Zero-Build" para execução local simples, mas estruturado como uma aplicação moderna.

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/vitorkrewer/kali-linux-labs-beginner.git
    ```

2. **Navegue até a pasta:**

    ```bash
    cd kali-linux-labs-beginner
    ```

3. **Execute:**
    - Como o projeto usa ES6 Modules, você precisa de um servidor local simples para evitar erros de CORS ao carregar os módulos JS.
    - **Python 3:** `python -m http.server`
    - **Node/NPM:** `npx serve` ou `live-server`
    - Abra `http://localhost:8000` no seu navegador.

## 📚 Conteúdo do Laboratório

O laboratório cobre as seguintes ferramentas e conceitos através de cenários interativos:

- **Nmap:** Escaneamento de portas, detecção de OS e scripts NSE.
- **SQLMap:** Automação de detecção e exploração de falhas SQL Injection.
- **Metasploit (msfconsole):** Uso básico do framework de exploração.
- **Hydra:** Ataques de força bruta contra serviços (SSH/FTP).
- **Burp Suite:** Introdução à interceptação e modificação de requisições HTTP.
- **Naabu / Nuclei / DNSX / Maltego:** Ferramentas modernas de reconhecimento e scans de vulnerabilidade.
- **Playground Livre:** Um ambiente seguro para testar comandos Linux básicos (`ls`, `cd`, `cat`, `grep`, etc.).

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.
Para qualquer uso comercial, entre em contato diretamente.

---

*Desenvolvido com muito ☕ e dedicação por Vitor Krewer*
