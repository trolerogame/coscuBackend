import express from "express";
import cors from "cors";
import routeUser from "./routes/User.routes";
import routePost from "./routes/Post.routes";
import path from "path";
import multer from  "multer";
import {v4 as uuidv4} from "uuid"
const app = express();

// configuracion de multer storage
const storage = multer.diskStorage({
    destination:__dirname + "/public/avatar",
    filename:(req,file,cb)=> {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
    }
})
//configs
app.use(cors());
app.use(express.json());
app.use(multer({storage}).single("file"))
app.use(multer({storage}).single("fileTwo"))
app.use(express.static(path.join(__dirname,"/")))
app.use(express.urlencoded({ extended: true }));

//route
app.use("/users", routeUser);
app.use("/post", routePost);

export default app;
