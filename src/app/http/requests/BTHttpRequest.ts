import BTBaseObject from "../../BTBaseObject";
import IBTHttpRequest from "./interfaces/IBTHttpRequest";

abstract class BTHttpRequest extends BTBaseObject implements IBTHttpRequest {
    body?: any;
    query?: any;
    params?: any;
    protocol?: any;
    originalUrl?: any;
    
    abstract authorize(): boolean;
    abstract validate(): any;
    abstract url(): string;
    abstract get?(): any;
}