export const data = {
    id: "zeek",
    category: "soc",
    difficulty: "Intermediário",
    title: "Zeek: Telemetria e Linha do Tempo de Rede",
    intro: "Este laboratório usa uma captura fictícia convertida em logs Zeek. O objetivo é correlacionar eventos DNS, HTTP e conexões para construir uma linha do tempo defensiva, sem analisar tráfego real.",
    steps: [
        {
            step: 1,
            instruction: "Procure consultas DNS para o domínio suspeito no dataset de treinamento.",
            command: "zeek-cut query < dns.log",
            hint: "Logs Zeek transformam pacotes em registros estruturados. O arquivo <code>dns.log</code> mostra resoluções de nomes.",
            output: `#fields\tts\tuid\tid.orig_h\tquery\n2026-09-29T09:00:12Z\tC-TRAIN-01\t10.20.0.15\tupdates.training.invalid\n2026-09-29T09:00:14Z\tC-TRAIN-02\t10.20.0.15\tportal.learningfly.local\n\n[OBSERVATION] The training workstation queried a domain not present in the approved inventory.`
        },
        {
            step: 2,
            instruction: "Relacione a consulta à conexão de rede observada no log de conexões.",
            command: "zeek-cut id.orig_h id.resp_h service < conn.log",
            hint: "<code>conn.log</code> registra origem, destino e serviço. Relacione o IP de origem ao evento DNS anterior.",
            output: `10.20.0.15\t198.51.100.44\thttp\n10.20.0.15\t10.20.0.80\thttp\n\n[CORRELATION] The same workstation contacted 198.51.100.44 after the suspicious DNS lookup.`
        },
        {
            step: 3,
            instruction: "Consulte os registros HTTP para registrar o indicador de comprometimento e o comportamento observado.",
            command: "zeek-cut host uri user_agent < http.log",
            hint: "Evidência útil contém o mínimo necessário: host, caminho, horário e agente. Não colete conteúdo sensível sem autorização.",
            output: `updates.training.invalid\t/check\tTrainingAgent/0.1\nportal.learningfly.local\t/status\tTrainingBrowser/1.0\n\n[INCIDENT NOTE] Record updates.training.invalid as a training IOC and recommend blocking/reviewing it in DNS policy.`
        }
    ]
};
