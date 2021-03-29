export default interface IHttpRouter {
    get(path: string, callback: CallableFunction);
    post(path: string, callback: CallableFunction);
    patch(path: string, callback: CallableFunction);
    delete(path: string, callback: CallableFunction);
}