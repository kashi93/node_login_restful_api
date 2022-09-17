const yargs = require("yargs");

require("./commands/make.migration");
require("./commands/make.migrate");

yargs.parse();
