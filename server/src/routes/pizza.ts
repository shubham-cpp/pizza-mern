import { Router } from 'express';
import { body } from 'express-validator';
import pizzaController from '../controllers/pizzaController';

const pizzaRouter = Router();

pizzaRouter
  .route('/')
  .get(pizzaController.get_all_pizzas)
  .post(
    body('name')
      .trim()
      .escape()
      .isLength({ min: 4 })
      .withMessage('Name should at least be 4 characters'),
    body('price', 'Price must be between Rs.50 and Rs.500').isInt({
      min: 50,
      max: 501,
    }),
    body('vegan', 'Should be a valid boolean').isBoolean(),
    body('category', 'Invalid category passed')
      .isIn(['neapolitan', 'sicilian', 'detroit', 'greek', 'bagel', 'generic'])
      .optional(),
    body('imgUrl', 'Please pass a valid url').isURL().optional(),
    pizzaController.post_add_pizza
  );

pizzaRouter
  .route('/:id')
  .get(pizzaController.get_one_pizza)
  .put(
    body('name')
      .trim()
      .escape()
      .isLength({ min: 4 })
      .withMessage('Name should at least be 4 characters'),
    body('price', 'Price must be between Rs.50 and Rs.500').isInt({
      min: 50,
      max: 501,
    }),
    body('vegan', 'Should be a valid boolean').isBoolean(),
    body('category', 'Invalid category passed')
      .isIn(['neapolitan', 'sicilian', 'detroit', 'greek', 'bagel', 'generic'])
      .optional(),
    body('imgUrl', 'Please pass a valid url').isURL().optional(),
    pizzaController.put_update_pizza
  )
  .delete(pizzaController.delete_one_pizza);

export default pizzaRouter;
