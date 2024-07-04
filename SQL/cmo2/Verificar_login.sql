DROP PROCEDURE IF EXISTS SP_Verificar_Login;

DELIMITER //

CREATE PROCEDURE SP_Verificar_Login (
    IN p_email_cliente VARCHAR(300),
    IN p_senha_cliente VARCHAR(100),
    OUT p_id_cliente INT,
    OUT p_mensagem VARCHAR(50)
)
BEGIN
    DECLARE senha_hash VARCHAR(100);

    -- Buscar o hash da senha para o cliente fornecido
    SELECT senha_hash INTO senha_hash
    FROM Cliente
    WHERE email_cliente = p_email_cliente;

    -- Verificar se encontrou um cliente com o email fornecido
    IF senha_hash IS NULL THEN
        SET p_mensagem = 'Cliente não encontrado';
        SET p_id_cliente = 0;
    ELSE
        -- Verificar se a senha fornecida corresponde ao hash armazenado
        IF senha_hash = p_senha_cliente THEN -- Trocar pela função bcrypt.verify no backend
            SET p_mensagem = 'Login realizado com sucesso';
            -- Recuperar o ID do cliente para enviar de volta ao cliente
            SELECT id_cliente INTO p_id_cliente
            FROM Cliente
            WHERE email_cliente = p_email_cliente;
        ELSE
            SET p_mensagem = 'Senha incorreta';
            SET p_id_cliente = 0;
        END IF;
    END IF;
END //

DELIMITER ;