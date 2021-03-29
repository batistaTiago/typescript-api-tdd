import BTHttpRequest from "../../../../framework/http/requests/BTHttpRequest";
import BTHttpResponseInterface from "../../../../framework/http/requests/interfaces/BTHttpResponseInterface";

export default interface BTUserControllerInterface {
    getAll(request: BTHttpRequest): Promise<BTHttpResponseInterface>;
    find(request: BTHttpRequest): Promise<BTHttpResponseInterface>;
    create(request: BTHttpRequest): Promise<BTHttpResponseInterface>;
    update(request: BTHttpRequest): Promise<BTHttpResponseInterface>;
}