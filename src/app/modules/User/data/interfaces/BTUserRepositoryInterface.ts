import UserInterface from "./BTUserInterface";

export default interface BTUserRepositoryInterface {
    findWithFilter(searchFor: string | undefined, fields?: Array<String>): Promise<UserInterface[]>;
    findAll(fields: Array<String>): Promise<UserInterface[]>;
    findById(id: number, fields?: Array<String>): Promise<UserInterface | null>;
    create(data: UserInterface): Promise<UserInterface>;
    update(set: any, filters?: any);
}
