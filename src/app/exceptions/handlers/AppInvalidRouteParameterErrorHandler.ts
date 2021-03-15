import * as HTTPStatus from 'http-status';
import { AppInvalidRouteParameterError } from "../AppInvalidRouteParameterError";

class AppInvalidRouteParameterErrorHandler {
    public static handle(err: AppInvalidRouteParameterError, req, res, next) {
            if (err.getType() == 'AppInvalidRouteParameterError') {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                success: false,
                message: err.message,
            });
        }
        next(err);
    }
}

module.exports = AppInvalidRouteParameterErrorHandler.handle;