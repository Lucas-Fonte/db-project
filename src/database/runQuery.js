const connect = require('@databases/pg');

const runQuery = async (query) => {
  console.log({ query });
  const db = connect();
  await db.query(query);
};

module.exports = runQuery;
