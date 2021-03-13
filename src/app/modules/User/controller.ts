import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { AppError } from '../../exceptions/apperror'
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

        return response.status(200).send({
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

        return response.status(200).send({
            success: true,
            message: 'OK',
            data: user
        });
    }

    public static async create(request: Request, response: Response) {

        const { name, email, password } = request.body;
        const user = await models.User.create({
            name, email, password
        });

        return response.status(201).send({
            success: true,
            message: 'User created successfully',
            data: user
        });
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
    
            return response.status(200).send({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (e) {
            response.status(500).json({
                success: false,
                message: 'error'
            });
        }
        
    }
}