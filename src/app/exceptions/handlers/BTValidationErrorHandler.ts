import { BTValidationError } from "../BTValidationError";
import * as HTTPStatus from 'http-status';

class BTValidationErrorHandler {
    public static handle(err: BTValidationError, req, res, next) {
        if (err.getType() == 'BTValidationError') {

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

module.exports = BTValidationErrorHandler.handle;