import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user';

const get_all_users = (_: Request, res: Response) => {
  User.find({}, { _id: 1, name: 1, age: 1, email: 1 })
    .then((users) => res.json(users))
    .catch(() =>
      res.status(404).json({
        message: 'Error while fetching all users. Please try Again later',
      })
    );
};

const get_one_user = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findById(id, { _id: 0, name: 1, age: 1, email: 1 })
    .then((user) => res.status(206).json(user))
    .catch(() =>
      res.status(404).json({
        message: 'Error while finding specific user. Please try Again later',
      })
    );
};

const post_add_user = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { password, name, age, phone, email } = req.body;
  const userPhone = await User.findOne({ phone }, { name: 1, email: 1 });

  if (userPhone) {
    return res.status(409).json({ message: 'Phone number already exists.' });
  }
  const userEmail = await User.findOne({ email }, { name: 1, email: 1 });

  if (userEmail)
    return res.status(409).json({ message: 'Email already exists.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    age,
    phone,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch {
    res.status(500).json({
      message: 'Unable to create user. Please Try again later',
    });
  }
};

const delete_one_user = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.status(202).json({ message: 'Deleted user successfully!' }))
    .catch(() =>
      res.status(404).json({
        message: 'Error while deleting specific user. Please try Again later',
      })
    );
};

const post_login_user = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { phone, password } = req.body;
  try {
    const errMsg = {
      message: 'Invalid phone or password',
    };
    const user = await User.findOne(
      { phone },
      { name: 1, email: 1, age: 1, password: 1 }
    );
    if (!user) return res.status(405).json(errMsg);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json(errMsg);

    res.status(202).json(user);
  } catch {
    res.status(500).json({ message: 'Error while login' });
  }
};

const userController = {
  get_all_users,
  post_add_user,
  get_one_user,
  delete_one_user,
  post_login_user,
};

export default userController;
