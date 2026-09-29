# Graph & RAG Lab - Bancos de Dados em Grafo e IA Contextual 🕸️

![Status](https://img.shields.io/badge/status-active-success.svg)
![Área](https://img.shields.io/badge/área-Grafos_&_IA-blueviolet)
![Execução](https://img.shields.io/badge/execução-100%25_local-green)

O **Graph & RAG Lab** é um laboratório didático interativo para estudantes de Computação, Dados e Inteligência Artificial aprenderem os fundamentos de **Bancos de Dados em Grafo**, **Cypher**, **Retrieval-Augmented Generation (RAG)** e **GraphRAG** diretamente no navegador.

[🔗 Acessar Laboratório Online](https://vitorkrewer.github.io/laboratorios-virtuais-lf/graph-rag-lab/)

---

## Objetivos de Aprendizagem

- Distinguir dados relacionais de dados orientados a grafo.
- Identificar nós, propriedades, relações e rótulos.
- Ler e experimentar padrões de consulta em Cypher usando `MATCH` e `RETURN`.
- Compreender as três etapas de RAG: pergunta, recuperação e geração fundamentada.
- Explicar quando o GraphRAG traz vantagem sobre uma busca vetorial isolada.

## Módulos Interativos

### Grafo de Conhecimento & Cypher

- Visualização navegável de nós de Pessoa, Tecnologia, Conceito e Projeto.
- Inspeção de propriedades e relações de cada entidade.
- Console Cypher com exemplos prontos para `MATCH`, relações tipadas e consultas de caminhos.
- Resultados tabulares que tornam a leitura do padrão do grafo explícita.

### Oficina Cypher: Construção Guiada no Estilo Scratch

- Trilha interativa explicando, em sequência, `MATCH`, relações tipadas, `WHERE` e `RETURN`.
- Construtor visual de padrões: escolha rótulos de origem/destino, tipo de relação, filtro opcional e formato do resultado.
- Preview ao vivo da consulta produzida e botões para enviar a consulta ao editor ou executá-la imediatamente.
- Biblioteca pesquisável com exemplos para `MATCH`, `WHERE`, `RETURN`, caminhos multi-hop, `CREATE` de nós, `CREATE` de relações e `DETACH DELETE`.
- Interpretador local que executa os padrões sobre o grafo em memória, possibilitando criar, conectar e remover entidades no ambiente seguro do navegador.

### Pipeline RAG Explicável

- Base de conhecimento local com chunks pedagógicos.
- Recuperação por palavras-chave/similaridade simulada e pontuação de relevância.
- Exibição dos chunks usados antes da resposta.
- Resposta fundamentada com referências às fontes recuperadas.

### Biblioteca Didática

- Comparação entre RAG vetorial e GraphRAG.
- Fundamentos de embeddings, chunks, relações multi-hop e grafos de conhecimento.
- Cenários reais: recomendação, redes sociais, dependências de software, fraude e busca contextual.

## Arquitetura

A primeira versão é inteiramente client-side e deliberadamente determinística: não depende de serviços, API keys ou modelos de IA externos. Isso permite que docentes demonstrem o fluxo completo de RAG, inclusive as fontes recuperadas, sem custos nem riscos de privacidade.

```text
Pergunta do aluno
      ↓
Recuperador local de documentos
      ↓
Chunks relevantes + relevância
      ↓
Gerador didático com citações
```

O grafo e as consultas Cypher também são simulados localmente. Em uma evolução futura, o mesmo modelo poderá ser conectado a Neo4j AuraDB, FalkorDB ou Memgraph e a um provedor de embeddings.

## Como Executar Localmente

Use um servidor HTTP local por causa dos arquivos JavaScript:

```bash
cd graph-rag-lab
python -m http.server
```

Abra `http://localhost:8000` no navegador.

## Licença

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — uso, modificação e compartilhamento não comercial com atribuição a Vitor Krewer.
