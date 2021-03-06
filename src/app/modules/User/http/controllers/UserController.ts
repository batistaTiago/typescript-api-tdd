import * as HTTPStatus from 'http-status';
import BTBaseController from '../../../../framework/http/BTBaseController';
import BTHttpRequest from '../../../../framework/http/requests/BTHttpRequest';
import IBTHttpResponse from '../../../../framework/http/requests/interfaces/BTHttpResponseInterface';
import BTUserRepositoryInterface from '../../data/interfaces/BTUserRepositoryInterface';
import BTUserControllerInterface from './BTUserControllerInterface';

export default class UserController extends BTBaseController implements BTUserControllerInterface {

    constructor(protected repository: BTUserRepositoryInterface) {
        super();
    }

    public async getAll(request: BTHttpRequest): Promise<IBTHttpResponse> {

        const users = await this.repository.findWithFilter(request.query.search_query?.toString());

        return {
            statusCode: HTTPStatus.OK,
            body: {
                success: true,
                data: users,
                message: 'OK',
                count: users.length,
            }
        };
    }

    public async find(request: BTHttpRequest): Promise<IBTHttpResponse> {
        const user = await this.repository.findById(parseInt(request.params.id));

        return {
            statusCode: HTTPStatus.OK,
            body: {
                success: !!user,
                message: 'OK',
                data: (user as any)
            }
        };
    }

    public async create(request: BTHttpRequest): Promise<IBTHttpResponse> {
        const { name, email, password } = request.body;
        const user = await this.repository.create({
            name, email, password
        });


        return {
            statusCode: HTTPStatus.CREATED,
            body: {
                success: true,
                message: 'User created successfully',
                data: user
            }
        };
    }

    public async update(request: BTHttpRequest): Promise<IBTHttpResponse> {

        const id = parseInt(request.params.id);

        const set = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        };

        const filters = {
            where: {
                id
            }
        };

        const updateCount = await this.repository.update(set, filters);

        if (updateCount == 0) {
            return {
                statusCode: HTTPStatus.OK,
                body: {
                    success: false,
                    message: 'Resource not found: no users have been affected by this operation',
                }
            };
        }

        const user = await this.repository.findById(id);

        return {
            statusCode: HTTPStatus.OK,
            body: {
                success: true,
                message: 'User updated successfully',
                data: (user as any)
            }
        };
    }
}