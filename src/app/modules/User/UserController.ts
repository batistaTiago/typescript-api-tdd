import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import { AppInvalidRouteParameterError } from '../../exceptions/AppInvalidRouteParameterError';
import { AppValidationError } from '../../exceptions/AppValidationError';
import UserRepository from './UserRepository';
const models = require('../../models');
export class UserController {

    public constructor() { }

    public async getAll(request: Request, response: Response) {

        const users = await UserRepository.findWithFilter(request.query.search_query?.toString());

        return response.status(HTTPStatus.OK).send({
            success: true,
            message: 'OK',
            count: users.length,
            data: users,
        });
    }

    public async find(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            next(new AppInvalidRouteParameterError('Route parameter should be an integer.'));
        }

        const user = await UserRepository.findById(id);

        return response.status(HTTPStatus.OK).send({
            success: !!user,
            message: 'OK',
            data: user
        });
    }

    public async create(request: Request, response: Response, next: NextFunction) {

        if (!request.body.name) {
            const field = 'name';
            const message = 'The name field is required';
            next(new AppValidationError({ field, message }));
        }

        if ((!request.body.email)) {
            const field = 'email';
            const message = 'The email field is required';
            next(new AppValidationError({ field, message }));
        }

        if (!request.body.email.isValidEmail()) {
            const field = 'email';
            const message = 'The email field is invalid, please use "user@provider.ext" format.';
            next(new AppValidationError({ field, message }));
        }

        if ((!request.body.password)) {
            const field = 'password';
            const message = 'The password field is required';
            next(new AppValidationError({ field, message }));
        }

        if ((request.body.password.length < 6)) {
            const field = 'password';
            const message = 'The password field is invalid';
            next(new AppValidationError({ field, message }));
        }

        if ((!request.body.password_confirmation) || (request.body.password != request.body.password_confirmation)) {
            const field = 'password';
            const message = 'The password and password confirmation do not match';
            next(new AppValidationError({ field, message }));
        }

        const { name, email, password } = request.body;
        const user = await models.User.create({
            name, email, password
        });

        return response.status(HTTPStatus.CREATED).send({
            success: true,
            message: 'User created successfully',
            data: user
        });
    }

    public async update(request: Request, response: Response) {

        try {
            const set = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
            };

            const filters = {
                where: {
                    id: request.params.id
                }
            };

            const updateCount = await models.User.update(set, filters);

            if (updateCount == 0) {
                return response.status(HTTPStatus.OK).send({
                    success: false,
                    message: 'Resource not found: no users have been affected by this operation',
                    data: null
                });
            }

            const user = await models.User.findOne(filters);

            return response.status(HTTPStatus.OK).send({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (e) {
            response.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'error'
            });
        }

    }
}