"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    port: process.env.PORT,
    server: process.env.SERVER,
    secret: process.env.SECRET
};
