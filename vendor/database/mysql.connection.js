const { createConnection } = require("mysql");
require("dotenv").config();
const env = process.env;

class MySqlConnection {
  open() {
    return createConnection({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    });
  }

  close(con) {
    con.end();
  }

  async query(query) {
    try {
      const con = this.open();
      const r = await this.execute(con, query);
      this.close(con);
      return r;
    } catch (error) {
      throw new Error(error);
    }
  }

  execute(con, query) {
    try {
      if (!con) throw new Error("mysql connection was not created");
      return new Promise(function (resolve, reject) {
        con.query(query, [], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      console.error("[mysql.connector][execute][Error]: ", error);
      throw new Error("failed to execute MySQL query");
    }
  }
}

module.exports.MySqlConnection = new MySqlConnection();
