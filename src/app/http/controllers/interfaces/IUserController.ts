import IHttpRequest from "../../requests/interfaces/IBTHttpRequest";
import IHttpResponse from "../../requests/interfaces/IBTHttpResponse";

export default interface IUserController {
    getAll(request: IHttpRequest): Promise<IHttpResponse>;
    find(request: IHttpRequest): Promise<IHttpResponse>;
    create(request: IHttpRequest): Promise<IHttpResponse>;
    update(request: IHttpRequest): Promise<IHttpResponse>;
}