let col = "";
const params = [];

class PrivateMethod {
  nullable() {
    const current_params = params[params.length - 1];
    params[params.length - 1] = `${current_params} NULL`;
  }
  unique() {
    const current_params = params[params.length - 1];
    params[params.length - 1] = `${current_params} UNIQUE`;
  }
}

class Table {
  id(column = "id") {
    col = column;
    params.push(`${col} BIGINT NOT NULL AUTO_INCREMENT`);
    params.push(`PRIMARY KEY (${col})`);
  }

  string(column, length = 255) {
    col = column;
    params.push(`${col} VARCHAR(${length})`);
    return new PrivateMethod();
  }
  timestamp(column) {
    col = column;
    params.push(`${col} TIMESTAMP`);
    return new PrivateMethod();
  }
  timestamps() {
    params.push(`created_at TIMESTAMP NULL`);
    params.push(`updated_at TIMESTAMP NULL`);
  }
}

module.exports.params = params;
module.exports.Table = new Table();
