DROP PROCEDURE IF EXISTS SP_Ins_usuario;

DELIMITER //

CREATE PROCEDURE SP_Ins_usuario(
    IN usuario VARCHAR(50),
    IN senha_hash VARCHAR(100),
    IN permissao VARCHAR(20),
    IN ativo BOOLEAN,
    OUT id INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- Verificar se o usuário já existe
    IF EXISTS (SELECT id_usuario FROM Usuario WHERE usuario = usuario) THEN
        SET mensagem = 'Esse usuário já existe no banco de dados';
        SET id = NULL; -- ou qualquer valor que indique que não houve inserção
    ELSE
        INSERT INTO Usuario (
            usuario,
            senha_hash,
            permissao,
            atv
        )
        VALUES (
            usuario,
            senha_hash,
            permissao,
            ativo
        );
        SET id = LAST_INSERT_ID();
        SET mensagem = 'Usuário inserido com sucesso';
    END IF;
END //

DELIMITER ;