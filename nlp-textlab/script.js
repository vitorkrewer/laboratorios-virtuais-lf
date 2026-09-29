const corpus = [
    { id: 1, label: 'positivo', text: 'O produto chegou rápido e funciona muito bem.', split: 'train' },
    { id: 2, label: 'positivo', text: 'Atendimento excelente, equipe muito atenciosa.', split: 'train' },
    { id: 3, label: 'positivo', text: 'Gostei da qualidade e compraria novamente.', split: 'train' },
    { id: 4, label: 'positivo', text: 'Entrega rápida e embalagem perfeita.', split: 'train' },
    { id: 5, label: 'negativo', text: 'O produto veio quebrado e atrasou muito.', split: 'train' },
    { id: 6, label: 'negativo', text: 'Péssimo atendimento, ninguém respondeu minha mensagem.', split: 'train' },
    { id: 7, label: 'negativo', text: 'A qualidade é ruim e o material parece frágil.', split: 'train' },
    { id: 8, label: 'negativo', text: 'A compra demorou demais e veio incompleta.', split: 'train' },
    { id: 9, label: 'positivo', text: 'Material ótimo, chegou antes do prazo informado.', split: 'test' },
    { id: 10, label: 'negativo', text: 'Produto ruim e entrega muito lenta.', split: 'test' }
];

const stopWords = new Set(['a', 'e', 'o', 'os', 'as', 'um', 'uma', 'muito', 'da', 'do', 'de', 'em', 'no', 'na', 'ao', 'para', 'por', 'com', 'que', 'é', 'foi', 'minha', 'antes']);
const lemmas = { chegou: 'chegar', funciona: 'funcionar', gostei: 'gostar', compraria: 'comprar', veio: 'vir', atrasou: 'atrasar', respondeu: 'responder', parece: 'parecer', demorou: 'demorar', informando: 'informar', informado: 'informar', lenta: 'lento', rápida: 'rápido', ótima: 'ótimo', péssimo: 'péssimo', quebrado: 'quebrar', incompleta: 'incompleto' };
const state = { selectedId: 1, model: null };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function options() {
    return {
        lower: $('#toggle-lower').checked,
        accents: $('#toggle-accents').checked,
        punctuation: $('#toggle-punctuation').checked,
        stops: $('#toggle-stops').checked,
        lemma: $('#toggle-lemma').checked
    };
}

function stripAccents(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function processText(text, config = options()) {
    let normalized = text;
    if (config.lower) normalized = normalized.toLowerCase();
    if (config.accents) normalized = stripAccents(normalized);
    if (config.punctuation) normalized = normalized.replace(/[^\p{L}\p{N}\s-]/gu, ' ');
    const tokensBeforeFiltering = normalized.split(/\s+/).filter(Boolean);
    let tokens = [...tokensBeforeFiltering];
    if (config.stops) tokens = tokens.filter(token => !stopWords.has(token) && !stopWords.has(stripAccents(token)));
    if (config.lemma) tokens = tokens.map(token => lemmas[token] || lemmas[stripAccents(token)] || token);
    return { normalized, tokensBeforeFiltering, tokens };
}

function selectedDocument() { return corpus.find(document => document.id === state.selectedId); }

function renderCorpus() {
    $('#corpus-list').innerHTML = corpus.map(document => `
        <button class="corpus-item ${document.id === state.selectedId ? 'active' : ''}" data-id="${document.id}">
            <span class="corpus-meta"><span>doc ${String(document.id).padStart(2, '0')} · ${document.split}</span><span class="sentiment ${document.label}">${document.label}</span></span>
            <p>${document.text}</p>
        </button>`).join('');
    $$('.corpus-item').forEach(button => button.addEventListener('click', () => { state.selectedId = Number(button.dataset.id); renderAll(); }));
}

function renderPipeline() {
    const document = selectedDocument();
    const result = processText(document.text);
    $('#raw-text').textContent = `"${document.text}"`;
    $('#selected-label').textContent = document.label;
    $('#normalized-output').textContent = result.normalized || '∅';
    $('#token-output').textContent = `[ ${result.tokensBeforeFiltering.join(' | ')} ]`;
    $('#token-chips').innerHTML = result.tokens.length ? result.tokens.map(token => `<b>${token}</b>`).join('') : '<b>∅</b>';
    const removed = result.tokensBeforeFiltering.length - result.tokens.length;
    $('#pipeline-observation').textContent = removed > 0
        ? `${removed} token(s) foram descartados nesta configuração. Isso reduz ruído, mas pode remover contexto útil, como negações.`
        : 'Nenhum token foi descartado. Experimente ativar stop words ou lematização e acompanhe a mudança no vocabulário.';
}

function getTerms(texts, ngramSize) {
    return texts.flatMap(text => {
        const tokens = processText(text).tokens;
        const terms = [...tokens];
        if (ngramSize === 2) for (let index = 0; index < tokens.length - 1; index += 1) terms.push(`${tokens[index]} ${tokens[index + 1]}`);
        return terms;
    });
}

function documentTerms(document, ngramSize) { return getTerms([document.text], ngramSize); }
function termCounts(terms) { return terms.reduce((counts, term) => ({ ...counts, [term]: (counts[term] || 0) + 1 }), {}); }

function renderVectors() {
    const ngramSize = Number($('#ngram-select').value);
    const document = corpus.find(item => item.id === Number($('#vector-document').value)) || selectedDocument();
    const allTerms = corpus.map(item => documentTerms(item, ngramSize));
    const vocabulary = [...new Set(allTerms.flat())].sort();
    const terms = documentTerms(document, ngramSize);
    const counts = termCounts(terms);
    const weights = Object.entries(counts).map(([term, count]) => {
        const documentFrequency = allTerms.filter(itemTerms => itemTerms.includes(term)).length;
        return { term, bow: count, tfidf: count * (Math.log((corpus.length + 1) / (documentFrequency + 1)) + 1) };
    });
    const bow = [...weights].sort((first, second) => second.bow - first.bow || first.term.localeCompare(second.term)).slice(0, 7);
    const tfidf = [...weights].sort((first, second) => second.tfidf - first.tfidf).slice(0, 7);
    renderWeightList('#bow-list', bow, 'bow');
    renderWeightList('#tfidf-list', tfidf, 'tfidf');
    $('#vocabulary-list').innerHTML = vocabulary.slice(0, 34).map(term => `<span>${term}</span>`).join('') + (vocabulary.length > 34 ? `<span>+${vocabulary.length - 34}</span>` : '');
    const nonZero = allTerms.reduce((total, termsInDocument) => total + new Set(termsInDocument).size, 0);
    const sparsity = 1 - (nonZero / (corpus.length * vocabulary.length || 1));
    $('#sparsity-value').textContent = `${(sparsity * 100).toFixed(0)}% esparsa`;
    $('#matrix-note').textContent = `Matriz ${corpus.length} × ${vocabulary.length}: cada linha representa um documento e quase todas as células permanecem em zero.`;
    $('#vocabulary-count').textContent = vocabulary.length;
}

function renderWeightList(selector, weights, field) {
    const largest = Math.max(...weights.map(item => item[field]), 1);
    $(selector).innerHTML = weights.length ? weights.map(item => `<div class="weight-row"><span>${item.term}</span><div class="weight-track"><div class="weight-bar" style="width:${(item[field] / largest) * 100}%"></div></div><small>${item[field].toFixed(field === 'tfidf' ? 2 : 0)}</small></div>`).join('') : '<p class="panel-copy">Nenhum termo disponível.</p>';
}

function buildPythonCode() {
    const config = options();
    const stop = config.stops ? "stop_words=stopwords.words('portuguese')," : '';
    const strip = config.accents ? "strip_accents='unicode'," : '';
    const lower = config.lower ? 'lowercase=True,' : 'lowercase=False,';
    const tokenizer = config.lemma ? "# Para lematização, processe o corpus com spaCy antes da vetorização\n" : '';
    $('#python-code').textContent = `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.model_selection import train_test_split\n\n${tokenizer}vectorizer = TfidfVectorizer(\n    ${lower}\n    ${strip}\n    ${stop}\n    ngram_range=(1, 2)\n)\n\nX = vectorizer.fit_transform(textos_processados)\nprint(X.shape)  # documentos × vocabulário`;
}

function trainModel() {
    const training = corpus.filter(document => document.split === 'train');
    const vocabularyByLabel = { positivo: {}, negativo: {} };
    const totals = { positivo: 0, negativo: 0 };
    training.forEach(document => processText(document.text).tokens.forEach(token => { vocabularyByLabel[document.label][token] = (vocabularyByLabel[document.label][token] || 0) + 1; totals[document.label] += 1; }));
    const vocabulary = new Set([...Object.keys(vocabularyByLabel.positivo), ...Object.keys(vocabularyByLabel.negativo)]);
    state.model = { vocabularyByLabel, totals, vocabulary: [...vocabulary], priors: { positivo: training.filter(item => item.label === 'positivo').length / training.length, negativo: training.filter(item => item.label === 'negativo').length / training.length } };
    const test = corpus.filter(document => document.split === 'test');
    const predictions = test.map(document => ({ expected: document.label, predicted: predict(document.text).label }));
    const correct = predictions.filter(item => item.expected === item.predicted).length;
    const truePositive = predictions.filter(item => item.expected === 'positivo' && item.predicted === 'positivo').length;
    const falsePositive = predictions.filter(item => item.expected === 'negativo' && item.predicted === 'positivo').length;
    const falseNegative = predictions.filter(item => item.expected === 'positivo' && item.predicted === 'negativo').length;
    const precision = truePositive / (truePositive + falsePositive || 1);
    const recall = truePositive / (truePositive + falseNegative || 1);
    const f1 = 2 * precision * recall / (precision + recall || 1);
    const accuracy = correct / test.length;
    $('#accuracy-chip').textContent = `${(accuracy * 100).toFixed(0)}%`;
    $('#model-status').textContent = 'treinado';
    $('#model-status').classList.remove('muted');
    $('#metrics').className = 'metrics-result';
    $('#metrics').innerHTML = `<div><strong>${(accuracy * 100).toFixed(0)}%</strong><span>Acurácia</span></div><div><strong>${precision.toFixed(2)}</strong><span>Precisão</span></div><div><strong>${f1.toFixed(2)}</strong><span>F1-score</span></div>`;
    const cells = [['positivo → positivo', truePositive], ['negativo → positivo', falsePositive], ['positivo → negativo', falseNegative], ['negativo → negativo', predictions.filter(item => item.expected === 'negativo' && item.predicted === 'negativo').length]];
    $('#confusion-matrix').className = 'confusion-matrix show';
    $('#confusion-matrix').innerHTML = cells.map(([label, value]) => `<div class="matrix-cell"><strong>${value}</strong>${label}</div>`).join('');
}

function predict(text) {
    if (!state.model) return null;
    const tokens = processText(text).tokens;
    const scores = {};
    ['positivo', 'negativo'].forEach(label => {
        scores[label] = Math.log(state.model.priors[label]);
        tokens.forEach(token => { scores[label] += Math.log(((state.model.vocabularyByLabel[label][token] || 0) + 1) / (state.model.totals[label] + state.model.vocabulary.length)); });
    });
    const label = scores.positivo >= scores.negativo ? 'positivo' : 'negativo';
    return { label, confidence: 1 / (1 + Math.exp(-Math.abs(scores.positivo - scores.negativo))) };
}

function runPrediction() {
    const text = $('#prediction-input').value.trim();
    if (!state.model) { $('#prediction-result').className = 'prediction-result'; $('#prediction-result').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i><span>Treine o modelo antes de fazer uma previsão.</span>'; return; }
    const result = predict(text);
    $('#prediction-result').className = `prediction-result ${result.label}`;
    $('#prediction-result').innerHTML = `<i class="fa-solid ${result.label === 'positivo' ? 'fa-face-smile' : 'fa-face-frown'}"></i><span>Previsão: <strong>${result.label}</strong> · confiança didática ${(result.confidence * 100).toFixed(0)}%</span>`;
}

function populateVectorSelect() { $('#vector-document').innerHTML = corpus.map(item => `<option value="${item.id}">Doc ${String(item.id).padStart(2, '0')} · ${item.label}</option>`).join(''); $('#vector-document').value = state.selectedId; }
function renderAll() { renderCorpus(); renderPipeline(); populateVectorSelect(); renderVectors(); buildPythonCode(); }
function bindTabs() { $$('.module-tab').forEach(tab => tab.addEventListener('click', () => { $$('.module-tab').forEach(item => item.classList.toggle('active', item === tab)); $$('.module').forEach(module => module.classList.toggle('active', module.id === tab.dataset.module)); })); }
function init() {
    $('#corpus-count').textContent = corpus.length;
    bindTabs();
    ['#toggle-lower', '#toggle-accents', '#toggle-punctuation', '#toggle-stops', '#toggle-lemma'].forEach(selector => $(selector).addEventListener('change', () => { state.model = null; $('#model-status').textContent = 'não treinado'; $('#model-status').classList.add('muted'); renderPipeline(); renderVectors(); buildPythonCode(); }));
    $('#ngram-select').addEventListener('change', renderVectors);
    $('#vector-document').addEventListener('change', renderVectors);
    $('#train-model').addEventListener('click', trainModel);
    $('#predict-sentiment').addEventListener('click', runPrediction);
    $('#copy-python').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#python-code').textContent); $('#copy-python').innerHTML = '<i class="fa-solid fa-check"></i>'; setTimeout(() => { $('#copy-python').innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 1200); } catch { $('#copy-python').title = 'Selecione o código para copiar'; } });
    renderAll();
}

document.addEventListener('DOMContentLoaded', init);
