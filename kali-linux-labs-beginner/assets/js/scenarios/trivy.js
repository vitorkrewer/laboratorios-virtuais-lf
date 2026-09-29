export const data = {
    id: "trivy",
    category: "defensive",
    difficulty: "Fundamentos",
    title: "Trivy: Segurança de Dependências e Containers",
    intro: "Este laboratório simula a análise de uma imagem de container de treinamento. O objetivo é interpretar vulnerabilidades conhecidas e priorizar correções, sem baixar imagens ou consultar registros externos.",
    steps: [
        {
            step: 1,
            instruction: "Execute a varredura simulada da imagem <b>learningfly/webapp:1.0</b> para levantar vulnerabilidades conhecidas.",
            command: "trivy image learningfly/webapp:1.0",
            hint: "Trivy verifica componentes de uma imagem e compara versões com uma base de vulnerabilidades. Nesta missão, a base é local e fictícia.",
            output: `2026-09-29T10:00:00Z INFO  Vulnerability scanning is enabled\n2026-09-29T10:00:01Z INFO  Detected OS: debian 12 (training image)\n\nlearningfly/webapp:1.0 (debian 12)\n=======================================\nTotal: 3 (HIGH: 1, MEDIUM: 2)\n\n┌──────────────┬──────────────┬──────────┬─────────────────┐\n│ Library      │ Vulnerability│ Severity │ Fixed Version   │\n├──────────────┼──────────────┼──────────┼─────────────────┤\n│ openssl      │ CVE-TRAIN-01 │ HIGH     │ 3.0.15          │\n│ libxml2      │ CVE-TRAIN-02 │ MEDIUM   │ 2.10.4          │\n│ curl         │ CVE-TRAIN-03 │ MEDIUM   │ 8.5.0           │\n└──────────────┴──────────────┴──────────┴─────────────────┘`
        },
        {
            step: 2,
            instruction: "Foque apenas em itens de severidade alta para priorizar a correção mais urgente.",
            command: "trivy image --severity HIGH learningfly/webapp:1.0",
            hint: "A priorização é uma prática de gestão de risco: primeiro trate achados exploráveis, expostos e de maior impacto.",
            output: `learningfly/webapp:1.0\n=======================\nHIGH: 1\n\nopenssl  CVE-TRAIN-01  HIGH\nInstalled Version: 3.0.11\nFixed Version:     3.0.15\n\n[RECOMMENDATION] Update the base image, rebuild the artifact and run the pipeline again before deployment.`
        },
        {
            step: 3,
            instruction: "Gere um relatório no formato de tabela para compartilhar o resultado com a equipe de desenvolvimento.",
            command: "trivy image --format table learningfly/webapp:1.0",
            hint: "Relatórios claros ajudam desenvolvimento, segurança e operações a decidir quem corrige cada dependência.",
            output: `[REPORT GENERATED - SIMULATED]\nArtifact: learningfly/webapp:1.0\nRisk owner: Platform Team\nPriority: Patch openssl to 3.0.15 or newer\nStatus: Awaiting remediation\n\n[LEARNING] A scanner aponta versões; a equipe ainda precisa avaliar exposição, contexto e atualização segura.`
        }
    ]
};
