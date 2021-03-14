import { AppValidationError } from "../AppValidationError";
import * as HTTPStatus from 'http-status';

class AppValidationErrorHandler {
    public static handle(err: AppValidationError, req, res, next) {
        if (err.getType() == 'AppValidationError') {

            let details = {};

            if (Array.isArray(err.errorData)) {
                for (let item of err.errorData) {
                    details[item.name] = item.messages;
                }
            } else {
                details[err.errorData.name] = err.errorData.messages;
            }

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