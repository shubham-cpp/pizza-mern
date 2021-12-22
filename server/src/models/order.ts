import { Schema, model } from 'mongoose';

const orderItemsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 50, max: 500 },
  pizzaId: { type: Schema.Types.ObjectId, required: true, ref: 'pizza' },
});

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    status: { type: Boolean, default: false },
    items: [orderItemsSchema],
    totalBill: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default model('order', orderSchema);
