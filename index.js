import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/user.routes.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 8000;

// add CORS
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// add user router
app.use('/users', router);

// setting port to 3000, & listening for requests http request.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
