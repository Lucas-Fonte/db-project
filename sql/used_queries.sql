
--  Restaurante cadastra seus pratos
INSERT INTO pratos (id_restaurante, descricao, preco, disponibilidade)
VALUES (
    ${id_restaurante}, ${descricao}, ${preco}, ${disponibilidade} 
);

--  Cliente visualiza opções de restaurantes
SELECT * FROM restaurantes;

--  Cliente escolhe prato, meio de pagamento e cadastra cartão
INSERT INTO encomendas (
          id_restaurante,
          id_prato,
          id_cliente,
          id_entregador,
          id_cartao,
          data,
          forma_de_pagamento,
          troco,
          tempo_de_entrega,
          status
        )
        VALUES (
          ${id_restaurante},
          ${id_prato},
          ${id_cliente},
          ${id_entregador},
          ${id_cartao},
          ${data},
          ${forma_de_pagamento},
          ${troco},
          ${tempo_de_entrega},
          ${status}
        );

-- Encomenda sinaliza ao restaurante
SELECT * FROM encomendas WHERE id_restaurante = ${id_restaurante};

-- Entregador sinaliza a encomenda como finalizada
UPDATE encomendas
SET status = 'FINALIZADO'
WHERE id_encomenda = ${id_encomenda} 
AND id_entregador = ${id_entregador};

