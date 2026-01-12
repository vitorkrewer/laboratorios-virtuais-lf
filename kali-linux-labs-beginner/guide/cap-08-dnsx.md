# **4.1 Dnsx: O Resolvador Turbo**

Função: O dnsx é um canivete suíço para DNS. Imagine que você tem uma lista de 50.000 subdomínios de uma grande empresa. O Nmap levaria uma eternidade para resolver todos. O dnsx faz isso em minutos, lidando com wildcards e múltiplos resolvers.  
Exemplo Prático:

```bash

cat lista\_subdominios.txt | dnsx \-a \-resp

Este comando lê a lista, consulta os registros A (endereços IP) de todos eles e exibe a resposta. É a base para qualquer automação de reconhecimento em larga escala.
