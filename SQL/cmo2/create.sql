-- CREATE DATABASE CMO2;

USE CMO2;

CREATE TABLE TipoProduto (
    id_tipo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    desc_tipo VARCHAR(100) NOT NULL
);

CREATE TABLE Modelo (
    id_modelo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    desc_modelo VARCHAR(100)
);

CREATE TABLE Marca (
    id_marca INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    desc_marca VARCHAR(100),
    logo_marca VARCHAR(100),
    url_marca VARCHAR(100),
    fl_marca BOOLEAN
);

CREATE TABLE Produto (
    id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    desc_produto VARCHAR(100),
    id_cliente INT,
    id_tipo INT,
    id_marca INT,
    id_modelo INT,
    nr_serie VARCHAR(50),
    capacidade VARCHAR(20),
    problema VARCHAR(1000),
    solucao VARCHAR(1000),
    ativo boolean,
    dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_tipo) REFERENCES TipoProduto(id_tipo),
    FOREIGN KEY (id_marca) REFERENCES Marca(id_marca),
    FOREIGN KEY (id_modelo) REFERENCES Modelo(id_modelo)
);


CREATE TABLE Servico (
    id_servico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_tipo INT NOT NULL,
    titulo_servico VARCHAR(100),
    desc_servico VARCHAR(500),
    img_servico VARCHAR(100),
    ordem_apresentacao INT,
    url_servico VARCHAR(100),
    fl_servico BOOLEAN,
    ativo boolean,
    FOREIGN KEY (id_tipo) REFERENCES tipoproduto(id_tipo)
);


alter table TipoProduto add column dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
alter table Modelo add column dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
alter table Marca add column dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
alter table Servico add column dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
alter table Cliente add column dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE Contato (
    id_contato INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_cliente INT NULL,
    assunto VARCHAR(100) NULL,
    mensagem VARCHAR(1000) NULL,
    dt_contato  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resposta VARCHAR(1000) NULL,
    dt_resposta DATETIME NULL
);


CREATE TABLE Chamado (
    id_chamado INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_cliente INT NOT NULL,
    desc_chamado VARCHAR(1000) NULL, -- problema
    id_tipo int NOT NULL, -- TipoProd
    id_produto INT, -- Produto
    marca VARCHAR(100) NULL,
    modelo VARCHAR(100) NULL,
    status_chamado VARCHAR(100) NULL,
    entrega boolean,
    ativo boolean NULL,
    dt_chamado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
    FOREIGN KEY (id_tipo) REFERENCES tipoproduto(id_tipo)
);

CREATE TABLE Entrega (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_chamado INT NOT NULL,
    id_cliente INT NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    status VARCHAR(100) NOT NULL,
    dt_entrega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_chamado) REFERENCES Chamado(id_chamado),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

create table Cliente (
	id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_cliente varchar(100) NOT NULL UNIQUE,
    status varchar(20),
    endereco_cliente varchar(1000) NOT NULL,
    fone_cliente VARCHAR(20) NOT NULL,
    email_cliente varchar(300) NOT NULL,
	senha_hash VARCHAR(100) NOT NULL,
    permissao VARCHAR(20),
    atv boolean,
    dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from entrega;
select * from marca;
select * from tipoproduto;
select * from servico;
select * from chamado;
select * from produto;
select * from cliente;