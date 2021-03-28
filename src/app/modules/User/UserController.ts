import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import { BTInvalidRouteParameterError } from '../../exceptions/BTInvalidRouteParameterError';
import { BTValidationError } from '../../exceptions/BTValidationError';
import IValidationErrorData from '../../exceptions/interfaces/IValidationerrorData';
import BTBaseController from '../../http/controllers/BTBaseController';
import IUserRepository from './interfaces/IUserRepository';

export class UserController extends BTBaseController {

    constructor(private repository: IUserRepository) {
        super();
    }

    public async getAll(request: Request, response: any, next: NextFunction) {

        const users = await this.repository.findWithFilter(request.query.search_query?.toString());

        response.locals.http_status = HTTPStatus.OK;

        response.locals.json_data = {
            success: true,
            data: users,
            message: 'OK',
            count: users.length,
        };

        return next();
    }

    public async find(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            return next(new BTInvalidRouteParameterError('Route parameter should be an integer.'));
        }

        const user = await this.repository.findById(id);

        response.locals.http_status = HTTPStatus.OK;

        response.locals.json_data = {
            success: !!user,
            message: 'OK',
            data: user
        };

        return next();
    }

    public async create(request: Request, response: Response, next: NextFunction) {

        /* @TODO: refactor */
        /* START validation */
        const nameError: IValidationErrorData = {
            field: 'name',
            messages: []
        }

        let field = 'name';
        if (!request.body.name) {
            nameError.messages.push('The name field is required');
        }

        field = 'email';
        const emailError: IValidationErrorData = {
            field,
            messages: []
        }
        if ((!request.body.email)) {
            emailError.messages.push('The email field is required');
        } else if (!request.body.email.isValidEmail()) {
            emailError.messages.push('The email field is invalid, please use "user@provider.ext" format.');
        }

        field = 'password';
        const passwordError: IValidationErrorData = {
            field,
            messages: []
        }
        if ((!request.body.password)) {
            passwordError.messages.push('The password field is required');
        } else if ((request.body.password.length < 6)) {
            passwordError.messages.push('The password field is invalid');
        }

        if ((!request.body.password_confirmation) || (request.body.password != request.body.password_confirmation)) {
            passwordError.messages.push('The password and password confirmation do not match')
        }

        const errors: IValidationErrorData[] = [
            nameError,
            emailError,
            passwordError
        ].filter(error => {
            return error.messages.length > 0;
        });

        if (errors.length) {
            return next(new BTValidationError(errors)); // throws the error to the handler...
        }
        /* @END validation */



        const { name, email, password } = request.body;
        const user = await this.repository.create({
            name, email, password
        });

        response.locals.http_status = HTTPStatus.CREATED;

        response.locals.json_data = {
            success: true,
            message: 'User created successfully',
            data: user
        };

        return next();
    }

    public async update(request: Request, response: Response, next: NextFunction) {
        
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
            return response.status(HTTPStatus.OK).send({
                success: false,
                message: 'Resource not found: no users have been affected by this operation',
                data: null
            });
        }

        const user = await this.repository.findById(id);

        response.locals.http_status = HTTPStatus.OK;

        response.locals.json_data = {
            success: true,
            message: 'User updated successfully',
            data: user
        };

        return next();
    }
}