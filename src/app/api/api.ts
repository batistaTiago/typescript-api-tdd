import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";
import { BTValidationError } from '../exceptions/BTValidationError';
const fs = require('fs');
const path = require('path');

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

        const normalizedPath = path.join(__dirname, '../exceptions/handlers/');

        /* autoloads exception handlers */
        fs.readdirSync(normalizedPath)
            .filter((file) => {
                return (file.indexOf('.') !== 0) && (file.slice(-10) === 'Handler.js');
            })
            .forEach((file) => {
                this.express.use(require(normalizedPath + file));
            });
    }

    private initRoutes(app: Application): void {
        
        new Routes(app);
        new UserRoutes(app);
        app.get('/error', () => {
            throw new BTValidationError(
                {
                    field: 'email',
                    message: 'Email is invalid'
                });
        });
    }
}

export default new Api().express;