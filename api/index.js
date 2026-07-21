const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "backend", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "backend", ".env.local"), override: true });
const app = require(path.join(__dirname, "..", "backend", "src", "app"));
module.exports = app;
