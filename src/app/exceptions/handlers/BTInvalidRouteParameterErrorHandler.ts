import * as HTTPStatus from 'http-status';
import { BTInvalidRouteParameterError } from "../BTInvalidRouteParameterError";

class BTInvalidRouteParameterErrorHandler {
    public static handle(err: BTInvalidRouteParameterError, req, res, next) {
            if (err.getType() == 'BTInvalidRouteParameterError') {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                success: false,
                message: err.message,
            });
        }
        next(err);
    }
}

module.exports = BTInvalidRouteParameterErrorHandler.handle;