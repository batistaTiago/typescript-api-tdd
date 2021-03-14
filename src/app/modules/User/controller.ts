import { Request, Response } from 'express';
import { Op } from 'sequelize';
import * as HTTPStatus from 'http-status';
const models = require('../../models');

export class UserController {

    public static async getAll(request: Request, response: Response) {

        let filters = {};

        if (request.query.search_query) {
            filters = {
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${request.query.search_query}%`
                        },
                        email: {
                            [Op.like]: `%${request.query.search_query}%`
                        },
                    }
                }
            };
        }

        const users = await models.User.findAll(filters);

        return response.status(HTTPStatus.OK).send({
            success: true,
            message: 'OK',
            count: users.length,
            data: users,
        });
    }

    public static async find(request: Request, response: Response) {
        const user = await models.User.findOne({
            where: {
                id: request.params.id
            }
        });

        return response.status(HTTPStatus.OK).send({
            success: !!user,
            message: 'OK',
            data: user
        });
    }

    public static async create(request: Request, response: Response) {
        if (!request.body.name) {
            /* @TODO: should throw validation error, which should send the json below */
            return response.status(HTTPStatus.NOT_ACCEPTABLE).send({
                success: false,
                message: 'Error',
                details: {
                    name: [
                        'The field name is required'
                    ]
                }
            });
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

    public static async update(request: Request, response: Response) {

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