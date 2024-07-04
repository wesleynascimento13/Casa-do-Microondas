DROP PROCEDURE IF EXISTS SP_Ins_modelo;

DELIMITER //

CREATE PROCEDURE SP_Ins_modelo(
    IN descr VARCHAR(200),
    IN atv BOOLEAN,
    OUT id INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- verificar se o serviço já existe
    IF EXISTS (SELECT desc_modelo
               FROM Modelo
               WHERE desc_modelo = descr) THEN
        SET mensagem = 'Esse modelo já existe no banco de dados';
        SET id = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO Modelo (desc_modelo,
                            ativo)
             VALUES (descr,
                     atv);
        SET id = LAST_INSERT_ID();
        SET mensagem = 'Modelo inserido com sucesso';
    END IF;
END //

DELIMITER ;

-- chamada

SET @mensagem = '';
SET @id = 0;

CALL SP_Ins_modelo(
    'Descrição modelo',  -- descr
    TRUE,                 -- atv
    @id,                  
    @mensagem             
);

SELECT @mensagem, @id;

select * from modelo;