import DB from "./DB";
import IRepository from "./interfaces/IRepository";

export default abstract class Repository {

    public constructor(
        protected table: string | null | undefined, 
        protected model: string | null | undefined
    ) {}

    public queryBuilder() {
        if (this.table) {
            return DB.getqueryBuilder()(this.table);
        }
        return DB.getqueryBuilder();
    }

}