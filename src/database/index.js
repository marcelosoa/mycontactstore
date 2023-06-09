// the best way to connect via vscode to my database

// destructure client and create a obj like bellow

/**
 * @commands docker
 * to exec this container -> docker exec -it pg bash
 * to connect in postgres -> psql -U root
 * to select the database -> \c mycontacts
 * to start -> docker start(name of image (like pg))
 * to list all images you have \l
 */

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();
// to execute a query inside my db
exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
