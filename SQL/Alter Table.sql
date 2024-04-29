USE CMO;

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
FOREIGN KEY (id_fechador) REFERENCES Fechamento(id_fechamento);

ALTER TABLE OS
ADD CONSTRAINT fk_exclusao_os
FOREIGN KEY (id_exclusao) REFERENCES Exclusao(id_exclusao);

ALTER TABLE OS
ADD CONSTRAINT fk_acessorio_os
FOREIGN KEY (id_acessorio) REFERENCES Acessorio(id_acessorio);

ALTER TABLE Cliente
ADD CONSTRAINT fk_status_cliente
FOREIGN KEY (id_status) REFERENCES Status(id_status);

ALTER TABLE Cliente
ADD CONSTRAINT fk_filial_cliente
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE Endereco
ADD CONSTRAINT fk_cliente_endereco
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);

ALTER TABLE Fone
ADD CONSTRAINT fk_cliente_fone
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);

ALTER TABLE Email
ADD CONSTRAINT fk_cliente_email
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);

ALTER TABLE OSTipoproduto
ADD CONSTRAINT fk_os_ostipoproduto
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE OSTipoproduto
ADD CONSTRAINT fk_tipo_produto_ostipoproduto
FOREIGN KEY (id_tipo_produto) REFERENCES TipoProduto(id_tipo_produto);

ALTER TABLE Modelo
ADD CONSTRAINT fk_marca_modelo
FOREIGN KEY (id_marca) REFERENCES Marca(id_marca);

ALTER TABLE Modelo
ADD CONSTRAINT fk_tipo_produto_modelo
FOREIGN KEY (id_tipo_produto) REFERENCES TipoProduto(id_tipo_produto);

ALTER TABLE Produto
ADD CONSTRAINT fk_modelo_produto
FOREIGN KEY (id_modelo) REFERENCES Modelo(id_modelo);

ALTER TABLE Produto
ADD CONSTRAINT fk_os_produto
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE Produto
ADD CONSTRAINT fk_filial_produto
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE Servico
ADD CONSTRAINT fk_os_servico
FOREIGN KEY (id_os) REFERENCES OS(id_os);

ALTER TABLE Funcionario
ADD CONSTRAINT fk_status_funcionario
FOREIGN KEY (id_status) REFERENCES Status(id_status);

ALTER TABLE Funcionario
ADD CONSTRAINT fk_filial_funcionario
FOREIGN KEY (id_filial) REFERENCES Filial(id_filial);

ALTER TABLE Fechamento
ADD CONSTRAINT fk_funcionario_fechamento
FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario);

ALTER TABLE Exclusao
ADD CONSTRAINT fk_funcionario_exclusao
FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario);

ALTER TABLE FormaPagamento
ADD CONSTRAINT fk_plano_pagamento_forma_pagamento
FOREIGN KEY (id_plano_pagamento) REFERENCES PlanoPagamento(id_plano_pagamento);