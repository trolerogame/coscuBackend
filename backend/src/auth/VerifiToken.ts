import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import config from "../config";

//? busca dentro de la cabezera una que se llamda "token" si se encuentra la verifica con jwt.verify , si es correcto manda da la data del usuario y pasa a la siguiente funcion 
const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers["token"] as string;
  if (!token) return res.status(401).send("no te has logeado");
  jwt.verify(token, config.secret, (err, data) => {
    if (!err) {
      res.locals.userId = data?.id;
      next();
    }
    if (err) {
      return res.send("el token es incorrecto");
    }
  });
};

export default verifyToken;
