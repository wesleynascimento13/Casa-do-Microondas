
-- update da conta de cliente

DROP PROCEDURE IF EXISTS SP_Up_Cliente_Simples;

DELIMITER //

CREATE PROCEDURE SP_Up_Cliente_Simples (
    IN p_id_cliente INT,
    IN p_nome_cliente VARCHAR(100),
    IN p_email_cliente VARCHAR(300),
    IN p_endereco_cliente VARCHAR(1000),
    IN p_fone_cliente VARCHAR(20),
    IN p_senha_cliente VARCHAR(255),
    IN p_ativo BOOLEAN,
    IN p_oper CHAR(1),
    OUT p_retorno_mensagem VARCHAR(50)
)
BEGIN
    IF (p_oper = 'u') THEN
        IF (LENGTH(p_senha_cliente) > 0) THEN
            UPDATE Cliente
            SET nome_cliente = p_nome_cliente,
                email_cliente = p_email_cliente,
                endereco_cliente = p_endereco_cliente,
                fone_cliente = p_fone_cliente,
                senha_hash = p_senha_cliente,
                atv = p_ativo
            WHERE id_cliente = p_id_cliente;
        ELSE
            UPDATE Cliente
            SET nome_cliente = p_nome_cliente,
                email_cliente = p_email_cliente,
                endereco_cliente = p_endereco_cliente,
                fone_cliente = p_fone_cliente,
                atv = p_ativo
            WHERE id_cliente = p_id_cliente;
        END IF;

        SET p_retorno_mensagem = 'Cliente atualizado com sucesso';
    ELSE
        UPDATE Cliente
        SET atv = FALSE
        WHERE id_cliente = p_id_cliente;
        SET p_retorno_mensagem = 'Cliente desativado com sucesso';
    END IF;
END //

DELIMITER ;

select * from cliente;

