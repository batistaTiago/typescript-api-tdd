import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
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

    public async find(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            /* @TODO: should throw validation error, which should send the json below */
            return response.status(HTTPStatus.BAD_REQUEST).send({
                success: false,
                message: 'Route parameter should be an integer.',
            });
        }
        const user = await UserRepository.findById(parseInt(request.params.id));

        return response.status(HTTPStatus.OK).send({
            success: !!user,
            message: 'OK',
            data: user
        });
    }

    public async create(request: Request, response: Response, next) {
        if (!request.body.name) {
            /* @TODO: should throw validation error, which should send the json below */

            const errorData = [
                {
                    name: 'name',
                    messages: ['The field name is required']
                }
            ];

            next(new AppValidationError(errorData));
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(request.body.email)) {
            /* @TODO: should throw validation error, which should send the json below */
            return response.status(HTTPStatus.NOT_ACCEPTABLE).send({
                success: false,
                message: 'Error',
                details: {
                    email: [
                        'The field email is invalid, please use "user@provider.ext" format.'
                    ]
                }
            });
        }

        if ((!request.body.password) || (request.body.password.length < 6)) {
            return response.status(HTTPStatus.NOT_ACCEPTABLE).send({
                success: false,
                message: 'Error',
                details: {
                    password: [
                        'The field password is invalid.'
                    ]
                }
            });
        }

        if ((!request.body.password_confirmation) || (request.body.password != request.body.password_confirmation)) {
            /* @TODO: should throw validation error, which should send the json below */
            return response.status(HTTPStatus.NOT_ACCEPTABLE).send({
                success: false,
                message: 'Error',
                details: {
                    password: [
                        'The passwords do not match..'
                    ]
                }
            });
        }


        // try {
        const { name, email, password } = request.body;
        const user = await models.User.create({
            name, email, password
        });

        return response.status(HTTPStatus.CREATED).send({
            success: true,
            message: 'User created successfully',
            data: user
        });
        // } catch (e) {
        //     return response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
        //         success: false,
        //         message: 'Error'
        //     });
        // }
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
                // @TODO: not found...
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