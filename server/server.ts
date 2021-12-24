import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import { connect, Error } from 'mongoose';
import * as swaggerUI from 'swagger-ui-express';
import { userRouter, pizzaRouter, orderRouter } from './src/routes';
import swaggerOptions from './src/api-info';

config();

const PORT = process.env.PORT ?? 4001;
const DB_URI = process.env.DB_URI ?? '';

connect(DB_URI)
  .then(() => {
    console.log('Connected to mongo');
    const app = express();

    app.use(express.urlencoded({ extended: true })); // Allow data to be accepted from `forms`
    app.use(express.json()); // Allow json
    app.use(cors()); // Allow requests from react app
    app.use(morgan('dev')); // Middleware to debug requests

    app.get('/', (_, res) => {
      res.send('Hello from server');
    });

    app.use('/api/users', userRouter);
    app.use('/api/pizzas', pizzaRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

    app.get('/*', (_, res) => {
      res
        .status(404)
        .send(
          '<div style="display:flex;color:red;justify-content:center"><h1>Page not found</h1></div>'
        );
    });

    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  })
  .catch((err: Error) =>
    console.log('Error while connecting to mongo\n', err.message)
  );
