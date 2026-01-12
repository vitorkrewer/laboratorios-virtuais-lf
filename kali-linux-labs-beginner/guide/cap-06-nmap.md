# **Nmap: O Cartógrafo da Rede**

Se existe uma ferramenta que define a carreira de segurança, é o **Nmap (Network Mapper)**. Ele é onipresente, poderoso e, surpreendentemente, antigo.


## **Origem Histórica: O Legado de Fyodor**

O Nmap foi lançado em setembro de 1997 por Gordon Lyon, conhecido no submundo como "Fyodor". Ele publicou o código-fonte na famosa revista hacker *Phrack* (Edição 51, Artigo 11).6 Na época, varrer a internet era uma tarefa manual e inconsistente. O Nmap automatizou a descoberta de hosts e portas com uma precisão matemática. Ele se tornou um ícone pop, aparecendo em filmes como *Matrix Reloaded* (Trinity usa o Nmap real para hackear a estação de energia), *O Ultimato Bourne* e *Duro de Matar 4.0*. Não é apenas uma ferramenta; é um pedaço da cultura hacker.7

## **Função e Mecânica**

A função primária do Nmap é responder a três perguntas: "Quem está vivo?", "Quais portas estão abertas?" e "O que está rodando nessas portas?".  
Ele faz isso enviando pacotes IP "artesanais" (raw packets) e analisando as respostas. É como jogar uma pedra na escuridão e ouvir o barulho para saber se bateu em metal, madeira ou água.

## **Prática no Laboratório: A Tríade do Reconhecimento**

No seu terminal, aponte para o IP da Metasploitable (vamos supor 192.168.56.101).

**Técnica 1: O Scan Furtivo (SYN Scan)**

```bash
sudo nmap \-sS 192.168.56.101
```

* **O que acontece:** O Nmap inicia o aperto de mão TCP (Three-way Handshake). Ele envia um SYN (pedido de conexão). Se a porta estiver aberta, o alvo responde SYN-ACK. Neste momento, o Nmap envia um RST (Reset) e derruba a conexão abruptamente.  
* **Por que usar:** Como a conexão nunca é completada, muitas aplicações não registram o acesso nos seus logs. É o método padrão por ser rápido e "silencioso".8

**Técnica 2: O Scan de Versão (Service Version)**

```bash
nmap \-sV 192.168.56.101
```

* **O que acontece:** Saber que a porta 80 está aberta é inútil. Saber que é um *Apache 2.2.8* é ouro. O Nmap conversa com a porta, analisa os banners de boas-vindas e compara com um banco de dados gigantesco de assinaturas para determinar o software exato e sua versão. Isso é vital para encontrar CVEs (vulnerabilidades conhecidas) específicas.8

**Técnica 3: O Scan Agressivo (O "Tudo Incluso")**

```bash
nmap \-A \-T4 192.168.56.101
```

* **\-A:** Ativa detecção de Sistema Operacional (-O), detecção de versão (-sV), scripts de automação (-sC) e traceroute.  
* **\-T4:** Define a velocidade (Timing). T0 é paranoico (super lento para evadir IDS), T5 é insano (pode derrubar o servidor). T4 é o padrão agressivo ideal para redes locais (LAN).9
