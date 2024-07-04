DROP PROCEDURE IF EXISTS SP_Ins_servico;

DELIMITER //

CREATE PROCEDURE SP_Ins_servico(
    IN p_id_tipo INT,
    IN tit VARCHAR(50),
    IN descr VARCHAR(200),
    IN img VARCHAR(100),
    IN url VARCHAR(100),
    IN ordem INTEGER,
    IN atv BOOLEAN,
    IN flag BOOLEAN,
    OUT id INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- Verificar se o serviço já existe
    IF EXISTS (SELECT titulo_servico 
               FROM Servico 
               WHERE titulo_servico = tit) THEN
        SET mensagem = 'Esse servico já existe no banco de dados';
        SET id = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO servico (
            id_tipo,
            titulo_servico,
            desc_servico,
            img_servico,
            ordem_apresentacao,
            url_servico,
            fl_servico,
            ativo
        ) VALUES (
            p_id_tipo,
            tit,
            descr,
            img,
            ordem,
            url,
            flag,
            atv
        );
        SET id = LAST_INSERT_ID();
        SET mensagem = 'Serviço inserido com sucesso';
    END IF;
END //

DELIMITER ;
