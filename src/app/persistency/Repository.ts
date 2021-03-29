import DB from "./DB";
import IRepository from "./interfaces/IRepository";

export default class Repository implements IRepository {
    static queryBuilder(table: string) {
        if (table) {
            return DB.getqueryBuilder()(table);
        }
        return DB.getqueryBuilder();
    }

}