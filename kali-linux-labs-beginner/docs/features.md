# Funcionalidades do Projeto

Este documento lista as principais funcionalidades implementadas na versão 2.0.0 do **Kali Linux Labs Beginner**.

## 🖥️ Interface e Experiência do Usuário (UI/UX)

- **Estética Cyber/Terminal:** Design inspirado no tema "Kali Dark" e interfaces de comando modernas.
- **Terminal Xterm.js:** Emulação fiel de terminal com:
  - Cursor piscante.
  - Suporte a cores ANSI.
  - Autoscroll e redimensionamento (`fit-addon`).
- **Animações Imersivas:**
  - Efeito *Scanline* sobrepondo a tela.
  - Efeito *Typewriter* na abertura das missões.
- **Dark Mode Nativo:** Suporte a temas claro/escuro com detecção automática e toggle manual persistente.

## 🎓 Educacional e Conteúdo

- **Missões Guiadas:** Sistema passo-a-passo que não permite o usuário avançar sem completar o objetivo atual, garantindo aprendizado.
- **Wiki Integrada:** Página dedicada com documentação rápida de comandos e ferramentas, servindo como uma "Cheatsheet" interativa.
- **Guia de Campo:** Visualizador de Markdown integrado para leitura de material teórico aprofundado sem sair do laboratório.
- **Video Player:** Área dedicada para visualização de tutoriais em vídeo relacionados às missões.

## 🛠️ Ferramentas Simuladas

O laboratório simula a **saída (output)** e comportamento das seguintes ferramentas de segurança, permitindo o uso de flags e argumentos comuns:

| Ferramenta | Categoria | Funcionalidade Simulada |
| :--- | :--- | :--- |
| **Nmap** | Reconhecimento de Rede | Scan de portas, detecção de versões (`-sV`), detecção de OS (`-O`). |
| **SQLMap** | Web Hacking | Detecção de vuln SQLi (`-u`), enumeração de bancos (`--dbs`), dump de dados (`--dump`). |
| **Metasploit** | Exploração | Console interativo (`msfconsole`), busca (`search`), seleção (`use`) e execução (`exploit`). |
| **Hydra** | Quebra de Senhas | Ataque de dicionário simulado contra FTP e SSH. |
| **Burp Suite** | Web Proxy | Simulação conceitual de interceptação (via narrativa). |


## ⚙️ Sistema Operacional Virtual (VirtualOS)

Um mini-kernel escrito em JavaScript que provê:

- **Sistema de Arquivos:** Navegação real com `cd`, listagem com `ls`, criação de pastas com `mkdir`.
- **Permissões:** Simulação de usuário `root` vs `guest` e prompt colorido correspondente.
- **Comandos Utilitários:** `cat`, `echo`, `pwd`, `clear`, `history`, `help`.
- **Tratamento de Erros:** Mensagens de erro realistas (ex: "command not found", "no such file or directory").

## 🛡️ Segurança e Privacidade

- **Execução Sandbox:** Todo o código roda no navegador do cliente. Nenhum comando é enviado para um servidor real, tornando impossível causar danos à máquina do usuário ou a terceiros.
- **Zero Tracking:** O projeto não utiliza cookies de rastreamento ou analytics invasivos.

