DROP PROCEDURE IF EXISTS SP_Ins_Marca;

DELIMITER //

CREATE PROCEDURE SP_Ins_Marca(
    IN descricao VARCHAR(100),
    IN url VARCHAR(100),
    IN logo VARCHAR(100),
    IN flag BOOLEAN,
    OUT id INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- verificar se a marca já existe
    IF EXISTS (SELECT desc_marca 
               FROM Marca 
               WHERE desc_marca = descricao) THEN
         SET mensagem = 'Essa marca já existe no banco de dados';
         SET id = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO Marca (desc_marca, 
                           logo_marca, 
                           url_marca, 
                           fl_marca)
        VALUES (descricao, 
                logo, 
                url, 
                flag);
        SET id = LAST_INSERT_ID();
        SET mensagem = 'marca inserida com sucesso';
    END IF;
END //

DELIMITER ;