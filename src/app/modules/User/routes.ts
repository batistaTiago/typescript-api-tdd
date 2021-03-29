import { Application } from 'express';
import { UserControllerExpressAdapter } from '../../http/adapters/UserControllerExpressAdapter';
import { UserController } from './UserController';
import UserRepository from './UserRepository';

class UserRoutes {

    private prefix: string = '/api/v1/users';
    private controller: UserController;
    private adapter: UserControllerExpressAdapter;

    constructor(app: Application) {
        const userRepo = new UserRepository();
        this.controller = new UserController(userRepo);
        this.adapter = new UserControllerExpressAdapter(this.controller);
        this.initRoutes(app);
    }

    public initRoutes(app: Application) {
        app.route(`${this.prefix}`).get(this.adapter.getAll);
        app.route(`${this.prefix}/:id`).get(this.adapter.find);
        app.route(`${this.prefix}/`).post(this.adapter.create);
        app.route(`${this.prefix}/:id`).patch(this.adapter.update);
    }
}

export default UserRoutes;