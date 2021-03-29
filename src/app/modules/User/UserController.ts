import * as HTTPStatus from 'http-status';
import { BTInvalidRouteParameterError } from '../../exceptions/BTInvalidRouteParameterError';
import { BTValidationError } from '../../exceptions/BTValidationError';
import IValidationErrorData from '../../exceptions/interfaces/IValidationerrorData';
import BTBaseController from '../../http/BTBaseController';
import IUserController from '../../http/interfaces/IUserController';
import BTCreateUserHttpRequest from '../../http/requests/BTCreateUserHttpRequest';
import IBTHttpRequest from '../../http/requests/interfaces/IBTHttpRequest';
import IBTHttpResponse from '../../http/requests/interfaces/IBTHttpResponse';
import IUserRepository from '../User/UserRepository';
export class UserController extends BTBaseController implements IUserController {

    constructor(protected repository: IUserRepository) {
        super();
    }

    public async getAll(request: IBTHttpRequest): Promise<IBTHttpResponse> {

        const users = await this.repository.findWithFilter(request.query.search_query?.toString());

        return {
            statusCode: HTTPStatus.OK,
            payload: {
                success: true,
                data: users,
                message: 'OK',
                count: users.length,
            }
        };
    }

    public async find(request: IBTHttpRequest): Promise<IBTHttpResponse> {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            throw new BTInvalidRouteParameterError('Route parameter should be an integer.');
        }

        const user = await this.repository.findById(id);

        return {
            statusCode: HTTPStatus.OK,
            payload: {
                success: !!user,
                message: 'OK',
                data: (user as any)
            }
        };
    }

    public async create(request: BTCreateUserHttpRequest): Promise<IBTHttpResponse> {
        const data = request.validate();

        const { name, email, password } = data;
        const user = await this.repository.create({
            name, email, password
        });


        return {
            statusCode: HTTPStatus.CREATED,
            payload: {
                success: true,
                message: 'User created successfully',
                data: user
            }
        };
    }

    public async update(request: IBTHttpRequest): Promise<IBTHttpResponse> {

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
                payload: {
                    success: false,
                    message: 'Resource not found: no users have been affected by this operation',
                }
            };
        }

        const user = await this.repository.findById(id);

        return {
            statusCode: HTTPStatus.OK,
            payload: {
                success: true,
                message: 'User updated successfully',
                data: (user as any)
            }
        };
    }
}