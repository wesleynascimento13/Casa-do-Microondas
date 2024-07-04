SET @mensagem = '';

CALL sp_up_servico(
	4,
    'novo titulo',     
    'nova Descrição Exemplo', 
    'nova imagem.jpg',        
    'http://novoexample.com', 
    7,                    
    TRUE,               
    'u',                
    @mensagem           
);

SELECT @mensagem;
select * from servico;