# DevSecOps: Segurança Antes do Deploy

## Objetivo de aprendizagem

Este capítulo apresenta controles que aproximam desenvolvimento e segurança: análise de dependências, revisão estática de código e prevenção de segredos em Git.

## 1. Segurança como feedback rápido

DevSecOps não significa adicionar uma etapa de aprovação no fim do projeto. Significa entregar feedback cedo, próximo de quem escreve o código.

```text
Código -> revisão automática -> build -> teste -> deploy
             |                 |
        Semgrep/Gitleaks      Trivy
```

O resultado de uma ferramenta deve abrir uma conversa técnica: qual é o risco? O dado é explorável? Qual correção tem menor impacto?

## 2. Trivy: dependências e imagens de container

Trivy encontra componentes conhecidos em imagens ou repositórios e cruza versões com vulnerabilidades catalogadas.

```bash
trivy image learningfly/webapp:1.0
```

Para começar pela prioridade mais alta:

```bash
trivy image --severity HIGH learningfly/webapp:1.0
```

Um achado não basta para decidir. Verifique:

- a versão instalada e a versão corrigida;
- se o componente está exposto no fluxo da aplicação;
- se existe atualização compatível;
- se a correção pode ser validada no pipeline.

## 3. Semgrep: padrões de risco no código

Semgrep é uma ferramenta SAST: lê o código sem executá-lo. Isso permite encontrar práticas inseguras antes do deploy.

```bash
semgrep --config auto demo-api
```

Uma integração comum para pipelines é JSON:

```bash
semgrep --config p/security-audit --json demo-api
```

**Regra de ouro:** um finding não é automaticamente uma vulnerabilidade. O analista precisa confirmar a origem do dado, seu caminho até a função sensível e as proteções existentes.

## 4. Gitleaks: segredos não pertencem ao Git

Tokens, senhas e chaves nunca devem estar em código-fonte. Mesmo depois de apagar uma linha, o segredo pode continuar no histórico.

```bash
gitleaks detect --source demo-repo
```

A prevenção deve ocorrer antes do commit:

```bash
gitleaks protect --staged
```

Quando um segredo real vaza, o procedimento correto é:

1. Revogar ou rotacionar a credencial imediatamente.
2. Remover a referência do código e mover a configuração para um cofre/variável de ambiente.
3. Avaliar a necessidade de reescrever o histórico.
4. Adicionar controles preventivos no pre-commit e no CI.

## 5. Pipeline mínimo recomendado

| Etapa | Controle | Resultado esperado |
| --- | --- | --- |
| Pré-commit | Gitleaks | Bloquear segredo acidental |
| Pull Request | Semgrep | Apontar padrões de código para revisão |
| Build | Trivy | Identificar risco de dependências/imagem |
| Pós-deploy | Monitoramento | Detectar comportamento fora da baseline |

## Desafio prático

No Sandbox, execute as três ferramentas e produza uma priorização: qual item deve ser corrigido primeiro, quem é o responsável provável e como você verificaria a correção?
