
-- update
DROP PROCEDURE IF EXISTS sp_up_marca;
delimiter #
create procedure sp_up_marca (
	in id integer,
    IN tit VARCHAR(100),
    IN url VARCHAR(100),
    IN logo VARCHAR(100),
    IN flag BOOLEAN,
    in oper VARCHAR(1),
    OUT mensagem VARCHAR(50)
)
begin
	if (oper = 'u') then
		update marca
        set desc_marca = tit,
			url_marca = url,
			logo_marca = logo,
            fl_marca = flag
        where id_marca = id;
	else
		update marca
			set fl_marca = false
            where id_marca = id;
	end if;
	set mensagem = 'Operação realizada com sucesso';
		
        

end #
delimiter ;

