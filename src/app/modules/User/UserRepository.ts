import Repository from "../../persistency/Repository";
import IUser from "./interfaces/IUser";

export default class UserRepository extends Repository {

    public static table: string = 'Users';

    constructor() { 
        super();
    }

    public static queryBuilder()
    {
        return Repository.queryBuilder(this.table);
    }

    public static async findWithFilter(searchFor: string | undefined, fields: Array<String> = ['*']): Promise<IUser[]> {
        const output = UserRepository.queryBuilder();

        if (searchFor) {
            output.where('name', 'like', `%${searchFor}%`)
                .orWhere('email', 'like', `%${searchFor}%`).select('*');
        }

        return await output.select(fields);
    }

    public static async findAll(fields: Array<String> = ['*']): Promise<IUser[]> {
        return await UserRepository.queryBuilder().select(fields);
    }

    public static async findById(id: number, fields: Array<String> = ['*']): Promise<IUser | null> {
        const users = await UserRepository.queryBuilder().where('id', id).select(fields);
        if (users.length) {
            return users[0];
        }

        return null;
    }
}