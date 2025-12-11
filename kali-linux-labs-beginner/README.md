# Laboratório Virtual - Kali Linux (Iniciante)

Bem-vindo ao repositório do **Laboratório Virtual de Kali Linux**, uma interface interativa projetada para guiar iniciantes através dos fundamentos do sistema operacional favorito dos profissionais de segurança ofensiva. Este projeto faz parte da iniciativa **LearningFly**, focada em criar experiências educacionais práticas e imersivas.

[Preview do Projeto](https://learningfly.b-cdn.net/labs/kali-linux-labs-beginner/index.html)

## 🎯 Objetivo

Este projeto serve como um **hub educacional interativo**, fornecendo um caminho inicial e estruturado para que estudantes de TI e cibersegurança aprendam:

- 🛡️ **Ética Hacker:** A importância da responsabilidade e autorização no uso de ferramentas ofensivas.
- 💻 **Instalação:** Guia passo a passo para configurar o Kali Linux via WSL (Windows Subsystem for Linux) ou Bare-Metal.
- ⌨️ **Terminal:** Domínio dos comandos essenciais de navegação e controle do sistema.
- 🔬 **Laboratório Prático:** Missões simuladas cobrindo fases reais de um pentest (Reconhecimento, Análise Web, Quebra de Hashes).
- 📚 **Material de Apoio:** Acesso integrado a "Guias de Campo" (PDFs) e curadoria de videoaulas.

## 🚀 Funcionalidades

O projeto foi desenhado para oferecer uma experiência de usuário (UX) moderna e temática:

- **Design Híbrido & Responsivo:** Interface limpa e adaptável a dispositivos móveis, com tipografia otimizada (`Inter` para leitura, `Fira Code` para código).
- **Modo Claro / Escuro:** Alternância de tema com persistência local (localStorage), ideal para longas sessões de estudo.
- **Laboratório Simulado:**
  - Cards de "Missões" com explicações claras.
  - **Botões de Cópia Rápida** para facilitar a execução de comandos complexos no terminal do aluno.
- **Interatividade:**
  - Efeitos de "Typewriter" (máquina de escrever) nos textos introdutórios para imersão narrativa.
  - Animações fluidas nos modais e transições de página.
- **Guia de Campo Integrado:** Leitor de PDF embutido via modal para consulta rápida sem sair da página.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com foco em simplicidade, performance e facilidade de implantação (zero-build), utilizando tecnologias web padrão:

- **HTML5 Semântico:** Estrutura robusta e acessível.
- **[Tailwind CSS](https://tailwindcss.com/):** Utilizado via CDN para estilização rápida, sistema de grid e suporte nativo a Dark Mode.
- **[Anime.js](https://animejs.com/):** Biblioteca leve para animações de entrada de texto e modais.
- **JavaScript (Vanilla):** Lógica pura para manipulação do DOM, observers e controle de estado, sem dependência de frameworks pesados (React/Vue).

## 📂 Estrutura do Projeto

```bash
kali-linux-labs-beginner/
├── index.html      # Arquivo principal contendo a estrutura e o conteúdo textual
├── script.js       # Lógica de frontend (Dark Mode, Typewriter, Modais, Clipboard)
├── style.css       # Regras CSS específicas para animações (cursor piscando, etc.)
└── README.md       # Documentação do projeto
```

## 🏁 Como Executar

Como o projeto utiliza bibliotecas via CDN, não é necessário instalar dependências (npm, node_modules).

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/vitorkrewer/kali-linux-labs-beginner.git
    ```

2. **Navegue até a pasta do projeto:**

    ```bash
    cd kali-linux-labs-beginner
    ```

3. **Execute:**
    - Basta abrir o arquivo `index.html` diretamente em seu navegador (clique duplo).
    - *Opcional:* Para uma experiência de desenvolvimento melhor, use a extensão "Live Server" do VS Code.

## 📚 Conteúdo do Laboratório

O laboratório cobre as seguintes ferramentas e conceitos:

- **Nmap:** Escaneamento de portas e descoberta de serviços.
- **Whois & Dig:** Coleta de informações públicas (OSINT).
- **Gobuster:** Enumeração de diretórios e arquivos ocultos em servidores web.
- **Hashcat:** Técnicas de quebra de senhas e identificação de hashes.
- **Wireshark:** Noções de análise de tráfego de rede.

---


## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
