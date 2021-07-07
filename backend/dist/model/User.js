"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: String,
    Posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
});
User.methods.encriptPassword = async function (password) {
    const salt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
};
User.methods.validatePassword = async (password, encriptPass) => await bcrypt_1.default.compare(password, encriptPass);
exports.default = mongoose_1.model("user", User);
