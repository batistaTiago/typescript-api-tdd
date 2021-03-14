import { Application } from 'express';
import { UserController } from './UserController';

class UserRoutes {

    private prefix: string = '/api/v1/users';
    private controller: UserController;

    constructor(app: Application) {
        this.controller = new UserController();
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