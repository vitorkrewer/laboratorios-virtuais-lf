
export const data = {
    id: "naabu",
    title: "Naabu: Scan de Portas Rápido",
    intro: "O Naabu é conhecido por sua velocidade e simplicidade. Escrito em Go, ele foca em listar portas abertas o mais rápido possível, ideal para encadear com outras ferramentas.",
    steps: [
        {
            step: 1,
            instruction: "Vamos escanear as portas do host <b>192.168.56.101</b>. Observe a simplicidade do comando.",
            command: "naabu -host 192.168.56.101",
            hint: "O Naabu usa -host para definir o alvo.",
            output: `
                  __
  ___  ___  ___ _/ /  __ __
 / _ \/ _ \/ _ \/ _ \/ // /
/_//_/\_,_/\_,_/_.__/\_,_/ v2.1.0

		projectdiscovery.io

[INF] Running Naabu v2.1.0
[INF] Starting TCP scan on host 192.168.56.101
192.168.56.101:21
192.168.56.101:22
192.168.56.101:80
192.168.56.101:3306
[INF] Found 4 ports on host 192.168.56.101 (192.168.56.101)`
        },
        {
            step: 2,
            instruction: "O Naabu é excelente para pipes. Vamos simular um scan que passaria o resultado para outra ferramenta, mas agora vamos apenas verificar as portas top 1000.",
            command: "naabu -top-ports 1000 -host 192.168.56.101",
            hint: "A flag -top-ports define o escopo.",
            output: `[INF] Running Naabu v2.1.0
[INF] Starting TCP scan on host 192.168.56.101
192.168.56.101:21
192.168.56.101:22
192.168.56.101:80
192.168.56.101:443
192.168.56.101:3306
[INF] Found 5 ports on host 192.168.56.101`
        }
    ]
};
