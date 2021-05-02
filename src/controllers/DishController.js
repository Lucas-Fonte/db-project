const { sql } = require('@databases/pg');
const runQuery = require('../database/runQuery');

class DishController {
  async index(req, res) {
    try {
      const { restaurante_id } = req.query;

      const result = await runQuery(
        sql`SELECT * FROM pratos WHERE restaurantes_id = ${restaurante_id};`
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
      const { id_restaurante, descricao, preco, disponibilidade } = req.body;

      await runQuery(
        sql`
        INSERT INTO pratos (id_restaurante, descricao, preco, disponibilidade)
        VALUES (
          ${id_restaurante}, ${descricao}, ${preco}, ${disponibilidade} 
        )
        `
      );

      return res.json({
        id_restaurante,
        descricao,
        preco,
        disponibilidade,
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

module.exports = new DishController();
