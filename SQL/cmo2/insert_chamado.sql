DROP PROCEDURE IF EXISTS SP_Ins_Chamado;

DELIMITER //

CREATE PROCEDURE SP_Ins_Chamado(
    IN p_id_cliente INT,
    IN p_desc_chamado VARCHAR(1000),
    IN p_desc_tipo VARCHAR(100),
    IN p_nr_serie VARCHAR(50),
    IN p_capacidade VARCHAR(20),
    IN p_marca VARCHAR(100),
    IN p_modelo VARCHAR(100),
    IN p_status_chamado VARCHAR(100),
    IN p_entrega BOOLEAN,
    IN p_ativo BOOLEAN,
    OUT p_id_chamado INT,
    OUT p_mensagem VARCHAR(100)
)
BEGIN
    DECLARE v_id_marca INT;
    DECLARE v_id_modelo INT;
    DECLARE v_id_produto INT;
    DECLARE v_id_entrega INT;
    DECLARE v_id_tipo INT;
    DECLARE v_mensagem_entrega VARCHAR(100);

    -- Verificar se p_desc_tipo é um número (id_tipo) ou uma string (desc_tipo)
    IF p_desc_tipo IS NOT NULL AND p_desc_tipo REGEXP '^[0-9]+$' THEN
        -- Caso p_desc_tipo seja um número (id_tipo)
        SET v_id_tipo = CAST(p_desc_tipo AS INT);
        
        -- Buscar o desc_tipo correspondente ao id_tipo
        SELECT desc_tipo INTO p_desc_tipo FROM TipoProduto WHERE id_tipo = v_id_tipo;

    ELSE
        -- Caso p_desc_tipo seja uma string (desc_tipo)
        SELECT id_tipo INTO v_id_tipo FROM TipoProduto WHERE desc_tipo = p_desc_tipo;

        IF v_id_tipo IS NULL THEN
            -- Se não encontrar, inserir o novo tipo de produto
            INSERT INTO TipoProduto (desc_tipo) VALUES (p_desc_tipo);
            SET v_id_tipo = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Verificar se a marca existe ou inserir nova marca
    IF p_marca IS NOT NULL THEN
        SELECT id_marca INTO v_id_marca FROM Marca WHERE desc_marca = p_marca;

        IF v_id_marca IS NULL THEN
            INSERT INTO Marca (desc_marca) VALUES (p_marca);
            SET v_id_marca = LAST_INSERT_ID();
        END IF;
    END IF;

    -- Verificar se o modelo existe ou inserir novo modelo
    IF p_modelo IS NOT NULL THEN
        SELECT id_modelo INTO v_id_modelo FROM Modelo WHERE desc_modelo = p_modelo;

        IF v_id_modelo IS NULL THEN
            INSERT INTO Modelo (desc_modelo) VALUES (p_modelo);
            SET v_id_modelo = LAST_INSERT_ID();
        END IF;
    ELSE
        SET v_id_modelo = NULL; -- Permitir inserir NULL no campo modelo
    END IF;

    -- Verificar se o produto já existe ou inserir novo produto
    IF p_nr_serie IS NOT NULL THEN
        SELECT id_produto INTO v_id_produto 
        FROM Produto 
        WHERE id_tipo = v_id_tipo 
          AND id_marca = COALESCE(v_id_marca, 0) 
        --  AND id_modelo = COALESCE(v_id_modelo, 0) 
          AND nr_serie = p_nr_serie;

        IF v_id_produto IS NULL THEN
            INSERT INTO Produto (id_cliente, id_tipo, id_marca, id_modelo, nr_serie, capacidade, ativo, problema) 
            VALUES (p_id_cliente, v_id_tipo, COALESCE(v_id_marca, NULL), COALESCE(v_id_modelo, NULL), p_nr_serie, p_capacidade, TRUE, p_desc_chamado);
            SET v_id_produto = LAST_INSERT_ID();
        END IF;
    ELSE
        -- Caso p_nr_serie seja NULL, inserir um novo produto sem verificar o número de série
        INSERT INTO Produto (id_cliente, id_tipo, id_marca, id_modelo, nr_serie, capacidade, ativo, problema) 
        VALUES (p_id_cliente, v_id_tipo, COALESCE(v_id_marca, NULL), COALESCE(v_id_modelo, NULL), p_nr_serie, p_capacidade, TRUE, p_desc_chamado);
        SET v_id_produto = LAST_INSERT_ID();
    END IF;

    -- Inserir o chamado
    INSERT INTO Chamado (id_cliente, desc_chamado, id_tipo, id_produto, marca, modelo, status_chamado, entrega, ativo)
    VALUES (p_id_cliente, p_desc_chamado, v_id_tipo, COALESCE(v_id_produto, NULL), p_marca, p_modelo, p_status_chamado, p_entrega, p_ativo);
    
    SET p_id_chamado = LAST_INSERT_ID();
    SET p_mensagem = 'Chamado inserido com sucesso';

    -- Chamar a stored procedure de entrega se p_entrega for TRUE
    IF p_entrega THEN
        CALL SP_Ins_entrega(p_id_chamado, p_id_cliente, 'aberta', v_id_entrega, v_mensagem_entrega);
        -- Verifique se a entrega foi inserida com sucesso e atualize a mensagem
        IF v_id_entrega IS NOT NULL THEN
            SET p_mensagem = CONCAT(p_mensagem, ' e ', v_mensagem_entrega);
        ELSE
            SET p_mensagem = CONCAT(p_mensagem, ', mas houve um problema ao inserir a entrega: ', v_mensagem_entrega);
        END IF;
    END IF;

END //

DELIMITER ;