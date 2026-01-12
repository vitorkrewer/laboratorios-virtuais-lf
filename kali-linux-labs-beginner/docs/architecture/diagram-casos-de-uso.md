# Diagrama de Casos de Uso

Este documento apresenta o **Diagrama de Casos de Uso** do projeto Kali Linux Labs Beginner, ilustrando as principais interações do usuário com o sistema, divididas entre navegação, aprendizado teórico e a engine de simulação prática.

```plantuml
@startuml
left to right direction

actor "Aluno / Usuário" as User

package "Navegação e Configuração" {
  (Acessar Landing Page) as UC_Nav_Index
  (Alternar Tema Dark-Light) as UC_Nav_Theme
  (Visualizar About Interativo) as UC_Nav_About

  User --> UC_Nav_Index
  User --> UC_Nav_Theme
  User --> UC_Nav_About
}

package "Conteúdo Educacional Estático" {
  (Consultar Guia de Instalação) as UC_Edu_Install
  (Pesquisar na Wiki de Comandos) as UC_Edu_Wiki
  (Navegar por Tutoriais Markdown) as UC_Edu_Guide
  (Assistir Vídeos Demonstrativos) as UC_Edu_Video

  User --> UC_Edu_Install
  User --> UC_Edu_Wiki
  User --> UC_Edu_Guide
  User --> UC_Edu_Video
}

package "Simulação e Laboratório Prático" {
  (Selecionar Cenário) as UC_Sim_Select
  (Interagir com Terminal) as UC_Sim_Terminal
  (Executar Comandos) as UC_Sim_Cmd
  (Receber Feedback de Validação) as UC_Sim_Feedback
  (Visualizar Dicas) as UC_Sim_Hint
  (Concluir Etapas da Missão) as UC_Sim_Complete
  (Reiniciar Cenário) as UC_Sim_Reset

  User --> UC_Sim_Select
  User --> UC_Sim_Terminal
  User --> UC_Sim_Reset

  UC_Sim_Select --> UC_Sim_Terminal : <<include>>
  UC_Sim_Terminal --> UC_Sim_Cmd : <<include>>
  UC_Sim_Cmd --> UC_Sim_Feedback : <<include>>
  UC_Sim_Feedback --> UC_Sim_Complete : <<extend>>
  UC_Sim_Cmd --> UC_Sim_Hint : <<extend>>
}

@enduml
```

## Descrição dos Atores e Casos de Uso

### Atores

- **Aluno / Usuário**: O indivíduo que acessa a plataforma para aprender sobre Kali Linux e segurança ofensiva. Não requer login ou autenticação (sistema stateless no frontend).

### Pacotes de Funcionalidades

#### 1. Navegação e Configuração

Funcionalidades transversais disponíveis em todas as páginas.

- **Alternar Tema**: O usuário pode escolher entre modo claro e escuro, persistindo a escolha localmente.
- **Visualizar 'About'**: Acesso a uma página de perfil estilizada como terminal.

#### 2. Conteúdo Educacional Estático

Recursos passivos de aprendizado.

- **Wiki de Comandos**: Busca rápida por sintaxe de ferramentas.
- **Guias e Vídeos**: Consumo de material teórico para apoio aos laboratórios.

#### 3. Simulação e Laboratório Prático

O núcleo da aplicação (Engine).

- **Interagir com Terminal**: O usuário digita em uma interface que emula um shell Linux (zsh/bash).
- **Executar Comandos**: O sistema interpreta inputs específicos (ex: `nmap -sS target`) usando o `virtual-os.js`.
- **Receber Feedback**: O `lab-engine.js` verifica se o comando corresponde ao passo atual da missão e retorna sucesso ou erro simulado.
