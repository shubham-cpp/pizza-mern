import { Schema, model } from 'mongoose';

interface User {
  name: string;
  age: number;
  phone: number;
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
  },
  { timestamps: true }
);

export default model<User>('user', userSchema);
