DROP PROCEDURE IF EXISTS SP_Ins_TipoProduto;

DELIMITER //

CREATE PROCEDURE SP_Ins_TipoProduto(
    IN p_desc_tipo VARCHAR(100),
    IN flag BOOLEAN,
    OUT p_id_tipo INT,
    OUT p_mensagem VARCHAR(50)
)
BEGIN
    -- Verificar se o tipo de produto já existe pela descrição
    IF EXISTS (SELECT desc_tipo 
               FROM TipoProduto 
               WHERE desc_tipo = p_desc_tipo) THEN
        SET p_mensagem = 'Esse tipo de produto já existe no banco de dados';
        SET p_id_tipo = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO TipoProduto (desc_tipo, ativo)
             VALUES (p_desc_tipo, flag);
        SET p_id_tipo = LAST_INSERT_ID();
        SET p_mensagem = 'Tipo de produto inserido com sucesso';
    END IF;
END //

DELIMITER ;



-- chamada
SET @mensagem = '';
SET @id_tipo = 0;


CALL SP_Ins_TipoProduto(
    '2 Novo Tipo de Produto', -- desc_tipo
    True,
    @id_tipo,               
    @mensagem            
);


SELECT @mensagem, @id_tipo;

select * from tipoproduto;
