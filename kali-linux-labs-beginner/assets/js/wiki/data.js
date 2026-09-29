
export const wikiData = [
    {
        tool: "Nmap",
        category: "Network Scanning",
        command: "nmap -sn <target>",
        description: "Ping Scan - Verifica se hosts estão online sem escanear portas.",
        labId: "nmap"
    },
    {
        tool: "Nmap",
        category: "Network Scanning",
        command: "nmap -sS <target>",
        description: "SYN Scan - Scan furtivo (padrão se root). Não completa o handshake TCP.",
        labId: "nmap"
    },
    {
        tool: "Nmap",
        category: "Network Scanning",
        command: "nmap -sV <target>",
        description: "Version Detection - Tenta determinar a versão dos serviços rodando.",
        labId: "nmap"
    },
    {
        tool: "Nmap",
        category: "Network Scanning",
        command: "nmap -O <target>",
        description: "OS Detection - Tenta adivinhar o Sistema Operacional do alvo.",
        labId: "nmap"
    },
    {
        tool: "Naabu",
        category: "Port Scanning",
        command: "naabu -host <target>",
        description: "Scan básico de portas em um único host.",
        labId: "naabu"
    },
    {
        tool: "Naabu",
        category: "Port Scanning",
        command: "naabu -top-ports 100 -host <target>",
        description: "Scaneia apenas as 100 portas mais comuns.",
        labId: "naabu"
    },
    {
        tool: "Maltego",
        category: "OSINT",
        command: "maltego",
        description: "Inicia a interface gráfica do Maltego Community Edition.",
        labId: "maltego"
    },
    {
        tool: "DNSX",
        category: "DNS",
        command: "echo <domain> | dnsx",
        description: "Resolve o IP de um domínio passado via stdin.",
        labId: "dnsx"
    },
    {
        tool: "DNSX",
        category: "DNS",
        command: "dnsx -l <list.txt> -resp",
        description: "Resolve uma lista de domínios e mostra a resposta completa.",
        labId: "dnsx"
    },
    {
        tool: "Nuclei",
        category: "Vulnerability Scanning",
        command: "nuclei -u <target> -t technologies/",
        description: "Detecta tecnologias rodando no alvo usando templates.",
        labId: "nuclei"
    },
    {
        tool: "Nuclei",
        category: "Vulnerability Scanning",
        command: "nuclei -u <target> -s critical",
        description: "Busca apenas por vulnerabilidades de severidade crítica.",
        labId: "nuclei"
    },
    {
        tool: "Nikto",
        category: "Web Scanner",
        command: "nikto -h <target>",
        description: "Inicia um scan completo de servidor web no host especificado.",
        labId: "nikto"
    },
    {
        tool: "Nikto",
        category: "Web Scanner",
        command: "nikto -h <target> -evasion 1",
        description: "Usa técnica de evasão de IDS (Random URI Encoding).",
        labId: "nikto"
    },
    {
        tool: "Burp Suite",
        category: "Web Proxy",
        command: "burpsuite",
        description: "Inicia a GUI do Burp Suite.",
        labId: "burpsuite"
    },
    {
        tool: "SQLMap",
        category: "Exploitation",
        command: "sqlmap -u <url> --batch",
        description: "Testa uma URL para injeção de SQL de forma automática.",
        labId: "sqlmap"
    },
    {
        tool: "SQLMap",
        category: "Exploitation",
        command: "sqlmap -u <url> --dbs",
        description: "Enumera os bancos de dados disponíveis no servidor vulnerável.",
        labId: "sqlmap"
    },
    {
        tool: "SQLMap",
        category: "Exploitation",
        command: "sqlmap -u <url> -D <db> --tables",
        description: "Lista as tabelas de um banco de dados específico.",
        labId: "sqlmap"
    },
    {
        tool: "SQLMap",
        category: "Exploitation",
        command: "sqlmap -u <url> -D <db> -T <table> --dump",
        description: "Extrai (dump) o conteúdo de uma tabela.",
        labId: "sqlmap"
    },
    {
        tool: "Metasploit",
        category: "Exploitation",
        command: "msfconsole",
        description: "Inicia o console do framework.",
        labId: "msfconsole"
    },
    {
        tool: "Metasploit",
        category: "Exploitation",
        command: "search <termo>",
        description: "Busca por módulos (exploits, auxiliares, payloads) dentro do msfconsole.",
        labId: "msfconsole"
    },
    {
        tool: "Metasploit",
        category: "Exploitation",
        command: "use <id/caminho>",
        description: "Seleciona um módulo para uso.",
        labId: "msfconsole"
    },
    {
        tool: "Hydra",
        category: "Brute Force",
        command: "hydra -l <user> -P <passwords.txt> <target> <protocol>",
        description: "Inicia ataque de força bruta com usuário fixo e lista de senhas.",
        labId: "hydra"
    },
    {
        tool: "Hydra",
        category: "Brute Force",
        command: "hydra -L <users.txt> -P <passwords.txt> <target> <protocol>",
        description: "Ataque com lista de usuários e lista de senhas.",
        labId: "hydra"
    },
    {
        tool: "Wireshark",
        category: "Defensive Network Analysis",
        command: "wireshark -r campus-lab.pcap -Y dns",
        description: "Abre uma PCAP sintética em modo leitura e filtra consultas DNS para investigação didática.",
        labId: "wireshark"
    },
    {
        tool: "Zeek",
        category: "SOC Telemetry",
        command: "zeek-cut query < dns.log",
        description: "Extrai campos de um log Zeek sintético para correlacionar eventos DNS.",
        labId: "zeek"
    },
    {
        tool: "Zeek",
        category: "SOC Telemetry",
        command: "zeek-cut id.orig_h id.resp_h service < conn.log",
        description: "Mostra origem, destino e serviço de conexões fictícias para criar uma linha do tempo.",
        labId: "zeek"
    },
    {
        tool: "Suricata",
        category: "IDS & Detection",
        command: "suricata -T -S training.rules",
        description: "Valida a sintaxe de regras IDS de treinamento sem iniciar captura ou bloqueio.",
        labId: "suricata"
    },
    {
        tool: "Suricata",
        category: "IDS & Detection",
        command: "jq 'select(.alert.severity <= 2)' alerts/eve.json",
        description: "Filtra alertas de maior prioridade em um EVE JSON sintético usando jq.",
        labId: "suricata"
    },
    {
        tool: "YARA",
        category: "Forensics & Classification",
        command: "yara -m training_rules.yar samples/",
        description: "Classifica amostras textuais inofensivas e exibe metadados da regra correspondente.",
        labId: "yara"
    },
    {
        tool: "osquery",
        category: "Endpoint Investigation",
        command: "osqueryi \"SELECT pid, name, path FROM processes WHERE name = 'python3';\"",
        description: "Consulta uma tabela de processos sintética usando SQL para investigação de endpoint.",
        labId: "osquery"
    },
    {
        tool: "Lynis",
        category: "Linux Hardening",
        command: "lynis audit system",
        description: "Avalia uma postura Linux sintética e apresenta recomendações de hardening priorizáveis.",
        labId: "lynis"
    },
    {
        tool: "Trivy",
        category: "Supply Chain Security",
        command: "trivy image --severity HIGH learningfly/webapp:1.0",
        description: "Prioriza vulnerabilidades altas em uma imagem de container fictícia.",
        labId: "trivy"
    },
    {
        tool: "Semgrep",
        category: "Secure Code Review",
        command: "semgrep --config p/security-audit --json demo-api",
        description: "Executa SAST em código de treinamento e retorna achados no formato JSON.",
        labId: "semgrep"
    },
    {
        tool: "Gitleaks",
        category: "Secret Management",
        command: "gitleaks protect --staged",
        description: "Simula uma verificação pré-commit de segredos antes do código seguir para revisão.",
        labId: "gitleaks"
    }
];
