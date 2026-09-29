# SOC e Telemetria de Rede

## Objetivo de aprendizagem

Ao concluir este capítulo, você será capaz de explicar a diferença entre **pacotes**, **logs** e **alertas**, além de correlacionar evidências em uma investigação inicial de segurança.

> Todo comando deste capítulo opera sobre artefatos sintéticos do Learning Fly. Não capture tráfego ou investigue equipamentos reais sem autorização formal.

## 1. Do pacote ao evento investigável

Uma captura PCAP contém pacotes em baixo nível. Ela é valiosa, mas pode ser extensa demais para o trabalho diário de um SOC. Ferramentas de telemetria transformam esses pacotes em registros estruturados.

| Camada | Ferramenta | Pergunta que responde |
| --- | --- | --- |
| Pacote | Wireshark | O que foi transmitido neste fluxo? |
| Log de rede | Zeek | Quais hosts, protocolos e domínios se relacionaram? |
| Detecção | Suricata | Existe um padrão que merece triagem? |

## 2. Wireshark: observar antes de concluir

No laboratório, a PCAP `campus-lab.pcap` é fictícia e somente leitura. Abra-a com um filtro DNS:

```bash
wireshark -r campus-lab.pcap -Y dns
```

O filtro reduz a visualização aos eventos de resolução de nomes. Depois, investigue requisições HTTP:

```bash
wireshark -r campus-lab.pcap -Y http.request
```

**Perguntas que guiam a análise:**

1. Qual estação iniciou a comunicação?
2. Qual domínio foi consultado?
3. O domínio pertence ao inventário aprovado?
4. Existe uma conexão posterior relacionada ao mesmo host?

## 3. Zeek: transformar tráfego em linha do tempo

Zeek produz logs que podem ser tratados como tabelas. No Sandbox, explore primeiro os artefatos:

```bash
tree ~/training/logs
```

Em seguida, extraia o domínio consultado:

```bash
zeek-cut query < dns.log
```

Correlacione a origem com as conexões observadas:

```bash
zeek-cut id.orig_h id.resp_h service < conn.log
```

A investigação madura não parte diretamente para bloqueio. Ela estabelece uma hipótese: *a estação que consultou um domínio não aprovado também iniciou uma conexão HTTP externa?*

## 4. Suricata: alerta não é veredito

Um IDS detecta padrões e gera sinais. Um alerta pode representar ataque, comportamento esperado, teste interno ou uma regra mal calibrada.

```bash
suricata -r soc-training.pcap -l alerts
```

Para validar a sintaxe de uma regra antes da implantação:

```bash
suricata -T -S training.rules
```

Analise um alerta EVE JSON de maior prioridade:

```bash
jq 'select(.alert.severity <= 2)' alerts/eve.json
```

## 5. Processo de triagem

Use este ciclo antes de escalar um alerta:

1. **Confirmar a fonte:** o log foi gerado pelo sensor certo?
2. **Correlacionar:** DNS, conexões, HTTP e endpoint contam a mesma história?
3. **Definir escopo:** há uma estação ou várias?
4. **Classificar impacto:** existe exposição, execução ou apenas tentativa?
5. **Registrar ação:** monitorar, bloquear, isolar ou abrir incidente.

## Desafio prático

Execute os três comandos do capítulo no Sandbox. Escreva uma nota de incidente contendo: ativo afetado, indicador, evidência e recomendação proporcional. Evite concluir que há comprometimento sem evidências suficientes.
