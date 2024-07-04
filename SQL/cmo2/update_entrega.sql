DROP PROCEDURE IF EXISTS sp_up_entrega;

DELIMITER //

CREATE PROCEDURE sp_up_entrega (
    IN p_id_entrega INT,
    IN p_endereco VARCHAR(255),
    IN p_status VARCHAR(100),
    OUT p_retorno_mensagem VARCHAR(50)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SET p_retorno_mensagem = 'Erro ao atualizar a entrega';
    END;

    START TRANSACTION;

    -- Atualizar a entrega com os novos valores
    UPDATE Entrega
    SET endereco = p_endereco,
        status = p_status
    WHERE id_entrega = p_id_entrega;

    SET p_retorno_mensagem = 'Entrega atualizada com sucesso';

    COMMIT;
END //

DELIMITER ;
