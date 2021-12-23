import { Router } from 'express';
import orderController from '../controllers/orderController';

const orderRouter = Router();

orderRouter
  .route('/')
  .get(orderController.get_all_orders)
  .post(orderController.post_add_order);

orderRouter.route('/users/:id').get(orderController.get_user_orders);

export default orderRouter;
