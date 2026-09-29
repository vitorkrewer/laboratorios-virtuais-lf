export const data = {
    id: "yara",
    category: "forensics",
    difficulty: "Intermediário",
    title: "YARA: Classificação por Indicadores",
    intro: "YARA permite criar regras para classificar arquivos com base em textos e padrões. Este ambiente usa amostras textuais inofensivas que simulam evidências, sem distribuir ou executar código malicioso.",
    steps: [
        {
            step: 1,
            instruction: "Execute a regra didática contra o diretório de amostras sintéticas.",
            command: "yara training_rules.yar samples/",
            hint: "Uma regra YARA combina identificadores, strings e condições. O resultado indica correspondência, não uma condenação automática do arquivo.",
            output: `TRAINING_Suspicious_PowerShell samples/invoice_preview.txt\nTRAINING_Encoded_Command samples/telemetry_note.txt\n\n[RESULT] 2 synthetic artifacts matched the training indicators.`
        },
        {
            step: 2,
            instruction: "Exiba metadados das regras para entender o contexto da classificação.",
            command: "yara -m training_rules.yar samples/",
            hint: "Metadados explicam autor, finalidade e referência da regra. Eles são essenciais para auditoria e manutenção de detecções.",
            output: `TRAINING_Suspicious_PowerShell [author="Learning Fly", category="training", confidence="medium"] samples/invoice_preview.txt\nTRAINING_Encoded_Command [author="Learning Fly", category="training", confidence="low"] samples/telemetry_note.txt\n\n[ANALYST NOTE] Validate file origin, execution history and hash reputation before escalating.`
        },
        {
            step: 3,
            instruction: "Faça uma varredura recursiva de evidências de treinamento para construir um inventário de arquivos correspondentes.",
            command: "yara -r training_rules.yar samples/",
            hint: "A varredura recursiva é útil em investigações, mas regras genéricas demais podem gerar muitos falsos positivos.",
            output: `samples/invoice_preview.txt: TRAINING_Suspicious_PowerShell\nsamples/archive/telemetry_note.txt: TRAINING_Encoded_Command\n\n[LEARNING] Detections become useful when combined with context, scope and a documented response workflow.`
        }
    ]
};
