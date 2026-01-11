
export const data = {
    id: "maltego",
    title: "Maltego: Inteligência de Fontes Abertas",
    intro: "O Maltego é uma ferramenta de mineração de dados e visualização de conexões para OSINT (Open Source Intelligence). Embora sua força esteja na interface gráfica, como profissionais, devemos saber gerenciá-lo via terminal para debugging e automação.",
    steps: [
        {
            step: 1,
            instruction: "O primeiro passo é verificar a integridade da instalação e a versão atual. Isso é crucial antes de iniciar uma investigação.",
            command: "maltego --version",
            hint: "Use a flag --version.",
            output: `Maltego Community Edition 4.3.1
Build: 2023-11-15
Java Version: 17.0.8 (Debian)
Memory Limit: 4096MB`
        },
        {
            step: 2,
            instruction: "Agora, vamos iniciar a aplicação. No terminal, isso permite que vejamos logs de erro em tempo real caso algum 'Transform' falhe ou a conexão caia.",
            command: "maltego",
            hint: "Basta digitar o nome do programa.",
            output: `[INFO] Starting Maltego Community Edition...
[INFO] Loading modules...
[INFO] Initializing GUI...
[WARN] Plugin 'SocialLinks' requires update.
[INFO] Connection to transform server established.
[INFO] GUI is ready. (Simulated Window Opens)`
        }
    ]
};
