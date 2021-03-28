import Repository from "../../persistency/Repository";
import IUserRepository from "./interfaces/IUserRepository";
import IUser from "./interfaces/IUser";
const models = require('../../models');



export default class UserRepository extends Repository implements IUserRepository {

    public table: string = 'Users';
    public model = models.User;

    constructor() {
        super();
    }

    public queryBuilder() {
        return Repository.queryBuilder(this.table);
    }

    public async findWithFilter(searchFor: string | undefined, fields: Array<String> = ['*']): Promise<IUser[]> {
        const output = this.queryBuilder();

        if (searchFor) {
            output.where('name', 'like', `%${searchFor}%`)
                .orWhere('email', 'like', `%${searchFor}%`).select('*');
        }

        return await output.select(fields);
    }

    public async findAll(fields: Array<String> = ['*']): Promise<IUser[]> {
        return await this.queryBuilder().select(fields);
    }

    public async findById(id: number, fields: Array<String> = ['*']): Promise<IUser | null> {
        const users = await this.queryBuilder().where('id', id).select(fields);
        if (users.length) {
            return users[0];
        }

        return null;
    }

    public async create(data: IUser) {
        return await this.model.create(data) as IUser;
    }

    public async update(set, filters) {
        return await this.model.update(set, filters);
    }
}