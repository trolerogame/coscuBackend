"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Posts = new mongoose_1.Schema({
    author: { type: String, ref: "user", required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
    url: { type: String, required: true },
    description: String,
});
exports.default = mongoose_1.model("post", Posts);
