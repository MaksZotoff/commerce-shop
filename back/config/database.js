const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const db = new JsonDB(new Config("db.json"));
const data = db.getData('/');

if (!data.users) db.push("/users", []);
if (!data.products) db.push("/products", []);
if (!data.categorys) db.push("/categorys", []);

if (!data.carts) db.push("/carts", []);

if (!data.files) db.push("/files", {});
if (!data.sessions) db.push("/sessions", {});

module.exports = db;