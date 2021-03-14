import { Knex } from "knex";
import DB from "./DB";

export default class Repository {
    static queryBuilder(table: string) {
        if (table) {
            return DB.getqueryBuilder()(table);
        }
        return DB.getqueryBuilder();
    }

}