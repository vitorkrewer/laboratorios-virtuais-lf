/**
 * MySQL Engine (Emulação Avançada) - SQL Playground
 * Camada de compatibilidade para sintaxe e comandos do MySQL sobre WebAssembly.
 * Suporta SHOW TABLES, SHOW COLUMNS, DESCRIBE, AUTO_INCREMENT, TRUNCATE, LIMIT offset, count, Snapshots e Dump.
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

function translateMySQLQuery(query) {
    let translated = query.trim();

    // SHOW TABLES -> SELECT
    if (translated.match(/^show\s+tables\s*;?$/i)) {
        return "SELECT name AS 'Tables_in_database' FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';";
    }

    // SHOW DATABASES
    if (translated.match(/^show\s+databases\s*;?$/i)) {
        return "SELECT 'learningfly_db' AS 'Database';";
    }

    // USE database
    if (translated.match(/^use\s+\w+\s*;?$/i)) {
        return "SELECT 'Database changed' AS 'Status';";
    }

    // DESCRIBE table / DESC table
    const describeMatch = translated.match(/^(?:describe|desc)\s+(\w+)\s*;?$/i);
    if (describeMatch) {
        return `SELECT name AS 'Field', type AS 'Type', CASE WHEN "notnull"=1 THEN 'NO' ELSE 'YES' END AS 'Null', CASE WHEN pk=1 THEN 'PRI' ELSE '' END AS 'Key', dflt_value AS 'Default' FROM pragma_table_info('${describeMatch[1]}');`;
    }

    // SHOW COLUMNS FROM table
    const showColumnsMatch = translated.match(/^show\s+columns\s+from\s+(\w+)\s*;?$/i);
    if (showColumnsMatch) {
        return `SELECT name AS 'Field', type AS 'Type', CASE WHEN "notnull"=1 THEN 'NO' ELSE 'YES' END AS 'Null', CASE WHEN pk=1 THEN 'PRI' ELSE '' END AS 'Key', dflt_value AS 'Default' FROM pragma_table_info('${showColumnsMatch[1]}');`;
    }

    // TRUNCATE TABLE table -> DELETE FROM table
    const truncateMatch = translated.match(/^truncate(?:\s+table)?\s+(\w+)\s*;?$/i);
    if (truncateMatch) {
        return `DELETE FROM "${truncateMatch[1]}"; DELETE FROM sqlite_sequence WHERE name='${truncateMatch[1]}';`;
    }

    // Tradução de tipos de dados MySQL comuns
    translated = translated.replace(/\bINT\s+AUTO_INCREMENT\b/ig, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    translated = translated.replace(/\bBIGINT\s+AUTO_INCREMENT\b/ig, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    translated = translated.replace(/\bAUTO_INCREMENT\b/ig, 'PRIMARY KEY AUTOINCREMENT');
    translated = translated.replace(/\bVARCHAR\s*\(\d+\)/ig, 'TEXT');
    translated = translated.replace(/\bDATETIME\b/ig, 'TEXT');
    translated = translated.replace(/\bNOW\(\)/ig, "datetime('now', 'localtime')");
    translated = translated.replace(/\bIFNULL\(/ig, 'IFNULL(');

    // Suporte a LIMIT offset, count -> LIMIT count OFFSET offset
    const limitOffsetMatch = translated.match(/\bLIMIT\s+(\d+)\s*,\s*(\d+)\b/i);
    if (limitOffsetMatch) {
        const offset = limitOffsetMatch[1];
        const count = limitOffsetMatch[2];
        translated = translated.replace(limitOffsetMatch[0], `LIMIT ${count} OFFSET ${offset}`);
    }

    return translated;
}

export const engine = {
    dialectName: "MySQL (Simulado)",

    async init() {
        if (!SQLInstance) {
            SQLInstance = await initSqlJs({
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
            });
        }

        const savedDb = localStorage.getItem('mysql_db_data_v2');
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
        if (!db) throw new Error("Banco de dados MySQL não inicializado.");
        const translated = translateMySQLQuery(query);
        const results = db.exec(translated);
        this.save();
        return results;
    },

    explain(query) {
        if (!db) throw new Error("Banco de dados não inicializado.");
        const translated = translateMySQLQuery(query).replace(/;\s*$/, '');
        return db.exec(`EXPLAIN QUERY PLAN ${translated};`);
    },

    save() {
        if (db) {
            const data = db.export();
            localStorage.setItem('mysql_db_data_v2', data.join(','));
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
        const translated = translateMySQLQuery(sqlScript);
        db.exec(translated);
        this.save();
        this.createSnapshot("Carga de Dataset (MySQL)");
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
            localStorage.setItem('mysql_snapshots_v2', JSON.stringify(simplified));
        } catch (e) {}
    },

    loadSnapshots() {
        try {
            const raw = localStorage.getItem('mysql_snapshots_v2');
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
        let dump = `-- MySQL Dump simulado (Learning Fly SQL Playground)\n-- Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
        
        const tablesResult = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        if (tablesResult.length > 0 && tablesResult[0].values) {
            tablesResult[0].values.forEach(row => {
                const tableName = row[0];
                const createSql = row[1];
                dump += `${createSql};\n\n`;

                try {
                    const dataResult = db.exec(`SELECT * FROM "${tableName}";`);
                    if (dataResult.length > 0 && dataResult[0].values.length > 0) {
                        const cols = dataResult[0].columns.map(c => `\`${c}\``).join(', ');
                        dataResult[0].values.forEach(valRow => {
                            const formattedVals = valRow.map(v => {
                                if (v === null) return 'NULL';
                                if (typeof v === 'number') return v;
                                return `'${String(v).replace(/'/g, "''")}'`;
                            }).join(', ');
                            dump += `INSERT INTO \`${tableName}\` (${cols}) VALUES (${formattedVals});\n`;
                        });
                        dump += '\n';
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
                    <p class="text-xs text-gray-400">Nenhuma tabela criada no MySQL.</p>
                    <p class="text-[11px] text-cyan-400 mt-1 cursor-pointer" onclick="window.loadDefaultDataset()">👉 Clique para carregar um dataset</p>
                </div>
            `;
        }

        let html = '';

        if (hasTables) {
            html += '<div class="schema-section-title">TABELAS (MySQL)</div>';
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
                                ${icons.table} ${tableName}
                            </span>
                            <div class="flex items-center gap-1">
                                <span class="table-badge">${rowCount} ${rowCount === 1 ? 'reg' : 'regs'}</span>
                                <button class="quick-query-btn" onclick="window.insertSampleQuery('${tableName}')" title="Gerar SELECT * da tabela">+</button>
                            </div>
                        </summary>
                        <div class="schema-columns">
                            ${columnsResult.values.map(col => `
                                <div class="column-item">
                                    ${col[5] ? icons.pk : icons.column}
                                    <span class="font-mono">${col[1]}</span>
                                    <span class="column-details">${col[2] || 'VARCHAR'}${col[3] ? ' • NOT NULL' : ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    </details>
                `;
            });
        }

        if (hasViews) {
            html += '<div class="schema-section-title mt-3">VIEWS</div>';
            viewsResult[0].values.forEach(row => {
                const viewName = row[0];
                html += `
                    <details class="schema-item">
                        <summary class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 font-bold text-purple-400 truncate">
                                ${icons.view} ${viewName}
                            </span>
                            <button class="quick-query-btn" onclick="window.insertSampleQuery('${viewName}')" title="Consultar View">+</button>
                        </summary>
                    </details>
                `;
            });
        }

        return html;
    }
};

