import DB from "./DB";
export default abstract class Repository {

    public constructor(
        protected table?: string, 
        protected model?: any
    ) {}

    public queryBuilder() {
        if (this.table) {
            return DB.getqueryBuilder()(this.table);
        }
        return DB.getqueryBuilder();
    }

}