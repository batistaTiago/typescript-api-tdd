import BTHttpRequest from "../../requests/BTHttpRequest";
import IHttpResponse from "../../requests/interfaces/IBTHttpResponse";

export default interface IUserController {
    getAll(request: BTHttpRequest): Promise<IHttpResponse>;
    find(request: BTHttpRequest): Promise<IHttpResponse>;
    create(request: BTHttpRequest): Promise<IHttpResponse>;
    update(request: BTHttpRequest): Promise<IHttpResponse>;
}