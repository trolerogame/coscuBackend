import { Router } from "express";
const route = Router();
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/user.controllers";
import verifyToken from "../auth/VerifiToken"

route.get("/", getUsers);
route.get("/info",verifyToken, getUser);
route.post("/register", createUser);
route.post("/login", loginUser);
route.patch("/update",verifyToken, updateUser);
route.delete("/delete",verifyToken, deleteUser);

export default route;
