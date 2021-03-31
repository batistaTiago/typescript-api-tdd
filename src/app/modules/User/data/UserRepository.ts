import BTCacheInterface from "../../../framework/persistency/interfaces/BTCacheInterface";
import Repository from "../../../framework/persistency/Repository";
import BTUserInterface from "./interfaces/BTUserInterface";
import BTUserRepositoryInterface from "./interfaces/BTUserRepositoryInterface";
const models = require('../../../models');



export default class UserRepository extends Repository implements BTUserRepositoryInterface {

    public table: string = 'Users';
    public model = models.User; /* @TODO: nao pode depender do FW diretamente */
    public cache: BTCacheInterface = new Cache();

    public constructor(cache) {
        super();
        this.cache = cache;
    }

    public async findWithFilter(searchFor: string | undefined, fields: Array<String> = ['*']): Promise<BTUserInterface[]> {
        const output = this.queryBuilder();

        if (searchFor) {
            output.where('name', 'like', `%${searchFor}%`)
                .orWhere('email', 'like', `%${searchFor}%`).select('*');
        }

        return await output.select(fields);
    }

    public async findAll(fields: Array<String> = ['*']): Promise<BTUserInterface[]> {
        return await this.queryBuilder().select(fields);
    }

    public async findById(id: number, fields: Array<String> = ['*']): Promise<BTUserInterface | null> {
        const users = await this.queryBuilder().where('id', id).select(fields);
        if (users.length) {
            return users[0];
        }

        return null;
    }

    public async create(data: BTUserInterface) {
        return await this.model.create(data) as BTUserInterface;
    }

    public async update(set, filters) {
        return await this.model.update(set, filters);
    }
}