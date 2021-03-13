export class AppError extends Error {
    constructor(public statusCode, public message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}