import IBTHttpRequest from "../requests/interfaces/IBTHttpRequest";
import IBTHttpResponse from "../requests/interfaces/IBTHttpResponse";

export default interface IUserController {
    getAll(request: IBTHttpRequest): Promise<IBTHttpResponse>;
    find(request: IBTHttpRequest): Promise<IBTHttpResponse>;
    create(request: IBTHttpRequest): Promise<IBTHttpResponse>;
    update(request: IBTHttpRequest): Promise<IBTHttpResponse>;
}