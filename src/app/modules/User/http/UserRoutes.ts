import { Application } from 'express';
import UserControllerExpressAdapter from '../../../http/adapters/UserControllerExpressAdapter';

class UserRoutes {

    private static prefix: string = '/api/v1/users';

    public static initRoutes(app: Application, adapter: UserControllerExpressAdapter) {
        app.route(`${this.prefix}`).get(adapter.getAll);
        app.route(`${this.prefix}/:id`).get(adapter.find);
        app.route(`${this.prefix}/`).post(adapter.create);
        app.route(`${this.prefix}/:id`).patch(adapter.update);
    }
}

export default UserRoutes;