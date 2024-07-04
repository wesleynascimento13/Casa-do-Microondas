
-- update
DROP PROCEDURE IF EXISTS sp_up_produto;
delimiter #
create procedure sp_up_produto (
	in id_prod integer,
    IN descr VARCHAR(1000),
    IN id_clien INTEGER,
    IN id_tip INTEGER,
    IN id_marc INTEGER,
    IN id_model INTEGER,
    IN n_serie varchar(50),
    IN capac INTEGER,
    IN problem varchar(1000),
    IN atv BOOLEAN,
    in oper char(1),
    out mensagem varchar(50)
)
begin
	if (oper = 'u') then
		update Produto
        set desc_produto = descr,
			id_cliente = id_clien,
			id_tipo = id_tip,
			id_marca = id_marc,
			id_modelo = id_model,
			nr_serie = n_serie,
			capacidade = capac,
			problema = problem,
			ativo = atv
        where id_produto = id_prod;
	else
		update Produto
			set ativo = false
            where id_produto = id_prod;
	end if;
	set mensagem = 'Operação realizada com sucesso';
		
        

end #
delimiter ;

-- chamada

SET @mensagem = '';

CALL sp_ed_produto(
		1,
	    ' nova Descrição Exemplo',  -- descr
		1,
		1,
		13,
		1,
		000,
		100,
		'microondas estragado sujo feio :(',
		'2024-05-31 12:30:00',
		TRUE,
        'f',
		@mensagem  
);

SELECT @mensagem;

select * from produto;
