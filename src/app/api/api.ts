import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppError } from '../exceptions/apperror';
import { Application } from 'express';
import { errorHandler } from '../exceptions/handler';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";

import * as morgan from 'morgan';

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

        this.express.use((err, req, res, next) => {
            console.log(`Error handler vai ser executado...`);
            errorHandler(err, res);
        });

        this.initRoutes(this.express);
    }

    private initRoutes(app: Application): void {
        new Routes(app);
        new UserRoutes(app);
    }
}

export default new Api().express;