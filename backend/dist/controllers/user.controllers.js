"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.createUser = exports.deleteUser = exports.updateUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const config_1 = __importDefault(require("../config"));
const getUsers = async (req, res) => {
    const users = await User_1.default.find().populate("Posts", { author: 0 });
    res.send(users);
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = await User_1.default.create({ username, password, email, Post: [] });
        newUser.password = await newUser.encriptPassword(newUser.password);
        await newUser.save();
        res.json(newUser);
    }
    catch (err) {
        res.status(404).send(err);
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    const _id = res.locals.userId;
    try {
        await User_1.default.findByIdAndDelete(_id);
        res.send("usuario eliminado");
    }
    catch (err) {
        console.log("user not found");
    }
    res.end();
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    const _id = res.locals.userId;
    const { username, password, email } = req.body;
    try {
        const user = (await User_1.default.findById(_id));
        await User_1.default.findByIdAndUpdate(_id, {
            username: username || user.username,
            email: email || user.email,
            password: password ? await user.encriptPassword(password) : user.password,
        });
        res.send("user actualizado");
    }
    catch (err) {
        res.status(404).send("error");
    }
    res.end();
};
exports.updateUser = updateUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginUser = await User_1.default.findOne({ username });
        const validate = (await loginUser?.validatePassword(password, loginUser.password));
        !validate && res.status(402).send("la contrasenia no coincide");
        const userToken = {
            id: loginUser?._id,
            username: loginUser?.username
        };
        const token = jsonwebtoken_1.default.sign(userToken, config_1.default.secret);
        res.status(200).send({ auth: true, token });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("el usuario no existe");
    }
};
exports.loginUser = loginUser;
const getUser = async (req, res) => {
    const _id = res.locals.userId;
    const user = await User_1.default.findById(_id).populate("Posts", { author: 0 });
    res.json(user);
};
exports.getUser = getUser;
