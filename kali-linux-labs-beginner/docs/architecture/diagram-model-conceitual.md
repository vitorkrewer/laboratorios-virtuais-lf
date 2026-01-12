# Diagrama Conceitual da Arquitetura

Este documento detalha a arquitetura conceitual e o fluxo de dados do projeto **Kali Linux Labs Beginner**. O diagrama abaixo ilustra como as camadas de Interface, Lógica Core e Dados interagem para prover a experiência de simulação.

```mermaid
graph TB
    %% Definição de Estilos
    classDef html fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef core fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef data fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef lib fill:#f3e5f5,stroke:#4a148c,stroke-width:1px,stroke-dasharray: 5 5;
    classDef actor fill:#fafafa,stroke:#333,stroke-width:2px;

    User((Usuário)):::actor

    subgraph InterfaceLayer ["Camada de Interface (Frontend)"]
        direction TB
        Index["index.html<br/>(Landing Page)"]:::html
        Labs["pages/labs.html<br/>(Seleção de Missões)"]:::html
        TerminalPage["pages/terminal.html<br/>(Ambiente de Simulação)"]:::html
        GuidePage["pages/guide.html<br/>(Leitor de Documentação)"]:::html
        WikiPage["pages/wiki.html<br/>(Base de Conhecimento)"]:::html
        VideoPage["pages/video.html<br/>(Player de Vídeo)"]:::html
    end

    subgraph CoreLogicLayer ["Camada de Lógica Core (JavaScript)"]
        ScriptJS["assets/js/script.js<br/>(UI Controller Global)"]:::core
        
        subgraph SimulationEngine ["Engine de Simulação"]
            LabEngine["assets/js/lab-engine.js<br/>(Gerenciador de Cenários)"]:::core
            VirtualOS["assets/js/virtual-os.js<br/>(Emulador de SO & FS)"]:::core
        end

        subgraph ContentManagers ["Gerenciadores de Conteúdo"]
            GuideMgr["assets/js/guides.js"]:::core
            VideoMgr["assets/js/videos.js"]:::core
        end
    end

    subgraph DataLayer ["Camada de Dados & Conteúdo"]
        subgraph Scenarios ["Módulos de Cenário (Missões)"]
            NmapSc["scenarios/nmap.js"]:::data
            SqlSc["scenarios/sqlmap.js"]:::data
            OtherSc["scenarios/*.js"]:::data
        end
        
        subgraph StaticResources ["Recursos Estáticos"]
            WikiData["assets/js/wiki/data.js"]:::data
            MDContent["guide/*.md<br/>(Conteúdo Markdown)"]:::data
        end
    end

    subgraph ExternalLibs ["Bibliotecas Externas"]
        XtermLib["Xterm.js<br/>(Terminal UI)"]:::lib
        MarkedLib["Marked.js<br/>(Markdown Parser)"]:::lib
        AnimeLib["Anime.js<br/>(Animações)"]:::lib
    end

    %% Fluxo de Navegação do Usuário
    User --> Index
    Index --> Labs
    Labs --> TerminalPage
    Labs --> GuidePage
    Labs --> VideoPage
    Labs --> WikiPage

    %% Lógica da Página de Terminal
    TerminalPage --"Inicializa"--> LabEngine
    TerminalPage --"Inicializa"--> VirtualOS
    TerminalPage --"Renderiza"--> XtermLib

    %% Interação Engine <-> OS
    LabEngine --"Configura Missão"--> Scenarios
    LabEngine --"Valida Comandos"--> VirtualOS
    LabEngine --"Atualiza UI"--> TerminalPage

    %% Interação OS <-> Terminal
    VirtualOS --"Captura Input"--> XtermLib
    VirtualOS --"Processa Comando"--> Scenarios
    VirtualOS --"Envia Output"--> XtermLib

    %% Fluxo de Dependência de Cenários
    Scenarios --"Define Regras"--> LabEngine

    %% Fluxo de Guias e Documentação
    GuidePage --"Usa"--> GuideMgr
    GuideMgr --"Busca (fetch)"--> MDContent
    GuideMgr --"Renderiza com"--> MarkedLib

    %% Fluxo da Wiki
    WikiPage --"Carrega Dados"--> WikiData
    WikiPage --"Interações UI"--> ScriptJS

    %% Fluxo de Vídeos
    VideoPage --"Gerencia Playlist"--> VideoMgr
```

## Descrição dos Componentes

### 1. Camada de Interface

Responsável pela apresentação e layouts do sistema.

- **index.html**: Ponto de entrada.
- **pages/terminal.html**: O coração do projeto. Contém o container onde o `Xterm.js` é renderizado.

### 2. Camada de Lógica Core

- **VirtualOS (`virtual-os.js`)**: Simula um sistema de arquivos Linux e processa comandos básicos (`ls`, `cd`, `cat`, etc.) inteiramente no navegador, sem backend real.
- **LabEngine (`lab-engine.js`)**: Atua como o "Game Master". Ele carrega o cenário escolhido, monitora o progresso do usuário passo-a-passo e fornece feedback/dicas.
- **Content Managers**: Scripts especializados para carregar e formatar conteúdo dinâmico (Markdown, Vídeos).

### 3. Camada de Dados

- **Cenários (`scenarios/*.js`)**: Cada arquivo exporta um objeto contendo os passos da missão, comandos esperados e validações específicas (regex ou strings exatas).
- **Guias (`guide/*.md`)**: Arquivos de texto puro contendo a teoria e tutoriais, renderizados dinamicamente nas páginas.
