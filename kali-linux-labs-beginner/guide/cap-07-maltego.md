# **3.2 Maltego: A Teia de Conexões (OSINT)**

Enquanto o Nmap mapeia máquinas, o **Maltego** mapeia relacionamentos.

## **Origem Histórica**

Desenvolvido pela Paterva na África do Sul e lançado em 2008, o Maltego trouxe a visualização de grafos para o OSINT (Open Source Intelligence).11 Antes dele, desenhávamos conexões em quadros brancos ou blocos de notas.

## **Função e Prática**

O Maltego permite que você parta de uma única informação (um e-mail, um domínio, um nome) e expanda isso para encontrar toda a infraestrutura e pegada digital de um alvo.

1. Abra o Maltego no Kali (Community Edition requer registro gratuito).12  
2. Arraste uma entidade "Domain" para o centro.  
3. Execute "Transforms" (Transformações). Ex: *Domain to DNS Name*.  
4. O Maltego consultará servidores públicos e desenhará graficamente os servidores de e-mail (MX), servidores web (WWW) e nomes de domínio.  
5. Isso ajuda a entender a superfície de ataque externa de uma organização sem enviar um único pacote malicioso.13
