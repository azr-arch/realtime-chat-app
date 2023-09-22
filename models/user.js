import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.n1C1oxOvYLLyDIavrBFoNQAAAA?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  bio: {
    type: String,
    default: "yet to fill bio!",
  },
  password: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
