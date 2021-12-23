import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import Order from '../models/order';

const get_user_orders = (req: Request, res: Response) => {
  Order.find({ userId: req.body.id })
    .sort({ createdAt: -1 })
    .then((orders) => res.json(orders))
    .catch(() =>
      res
        .status(500)
        .json({ message: 'Unable to find orders with specified user' })
    );
};

const get_all_orders = (_: Request, res: Response) => {
  Order.find()
    .sort({ createdAt: -1 })
    .then((orders) => res.json(orders))
    .catch(() =>
      res
        .status(500)
        .json({ message: 'Unable to find orders with specified user' })
    );
};

const post_add_order = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newOrder = new Order(req.body);
  newOrder
    .save()
    .then(() => res.status(201).json({ message: 'Order place Successfully' }))
    .catch(() =>
      res.status(402).json({ message: 'Unable to place order right now.' })
    );
};

const orderController = {
  get_user_orders,
  get_all_orders,
  post_add_order,
};

export default orderController;
