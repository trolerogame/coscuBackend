import { connect } from "mongoose";
import config from "./config";
const URL: string = config.server as string;

//? llamada a la base de datos
(async () => {
  try {
    await connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connect with mongose");
  } catch (e) {
    console.log(e);
  }
})()

