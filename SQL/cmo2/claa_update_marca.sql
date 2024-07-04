SET @mensagem = '';

CALL sp_up_marca(
	13,
    'novo titulo',     -- tit
    'http://novoexample.com', -- url
    'nova logo.jpg',         -- logo
    TRUE,                 -- flag
    'f',                 -- oper
    @mensagem             -- mensagem (parâmetro de saída)
);

SELECT @mensagem;

select * from marca;