import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppError } from '../exceptions/apperror';
import { Application } from 'express';
import { errorHandler } from '../exceptions/handler';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";

<<<<<<< Updated upstream
import * as morgan from 'morgan';
=======
const AppValidationErrorHandler = require('../exceptions/handlers/AppValidationErrorHandler');
const AppGenericErrorHandler = require('../exceptions/handlers/AppGenericErrorHandler');
const AppInvalidRouteParameterError = require('../exceptions/handlers/AppInvalidRouteParameterErrorHandler');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        this.initRoutes(this.express);
=======
        const normalizedPath = path.join(__dirname);

        glob.sync(`${normalizedPath}/**/*`).forEach(function (file) {
            console.log(path.resolve(file));
        });

        // this.express.use(AppValidationErrorHandler);
        // this.express.use(AppInvalidRouteParameterError);
        // this.express.use(AppGenericErrorHandler);
>>>>>>> Stashed changes
    }

    private initRoutes(app: Application): void {
        new Routes(app);
        new UserRoutes(app);
<<<<<<< Updated upstream
=======
        app.get('/error', () => {
            throw new AppValidationError(
                {
                    field: 'email',
                    message: 'Email is invalid'
                });
        });
>>>>>>> Stashed changes
    }
}

export default new Api().express;