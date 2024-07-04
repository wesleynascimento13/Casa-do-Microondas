DROP PROCEDURE IF EXISTS SP_Ins_produto;

DELIMITER //

CREATE PROCEDURE SP_Ins_produto(
    IN descr VARCHAR(1000),
    IN id_clien INTEGER,
    IN id_tip INTEGER,
    IN id_marc INTEGER,
    IN id_model INTEGER,
    IN n_serie varchar(50),
    IN capac varchar(20),
    IN problem varchar(1000),
   -- IN data_cad DATETIME,
    IN atv BOOLEAN,
    OUT id_prod INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- verificar se o produto já existe
    IF EXISTS (SELECT nr_serie 
               FROM Produto 
               WHERE nr_serie = n_serie ) THEN
        SET mensagem = 'Esse sproduto já existe no banco de dados';
        SET id_prod = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO Produto (desc_produto,
							id_cliente,
							id_tipo,
							id_marca,
							id_modelo,
							nr_serie,
							capacidade,
							problema,
					
                            ativo)
             VALUES (descr,
					id_clien,
					id_tip,
					id_marc,
					id_model,
					n_serie,
					capac,
					problem,
			
					atv);
        SET id_prod = LAST_INSERT_ID();
        SET mensagem = 'SProduto inserido com sucesso';
    END IF;
END //

DELIMITER ;

-- chamada

SET @mensagem = '';
SET @id_prod = 0;

CALL SP_Ins_produto(
    'Descrição Exemplo',  -- descr
    1,
    1,
    13,
    1,
    000,
    100,
    'microondas estragado sujo feio :(',
    '2024-05-31 12:30:00',
    TRUE,
    @id_prod,                 
    @mensagem             
);

SELECT @mensagem, @id_prod;
select * from produto;