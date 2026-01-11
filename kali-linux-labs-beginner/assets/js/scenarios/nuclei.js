
export const data = {
    id: "nuclei",
    title: "Nuclei: Scanner de Vulnerabilidades Avançado",
    intro: "O Nuclei é uma ferramenta de scan baseada em templates YAML. É extremamente rápido e customizável, usado para encontrar vulnerabilidades conhecidas (CVEs), configurações incorretas e tecnologias expostas.",
    steps: [
        {
            step: 1,
            instruction: "Vamos começar com um scan básico de tecnologias no alvo <b>testphp.vulnweb.com</b>. O Nuclei já vem com templates para detectar tech stacks.",
            command: "nuclei -u http://testphp.vulnweb.com -t technologies/",
            hint: "A flag -u define a URL e -t define a pasta de templates.",
            output: `
                     __     _
   ____  __  _______/ /__  (_)
  / __ \\/ / / / ___/ / _ \\/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\\__,_/\\___/_/\\___/_/   v2.9.8

		projectdiscovery.io

[INF] Loading templates...
[INF] Loaded 235 templates
[INF] Templates loaded for scan: 235
[2024-01-10 10:15:32] [tech-detect:nginx] [http] [info] http://testphp.vulnweb.com [nginx/1.19.0]
[2024-01-10 10:15:33] [tech-detect:php] [http] [info] http://testphp.vulnweb.com [PHP/7.4.3]`
        },
        {
            step: 2,
            instruction: "Agora vamos procurar por vulnerabilidades críticas (CVEs). O Nuclei brilha aqui, pois a comunidade mantém os templates sempre atualizados.",
            command: "nuclei -u http://testphp.vulnweb.com -t cves/ -s critical",
            hint: "A flag -s (severity) filtra apenas vulnerabilidades críticas.",
            output: `[INF] Loading templates...
[INF] Loaded 560 templates
[INF] Templates loaded for scan: 560
[2024-01-10 10:16:01] [CVE-2017-12615] [http] [critical] http://testphp.vulnweb.com/tomcat/PUT
[2024-01-10 10:16:05] [CVE-2018-11776] [http] [critical] http://testphp.vulnweb.com/struts2
[INF] Scan finished in 4s.`
        },
        {
            step: 3,
            instruction: "Podemos encadear ferramentas. Suponha que recuperamos URLs com `waybackurls` e salvamos em uls.txt. Vamos passar essa lista para o Nuclei.",
            command: "nuclei -l urls.txt -t exposed-panels/",
            hint: "A flag -l aceita uma lista de URLs.",
            output: `[INF] Loading templates...
[INF] Loaded 45 templates
[2024-01-10 10:18:12] [phpmyadmin-panel] [http] [info] http://testphp.vulnweb.com/phpmyadmin/
[2024-01-10 10:18:14] [login-panel] [http] [info] http://admin.testphp.vulnweb.com/login`
        }
    ]
};
