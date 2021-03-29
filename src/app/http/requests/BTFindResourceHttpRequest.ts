import BTBaseObject from "../../BTBaseObject";
import { BTInvalidRouteParameterError } from "../../exceptions/BTInvalidRouteParameterError";
import BTHttpRequest from "./BTHttpRequest";

export abstract class BTFindResourceHttpRequest extends BTHttpRequest {
    body?: any;
    query?: any;
    params?: any;
    protocol?: any;
    originalUrl?: any;
    
    abstract url(): string;
    
    public validate(): any {
        const id = parseInt(this.params.id);

        if (isNaN(id)) {
            throw new BTInvalidRouteParameterError('Route parameter should be an integer.');
        }
    }
}