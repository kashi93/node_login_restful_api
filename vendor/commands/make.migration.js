const fs = require("fs");
const { migration } = require("../templates/migrations");
const yargs = require("yargs");

yargs.command({
  command: "migration",
  describe: "Create a new database table migration",
  builder: {
    name: {
      alias: "n",
      required: true,
      type: "string",
    },
  },
  async handler(argv) {
    const migrations = await fs.promises.readdir("migrations");
    let fileName = "";
    for await (const migrate of migrations) {
      const m1 = require(`../../migrations/${migrate}`);
      if (m1.up != null) {
        const m2 = m1.up();
        if (m2.name == argv.name) {
          throw new Error(`Migration ${argv.name} already exist!`);
        }
      }
    }

    let p = "migrations/";
    let m = null;

    if (!Number.isNaN(parseInt(String(argv.name)))) {
      console.log("Migrations name invalid!");
      return;
    }

    if (argv.create != "") {
      m = migration(String(argv.name));
      fileName = `${argv.name}_${new Date().getTime()}`;
    }

    if (m != null) {
      await fs.promises.writeFile(`${p}${fileName}.js`, m, "utf-8");
    }
  },
});
