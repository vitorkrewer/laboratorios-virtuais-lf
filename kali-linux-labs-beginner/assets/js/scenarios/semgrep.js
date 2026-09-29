export const data = {
    id: "semgrep",
    category: "defensive",
    difficulty: "Intermediário",
    title: "Semgrep: Revisão Segura de Código",
    intro: "Você irá analisar um pequeno projeto fictício com regras de SAST (Static Application Security Testing). A missão demonstra como reconhecer padrões de risco no código antes do deploy.",
    steps: [
        {
            step: 1,
            instruction: "Execute a varredura local de regras de boas práticas no projeto <b>demo-api</b>.",
            command: "semgrep --config auto demo-api",
            hint: "SAST examina código sem executá-lo. Isso é útil para encontrar padrões inseguros cedo no ciclo de desenvolvimento.",
            output: `┌─────────────┐\n│ Scan Status │\n└─────────────┘\n  Scanning 12 files tracked by git with 28 Code rules:\n\n  RUN SUMMARY\n  ✓ 12 files scanned\n  ✓ 2 findings detected in isolated training source\n\ndemo-api/routes/profile.js\n  18: user input is logged without redaction [MEDIUM]\ndemo-api/config/app.js\n  7: debug mode enabled in production profile [LOW]`
        },
        {
            step: 2,
            instruction: "Filtre a análise para regras de segurança, separando achados relevantes de problemas de estilo.",
            command: "semgrep --config p/security-audit demo-api",
            hint: "Uma regra deve ser entendida como uma hipótese de risco. Confirme o contexto antes de classificar como vulnerabilidade real.",
            output: `demo-api/routes/profile.js\n  rule: javascript.lang.security.audit.unsafe-formatstring\n  severity: WARNING\n  message: User-controlled content can reach logging without sanitization.\n\n[DEFENSIVE REVIEW] Recommend redacting tokens, identifiers and personal data before logging.`
        },
        {
            step: 3,
            instruction: "Exporte o resultado para JSON para que um pipeline de CI possa registrar métricas de segurança.",
            command: "semgrep --config p/security-audit --json demo-api",
            hint: "CI deve falhar ou alertar de acordo com uma política de severidade definida pela equipe, e não apenas pelo número de alertas.",
            output: `{\n  "results": [\n    {"check_id":"training.unsafe-logging","severity":"WARNING","path":"routes/profile.js","line":18}\n  ],\n  "errors": [],\n  "paths": {"scanned": ["demo-api/routes/profile.js"]}\n}\n\n[LEARNING] The JSON output can feed dashboards, pull-request annotations and quality gates.`
        }
    ]
};
