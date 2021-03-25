import BTBaseError from './BTBaseError';
import IValidationErrorData from "./interfaces/IValidationErrorData";

export class BTValidationError extends BTBaseError {

    constructor(public errorData: IValidationErrorData | IValidationErrorData[]) { 
        super();
        Error.captureStackTrace(this, BTValidationError);
    }
}