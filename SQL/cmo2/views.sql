CREATE VIEW vw_produto AS
SELECT *
FROM Produto;

CREATE VIEW vw_marca AS
SELECT *
FROM Marca;

CREATE VIEW vw_modelo AS
SELECT *
FROM Modelo;

CREATE VIEW vw_tipoproduto AS
SELECT *
FROM Tipoproduto;

CREATE VIEW vw_produto AS
SELECT *
FROM Produto;

CREATE VIEW vw_servico AS
SELECT titulo_servico, desc_servico, img_servico, url_servico
FROM servico;

CREATE OR REPLACE VIEW vw_servicos_ativos AS
SELECT 
    id_servico,
    id_tipo,
    titulo_servico,
    desc_servico,
    img_servico,
    url_servico
FROM servico
WHERE ativo = 1
ORDER BY ordem_apresentacao;

CREATE VIEW vw_marcas_ativas AS
SELECT 
    id_marca,
    desc_marca,
    logo_marca,
    url_marca
FROM marca
WHERE fl_marca = 1;

CREATE VIEW vw_modelos_ativos AS
SELECT 
    id_modelo,
    desc_modelo
FROM modelo
WHERE ativo = 1;

CREATE OR REPLACE VIEW vw_clientes_ativos AS
SELECT 
    c.id_cliente,
    c.nome_cliente,
    c.endereco_cliente,
    c.fone_cliente,
    c.email_cliente,
    c.senha_hash,
    c.permissao,
    COALESCE(
        (SELECT GROUP_CONCAT(CONCAT(ch.desc_chamado, ' - Status: ', ch.status_chamado) ORDER BY ch.dt_chamado DESC SEPARATOR '; ')
         FROM chamado ch
         WHERE ch.id_cliente = c.id_cliente AND ch.ativo = TRUE
        ), 'Nenhum Serviço em andamento...') AS status_chamado_ativo,
    COALESCE(
        GROUP_CONCAT(CONCAT(ch.desc_chamado, ' (', DATE_FORMAT(ch.dt_chamado, '%d/%m/%Y %H:%i:%s'), ')') ORDER BY ch.dt_chamado DESC SEPARATOR '; '),
        'Histórico vazio...'
    ) AS historico_chamados
FROM cliente c
LEFT JOIN chamado ch ON c.id_cliente = ch.id_cliente
WHERE c.atv = 1
GROUP BY c.id_cliente, c.nome_cliente, c.endereco_cliente, c.fone_cliente, c.email_cliente, c.senha_hash;




select * from chamado;

select * from cliente;