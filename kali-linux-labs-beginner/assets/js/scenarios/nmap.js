
export const data = {
    id: "nmap",
    title: "Nmap: Mapeamento de Rede",
    intro: "O Nmap (Network Mapper) é a ferramenta padrão da indústria para descoberta de rede e auditoria de segurança. Neste laboratório, você aprenderá os comandos essenciais para identificar hosts e serviços.",
    steps: [
        {
            step: 1,
            instruction: "Primeiro, vamos verificar se o alvo <b>192.168.56.101</b> está online sem escanear portas. Este é um scan silencioso.",
            command: "nmap -sn 192.168.56.101",
            hint: "A flag -sn diz ao Nmap para fazer apenas um 'Ping Scan'.",
            output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.56.101
Host is up (0.0024s latency).
MAC Address: 08:00:27:12:34:56 (Oracle VirtualBox virtual NIC)
Nmap done: 1 IP address (1 host up) scanned in 0.28 seconds`
        },
        {
            step: 2,
            instruction: "O alvo está ativo. Agora, vamos fazer um scan rápido (Fast Scan) para verificar as 100 portas mais comuns.",
            command: "nmap -F 192.168.56.101",
            hint: "A flag -F ativa o modo 'Fast Mode'.",
            output: `Starting Nmap 7.94
Nmap scan report for 192.168.56.101
Host is up (0.0025s latency).
Not shown: 96 closed tcp ports (reset)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql
MAC Address: 08:00:27:12:34:56 (Oracle VirtualBox virtual NIC)

Nmap done: 1 IP address (1 host up) scanned in 1.34 seconds`
        },
        {
            step: 3,
            instruction: "Interessante. Temos FTP, SSH, HTTP e MySQL. Vamos tentar descobrir a versão exata desses serviços.",
            command: "nmap -sV 192.168.56.101",
            hint: "A flag -sV ativa a detecção de versão (Service Version).",
            output: `Starting Nmap 7.94
Nmap scan report for 192.168.56.101
Host is up.
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
22/tcp   open  ssh     OpenSSH 8.4p1 Debian 5+deb11u1
80/tcp   open  http    Apache httpd 2.4.56
3306/tcp open  mysql   MariaDB 10.5.19
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.45 seconds`
        }
    ]
};
