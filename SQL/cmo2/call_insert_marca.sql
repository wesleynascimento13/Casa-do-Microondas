SET @mensagem = '';
SET @id = 0;

CALL SP_Ins_Marca(
    'Nova marca',  -- tit
    'http://example.com', -- url
    'imagem.jpg',         -- logo
    TRUE,                 -- flag
    @id,                  -- id (parâmetro de saída)
    @mensagem             -- mensagem (parâmetro de saída)
);

SELECT @mensagem, @id;

select * from marca;