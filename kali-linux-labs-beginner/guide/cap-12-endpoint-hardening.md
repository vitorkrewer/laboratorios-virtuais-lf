# Endpoint e Hardening Linux

## Objetivo de aprendizagem

Você aprenderá a investigar um endpoint por consultas e a interpretar recomendações de hardening como um plano de melhoria contínua.

## 1. osquery: o sistema operacional como banco de dados

osquery expõe informações do endpoint em tabelas consultáveis. Essa abordagem ajuda a trocar perguntas vagas por hipóteses explícitas.

```bash
osqueryi "SELECT pid, name, path FROM processes WHERE name = 'python3';"
```

A pergunta é: *quais processos Python existem e qual é sua origem?* Não conclua que um processo é malicioso apenas pelo nome; compare o caminho com a baseline aprovada.

Consulte usuários com shell de login:

```bash
osqueryi "SELECT username, uid, shell FROM users WHERE shell != '/usr/sbin/nologin';"
```

E revise serviços em execução:

```bash
osqueryi "SELECT name, status FROM systemd_units WHERE status = 'running';"
```

## 2. Baseline: o que é normal?

Segurança de endpoint começa por saber o que deveria existir. Uma baseline pode incluir:

- contas autorizadas;
- serviços esperados;
- processos comuns por função;
- portas que devem estar em escuta;
- versões de pacotes críticas.

No Sandbox, explore os dados sintéticos:

```bash
ip a
ss -tulpn
tree ~/training
```

## 3. Lynis: recomendações de hardening

Lynis ajuda a avaliar configuração e boas práticas em Linux.

```bash
lynis audit system
```

Depois, consulte as recomendações:

```bash
lynis show suggestions
```

Não aplique tudo sem avaliar. Para cada recomendação, responda:

1. Qual risco ela reduz?
2. Qual serviço ou usuário será afetado?
3. Existe janela de manutenção?
4. Como desfazer a alteração se ocorrer indisponibilidade?

## 4. Prioridade de correções

Uma ordem razoável é:

1. Exposição de administração remota desnecessária.
2. Patches de segurança pendentes.
3. Permissões excessivas em arquivos e diretórios.
4. Serviços não utilizados.
5. Monitoramento e registro de mudanças.

## Desafio prático

Execute `lynis audit system`, selecione uma recomendação e escreva um plano curto contendo risco, mudança proposta, validação e rollback.
