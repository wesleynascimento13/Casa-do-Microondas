DROP PROCEDURE IF EXISTS SP_Ins_contato;

DELIMITER //

CREATE PROCEDURE SP_Ins_contato(
    IN p_id_cliente INT,
    IN p_assunto VARCHAR(100),
    IN p_mensagem VARCHAR(1000),
    OUT p_id_contato INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- verificar se o contato já existe
    IF EXISTS (SELECT id_contato 
               FROM Contato 
               WHERE id_cliente = p_id_cliente 
                 AND assunto = p_assunto 
                 AND mensagem = p_mensagem) THEN
        SET mensagem = 'Esse contato já existe no banco de dados';
        SET p_id_contato = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO Contato (id_cliente, assunto, mensagem, dt_contato)
        VALUES (p_id_cliente, p_assunto, p_mensagem, NOW());
        SET p_id_contato = LAST_INSERT_ID();
        SET mensagem = 'Contato inserido com sucesso';
    END IF;
END //

DELIMITER ;

-- chamada

SET @mensagem = '';
SET @p_id_contato = 0;

CALL SP_Ins_contato(
    1,                 -- ID do cliente
    'Assunto Teste',   -- Assunto do contato
    'Mensagem Teste',  -- Mensagem do contato
    @p_id_contato,                  
    @mensagem           
);

SELECT @mensagem, @p_id_contato;

SELECT * FROM Contato;
SELECT @mensagem;
