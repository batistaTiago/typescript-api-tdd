export default interface IBTHttpRequest {
    body?: any;
    query?: any;
    params?: any;
    
    authorize(): boolean;
    validate(): any;
}