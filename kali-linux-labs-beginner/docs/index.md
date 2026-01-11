# Documentação do Laboratório Virtual Kali Linux

Bem-vindo à documentação oficial do projeto **Kali Linux Labs Beginner**. Este projeto é uma plataforma educacional interativa baseada em navegador, projetada para ensinar fundamentos de cibersegurança e operação do sistema Kali Linux sem a necessidade de máquinas virtuais pesadas ou instalações complexas.

## Visão Geral

O sistema opera 100% no lado do cliente (Client-Side), utilizando tecnologias web modernas para simular um ambiente de terminal Linux completo e cenários de pentest guiados.

## Estrutura da Documentação

Esta documentação está dividida nas seguintes seções:

### 🏗️ [Arquitetura](architecture.md)

Entenda como o sistema foi projetado, o fluxo de dados entre os componentes e diagramas de sequência detalhando a interação entre a Interface do Usuário, a Engine de Laboratório e o Sistema Operacional Virtual.

### ⚙️ [Lógica e "Backend"](backend.md)

Mergulhe nos detalhes técnicos dos módulos JavaScript que impulsionam a simulação. Descubra como o `LabEngine` gerencia estados, como o `VirtualOS` processa comandos e como novos cenários são injetados dinamicamente.

### 🚀 [Funcionalidades](features.md)

Uma lista exaustiva de todas as capacidades do sistema, desde as ferramentas simuladas (Nmap, SQLMap, etc.) até recursos de interface como o Terminal Xterm.js customizado e o sistema de Wiki.

---

## Início Rápido

Para entender o código fonte, comece pelo `index.html` (entry point) e siga para `assets/js/lab-engine.js`, que é o coração da aplicação.

*Documentação gerada para a versão 2.0.0.*
