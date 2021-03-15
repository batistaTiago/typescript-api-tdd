import * as HTTPStatus from 'http-status';

class AppGenericErrorHandler {
    public static handle(err, req, res, next) {
        // return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        //     success: false,
        //     message: 'Internal server error, please contact the support team.',
        //     details: null,
        // });
        throw err;
    }
}

module.exports = AppGenericErrorHandler.handle;