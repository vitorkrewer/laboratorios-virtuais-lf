# Ecossistema de Física

Livros interativos de Física com trilhas, teoria em formato wiki, testes rápidos, simuladores e glossário. Usa o mesmo motor da Matemática (`shared/engine/`); cada livro é só conteúdo (`book.js`, `labs.js` e capítulos em Markdown).

## Livros

| Livro | Pasta | Situação | Simuladores |
|---|---|---|---|
| Astronomia | `astronomia/` | Disponível (13 capítulos) | Planetário, Sistema Solar e retrógrado, Órbitas (Kepler, canhão de Newton, exoplanetas), Lua e eclipses |
| Astrofísica e Cosmologia | `cosmologia/` | Disponível (15 capítulos) | Evolução estelar e diagrama HR, Pulsar e magnetar (com som), Buraco negro (lente gravitacional e disco de acreção calculados na métrica de Schwarzschild), Galáxia e matéria escura, Universo em expansão (lei de Hubble, linha do tempo e destino) |
| Mecânica, Oscilações e ondas, Termodinâmica, Eletromagnetismo, Óptica, Física moderna | — | Planejados | — |

O mapa de pré-requisitos do hub (`index.html`) liga os livros entre si e, pelo campo `ext` do catálogo, aos livros de Matemática que cada um usa.

## Estrutura

```
fisica/
├── index.html            # hub: rotas, livros, mapa de pré-requisitos
├── dados/
│   ├── catalog.js        # MATH.area, catálogo de livros e rotas do hub
│   ├── glossary.js       # verbetes do glossário de Física (campo mm: ligações ao glossário de Matemática)
│   └── astro.js          # efemérides: planetas (elementos do JPL), Lua, Sol, precessão, tempo sideral
├── glossario/index.html  # página do glossário
├── astronomia/
│   ├── index.html        # casca mínima (carrega o motor e os dados)
│   ├── book.js
│   ├── labs.js           # planetário, Sistema Solar, órbitas, Lua
│   ├── dados/ceu.js      # estrelas até magnitude 6 e constelações
│   └── content/*.md
└── cosmologia/
    ├── index.html
    ├── book.js
    ├── labs.js           # evolução estelar, pulsar, buraco negro, galáxia, expansão
    └── content/*.md
```

## Dados e precisão

- **Estrelas e constelações** (`astronomia/dados/ceu.js`): cerca de 5 000 estrelas até magnitude 6 do catálogo Hipparcos, linhas das 88 constelações e nomes próprios das estrelas mais brilhantes, derivados do projeto [d3-celestial](https://github.com/ofrohn/d3-celestial) (licença BSD de 3 cláusulas, reproduzida no cabeçalho do arquivo). Nomes das constelações em português.
- **Efemérides** (`dados/astro.js`): planetas pelos elementos orbitais médios do JPL (válidos de 1800 a 2050), com erro de poucos minutos de arco; Lua por série truncada de baixa precisão, com erro de cerca de 0,1°; precessão IAU 1976. Nutação, aberração e refração atmosférica são ignoradas. A busca de eclipses do simulador da Lua acerta todos os eclipses solares e lunares (exceto penumbrais) de 2024 a 2035.

- **Buraco negro** (`cosmologia/labs.js`): cada pixel é um raio de luz integrado numericamente (Runge-Kutta de 4ª ordem) pela equação da órbita da luz na métrica de Schwarzschild, $u'' = -u + \tfrac{3}{2} r_s u^2$, da câmera até o céu de fundo; o disco de acreção é fino, entre 3 e 12 raios de Schwarzschild, com o deslocamento de frequência $g = \sqrt{1 - 1{,}5\,r_s/r}\,/\,(1 - \Omega\lambda)$ (Doppler mais gravitacional). As cores do disco são ilustrativas.
- **Evolução estelar:** trilhas esquemáticas no diagrama HR, com idades aproximadas; não são saídas de um código de evolução estelar.
- **Expansão:** idade e destino do universo pelas equações de Friedmann (matéria, radiação, curvatura e energia escura com equação de estado $w$), com os parâmetros do Planck 2018 como referência.

## Sintaxe dos capítulos

A mesma da Matemática (veja `matematica/README.md`): fórmulas com KaTeX, callouts `> [!DEFINIÇÃO]` etc., soluções em `<details>` e testes rápidos em blocos ` ```quiz `.
