export const data = {
    id: "osquery",
    category: "endpoint",
    difficulty: "Fundamentos",
    title: "osquery: Investigação de Endpoint com SQL",
    intro: "osquery trata o sistema operacional como um banco de dados relacional. Neste cenário, você consulta tabelas fictícias de processos, usuários e serviços para praticar investigação de endpoint.",
    steps: [
        {
            step: 1,
            instruction: "Liste processos de treinamento que simulam execução de intérpretes de script.",
            command: "osqueryi \"SELECT pid, name, path FROM processes WHERE name = 'python3';\"",
            hint: "osquery permite formular perguntas de endpoint em SQL. Comece por uma hipótese e consulte somente os campos necessários.",
            output: `+------+---------+----------------------------+\n| pid  | name    | path                       |\n+------+---------+----------------------------+\n| 1421 | python3 | /usr/bin/python3           |\n| 1834 | python3 | /opt/training/collector.py |\n+------+---------+----------------------------+\n\n[CONTEXT] The second process belongs to the approved training collector.`
        },
        {
            step: 2,
            instruction: "Consulte os usuários locais do endpoint fictício e identifique quais possuem shell de login.",
            command: "osqueryi \"SELECT username, uid, shell FROM users WHERE shell != '/usr/sbin/nologin';\"",
            hint: "Inventário de usuários ajuda a detectar contas inesperadas. Não confunda contas de serviço com contas humanas sem verificar o contexto.",
            output: `+----------+-----+-----------+\n| username | uid | shell     |\n+----------+-----+-----------+\n| kali     | 1000| /bin/bash |\n| analyst  | 1001| /bin/bash |\n+----------+-----+-----------+\n\n[REVIEW] Both accounts are documented in the training asset inventory.`
        },
        {
            step: 3,
            instruction: "Revise serviços em estado de execução para criar uma linha de base do endpoint.",
            command: "osqueryi \"SELECT name, status FROM systemd_units WHERE status = 'running';\"",
            hint: "Uma baseline registra o que é esperado. Alertas ganham valor quando comparados com esse estado conhecido.",
            output: `+----------------------+---------+\n| name                 | status  |\n+----------------------+---------+\n| ssh.service          | running |\n| training-agent.service| running|\n+----------------------+---------+\n\n[LEARNING] Keep an approved service baseline and investigate deviations over time.`
        }
    ]
};
