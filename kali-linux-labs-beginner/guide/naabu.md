# Naabu: O Scanner de Portas Minimalista

Função: Enquanto o Nmap é complexo e cheio de opções, o Naabu tem um único objetivo: listar portas abertas o mais rápido possível. Ele foca em confiabilidade e simplicidade, usando scans SYN/CONNECT otimizados.
Exemplo Prático:

`naabu -host 192.168.56.101`

Em segundos, ele cospe uma lista de portas abertas. A grande vantagem é que ele pode ser "encadeado" (pipe) com outras ferramentas. Você usa o Naabu para achar as portas e joga o resultado para o Nmap ou Nuclei analisarem apenas o que está aberto, economizando tempo.