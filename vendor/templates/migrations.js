const migration = (table_name) => {
  return `const {Table} = require("../vendor/database/table");
  
  module.exports.up = () => {
      return {
        name: "${table_name}",
        columns: [
        Table.id(),
        Table.timestamps(),
        ],
      };
  };
      
  module.exports.down = () => {
    return {
     name: "${table_name}",
    };
  };
      `;
};

module.exports.migration = migration;
