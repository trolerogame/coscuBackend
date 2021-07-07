"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const user_controllers_1 = require("../controllers/user.controllers");
const VerifiToken_1 = __importDefault(require("../auth/VerifiToken"));
route.get("/", user_controllers_1.getUsers);
route.get("/info", VerifiToken_1.default, user_controllers_1.getUser);
route.post("/register", user_controllers_1.createUser);
route.post("/login", user_controllers_1.loginUser);
route.patch("/update", VerifiToken_1.default, user_controllers_1.updateUser);
route.delete("/delete", VerifiToken_1.default, user_controllers_1.deleteUser);
exports.default = route;
