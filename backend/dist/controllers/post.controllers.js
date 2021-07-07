"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deleteImages = exports.updateImage = exports.createImage = exports.getImages = void 0;
const Post_1 = __importDefault(require("../model/Post"));
const User_1 = __importDefault(require("../model/User"));
const getImages = async (req, res) => {
    const images = await Post_1.default.find().populate("author likes", { Posts: 0, password: 0, __v: 0 });
    res.send(images);
};
exports.getImages = getImages;
const createImage = async (req, res) => {
    const { url, description } = req.body;
    const _id = res.locals.userId;
    try {
        const user = await User_1.default.findById(_id);
        const newImages = await Post_1.default.create({
            author: user?._id,
            url,
            likes: [],
            description: description || "",
        });
        await User_1.default.findByIdAndUpdate(_id, { $push: { Posts: newImages._id } });
        res.send(newImages);
    }
    catch (err) {
        res.status(404).send("datos invalidos");
    }
};
exports.createImage = createImage;
const updateImage = async (req, res) => {
    const { description } = req.body;
    const _idUser = res.locals.userId;
    const _id = req.params.id;
    try {
        const user = await User_1.default.findById(_idUser);
        if (user) {
            const update = await Post_1.default.findByIdAndUpdate(_id, { description });
            update && res.send("descripcion actualizada");
            !update && res.status(404).send("no se puede actualizar la imagen");
        }
    }
    catch (err) {
        res.status(404).send("no se encontro el usuario");
    }
    res.end();
};
exports.updateImage = updateImage;
const deleteImages = async (req, res) => {
    const _idUser = res.locals.userId;
    const _id = req.params.id;
    try {
        const user = await User_1.default.findById(_idUser);
        if (user) {
            const deleteImage = await Post_1.default.findByIdAndDelete(_id);
            deleteImage && res.send("imagen eliminado");
            !deleteImage && res.status(404).send("imagen no encontrado");
        }
    }
    catch (err) {
        res.status(404).send("no se encontro el usuario");
    }
    res.end();
};
exports.deleteImages = deleteImages;
const likePost = async (req, res) => {
    const _id = req.params.id;
    const _idUser = res.locals.userId;
    try {
        const user = await User_1.default.findOne({ _id: _idUser });
        if (user) {
            const likeUser = await Post_1.default.findOne({ likes: user?._id });
            if (likeUser) {
                await Post_1.default.findByIdAndUpdate(_id, { $pull: { likes: user?._id } });
                res.send("sacaste el like");
            }
            if (!likeUser) {
                await Post_1.default.findByIdAndUpdate(_id, { $addToSet: { likes: user?._id } });
                res.send("le diste like");
            }
        }
    }
    catch (err) {
        res.send("no te logeaste");
    }
};
exports.likePost = likePost;
