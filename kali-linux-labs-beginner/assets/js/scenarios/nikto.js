
export const data = {
    id: "nikto",
    title: "Nikto: Web Server Scanner",
    intro: "O Nikto é um scanner de servidor web clássico. Ele verifica mais de 6700 arquivos/CGIs potencialmente perigosos, versões desatualizadas de servidores e problemas específicos de versões.",
    steps: [
        {
            step: 1,
            instruction: "Vamos realizar um scan padrão no host <b>192.168.56.101</b>. Esta é a varredura mais completa e pode demorar um pouco.",
            command: "nikto -h http://192.168.56.101",
            hint: "Use a flag -h para especificar o host.",
            output: `
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.56.101
+ Target Hostname:    192.168.56.101
+ Target Port:        80
+ Start Time:         2024-01-10 14:20:11 (GMT-3)
---------------------------------------------------------------------------
+ Server: Apache/2.4.56 (Debian)
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ /admin/: Directory indexing found.
+ /admin/config.php: PHP config file may contain database creds.
+ /robot.txt: Entry '/secret/' should be checked.
+ 6544 items checked: 0 error(s) and 5 item(s) reported on remote host
+ End Time:           2024-01-10 14:22:34 (GMT-3) (143 seconds)
---------------------------------------------------------------------------
`
        },
        {
            step: 2,
            instruction: "Para evitar detecção e ser mais furtivo, podemos usar técnicas de evasão de IDS (Intrusion Detection System). Vamos tentar a técnica de encoding 1 (Random URI encoding).",
            command: "nikto -h http://192.168.56.101 -evasion 1",
            hint: "Use -evasion seguido do número da técnica.",
            output: `
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.56.101
+ Target Hostname:    192.168.56.101
+ Target Port:        80
---------------------------------------------------------------------------
+ Server: Apache/2.4.56 (Debian)
+ /%61dmin/: Directory indexing found (URI encoded).
+ 6544 items checked: 0 error(s) and 2 item(s) reported`
        }
    ]
};
