export default interface IBTHttpResponse {
    statusCode: number;
    payload: {
        success: boolean;
        data?: object;
        count?: number;
        message?: string;
    }
}