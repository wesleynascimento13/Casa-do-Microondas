CREATE DATABASE CMO;

USE CMO;

CREATE TABLE OS(
	id_os INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_cliente INTEGER NOT NULL,
	id_tipo_atendimento INTEGER NOT NULL,
	id_observacao INTEGER NOT NULL,
	id_status INTEGER NOT NULL,
	id_filial INTEGER NOT NULL,
	id_plano_pagamento INTEGER NOT NULL,
	id_fechador INTEGER NOT NULL,
	id_exclusao INTEGER NOT NULL,
	id_acessorio INTEGER NOT NULL,
	descricao_problema VARCHAR(200) NOT NULL,
	descricao_OS VARCHAR(200) NOT NULL,
	data_abertura DATE NOT NULL,
	data_compra DATE,
	data_garantia DATE,
	data_oficina DATE,
	serie INTEGER NOT NULL,
	especificacao VARCHAR(100) NOT NULL,
	valor_mo FLOAT(6,2),
	valor_peca FLOAT(6,2),
	valor_desconto FLOAT(6,2),
	valor_total FLOAT(6,2)
);

CREATE TABLE Cliente(
    id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_status INT NOT NULL,
    id_filial INT NOT NULL,
    nome_cliente VARCHAR(200) NOT NULL,
    nome_fonetico VARCHAR(200),
    data_cadastro DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    cnpj VARCHAR(14),
    inscr_municipal INT,
    data_atualizacao DATE NOT NULL
);

CREATE TABLE Status (
    id_status INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_status VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE Endereco (
    id_endereco INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    tipo_endereco VARCHAR(100) NOT NULL,
    endereco VARCHAR(1000) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    observacao VARCHAR(100)
);

CREATE TABLE Fone (
    id_fone INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    tipo_fone VARCHAR(30) NOT NULL,
    numero VARCHAR(11) NOT NULL,
    contato VARCHAR(30)
);

CREATE TABLE Email (
    id_email INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    tipo_email VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE Observacao (
    id_observacao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_observacao VARCHAR(100) NOT NULL,
    forma_pagamento VARCHAR(30) NOT NULL
);

CREATE TABLE TipoProduto (
    id_tipo_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_tipo_produto VARCHAR(100),
    principal BOOLEAN NOT NULL
);

CREATE TABLE OSTipoproduto (
    id_os INT NOT NULL,
    id_tipo_produto INT NOT NULL
);

CREATE TABLE Modelo (
    id_modelo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_marca INT NOT NULL,
    id_tipo_produto INT NOT NULL,
    descricao_modelo VARCHAR(100)
);

CREATE TABLE Marca (
    id_marca INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_marca VARCHAR(100) NOT NULL,
    principal BOOLEAN NOT NULL
);

CREATE TABLE Produto (
    id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_modelo INT NOT NULL,
    id_os INT NOT NULL,
    id_filial INT NOT NULL,
    descricao_produto VARCHAR(1000),
    valor_custo FLOAT(6,2) NOT NULL,
    valor_venda FLOAT(6,2) NOT NULL,
    data_cadastro DATE NOT NULL,
    qt_minima INT NOT NULL,
    qt_estoque INT NOT NULL,
    fl_balcao BOOLEAN NOT NULL,
    fl_ativo BOOLEAN NOT NULL,
    codigo INT NOT NULL,
    unidade VARCHAR(30) NOT NULL
);

CREATE TABLE Servico (
    id_servico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_os INT NOT NULL,
    descricao VARCHAR(1000),
    valor FLOAT(6,2) NOT NULL,
    quantidade INT NOT NULL
);

CREATE TABLE OSServico (
    id_servico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_servico VARCHAR(1000) NOT NULL,
    valor_unitario FLOAT(6,2) NOT NULL
);

CREATE TABLE Categoria (
    id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE Filial (
    id_filial INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fone VARCHAR(11),
    celular VARCHAR(11),
    cnpj VARCHAR(14) NOT NULL
);

CREATE TABLE Funcionario (
    id_funcionario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_status INT NOT NULL,
    id_filial INT NOT NULL,
    nome_funcionario VARCHAR(200) NOT NULL,
    data_admissao DATE NOT NULL,
    data_demissao DATE,
    departamento VARCHAR(200) NOT NULL,
    funcao VARCHAR(200) NOT NULL,
    senha INT NOT NULL
);

CREATE TABLE Fechamento (
    id_fechamento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_funcionario INT NOT NULL,
    data_fechamento DATE NOT NULL,
    observacao_fechamento VARCHAR(200)
);

CREATE TABLE Exclusao (
    id_exclusao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_funcionario INT NOT NULL,
    data_exclusao DATE NOT NULL
);

CREATE TABLE PlanoPagamento (
    id_plano_pagamento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_plano_pagamento VARCHAR(200),
    parcelas INT NOT NULL,
    juros INT
);

CREATE TABLE FormaPagamento (
    id_forma_pagamento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_plano_pagamento INT NOT NULL,
    descricao_forma_pagamento VARCHAR(100) NOT NULL
);

CREATE TABLE Acessorio (
    id_acessorio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_acessorio VARCHAR(100) NOT NULL
);

CREATE TABLE TipoAtendimento (
    id_tipo_atendimento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao_tipo_atendimento VARCHAR(100) NOT NULL
);

