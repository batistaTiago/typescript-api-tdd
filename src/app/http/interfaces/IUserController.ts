import BTHttpRequest from "../requests/BTHttpRequest";
import IBTHttpResponse from "../requests/interfaces/IBTHttpResponse";

export default interface IUserController {
    getAll(request: BTHttpRequest): Promise<IBTHttpResponse>;
    find(request: BTHttpRequest): Promise<IBTHttpResponse>;
    create(request: BTHttpRequest): Promise<IBTHttpResponse>;
    update(request: BTHttpRequest): Promise<IBTHttpResponse>;
}