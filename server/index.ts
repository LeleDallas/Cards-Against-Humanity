import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { ServerSocket } from './socket';
import { collections, connectToDatabase } from './db/services/database.service';
import { cardsRouter } from './db/routes/cards.router';

dotenv.config();

const port = process.env.PORT;

const app = express()

const application = express();

const httpServer = http.createServer(application);

new ServerSocket(httpServer);

let allowCrossDomain = function(req:any, res:any, next:any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
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

application.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: error.message
  });
});

connectToDatabase()
  .then(() => {
    app.use("/cards", cardsRouter);
    app.listen(+port! + 1, () => {
      console.log(`Server started at http://localhost:${+port! + 1}`);
    });
    httpServer.listen(port, () => console.info(`Server is running`));
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

export default { application, httpServer }
