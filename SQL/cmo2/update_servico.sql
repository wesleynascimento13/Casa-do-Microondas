-- update
DROP PROCEDURE IF EXISTS sp_up_servico;
DELIMITER #

CREATE PROCEDURE sp_up_servico (
    IN p_id_servico INT,
    IN p_id_tipo INT,
    IN tit VARCHAR(50),
    IN descr VARCHAR(200),
    IN img VARCHAR(100),
    IN url VARCHAR(100),
    IN ordem INT,
    IN atv BOOLEAN,
    IN oper CHAR(1),
    OUT mensagem VARCHAR(50)
)
BEGIN
    IF (oper = 'u') THEN
        UPDATE servico
        SET id_tipo = p_id_tipo,
            titulo_servico = tit,
            desc_servico = descr,
            img_servico = img,
            url_servico = url,
            ordem_apresentacao = ordem,
            ativo = atv
        WHERE id_servico = p_id_servico;
    ELSE
        UPDATE servico
        SET ativo = FALSE
        WHERE id_servico = p_id_servico;
    END IF;
    SET mensagem = 'Operação realizada com sucesso';
END #

DELIMITER ;

