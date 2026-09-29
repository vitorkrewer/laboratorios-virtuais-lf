# Resposta a Incidentes: Da Evidência à Decisão

## Objetivo de aprendizagem

Esta etapa conecta telemetria, alertas, endpoint e DevSecOps em um fluxo de resposta responsável.

## 1. Um incidente começa com uma pergunta

Alertas isolados não são um incidente confirmado. A investigação começa com uma hipótese testável:

> A estação `10.20.0.15` consultou um domínio não aprovado e depois iniciou uma conexão externa relacionada?

Para responder, reúna evidências de fontes distintas:

```bash
zeek-cut query < dns.log
zeek-cut id.orig_h id.resp_h service < conn.log
jq 'select(.alert.severity <= 2)' alerts/eve.json
```

## 2. O ciclo de resposta

```text
Preparar -> Detectar -> Analisar -> Conter -> Erradicar -> Recuperar -> Aprender
```

| Fase | Pergunta-chave | Evidência esperada |
| --- | --- | --- |
| Detectar | O que chamou atenção? | Alerta ou desvio da baseline |
| Analisar | É real? Qual o escopo? | Logs correlacionados |
| Conter | Como reduzir impacto? | Bloqueio, isolamento ou limitação |
| Erradicar | Qual causa precisa ser removida? | Correção de código/configuração |
| Recuperar | O serviço voltou seguro? | Monitoramento e validação |
| Aprender | O que evita repetição? | Regra, playbook ou melhoria de processo |

## 3. Registro mínimo de incidente

Um bom registro técnico contém:

- **Quando:** horário e fuso.
- **Onde:** ativo, usuário ou serviço afetado.
- **O quê:** alerta, indicador ou comportamento observado.
- **Evidência:** referência a logs, hashes ou eventos.
- **Impacto:** confirmado, provável ou ainda desconhecido.
- **Ação:** contenção realizada e responsável.
- **Próximo passo:** validação, monitoramento ou escalonamento.

## 4. Comunicação responsável

Não exponha dados pessoais, tokens ou detalhes desnecessários ao compartilhar evidências. Separe fatos observados de hipóteses e registre incertezas claramente.

## Exercício integrador

Use a PCAP e os logs do Sandbox para montar uma nota de incidente de cinco linhas. Depois proponha uma melhoria preventiva: uma regra Suricata, uma verificação Gitleaks ou uma baseline osquery.
