-- roa upd do cliente adm
DROP PROCEDURE IF EXISTS SP_Up_Cliente;

DELIMITER //

CREATE PROCEDURE SP_Up_Cliente (
    IN p_id_cliente INT,
    IN p_nome_cliente VARCHAR(100),
    IN p_status VARCHAR(20),
    IN p_endereco_cliente VARCHAR(1000),
    IN p_fone_cliente VARCHAR(20),
    IN p_email_cliente VARCHAR(300),
    IN p_permissao VARCHAR(20),
    IN p_atv BOOLEAN,
    IN p_oper CHAR(1),
    OUT p_retorno_mensagem VARCHAR(50)
)
BEGIN
    DECLARE v_dt_cadastro TIMESTAMP;

    IF (p_oper = 'u') THEN
        -- Atualizar o cliente
        UPDATE Cliente
        SET nome_cliente = p_nome_cliente,
            status = p_status,
            endereco_cliente = p_endereco_cliente,
            fone_cliente = p_fone_cliente,
            email_cliente = p_email_cliente,
            permissao = p_permissao,
            atv = p_atv
        WHERE id_cliente = p_id_cliente;

        SET p_retorno_mensagem = 'Cliente atualizado com sucesso';
    ELSE
        -- Deletar o cliente
        DELETE FROM Cliente
        WHERE id_cliente = p_id_cliente;

        SET p_retorno_mensagem = 'Cliente deletado com sucesso';
    END IF;
END //

DELIMITER ;