"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers");
const route = express_1.Router();
const VerifiToken_1 = __importDefault(require("../auth/VerifiToken"));
route.get("/", post_controllers_1.getImages);
route.post("/create", VerifiToken_1.default, post_controllers_1.createImage);
route.post("/image/:id", VerifiToken_1.default, post_controllers_1.likePost);
route.patch("/update/:id", VerifiToken_1.default, post_controllers_1.updateImage);
route.delete("/delete/:id", VerifiToken_1.default, post_controllers_1.deleteImages);
exports.default = route;
