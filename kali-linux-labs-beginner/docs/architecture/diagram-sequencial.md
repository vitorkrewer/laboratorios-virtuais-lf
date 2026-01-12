# Diagrama de Sequência

Este documento detalha o fluxo de execução para a validação de comandos dentro do Laboratório Virtual, ilustrando a interação entre o Usuário, o Terminal UI (Xterm.js), a Engine de Controle e os Dados do Cenário.

## Fluxo: Execução de Comando em Missão Guiada

O diagrama abaixo descreve o processo passo-a-passo desde que o usuário digita um comando até receber o feedback de sucesso ou erro.

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuário
    participant Term as Terminal UI<br/>(Xterm.js)
    participant Engine as LabEngine<br/>(Main Controller)
    participant Scenario as Dados do Cenário<br/>(JSON/JS)
    participant OS as VirtualOS<br/>(Playground Mode)

    Note over User, Term: O usuário está na tela "Missão Nmap"<br/>Passo Atual: "Execute nmap -sS target"

    User->>Term: Digita caracteres (ex: "nmap...")
    loop Key Press Processing
        Term->>Engine: handleInput(char)
        Engine-->>Term: write(char) (Echo)
        Engine->>Engine: Atualiza commandBuffer
    end

    User->>Term: Pressiona [ENTER]
    Term->>Engine: handleInput(\r)
    Engine->>Engine: processCommand()

    alt Modo Playground (Livre)
        Engine->>OS: process(commandBuffer)
        activate OS
        OS->>OS: Parse e identifica ferramenta/comando
        formatted_output->>OS: Executa lógica interna (fs, tools)
        OS-->>Engine: Retorna String de Output
        deactivate OS
        Engine->>Term: runSimulationOutput(output)

    else Modo Missão (Guiado)
        Engine->>Scenario: Ler 'steps[currentStep].command'
        activate Scenario
        Scenario-->>Engine: Retorna comando esperado
        deactivate Scenario

        alt Comando Correto
            Engine->>Scenario: Ler 'steps[currentStep].output'
            activate Scenario
            Scenario-->>Engine: Retorna output simulado
            deactivate Scenario
            
            loop Streaming de Output
                Engine->>Term: writeln(line) con delay
            end
            
            Engine->>Engine: showSuccessFeedback()
            Engine-->>User: Atualiza Sidebar (Botão "Próximo")
        
        else Comando Incorreto
            Engine->>Term: writeln("zsh: command not found...")
            Engine->>Term: writeln("Hint: ...")
        end
    end

    Engine->>Term: promptUser()
    Term-->>User: Exibe novo prompt "root@kali:~#"
```

## Descrição dos Participantes

1. **Terminal UI (Xterm.js)**: Interface visual bruta. Captura eventos de teclado e renderiza texto, mas não possui "inteligência" sobre o que está sendo digitado.
2. **LabEngine**: O cérebro da aplicação. Mantém o estado da aplicação (`buffer`, `currentStep`, `history`). Decide se deve validar contra um roteiro (Missão) ou delegar para execução livre (Playground).
3. **VirtualOS**: Usado principalmente no modo Playground, atua como um sistema operacional simulado, analisando inputs e retornando respostas falsas, mas realistas.
4. **Dados do Cenário**: Arquivos estáticos `.js` que contêm a "gabarito" da missão (comando esperado) e o resultado que deve ser exibido (output esperado).
