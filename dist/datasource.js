"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "ceiling",
    database: "blog",
    synchronize: true,
    logging: true,
    entities: ["./Models/*.js"],
    subscribers: []
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("DataSource Initialized");
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=datasource.js.map