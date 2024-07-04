DROP PROCEDURE IF EXISTS SP_Ins_cliente;

DELIMITER //

CREATE PROCEDURE SP_Ins_cliente(
    IN nome VARCHAR(100),
    IN status_cliente VARCHAR(20),
    IN endereco VARCHAR(1000),
    IN fone VARCHAR(20),
    IN email VARCHAR(300),
    IN senha VARCHAR(100),
    IN permissao_p VARCHAR(20),
    IN ativo BOOLEAN,
    OUT id_cliente INT,
    OUT mensagem VARCHAR(50)
)
BEGIN
    -- Verificar se o cliente já existe pelo nome
    IF EXISTS (SELECT id_cliente FROM Cliente WHERE nome_cliente = nome) THEN
        SET mensagem = 'Este cliente já existe no banco de dados';
        SET id_cliente = NULL;
    ELSE
        INSERT INTO Cliente (
            nome_cliente,
            status,
            endereco_cliente,
            fone_cliente,
            email_cliente,
            senha_hash,
            permissao,
            atv
        )
        VALUES (
            nome,
            status_cliente,
            endereco,
            fone,
            email,
            senha,
            permissao_p,
            ativo
        );
        
        SET id_cliente = LAST_INSERT_ID();
        SET mensagem = 'Cliente inserido com sucesso';
    END IF;
END //

DELIMITER ;

-- chamada
SET @mensagem = '';
SET @id = 0;

CALL SP_Ins_cliente(
    'juquinha',
    'novo',
    'Rua do Centro, 123',
    '(11) 00000-0000',
    'joao@gmail.com',
    'hashed_password',  -- Substitua 'hashed_password' pela senha criptografada real
    'cliente',
    1,
    @id,
    @mensagem
);

SELECT @mensagem as mensagem, @id as id_cliente;

select * from Cliente;
select @mensagem;