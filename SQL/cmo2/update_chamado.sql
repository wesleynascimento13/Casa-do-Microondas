DROP PROCEDURE IF EXISTS sp_up_chamado;
DELIMITER //

CREATE PROCEDURE sp_up_chamado (
    IN p_id_chamado INT,
    IN p_desc_chamado VARCHAR(1000),
    IN p_desc_tipo VARCHAR(100),
    IN p_nr_serie VARCHAR(50),
    IN p_capacidade VARCHAR(20),
    IN p_marca VARCHAR(100),
    IN p_modelo VARCHAR(100),
    IN p_status_chamado VARCHAR(100),
    IN p_entrega BOOLEAN,
    IN p_ativo BOOLEAN,
    IN p_oper CHAR(1),
    OUT p_mensagem VARCHAR(100)
)
BEGIN
    DECLARE v_id_produto INT;
    DECLARE v_id_marca INT;
    DECLARE v_id_modelo INT;
    DECLARE v_id_cliente INT;
    DECLARE v_id_tipo INT;

    -- Verificar e obter o id da marca
    IF p_marca IS NOT NULL THEN
        SELECT id_marca INTO v_id_marca FROM Marca WHERE desc_marca = p_marca;
        
        IF v_id_marca IS NULL THEN
            INSERT INTO Marca (desc_marca) VALUES (p_marca);
            SET v_id_marca = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Verificar e obter o id do modelo
    IF p_modelo IS NOT NULL THEN
        SELECT id_modelo INTO v_id_modelo FROM Modelo WHERE desc_modelo = p_modelo;
        
        IF v_id_modelo IS NULL THEN
            INSERT INTO Modelo (desc_modelo) VALUES (p_modelo);
            SET v_id_modelo = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Verificar e obter o id do tipo
    IF p_desc_tipo IS NOT NULL THEN
        SELECT id_tipo INTO v_id_tipo FROM TipoProduto WHERE desc_tipo = p_desc_tipo;
        
        IF v_id_tipo IS NULL THEN
            INSERT INTO TipoProduto (desc_tipo) VALUES (p_desc_tipo);
            SET v_id_tipo = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Verificar e obter o id do cliente associado ao chamado
    SELECT id_cliente INTO v_id_cliente FROM Chamado WHERE id_chamado = p_id_chamado;

    -- Verificar se o produto já existe
    IF p_nr_serie IS NOT NULL THEN
        SELECT id_produto INTO v_id_produto 
        FROM Produto 
        WHERE id_tipo = v_id_tipo 
          AND id_marca = v_id_marca 
          AND id_modelo = v_id_modelo 
          AND nr_serie = p_nr_serie;

        IF v_id_produto IS NULL THEN
            INSERT INTO Produto (id_cliente, id_tipo, id_marca, id_modelo, nr_serie, capacidade, problema, ativo) 
            VALUES (v_id_cliente, v_id_tipo, v_id_marca, v_id_modelo, p_nr_serie, p_capacidade, p_desc_chamado, TRUE);
            SET v_id_produto = LAST_INSERT_ID();
        ELSE
            -- Atualizar os dados do produto
            UPDATE Produto
            SET id_cliente = v_id_cliente,
                id_tipo = v_id_tipo,
                id_marca = v_id_marca,
                id_modelo = v_id_modelo,
                capacidade = p_capacidade,
                problema = p_desc_chamado,
                ativo = p_ativo
            WHERE id_produto = v_id_produto;
        END IF;
    END IF;

    -- Atualizar o chamado
    IF p_oper = 'u' THEN
        UPDATE Chamado
        SET desc_chamado = p_desc_chamado,
            id_tipo = v_id_tipo,
            id_produto = v_id_produto,
            marca = p_marca,
            modelo = p_modelo,
            status_chamado = p_status_chamado,
            entrega = p_entrega,
            ativo = p_ativo
        WHERE id_chamado = p_id_chamado;
    ELSE
        UPDATE Chamado
        SET ativo = FALSE
        WHERE id_chamado = p_id_chamado;
    END IF;

    SET p_mensagem = 'Operação realizada com sucesso';
END //

DELIMITER ;

select * from servico;
