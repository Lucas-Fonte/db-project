const { sql } = require('@databases/pg');
const runQuery = require('../database/runQuery');

class OrderController {
  async index(req, res) {
    try {
      const { id_restaurante } = req.query;

      const result = await runQuery(
        sql`SELECT * FROM encomendas WHERE id_restaurante = ${id_restaurante};`
      );
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.json({
        error,
      });
    }
  }

  async store(req, res) {
    try {
      const {
        id_restaurante,
        id_prato,
        id_cliente,
        id_entregador,
        id_cartao,
        data,
        forma_de_pagamento,
        troco,
        tempo_de_entrega,
        status,
      } = req.body;

      await runQuery(
        sql`
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
        )
        `
      );

      return res.json({
        id_restaurante,
        id_prato,
        id_cliente,
        id_entregador,
        id_cartao,
        data,
        forma_de_pagamento,
        troco,
        tempo_de_entrega,
        status,
        message: 'Inserted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const { id_encomenda, id_entregador } = req.body;

      const result = await runQuery(
        sql`
        UPDATE encomendas
        SET status = 'FINALIZADO'
        WHERE id_encomenda = ${id_encomenda} 
        AND id_entregador = ${id_entregador}
        `
      );

      return res.json({
        ...result,
        message: 'Inserted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        error,
      });
    }
  }
}

module.exports = new OrderController();
