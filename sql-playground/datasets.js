/**
 * SQL Playground - Datasets Pedagógicos & Banco de Desafios
 * Learning Fly • Ambientes Virtuais de Aprendizagem
 */

export const datasets = {
    ecommerce: {
        id: "ecommerce",
        name: "🛒 E-Commerce & Vendas",
        description: "Estrutura completa de loja virtual com clientes, produtos, categorias, pedidos e itens de pedido.",
        sql: `
-- Criação das Tabelas
CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    data_cadastro DATE NOT NULL
);

CREATE TABLE produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    categoria_id INTEGER NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    data_pedido DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE itens_pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Inserção de Dados
INSERT INTO categorias (nome, departamento) VALUES
('Smartphones', 'Tecnologia'),
('Notebooks', 'Tecnologia'),
('Monitores', 'Periféricos'),
('Áudio & Fones', 'Acessórios'),
('Cadeiras Gamer', 'Móveis');

INSERT INTO clientes (nome, email, cidade, estado, data_cadastro) VALUES
('Ana Silva', 'ana.silva@email.com', 'São Paulo', 'SP', '2025-01-15'),
('Bruno Costa', 'bruno.costa@email.com', 'Rio de Janeiro', 'RJ', '2025-02-10'),
('Carla Mendes', 'carla.mendes@email.com', 'Belo Horizonte', 'MG', '2025-02-18'),
('Diego Rocha', 'diego.rocha@email.com', 'Porto Alegre', 'RS', '2025-03-01'),
('Eduarda Lima', 'eduarda.lima@email.com', 'Curitiba', 'PR', '2025-03-12'),
('Fabio Santos', 'fabio.santos@email.com', 'São Paulo', 'SP', '2025-03-20');

INSERT INTO produtos (nome, categoria_id, preco, estoque) VALUES
('iPhone 15 Pro', 1, 7299.00, 15),
('Samsung Galaxy S24', 1, 5499.00, 22),
('MacBook Air M2', 2, 8999.00, 8),
('Dell Inspiron 15', 2, 3899.00, 18),
('Monitor Dell 27 4K', 3, 2199.00, 12),
('Headphone Sony WH-1000XM5', 4, 1899.00, 25),
('Cadeira Gamer Ergonômica Pro', 5, 1499.00, 10);

INSERT INTO pedidos (cliente_id, data_pedido, status, valor_total) VALUES
(1, '2025-03-10 14:30:00', 'Entregue', 7299.00),
(2, '2025-03-12 10:15:00', 'Entregue', 5798.00),
(3, '2025-03-15 16:45:00', 'Processando', 8999.00),
(1, '2025-03-18 11:20:00', 'Enviado', 2199.00),
(4, '2025-03-20 09:00:00', 'Entregue', 1899.00),
(5, '2025-03-22 18:10:00', 'Pendente', 1499.00);

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 1, 7299.00),
(2, 2, 1, 5499.00),
(2, 4, 1, 1899.00),
(3, 3, 1, 8999.00),
(4, 5, 1, 2199.00),
(5, 6, 1, 1899.00),
(6, 7, 1, 1499.00);
`
    },

    universidade: {
        id: "universidade",
        name: "🎓 Universidade & Ensino",
        description: "Gestão acadêmica com alunos, cursos, disciplinas, professores e notas de matrículas.",
        sql: `
CREATE TABLE cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    area VARCHAR(50) NOT NULL,
    duracao_semestres INTEGER NOT NULL
);

CREATE TABLE professores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    titulacao VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso_id INTEGER NOT NULL,
    semestre_atual INTEGER NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE disciplinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    curso_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    carga_horaria INTEGER NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id),
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

CREATE TABLE matriculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    nota_final DECIMAL(4,2),
    frequencia_pct DECIMAL(5,2),
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

INSERT INTO cursos (nome, area, duracao_semestres) VALUES
('Ciência da Computação', 'Exatas', 8),
('Engenharia de Software', 'Exatas', 8),
('Sistemas de Informação', 'Exatas', 8),
('Design Digital', 'Artes', 6);

INSERT INTO professores (nome, titulacao, email) VALUES
('Dr. Alan Turing', 'Doutor', 'alan@uni.edu.br'),
('Dra. Ada Lovelace', 'Doutora', 'ada@uni.edu.br'),
('Me. Linus Torvalds', 'Mestre', 'linus@uni.edu.br'),
('Dra. Grace Hopper', 'Doutora', 'grace@uni.edu.br');

INSERT INTO alunos (nome, matricula, curso_id, semestre_atual) VALUES
('Lucas Santos', '20240101', 1, 3),
('Mariana Ferreira', '20240102', 1, 3),
('Pedro Henrique', '20230205', 2, 5),
('Juliana Paes', '20240210', 3, 2),
('Gabriel Oliveira', '20230112', 2, 5),
('Beatriz Ramos', '20250101', 4, 1);

INSERT INTO disciplinas (nome, curso_id, professor_id, carga_horaria) VALUES
('Banco de Dados I', 1, 2, 80),
('Algoritmos e Estruturas de Dados', 1, 1, 80),
('Engenharia de Requisitos', 2, 4, 60),
('Sistemas Operacionais', 2, 3, 80),
('Interface Humano-Computador', 4, 4, 60);

INSERT INTO matriculas (aluno_id, disciplina_id, nota_final, frequencia_pct, status) VALUES
(1, 1, 9.5, 95.0, 'Aprovado'),
(1, 2, 8.0, 90.0, 'Aprovado'),
(2, 1, 6.0, 85.0, 'Aprovado'),
(2, 2, 4.5, 70.0, 'Reprovado'),
(3, 3, 9.0, 100.0, 'Aprovado'),
(3, 4, 7.5, 88.0, 'Aprovado'),
(5, 3, 8.5, 92.0, 'Aprovado'),
(5, 4, 8.0, 95.0, 'Aprovado');
`
    },

    empresa_rh: {
        id: "empresa_rh",
        name: "🏢 Empresa & Recursos Humanos",
        description: "Gestão corporativa com departamentos, cargos, funcionários, salários e projetos.",
        sql: `
CREATE TABLE departamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    orcamento_anual DECIMAL(12,2) NOT NULL
);

CREATE TABLE cargos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(100) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    piso_salarial DECIMAL(10,2) NOT NULL
);

CREATE TABLE funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    departamento_id INTEGER NOT NULL,
    cargo_id INTEGER NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    data_admissao DATE NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    FOREIGN KEY (cargo_id) REFERENCES cargos(id)
);

CREATE TABLE projetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(150) NOT NULL,
    departamento_id INTEGER NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

CREATE TABLE alocacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    funcionario_id INTEGER NOT NULL,
    projeto_id INTEGER NOT NULL,
    horas_semanais INTEGER NOT NULL,
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

INSERT INTO departamentos (nome, orcamento_anual) VALUES
('Tecnologia da Informação', 1500000.00),
('Engenharia de Produto', 1200000.00),
('Marketing & Vendas', 800000.00),
('Recursos Humanos', 450000.00);

INSERT INTO cargos (titulo, nivel, piso_salarial) VALUES
('Desenvolvedor de Software', 'Junior', 4500.00),
('Desenvolvedor de Software', 'Pleno', 8500.00),
('Desenvolvedor de Software', 'Senior', 14000.00),
('Product Manager', 'Senior', 15000.00),
('Analista de Marketing', 'Pleno', 6000.00),
('Business Partner RH', 'Senior', 9000.00);

INSERT INTO funcionarios (nome, departamento_id, cargo_id, salario, data_admissao) VALUES
('Carlos Drummond', 1, 3, 16500.00, '2021-03-01'),
('Clarice Lispector', 1, 2, 9200.00, '2022-07-15'),
('Machado de Assis', 1, 1, 5000.00, '2024-01-10'),
('Cecília Meireles', 2, 4, 15800.00, '2020-11-01'),
('Guimarães Rosa', 3, 5, 6800.00, '2023-05-20'),
('Rachel de Queiroz', 4, 6, 9500.00, '2022-02-14');

INSERT INTO projetos (nome, departamento_id, data_inicio, data_fim, status) VALUES
('Plataforma Cloud Multi-Tenant', 1, '2024-01-01', '2024-12-31', 'Concluído'),
('App Mobile de Autoatendimento', 1, '2025-01-15', NULL, 'Em Andamento'),
('Redesenho da Linha de Produtos', 2, '2025-02-01', NULL, 'Em Andamento'),
('Campanha Global de Expansão', 3, '2025-03-01', '2025-06-30', 'Planejado');

INSERT INTO alocacoes (funcionario_id, projeto_id, horas_semanais) VALUES
(1, 2, 20),
(2, 2, 30),
(3, 2, 40),
(4, 3, 35),
(5, 4, 40);
`
    }
};

export const challenges = [
    {
        id: 1,
        title: "1. Consulta Básica e Projeção",
        dataset: "ecommerce",
        level: "Iniciante",
        description: "Selecione o <strong>nome</strong> e o <strong>preco</strong> de todos os produtos cadastrados, ordenando do mais caro para o mais barato.",
        hint: "Use `SELECT nome, preco FROM produtos ORDER BY preco DESC;`",
        solution: "SELECT nome, preco FROM produtos ORDER BY preco DESC;"
    },
    {
        id: 2,
        title: "2. Filtro com Condição (WHERE)",
        dataset: "ecommerce",
        level: "Iniciante",
        description: "Encontre todos os clientes que moram no estado de <strong>'SP'</strong> cadastrados no sistema.",
        hint: "Use `SELECT * FROM clientes WHERE estado = 'SP';`",
        solution: "SELECT * FROM clientes WHERE estado = 'SP';"
    },
    {
        id: 3,
        title: "3. Agregações e Contagem (GROUP BY)",
        dataset: "ecommerce",
        level: "Intermediário",
        description: "Exiba a <strong>quantidade total de produtos</strong> e a <strong>média de preço</strong> para cada categoria (agrupado por `categoria_id`).",
        hint: "Use `SELECT categoria_id, COUNT(*) AS total_produtos, AVG(preco) AS media_preco FROM produtos GROUP BY categoria_id;`",
        solution: "SELECT categoria_id, COUNT(*) AS total_produtos, AVG(preco) AS media_preco FROM produtos GROUP BY categoria_id;"
    },
    {
        id: 4,
        title: "4. Junção Interna (INNER JOIN)",
        dataset: "universidade",
        level: "Intermediário",
        description: "Liste o <strong>nome do aluno</strong>, a <strong>matrícula</strong> e o <strong>nome do curso</strong> em que ele está matriculado.",
        hint: "Use `SELECT a.nome, a.matricula, c.nome AS curso FROM alunos a INNER JOIN cursos c ON a.curso_id = c.id;`",
        solution: "SELECT a.nome, a.matricula, c.nome AS curso FROM alunos a INNER JOIN cursos c ON a.curso_id = c.id;"
    },
    {
        id: 5,
        title: "5. Filtro em Agrupamento (HAVING)",
        dataset: "empresa_rh",
        level: "Avançado",
        description: "Exiba os <strong>departamentos</strong> cuja folha salarial total (soma dos salários dos funcionários) seja <strong>maior que R$ 10.000,00</strong>.",
        hint: "Use `SELECT d.nome, SUM(f.salario) AS folha_total FROM departamentos d INNER JOIN funcionarios f ON d.id = f.departamento_id GROUP BY d.nome HAVING SUM(f.salario) > 10000;`",
        solution: "SELECT d.nome, SUM(f.salario) AS folha_total FROM departamentos d INNER JOIN funcionarios f ON d.id = f.departamento_id GROUP BY d.nome HAVING SUM(f.salario) > 10000;"
    },
    {
        id: 6,
        title: "6. Criação de Tabela Virtual (VIEW)",
        dataset: "empresa_rh",
        level: "Avançado",
        description: "Crie uma VIEW chamada <code>v_quadro_ti</code> que mostre o nome, cargo (título do cargo) e salário de todos os funcionários do departamento de Tecnologia da Informação.",
        hint: "Use `CREATE VIEW v_quadro_ti AS SELECT f.nome, c.titulo, f.salario FROM funcionarios f INNER JOIN departamentos d ON f.departamento_id = d.id INNER JOIN cargos c ON f.cargo_id = c.id WHERE d.nome = 'Tecnologia da Informação';`",
        solution: "CREATE VIEW v_quadro_ti AS SELECT f.nome, c.titulo, f.salario FROM funcionarios f INNER JOIN departamentos d ON f.departamento_id = d.id INNER JOIN cargos c ON f.cargo_id = c.id WHERE d.nome = 'Tecnologia da Informação';"
    }
];
