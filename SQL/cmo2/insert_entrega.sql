DROP PROCEDURE IF EXISTS SP_Ins_entrega;

DELIMITER //

CREATE PROCEDURE SP_Ins_entrega(
    IN p_id_chamado INT,
    IN p_id_cliente INT,
    IN p_status VARCHAR(100),
    OUT p_id_entrega INT,
    OUT p_mensagem VARCHAR(100)
)
BEGIN
    DECLARE v_endereco VARCHAR(255);

    -- Verificar se o cliente existe e obter o endereço do cliente
    IF EXISTS (SELECT id_cliente FROM Cliente WHERE id_cliente = p_id_cliente) THEN
        SELECT endereco_cliente INTO v_endereco FROM Cliente WHERE id_cliente = p_id_cliente;

        -- Inserir a entrega com o endereço do cliente e o status
        INSERT INTO Entrega (id_chamado, id_cliente, endereco, status)
        VALUES (p_id_chamado, p_id_cliente, v_endereco, p_status);

        SET p_id_entrega = LAST_INSERT_ID();
        SET p_mensagem = 'Entrega inserida com sucesso';
    ELSE
        SET p_id_entrega = NULL;
        SET p_mensagem = 'Cliente não existe';
    END IF;
END //

DELIMITER ;

select * from chamado;
