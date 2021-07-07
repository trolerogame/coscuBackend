import { RequestHandler } from "express";
import Post from "../model/Post";
import User from "../model/User";

const getImages: RequestHandler = async (req, res): Promise<void> => {                //? obtenemos todas las imagenes que esten en la base de datos
  const images = await Post.find().populate("author ",{Posts:0,password:0,__v:0})
  res.send(images);
};
const uploadCloud: RequestHandler = async (req, res): Promise<void> => {        //? creamos una imagen si primero tiene un token ,segundo si el usuario existe y si esta logeado 
  req.file && res.send(req.file.filename);
  !req.file && res.send("");
}; 

const createImage: RequestHandler = async (req, res): Promise<void> => {        //? creamos una imagen si primero tiene un token ,segundo si el usuario existe y si esta logeado 
  const { url, description } = req.body;
  const _id = res.locals.userId;
  try {
    const user = await User.findById(_id) 
    const newImages = await Post.create({
      author: user?._id,
      url,
      likes: [],
      description: description || "",
    });
    await User.findByIdAndUpdate(_id,{$push:{Posts: newImages._id}});
    const userUpdate = await User.findById(_id)
    res.send(userUpdate);
  } catch (err) {
    res.status(404).send("datos invalidos");
  }
};

const updateImage: RequestHandler = async (req, res): Promise<void> => {        //? podemos editar la imagen si esta logeado
  const { description } = req.body;
  const _idUser = res.locals.userId;
  const _id = req.params.id;
  try {
    const user = await User.findById(_idUser);
    if(user){
      const update = await Post.findByIdAndUpdate(_id, { description });
      update && res.send("descripcion actualizada");
      !update && res.status(404).send("no se puede actualizar la imagen")
    }
    
  } catch (err) {
    res.status(404).send("no se encontro el usuario");
  }
  res.end()
};

const deleteImages: RequestHandler = async (req, res): Promise<void> => {     //? podemos eliminar una imagen si tienen el token y esta logeado
  const _idUser = res.locals.userId;
  const _id = req.params.id;
  try {
    const user = await User.findById(_idUser);
    if(user){
      const deleteImage = await Post.findByIdAndDelete(_id);
      deleteImage && res.send("imagen eliminado")
      !deleteImage && res.status(404).send("imagen no encontrado")
    }
  } catch (err) {
    res.status(404).send("no se encontro el usuario");
  }
  res.end()
};
const likePost: RequestHandler = async (req, res): Promise<void> => {     //? le podemos dar like si estamos logeado , si ya le dimos like anteriormente este hace un pull del usuario en el array de likes y si no lo mete dentro del array con un addToSet
  const _id = req.params.id;
  const _idUser = res.locals.userId;
  try{
    const user = await User.findOne({_id: _idUser});  //? busca el usuario
    if(user){
      const post = await Post.findById(_id);
      const validate = post.likes.find((user:string) => user == _idUser)  //? si el usuario existe busca si el usuario se encuentra en el array likes que se encuentra dentro de post
      //? si  es correcto se saca al usuario de la lista 
      if(validate){
        await Post.findByIdAndUpdate(_id,{$pull:{likes:user?._id}})
      }
      //? sino se agrega
      if(!validate){
        await Post.findByIdAndUpdate(_id,{$addToSet:{likes:user?._id}})
      }
      const Posts = await Post.find().populate("author",{Posts:0,password:0,__v:0})
      res.send(Posts)
    }
  }catch(err){
    res.send("no te logeaste")
  }
}
export { getImages, createImage, updateImage, deleteImages,likePost,uploadCloud };
