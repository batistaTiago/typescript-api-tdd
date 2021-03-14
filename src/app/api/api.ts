import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";
import { AppValidationError } from '../exceptions/AppValidationError';

const AppValidationErrorHandler = require('../exceptions/handlers/AppValidationErrorHandler');
const AppGenericErrorHandler = require('../exceptions/handlers/AppGenericErrorHandler');

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    public middleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());

        this.initRoutes(this.express);

        this.express.use(AppValidationErrorHandler);
        this.express.use(AppGenericErrorHandler);
    }

    private initRoutes(app: Application): void {
        new Routes(app);
        new UserRoutes(app);
        app.get('/error', () => {
            throw new AppValidationError([
                {
                    name: 'email',
                    messages: ['Email is invalid']
                },
                {
                    name: 'name',
                    messages: ['Name is invalid']
                },
            ]);
        });
    }
}

export default new Api().express;