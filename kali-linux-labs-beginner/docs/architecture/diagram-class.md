# Diagrama de Classes

O diagrama abaixo apresenta a estrutura orientada a objetos (e estruturas de dados) utilizada no frontend da aplicação **Kali Linux Labs Beginner**.

```mermaid
classDiagram
    %% Core Engines
    class LabEngine {
        -Terminal term
        -Object fitAddon
        -Object currentScenario
        -Integer currentStep
        -String commandBuffer
        -Array history
        -VirtualOS os
        -Object ui
        +init()
        +updateUI()
        +initTerminal()
        +handleInput(String e)
        +processCommand()
        -promptUser()
        -runSuccessSimulation()
        -runSimulationOutput(String output)
        -bindEvents()
    }

    class VirtualOS {
        +String user
        +String hostname
        +String cwd
        +Object fs
        +Object files
        +process(String command) : String
        -cmdLs(Array args)
        -cmdCd(Array args)
        -cmdCat(Array args)
        -resolvePath(String path)
        -toolNmap(Array args)
        -toolSqlmap(Array args)
        %% Outras ferramentas omitidas para brevidade
    }

    %% Data Structures (Interfaces conceituais)
    class Scenario {
        +String id
        +String title
        +String intro
        +List~ScenarioStep~ steps
    }

    class ScenarioStep {
        +Integer step
        +String instruction
        +String command
        +String hint
        +String output
    }

    class FileSystemNode {
        +String type
        +List~String~ children
    }

    class Guide {
        +String id
        +String title
        +String file
        +String category
    }

    class Video {
        +String id
        +String title
        +String description
        +List~String~ tags
        +String guideId
    }

    %% Relationships
    LabEngine "1" -- "1" VirtualOS : Instancia/Usa
    LabEngine "1" -- "0..1" Scenario : Carrega
    Scenario "1" *-- "1..*" ScenarioStep : Contém
    VirtualOS "1" *-- "*" FileSystemNode : Gerencia (via fs object)

    %% External libraries handling
    LabEngine ..> XtermJS : Renderiza em
    
    note for LabEngine "Controlador Principal. Gerencia o fluxo da missão e interage com o DOM."
    note for VirtualOS "Emulador de Sistema Operacional. Processa comandos no modo livre (Playground)."
```

## Dicionário de Classes

### 1. Classes Principais

- **`LabEngine`**: A classe controladora central (`assets/js/lab-engine.js`). É responsável por inicializar o terminal, carregar o cenário selecionado via URL, capturar o input do usuário e decidir se deve validar contra o cenário guiado ou passar para o `VirtualOS`.
- **`VirtualOS`**: A classe de emulação (`assets/js/virtual-os.js`). Mantém o estado do sistema virtual (diretório atual, sistema de arquivos em memória) e contém a lógica para "falsificar" os comandos Linux (`ls`, `cd`, `cat`) e ferramentas de segurança (`nmap`, `sqlmap`) quando o usuário está no modo livre.

### 2. Estruturas de Dados

- **`Scenario`**: Define o contrato dos objetos exportados em `assets/js/scenarios/*.js`. Representa uma missão completa.
- **`ScenarioStep`**: Representa um passo individual de uma missão, contendo a instrução para o usuário, o comando exato esperado e a saída de terminal simulada.
- **`FileSystemNode`**: Estrutura JSON interna do `VirtualOS` que representa diretórios e arquivos.
- **`Guide` & `Video`**: Objetos de dados planos definidos em `guides.js` e `videos.js` para popular as páginas de documentação e mídia.
