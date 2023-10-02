import 'reflect-metadata';
import express from 'express';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { Route } from '@interfaces/router.interface';
import { dbConnection } from './database';
import { ErrorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { logger, stream } from './utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 5000;

    this.databaseConnection();
    this.executeMiddlewares();
    this.executeRoutes(routes);
    this.executeErrorHandler();
  }

  public listening() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Listening on port ${this.port}`);
    });
  }

  public useServer() {
    return this.app;
  }

  private async databaseConnection() {
    await dbConnection.initialize();
  }

  private executeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private executeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }

  private executeErrorHandler() {
    this.app.use(ErrorMiddleware);
  }
}
