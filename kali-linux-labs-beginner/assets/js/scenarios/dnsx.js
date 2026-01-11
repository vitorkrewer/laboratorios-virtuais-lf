
export const data = {
    id: "dnsx",
    title: "Dnsx: Canivete Suíço de DNS",
    intro: "O Dnsx é uma ferramenta rápida e multiuso para consultas DNS. Ele permite realizar múltiplas resoluções em paralelo, ideal para reconhecimento de infraestrutura.",
    steps: [
        {
            step: 1,
            instruction: "Vamos começar com uma resolução simples. Vamos descobrir o IP do domínio <b>tesla.com</b> usando o pipe padrão. O Dnsx lê do stdin.",
            command: "echo tesla.com | dnsx",
            hint: "Use o comando echo e o pipe | para passar o domínio.",
            output: `
      _             
   __| | _ __   ___ __  __
  / _' || '_ \ / __|\ \/ /
 | (_| || | | |\__ \ >  < 
  \__,_||_| |_||___//_/\_\ v1.1.6

		projectdiscovery.io

[INF] Running DNSX v1.1.6
tesla.com [2.21.36.253]
`
        },
        {
            step: 2,
            instruction: "Agora vamos extrair os registros CNAME (apelidos) para identificar serviços de terceiros (como CDNs ou provedores de nuvem).",
            command: "echo www.tesla.com | dnsx -cname -resp",
            hint: "Adicione as flags -cname e -resp (response) para ver os detalhes.",
            output: `www.tesla.com [www.tesla.com.edgekey.net]
www.tesla.com.edgekey.net [e4428.b.akamaiedge.net]`
        },
        {
            step: 3,
            instruction: "Excelente. Para finalizar, vamos tentar fazer um brute-force de subdomínios usando uma lista (simulada) de palavras.",
            command: "dnsx -d tesla.com -w /usr/share/wordlists/subdomains.txt",
            hint: "Use define o domínio com -d e a wordlist com -w.",
            output: `[INF] Starting subdomain enumeration
auth.tesla.com [205.234.31.120]
shop.tesla.com [104.98.23.11]
energy.tesla.com [52.12.33.42]
service.tesla.com [209.11.22.10]
[INF] Found 4 subdomains`
        }
    ]
};
