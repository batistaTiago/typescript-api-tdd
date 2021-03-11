import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandler } from './error-handler';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    public middleware(): void {
        // this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandler);
        this.initRoutes(this.express);
    }

    private initRoutes(app: Application): void {
        new Routes(app);
    }
}

export default new Api().express;