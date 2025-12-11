const icons = {
    table: `<svg class="schema-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zM1 14a1 1 0 0 0 1 1h3v-3H1zm0-4h3v-3H1zm0-4h3V4H1v3zm4 0h5v3H5zm0 4h5v3H5zm0 4h5v3H5z"/></svg>`,
    column: `<svg class="schema-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5zm-8.5-.5h7v-8h-7z"/><path d="M12 1.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8zm-8.5-.5h7v8h-7z"/></svg>`,
    pk: `<svg class="schema-icon pk-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/></svg>`
};

const syntaxData = [
    { "command": "CREATE TABLE", "description": "Cria uma nova tabela no banco de dados.", "syntax": "CREATE TABLE name (col1_name col1_type, ...);", "example": "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);" },
    { "command": "DROP TABLE", "description": "Remove uma tabela.", "syntax": "DROP TABLE name;", "example": "DROP TABLE users;" },
    { "command": "INSERT INTO", "description": "Adiciona novos registros.", "syntax": "INSERT INTO table (col1, col2) VALUES (val1, val2);", "example": "INSERT INTO users (name) VALUES ('Alice');" },
    { "command": "SELECT", "description": "Consulta dados.", "syntax": "SELECT cols FROM table WHERE condition;", "example": "SELECT * FROM users WHERE id = 1;" },
];

let db;

export const engine = {
    async init() {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });
        const savedDb = localStorage.getItem('sqlite_db_data');
        if (savedDb) {
            const dbArray = savedDb.split(',').map(Number);
            db = new SQL.Database(new Uint8Array(dbArray));
        } else {
            db = new SQL.Database();
        }
    },

    execute(query) {
        const results = db.exec(query);
        this.save();
        return results;
    },

    save() {
        if (db) {
            const data = db.export();
            localStorage.setItem('sqlite_db_data', data.join(','));
        }
    },

    getSyntaxData() {
        return syntaxData;
    },

    getSchemaHTML() {
        if (!db) return '';
        const tablesResult = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        if (tablesResult.length === 0 || tablesResult[0].values.length === 0) {
            return '<p class="empty-state">Nenhuma tabela criada.</p>';
        }
        
        return tablesResult[0].values.map(row => {
            const tableName = row[0];
            const columnsResult = db.exec(`PRAGMA table_info(${tableName});`)[0];
            return `
                <details class="schema-item" open>
                    <summary>${icons.table} ${tableName}</summary>
                    <div class="schema-columns">
                        ${columnsResult.values.map(col => `
                            <div class="column-item">
                                ${col[5] ? icons.pk : icons.column}
                                <span>${col[1]}</span>
                                <span class="column-details">${col[2]}</span>
                            </div>
                        `).join('')}
                    </div>
                </details>
            `;
        }).join('');
    }
};
