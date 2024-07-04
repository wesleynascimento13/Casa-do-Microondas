DROP PROCEDURE IF EXISTS sp_upd_contato;

DELIMITER //

CREATE PROCEDURE SP_Up_Contato (
    IN p_id_contato INT,
    IN p_id_cliente INT,
    IN p_assunto VARCHAR(100),
    IN p_mensagem VARCHAR(1000),
    IN p_resposta VARCHAR(1000),
    IN p_oper CHAR(1),
    OUT p_retorno_mensagem VARCHAR(50)
)
BEGIN
    IF (p_oper = 'u') THEN
        UPDATE Contato
        SET id_cliente = p_id_cliente,
            assunto = p_assunto,
            mensagem = p_mensagem,
            resposta = p_resposta,
            dt_resposta = NOW()
        WHERE id_contato = p_id_contato;
        SET p_retorno_mensagem = 'Contato atualizado com sucesso';
    ELSE
        DELETE FROM Contato
        WHERE id_contato = p_id_contato;
        SET p_retorno_mensagem = 'Contato deletado com sucesso';
    END IF;
END //

DELIMITER ;

-- chamada de exemplo

SET @p_retorno_mensagem = '';

CALL SP_Upd_Contato(
    1,                 -- ID do contato
    1,                 -- ID do cliente
    'Novo Assunto',    -- Novo assunto
    'Nova Mensagem',   -- Nova mensagem
    'Nova Resposta',   -- Nova resposta
    'u',               -- Operação ('u' para update, qualquer outra para delete)
    @p_retorno_mensagem
);

SELECT @p_retorno_mensagem;

SELECT * FROM Contato;