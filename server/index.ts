import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { ServerSocket } from './socket';
dotenv.config();

const port = process.env.PORT;

const application = express();

const httpServer = http.createServer(application);

new ServerSocket(httpServer);

application.use((req, res, next) => {
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });

  next();
});

application.use(express.urlencoded({ extended: true }));
application.use(express.json());

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

httpServer.listen(port, () => console.info(`Server is running`));

