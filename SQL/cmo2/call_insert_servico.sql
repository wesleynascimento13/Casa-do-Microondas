SET @mensagem = '';
set @id = '';

CALL SP_Ins_servico(
    'Titulo Exemplo',   -- tit
    'Descrição Exemplo',-- descr
    'imagem.jpg',       -- img
     5,
    'http://example.com', -- url
    TRUE,               -- atv
    'O',                -- oper
    @mensagem,           -- mensagem (parâmetro de saída)
    @id
);

SELECT @mensagem, @id;