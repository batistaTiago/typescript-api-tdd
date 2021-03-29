import BTBaseError from './BTBaseError';

export class BTForbiddenError extends BTBaseError { 
    constructor(public message: string) { 
        super();
        Error.captureStackTrace(this, BTForbiddenError);
    }
}