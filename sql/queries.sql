SELECT * FROM pratos;

SELECT * FROM clientes;

INSERT INTO clientes (
    nome,
    cpf,
    rg,
    telefone,
    endereco,
    regiao
) VALUES (
	'client_1',
    012345678,
    987654321,
    999999999,
    'Rua teste',
    'TESTE'
);

SELECT * FROM cartoes;

INSERT INTO cartoes (
  id_cliente,
  numero,
  nome_cadastrado,
  data_validade
) VALUES (
	1,
    1010101010,
    'cliente_1',
    '2025-01-01'
);

SELECT * FROM entregadores;

SELECT * FROM encomendas;

UPDATE encomendas
SET status = 'FINALIZADO'
WHERE id_encomenda = 3 
AND id_entregador = 1