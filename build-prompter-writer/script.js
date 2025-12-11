// Gerador de Prompt - Sistema com 4 Templates
let currentTemplate = 'template1';

// Templates disponíveis
const templates = {
    template1: {
        name: 'Material Didático Geral',
        description: 'Template versátil para criação de diversos tipos de material didático educacional.',
        template: `1. Título/Identificação do Projeto:
Criação de material didático para a disciplina: [nomeDisciplina]

2. Objetivo Principal:
Elaborar o conteúdo completo de [tipoMaterial] sobre [nomeUnidade], com foco em [focoMaterial].

3. Público-Alvo:
* Destinatários: [tipoPublico].
* Nível de Conhecimento Prévio Esperado: [nivelInstrucao].
* Abordagem Pedagógica:
  * [X] Foco Andragógico: Sim. Enfatizar os seguintes pontos:
    * Relevância Imediata: Conectar cada método numérico a um problema físico concreto.
    * Conexão com Experiências Prévias: Relacionar os conceitos com a base de conhecimento em psicologia.
    * Autonomia do Aprendiz: Estruturar o material para permitir estudo autodirigido.
    * Orientação para Resolução de Problemas: resolução de questões para a prova do concurso.

4. Objetivos Gerais de Aprendizagem:
Ao final do estudo deste material, o estudante deverá ser capaz de: [objetivosAprendizagem].

5. Fontes de Conteúdo e Referencial Teórico:
* Base Principal: O conteúdo deve ser fundamentado em artigos, livros e teses acadêmicas. Priorize fortemente fontes em língua portuguesa disponíveis em bases como SciELO, Google Scholar, Periódicos CAPES e repositórios de universidades brasileiras/portuguesas.
* Critérios de Seleção: Priorizar publicações dos últimos 10 anos, obras canônicas da área (mesmo que mais antigas), e fontes que disponibilizem o PDF para consulta.
* Idioma: Prioridade para fontes em português; fontes em inglês são aceitáveis para conceitos fundamentais ou quando não houver equivalentes em português.

6. Estrutura Detalhada e Conteúdo Programático:
[conteudoProgramatico]

* Conclusão/Considerações Finais: Síntese dos métodos abordados, reforço da importância da análise crítica dos resultados numéricos e sugestões de tópicos avançados para estudo futuro.
* Referências Bibliográficas: Seção final com a lista completa de referências, formatada conforme a Seção 8.

[ELEMENTOS_DIDATICOS]

8. Normas para Citações e Referências (Instrução Aprimorada)
* Citação no Texto: Todas as afirmações, conceitos e dados extraídos de fontes externas devem ser acompanhados de sua respectiva citação indireta no formato ABNT (SOBRENOME, ANO).
* Lista de Referências Final:
  * Ao final do documento, crie a seção "Referências".
  * Liste todas e somente as fontes citadas no texto, em ordem alfabética de sobrenome.
  * Formate cada entrada de forma completa e rigorosa segundo a ABNT NBR 6023. Analise os metadados das fontes para obter todas as informações necessárias (autores, título, local, editora, ano, volume, páginas, etc.).
  * (Opcional) Separe a lista em "Bibliografia Básica" (fontes centrais, mais citadas) e "Bibliografia Complementar" (fontes de apoio).
* Tabela Resumo de Fontes Utilizadas:
  * Ao final do material, antes da lista de Referências, insira a seguinte tabela em Markdown. Ela servirá como um índice rápido das fontes e um guia para a citação correta.

| Fonte (Título do Artigo/Livro) | Citação no Texto (ABNT) | Link de Acesso |
|---|---|---|
| Título completo da primeira fonte | (SOBRENOME, ANO) | Link direto para o PDF/página |
| Título completo da segunda fonte | (SOBRENOME, ANO) | Link direto para o PDF/página |
| ... | ... | ... |

9. Linguagem e Tom:
[LINGUAGEM_TOM]


10. Formato de Saída:
Entregar o conteúdo em formato de texto estruturado, utilizando marcações de título (H1 para o título do material, H2 para capítulos, H3 para seções internas).

11. Instruções Adicionais:
* Evite cópia direta de trechos (plágio). Realize a paráfrase das informações, sempre atribuindo o crédito pela citação.
* Sempre que possível, compare diferentes métodos para resolver o mesmo tipo de problema, apontando vantagens e desvantagens de cada um.
* O foco é a criação de um material autossuficiente e de alta qualidade pedagógica para o público-alvo definido.`
    },
    
    template2: {
        name: 'Fichamento Acadêmico',
        description: 'Template especializado para criação de fichamentos de textos acadêmicos, livros e artigos científicos.',
        template: `Você é um especialista em análise de textos acadêmicos e fichamentos. Sua tarefa é criar um fichamento detalhado e estruturado do seguinte material:

**INFORMAÇÕES DO MATERIAL:**
- Tipo de Material: [tipoMaterialFichamento]
- Título: [nomeUnidade]
- Autor(es): [autor]
- Fonte: [fonte]
- Tipo de Fichamento: [tipoFichamento]

**INSTRUÇÕES PARA O FICHAMENTO:**

1. **Identificação Bibliográfica Completa:**
   - Apresente a referência completa do material conforme ABNT
   - Inclua todas as informações bibliográficas disponíveis

2. **Resumo da Obra/Texto:**
   - Apresente uma síntese clara e objetiva do conteúdo
   - Destaque os pontos principais e argumentos centrais
   - Mantenha a fidelidade às ideias do autor

3. **Estrutura do Fichamento:**
   - Organize o conteúdo de forma lógica e sequencial
   - Use citações diretas quando necessário (com páginas)
   - Inclua comentários e observações pessoais quando apropriado

4. **Análise Crítica (se aplicável):**
   - Avalie a consistência dos argumentos
   - Identifique pontos fortes e fracos
   - Relacione com outros autores/teorias quando relevante

5. **Palavras-chave e Conceitos:**
   - Liste os principais conceitos abordados
   - Defina termos técnicos importantes

6. **Aplicabilidade:**
   - Indique possíveis aplicações do conhecimento
   - Sugira conexões com outras áreas de estudo

**FORMATO DE SAÍDA:**
Estruture o fichamento de forma clara e acadêmica, utilizando marcações apropriadas e mantendo rigor científico na apresentação das informações.`
    },
    
    template3: {
        name: 'Concursos Públicos',
        description: 'Template focado na criação de apostilas e materiais didáticos para preparação em concursos públicos.',
        template: `PARTE 1: ESPECIFICAÇÕES DO MATERIAL DIDÁTICO (MODIFIQUE AQUI)

1. Identificação do Material:
Disciplina: [disciplinaConcurso]
Concurso/Área de Foco: [concursoAreaFoco]

2. Público-Alvo:
Nível do Candidato: [nivelCandidato]

3. Conteúdo Programático (Tópicos da Apostila):
[conteudoProgramatico]

4. Estilo de Ensino e Linguagem:
Tom de Voz: [tomVoz]
Tipo de Linguagem: [tipoLinguagem]

[RECURSOS_DIDATICOS]

6. Glossário de Termos Técnicos:
[glossario]

---

PARTE 2: INSTRUÇÕES PARA O CHATGPT (NÃO MODIFIQUE)

Com base nas especificações acima, crie uma apostila completa e didática para concursos públicos seguindo estas diretrizes:

**ESTRUTURA OBRIGATÓRIA:**

1. **Capa e Apresentação**
   - Título da apostila
   - Disciplina e área de foco
   - Apresentação do material e metodologia

2. **Sumário Detalhado**
   - Lista todos os tópicos e subtópicos
   - Numeração clara e organizada

3. **Desenvolvimento do Conteúdo**
   - Cada tópico deve ser desenvolvido de forma completa
   - Linguagem adequada ao nível do candidato
   - Exemplos práticos e aplicações

4. **Recursos Didáticos Integrados**
   - Inclua os recursos selecionados de forma natural no texto
   - Posicione estrategicamente ao longo do conteúdo

5. **Exercícios e Questões**
   - Questões de fixação por tópico
   - Questões de concursos anteriores quando aplicável
   - Gabarito comentado

6. **Material de Apoio**
   - Resumos e esquemas
   - Glossário de termos técnicos
   - Bibliografia recomendada

**DIRETRIZES DE QUALIDADE:**

- **Didática**: Explique conceitos complexos de forma simples
- **Prática**: Conecte teoria com aplicação em provas
- **Atualização**: Use legislação e jurisprudência atuais
- **Organização**: Estrutura lógica e progressiva
- **Motivação**: Mantenha tom encorajador e objetivo

**FORMATO DE ENTREGA:**
- Texto estruturado com marcações claras (H1, H2, H3)
- Linguagem adequada ao perfil do candidato
- Conteúdo completo e autossuficiente para estudo
- Foco na aprovação em concursos públicos`
    },

    template4: {
        name: 'Livro Didático - Nível Superior',
        description: 'Template avançado para a criação de capítulos de livros didáticos para o ensino superior, com foco em rigor acadêmico e normas ABNT.',
        template: `1. Persona e Atuação:
Assuma a persona de um Designer Instrucional e Pesquisador Acadêmico Sênior, especialista na disciplina de [nomeDisciplina]. Sua missão é desenvolver um capítulo de livro didático que seja pedagogicamente eficaz, academicamente rigoroso e estritamente aderente às normas da ABNT. Você deve atuar com precisão, clareza e objetividade.

2. Título/Identificação do Projeto:
Projeto: Criação de material didático.
Disciplina: [nomeDisciplina]
Tipo de Material: [tipoMaterial]
Unidade/Capítulo: [nomeUnidade]
Foco do Material: [focoMaterial]

3. Público-Alvo:
Destinatários: [tipoPublico]
Nível de Conhecimento Prévio Esperado: [nivelInstrucao]
Abordagem Pedagógica (Andragogia):
Relevância Imediata: [relevanciaImediata]
Conexão com Experiências Prévias: [conexaoExperiencias]
Autonomia do Aprendiz: Estruturar o material para permitir estudo autodirigido, com seções bem definidas e progressão lógica.
Orientação para Problemas: [orientacaoProblemas]

4. Objetivos Gerais de Aprendizagem:
Ao final do estudo deste material, o estudante deverá ser capaz de:
[objetivosAprendizagem]

PARTE B: PESQUISA E CONTEÚDO

5. Fontes de Conteúdo e Estratégia de Pesquisa (Instrução Aprimorada):
 Bases de Dados Prioritárias:
    1.  Google Books e Google Scholar: Prioridade máxima para encontrar livros, capítulos e obras canônicas.
    2.  SciELO, Periódicos CAPES e Repositórios Universitários: Para artigos, teses e dissertações.
 Critérios de Seleção:
    Atualidade: Priorizar publicações dos últimos 10 anos.
    Obras Canônicas: Incluir obras clássicas e autores de referência na área, mesmo que mais antigas.
    Idioma: Prioridade absoluta para fontes em português. Fontes em inglês são aceitáveis apenas para conceitos fundamentais sem tradução consolidada ou quando citadas por autores brasileiros.
 Estratégia de Busca e Priorização de Fontes:
     Priorização de Livros para Conceitos Fundamentais: Ao definir termos-chave, teorias centrais, conceitos históricos e fundamentos da disciplina, dê prioridade máxima e obrigatória a citações de livros. Utilize o Google Books para encontrar trechos e números de página para citações diretas.
     Uso de Artigos: Artigos científicos são preferíveis para apresentar dados recentes, estudos de caso, pesquisas aplicadas e debates contemporâneos sobre as teorias já estabelecidas pelos livros.
Critérios de Seleção:
Atualidade: Priorizar publicações dos últimos 10 anos.
Obras Canônicas: Incluir obras clássicas e autores de referência na área, mesmo que mais antigas.
Idioma: Prioridade absoluta para fontes em português. Fontes em inglês são aceitáveis apenas para conceitos fundamentais sem tradução consolidada ou quando citadas por autores brasileiros.

6. Estrutura Detalhada e Conteúdo Programático:
[conteudoProgramatico]

PARTE C: NORMAS E FORMATAÇÃO
7. Elementos Didáticos a Incluir:
No início de cada seção, liste os objetivos de aprendizagem específicos.
Utilize recursos visuais (indicando [TABELAS]) para ilustrar conceitos complexos.
Crie quadros de destaque:
"Atenção": Para pontos críticos, erros comuns ou limitações.
"Nota": Para informações complementares ou curiosidades.
"Saiba Mais": Com sugestões de leitura, vídeos ou artigos para aprofundamento.
"Estudo de Caso": Para aplicar a teoria a um exemplo prático e detalhado.

8. Normas ABNT para Citações e Referências (Instrução Detalhada - NBR 6023 e 10520):
 Regra Fundamental: Todas as afirmações, conceitos e dados que não sejam de autoria própria DEVEM ser referenciados. Evite plágio a todo custo.

8.1. Regra de Atribuição por Parágrafo (Instrução Crítica)
 Obrigatoriedade: Cada parágrafo que contenha informações, conceitos ou dados extraídos de uma fonte deve, obrigatoriamente, terminar com a respectiva citação no formato ABNT: \`(SOBRENOME, ANO)\` para paráfrases ou \`(SOBRENOME, ANO, p. X)\` para citações diretas.
 Exceção: Parágrafos puramente introdutórios ou de transição podem não ter citação. A prioridade, contudo, é a atribuição constante.

8.2. Tipos de Citação no Texto
 Citação Indireta (Paráfrase): A ideia do autor é apresentada com suas próprias palavras. Formato: (SOBRENOME, ANO).
     Exemplo: A análise do comportamento é fundamental para a terapia (Skinner, 1953).
 Citação Direta Curta (Até 3 linhas): Transcrição exata no corpo do parágrafo, entre aspas duplas. Formato: (SOBRENOME, ANO, p. X).
     Exemplo: Segundo Geertz (1989, p. 20), a cultura é uma "teia de significados" que o próprio homem teceu.
 Citação Direta Longa (Mais de 3 linhas): Parágrafo separado, recuo de 4 cm, fonte menor, espaçamento simples, sem aspas. Formato: (SOBRENOME, ANO, p. X).
 Citação de Citação (Apud): Utilize APENAS quando o documento original for inacessível. Formato: (SOBRENOME DO AUTOR ORIGINAL apud SOBRENOME DO AUTOR DA OBRA CONSULTADA, ANO, p. X).
     Exemplo: Conforme a teoria de Marx (1867 apud Giddens, 2005, p. 45), a luta de classes é o motor da história.

Lista de Referências Final:
Crie a seção "Referências" ao final do documento.
Liste todas e somente as fontes citadas no texto, em ordem alfabética.
Formate cada entrada rigorosamente segundo a ABNT NBR 6023, analisando os metadados para obter todas as informações necessárias (autores, título, subtítulo, edição, local, editora, ano, etc.).
Tabela Resumo de Fontes Utilizadas:
Ao final do material, antes da lista de Referências, insira a seguinte tabela em Markdown:
| Fonte (Título do Artigo/Livro) | Citação no Texto (Exemplo) | Link de Acesso |
|---|---|---|
| Título completo da primeira fonte | (SOBRENOME, ANO) | Link direto para o PDF/página |
| Título completo da segunda fonte | (SOBRENOME, ANO, p. X) | Link direto para o PDF/página |
| ... | ... | ... |

9. Linguagem e Tom:
[LINGUAGEM_TOM]


10. Formato de Saída:
Texto estruturado em Markdown.
Utilize a seguinte hierarquia:
# Título do Capítulo
## Seção Principal
### Subseção`
    }
};

// Função para mudar template
function changeTemplate() {
    const selector = document.getElementById('templateSelector');
    currentTemplate = selector.value;
    
    // Atualizar classe do body para controlar visibilidade
    document.body.className = ''; // Limpa classes anteriores
    if (currentTemplate === 'template1') {
        document.body.classList.add('template-didatico');
    } else if (currentTemplate === 'template2') {
        document.body.classList.add('template-fichamento');
    } else if (currentTemplate === 'template3') {
        document.body.classList.add('template-concursos');
    } else if (currentTemplate === 'template4') {
        document.body.classList.add('template-livro-superior');
    }
    
    // Atualizar descrição do template
    updateTemplateDescription();
    
    // Atualizar preview
    previewPrompt();
}

// Função para mostrar/ocultar informações do template
function showTemplateInfo() {
    const description = document.getElementById('templateDescription');
    if (description.style.display === 'none' || description.innerHTML === '') {
        description.style.display = 'block';
        updateTemplateDescription();
    } else {
        description.style.display = 'none';
    }
}

// Função para atualizar descrição do template
function updateTemplateDescription() {
    const description = document.getElementById('templateDescription');
    const template = templates[currentTemplate];
    description.innerHTML = `<strong>${template.name}:</strong> ${template.description}`;
}

// Função para atualizar campos específicos de fichamento
function updateFichamentoFields() {
    const tipoMaterial = document.getElementById('tipoMaterialFichamento')?.value;
    
    const livroSection = document.getElementById('livroSection');
    const artigoSection = document.getElementById('artigoSection');
    const apostilaSection = document.getElementById('apostilaSection');
    
    if (livroSection) livroSection.style.display = 'none';
    if (artigoSection) artigoSection.style.display = 'none';
    if (apostilaSection) apostilaSection.style.display = 'none';
    
    if (tipoMaterial === 'livro' && livroSection) {
        livroSection.style.display = 'block';
    } else if (tipoMaterial === 'artigo' && artigoSection) {
        artigoSection.style.display = 'block';
    } else if (tipoMaterial === 'apostila' && apostilaSection) {
        apostilaSection.style.display = 'block';
    }
    
    previewPrompt();
}

// Função para coletar dados do formulário
function getFormData() {
    const data = {
        // Campos comuns
        nomeDisciplina: document.getElementById('nomeDisciplina')?.value || '[Nome da Disciplina]',
        tipoMaterial: document.getElementById('tipoMaterial')?.value || '[Tipo de Material]',
        nomeUnidade: document.getElementById('nomeUnidade')?.value || '[Nome da Unidade/Capítulo]',
        focoMaterial: document.getElementById('focoMaterial')?.value || '[Foco do material]',
        tipoPublico: document.getElementById('tipoPublico')?.value || '[Tipo do Público]',
        nivelInstrucao: document.getElementById('nivelInstrucao')?.value || '[Nível de Instrução]',
        objetivosAprendizagem: document.getElementById('objetivosAprendizagem')?.value || '[Objetivos de Aprendizagem]',
        conteudoProgramatico: document.getElementById('conteudoProgramatico')?.value || '[Conteúdo Programático]',
        linguagemTom: document.getElementById('linguagemTom')?.value || 'academica',

        
        // Campos de fichamento
        tipoMaterialFichamento: document.getElementById('tipoMaterialFichamento')?.value || '[Tipo de Material]',
        autorLivro: document.getElementById('autorLivro')?.value || '[Autor]',
        editoraLivro: document.getElementById('editoraLivro')?.value || '[Editora]',
        autorArtigo: document.getElementById('autorArtigo')?.value || '[Autor]',
        revistaArtigo: document.getElementById('revistaArtigo')?.value || '[Revista]',
        autorApostila: document.getElementById('autorApostila')?.value || '[Autor]',
        instituicaoApostila: document.getElementById('instituicaoApostila')?.value || '[Instituição]',
        tipoFichamento: document.getElementById('tipoFichamento')?.value || '[Tipo de Fichamento]',
        
        // Campos de concursos
        disciplinaConcurso: document.getElementById('disciplinaConcurso')?.value || '[Disciplina Concurso]',
        concursoAreaFoco: document.getElementById('concursoAreaFoco')?.value || '[Concurso Area Foco]',
        nivelCandidato: document.getElementById('nivelCandidato')?.value || '[Nível Candidato]',
        tomVoz: document.getElementById('tomVoz')?.value || '[Tom de Voz]',
        tipoLinguagem: document.getElementById('tipoLinguagem')?.value || '[Tipo de Linguagem]',
        glossario: document.getElementById('glossario')?.value || '[Glossário]',
        
        // Campos do Livro Superior (Template 4)
        relevanciaImediata: document.getElementById('relevanciaImediata')?.value || '[Relevância Imediata]',
        conexaoExperiencias: document.getElementById('conexaoExperiencias')?.value || '[Conexão com Experiências Prévias]',
        orientacaoProblemas: document.getElementById('orientacaoProblemas')?.value || '[Orientação para Problemas]',

        // Checkboxes
        objetivosCapitulo: document.getElementById('objetivosCapitulo')?.checked || false,
        recursosVisuais: document.getElementById('recursosVisuais')?.checked || false,
        quadrosAtencao: document.getElementById('quadrosAtencao')?.checked || false,
        bizusDicas: document.getElementById('bizusDicas')?.checked || false,
        questoesComentadas: document.getElementById('questoesComentadas')?.checked || false,
        quadrosComparativos: document.getElementById('quadrosComparativos')?.checked || false,
        mapasMentais: document.getElementById('mapasMentais')?.checked || false,
        jurisprudenciaDoutrina: document.getElementById('jurisprudenciaDoutrina')?.checked || false
    };
    
    return data;
}

function generateLinguagemTom(option) {
    if (option === 'academica') {
        return `
* Estilo: Formal acadêmico, claro, conciso e objetivo.
* Tom: Neutro, imparcial e didático.
* Técnica: Defina jargões técnicos na primeira vez que aparecerem. Utilize analogias para facilitar a compreensão de conceitos abstratos.`;
    } else {
        return `
* Estilo de Linguagem: Casual, estabelecendo uma linguagem de empatia com o interlocutor. Utilizar exemplos para tornar conteúdos complexos mais leves e descontraídos, mantendo a clareza e objetividade de um texto didático.
* Tom: Neutro, imparcial e preciso. Explicar jargões técnicos na primeira vez que aparecerem, utilizando analogias levando em consideração que o aluno é leigo.`;
    }
}


// Função para gerar elementos didáticos
function generateElementosDidaticos(data) {
    const elementos = [];
    
    if (data.objetivosCapitulo) {
        elementos.push(' * [X] Objetivos de aprendizagem específicos no início de cada capítulo.');
    }
    if (data.recursosVisuais) {
        elementos.push(' * [X] Indicação clara de onde recursos visuais (gráficos de convergência, tabelas comparativas, diagramas de fluxo) devem ser inseridos.');
    }
    if (data.quadrosAtencao) {
        elementos.push(' * [X] Quadros de "Atenção" ou "Nota" para destacar pontos críticos, como instabilidades numéricas ou limitações de um método.');
    }
    
    if (elementos.length === 0) return '';
    return '7. Elementos Didáticos a Incluir (Dentro dos Capítulos):\n' + elementos.join('\n');
}

// Função para gerar recursos didáticos de concursos
function generateRecursosDidaticos(data) {
    const recursos = [];
    
    if (data.bizusDicas) {
        recursos.push(' * [X] "Bizus" e Dicas Rápidas: Quadros destacados com dicas de memorização, macetes e informações que facilitam a lembrança durante a prova.');
    }
    if (data.questoesComentadas) {
        recursos.push(' * [X] Questões Comentadas: Incluir de 1 a 3 questões de concursos anteriores por tópico, com resolução detalhada e explicação da resposta correta.');
    }
    if (data.quadrosComparativos) {
        recursos.push(' * [X] Quadros Comparativos: Tabelas que diferenciem institutos similares, destacando semelhanças e diferenças para evitar confusões.');
    }
    if (data.mapasMentais) {
        recursos.push(' * [X] Mapas Mentais: Estruturas visuais que organizem o conteúdo de forma hierárquica, facilitando a revisão e memorização.');
    }
    if (data.jurisprudenciaDoutrina) {
        recursos.push(' * [X] Jurisprudência e Doutrina: Citações de entendimentos jurisprudenciais relevantes e posições doutrinárias importantes para o tópico.');
    }
    
    if (recursos.length === 0) return '';
    return '5. Recursos Didáticos a Incluir:\n' + recursos.join('\n');
}

// Função para gerar o prompt
function generatePrompt() {
    const data = getFormData();

    const template = templates[currentTemplate];
    if (!template) return "Template não encontrado.";

    let prompt = template.template;
    // Substituir placeholders comuns a vários templates
    prompt = prompt.replace(/\[nomeDisciplina\]/g, data.nomeDisciplina);
    prompt = prompt.replace(/\[tipoMaterial\]/g, data.tipoMaterial);
    prompt = prompt.replace(/\[nomeUnidade\]/g, data.nomeUnidade);
    prompt = prompt.replace(/\[focoMaterial\]/g, data.focoMaterial);
    prompt = prompt.replace(/\[tipoPublico\]/g, data.tipoPublico);
    prompt = prompt.replace(/\[nivelInstrucao\]/g, data.nivelInstrucao);
    prompt = prompt.replace(/\[objetivosAprendizagem\]/g, data.objetivosAprendizagem);
    prompt = prompt.replace(/\[conteudoProgramatico\]/g, data.conteudoProgramatico);
    
    // Substituições específicas por template
    if (currentTemplate === 'template1') {
        const elementosDidaticos = generateElementosDidaticos(data);
        const linguagemTomText = generateLinguagemTom(data.linguagemTom);
        prompt = prompt.replace(/\[LINGUAGEM_TOM\]/g, linguagemTomText);
        prompt = prompt.replace(/\[ELEMENTOS_DIDATICOS\]/g, elementosDidaticos);

    } else if (currentTemplate === 'template2') {
        const linguagemTomText = generateLinguagemTom(data.linguagemTom);
        prompt = prompt.replace(/\[tipoMaterialFichamento\]/g, data.tipoMaterialFichamento);
        prompt = prompt.replace(/\[tipoFichamento\]/g, data.tipoFichamento);
        prompt = prompt.replace(/\[LINGUAGEM_TOM\]/g, linguagemTomText);

        let autor = '[Autor]';
        let fonte = '[Fonte]';
        
        if (data.tipoMaterialFichamento === 'livro') {
            autor = data.autorLivro;
            fonte = data.editoraLivro;
        } else if (data.tipoMaterialFichamento === 'artigo') {
            autor = data.autorArtigo;
            fonte = data.revistaArtigo;
        } else if (data.tipoMaterialFichamento === 'apostila') {
            autor = data.autorApostila;
            fonte = data.instituicaoApostila;
        }
        
        prompt = prompt.replace(/\[autor\]/g, autor);
        prompt = prompt.replace(/\[fonte\]/g, fonte);

    } else if (currentTemplate === 'template3') {
        prompt = prompt.replace(/\[disciplinaConcurso\]/g, data.disciplinaConcurso);
        prompt = prompt.replace(/\[concursoAreaFoco\]/g, data.concursoAreaFoco);
        prompt = prompt.replace(/\[nivelCandidato\]/g, data.nivelCandidato);
        prompt = prompt.replace(/\[tomVoz\]/g, data.tomVoz);
        prompt = prompt.replace(/\[tipoLinguagem\]/g, data.tipoLinguagem);
        prompt = prompt.replace(/\[glossario\]/g, data.glossario);
        
        const recursosDidaticos = generateRecursosDidaticos(data);
        prompt = prompt.replace(/\[RECURSOS_DIDATICOS\]/g, recursosDidaticos);

    } else if (currentTemplate === 'template4') {
        const linguagemTomText = generateLinguagemTom(data.linguagemTom);
        prompt = prompt.replace(/\[relevanciaImediata\]/g, data.relevanciaImediata);
        prompt = prompt.replace(/\[conexaoExperiencias\]/g, data.conexaoExperiencias);
        prompt = prompt.replace(/\[orientacaoProblemas\]/g, data.orientacaoProblemas);
        prompt = prompt.replace(/\[LINGUAGEM_TOM\]/g, linguagemTomText);
    }
    
    return prompt;
}

// Função para preview do prompt
function previewPrompt() {
    const prompt = generatePrompt();
    document.getElementById('promptPreview').textContent = prompt;
}

// Função para copiar prompt
function copyPrompt() {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('successToast'));
        toast.show();
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        alert('Erro ao copiar o prompt. Tente novamente.');
    });
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Definir template inicial
    changeTemplate();
    
    // Adicionar event listeners para todos os campos
    const allFields = document.querySelectorAll('.form-control, .form-select, .form-check-input');
    
    allFields.forEach(field => {
        field.addEventListener('input', previewPrompt);
        field.addEventListener('change', previewPrompt);
    });
    
    // Preview inicial
    previewPrompt();
});