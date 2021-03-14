import { AppValidationError } from "../AppValidationError";
import * as HTTPStatus from 'http-status';

class AppValidationErrorHandler {
    public static handle(err: AppValidationError, req, res, next) {
        if (err.getType() == 'AppValidationError') {

            const details = {};
            
            details[err.errorData.field] = err.errorData.message;

            return res.status(HTTPStatus.NOT_ACCEPTABLE).json({
                success: false,
                message: 'ERROR: Invalid data',
                details: details
            });
        }

        next(err);

    }
}

module.exports = AppValidationErrorHandler.handle;