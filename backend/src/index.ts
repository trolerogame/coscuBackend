import app from "./app";
import config from "./config";
//? inicia el servidor
import "./database";
const server = app.listen(config.port);

export {app,server}