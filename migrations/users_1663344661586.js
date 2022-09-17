const { Table } = require("../vendor/database/table");

module.exports.up = () => {
  return {
    name: "users",
    columns: [
      Table.id(),
      Table.string("name").unique(),
      Table.string("email").unique(),
      Table.timestamp("email_verified_at").nullable(),
      Table.string("password"),
      Table.timestamps(),
    ],
  };
};

module.exports.down = () => {
  return {
    name: "users",
  };
};
