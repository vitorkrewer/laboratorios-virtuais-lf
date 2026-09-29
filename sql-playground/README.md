# SQL Playground Pro - Laboratório Virtual de Banco de Dados 🗄️

![Status](https://img.shields.io/badge/status-active-success.svg)
![WebAssembly](https://img.shields.io/badge/engine-WebAssembly_sql.js-blue)
![Dialetos](https://img.shields.io/badge/dialetos-SQLite_|_MySQL_|_Postgres_|_SQLServer_|_Oracle-orange)
![Segurança](https://img.shields.io/badge/time--travel-Snapshots_Instantâneos-emerald)

O **SQL Playground Pro** é uma ferramenta educacional interativa projetada para que estudantes de graduação e tecnologia pratiquem Banco de Dados Relacional e comandos SQL diretamente no navegador, **com total liberdade e sem medo de quebrar nada**.

A aplicação conta com motor **WebAssembly**, pontos de restauração no tempo (**Time-Travel Snapshots**), múltiplos dialetos (**SQLite, MySQL, PostgreSQL, Microsoft SQL Server e Oracle Database**), datasets pedagógicos prontos, visualizador de planos de execução (**EXPLAIN**), formatador de código e trilha de desafios práticos com validação.

[🔗 Acessar Laboratório Online](https://vitorkrewer.github.io/laboratorios-virtuais-lf/sql-playground/)

---

## 🚀 Novidades & Funcionalidades Avançadas

### 1. ⏱️ Time-Travel & Snapshots Instantâneos ("Sem Medo de Quebrar")
- Crie **Pontos de Restauração** antes de testar comandos arriscados (como `DROP TABLE` ou `DELETE` sem `WHERE`).
- Reverta o banco de dados inteiro para qualquer momento anterior com apenas 1 clique.
- Snapshots automáticos a cada troca de dataset ou operação crítica.

### 2. 🗃️ 5 Dialetos Relacionais Suportados
- **SQLite (Nativo WASM):** Processamento client-side completo com suporte a foreign keys e transações.
- **MySQL (Emulação Avançada):** Suporte a `AUTO_INCREMENT`, `SHOW TABLES`, `DESCRIBE`, `LIMIT offset, count`, `NOW()`, `TRUNCATE`, etc.
- **PostgreSQL (Emulado):** Suporte a `SERIAL PRIMARY KEY`, `ILIKE`, `RETURNING`, `VARCHAR`, etc.
- **Microsoft SQL Server (T-SQL Emulado):** Suporte a `IDENTITY(1,1)`, `SELECT TOP n`, `GETDATE()`, `ISNULL()`, `LEN()`, identificadores `[dbo].[tabela]`, etc.
- **Oracle Database (Emulado):** Suporte a `VARCHAR2`, `NUMBER`, `SYSDATE`, `NVL()`, tabela `DUAL`, `USER_TABLES`, `FETCH FIRST n ROWS ONLY`, etc.

### 3. 📦 Datasets Educacionais Pré-carregados
Troque de contexto em 1 clique para praticar cenários do mundo real:
- 🛒 **E-Commerce & Vendas:** `clientes`, `produtos`, `categorias`, `pedidos`, `itens_pedido`.
- 🎓 **Universidade & Ensino:** `alunos`, `cursos`, `disciplinas`, `professores`, `matriculas`.
- 🏢 **Empresa & RH:** `departamentos`, `cargos`, `funcionarios`, `projetos`, `alocacoes`.
- 🧹 **Banco Vazio:** Para criar sua própria modelagem do zero.

### 4. ⚡ EXPLAIN Query Plan (Análise de Desempenho)
- Analise a estratégia do otimizador de consultas para identificar se o banco realiza **Full Table Scan (SCAN TABLE)** ou busca indexada otimizada (**SEARCH TABLE USING INDEX**).

### 5. 🛠️ Produtividade & Ferramentas do Editor
- **Formatador SQL (Prettify):** Indentação e padronização automática de palavras-chave.
- **Histórico de Consultas:** Acesso rápido aos últimos 20 comandos executados na sessão.
- **Exportação Flexível:**
  - Baixar **Dump SQL (.sql)** completo com `CREATE TABLE` e `INSERT INTO`.
  - Baixar o banco **Binário SQLite (.sqlite)** para abrir no DBeaver ou DB Browser.
  - Exportar resultados de consultas para **CSV** ou **JSON**.

### 6. 🏆 Trilha de Desafios Práticos
- Exercícios categorizados por nível (*Iniciante*, *Intermediário*, *Avançado*) cobrindo `SELECT`, `WHERE`, `GROUP BY / HAVING`, `INNER JOIN` e `CREATE VIEW`, com dicas e consulta de referência.

---

## 📂 Estrutura do Projeto

```bash
sql-playground/
├── 📄 index.html          # Interface responsiva da aplicação
├── ⚙️ sqlite_engine.js     # Motor nativo SQLite WebAssembly com snapshots
├── ⚙️ mysql_engine.js      # Camada de emulação MySQL
├── ⚙️ postgres_engine.js   # Camada de emulação PostgreSQL
├── 📦 datasets.js         # Datasets educacionais e banco de desafios
├── 📖 syntax.json         # Biblioteca categorizada de sintaxe SQL
├── 🎨 style.css           # Folha de estilos responsiva com temas Claro/Escuro
├── ⚙️ script.js           # Orquestrador da aplicação
└── 📖 README.md           # Esta documentação
```

---

## 🏁 Como Executar Localmente

1. Clone o repositório principal:
   ```bash
   git clone https://github.com/vitorkrewer/laboratorios-virtuais-lf.git
   ```
2. Navegue até a pasta do laboratório:
   ```bash
   cd laboratorios-virtuais-lf/sql-playground
   ```
3. Inicie um servidor HTTP local:
   ```bash
   python -m http.server
   ```
4. Abra `http://localhost:8000` no seu navegador.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.

---

## 📄 Licença

[![Licença: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

Este projeto está licenciado sob os termos da [Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

Você pode usá-lo, modificá-lo e compartilhá-lo **para fins não comerciais**, desde que com a devida atribuição a **Vitor Krewer**.  
Para qualquer uso comercial, entre em contato diretamente.
