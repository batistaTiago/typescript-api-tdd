import * as HTTPStatus from 'http-status';
import { BTInvalidRouteParameterError } from "../BTInvalidRouteParameterError";

class BTInvalidRouteParameterErrorHandler {
    public static handle(err: BTInvalidRouteParameterError, req, res, next) {
        
        if (err instanceof BTInvalidRouteParameterError) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                success: false,
                message: err.message,
            });
        }

        /* not my concern */
        next(err);
    }
}

module.exports = BTInvalidRouteParameterErrorHandler.handle;