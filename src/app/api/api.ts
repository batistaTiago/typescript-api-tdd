import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { errorHandler } from '../exceptions/Handler';
import Routes from './routes/routes';
import UserRoutes from "../modules/User/Routes";

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

        this.express.use((err, req, res, next) => {
            errorHandler(err, res);
        });
    }

    private initRoutes(app: Application): void {
        new Routes(app);
        new UserRoutes(app);
    }
}

export default new Api().express;