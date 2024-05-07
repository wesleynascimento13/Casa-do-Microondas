USE CMO;

-- Tabela OS
ALTER TABLE OS 
ADD CONSTRAINT fk_cliente_os
FOREIGN KEY(id_cliente) REFERENCES Cliente(id_cliente);

ALTER TABLE OS
ADD CONSTRAINT fk_tipo_atendimento_os
FOREIGN KEY (id_tipo_atendimento) REFERENCES TipoAtendimento(id_tipo_atendimento);

ALTER TABLE OS
ADD CONSTRAINT fk_observacao_os
FOREIGN KEY (id_observacao) REFERENCES Observacao(id_observacao);

ALTER TABLE OS
ADD CONSTRAINT fk_status_os
FOREIGN KEY (id_status) REFERENCES Status(id_status);

ALTER TABLE OS
ADD CONSTRAINT fk_filial_os
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE OS
ADD CONSTRAINT fk_planopagamento_os
FOREIGN KEY (id_plano_pagamento) REFERENCES PlanoPagamento(id_plano_pagamento);

ALTER TABLE OS
ADD CONSTRAINT fk_fechamento_os
FOREIGN KEY (id_fechamento) REFERENCES Fechamento(id_fechamento);

ALTER TABLE OS
ADD CONSTRAINT fk_exclusao_os
FOREIGN KEY (id_exclusao) REFERENCES Exclusao(id_exclusao);

ALTER TABLE OS
ADD CONSTRAINT fk_acessorio_os
FOREIGN KEY (id_acessorio) REFERENCES Acessorio(id_acessorio);

-- Tabela Cliente
ALTER TABLE Cliente
ADD CONSTRAINT fk_status_cliente
FOREIGN KEY (id_status) REFERENCES Status(id_status);

ALTER TABLE Cliente
ADD CONSTRAINT fk_endereco_cliente
FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco);

ALTER TABLE Cliente
ADD CONSTRAINT fk_fone_cliente
FOREIGN KEY (id_fone) REFERENCES Fone(id_fone);

ALTER TABLE Cliente
ADD CONSTRAINT fk_email_cliente
FOREIGN KEY (id_email) REFERENCES Email(id_email);

-- Tabela Clientefilial
ALTER TABLE Clientefilial
ADD CONSTRAINT fk_cliente_clientefilial
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);

ALTER TABLE Clientefilial
ADD CONSTRAINT fk_filial_clientefilial
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

-- Tabela EnderecoBusca
ALTER TABLE EnderecoBusca
ADD CONSTRAINT fk_endereco_enderecobusca
FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco);

-- Tabela EnderecEntrega
ALTER TABLE EnderecoEntrega
ADD CONSTRAINT fk_endereco_enderecoentrega
FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco);

-- Tabela OSTipoproduto
ALTER TABLE OSTipoproduto
ADD CONSTRAINT fk_os_ostipoproduto
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE OSTipoproduto
ADD CONSTRAINT fk_tipoproduto_ostipoproduto
FOREIGN KEY (id_tipo_produto) REFERENCES TipoProduto(id_tipo_produto);

-- Tabela Modelo
ALTER TABLE Modelo
ADD CONSTRAINT fk_marca_modelo
FOREIGN KEY (id_marca) REFERENCES Marca(id_marca);

ALTER TABLE Modelo
ADD CONSTRAINT fk_tipo_produto_modelo
FOREIGN KEY (id_tipo_produto) REFERENCES TipoProduto(id_tipo_produto);

-- Tabela Produto
ALTER TABLE Produto
ADD CONSTRAINT fk_modelo_produto
FOREIGN KEY (id_modelo) REFERENCES Modelo(id_modelo);

-- Tabela OSProduto
ALTER TABLE OSProduto
ADD CONSTRAINT fk_os_osproduto
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE OSProduto
ADD CONSTRAINT fk_produto_os
FOREIGN KEY (id_produto) REFERENCES Produto(id_produto);

-- Tabela OSServicoServico
ALTER TABLE OSServicoServico
ADD CONSTRAINT fk_servico_osservico
FOREIGN KEY (id_servico) REFERENCES Servico(id_servico);

ALTER TABLE OSServicoServico
ADD CONSTRAINT fk_osservico_servico
FOREIGN KEY (id_osservico) REFERENCES OSServico(id_osservico);

-- Tabela OSServico
ALTER TABLE OSServico
ADD CONSTRAINT fk_os_osservico
FOREIGN KEY (id_os) REFERENCES OS(id_os);

-- Tabela OSCategoria
ALTER TABLE OSCategoria
ADD CONSTRAINT fk_os_oscategoria
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE OSCategoria
ADD CONSTRAINT fk_categoria_oscategoria
FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria);

-- Tabela Filial
ALTER TABLE Filial
ADD CONSTRAINT fk_endereco_filial
FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco);

ALTER TABLE Filial
ADD CONSTRAINT fk_fone_filial
FOREIGN KEY (id_fone) REFERENCES Fone(id_fone);

ALTER TABLE Filial
ADD CONSTRAINT fk_email_filial
FOREIGN KEY (id_email) REFERENCES Email(id_email);

-- Tabela FilialProduto
ALTER TABLE FilialProduto
ADD CONSTRAINT fk_filial_filialproduto
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE FilialProduto
ADD CONSTRAINT fk_produto_filialproduto
FOREIGN KEY (id_produto) REFERENCES Produto(id_produto);

-- Tabela Funcionario
ALTER TABLE Funcionario
ADD CONSTRAINT fk_status_funcionario
FOREIGN KEY (id_status) REFERENCES Status(id_status);

ALTER TABLE Funcionario
ADD CONSTRAINT fk_filial_funcionario
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE Funcionario
ADD CONSTRAINT fk_endereco_funcionario
FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco);

ALTER TABLE Funcionario
ADD CONSTRAINT fk_fone_funcionario
FOREIGN KEY (id_fone) REFERENCES Fone(id_fone);

-- Tabela Fechamento
ALTER TABLE Fechamento
ADD CONSTRAINT fk_funcionario_fechamento
FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario);

-- Tabela Exclusao
ALTER TABLE Exclusao
ADD CONSTRAINT fk_funcionario_exclusao
FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario);

-- Tabela OSAcessorio
ALTER TABLE OSAcessorio
ADD CONSTRAINT fk_os_osacessorio
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE OSAcessorio
ADD CONSTRAINT fk_acessorio_osacessorio
FOREIGN KEY (id_acessorio) REFERENCES Acessorio(id_acessorio);

-- Tabela PlanoPagamentoFormaPagamento
ALTER TABLE PlanoPagamentoFormaPagamento
ADD CONSTRAINT fk_forma_pagamento_plano_pagamento
FOREIGN KEY (id_forma_pagamento) REFERENCES FormaPagamento(id_forma_pagamento);

ALTER TABLE PlanoPagamentoFormaPagamento
ADD CONSTRAINT fk_plano_pagamento_plano_pagamento
FOREIGN KEY (id_plano_pagamento) REFERENCES PlanoPagamento(id_plano_pagamento);
