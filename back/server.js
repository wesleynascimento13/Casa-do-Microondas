import express from "express";
import bodyParser from "body-parser";
//import sqlServer from "mssql"
import mysql from 'mysql2';
import jwt from "jsonwebtoken";
import cors from 'cors';
import bcrypt from 'bcrypt';

/*
const dbConfig = {
    server:"52.5.245.24",
    database: "cmo",
    user: "adminCMO",
    password: "@Uniandrade_2024",
    port: 1433,
    options: {
        trustServerCertificate: true,
    }
};

const conexao = sqlServer.connect(dbConfig, (err) => {
    if (err)
        console.log(err)
    else
        console.log('conectado com sql server.');
});
*/
const SEGREDO = 'REMOTA';

const app = express();
const porta = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

//
const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "cmo2",
    user: "root",
    timezone: 'Z'
});

conexao.connect();
//



app.listen(porta, () => {
    console.log("Servidor rodando e escutando na porta 5000.")
});

// chamadas rotas mysql

app.get("/", (req, resp) => {
    resp.status(200).send("Nosso servido CMO")
});

// middleware

// Middleware para verificar token JWT
function verificarToken(req, res, next) {
    const token = req.headers['authorization']; // Obtém o token do cabeçalho Authorization

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token.split(' ')[1], SEGREDO, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.userId = decoded.id; // Armazena o ID do usuário decodificado
        next();
    });
}

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const query = `
        SELECT id_cliente, senha_hash, permissao
        FROM vw_clientes_ativos
        WHERE email_cliente = ?
    `;
    conexao.query(query, [email], (err, results) => {
        if (err) {
            console.error("Erro ao buscar cliente:", err);
            return res.status(500).json({ autenticado: false, mensagem: "Erro interno ao buscar cliente" });
        }

        if (results.length === 0) {
            return res.status(404).json({ autenticado: false, mensagem: "Cliente não encontrado" });
        }

        const cliente = results[0];

        bcrypt.compare(senha, cliente.senha_hash, (err, match) => {
            if (err) {
                console.error("Erro ao comparar senha:", err);
                return res.status(500).json({ autenticado: false, mensagem: "Erro interno ao autenticar cliente" });
            }

            if (!match) {
                return res.status(401).json({ autenticado: false, mensagem: "Senha incorreta" });
            }

            const token = jwt.sign({ id: cliente.id_cliente }, SEGREDO, { expiresIn: 10000000000});
            return res.status(200).json({ autenticado: true, token: token, idCliente: cliente.id_cliente, permissao: cliente.permissao });
        });
    });
});



// Rota para inclusão de novos serviços

app.post("/servicos", (req, resp) => {
    let tipo_id = req.body.tipo_id;
    let tit = req.body.tit;
    let desc = req.body.desc;
    let img = req.body.img;
    let url = null; 
    let ordem = null;
    let atv = true;
    let flag = null;

    conexao.query(
        `CALL sp_ins_servico(?, ?, ?, ?, ?, ?, ?, ?, @id, @mensagem)`, 
        [tipo_id, tit, desc, img, url, ordem, atv, flag], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('problema ao inserir serviço');
            }
            else {
                console.log(linha);
                resp.send('serviço inserido!');
            }
            
        });
    
});

// get do serviços para o site

app.get("/servicos", (req, res) => {
    conexao.query(`SELECT * FROM vw_servicos_ativos`, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar serviços:', err);
            res.status(500).json({ error: 'Erro ao buscar serviços.' });
            return;
        }
        res.json(rows);
    });
});

// get serviços para o formulário

app.get("/servicos/:id", verificarToken, (req, res) => {
    let id_servico = req.params.id;
    conexao.promise().query(`
        SELECT *
        FROM vw_servicos_ativos
        WHERE id_servico = ?`, [id_servico])
    .then(([rows, fields]) => {
        if (rows.length > 0) {
            res.json(rows[0]); 
        } else {
            res.status(404).json({ message: 'Serviço não encontrado' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar serviço' });
    });
});

// get admin serviços

app.get("/admServicos", (req, res) => {
    conexao.query(`
        SELECT *
        FROM servico
        ORDER BY ordem_apresentacao
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar serviços:", err);
            res.status(500).json({ error: "Erro interno ao buscar serviços" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// Rota de update serviço

app.put('/servicos', (req, res) => {
    let { id_servico, tipo_id, tit, desc, url = null, img, ordem = null, ativo, oper } = req.body;

    conexao.query(`
        CALL SP_up_servico(?, ?, ?, ?, ?, ?, ?, ?, ?, @mensagem)
    `, [id_servico, tipo_id, tit, desc, img, url, ordem, ativo, oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar serviço:", err);
            res.status(500).send('Problema ao atualizar serviço');
        } else {
            console.log("Serviço atualizado:", result);
            res.status(200).send('Serviço atualizado com sucesso');
        }
    });
});


// Rota para inclusão de novas marcas

app.post("/marcas", (req, resp) => {
    let tit = req.body.tit;
    let url = null;
    let logo = req.body.logo;
    let flag = true;

    conexao.query(
        `CALL SP_Ins_Marca(?, ?, ?, ?, @id, @mensagem)`, 
        [tit, url, logo, flag], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('problema ao inserir marca');
            }
            else {
                console.log(linha);
                resp.send('Marca inserida!');
            }
            
        });
    
});

// Rota get marcas do site

app.get("/marcas", (req, res) => {
    conexao.query(`SELECT * FROM vw_marcas_ativas`, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar marcas:', err);
            res.status(500).json({ error: 'Erro ao buscar marcas.' });
            return;
        }
        res.json(rows);
    });
});

// rota para get marcas do adm

app.get("/admMarcas", (req, res) => {
    conexao.query(`
       SELECT *
        FROM marca
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar marcas:", err);
            res.status(500).json({ error: "Erro interno ao buscar marcas" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});



// Rota de update marca

app.put('/marcas', (req, res) => {
    let { id,
        tit,
        url = null,
        logo,
        flag,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_marca(?, ?, ?, ?, ?, ?, @mensagem)
    `, [id, tit, url, logo, flag, oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar marca:", err);
            res.status(500).send('Problema ao atualizar marca');
        } else {
            console.log("Marca atualizada:", result);
            res.status(200).send('Marca atualizada com sucesso');
        }
    });
});


// Rota para inclusão de novos tipos produto

app.post("/tipoProduto", (req, resp) => {
    let tit = req.body.tit;
    let ativo = true;

    conexao.query(
        `CALL SP_Ins_TipoProduto(?, ?, @p_id_tipo, @p_mensagem)`, 
        [tit, ativo], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir tipo de produto');
            }
            else {
                console.log(linha);
                resp.send('Tipo de produto inserido!');
            }
            
        });
    
});

// Rota para get tipoproduto do adm

app.get("/admTipoProduto", (req, res) => {
    conexao.query(`
       SELECT *
        FROM tipoproduto
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar Tipos de produto:", err);
            res.status(500).json({ error: "Erro interno ao buscar Tipos de produto" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de tipoproduto

app.put('/tipoproduto', (req, res) => {
    let { id,
        tit,
        ativo,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_tipoproduto(?, ?, ?, ?, @p_mensagem)
    `, [id, tit, ativo, oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar tipo de produto:", err);
            res.status(500).send('Problema ao atualizar tipo de produto');
        } else {
            console.log("Tipo de produto atualizada:", result);
            res.status(200).send('tipo de produto atualizado com sucesso');
        }
    });
});


// Rota para inclusão de novos modelos

app.post("/modelos", (req, resp) => {
    let descr = req.body.descr;
    let flag = true;

    conexao.query(
        `CALL SP_Ins_modelo(?, ?, @id, @mensagem)`, 
        [descr, flag], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir modelo');
            }
            else {
                console.log(linha);
                resp.send('Modelo inserido!');
            }
            
        });
    
});

// rota para get de modelos do site

app.get("/modelos", (req, res) => {
    conexao.query(`
        SELECT *
        FROM vw_modelos_ativos
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar modelos:", err);
            res.status(500).json({ error: "Erro interno ao buscar modelos" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para get admin modelos

app.get("/admModelos", (req, res) => {
    conexao.query(`
        SELECT *
        FROM modelo
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar modelos:", err);
            res.status(500).json({ error: "Erro interno ao buscar modelos" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de modelo

app.put('/modelos', (req, res) => {
    let { id,
        tit,
        ativo,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_modelo(?, ?, ?, ?, @mensagem)
    `, [id, tit, ativo, oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualiza modelo:", err);
            res.status(500).send('Problema ao atualizar modelo');
        } else {
            console.log("Modelo atualizado:", result);
            res.status(200).send('modelo atualizado com sucesso');
        }
    });
});

// rota para post de produto

app.post("/produtos", (req, resp) => {
    let {tit,
        id_clien,
        id_tip,
        id_marc,
        id_model = null,
        n_serie,
        capac,
        problem,
        soluc,
        } = req.body;
    let atv = true;

    conexao.query(
        `CALL SP_Ins_produto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @id_prod, @mensagem)`, 
        [tit,
        id_clien,
        id_tip,
        id_marc,
        id_model,
        n_serie,
        capac,
        problem,
        soluc,
        atv], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir produto');
            }
            else {
                console.log(linha);
                resp.send('Produto inserido!');
            }
            
        });
    
});

// rota para get admin produto

app.get("/admProdutos", (req, res) => {
    conexao.query(`
        SELECT *
        FROM produto
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar produtos:", err);
            res.status(500).json({ error: "Erro interno ao buscar produtos" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de produto

app.put('/produtos', (req, res) => {
    let {id,
        tit,
        id_clien,
        id_tip,
        id_marc,
        id_model,
        n_serie,
        capac,
        problem,
        soluc,
        atv,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_produto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @mensagem)
    `, [id,
        tit,
        id_clien,
        id_tip,
        id_marc,
        id_model,
        n_serie,
        capac,
        problem,
        soluc,
        atv,
        oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar produto:", err);
            res.status(500).send('Problema ao atualizar produto');
        } else {
            console.log("produto atualizado:", result);
            res.status(200).send('produto atualizado com sucesso');
        }
    });
});

// rota para post de contato

app.post("/contatos", verificarToken, (req, resp) => {
    let {id_clien,
        assunto,
        mensagem,
        } = req.body;

    conexao.query(
        `CALL SP_Ins_contato(?, ?, ?, @p_id_contat, @mensagem)`, 
        [id_clien,
        assunto,
        mensagem,], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir contato');
            }
            else {
                console.log(linha);
                resp.send('contato inserido!');
            }
            
        });
    
});


// rota get adm contato

app.get("/admContatos", (req, res) => {
    conexao.query(`
        SELECT *
        FROM Contato
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar cotatos:", err);
            res.status(500).json({ error: "Erro interno ao buscar contatos" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de contato

app.put('/contatos', (req, res) => {
    let {id,
        id_clien,
        assunto,
        mensagem,
        resposta,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_contato(?, ?, ?, ?, ?, ?, @mensagem)
    `, [id,
        id_clien,
        assunto,
        mensagem,
        resposta,
        oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar contato:", err);
            res.status(500).send('Problema ao atualizar contato');
        } else {
            console.log("contato atualizado:", result);
            res.status(200).send('contato atualizado com sucesso');
        }
    });
});

// rota para post de chamados

app.post("/chamados", verificarToken, (req, resp) => {
    let id_cliente = req.body.id_cliente;
    let desc_chamado = req.body.desc_chamado;
    let tipo_desc = req.body.tipo_desc;
    let nr_serie = null; 
    let capacidade = null;
    let marca = req.body.marca;
    let modelo = null;
    let status = "Aberta";
    let entrega = req.body.entrega;
    let ativo = true;

    conexao.query(
        `CALL SP_Ins_chamado(?, ?, ?, ?, ?, ?,?, ?, ?, ?, @p_id_chamado, @p_mensagem)`, 
        [id_cliente,
        desc_chamado,
        tipo_desc,
        nr_serie,
        capacidade,
        marca,
        modelo,
        status,
        entrega,
        ativo], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir chamado');
            }
            else {
                console.log(linha);
                resp.send('chamado inserido!');
            }
            
        });
    
});

// rota para post de chamados de adm

app.post("/admchamados", verificarToken, (req, resp) => {
    let id_cliente = req.body.id_cliente;
    let desc_chamado = req.body.desc_chamado;
    let tipo_desc = req.body.tipo_desc;
    let nr_serie = req.body.nr_serie;
    let capacidade = req.body.capacidade;
    let marca = req.body.marca;
    let modelo = null;
    let status = "Aberta";
    let entrega = req.body.entrega;
    let ativo = true;

    conexao.query(
        `CALL SP_Ins_chamado(?, ?, ?, ?, ?, ?,?, ?, ?, ?, @p_id_chamado, @p_mensagem)`, 
        [id_cliente,
        desc_chamado,
        tipo_desc,
        nr_serie,
        capacidade,
        marca,
        modelo,
        status,
        entrega,
        ativo], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao inserir chamado');
            }
            else {
                console.log(linha);
                resp.send('chamado inserido!');
            }
            
        });
    
});



// rota get adm chamado

app.get("/admChamados", (req, res) => {
    conexao.query(`
        SELECT c.*, tp.desc_tipo
        FROM Chamado c
        JOIN TipoProduto tp ON c.id_tipo = tp.id_tipo
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar chamado:", err);
            res.status(500).json({ error: "Erro interno ao buscar chamados" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de chamados

app.put('/chamados', (req, res) => {
    let {id_chamado,
        desc_chamado,
        tipo_desc,
        nr_serie,
        capacidade,
        marca,
        modelo,
        status,
        entrega,
        ativo,
        oper } = req.body;

    conexao.query(`
        CALL SP_up_chamado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @mensagem)
    `, [id_chamado,
        desc_chamado,
        tipo_desc,
        nr_serie,
        capacidade,
        marca,
        modelo,
        status,
        entrega,
        ativo,
        oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar chamado:", err);
            res.status(500).send('Problema ao atualizar chamado');
        } else {
            console.log("chamado atualizado:", result);
            res.status(200).send('chamado atualizado com sucesso');
        }
    });
});

//rota post para entrega

app.post("/entregas", verificarToken, (req, resp) => {
    let id_chamado = req.body.id_chamado;
    let id_cliente = req.body.id_cliente;
    let stat = "aberta";

    conexao.query(
        `CALL SP_Ins_entrega(?, ?, ?, @p_id_entrega, @p_mensagem)`, 
        [id_chamado, id_cliente, stat], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao cadastrar entrega');
                resp.send(erro)
            }
            else {
                console.log(linha);
                resp.send('Entrega cadastrada!');
            }
            
        });
    
});


// rota get adm entrega

app.get("/admEntregas", (req, res) => {
    conexao.query(`
        SELECT *
        FROM Entrega
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar entrega:", err);
            res.status(500).json({ error: "Erro interno ao buscar entrega" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});

// rota para update de entrega

app.put('/entregas', (req, res) => {
    let {id_entrega,
        endereco,
        status,
        oper} = req.body;

    conexao.query(`
        CALL SP_up_entrega(?, ?, ?, ?, @p_retorno_mensagem)
    `, [id_entrega,
        endereco,
        status,
        oper], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar entrega:", err);
            res.status(500).send('Problema ao atualizar entregao');
        } else {
            console.log("entrega atualizada:", result);
            res.status(200).send('Entrega atualizada com sucesso');
        }
    });
});


//rota post para cadastro (inserir clientes)

app.post("/clientes", (req, resp) => {
    //console.log("Dados recebidos do front-end:", req.body);
    const {
        nome,
        endereco,
        fone,
        email,
        senha,
        permissao,
    } = req.body;
    const status = 'novo';
    const ativo = true;
   
    // Criptografar a senha antes de armazenar no banco de dados (usando bcrypt, por exemplo)
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Erro ao criptografar senha:", err);
            return resp.status(500).json({ error: "Erro interno ao cadastrar usuário" });
        }

        const query = "CALL SP_Ins_cliente(?, ?, ?, ?, ?, ?, ?, ?, @id_cliente, @mensagem)";
        const values = [
            nome,
            status,
            endereco,
            fone,
            email,
            hashedPassword,
            permissao,
            ativo
        ];

        conexao.query(query, values, (err, result) => {
            if (err) {
                console.error("Erro ao cadastrar cliente:", err);
                resp.status(500).json({ error: "Erro interno ao cadastrar cliente" });
            } else {
                console.log("Cliente cadastrado com sucesso:", result);
                resp.status(201).json({ message: "Cliente cadastrado com sucesso" });
            }
        });
    });
});

// rota get adm clientes

app.get("/admCliente", (req, res) => {
    conexao.query(`
        SELECT *
        FROM Cliente
    `, (err, rows) => {
        if (err) {
            console.error("Erro ao buscar clientes:", err);
            res.status(500).json({ error: "Erro interno ao buscar clientes" });
        } else {
            res.json(rows); // Retorna os dados como JSON
        }
    });
});


// rota get formulario clientes
app.get("/cliente/:idCliente", verificarToken, (req, res) => {
    const { idCliente } = req.params;
    const sqlQuery = `
        SELECT *
        FROM vw_clientes_ativos
        WHERE id_cliente = ?;
    `;

    conexao.query(sqlQuery, [idCliente], (err, rows) => {
        if (err) {
            console.error("Erro ao buscar dados do cliente:", err);
            res.status(500).json({ error: "Erro interno ao buscar dados do cliente" });
        } else if (rows.length === 0) {
            res.status(404).json({ message: "Cliente não encontrado" });
        } else {
            const cliente = rows[0];
            res.json(cliente);
        }
    });
});

// rota para put formulario cliente

app.put('/cliente/:idCliente', verificarToken, (req, res) => {
    const { idCliente } = req.params;
    const {
        nome_cliente,
        endereco_cliente,
        fone_cliente,
        email_cliente,
        senha_cliente,
        oper
    } = req.body;

    // Definindo ativo como true diretamente aqui
    const ativo = true;

    // Verificar se há nova senha a ser criptografada
    let hashedPassword = null;
    if (senha_cliente !== '') {
        // Criptografar a nova senha fornecida pelo cliente
        bcrypt.hash(senha_cliente, 10, (err, hash) => {
            if (err) {
                console.error("Erro ao criptografar a senha:", err);
                return res.status(500).send('Erro interno ao criptografar a senha');
            }
            hashedPassword = hash;

            // Chamar a stored procedure com os valores permitidos
            const updateQuery = `
                CALL SP_Up_Cliente_Simples(?, ?, ?, ?, ?, ?, ?, ?, @p_retorno_mensagem)
            `;

            conexao.query(updateQuery, [
                idCliente,
                nome_cliente,
                email_cliente,
                endereco_cliente,
                fone_cliente,
                hashedPassword,
                ativo,
                oper
            ], (err, results) => {
                if (err) {
                    console.error("Erro ao atualizar cliente:", err);
                    return res.status(500).send('Problema ao atualizar cliente');
                } else {
                    // Buscar a mensagem de retorno da stored procedure
                    conexao.query('SELECT @p_retorno_mensagem AS mensagem', (err, result) => {
                        if (err) {
                            console.error("Erro ao buscar mensagem de retorno:", err);
                            return res.status(500).send('Problema ao buscar mensagem de retorno');
                        } else {
                            const mensagem = result[0].mensagem;
                            console.log("Cliente atualizado:", mensagem);
                            return res.status(200).send(mensagem);
                        }
                    });
                }
            });
        });
    } else {
        // Se senha_cliente estiver vazia, manter a senha atual
        const updateQuery = `
            CALL SP_Up_Cliente_Simples(?, ?, ?, ?, ?, ?, ?, ?, @p_retorno_mensagem)
        `;

        conexao.query(updateQuery, [
            idCliente,
            nome_cliente,
            email_cliente,
            endereco_cliente,
            fone_cliente,
            hashedPassword,
            ativo,
            oper
        ], (err, results) => {
            if (err) {
                console.error("Erro ao atualizar cliente:", err);
                return res.status(500).send('Problema ao atualizar cliente');
            } else {
                // Buscar a mensagem de retorno da stored procedure
                conexao.query('SELECT @p_retorno_mensagem AS mensagem', (err, result) => {
                    if (err) {
                        console.error("Erro ao buscar mensagem de retorno:", err);
                        return res.status(500).send('Problema ao buscar mensagem de retorno');
                    } else {
                        const mensagem = result[0].mensagem;
                        console.log("Cliente atualizado:", mensagem);
                        return res.status(200).send(mensagem);
                    }
                });
            }
        });
    }
});

// rota para put de cadastro(editar cliente)

app.put('/clientes', (req, res) => {
    let {
        id_cliente,
        nome,
        stat,
        endereco,
        fone,
        email,
        permissao,
        ativo,
        oper
    } = req.body;

    conexao.query(`
        CALL SP_up_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_retorno_mensagem)
    `, [
        id_cliente,
        nome,
        stat,
        endereco,
        fone,
        email,
        permissao,
        ativo,
        oper
    ], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar cliente:", err);
            res.status(500).send('Problema ao atualizar cliente');
        } else {
            console.log("Cliente atualizado:", result);
            res.status(200).send('Cliente atualizado com sucesso');
        }
    });
});

//rota post para post de usuario

// app.post("/usuarios", (req, resp) => {
//     let usuario = req.body.usuario;
//     let senha = req.body.senha;
//     let permissao = req.body.permissao;
//     let ativo = true;

//     conexao.query(
//         `CALL SP_Ins_usuario(?, ?, ?, ?, @id, @mensagem)`, 
//         [usuario, senha, permissao, ativo], (erro, linha) => {
//             if(erro) {
//                 console.log(erro);
//                 resp.send('Problema ao cadastrar usuario');
//                 resp.send(erro)
//             }
//             else {
//                 console.log(linha);
//                 resp.send('usuario cadastrado!');
//             }
            
//         });
    
// });

// // rota get adm usuarios

// app.get("/usuarios", (req, res) => {
//     conexao.query(`
//         SELECT *
//         FROM Usuario
//     `, (err, rows) => {
//         if (err) {
//             console.error("Erro ao buscar Usuario:", err);
//             res.status(500).json({ error: "Erro interno ao buscar Usuario" });
//         } else {
//             res.json(rows); // Retorna os dados como JSON
//         }
//     });
// });

// app.put('/usuarios', (req, res) => {
//     let {id_usuario,
//         usuario,
//         senha,
//         permissao,
//         ativo,
//         oper} = req.body;

//     conexao.query(`
//         CALL SP_up_usuario(?, ?, ?, ?, ?, ?, @p_retorno_mensagem)
//     `, [id_usuario,
//         usuario,
//         senha,
//         permissao,
//         ativo,
//         oper], (err, result) => {
//         if (err) {
//             console.error("Erro ao atualizar usuario:", err);
//             res.status(500).send('Problema ao atualizar usuario');
//         } else {
//             console.log("usuario atualizado:", result);
//             res.status(200).send('usuario atualizado com sucesso');
//         }
//     });
// });

// rota post cadastro user

app.post("/cadastro", (req, res) => {
    const { usuario, senha, permissao } = req.body;

    // Verificar se o usuário já existe (opcional)

    // Criptografar a senha antes de armazenar no banco de dados (usando bcrypt, por exemplo)
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Erro ao criptografar senha:", err);
            return res.status(500).json({ error: "Erro interno ao cadastrar usuário" });
        }

        // Inserir o novo usuário no banco de dados
        conexao.query(
            `INSERT INTO Usuario (usuario, senha_hash, permissao, atv)
             VALUES (?, ?, ?, true)`, 
            [usuario, hashedPassword, permissao],
            (err, result) => {
                if (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    res.status(500).json({ error: "Erro interno ao cadastrar usuário" });
                } else {
                    console.log("Usuário cadastrado com sucesso:", result);
                    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
                }
            }
        );
    });
});

// Chamadas sqlServer

// get tabelas
/*
app.get("/tables", (req, res) => {
    
    conexao.query(`
        SELECT TABLE_SCHEMA, TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'`)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));

});

app.post("/servicos", (req, res) => {
    let tit = req.body.titulo;
    let desc = req.body.desc;
    let url = req.body.url;
    let img = req.body.img;
    let ordem = req.body.ordem;
    let ativo = '1';
    conexao.query(`exec SP_Ins_Servico
         '${tit}', '${desc}','${img}',
          '${url}', ${ordem}, ${ativo}`, (erro, resultado) => {
            if (erro) {
                console.log(erro);
                res.status(500).send('Problema ao inserir serviço');
            } else {
                console.log(resultado);
                res.status(200).send('Servico inserido com sucesso');
            }
    });
});

// get servicos para o site

app.get("/servicos", (req, res) => {
    
    conexao.query(`select id_servico,
                titulo_servico,
                desc_servico,
                img_servico,
                url_servico
        
                FROM servico where ativo = 1
                ORDER BY ORDEM_APRESENTACAO`)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));

});

// get adm serviços

app.get("/admservicos", (req, res) => {
    
    conexao.query(`select id_servico,
                titulo_servico,
                desc_servico,
                img_servico,
                url_servico,
                ativo
                FROM servico 
                ORDER BY ORDEM_APRESENTACAO`)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));

});


// get serviços para o formulário

app.get("/servicos/:id", (req, res) => {
    let id_servico = req.params.id;
    conexao.query(`select id_servico,
                titulo_servico,
                desc_servico,
                img_servico,
                url_servico,
                ordem_apresentacao,
                ativo
        
                FROM servico where id_servico = ${id_servico}`)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));
});

app.delete('/servicos/:id', (req, res) => {
    
    let id = req.params.id;

    conexao.query(`exec SP_del_Servico
        '${id}'`, (erro, resultado) => {
           if (erro) {
               console.log(erro);
               res.status(500).send('Problema ao deletar serviço');
           } else {
               console.log(resultado);
               res.status(200).send('Servico deletado com sucesso');
           }
   });
  
});

app.put('/servicos', (req, res) => {
    
    let id = req.body.id_servico;
    let tit = req.body.tit;
    let desc = req.body.desc;
    let url = req.body.url;
    let img = req.body.img;
    let ordem = req.body.ordem;
    let ativo = req.body.ativo;

    conexao.query(`EXEC SP_upd_Servico ${id}, '${tit}', '${desc}', '${img}', '${url}', ${ordem}, ${ativo}`,  
         (erro, resultado) => {
           if (erro) {
               console.log(erro);
               res.status(500).send('Problema ao atualizar serviço');
           } else {
               console.log(resultado);
               res.status(200).send('Servico atualizado com sucesso');
           }
   });
  
});
*/