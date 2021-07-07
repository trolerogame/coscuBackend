import { Router } from "express";
import {
  createImage,
  deleteImages,
  getImages,
  updateImage,
  likePost,
  uploadCloud
} from "../controllers/post.controllers";
const route = Router();
import verifyToken from "../auth/VerifiToken"

route.get("/", getImages);
route.post("/create",verifyToken, createImage);
route.post("/image/:id",verifyToken, likePost);
route.post("/uploadCloud", uploadCloud);
route.patch("/update/:id",verifyToken, updateImage);
route.delete("/delete/:id",verifyToken, deleteImages);

export default route;
