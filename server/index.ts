import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { ServerSocket } from './socket';
import { connectToDatabase } from './db/services/database.service';
import { cardsRouter } from './db/routes/cards.router';

dotenv.config();

const port = process.env.PORT;

const application = express();

const httpServer = http.createServer(application);

new ServerSocket(httpServer);

let allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
application.use(allowCrossDomain);

application.use((req, res, next) => {
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });

  next();
});

application.use(express.urlencoded({ extended: true }));
application.use(express.json());

//maybe to eliminate
application.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

application.get('/end-point', (req, res, next) => {
  return res.status(200).json({ hello: 'world!' });
});

application.get('/status', (req, res, next) => {
  return res.status(200).json({ users: ServerSocket.instance.users });
});

application.use(cardsRouter);


application.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: error.message
  });
});

connectToDatabase()

httpServer.listen(port, () => console.info(`Server is running`));

export default { application, httpServer }
