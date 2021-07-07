import { config } from "dotenv";
config();

export default {
    port:process.env.PORT,
    server:process.env.SERVER,
    secret:process.env.SECRET as string
}