import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";
import { BTValidationError } from '../exceptions/BTValidationError';
import { BTInvalidRouteParameterError } from '../exceptions/BTInvalidRouteParameterError';

class Api {

    public express: Application;

    constructor() {
        this.express = express();

        this.loadIncomingMiddleware(this.express);
        
        this.initRoutes(this.express);
        
        this.loadOutgoingMiddleware(this.express);
        
        this.loadDefaultExceptionHandlers(this.express);
    }

    public loadIncomingMiddleware(app: Application): void {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }

    private loadOutgoingMiddleware(app: Application): void {
        app.use((req, res: any, next) => {
            /* @TODO: refactor em outro arquivo */
            next();
            res.status(res.locals.http_status).send(res.locals.json_data);
        });
    }

    private initRoutes(app: Application): void {

        new Routes(app);
        new UserRoutes(app);
        app.get('/error', () => {
            /* @TODO: refactor em outro arquivo */
            throw new BTValidationError(
                {
                    field: 'email',
                    messages: [
                        'Email is invalid',
                    ]
                }
            );
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