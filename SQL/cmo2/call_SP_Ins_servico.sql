SET @mensagem = '';
SET @id = 0;

CALL SP_Ins_servico(
    'Titulo Exemplo',     -- tit
    'Descrição Exemplo',  -- descr
    'imagem.jpg',         -- img
    'http://example.com', -- url
    5,                    -- ord
    TRUE,                 -- atv
    TRUE,                 -- oper
    @id,                  -- id (parâmetro de saída)
    @mensagem             -- mensagem (parâmetro de saída)
);

SELECT @mensagem, @id;
drop table servico;
select * from servico;