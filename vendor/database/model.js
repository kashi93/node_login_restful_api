class Model {
  useTimeStamps = true;
  created_at = null;
  updated_at = null;
  table = "";
  params = [];

  create(params) {
    return new Promise(async (res, rej) => {
      try {
        let p = await this.objToParam1(params);
        p = await this.createTimeStamp(p);
        const query = `INSERT INTO ${this.table} (${p.columns.join(
          ","
        )}) VALUES (${p.data.join(",")});`;
        const result1 = await this.execute(query);
        const result2 = await this.where("id", "=", result1.insertId).first();
        res(result2);
      } catch (error) {
        rej(error);
      }
    });
  }

  update(params) {
    return new Promise(async (res, rej) => {
      try {
        let p = await this.objToParam2(params);
        p = await this.updateTimeStamp(p);
        const p2 = await this.paramToString();
        const query = `UPDATE ${this.table} SET ${p.data.join(",")} ${p2}`;
        await this.execute(query);
        res(true);
      } catch (error) {
        rej(error);
      }
    });
  }

  delete() {
    return new Promise(async (res, rej) => {
      try {
        const p2 = await this.paramToString();
        const query = `DELETE FROM ${this.table} ${p2}`;
        await this.execute(query);
        res(true);
      } catch (error) {
        rej(error);
      }
    });
  }

  async createTimeStamp(current_params) {
    if (this.useTimeStamps) {
      if (this.created_at == null) {
        current_params.columns.push("created_at");
        current_params.data.push(`'${this.dateTime()}'`);
      } else {
        current_params.columns.push("created_at");
        current_params.data.push(this.created_at);
      }

      if (this.updated_at == null) {
        current_params.columns.push("updated_at");
        current_params.data.push(`'${this.dateTime()}'`);
      } else {
        current_params.columns.push("updated_at");
        current_params.data.push(this.updated_at);
      }
    }
    return current_params;
  }

  async updateTimeStamp(current_params) {
    if (this.useTimeStamps) {
      if (this.updated_at == null) {
        current_params.data.push(`updated_at='${this.dateTime()}'`);
      } else {
        current_params.data.push(`updated_at='${this.updated_at}'`);
      }
    }
    return current_params;
  }

  dateTime(d = null) {
    let date;

    if (d != null) {
      date = new Date(d);
    } else {
      date = new Date();
    }

    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return date;
  }

  async objToParam1(obj) {
    const columns = [];
    const data = [];
    const keys = Object.getOwnPropertyNames(obj);

    for await (const key of keys) {
      if (key == "created_at") {
        this.created_at = `'${obj[key]}'`;
      } else if (key == "updated_at") {
        this.updated_at = `'${obj[key]}'`;
      } else {
        columns.push(key);
        data.push(`'${obj[key]}'`);
      }
    }

    return {
      columns,
      data,
    };
  }

  async objToParam2(obj) {
    const data = [];
    const keys = Object.getOwnPropertyNames(obj);

    for await (const key of keys) {
      if (key == "created_at") {
        this.created_at = `${key}='${obj[key]}'`;
      } else if (key == "updated_at") {
        this.updated_at = `${key}='${obj[key]}'`;
      } else {
        data.push(`${key}='${obj[key]}'`);
      }
    }

    return {
      data,
    };
  }

  where(column, operator, value) {
    if (this.params.length > 0) {
      this.params.push(" AND ");
    }
    this.params.push(`WHERE ${column} ${operator} '${value}'`);
    return this;
  }

  orWhere(column, operator, value) {
    if (this.params.length > 0) {
      this.params.push(" OR ");
    }
    this.params.push(`${column} ${operator} '${value}'`);
    return this;
  }

  first() {
    return new Promise(async (res, rej) => {
      try {
        const str = await this.paramToString();
        const query = `SELECT * FROM ${this.table} ${str} LIMIT 1`;
        const d1 = await this.execute(query);

        if (d1 != null) {
          if (d1[0] != null) {
            res({
              ...d1[0],
            });
            return;
          }
        }
        res(null);
      } catch (error) {
        rej(error);
      }
    });
  }

  async paramToString() {
    const str = this.params.join(" ");
    this.params = [];
    return str;
  }

  async execute(query) {
    const { MySqlConnection } = require("./mysql.connection");
    const result = await MySqlConnection.query(query);
    return result;
  }
}

module.exports.Model = Model;
