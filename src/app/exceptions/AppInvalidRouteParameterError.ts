import AppBaseError from './AppBaseError';

export class AppInvalidRouteParameterError extends AppBaseError { 
    constructor(public message: string) { 
        super();
    }
}