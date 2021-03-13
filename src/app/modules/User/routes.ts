import { Application, Request, Response } from 'express';
import { UserController } from './controller';

class UserRoutes {

    private prefix: string = '/api/v1/users';

    constructor(app: Application) {
        this.getRoutes(app);
     }

    public getRoutes(app: Application) {
        app.route(`${this.prefix}`).get(UserController.getAll);
        app.route(`${this.prefix}/:id`).get(UserController.find);
        app.route(`${this.prefix}/`).post(UserController.create);
        app.route(`${this.prefix}/:id`).patch(UserController.update);
    }
}

export default UserRoutes;