import IHttpRouter from '../../../framework/http/adapters/BTHttpRoutingInterface';
import UserControllerExpressAdapter from '../../../framework/http/adapters/UserControllerExpressAdapter';

class UserRoutes {

    private static prefix: string = '/api/v1/users';

    public static initRoutes(app: IHttpRouter, adapter: UserControllerExpressAdapter) {
        app.get(`${this.prefix}`, adapter.getAll);
        app.get(`${this.prefix}/:id`, adapter.find);
        app.post(`${this.prefix}/`, adapter.create);
        app.patch(`${this.prefix}/:id`, adapter.update);
    }
}

export default UserRoutes;