import express from "express";
import bodyParser from "body-parser";
import sqlServer from "mssql"
//import mysql from 'mysql2';
import jwt from "jsonwebtoken";
import cors from 'cors';

//

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
//
const SEGREDO = 'REMOTA';

const app = express();
const porta = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

/*
const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "cmo2",
    user: "root"
});

*/

//conexao.connect();


app.listen(porta, () => {
    console.log("Servidor rodando e escutando na porta 5000.")
});

app.get("/", (req, resp) => {
    resp.status(200).send("Nosso servidor da PD")
});


app.get("/marcas", (req, resp) => {
    let html = `
        <html>
            <head>
                <title>Biblioteca</title>
            </head>
            <body>
                <h1>Prateleira Digital</h1>
                <p>Este é o projeto pd!!!!!!!!!!</p>
            </body>
        </html>`;
    resp.status(200).send( html
        
    );
});

app.get("/tipoproduto", (req, resp) => {
    resp.status(200).send("Rota para trazer os tipos de produto");
});

app.get("/modelos", (req, resp) => {
    resp.status(200).send("Rota para trazer os modelos");
});

app.get("/cadastro", (req, resp) => {
    resp.status(200).send("Rota para cadastro");
});



// middleware
function verificarToken(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SEGREDO, (erro, decodificado) => {
      if(erro)
        return res.status(401).end();
      req.id = decodificado.id;
      next();
    });
  }
  
  app.post("/login", (req, res) => {
    let usu = req.body.usuario;
    let sen = req.body.senha;
  
    // conectar ao bd pra buscar o ID desse usuario
  
    //if usu e a senha for igual ao registrado na tabela do BD
    if(usu == "marcos" && sen == "123"){
      const id = 1; // isso vem do BD
  
      //token tem 3 partes = 1.) identifica o usuário 2.) segredo, opções 
      const token = jwt.sign({id}, SEGREDO, { expiresIn: 300}); // 5 min
  
      console.log("usuário marcos logou no sistema");
      return res.status(500).json({autenticado: true, token: token});
    };
    res.status(504).send("Usuário inválido ou inexitente");
  });

// Rota para inclusão de novos serviços
/*
app.post("/servicos", (req, resp) => {
    let tit = req.body.tit;
    let descr = req.body.descr;
    let img = req.body.img;
    let url = req.body.url; 
    let ordem = req.body.ordem;
    let atv = true;
    let flag = true;

    conexao.query(
        `CALL sp_ins_servico(?, ?, ?, ?, ?, ?, ?, @id, @mensagem)`, 
        [tit, descr, img, url, ordem, atv, flag], (erro, linha) => {
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
*/

// get tabelas

app.get("/tables", (req, res) => {
    
    conexao.query(`
        SELECT TABLE_SCHEMA, TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'`)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));

});


// Rota para inclusão de novas marcas

app.post("/marcas", (req, resp) => {
    let descricao = req.body.descricao;
    let url = req.body.url;
    let logo = req.body.logo;
    let flag = true;

    conexao.query(
        `CALL SP_Ins_Marca(?, ?, ?, ?, @id, @mensagem)`, 
        [descricao, url, logo, flag], (erro, linha) => {
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

// Rota para inclusão de novos tipos produto

app.post("/tipoproduto", (req, resp) => {
    let p_desc_tipo = req.body.p_desc_tipo;
    let flag = true;

    conexao.query(
        `CALL SP_Ins_TipoProduto(?, ?, @p_id_tipo, @p_mensagem)`, 
        [p_desc_tipo, flag], (erro, linha) => {
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

app.post("/cadastro", (req, resp) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let cpf = req.body.cpf;

    conexao.query(
        `CALL SP_Ins_cliente(?, ?, ?, ?, @id, @mensagem)`, 
        [nome, email, endereco, cpf], (erro, linha) => {
            if(erro) {
                console.log(erro);
                resp.send('Problema ao cadastrar cliente');
                resp.send(erro)
            }
            else {
                console.log(linha);
                resp.send('Cliente cadastrado!');
            }
            
        });
    
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
