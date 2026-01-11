
export const data = {
    id: "burpsuite",
    title: "Burp Suite: Interceptação e Análise Web",
    intro: "O Burp Suite é uma plataforma integrada para testes de segurança em aplicações web. Ele atua como um proxy, permitindo interceptar, inspecionar e modificar o tráfego entre o navegador e o servidor.",
    steps: [
        {
            step: 1,
            instruction: "Para garantir que o ambiente Java está configurado corretamente antes de iniciar a GUI pesada, verificamos a versão do Burp instalado.",
            command: "burpsuite --version",
            hint: "Verifique a versão pela linha de comando.",
            output: `Burp Suite Community Edition v2023.12.1
Java Runtime Environment: 21.0.1
Architecture: amd64`
        },
        {
            step: 2,
            instruction: "Agora iniciamos o suite. Em um teste real, isso abriria a interface gráfica. Aqui, simularemos a inicialização do listener do Proxy na porta 8080.",
            command: "burpsuite",
            hint: "Inicie o programa.",
            output: `[INFO] Starting Burp Suite Community Edition...
[INFO] Loading extension: Burp Extensions
[INFO] Proxy service started on 127.0.0.1:8080
[INFO] Dashboard is ready.
[INFO] Project file: /tmp/burp_project_temp
[WARN] Temporary project files will be deleted on exit.`
        }
    ]
};
