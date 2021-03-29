export default interface BTHttpResponseInterface {
    statusCode: number;
    headers?: any;
    body?: {
        success: boolean;
        data?: object;
        count?: number;
        message?: string;
    }
}