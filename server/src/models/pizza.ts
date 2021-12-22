import { Schema, model } from 'mongoose';

interface Review {
  title: string;
  desc: string;
  rating: number;
  userId: string;
}
interface Pizza {
  name: string;
  price: number;
  vegan: boolean;
  category?: 'neapolitan' | 'sicilian' | 'detroit' | 'greek' | 'bagel';
  reviews: Review[];
  imgUrl?: string;
}

const reviewSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

const pizzaSchema = new Schema<Pizza>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    price: {
      type: Number,
      required: true,
      min: 50,
      max: 500,
    },
    vegan: { type: Boolean, required: true },
    reviews: [reviewSchema],
    category: {
      type: String,
      enum: ['neapolitan', 'sicilian', 'detroit', 'greek', 'bagel'],
    },
    imgUrl: String,
  },
  { timestamps: true }
);

export default model<Pizza>('pizza', pizzaSchema);
