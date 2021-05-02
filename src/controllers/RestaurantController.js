const { sql } = require('@databases/pg');
const runQuery = require('../database/runQuery');

class RestaurantController {
  async index(req, res) {
    try {
      const { id } = req.query;

      if (id) {
        const result = await runQuery(
          sql`
          SELECT * FROM restaurantes WHERE restaurantes_id = ${id};
          `
        );
        return res.json(result);
      }

      const result = await runQuery(sql`SELECT * FROM restaurantes`);
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
      console.log(req.body);
      const {
        nome_oficial,
        nome_fantasia,
        CNPJ,
        endereco,
        telefone1,
        telefone2,
        regiao,
        horario_inicio_atendimento,
        horario_fim_atendimento,
        schema,
      } = req.body;

      const result = await runQuery(
        sql`
        INSERT INTO restaurantes (
          nome_oficial,
          nome_fantasia,
          "CNPJ",
          endereco,
          telefone1,
          telefone2,
          regiao,
          horario_inicio_atendimento,
          horario_fim_atendimento,
          schema
        )
        VALUES (
          ${nome_oficial},
          ${nome_fantasia},
          ${CNPJ},
          ${endereco},
          ${telefone1},
          ${telefone2},
          ${regiao},
          ${horario_inicio_atendimento},
          ${horario_fim_atendimento},
          ${schema}
        )
        `
      );
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.json({
        error,
      });
    }
  }
}

module.exports = new RestaurantController();
