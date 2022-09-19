const { MySqlConnection } = require("../database/mysql.connection");
const yargs = require("yargs");
const fs = require("fs");
const { Table, params } = require("../database/table");

require("dotenv").config();
const env = process.env;

yargs.command({
  command: "migrate",
  describe: "Run the database migrations",
  builder: {
    rollback: {
      alias: "r",
      required: false,
      type: "boolean",
      default: false,
    },
  },
  async handler(argv) {
    const migrations = await fs.promises.readdir("migrations");
    const db = MySqlConnection;

    for await (const migrate of migrations) {
      const m1 = require(`../../migrations/${migrate}`);
      if (!argv.rollback) {
        const m2 = m1.up();
        await db.query(`CREATE TABLE ${m2.name} (${params.join(",")})`);
        Table.resetParams();
      } else {
        const m2 = m1.down();
        await db.query(`DROP TABLE ${m2.name}`);
      }
    }

    console.log("Migrations successfully");
  },
});
