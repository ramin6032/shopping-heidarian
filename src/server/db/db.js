import mysql from "mysql2/promise";

export async function query(query) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    const [result] = await connection.execute(query);

    await connection.end();

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
