"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config"));
const URL = config_1.default.server;
(async () => {
    try {
        await mongoose_1.connect(URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("connect with mongose");
    }
    catch (e) {
        console.log(e);
    }
})();
