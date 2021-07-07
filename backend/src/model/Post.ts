import { Schema, model } from "mongoose";
const Posts = new Schema({
  author: { type: String, ref: "user", required: true },
  likes: [{type:Schema.Types.ObjectId,ref: "user"}],
  url: { type: String, required: true },
  description: String,
});

export default model("post", Posts);
