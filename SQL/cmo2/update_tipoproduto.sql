-- Update
DROP PROCEDURE IF EXISTS sp_up_tipoproduto;
DELIMITER #

CREATE PROCEDURE sp_up_tipoproduto (
    IN p_id_tipo INT,
    IN p_desc_tipo VARCHAR(100),
    IN flag boolean,
    in oper char(1),
    OUT p_mensagem VARCHAR(50)
)
BEGIN
    IF (oper = 'u') THEN
        UPDATE TipoProduto
        SET desc_tipo = p_desc_tipo,
			ativo = flag
        WHERE id_tipo = p_id_tipo;
    ELSE
        UPDATE TipoProduto
        set ativo = false
        WHERE id_tipo = p_id_tipo;
    END IF;

    SET p_mensagem = 'Operação realizada com sucesso';
END #

DELIMITER ;

-- chamada


SET @mensagem = '';


CALL sp_up_tipoproduto(
    2,                      -- id_tipo
    'Nova Descrição2',       -- desc_tipo
    True,
    'u',
    @mensagem               
);


SELECT @mensagem;

select * from tipoproduto;