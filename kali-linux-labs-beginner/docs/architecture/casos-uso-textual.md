# Especificação Textual de Casos de Uso

Este documento detalha os Casos de Uso do sistema **Kali Linux Labs Beginner**, seguindo o padrão formal para documentação de software em trabalhos acadêmicos (TCC).

---

## Índice de Casos de Uso

| ID | Nome do Caso de Uso | Prioridade |
| :--- | :--- | :--- |
| **UC01** | Selecionar Cenário Prático | Alta |
| **UC02** | Realizar Missão no Terminal Simulado | Alta |
| **UC03** | Consultar Base de Conhecimento (Wiki) | Média |
| **UC04** | Acessar Guia de Estudo (Teoria) | Média |
| **UC05** | Configurar Ambiente (Tema) | Baixa |

---

## Detalhamento dos Casos de Uso

### UC01: Selecionar Cenário Prático

**Descrição Suvariada**: Permite ao usuário escolher qual laboratório ou ferramenta deseja praticar a partir de uma galeria de opções.
**Ator Principal**: Aluno (Usuário Não Autenticado)
**Pré-condições**: O usuário deve ter acessado a página inicial ou o menu de laboratórios.

**Fluxo Principal (Caminho Feliz):**

1. O usuário navega até a página de "Laboratórios" (`labs.html`).
2. O sistema exibe uma grade de cards contendo os laboratórios disponíveis (Ex: Nmap, SQLMap, Playground).
3. O usuário clica no card correspondente ao cenário desejado.
4. O sistema redireciona o usuário para a interface do terminal (`terminal.html`), passando o ID do cenário como parâmetro na URL (ex: `?tool=nmap`).
5. O sistema carrega os scripts do cenário selecionado.

**Pós-condições**: O usuário está na tela do terminal com o cenário específico inicializado e pronto para interação.

---

### UC02: Realizar Missão no Terminal Simulado

**Descrição Sumária**: O núcleo da aplicação. O usuário interage com o terminal emulado para completar objetivos sequenciais de uma missão simulada.
**Ator Principal**: Aluno
**Pré-condições**: O usuário deve ter selecionado um cenário (UC01) e estar na tela do terminal.

**Fluxo Principal:**

1. O sistema apresenta a "Introdução do Cenário" no painel lateral.
2. O sistema exibe o Passo 1, contendo: Instrução, Comando Esperado e, opcionalmente, uma Dica.
3. O cursor é focado no componente de terminal (Xterm.js).
4. O usuário digita o comando solicitado no prompt (ex: `nmap -sS target`).
5. O usuário pressiona a tecla `ENTER`.
6. O sistema captura o input e compara com o "Comando Esperado" definido no roteiro da missão.
7. O sistema valida que o comando está correto.
8. O sistema simula o processamento (exibindo logs progressivos no terminal) e exibe o resultado final da ferramenta.
9. O sistema habilita o botão "Próximo Passo" no painel lateral e exibe feedback positivo.
10. O usuário clica em "Próximo Passo".
11. O sistema limpa o terminal e carrega as instruções do Passo 2.
12. O fluxo se repete até o último passo.
13. Ao concluir o último passo, o sistema exibe uma mensagem de conclusão do módulo.

**Fluxo Alternativo A1 (Uso do Playground/Modo Livre):**

1. No passo 1, se o cenário for "Playground".
2. O usuário digita um comando qualquer (ex: `ls`, `cat file.txt`).
3. O sistema não valida contra um roteiro fixo.
4. O sistema processa o comando através do módulo `VirtualOS` (Sistema de Arquivos em memória).
5. O sistema exibe o resultado correspondente à operação no sistema de arquivos virtual.
6. O usuário continua interagindo livremente.

**Fluxo de Exceção E1 (Comando Incorreto):**

1. No passo 6 do Fluxo Principal, o usuário digita um comando diferente do esperado ou com sintaxe errada.
2. O sistema detecta a divergência.
3. O sistema exibe no terminal a mensagem de erro padrão do shell simulado (ex: `zsh: command not found`).
4. O sistema exibe uma mensagem de ajuda no terminal (`Hint: The required command is...`).
5. O sistema mantém o usuário no passo atual, aguardando nova tentativa.

---

### UC03: Consultar Base de Conhecimento (Wiki)

**Descrição Sumária**: O usuário utiliza a ferramenta de busca integrada para encontrar sintaxes de comandos e explicações rápidas sobre ferramentas.
**Ator Principal**: Aluno
**Pré-condições**: Acesso à página da Wiki (`wiki.html`).

**Fluxo Principal:**

1. O usuário acessa a página "Wiki".
2. O sistema lista todos os comandos cadastrados na base de dados (`wiki/data.js`).
3. O usuário digita um termo na barra de pesquisa (ex: "scan").
4. O sistema filtra a lista em tempo real, exibindo apenas os cards que contêm o termo no título ou descrição.
5. O usuário visualiza o card desejado, que contém: Nome da ferramenta, Descrição e Exemplos de uso.
6. O usuário clica no botão "Copiar" ao lado de um exemplo de código.
7. O sistema copia o texto para a área de transferência do sistema operacional do usuário.

---

### UC04: Acessar Guia de Estudo (Teoria)

**Descrição Sumária**: O usuário consome conteúdo teórico em formato de texto longo (artigos) para embasar seu aprendizado antes ou depois da prática.
**Ator Principal**: Aluno
**Pré-condições**: Acesso à página de Guias (`guide.html`).

**Fluxo Principal:**

1. O usuário acessa a página "Guides".
2. O sistema exibe um menu lateral com os capítulos disponíveis (ex: "01. Introdução", "02. Redes").
3. O usuário clica em um capítulo.
4. O sistema faz uma requisição assíncrona para carregar o arquivo Markdown correspondente (`guide/*.md`).
5. O sistema processa o Markdown e o renderiza como HTML formatado na área principal de leitura.
6. O usuário lê o conteúdo.

---

### UC05: Configurar Ambiente (Tema)

**Descrição Sumária**: O usuário altera a aparência da aplicação para melhor conforto visual.
**Ator Principal**: Aluno

**Fluxo Principal:**

1. O usuário clica no ícone de "Lua" ou "Sol" na barra de navegação superior.
2. O sistema verifica o tema atual.
3. Se estiver em "Dark", o sistema aplica a classe CSS de tema claro e salva a preferência em `localStorage`.
4. Se estiver em "Light", o sistema aplica a classe CSS de tema escuro e salva a preferência em `localStorage`.
5. A interface é atualizada instantaneamente sem recarregar a página.
