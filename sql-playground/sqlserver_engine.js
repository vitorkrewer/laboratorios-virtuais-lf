/**
 * Microsoft SQL Server Engine (T-SQL Emulação Avançada) - SQL Playground Pro
 * Camada de compatibilidade para sintaxe e comandos do Microsoft SQL Server (T-SQL).
 * Suporta IDENTITY(1,1), SELECT TOP n, GETDATE(), ISNULL(), LEN(), sp_help, colchetes [tabela], Snapshots e Dump.
 */

const icons = {
    table: `<svg class="schema-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zM1 14a1 1 0 0 0 1 1h3v-3H1zm0-4h3v-3H1zm0-4h3V4H1v3zm4 0h5v3H5zm0 4h5v3H5zm0 4h5v3H5z"/></svg>`,
    column: `<svg class="schema-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5zm-8.5-.5h7v-8h-7z"/><path d="M12 1.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8zm-8.5-.5h7v8h-7z"/></svg>`,
    pk: `<svg class="schema-icon pk-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/></svg>`,
    view: `<svg class="schema-icon view-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>`
};

let SQLInstance = null;
let db = null;
let snapshots = [];

function translateTSQLQuery(query) {
    let translated = query.trim();

    // SELECT @@VERSION
    if (translated.match(/@@version/i)) {
        return "SELECT 'Microsoft SQL Server 2022 (RTM) - 16.0.1000.6 (X64) - WebAssembly Simulated' AS 'ServerVersion';";
    }

    // sp_help 'tabela' ou sp_help tabela
    const spHelpMatch = translated.match(/^exec(?:\s+sp_help|\s+dbo\.sp_help)?\s+['"]?(\w+)['"]?\s*;?$/i) || translated.match(/^sp_help\s+['"]?(\w+)['"]?\s*;?$/i);
    if (spHelpMatch) {
        return `SELECT name AS 'Column_name', type AS 'Type', CASE WHEN "notnull"=1 THEN 'no' ELSE 'yes' END AS 'Nullable', CASE WHEN pk=1 THEN 'PRIMARY KEY' ELSE '' END AS 'Constraint' FROM pragma_table_info('${spHelpMatch[1]}');`;
    }

    // sys.tables ou INFORMATION_SCHEMA.TABLES
    if (translated.match(/\b(?:sys\.tables|information_schema\.tables)\b/i)) {
        return "SELECT name AS 'TABLE_NAME', 'BASE TABLE' AS 'TABLE_TYPE' FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';";
    }

    // Remover prefixo dbo. ou "dbo". ou [dbo].
    translated = translated.replace(/\[dbo\]\.\[(\w+)\]/ig, '$1');
    translated = translated.replace(/\b(?:dbo\.|"dbo"\.)(\w+)/ig, '$1');

    // Tradução de Colchetes [tabela].[coluna] -> "tabela"."coluna"
    translated = translated.replace(/\[([\w\s]+)\]/g, '"$1"');

    // Tradução de SELECT TOP (n) ou SELECT TOP n -> SELECT ... LIMIT n
    const topMatch = translated.match(/\bSELECT\s+(?:DISTINCT\s+)?TOP\s+(?:\(?\s*(\d+)\s*\)?)\s+(.+?)(?=\bFROM\b)/i);
    if (topMatch) {
        const topCount = topMatch[1];
        translated = translated.replace(/\bTOP\s+(?:\(?\s*\d+\s*\)?)\s+/i, '');
        if (!translated.match(/\bLIMIT\b/i)) {
            translated = translated.replace(/;?\s*$/, ` LIMIT ${topCount};`);
        }
    }

    // Tradução de Tipos de Dados do SQL Server
    translated = translated.replace(/\bINT\s+IDENTITY(?:\s*\(\s*\d+\s*,\s*\d+\s*\))?\s+PRIMARY\s+KEY\b/ig, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    translated = translated.replace(/\bBIGINT\s+IDENTITY(?:\s*\(\s*\d+\s*,\s*\d+\s*\))?\s+PRIMARY\s+KEY\b/ig, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    translated = translated.replace(/\bIDENTITY(?:\s*\(\s*\d+\s*,\s*\d+\s*\))?\b/ig, 'PRIMARY KEY AUTOINCREMENT');

    translated = translated.replace(/\bNVARCHAR\s*\(\s*(?:MAX|\d+)\s*\)/ig, 'TEXT');
    translated = translated.replace(/\bVARCHAR\s*\(\s*MAX\s*\)/ig, 'TEXT');
    translated = translated.replace(/\bNCHAR\s*\(\s*\d+\s*\)/ig, 'TEXT');
    translated = translated.replace(/\bDATETIME2?\b/ig, 'TEXT');
    translated = translated.replace(/\bSMALLDATETIME\b/ig, 'TEXT');
    translated = translated.replace(/\bBIT\b/ig, 'INTEGER');
    translated = translated.replace(/\bMONEY\b/ig, 'DECIMAL(10,2)');
    translated = translated.replace(/\bSMALLMONEY\b/ig, 'DECIMAL(6,2)');

    // Tradução de Funções Built-in do T-SQL
    translated = translated.replace(/\bGETDATE\(\)/ig, "datetime('now', 'localtime')");
    translated = translated.replace(/\bSYSDATETIME\(\)/ig, "datetime('now', 'localtime')");
    translated = translated.replace(/\bGETUTCDATE\(\)/ig, "datetime('now')");
    translated = translated.replace(/\bISNULL\(/ig, "IFNULL(");
    translated = translated.replace(/\bLEN\(/ig, "LENGTH(");
    translated = translated.replace(/\bCHARINDEX\(/ig, "INSTR(");

    return translated;
}

export const engine = {
    dialectName: "SQL Server (T-SQL Simulado)",

    async init() {
        if (!SQLInstance) {
            SQLInstance = await initSqlJs({
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
            });
        }

        const savedDb = localStorage.getItem('sqlserver_db_data_v2');
        if (savedDb) {
            try {
                const dbArray = savedDb.split(',').map(Number);
                db = new SQLInstance.Database(new Uint8Array(dbArray));
            } catch (e) {
                db = new SQLInstance.Database();
            }
        } else {
            db = new SQLInstance.Database();
        }

        try {
            db.exec("PRAGMA foreign_keys = ON;");
        } catch (e) {}

        this.loadSnapshots();
        if (snapshots.length === 0) {
            this.createSnapshot("Ponto Inicial (Auto)");
        }
    },

    hasTables() {
        if (!db) return false;
        try {
            const res = db.exec("SELECT count(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
            return res.length > 0 && res[0].values[0][0] > 0;
        } catch (e) {
            return false;
        }
    },

    execute(query) {
        if (!db) throw new Error("Banco de dados SQL Server não inicializado.");
        const translated = translateTSQLQuery(query);
        const results = db.exec(translated);
        this.save();
        return results;
    },

    explain(query) {
        if (!db) throw new Error("Banco de dados não inicializado.");
        const translated = translateTSQLQuery(query).replace(/;\s*$/, '');
        return db.exec(`EXPLAIN QUERY PLAN ${translated};`);
    },

    save() {
        if (db) {
            const data = db.export();
            localStorage.setItem('sqlserver_db_data_v2', data.join(','));
        }
    },

    resetDatabase() {
        if (SQLInstance) {
            db = new SQLInstance.Database();
            db.exec("PRAGMA foreign_keys = ON;");
            this.save();
        }
    },

    loadDataset(sqlScript) {
        this.resetDatabase();
        const translated = translateTSQLQuery(sqlScript);
        db.exec(translated);
        this.save();
        this.createSnapshot("Carga de Dataset (SQL Server)");
    },

    createSnapshot(name = "Ponto de Restauração") {
        if (!db) return null;
        const snapshot = {
            id: Date.now(),
            name: name,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
            data: db.export()
        };
        snapshots.unshift(snapshot);
        if (snapshots.length > 10) snapshots.pop();
        this.saveSnapshots();
        return snapshot;
    },

    restoreSnapshot(snapshotId) {
        const snap = snapshots.find(s => s.id === snapshotId);
        if (!snap) throw new Error("Ponto de restauração não encontrado.");
        db = new SQLInstance.Database(snap.data);
        db.exec("PRAGMA foreign_keys = ON;");
        this.save();
    },

    getSnapshots() {
        return snapshots;
    },

    saveSnapshots() {
        try {
            const simplified = snapshots.map(s => ({
                id: s.id,
                name: s.name,
                timestamp: s.timestamp,
                data: Array.from(s.data).join(',')
            }));
            localStorage.setItem('sqlserver_snapshots_v2', JSON.stringify(simplified));
        } catch (e) {}
    },

    loadSnapshots() {
        try {
            const raw = localStorage.getItem('sqlserver_snapshots_v2');
            if (raw) {
                const parsed = JSON.parse(raw);
                snapshots = parsed.map(s => ({
                    id: s.id,
                    name: s.name,
                    timestamp: s.timestamp,
                    data: new Uint8Array(s.data.split(',').map(Number))
                }));
            }
        } catch (e) {
            snapshots = [];
        }
    },

    exportBinary() {
        if (!db) return null;
        return db.export();
    },

    exportSqlDump() {
        if (!db) return '';
        let dump = `-- Microsoft SQL Server (T-SQL) Dump simulado\n-- Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
        
        const tablesResult = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        if (tablesResult.length > 0 && tablesResult[0].values) {
            tablesResult[0].values.forEach(row => {
                const tableName = row[0];
                const createSql = row[1];
                dump += `${createSql};\nGO\n\n`;

                try {
                    const dataResult = db.exec(`SELECT * FROM "${tableName}";`);
                    if (dataResult.length > 0 && dataResult[0].values.length > 0) {
                        const cols = dataResult[0].columns.map(c => `[${c}]`).join(', ');
                        dataResult[0].values.forEach(valRow => {
                            const formattedVals = valRow.map(v => {
                                if (v === null) return 'NULL';
                                if (typeof v === 'number') return v;
                                return `'${String(v).replace(/'/g, "''")}'`;
                            }).join(', ');
                            dump += `INSERT INTO [${tableName}] (${cols}) VALUES (${formattedVals});\n`;
                        });
                        dump += 'GO\n\n';
                    }
                } catch (e) {}
            });
        }
        return dump;
    },

    getSchemaHTML() {
        if (!db) return '<p class="empty-state">Banco de dados não carregado.</p>';
        
        const tablesResult = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
        const viewsResult = db.exec("SELECT name FROM sqlite_master WHERE type='view' ORDER BY name;");

        const hasTables = tablesResult.length > 0 && tablesResult[0].values.length > 0;
        const hasViews = viewsResult.length > 0 && viewsResult[0].values.length > 0;

        if (!hasTables && !hasViews) {
            return `
                <div class="empty-state p-4 text-center">
                    <i class="fa-solid fa-folder-open text-2xl text-gray-400 mb-2 block"></i>
                    <p class="text-xs text-gray-400">Nenhuma tabela criada no SQL Server.</p>
                    <p class="text-[11px] text-cyan-400 mt-1 cursor-pointer" onclick="window.loadDefaultDataset()">👉 Clique para carregar um dataset</p>
                </div>
            `;
        }

        let html = '';

        if (hasTables) {
            html += '<div class="schema-section-title">TABELAS (dbo)</div>';
            tablesResult[0].values.forEach(row => {
                const tableName = row[0];
                let rowCount = 0;
                try {
                    const countRes = db.exec(`SELECT COUNT(*) FROM "${tableName}";`);
                    rowCount = countRes[0].values[0][0];
                } catch (e) {}

                let columnsResult = { values: [] };
                try {
                    columnsResult = db.exec(`PRAGMA table_info("${tableName}");`)[0] || { values: [] };
                } catch (e) {}

                html += `
                    <details class="schema-item" open>
                        <summary class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 font-bold truncate">
                                ${icons.table} [dbo].[${tableName}]
                            </span>
                            <div class="flex items-center gap-1">
                                <span class="table-badge">${rowCount} ${rowCount === 1 ? 'reg' : 'regs'}</span>
                                <button class="quick-query-btn" onclick="window.insertSampleQuery('[dbo].[${tableName}]')" title="Gerar SELECT TOP 10 da tabela">+</button>
                            </div>
                        </summary>
                        <div class="schema-columns">
                            ${columnsResult.values.map(col => `
                                <div class="column-item">
                                    ${col[5] ? icons.pk : icons.column}
                                    <span class="font-mono">[${col[1]}]</span>
                                    <span class="column-details">${col[2] || 'VARCHAR'}${col[3] ? ' • NOT NULL' : ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    </details>
                `;
            });
        }

        if (hasViews) {
            html += '<div class="schema-section-title mt-3">VIEWS (dbo)</div>';
            viewsResult[0].values.forEach(row => {
                const viewName = row[0];
                html += `
                    <details class="schema-item">
                        <summary class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 font-bold text-purple-400 truncate">
                                ${icons.view} [dbo].[${viewName}]
                            </span>
                            <button class="quick-query-btn" onclick="window.insertSampleQuery('[dbo].[${viewName}]')" title="Consultar View">+</button>
                        </summary>
                    </details>
                `;
            });
        }

        return html;
    }
};
