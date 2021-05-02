# Projeto de Banco de dados

## Como usar

1. Instalar o docker
2. Rodar o comando de `docker-compose`

```bash
@user: docker-compose up --build
```

3. App e banco de dados devem estar disponíveis em suas respectivas portas

## Introdução

O COVID-19 é uma doença infecciosa causada pelo recém-descoberto vírus SARS-Cov-2. Facilmente disseminado pelo ar e ainda sem tratamento disponível, o Covid impõe restrições ao contato social e portanto altera drasticamente os hábitos cotidianos e a maneira como a sociedade vive e consome.
Desde uma simples compra de mercado até o encontro e convívio com familiares, o “novo normal” tem tido a tecnologia como principal possibilitadora de algumas atividades, dentre elas o delivery de alimentos.
Pensando no “novo normal”, o desenvolvimento de aplicações que possibilitam a conexão de restaurantes, clientes e entregadores torna-se necessário. Visto tal necessidade, o presente relatório demonstra o desenvolvimento de um sistema agregador de entrega de refeições com foco no desenvolvimento no banco de dados e seus controles.
Foi escolhido como metodologia de implementação uma API REST rodando em ambiente de desenvolvimento, feita em Javascript com NodeJS. Cada entidade do banco corresponde a um endpoint específico na API, usando cada um deles como uma interface da entidade do banco. A aplicação e o banco de dados estão rodando através de contêineres no Docker, para inicialização da aplicação, foi criado um mecanismo de "prestart" que roda um série de "migrations" definindo as configurações inicia

## Modelo Entidade-Relacionamento Estendido

O modelo desenvolvido coloca em evidência 4 principais entidades, sendo elas restaurante, entregador, clientes e pratos, e 2 entidades fracas, sendo as sugestões do restaurante e os cartões cadastrados pelo cliente. Todos são necessários na mesma ação, que é a encomenda.

##Modelo Lógico
Para o desenvolvimento do banco, inicialmente foi definido que trata-se de um banco de dados transacional, visto a necessidade de atualização real-time, portanto buscou-se utilizar um modelo de star-schema de Kimball, onde a tabela de entregas faria o papel de fato, e então as tabelas de restaurantes, cliente, entregador e prato seriam suas dimensões, e posteriormente um datamart/cubo poderia ser criado mais facilmente em um data-warehouse para consumo.
Após o desenvolvimento do MER-x, percebeu-se a necessidade de não se prender ao modelo, e após a tentativa de utilização do modelo snowflake de Kimball, optou-se por criar um modelo intermediário, visto o relacionamento de pratos com restaurantes, e relacionamento fraco de cartões com a encomenda e com clientes.
Dentre as implementações, é importante destacar a função do “schema”, na tabela de restaurante. A implementação do “schema” é bastante comum no desenvolvimento de ERPs, geralmente elas denominam o ambiente que vai interagir com o restaurante. Ela permite que um restaurante com mais de uma filial, possa ter dois cadastros, porém interagir em um mesmo ambiente.
É importante destacar também, campos como status e região, inicialmente planejados a ser referenciados em um enumerations, porém posteriormente alterados para texto, visto que o enumerations, apesar de facilitar o desenvolvimento do código da aplicação, dificulta o consumo final da informação.
Por fim optou-se por poucas restrições, justificando-se que no dia-a-dia, uma boa aplicação sana os problemas e as restrições geram apenas bugs e perda de informação.

O modelo físico desenvolvido encontra-se na linguagem adequada para o PostgreSQL.

Código para implementação do modelo

```sql
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
  "data" datetime,
  "forma_de_pagamento" varchar,
  "troco" boolean,
  "tempo_de_entrega" int,
  "status" varchar
);

ALTER TABLE "sugestoes" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");

ALTER TABLE "sugestoes" ADD FOREIGN KEY ("id_prato") REFERENCES "pratos" ("id_prato");

ALTER TABLE "pratos" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");

ALTER TABLE "cartoes" ADD FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id_cliente");

ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_restaurante") REFERENCES "restaurantes" ("id_restaurante");

ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_prato") REFERENCES "pratos" ("id_prato");

ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id_cliente");

ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_entregador") REFERENCES "entregadores" ("id_entregador");

ALTER TABLE "encomendas" ADD FOREIGN KEY ("id_cartao") REFERENCES "cartoes" ("id_cartao");

```

## Conclusão

O projeto mostrou-se efetivo para as principais funcionalidades testadas, demonstrando uma boa estruturação e um bom desenvolvimento da API.
Durante o desenvolvimento, alguns ideais técnicos tiveram que ser enfrentados, principalmente tratando-se de modelagem, ao ponto que a necessidade da aplicação não poderia ser sanada pelos modelos tradicionais. Também foram alvo de debate o modo como seriam tratados informações de status e a necessidade ou não de normalização, além da necessidade ou não de restrições mais elaboradas.
Apesar do bom desempenho ao final, é claro a necessidade de mais informações quando trata-se de um projeto real. Prever outras tecnologias mais avançadas demandando o desenvolvimento do banco é necessário, e o modelo atual não comporta tais necessidades.

## Acessos

Todos os códigos de implementação estão disponíveis em: https://github.com/Lucas-Fonte/db-project .
O link da apresentação em vídeo está disponível em:

Referências

KIMBALL, R., MARGY, R. 1959 - The data warehouse toolkit : the complete guide to dimensional modeling. 2.ª ed.. New York : Wiley, c2002. xxiv, 436 p.. ISBN 978-0-471-20024-6
