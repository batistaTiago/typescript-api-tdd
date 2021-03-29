import { BTValidationError } from "../BTValidationError";
import * as HTTPStatus from 'http-status';

class BTValidationErrorHandler {
    public static handle(err: BTValidationError, req, res, next) {

        if (err instanceof BTValidationError) {
            
            const details = BTValidationErrorHandler.extractDetailsFromErrorObject(err);

            return res.status(HTTPStatus.NOT_ACCEPTABLE).json({
                success: false,
                message: 'ERROR: Invalid data',
                details: details,
            });
        }

        /* not my concern */
        next(err);
    }

    private static extractDetailsFromErrorObject(err: BTValidationError) {
        return Array.isArray(err.errorData) ? err.errorData : [err.errorData];
    }
}

module.exports = BTValidationErrorHandler.handle;