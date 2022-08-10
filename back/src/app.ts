import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '../../.env' });

import express from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import routes from './routes';
import { postgres } from './config/database';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
  origin: ['https://*', 'http://*'],
  allowedHeaders: ['Accept', 'Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 300,
};

app.use(cors(corsOptions));
app.use(timeout('10s'));
app.use(bodyParser.json());
app.use(routes);

(async () => {
  try {
    await postgres.connect();
    console.info('postgres connected');

    app.listen(port, () => {
      console.info(`app listening on port ${port}`);
    });
  } catch (err) {
    console.error('failed to start the app: ', err);
  }
})();
