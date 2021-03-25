import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";
import { BTValidationError } from '../exceptions/BTValidationError';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.loadDefaultMiddleware();
        this.initRoutes(this.express);
        this.loadDefaultExceptionHandlers(this.express);
        
    }

    public loadDefaultMiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
    }

    private initRoutes(app: Application): void {

        new Routes(app);
        new UserRoutes(app);
        app.get('/error', () => {
            throw new BTValidationError(
                {
                    field: 'email',
                    messages: [
                        'Email is invalid',
                    ]
                });
        });
    }

    private loadDefaultExceptionHandlers(app: Application): void {
        const fs = require('fs');
        const path = require('path');

        const normalizedPath = path.join(__dirname, '../exceptions/handlers/');
        /* autoloads exception handlers */
        fs.readdirSync(normalizedPath)
            .filter((file) => {
                return (file.indexOf('.') !== 0) && (file.slice(-10) === 'Handler.js');
            })
            .reverse() // melhorar isso (ta pegando os arquivos em ordem alfabetica, ai precisa reverter pra os handlers serevem registrados na ordem certa)
            .forEach((file) => {
                app.use(require(normalizedPath + file));
            });
    }
}

export default new Api().express;