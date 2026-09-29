export const data = {
    id: "wireshark",
    category: "defensive",
    difficulty: "Fundamentos",
    title: "Wireshark: Análise de Tráfego Seguro",
    intro: "Este cenário utiliza uma captura PCAP fictícia gerada para o laboratório. Você aprenderá a filtrar protocolos, identificar uma negociação DNS e reconhecer uma requisição HTTP sem capturar redes reais.",
    steps: [
        {
            step: 1,
            instruction: "Abra a captura simulada <b>campus-lab.pcap</b> no modo somente leitura para iniciar a investigação.",
            command: "wireshark -r campus-lab.pcap",
            hint: "A flag <code>-r</code> abre um arquivo de captura já existente. No laboratório, nenhum adaptador de rede real é acessado.",
            output: `[SIMULATED WIRESHARK 4.2]\n[+] Reading capture file: campus-lab.pcap\n[+] 1,248 packets loaded from isolated training dataset\n[+] Capture timeline: 09:00:00 - 09:03:12\n\nTip: use display filters to reduce the evidence set.`
        },
        {
            step: 2,
            instruction: "Filtre os pacotes DNS para descobrir qual domínio foi consultado pelo computador de teste.",
            command: "wireshark -r campus-lab.pcap -Y dns",
            hint: "<code>-Y</code> aplica um display filter. DNS é usado para converter nomes de domínio em endereços IP.",
            output: `No.     Time       Source          Destination     Protocol  Info\n104     00:00.421  10.20.0.15     10.20.0.53      DNS       Standard query A portal.learningfly.local\n105     00:00.425  10.20.0.53     10.20.0.15      DNS       Standard query response A 10.20.0.80\n\n[ANALYSIS] The client resolved portal.learningfly.local through the internal DNS server.`
        },
        {
            step: 3,
            instruction: "Agora filtre o tráfego HTTP para analisar os metadados da requisição de forma defensiva.",
            command: "wireshark -r campus-lab.pcap -Y http.request",
            hint: "O filtro <code>http.request</code> mostra apenas requisições HTTP. Em produção, utilize apenas capturas autorizadas.",
            output: `No.     Time       Source          Destination     Protocol  Info\n211     00:01.810  10.20.0.15     10.20.0.80      HTTP      GET /status HTTP/1.1\n\nHost: portal.learningfly.local\nUser-Agent: TrainingBrowser/1.0\n\n[DEFENSIVE FINDING] The request contains no credential or sensitive data. Record the protocol, host and URI in the incident note.`
        }
    ]
};
