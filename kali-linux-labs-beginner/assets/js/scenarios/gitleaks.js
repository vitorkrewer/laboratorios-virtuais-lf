export const data = {
    id: "gitleaks",
    category: "defensive",
    difficulty: "Intermediário",
    title: "Gitleaks: Proteção de Segredos no Git",
    intro: "Este cenário trabalha com um repositório fictício de treinamento que contém credenciais de exemplo deliberadamente inválidas. Aprenda a identificar, revogar e prevenir vazamentos de segredos.",
    steps: [
        {
            step: 1,
            instruction: "Faça uma auditoria do histórico do repositório de treinamento em busca de possíveis segredos expostos.",
            command: "gitleaks detect --source demo-repo",
            hint: "Nunca publique tokens reais em exercícios. O laboratório usa valores sintéticos e não acessa repositórios externos.",
            output: `INFO[0000] Scanning commits: 18 (training repository)\n\nFinding: Generic API Key\nFile: demo-repo/.env.example\nLine: 4\nCommit: 8a3f2c1 (synthetic)\nSecret: lf_demo_key_not_valid_123\n\nFinding: Password assignment\nFile: demo-repo/config/sample.yml\nLine: 9\nCommit: 23bd891 (synthetic)\n\n[RESULT] 2 training findings detected. No real credential was used.`
        },
        {
            step: 2,
            instruction: "Gere um relatório JSON para documentar os achados no processo de revisão de código.",
            command: "gitleaks detect --source demo-repo --report-format json",
            hint: "O tratamento correto envolve remover o segredo, revogar a credencial original e reescrever o histórico quando necessário.",
            output: `[{"RuleID":"generic-api-key","File":".env.example","StartLine":4,"Severity":"HIGH"},{"RuleID":"password-assignment","File":"config/sample.yml","StartLine":9,"Severity":"MEDIUM"}]\n\n[REMEDIATION PLAYBOOK]\n1. Revoke the leaked credential.\n2. Remove it from source and use environment variables.\n3. Add secret scanning to CI.\n4. Educate the team about .gitignore and .env.example.`
        },
        {
            step: 3,
            instruction: "Execute a verificação preparada para um pipeline de integração contínua.",
            command: "gitleaks protect --staged",
            hint: "Pre-commit hooks e pipelines impedem que segredos cheguem ao repositório remoto. Eles complementam, mas não substituem, gestão de segredos.",
            output: `INFO[0000] Scanning staged changes (simulated)\nINFO[0000] No secrets detected in current staged files\n\n[PASS] Commit allowed by training policy.\n[LEARNING] Prevention is cheaper than remediation: automate checks before code is merged.`
        }
    ]
};
