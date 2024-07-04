
-- update
DROP PROCEDURE IF EXISTS sp_up_modelo;
delimiter #
create procedure sp_up_modelo (
	in id integer,
    in descr varchar(200),
    in atv boolean,
    in oper char(1),
    out mensagem varchar(50)
)
begin
	if (oper = 'u') then
		update Modelo
        set desc_modelo = descr,
			ativo = atv
        where id_modelo = id;
	else
		update Modelo
			set ativo = false
            where id_modelo = id;
	end if;
	set mensagem = 'Operação realizada com sucesso';
		
        

end #
delimiter ;

-- chamada

SET @mensagem = '';

CALL sp_up_modelo(
	1,
    'nova Descrição Exemplo',  -- descr
    TRUE,                 -- atv
    'f',                 -- oper
    @mensagem             -- mensagem (parâmetro de saída)
);

SELECT @mensagem;

select * from modelo;
