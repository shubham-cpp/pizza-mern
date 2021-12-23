import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import Pizza from '../models/pizza';

const get_all_pizzas = async (_: Request, res: Response) => {
  try {
    const pizzas = await Pizza.find(
      {},
      { imgUrl: 1, name: 1, vegan: 1, price: 1 }
    );
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({
      message: 'Error while fetching pizza data!. Please try again later',
      errors: err,
    });
  }
};

const get_one_pizza = async (req: Request, res: Response) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    res.json(pizza);
  } catch {
    res.status(500).json({
      message:
        'Error while fetching specific pizza data!. Please try again later',
    });
  }
};

const post_add_pizza = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const findPizza = await Pizza.findOne({ name: req.body.name });
    if (findPizza)
      return res.status(409).json({
        message:
          'A pizza with similar name already exists, Use update pizza instead',
      });
    const newPizza = new Pizza(req.body);
    await newPizza.save();
    res.json(newPizza);
  } catch {
    res.status(500).json({
      message: 'Error while fetching pizza data!. Please try again later',
    });
  }
};

const put_update_pizza = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const newPizza = await Pizza.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: false,
    });
    res.status(202).json(newPizza);
  } catch {
    res.status(417).json({ message: 'Unable to update pizza details.' });
  }
};

const delete_one_pizza = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Pizza.findByIdAndRemove(id);
    res.status(202).json({ message: 'Pizza was deleted Successfully' });
  } catch {
    res.status(417).json({ message: 'Unable to delete pizza details.' });
  }
};

const pizzaController = {
  get_all_pizzas,
  get_one_pizza,
  post_add_pizza,
  put_update_pizza,
  delete_one_pizza,
};

export default pizzaController;
