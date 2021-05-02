require('dotenv').config();

const { sql } = require('@databases/pg');
const runQuery = require('./runQuery');

const runMigrations = async () => {
  console.log('> Running all migrations ...');
  const migrations = [
    sql`
    CREATE TABLE "restaurantes" (
      "id_restaurante" SERIAL UNIQUE PRIMARY KEY,
      "nome_oficial" varchar,
      "nome_fantasia" varchar,
      "CNPJ" varchar,
      "endereco" varchar,
      "telefone1" bigint,
      "telefone2" bigint,
      "regiao" varchar,
      "horario_inicio_atendimento" int,
      "horario_fim_atendimento" int,
      "schema" varchar
    );

    CREATE TABLE "sugestoes" (
      "id_restaurante" int,
      "id_prato" int
    );

    CREATE TABLE "pratos" (
      "id_prato" SERIAL UNIQUE PRIMARY KEY,
      "id_restaurante" int,
      "descricao" varchar,
      "preco" float,
      "disponibilidade" boolean
    );

    CREATE TABLE "clientes" (
      "id_cliente" SERIAL UNIQUE PRIMARY KEY,
      "nome" varchar,
      "cpf" bigint,
      "rg" bigint,
      "telefone" bigint,
      "endereco" varchar,
      "regiao" varchar
    );

    CREATE TABLE "cartoes" (
      "id_cartao" SERIAL UNIQUE PRIMARY KEY,
      "id_cliente" int,
      "numero" bigint,
      "nome_cadastrado" varchar,
      "data_validade" date
    );

    id_cliente
    numero
    nome_cadastrado
    data_validade
    
    CREATE TABLE "entregadores" (
      "id_entregador" SERIAL UNIQUE PRIMARY KEY,
      "nome" varchar,
      "veiculo" varchar,
      "placa" varchar,
      "regiao" varchar
    );

    CREATE TABLE "encomendas" (
      "id_encomenda" SERIAL UNIQUE PRIMARY KEY,
      "id_restaurante" int,
      "id_prato" int,
      "id_cliente" int,
      "id_entregador" int,
      "id_cartao" int,
      "data" timestamp,
      "forma_de_pagamento" varchar,
      "troco" boolean,
      "tempo_de_entrega" int,
      "status" varchar
    );
    `,
    sql`
    ALTER TABLE "sugestoes" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");
    
    ALTER TABLE "sugestoes" ADD FOREIGN KEY ("id_prato") REFERENCES "pratos" ("id_prato");
    
    ALTER TABLE "pratos" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");

    ALTER TABLE "cartoes" ADD FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id_cliente");

    ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");

    ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_prato") REFERENCES "pratos" ("id_prato");

    ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id_cliente");

    ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_entregador") REFERENCES "entregadores" ("id_entregador");

    ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_cartao") REFERENCES "cartoes" ("id_cartao");
    `,
  ];

  for (const migration of migrations) {
    await runQuery(migration);
  }

  console.log('> Done running all migrations!');
  process.exit();
};

runMigrations();
