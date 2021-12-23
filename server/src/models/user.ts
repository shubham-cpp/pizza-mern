import { Schema, model } from 'mongoose';

interface User {
  name: string;
  age: number;
  email: string;
  phone: number;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<User>('user', userSchema);
