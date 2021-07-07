import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface {
  encriptPassword(password: string): Promise<string>;
  validatePassword(password: string, encriptPass: string): Promise<boolean>;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  Posts?: [{ type: string; ref: string }];
}

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: String,
  Posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});
//? creamos un funcion que usa bcrypt para hashear la contrasenia pasada al usuario
User.methods.encriptPassword = async function (
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
//? creamos una funcion que usa bcrypt para validar la contrasenia del usuario usando "compare"
User.methods.validatePassword = async (
  password: string,
  encriptPass: string
): Promise<boolean> => await bcrypt.compare(password, encriptPass);

export default model<UserInterface>("user", User);
