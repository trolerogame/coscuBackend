import { RequestHandler ,Request as req, Response as res} from "express"
import jwt from "jsonwebtoken"
import User, { UserInterface } from "../model/User"
import config from "../config"
const getUsers: RequestHandler = async (req, res): Promise<void> => {   //? creamos todos los usuarios
  const users = await User.find().populate("Posts")
  res.send(users)
};
const createUser: RequestHandler = async (req, res): Promise<void> => {       //? podemos crear el usuario
  const { username, password, email } = req.body
  try {
    const newUser = await User.create({ username, password, email, Post: [] })
    newUser.password = await newUser.encriptPassword(newUser.password)    //? encripta la contrasenia pasada
    await newUser.save()
    res.json(newUser)
  } catch (err) {
    res.status(404).send(err)
  }
};

const deleteUser = async (req:req, res:res): Promise<void> => {       //? podemos eliminiar el usario si este tiene en la cabezera el token
  const _id: string = res.locals.userId;        
  try {
    const user = await User.findByIdAndDelete(_id)
    user && res.send("usuario eliminado");
    !user && res.status(404).send("user not found")
  } catch (err) {
    console.log("user not found")
  }
  res.locals.userId = ""
}; 

const updateUser = async (req:req, res:res): Promise<void> => {       //? podemos editar el usuario si este tiene en la cabezera el token
  const _id: string = res.locals.userId
  const { username, password, email,avatar } = req.body
  try {
    const user: UserInterface = (await User.findById(_id)) as UserInterface
    await User.findByIdAndUpdate(_id, {
      username: username || user.username,
      email: email || user.email,
      avatar: avatar || user.avatar,
      password: password ? await user.encriptPassword(password) : user.password,
    })
    const userEdited = await User.findById(_id,{password:0,__v:0}).populate("Posts author") as UserInterface
    res.send(userEdited)
  } catch (err) {
    res.status(404).send("el nombre o el email ya existen")
  }
  res.locals.userId = ""
};

const loginUser: RequestHandler = async (req, res): Promise<res|undefined> => {     //? con esto podemos logear al usuario dandole un token
  const { username, password } = req.body 
  try {
    const loginUser = await User.findOne({ username });
    if(!loginUser) return res.status(404).send("este usuario no existe ")
    
    const validate: boolean = (await loginUser?.validatePassword(     //? validamos la contrasenia
      password,
      loginUser.password
    )) as boolean
    if(!validate) return res.status(402).send("la contrasenia no coincide");

    const userToken = {
      id:loginUser?._id,
      username:loginUser?.username
    }
    //? si la contrasenia es correcta generamos un token con la libreria jsonwebtoken y se devuelve en la respuesta con el usuario
    const token = jwt.sign(userToken,config.secret)
    const usernameLogin = await User.findById(loginUser._id).populate("Posts")
    console.log(usernameLogin)
    return res.json({token,loginUser:usernameLogin})

  } catch (err) {
    console.log(err)
    res.status(404)
  }
};

const getUser: RequestHandler = async (req, res): Promise<void> => {        //?  obtenemos el usuario en base al tooken
  const _id = res.locals.userId
  const user = await User.findById(_id).populate("Posts")
  res.json(user)
}

export { loginUser, updateUser, deleteUser, createUser, getUsers, getUser};
