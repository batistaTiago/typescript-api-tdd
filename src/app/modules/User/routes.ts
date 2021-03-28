import { Application } from 'express';
import { UserController } from './UserController';
import UserRepository from './UserRepository';

class UserRoutes {

    private prefix: string = '/api/v1/users';
    private controller: UserController;

    constructor(app: Application) {
        const userRepo = new UserRepository();
        this.controller = new UserController(userRepo);
        this.initRoutes(app);
     }

    public initRoutes(app: Application) {
        app.route(`${this.prefix}`).get(this.controller.getAll);
        app.route(`${this.prefix}/:id`).get(this.controller.find);
        app.route(`${this.prefix}/`).post(this.controller.create);
        app.route(`${this.prefix}/:id`).patch(this.controller.update);
    }
}

export default UserRoutes;