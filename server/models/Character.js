import { Schema, model } from "mongoose";

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  height: String,
  mass: String,
  hair_color: String,
  eye_color: String,
});

const Character = model("Character", characterSchema);

export default Character;
