import BTBaseObject from "../../BTBaseObject";

export default abstract class BTHttpRequest extends BTBaseObject {
    body?: any;
    query?: any;
    params?: any;

    public constructor(data) {
        super();
        this.body = data.body;
        this.query = data.query;
        this.params = data.params;

        this.authorize();
        this.validate();
    }
    
    protected authorize(): boolean {
        return true;
    }
    
    abstract validate(): any;
}