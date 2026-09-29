export const data = {
    id: "lynis",
    category: "hardening",
    difficulty: "Fundamentos",
    title: "Lynis: Hardening e Postura de Segurança Linux",
    intro: "Lynis é uma ferramenta de auditoria de hardening. Nesta missão, você interpreta recomendações sintéticas e as converte em ações priorizadas, sem alterar uma máquina real.",
    steps: [
        {
            step: 1,
            instruction: "Inicie uma auditoria de sistema no perfil sintético de treinamento.",
            command: "lynis audit system",
            hint: "Auditorias de hardening avaliam configuração, exposição e boas práticas. O resultado é uma lista de recomendações, não uma correção automática.",
            output: `[ Lynis 3.1.1 - Training Profile ]\n[+] Security audit started on synthetic Kali endpoint\n\nWarnings: 1\nSuggestions: 3\nHardening index: 68 [##########------]\n\n[WARNING] SSH root login policy is not explicitly disabled in the training profile.`
        },
        {
            step: 2,
            instruction: "Exiba apenas as sugestões de hardening para transformar resultados técnicos em plano de ação.",
            command: "lynis show suggestions",
            hint: "Priorize mudanças pelo impacto, risco de indisponibilidade, dependências e capacidade de reversão.",
            output: `Suggestions (synthetic):\n- Disable direct root login over SSH.\n- Enable automatic security updates.\n- Review file permissions in /opt/training.\n\n[PRIORITIZATION] Address remote administrative exposure first, then automate patch hygiene.`
        },
        {
            step: 3,
            instruction: "Gere um relatório de perfil para registrar a postura de segurança inicial do endpoint.",
            command: "lynis show profile",
            hint: "Registrar a baseline permite comprovar evolução e comparar a postura após uma mudança de configuração.",
            output: `Profile: learningfly-training-linux\nHardening index: 68\nCritical findings: 0\nWarnings: 1\nSuggestions: 3\n\n[LEARNING] Hardening is continuous: measure, improve, validate and document.`
        }
    ]
};
