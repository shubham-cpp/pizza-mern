import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/userController';

const router = Router();

router
  .route('/')
  .get(userController.get_all_users)
  .post(
    body('name', 'Name should be between 4 and 24 and not empty')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 24 }),
    body('age', 'Age must be between 18 and 100')
      .notEmpty()
      .isInt({ min: 18, max: 100 }),
    body('phone', 'Please enter a valid indian phone number')
      .notEmpty()
      .isMobilePhone('en-IN'),
    body('email', 'Email is invalid')
      .isEmail()
      .escape()
      .trim()
      .normalizeEmail()
      .optional(),
    body(
      'password',
      'Password should be at least 6 chars and consist of 1 UppperCase,Lowercase,Number and special symbol'
    )
      .notEmpty()
      .isStrongPassword(),
    userController.post_add_user
  );

router
  .route('/login')
  .post(
    body('phone', 'Please enter a valid indian phone number')
      .notEmpty()
      .isMobilePhone('en-IN'),
    body('password', 'Please enter a strong password.')
      .trim()
      .notEmpty()
      .isStrongPassword(),
    userController.post_login_user
  );

router
  .route('/:id')
  .get(userController.get_one_user)
  .delete(userController.delete_one_user);

export default router;
