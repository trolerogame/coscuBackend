"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const Post_routes_1 = __importDefault(require("./routes/Post.routes"));
const app = express_1.default();
//configs
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//route
app.use("/users", User_routes_1.default);
app.use("/post", Post_routes_1.default);
exports.default = app;
