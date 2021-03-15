import BTBaseError from './BTBaseError';

export class BTInvalidRouteParameterError extends BTBaseError { 
    constructor(public message: string) { 
        super();
    }
}