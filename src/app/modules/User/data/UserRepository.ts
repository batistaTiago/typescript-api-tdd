import Repository from "../../../framework/persistency/Repository";
import UserInterface from "./interfaces/BTUserInterface";
import BTUserRepositoryInterface from "./interfaces/BTUserRepositoryInterface";
const models = require('../../../models');



export default class UserRepository extends Repository implements BTUserRepositoryInterface {

    public table: string = 'Users';
    public model = models.User; /* @TODO: nao pode depender do FW diretamente */

    public async findWithFilter(searchFor: string | undefined, fields: Array<String> = ['*']): Promise<UserInterface[]> {
        const output = this.queryBuilder();

        if (searchFor) {
            output.where('name', 'like', `%${searchFor}%`)
                .orWhere('email', 'like', `%${searchFor}%`).select('*');
        }

        return await output.select(fields);
    }

    public async findAll(fields: Array<String> = ['*']): Promise<UserInterface[]> {
        return await this.queryBuilder().select(fields);
    }

    public async findById(id: number, fields: Array<String> = ['*']): Promise<UserInterface | null> {
        const users = await this.queryBuilder().where('id', id).select(fields);
        if (users.length) {
            return users[0];
        }

        return null;
    }

    public async create(data: UserInterface) {
        return await this.model.create(data) as UserInterface;
    }

    public async update(set, filters) {
        return await this.model.update(set, filters);
    }
}