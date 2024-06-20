USE CMO;

INSERT INTO Status (
    descricao_status,
    tipo
) 
VALUES (
    'Em andamento',
    'OS'
);

INSERT INTO Endereco (
	tipo_endereco,
	nome_endereco,
    endereco,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    observacao
) 
VALUES (	
    'filial',
    'filial 1',
    'Rua da praça',
     null,
    'Centro',
    'Curitiba',
    'PR',
    '00000000',
    'Perto da praça'
),
(	'cliente',
    'cliente 1',
    'Rua da praça',
    'casa',
    'Bairro leste',
    'Curitiba',
    'PR',
    '00000000',
    'Perto da praça'
),
(	'funcionário',
    'william shakespeare',
    'Rua do lago',
    'casa',
    'centro',
    'Curitiba',
    'PR',
    '00000000',
    'Perto do lago'
);

INSERT INTO Fone (
    tipo_fone,
    contato,
    numero
) 
VALUES (
    'cliente',
    'cliente1',
    '00000002'
),
('funcionário',
    'william shakespeare',
    '00000003'
),
('filial',
    'filial1',
    '00000004'
);

INSERT INTO Email (
    tipo_email,
    contato,
    email
) 
VALUES (
    'cliente',
    'cliente1',
    'sid@gmail.com'
),
 (
    'funcionario',
    'william shakespeare',
    'shakespeare@gmail.com'
),
(
    'filial',
    'filial1',
    'casadomicroondas@gmail.com'
);

INSERT INTO Cliente (
    id_endereco,
    nome_cliente,
    nome_fonetico,
    data_cadastro,
    cpf,
    cnpj,
    inscr_municipal,
    data_atualizacao
) 
VALUES (
    2,
    'Sidney',
	NULL,
	CURDATE(),
    '00000000',
	NULL,
	NULL,
    CURDATE()
);

INSERT INTO ClienteFone (
    id_cliente,
    id_fone
) 
VALUES (
    1,
    1
);

INSERT INTO ClienteEmail (
    id_cliente,
    id_email
) 
VALUES (
    1,
    1
);


INSERT INTO EnderecoBusca (
    id_endereco
) 
VALUES (
    2
);

INSERT INTO EnderecoEntrega (
    id_endereco
) 
VALUES (
    2
);

INSERT INTO Filial (
    id_endereco,
    nome,
    cnpj
) 
VALUES (
    1,
    'Filial 1',
    '00000001'
);

INSERT INTO FilialFone (
    id_filial,
    id_fone
) 
VALUES (
    1,
    3
);

INSERT INTO FilialEmail (
    id_filial,
    id_email
) 
VALUES (
    1,
    3
);

INSERT INTO ClienteFilial (
    id_cliente,
    id_filial
) 
VALUES (
    1,
    1
);

INSERT INTO Observacao (
    descricao_observacao,
    forma_pagamento
) 
VALUES (
    'descricao_observacao_value',
    'Dinheiro'
);

INSERT INTO TipoProduto (
    descricao_tipo_produto,
    principal
) 
VALUES (
    'descricao_tipo_produto_value',
    True
);

INSERT INTO Marca (
    descricao_marca,
    principal
) 
VALUES (
    'Eletrolux',
    True
);

INSERT INTO Modelo (
    id_marca,
    id_tipo_produto,
    descricao_modelo
) 
VALUES (
    1,
    1,
    'descricao_modelo_value'
);

INSERT INTO Produto (
    id_modelo,
    descricao_produto,
    valor_custo,
    valor_venda,
    data_cadastro,
    qt_minima,
    qt_estoque,
    fl_balcao,
    fl_ativo,
    codigo,
    unidade
) 
VALUES (
    1,
    'descricao_produto_value',
    100.00,
    200.00,
    CURDATE(),
    2,
    5,
    5,
    5,
    777,
    'unidade_value'
);

INSERT INTO FilialProduto (
    id_filial,
    id_produto
) 
VALUES (
    1,
    1
);

INSERT INTO Servico (
    descricao_servico,
    valor_unitario,
    quantidade
) 
VALUES (
    'descricao_servico_value',
    10.00,
    10
);


INSERT INTO Categoria (
    descricao_categoria
) 
VALUES (
    'conserto'
);


INSERT INTO Funcionario (
    id_status,
    id_filial,
    id_endereco,
    nome_funcionario,
    data_admissao,
    data_demissao,
    departamento,
    funcao,
    senha
) 
VALUES (
    null,
    1,
    3,
    'william shakespeare',
    CURDATE(),
    NULL,
    'Vendas',
    'Vendedor',
    1234
);

INSERT INTO FuncionarioFone (
    id_funcionario,
    id_fone
) 
VALUES (
    1,
    2
);

INSERT INTO FuncionarioEmail (
    id_funcionario,
    id_email
) 
VALUES (
    1,
    2
);

INSERT INTO Exclusao (
    id_funcionario,
    data_exclusao
) 
VALUES (
    1,
    CURDATE()
);

INSERT INTO PlanoPagamento (
    descricao_plano_pagamento,
    parcelas,
    juros
) 
VALUES (
    'descricao_plano_pagamento_value',
    1,
    '0'
);

INSERT INTO FormaPagamento (
    descricao_forma_pagamento
) 
VALUES (
    'descricao_forma_pagamento_value'
);

INSERT INTO PlanoPagamentoFormaPagamento (
    id_forma_pagamento,
    id_plano_pagamento
) 
VALUES (
    1,
    1
);

INSERT INTO Acessorio (
    descricao_acessorio
) 
VALUES (
    'Prato de microondas'
);



INSERT INTO TipoAtendimento (
    descricao_tipo_atendimento
) 
VALUES (
    'descricao_tipo_atendimento_value'
);

INSERT INTO OS (
    id_cliente,
    id_enderecobusca,
    id_enderecoentrega,
    id_tipo_atendimento,
    id_observacao,
    id_status,
    id_filial,
    id_plano_pagamento,
    id_fechamento,
    id_exclusao,
    descricao_problema,
    descricao_OS,
    data_abertura,
    data_compra,
    data_garantia,
    data_oficina,
    serie,
    especificacao,
    valor_mo,
    valor_peca,
    valor_desconto,
    valor_total
) 
VALUES (
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    null,
    null,
    'microondas quebrado',
    'descricao_OS_value',
    CURDATE(),
    null,
    null,
    null,
    1234,
    'especificacao_value',
    50.00,
    20,
    10,
    160.00
);

INSERT INTO OSTipoproduto (
    id_os,
    id_tipo_produto
) 
VALUES (
    1,
    1
);

INSERT INTO OSServico (
    id_os,
    id_servico
) 
VALUES (
    1,
    1
);

INSERT INTO OSCategoria (
    id_categoria,
    id_os
) 
VALUES (
    1,
    1
);

INSERT INTO OSAcessorio (
    id_acessorio,
    id_os
) 
VALUES (
    1,
    1
);
