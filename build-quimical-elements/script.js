document.addEventListener('DOMContentLoaded', () => {

    // --- 1. OS DADOS (JSON COMPLETO + CATEGORIAS) ---
    const elementsData = {
      "1": { "name": "Hidrogênio", "symbol": "H", "category": "nonmetal" },
      "2": { "name": "Hélio", "symbol": "He", "category": "noble-gas" },
      "3": { "name": "Lítio", "symbol": "Li", "category": "alkali-metal" },
      "4": { "name": "Berílio", "symbol": "Be", "category": "alkaline-earth-metal" },
      "5": { "name": "Boro", "symbol": "B", "category": "metalloid" },
      "6": { "name": "Carbono", "symbol": "C", "category": "nonmetal" },
      "7": { "name": "Nitrogênio", "symbol": "N", "category": "nonmetal" },
      "8": { "name": "Oxigênio", "symbol": "O", "category": "nonmetal" },
      "9": { "name": "Flúor", "symbol": "F", "category": "halogen" },
      "10": { "name": "Neônio", "symbol": "Ne", "category": "noble-gas" },
      "11": { "name": "Sódio", "symbol": "Na", "category": "alkali-metal" },
      "12": { "name": "Magnésio", "symbol": "Mg", "category": "alkaline-earth-metal" },
      "13": { "name": "Alumínio", "symbol": "Al", "category": "default" },
      "14": { "name": "Silício", "symbol": "Si", "category": "metalloid" },
      "15": { "name": "Fósforo", "symbol": "P", "category": "nonmetal" },
      "16": { "name": "Enxofre", "symbol": "S", "category": "nonmetal" },
      "17": { "name": "Cloro", "symbol": "Cl", "category": "halogen" },
      "18": { "name": "Argônio", "symbol": "Ar", "category": "noble-gas" },
      "19": { "name": "Potássio", "symbol": "K", "category": "alkali-metal" },
      "20": { "name": "Cálcio", "symbol": "Ca", "category": "alkaline-earth-metal" },
      "21": { "name": "Escândio", "symbol": "Sc", "category": "transition-metal" },
      "22": { "name": "Titânio", "symbol": "Ti", "category": "transition-metal" },
      "23": { "name": "Vanádio", "symbol": "V", "category": "transition-metal" },
      "24": { "name": "Cromo", "symbol": "Cr", "category": "transition-metal" },
      "25": { "name": "Manganês", "symbol": "Mn", "category": "transition-metal" },
      "26": { "name": "Ferro", "symbol": "Fe", "category": "transition-metal" },
      "27": { "name": "Cobalto", "symbol": "Co", "category": "transition-metal" },
      "28": { "name": "Níquel", "symbol": "Ni", "category": "transition-metal" },
      "29": { "name": "Cobre", "symbol": "Cu", "category": "transition-metal" },
      "30": { "name": "Zinco", "symbol": "Zn", "category": "transition-metal" },
      "31": { "name": "Gálio", "symbol": "Ga", "category": "default" },
      "32": { "name": "Germânio", "symbol": "Ge", "category": "metalloid" },
      "33": { "name": "Arsênio", "symbol": "As", "category": "metalloid" },
      "34": { "name": "Selênio", "symbol": "Se", "category": "nonmetal" },
      "35": { "name": "Bromo", "symbol": "Br", "category": "halogen" },
      "36": { "name": "Criptônio", "symbol": "Kr", "category": "noble-gas" },
      "37": { "name": "Rubídio", "symbol": "Rb", "category": "alkali-metal" },
      "38": { "name": "Estrôncio", "symbol": "Sr", "category": "alkaline-earth-metal" },
      "39": { "name": "Ítrio", "symbol": "Y", "category": "transition-metal" },
      "40": { "name": "Zircônio", "symbol": "Zr", "category": "transition-metal" },
      "41": { "name": "Nióbio", "symbol": "Nb", "category": "transition-metal" },
      "42": { "name": "Molibdênio", "symbol": "Mo", "category": "transition-metal" },
      "43": { "name": "Tecnécio", "symbol": "Tc", "category": "transition-metal" },
      "44": { "name": "Rutênio", "symbol": "Ru", "category": "transition-metal" },
      "45": { "name": "Ródio", "symbol": "Rh", "category": "transition-metal" },
      "46": { "name": "Paládio", "symbol": "Pd", "category": "transition-metal" },
      "47": { "name": "Prata", "symbol": "Ag", "category": "transition-metal" },
      "48": { "name": "Cádmio", "symbol": "Cd", "category": "transition-metal" },
      "49": { "name": "Índio", "symbol": "In", "category": "default" },
      "50": { "name": "Estanho", "symbol": "Sn", "category": "default" },
      "51": { "name": "Antimônio", "symbol": "Sb", "category": "metalloid" },
      "52": { "name": "Telúrio", "symbol": "Te", "category": "metalloid" },
      "53": { "name": "Iodo", "symbol": "I", "category": "halogen" },
      "54": { "name": "Xenônio", "symbol": "Xe", "category": "noble-gas" },
      "55": { "name": "Césio", "symbol": "Cs", "category": "alkali-metal" },
      "56": { "name": "Bário", "symbol": "Ba", "category": "alkaline-earth-metal" },
      "57": { "name": "Lantânio", "symbol": "La", "category": "lanthanide" },
      "58": { "name": "Cério", "symbol": "Ce", "category": "lanthanide" },
      "59": { "name": "Praseodímio", "symbol": "Pr", "category": "lanthanide" },
      "60": { "name": "Neodímio", "symbol": "Nd", "category": "lanthanide" },
      "61": { "name": "Promécio", "symbol": "Pm", "category": "lanthanide" },
      "62": { "name": "Samário", "symbol": "Sm", "category": "lanthanide" },
      "63": { "name": "Európio", "symbol": "Eu", "category": "lanthanide" },
      "64": { "name": "Gadolínio", "symbol": "Gd", "category": "lanthanide" },
      "65": { "name": "Térbio", "symbol": "Tb", "category": "lanthanide" },
      "66": { "name": "Disprósio", "symbol": "Dy", "category": "lanthanide" },
      "67": { "name": "Hólmio", "symbol": "Ho", "category": "lanthanide" },
      "68": { "name": "Érbio", "symbol": "Er", "category": "lanthanide" },
      "69": { "name": "Túlio", "symbol": "Tm", "category": "lanthanide" },
      "70": { "name": "Itérbio", "symbol": "Yb", "category": "lanthanide" },
      "71": { "name": "Lutécio", "symbol": "Lu", "category": "lanthanide" },
      "72": { "name": "Háfnio", "symbol": "Hf", "category": "transition-metal" },
      "73": { "name": "Tântalo", "symbol": "Ta", "category": "transition-metal" },
      "74": { "name": "Tungstênio", "symbol": "W", "category": "transition-metal" },
      "75": { "name": "Rênio", "symbol": "Re", "category": "transition-metal" },
      "76": { "name": "Ósmio", "symbol": "Os", "category": "transition-metal" },
      "77": { "name": "Irídio", "symbol": "Ir", "category": "transition-metal" },
      "78": { "name": "Platina", "symbol": "Pt", "category": "transition-metal" },
      "79": { "name": "Ouro", "symbol": "Au", "category": "transition-metal" },
      "80": { "name": "Mercúrio", "symbol": "Hg", "category": "transition-metal" },
      "81": { "name": "Tálio", "symbol": "Tl", "category": "default" },
      "82": { "name": "Chumbo", "symbol": "Pb", "category": "default" },
      "83": { "name": "Bismuto", "symbol": "Bi", "category": "default" },
      "84": { "name": "Polônio", "symbol": "Po", "category": "metalloid" },
      "85": { "name": "Ástato", "symbol": "At", "category": "halogen" },
      "86": { "name": "Radônio", "symbol": "Rn", "category": "noble-gas" },
      "87": { "name": "Frâncio", "symbol": "Fr", "category": "alkali-metal" },
      "88": { "name": "Rádio", "symbol": "Ra", "category": "alkaline-earth-metal" },
      "89": { "name": "Actínio", "symbol": "Ac", "category": "actinide" },
      "90": { "name": "Tório", "symbol": "Th", "category": "actinide" },
      "91": { "name": "Protactínio", "symbol": "Pa", "category": "actinide" },
      "92": { "name": "Urânio", "symbol": "U", "category": "actinide" },
      "93": { "name": "Netúnio", "symbol": "Np", "category": "actinide" },
      "94": { "name": "Plutônio", "symbol": "Pu", "category": "actinide" },
      "95": { "name": "Amerício", "symbol": "Am", "category": "actinide" },
      "96": { "name": "Cúrio", "symbol": "Cm", "category": "actinide" },
      "97": { "name": "Berquélio", "symbol": "Bk", "category": "actinide" },
      "98": { "name": "Califórnio", "symbol": "Cf", "category": "actinide" },
      "99": { "name": "Einstênio", "symbol": "Es", "category": "actinide" },
      "100": { "name": "Férmio", "symbol": "Fm", "category": "actinide" },
      "101": { "name": "Mendelévio", "symbol": "Md", "category": "actinide" },
      "102": { "name": "Nobélio", "symbol": "No", "category": "actinide" },
      "103": { "name": "Laurêncio", "symbol": "Lr", "category": "actinide" },
      "104": { "name": "Rutherfórdio", "symbol": "Rf", "category": "transition-metal" },
      "105": { "name": "Dúbnio", "symbol": "Db", "category": "transition-metal" },
      "106": { "name": "Seabórgio", "symbol": "Sg", "category": "transition-metal" },
      "107": { "name": "Bóhrio", "symbol": "Bh", "category": "transition-metal" },
      "108": { "name": "Hássio", "symbol": "Hs", "category": "transition-metal" },
      "109": { "name": "Meitnério", "symbol": "Mt", "category": "transition-metal" },
      "110": { "name": "Darmstádio", "symbol": "Ds", "category": "transition-metal" },
      "111": { "name": "Roentgênio", "symbol": "Rg", "category": "transition-metal" },
      "112": { "name": "Copernício", "symbol": "Cn", "category": "transition-metal" },
      "113": { "name": "Nihônio", "symbol": "Nh", "category": "default" },
      "114": { "name": "Fleróvio", "symbol": "Fl", "category": "default" },
      "115": { "name": "Moscóvio", "symbol": "Mc", "category": "default" },
      "116": { "name": "Livermório", "symbol": "Lv", "category": "default" },
      "117": { "name": "Tennesso", "symbol": "Ts", "category": "halogen" },
      "118": { "name": "Oganessônio", "symbol": "Og", "category": "noble-gas" }
    };
    
    // --- 2. O "LIVRO DE RECEITAS" (Inalterado) ---
    const recipes_final = {
        "H2O": { /* ... (receita da Água) ... */ 
            name: "Água",
            formula: "H₂O",
            structure: {
                atoms: [
                    { symbol: "O", x: "50%", y: "45%" }, // 0
                    { symbol: "H", x: "40%", y: "55%" }, // 1
                    { symbol: "H", x: "60%", y: "55%" }  // 2
                ],
                bonds: [ { from: 0, to: 1 }, { from: 0, to: 2 } ]
            }
        },
        "CH4": { /* ... (receita do Metano) ... */ 
            name: "Metano",
            formula: "CH₄",
            structure: {
                atoms: [ 
                    { symbol: "C", x: "50%", y: "50%" }, // 0
                    { symbol: "H", x: "50%", y: "35%" }, // 1
                    { symbol: "H", x: "35%", y: "58%" }, // 2
                    { symbol: "H", x: "65%", y: "58%" }, // 3
                    { symbol: "H", x: "50%", y: "65%" }  // 4
                ],
                bonds: [
                    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }
                ]
            }
        },
        "C8H11NO2": { /* ... (receita da Dopamina) ... */ 
            name: "Dopamina",
            formula: "C₈H₁₁NO₂",
            structure: {
                atoms: [
                    { symbol: "C", x: "40%", y: "30%" }, // 0
                    { symbol: "C", x: "30%", y: "40%" }, // 1
                    { symbol: "C", x: "30%", y: "55%" }, // 2
                    { symbol: "C", x: "40%", y: "65%" }, // 3
                    { symbol: "C", x: "50%", y: "55%" }, // 4
                    { symbol: "C", x: "50%", y: "40%" }, // 5
                    { symbol: "O", x: "20%", y: "35%" }, // 6 
                    { symbol: "H", x: "15%", y: "40%" }, // 7 
                    { symbol: "O", x: "20%", y: "60%" }, // 8 
                    { symbol: "H", x: "15%", y: "65%" }, // 9 
                    { symbol: "H", x: "40%", y: "20%" }, // 10
                    { symbol: "H", x: "40%", y: "75%" }, // 11
                    { symbol: "H", x: "60%", y: "35%" }, // 12
                    { symbol: "C", x: "62%", y: "60%" }, // 13
                    { symbol: "C", x: "74%", y: "55%" }, // 14
                    { symbol: "N", x: "85%", y: "60%" }, // 15
                    { symbol: "H", x: "62%", y: "70%" }, // 16
                    { symbol: "H", x: "65%", y: "50%" }, // 17
                    { symbol: "H", x: "74%", y: "45%" }, // 18
                    { symbol: "H", x: "77%", y: "65%" }, // 19
                    { symbol: "H", x: "85%", y: "70%" }, // 20
                    { symbol: "H", x: "92%", y: "55%" }  // 21
                ],
                bonds: [
                    {from: 0, to: 1}, {from: 1, to: 2}, {from: 2, to: 3},
                    {from: 3, to: 4}, {from: 4, to: 5}, {from: 5, to: 0},
                    {from: 1, to: 6}, {from: 6, to: 7},
                    {from: 2, to: 8}, {from: 8, to: 9},
                    {from: 0, to: 10}, {from: 3, to: 11}, {from: 5, to: 12},
                    {from: 4, to: 13}, {from: 13, to: 14}, {from: 14, to: 15},
                    {from: 13, to: 16}, {from: 13, to: 17}, {from: 14, to: 18},
                    {from: 14, to: 19}, {from: 15, to: 20}, {from: 15, to: 21}
                ]
            }
        },
        "C8H10N4O2": {
            name: "Cafeína",
            formula: "C₈H₁₀N₄O₂",
            structure: {
                atoms: [
                    // Anel de 6 membros
                    { symbol: "N", x: "40%", y: "40%" }, // 0
                    { symbol: "C", x: "40%", y: "55%" }, // 1
                    { symbol: "N", x: "50%", y: "62%" }, // 2
                    { symbol: "C", x: "60%", y: "55%" }, // 3
                    { symbol: "C", x: "60%", y: "40%" }, // 4
                    { symbol: "C", x: "50%", y: "33%" }, // 5 (ligado a N-0 e N-6)
                    // Anel de 5 membros (compartilhado)
                    { symbol: "N", x: "50%", y: "48%" }, // 6 (ligado a C-1 e C-5)
                    // Oxigênios (Duplas ligações)
                    { symbol: "O", x: "32%", y: "60%" }, // 7 (ligado a C-1)
                    { symbol: "O", x: "70%", y: "60%" }, // 8 (ligado a C-3)
                    // Grupos Metil (CH3)
                    { symbol: "C", x: "30%", y: "33%" }, // 9 (Metil 1 - ligado a N-0)
                    { symbol: "C", x: "50%", y: "75%" }, // 10 (Metil 2 - ligado a N-2)
                    { symbol: "C", x: "40%", y: "20%" }, // 11 (Metil 3 - ligado a N-6)
                    // Hidrogênio do anel
                    { symbol: "H", x: "70%", y: "35%" }, // 12 (ligado a C-4)
                    // Hidrogênios do Metil 1 (C-9)
                    { symbol: "H", x: "20%", y: "33%" }, // 13
                    { symbol: "H", x: "30%", y: "23%" }, // 14
                    { symbol: "H", x: "33%", y: "40%" }, // 15
                    // Hidrogênios do Metil 2 (C-10)
                    { symbol: "H", x: "45%", y: "85%" }, // 16
                    { symbol: "H", x: "60%", y: "75%" }, // 17
                    { symbol: "H", x: "53%", y: "82%" }, // 18
                    // Hidrogênios do Metil 3 (C-11)
                    { symbol: "H", x: "30%", y: "20%" }, // 19
                    { symbol: "H", x: "40%", y: "10%" }, // 20
                    { symbol: "H", x: "45%", y: "25%" }, // 21
                    // Átomos Fictícios para Ligações Duplas (visuais)
                    { symbol: "C", x: "45%", y: "58%" }, // 22 (Ligação dupla C1-N6)
                    { symbol: "N", x: "55%", y: "38%" }  // 23 (quarto nitrogênio da estrutura)
                ],
                bonds: [
                    // Anel de 6
                    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
                    { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 0 },
                    // Anel de 5 (interno)
                    { from: 1, to: 6 }, { from: 5, to: 6 },
                    // Oxigênios
                    { from: 1, to: 7 }, { from: 3, to: 8 },
                    // Metil 1
                    { from: 0, to: 9 }, { from: 9, to: 13 }, { from: 9, to: 14 }, { from: 9, to: 15 },
                    // Metil 2
                    { from: 2, to: 10 }, { from: 10, to: 16 }, { from: 10, to: 17 }, { from: 10, to: 18 },
                    // Metil 3 (no N-6 do anel de 5)
                    { from: 6, to: 11 }, { from: 11, to: 19 }, { from: 11, to: 20 }, { from: 11, to: 21 },
                    // H do anel
                    { from: 4, to: 12 },
                    // Ligações "duplas" (visuais, usando os átomos 22 e 23)
                    { from: 1, to: 22 }, { from: 6, to: 22 }, // C1=N6 (fictício)
                    { from: 4, to: 23 }, { from: 5, to: 23 }  // C4=C5 (fictício)
                ]
            }
        },
        // GLICOSE (C6H12O6) - 24 átomos
        "C6H12O6": {
            name: "Glicose",
            formula: "C₆H₁₂O₆",
            structure: {
                atoms: [
                    // Anel (Hexágono)
                    { symbol: "O", x: "50%", y: "30%" }, // 0
                    { symbol: "C", x: "38%", y: "40%" }, // 1
                    { symbol: "C", x: "38%", y: "60%" }, // 2
                    { symbol: "C", x: "50%", y: "70%" }, // 3
                    { symbol: "C", x: "62%", y: "60%" }, // 4
                    { symbol: "C", x: "62%", y: "40%" }, // 5
                    // Cauda (CH2OH ligada a C-4)
                    { symbol: "C", x: "74%", y: "70%" }, // 6
                    { symbol: "O", x: "85%", y: "65%" }, // 7
                    { symbol: "H", x: "85%", y: "55%" }, // 8
                    { symbol: "H", x: "74%", y: "80%" }, // 9
                    { symbol: "H", x: "68%", y: "75%" }, // 10
                    // Grupos H e OH no anel
                    { symbol: "H", x: "30%", y: "35%" }, // 11 (em C-1)
                    { symbol: "O", x: "26%", y: "45%" }, // 12 (em C-1)
                    { symbol: "H", x: "20%", y: "40%" }, // 13 (em O-12)
                    { symbol: "H", x: "30%", y: "65%" }, // 14 (em C-2)
                    { symbol: "O", x: "26%", y: "55%" }, // 15 (em C-2)
                    { symbol: "H", x: "20%", y: "60%" }, // 16 (em O-15)
                    { symbol: "H", x: "45%", y: "80%" }, // 17 (em C-3)
                    { symbol: "O", x: "55%", y: "80%" }, // 18 (em C-3)
                    { symbol: "H", x: "50%", y: "90%" }, // 19 (em O-18)
                    { symbol: "H", x: "68%", y: "65%" }, // 20 (em C-4)
                    { symbol: "H", x: "70%", y: "35%" }, // 21 (em C-5)
                    { symbol: "O", x: "74%", y: "45%" }, // 22 (em C-5)
                    { symbol: "H", x: "80%", y: "40%" }  // 23 (em O-22)
                ],
                bonds: [
                    // Anel
                    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
                    { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 0 },
                    // Cauda
                    { from: 4, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 },
                    { from: 6, to: 9 }, { from: 4, to: 10 }, // H's da cauda
                    // Grupos do anel
                    { from: 1, to: 11 }, { from: 1, to: 12 }, { from: 12, to: 13 },
                    { from: 2, to: 14 }, { from: 2, to: 15 }, { from: 15, to: 16 },
                    { from: 3, to: 17 }, { from: 3, to: 18 }, { from: 18, to: 19 },
                    { from: 4, to: 20 },
                    { from: 5, to: 21 }, { from: 5, to: 22 }, { from: 22, to: 23 }
                ]
            }
        },

        // ETANOL (C2H6O) - 9 átomos
        "C2H6O": {
            name: "Etanol",
            formula: "C₂H₆O",
            structure: {
                atoms: [
                    { symbol: "C", x: "40%", y: "50%" }, // 0 (CH3)
                    { symbol: "C", x: "55%", y: "50%" }, // 1 (CH2)
                    { symbol: "O", x: "70%", y: "50%" }, // 2 (OH)
                    { symbol: "H", x: "35%", y: "40%" }, // 3 (em C-0)
                    { symbol: "H", x: "35%", y: "60%" }, // 4 (em C-0)
                    { symbol: "H", x: "30%", y: "50%" }, // 5 (em C-0)
                    { symbol: "H", x: "55%", y: "40%" }, // 6 (em C-1)
                    { symbol: "H", x: "55%", y: "60%" }, // 7 (em C-1)
                    { symbol: "H", x: "75%", y: "40%" }  // 8 (em O-2)
                ],
                bonds: [
                    // Cadeia principal
                    { from: 0, to: 1 }, { from: 1, to: 2 },
                    // H do C-0
                    { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 0, to: 5 },
                    // H do C-1
                    { from: 1, to: 6 }, { from: 1, to: 7 },
                    // H do O-2
                    { from: 2, to: 8 }
                ]
            }
        },

        // DIÓXIDO DE CARBONO (CO2) - 3 átomos
        "CO2": {
            name: "Dióxido de Carbono",
            formula: "CO₂",
            structure: {
                atoms: [
                    { symbol: "O", x: "35%", y: "50%" }, // 0
                    { symbol: "C", x: "50%", y: "50%" }, // 1
                    { symbol: "O", x: "65%", y: "50%" }  // 2
                ],
                bonds: [
                    // Ligações duplas (representadas por duas linhas cada)
                    { from: 0, to: 1 }, { from: 1, to: 2 },
                    // "Fictício" para parecer dupla
                    { from: 0, to: 1.1 }, { from: 1.1, to: 2 } // Não vai funcionar, vamos simplificar
                ]
            },
            // Vamos corrigir o CO2 para usar a técnica da Cafeína
            structure: {
                atoms: [
                    { symbol: "O", x: "35%", y: "50%" }, // 0
                    { symbol: "C", x: "50%", y: "50%" }, // 1
                    { symbol: "O", x: "65%", y: "50%" }, // 2
                    // Átomos fictícios para as duplas
                    { symbol: "C", x: "42.5%", y: "45%" }, // 3
                    { symbol: "C", x: "42.5%", y: "55%" }, // 4
                    { symbol: "C", x: "57.5%", y: "45%" }, // 5
                    { symbol: "C", x: "57.5%", y: "55%" }  // 6
                ],
                bonds: [
                    // Remove os átomos fictícios, não precisamos deles para CO2
                    // A receita é "CO2", então só temos 3 átomos (0, 1, 2)
                ]
            },
            // VERSÃO FINAL CORRETA do CO2
            structure: {
                atoms: [
                    { symbol: "O", x: "35%", y: "50%" }, // 0
                    { symbol: "C", x: "50%", y: "50%" }, // 1
                    { symbol: "O", x: "65%", y: "50%" }  // 2
                ],
                bonds: [
                    { from: 0, to: 1 }, // O=C
                    { from: 1, to: 2 }  // C=O
                    // Nota: O ideal seria ter 2 bonds para cada,
                    // mas nossa lógica atual só desenha uma linha.
                    // Podemos simular!
                ]
            },
             // VERSÃO FINAL-FINAL (Vamos usar 5 átomos para simular a dupla)
             "CO2_visual": { // Chave diferente, pois usa C e O fictícios
                name: "Dióxido de Carbono",
                formula: "CO₂",
                structure: {
                    atoms: [
                        { symbol: "O", x: "30%", y: "50%" }, // 0
                        { symbol: "C", x: "50%", y: "50%" }, // 1
                        { symbol: "O", x: "70%", y: "50%" }, // 2
                        // Pontos fictícios para as ligações duplas
                        { symbol: "C", x: "40%", y: "45%" }, // 3
                        { symbol: "C", x: "40%", y: "55%" }, // 4
                        { symbol: "C", x: "60%", y: "45%" }, // 5
                        { symbol: "C", x: "60%", y: "55%" }  // 6
                    ],
                    // A chave "CO2" espera 1 C e 2 O (3 átomos)
                    // Esta receita "CO2_visual" espera 3 C e 4 O (7 átomos)
                    // Isso não vai funcionar.
                }
             },
             // A única forma de fazer o CO2 é usar a chave "CO2"
             // e ter 3 átomos.
             "CO2": {
                name: "Dióxido de Carbono",
                formula: "CO₂",
                structure: {
                    atoms: [
                        { symbol: "O", x: "35%", y: "50%" }, // 0
                        { symbol: "C", x: "50%", y: "50%" }, // 1
                        { symbol: "O", x: "65%", y: "50%" }  // 2
                    ],
                    bonds: [
                        { from: 0, to: 1 }, 
                        { from: 1, to: 2 }
                    ]
                }
            }
        }
    };

    // --- 3. REFERÊNCIAS DO DOM (Inalterado) ---
    const selector = document.getElementById('element-selector');
    const workspace = document.getElementById('workspace');
    const combineBtn = document.getElementById('combine-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDisplay = document.getElementById('result-display');
    const recipeSelector = document.getElementById('recipe-suggester'); 
    const elementSearch = document.getElementById('element-search');
    const elementCategoryFilter = document.getElementById('element-category-filter');
    const atomCounter = document.getElementById('atom-counter');
    const formulaPreview = document.getElementById('formula-preview');
    const graphNodeCount = document.getElementById('graph-node-count');
    const bondCounter = document.getElementById('bond-counter');
    const formationStatus = document.getElementById('formation-status');
    let activeRecipeKey = null;
    let isForming = false;

    const categoryColors = {
        'nonmetal': '#1da67b',
        'alkali-metal': '#dc6471',
        'noble-gas': '#22a9bc',
        'alkaline-earth-metal': '#d69a17',
        'metalloid': '#9066c9',
        'halogen': '#a254bb',
        'transition-metal': '#d46b85',
        'lanthanide': '#cd8642',
        'actinide': '#6d75bc',
        'default': '#6e8192'
    };

    const atomColors = {
        'H': '#58b6d8', 'C': '#43566b', 'N': '#5969d4', 'O': '#e85c66',
        'F': '#6ebc79', 'Cl': '#59aa6a', 'Br': '#b46646', 'I': '#8b659d',
        'S': '#e0b636', 'P': '#df8738', 'Na': '#aa71cf', 'K': '#9b61bf',
        'Ca': '#7195cf', 'Mg': '#4f8fc1', 'Fe': '#b8664b'
    };

    function emptyWorkspaceMarkup() {
        return '<div class="graph-hud" aria-label="Métricas do grafo molecular"><span><i class="fa-solid fa-circle-nodes"></i> <b id="graph-node-count">0</b> nós</span><span><i class="fa-solid fa-link"></i> <b id="bond-counter">0</b> ligações</span><span id="formation-status" class="formation-status">Aguardando composição</span></div><div id="workspace-empty" class="workspace-empty"><i class="fa-solid fa-hand-pointer"></i><strong>Selecione elementos para iniciar</strong><span>Os átomos serão posicionados na bancada.</span></div>';
    }

    function getAtomColor(symbol, category) {
        return atomColors[symbol] || categoryColors[category || 'default'];
    }

    function getStagingPosition(index) {
        const rect = workspace.getBoundingClientRect();
        const angle = index * 2.3999632297;
        const radius = 12 + Math.floor(index / 5) * 12;
        const x = Math.min(Math.max(rect.width / 2 + Math.cos(angle) * radius, 28), rect.width - 28);
        const y = Math.min(Math.max(rect.height / 2 + Math.sin(angle) * radius, 42), rect.height - 28);
        return { x, y };
    }

    function getRecipeLayout(atoms) {
        const scale = atoms.length <= 5 ? 1.8 : atoms.length <= 12 ? 1.3 : 1;
        return atoms.map(atom => {
            const x = Math.min(90, Math.max(10, 50 + (parseFloat(atom.x) - 50) * scale));
            const y = Math.min(90, Math.max(10, 50 + (parseFloat(atom.y) - 50) * scale));
            return { ...atom, x: `${x}%`, y: `${y}%` };
        });
    }

    function updateFormationStatus(text, state = 'waiting') {
        const status = document.getElementById('formation-status');
        if (!status) return;
        status.textContent = text;
        status.className = `formation-status status-${state}`;
    }

    function setRecipeButtonsDisabled(disabled) {
        recipeSelector.querySelectorAll('button').forEach(button => {
            button.disabled = disabled;
        });
    }

    function toSubscript(value) {
        const digits = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
        return String(value).split('').map(digit => digits[digit] || digit).join('');
    }

    function getRecipeKey(atoms) {
        const counts = {};
        atoms.forEach(atom => {
            counts[atom.symbol] = (counts[atom.symbol] || 0) + 1;
        });
        return Object.keys(counts).sort().map(symbol => `${symbol}${counts[symbol] > 1 ? counts[symbol] : ''}`).join('');
    }

    function validateRecipes() {
        Object.entries(recipes_final).forEach(([key, recipe]) => {
            const calculatedKey = getRecipeKey(recipe.structure.atoms);
            if (key !== calculatedKey) {
                console.warn(`Receita ${recipe.name} possui fórmula incompatível: esperada ${key}, encontrada ${calculatedKey}.`);
            }
        });
    }

    function refreshWorkspaceStatus() {
        const atoms = [...workspace.querySelectorAll('.atom')];
        const counts = {};
        atoms.forEach(atom => {
            const symbol = atom.dataset.symbol;
            counts[symbol] = (counts[symbol] || 0) + 1;
        });
        const formula = Object.keys(counts).sort().map(symbol => `${symbol}${counts[symbol] > 1 ? toSubscript(counts[symbol]) : ''}`).join('');
        atomCounter.textContent = atoms.length;
        const currentGraphNodeCount = document.getElementById('graph-node-count');
        const currentBondCounter = document.getElementById('bond-counter');
        if (currentGraphNodeCount) currentGraphNodeCount.textContent = atoms.length;
        if (currentBondCounter) currentBondCounter.textContent = workspace.querySelectorAll('.bond').length;
        formulaPreview.textContent = formula || '∅';
        if (atoms.length > 0) workspace.querySelector('#workspace-empty')?.remove();
    }
    
    // --- 4. FUNÇÕES DE INICIALIZAÇÃO E EVENTOS (Inalteradas) ---
    function loadElements() {
        selector.innerHTML = '';
        const searchTerm = elementSearch.value.trim().toLowerCase();
        const category = elementCategoryFilter.value;
        for (const atomicNumber in elementsData) { 
            const element = elementsData[atomicNumber];
            const matchesSearch = !searchTerm || element.name.toLowerCase().includes(searchTerm) || element.symbol.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || element.category === category;
            if (!matchesSearch || !matchesCategory) continue;
            const tile = document.createElement('button');
            tile.className = 'btn element-tile';
            tile.classList.add(`element-${element.category || 'default'}`);
            tile.innerHTML = `<strong>${element.symbol}</strong><small>${element.name}</small>`;
            tile.dataset.symbol = element.symbol;
            tile.dataset.name = element.name;
            tile.dataset.category = element.category || 'default';
            tile.title = `${element.name} (${element.symbol})`;
            tile.addEventListener('click', addAtomToWorkspace);
            selector.appendChild(tile);
        }
    }

    function loadRecipes() {
        recipeSelector.innerHTML = '';
        for (const key in recipes_final) {
            const recipe = recipes_final[key];
            const btn = document.createElement('button');
            btn.className = 'btn recipe-card'; 
            btn.innerHTML = `<strong>${recipe.name}</strong><span class="recipe-formula">${recipe.formula}</span>`;
            btn.dataset.recipeKey = key;
            btn.addEventListener('click', handleRecipeClick);
            recipeSelector.appendChild(btn);
        }
    }

    async function handleRecipeClick(event) {
        if (isForming) return;
        const key = event.currentTarget.dataset.recipeKey;
        const recipe = recipes_final[key];
        if (!recipe) return;

        resetWorkspace();
        combineBtn.disabled = true;
        resetBtn.disabled = true;
        setRecipeButtonsDisabled(true);

        const workspaceRect = workspace.getBoundingClientRect();
        
        recipe.structure.atoms.forEach((templateAtom, index) => {
            const atom = document.createElement('div');
            atom.className = 'atom';
            atom.textContent = templateAtom.symbol;
            atom.dataset.symbol = templateAtom.symbol;
            const elementInfo = Object.values(elementsData).find(item => item.symbol === templateAtom.symbol);
            atom.style.setProperty('--atom-color', getAtomColor(templateAtom.symbol, elementInfo?.category));
            const position = getStagingPosition(index);
            atom.style.left = `${position.x}px`;
            atom.style.top = `${position.y}px`;
            atom.style.transform = 'translateX(-50%) translateY(-50%) scale(.72)';
            atom.style.opacity = '0';
            workspace.appendChild(atom);
        });

        refreshWorkspaceStatus();
        updateFormationStatus('Organizando nós', 'building');

        await new Promise(resolve => setTimeout(resolve, 50)); 
        combineAtoms();
    }

    function addAtomToWorkspace(event) {
        if (combineBtn.disabled) return; 
        const symbol = event.currentTarget.dataset.symbol;
        const atom = document.createElement('div');
        atom.className = 'atom';
        atom.textContent = symbol;
        atom.dataset.symbol = symbol;
        atom.style.setProperty('--atom-color', getAtomColor(symbol, event.currentTarget.dataset.category));
        const position = getStagingPosition(workspace.querySelectorAll('.atom').length);
        atom.style.left = `${position.x}px`;
        atom.style.top = `${position.y}px`;
        atom.style.transform = 'translateX(-50%) translateY(-50%)';
        workspace.appendChild(atom);
        refreshWorkspaceStatus();
    }

    function resetWorkspace() {
        // Para qualquer animação em loop antes de limpar
        anime.remove('.atom');
        anime.remove('.bond');

        workspace.innerHTML = emptyWorkspaceMarkup();
        workspace.classList.remove('molecule-stable', 'dense-molecule');
        resultDisplay.innerHTML = '';
        updateFormationStatus('Aguardando composição', 'waiting');
        activeRecipeKey = null;
        isForming = false;
        combineBtn.disabled = false;
        resetBtn.disabled = false; 
        setRecipeButtonsDisabled(false);
        refreshWorkspaceStatus();
    }

    // --- 5. LÓGICA DE COMBINAÇÃO (TOTALMENTE REFEITA) ---

    async function combineAtoms() {
        if (isForming) return;
        const atomsInWorkspace = workspace.querySelectorAll('.atom');
        if (atomsInWorkspace.length === 0) {
            resetBtn.disabled = false;
            refreshWorkspaceStatus();
            updateFormationStatus('Adicione nós', 'waiting');
            return; 
        }
        
        resultDisplay.innerHTML = ''; 
        combineBtn.disabled = true;
        resetBtn.disabled = true;
        isForming = true;
        setRecipeButtonsDisabled(true);

        // 1. Encontrar a receita (igual a antes)
        const recipeKey = getRecipeKey([...atomsInWorkspace].map(atom => ({ symbol: atom.dataset.symbol })));
        
        const matchedMolecule = recipes_final[recipeKey]; 

        if (matchedMolecule) {
            activeRecipeKey = recipeKey;
            workspace.classList.toggle('dense-molecule', matchedMolecule.structure.atoms.length > 12);
            // SUCESSO!
            const structure = matchedMolecule.structure;
            const layoutAtoms = getRecipeLayout(structure.atoms);
            const atomStock = {};
            atomsInWorkspace.forEach(atom => {
                const symbol = atom.dataset.symbol;
                if (!atomStock[symbol]) atomStock[symbol] = [];
                atomStock[symbol].push(atom);
            });
            
            // 2. Preparar os Átomos e Ligações para a timeline
            // Guarda os DIVs dos átomos na ordem da receita
            const animatedAtoms = []; 
            // Guarda os DIVs das ligações que vamos criar
            const animatedBonds = []; 
            
            const workspaceRect = workspace.getBoundingClientRect();

            // Mapeia os átomos reais para as posições da receita
            structure.atoms.forEach(templateAtom => {
                const realAtom = atomStock[templateAtom.symbol].pop();
                animatedAtoms.push(realAtom);
            });

            // 3. Etapa A: organiza os nós do grafo antes de desenhar as arestas.
            await anime({
                targets: animatedAtoms,
                left: (el, i) => layoutAtoms[i].x,
                top: (el, i) => layoutAtoms[i].y,
                translateX: '-50%',
                translateY: '-50%',
                opacity: 1,
                scale: 1,
                duration: 900,
                easing: 'easeOutExpo',
                delay: anime.stagger(35)
            }).finished;

            updateFormationStatus('Conectando ligações', 'building');

            // Etapa B: cria e cresce cada aresta apenas depois que os nós estão organizados.
            structure.bonds.forEach(bondTemplate => {
                const bond = createBond(
                    animatedAtoms[bondTemplate.from],
                    animatedAtoms[bondTemplate.to],
                    layoutAtoms[bondTemplate.from],
                    layoutAtoms[bondTemplate.to],
                    workspaceRect
                );
                animatedBonds.push(bond);
                workspace.appendChild(bond);
            });

            await anime({
                targets: animatedBonds,
                width: (el) => el.dataset.finalLength + 'px', 
                duration: 420,
                easing: 'easeOutQuad',
                delay: anime.stagger(55)
            }).finished;

            resultDisplay.innerHTML = `<h5 class="alert alert-success p-2 m-0">Formou ${matchedMolecule.name}!</h5>`;
            resetBtn.disabled = false; // Reativa SÓ o reset
            isForming = false;
            setRecipeButtonsDisabled(false);
            refreshWorkspaceStatus();
            updateFormationStatus('Molécula estável', 'complete');
            workspace.classList.add('molecule-stable');

        } else {
            // FALHA! (Inalterado)
            anime({
                targets: atomsInWorkspace,
                translateX: [
                    { value: -10, duration: 50 }, { value: 10, duration: 100 },
                    { value: -10, duration: 100 }, { value: 10, duration: 100 },
                    { value: 0, duration: 50 }
                ],
                easing: 'linear'
            });
            resultDisplay.innerHTML = `<h5 class="alert alert-danger p-2 m-0">Combinação inválida!</h5>`;
            combineBtn.disabled = false;
            resetBtn.disabled = false;
            isForming = false;
            setRecipeButtonsDisabled(false);
            refreshWorkspaceStatus();
            updateFormationStatus('Fórmula não reconhecida', 'error');
        }
    }

    // --- 6. (NOVO) FUNÇÃO AUXILIAR PARA CRIAR LIGAÇÕES ---
    // Esta função NÃO anima. Ela prepara o 'div' da ligação.
    
    function createBond(atom1, atom2, template1, template2, workspaceRect) {
        const wsWidth = workspaceRect.width;
        const wsHeight = workspaceRect.height;
        const atomSize = 50; // Tamanho do átomo (definido no CSS)

        // Calcula as posições FINAIS (em pixels)
        // Pega a % da receita (ex: '50%'), converte para 0.50
        const x1 = (parseFloat(template1.x) / 100) * wsWidth;
        const y1 = (parseFloat(template1.y) / 100) * wsHeight;
        const x2 = (parseFloat(template2.x) / 100) * wsWidth;
        const y2 = (parseFloat(template2.y) / 100) * wsHeight;
        
        // Ajusta o comprimento para não sobrepor o átomo (opcional, mas mais limpo)
        // Isso é complexo, vamos manter simples por agora
        // const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        // Pega a posição do *centro* do átomo (que é o `translateX: -50%`)
        const x1_center = x1;
        const y1_center = y1;
        const x2_center = x2;
        const y2_center = y2;
        
        // Calcula comprimento e ângulo
        const length = Math.sqrt(Math.pow(x2_center - x1_center, 2) + Math.pow(y2_center - y1_center, 2));
        const angle = Math.atan2(y2_center - y1_center, x2_center - x1_center) * 180 / Math.PI;

        const bond = document.createElement('div');
        bond.className = 'bond';
        
        // A ligação começa no centro do átomo 1
        bond.style.left = `${x1_center}px`;
        bond.style.top = `${y1_center}px`;
        
        // Gira para apontar para o átomo 2
        bond.style.transform = `rotate(${angle}deg)`;
        
        // Começa invisível
        bond.style.width = '0px'; 
        
        // Guarda o comprimento final para a animação usar
        bond.dataset.finalLength = length;

        return bond;
    }

    function reflowActiveMolecule() {
        if (!activeRecipeKey || !recipes_final[activeRecipeKey]) return;
        const recipe = recipes_final[activeRecipeKey];
        const layoutAtoms = getRecipeLayout(recipe.structure.atoms);
        const atoms = [...workspace.querySelectorAll('.atom')];
        if (atoms.length !== recipe.structure.atoms.length) return;

        anime.remove(atoms);
        workspace.querySelectorAll('.bond').forEach(bond => bond.remove());

        atoms.forEach((atom, index) => {
            atom.style.left = layoutAtoms[index].x;
            atom.style.top = layoutAtoms[index].y;
            atom.style.transform = 'translateX(-50%) translateY(-50%)';
        });

        const workspaceRect = workspace.getBoundingClientRect();
        recipe.structure.bonds.forEach(bondTemplate => {
            const bond = createBond(
                atoms[bondTemplate.from],
                atoms[bondTemplate.to],
                layoutAtoms[bondTemplate.from],
                layoutAtoms[bondTemplate.to],
                workspaceRect
            );
            bond.style.width = `${bond.dataset.finalLength}px`;
            workspace.appendChild(bond);
        });
        refreshWorkspaceStatus();
    }

    // --- 7. LIGA OS EVENTOS (Inalterado) ---
    combineBtn.addEventListener('click', combineAtoms);
    resetBtn.addEventListener('click', resetWorkspace);
    elementSearch.addEventListener('input', loadElements);
    elementCategoryFilter.addEventListener('change', loadElements);
    window.addEventListener('resize', () => window.requestAnimationFrame(reflowActiveMolecule));

    // --- 8. INICIA A APLICAÇÃO (Inalterado) ---
    loadElements();
    loadRecipes(); 
    validateRecipes();
    refreshWorkspaceStatus();
});