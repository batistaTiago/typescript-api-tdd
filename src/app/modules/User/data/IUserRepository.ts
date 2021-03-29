import IUser from "./IUser";

export default interface IUserRepository {
    queryBuilder();
    findWithFilter(searchFor: string | undefined, fields?: Array<String>): Promise<IUser[]>;
    findAll(fields: Array<String>): Promise<IUser[]>;
    findById(id: number, fields?: Array<String>): Promise<IUser | null>;
    create(data: IUser): Promise<IUser>;
    update(set: any, filters?: any);
}
