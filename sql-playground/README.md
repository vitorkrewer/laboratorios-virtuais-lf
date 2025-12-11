# SQL Playground - Laboratório Virtual de Banco de Dados

O **SQL Playground** é uma ferramenta interativa e segura projetada para estudantes e entusiastas de banco de dados praticarem a linguagem SQL diretamente no navegador.

Desenvolvido para ser leve e eficiente, o projeto não requer instalação de servidores ou configurações complexas, permitindo que o usuário foque totalmente no aprendizado.

[Preview do Projeto](https://learningfly.b-cdn.net/labs/sql-playground/index.html)

## 🚀 Funcionalidades

- **Execução Client-Side**: Todo o processamento é feito no navegador utilizando WebAssembly (`sql.js`), garantindo privacidade e rapidez.
- **Múltiplos Motores (Simulados)**:
  - **SQLite**: Suporte nativo completo.
  - **MySQL**: Camada de compatibilidade que traduz comandos comuns do MySQL (como `AUTO_INCREMENT`, `SHOW TABLES`, `DESCRIBE`) para o motor SQLite subjacente.
- **Persistência de Dados**: O banco de dados é salvo automaticamente no `localStorage` do navegador, permitindo que você feche a aba e continue seu trabalho depois.
- **Interface Intuitiva**:
  - **Editor SQL**: Área de código com suporte a execução via atalho (`Ctrl + Enter`).
  - **Visualizador de Esquema**: Barra lateral dinâmica que mostra suas tabelas, colunas e chaves primárias.
  - **Resultados e Mensagens**: Abas separadas para visualização de dados (tabelas) e logs de execução.
- **Ajuda Integrada**: Guia de sintaxe pesquisável com exemplos de comandos.
- **Temas**: Suporte a modo Claro e Escuro.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web modernas, sem dependências de frameworks pesados:

- **HTML5 & CSS3**: Para estrutura e estilização responsiva.
- **JavaScript (ES Modules)**: Lógica da aplicação modularizada.
- **[sql.js](https://github.com/sql-js/sql.js)**: Um porte do SQLite para WebAssembly, permitindo um banco de dados relacional completo no navegador.
- **Font Awesome**: Para ícones da interface.

## 📂 Estrutura do Projeto

A estrutura de arquivos é simples e direta, facilitando a localização e modificação de qualquer parte do código.

```bash
sql-playground/
├── 📄 index.html        # Arquivo principal da aplicação
├── ⚙️ mysql_engine.js   # Motor de execução do MySQL
├── 🎨 style.css         # Folha de estilos personalizada
├── ⚙️ script.js         # Lógica principal e dados dos elementos
├── ⚙️ sqlite_engine.js  # Motor de execução do SQLite
└── 📖 README.md         # Esta documentação
```

## 📦 Como Usar

1. **Clone o repositório** ou baixe os arquivos.
2. **Navegue até a pasta do projeto:**

    ```bash
    cd sql-playground
    ```

3. **Execute:**

    ```bash
    python -m http.server
    ```

4. **Abra o arquivo `index.html` em qualquer navegador moderno.**
   - *Nota: Em alguns navegadores, pode ser necessário servir os arquivos via um servidor HTTP local (como `Live Server` do VS Code ou `python -m http.server`) devido a restrições de segurança do módulo WASM e ES Modules.*

### Exemplos de Comandos

**Criar uma Tabela (Sintaxe MySQL Compatível):**

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);
```

**Inserir Dados:**

```sql
INSERT INTO usuarios (nome, email) VALUES ('Vitor', 'vitor@exemplo.com');
INSERT INTO usuarios (nome, email) VALUES ('Ana', 'ana@exemplo.com');
```

**Consultar Dados:**

```sql
SELECT * FROM usuarios;
```

## ⚠️ Limitações do Motor MySQL

O modo **MySQL** é uma simulação educacional. Ele funciona traduzindo comandos MySQL para a sintaxe do SQLite em tempo de execução.

- Comandos básicos (`CREATE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`) funcionam perfeitamente.
- Comandos de metadados (`SHOW TABLES`, `DESCRIBE table`) são emulados.
- Funções avançadas ou específicas do MySQL (como Stored Procedures, Triggers complexas ou tipos de dados exóticos) podem não funcionar se não tiverem um equivalente direto no SQLite.

## 🤝 Contribuição

Sinta-se à vontade para abrir **Issues** ou enviar **Pull Requests** para melhorar a ferramenta, adicionar novos comandos à tradução do MySQL ou melhorar a interface.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
