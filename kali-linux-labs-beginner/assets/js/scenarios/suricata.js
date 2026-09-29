export const data = {
    id: "suricata",
    category: "soc",
    difficulty: "Intermediário",
    title: "Suricata: Alertas e Triagem de IDS",
    intro: "Você atuará como analista SOC em um ambiente sintético. A missão ensina a ler alertas, avaliar severidade, diferenciar evidência de hipótese e produzir uma ação de resposta proporcional.",
    steps: [
        {
            step: 1,
            instruction: "Leia os alertas gerados pelo IDS no arquivo de treinamento <b>eve.json</b>.",
            command: "suricata -r soc-training.pcap -l alerts",
            hint: "Suricata pode produzir logs em JSON no formato EVE. Alertas são pontos de partida para investigação, não prova final de comprometimento.",
            output: `[SIMULATED SURICATA]\nLoaded rules: 128 training signatures\n\nalert: ET TRAINING Suspicious DNS domain\nsrc_ip: 10.20.0.15\ndest_ip: 10.20.0.53\nseverity: 2\n\nalert: ET TRAINING Unusual HTTP user-agent\nsrc_ip: 10.20.0.15\ndest_ip: 198.51.100.44\nseverity: 3`
        },
        {
            step: 2,
            instruction: "Filtre o EVE JSON para visualizar somente alertas classificados com severidade alta no laboratório.",
            command: "jq 'select(.alert.severity <= 2)' alerts/eve.json",
            hint: "Em muitos sistemas, números menores representam maior severidade. Sempre verifique a taxonomia adotada pela sua organização.",
            output: `{\n  "event_type": "alert",\n  "alert": {"signature": "ET TRAINING Suspicious DNS domain", "severity": 2},\n  "src_ip": "10.20.0.15",\n  "dest_ip": "10.20.0.53"\n}\n\n[TRIAGE] Prioritize validation of the DNS event and correlate with Zeek logs before containment.`
        },
        {
            step: 3,
            instruction: "Teste uma regra de bloqueio apenas contra o tráfego sintético do treinamento.",
            command: "suricata -T -S training.rules",
            hint: "<code>-T</code> testa a configuração e as regras sem iniciar captura ou bloqueio. Valide regras antes de implantar em produção.",
            output: `Suricata configuration test mode\nLoading training.rules\nRule 1000001: alert dns any any -> any any (msg:"TRAINING suspicious domain"; dns.query; content:"updates.training.invalid"; nocase; sid:1000001; rev:1;)\n\n[PASS] Configuration and training rule syntax are valid.\n[LEARNING] Tune signatures to reduce false positives before enforcement.`
        }
    ]
};
