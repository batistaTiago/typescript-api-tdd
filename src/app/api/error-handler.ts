import { Request, Response, RequestHandler, ErrorRequestHandler, NextFunction } from 'express';

export function errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log(`Error handler foi executado...`);
    console.log(err);

    res.status(500).json({
        success: false,
        errorCode: 'ERR-001',
        meesage: 'Internal server error, please contact the support team.'
    });
}