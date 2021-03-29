import BTBaseError from './BTBaseError';
import IValidationErrorData from "./interfaces/BTValidationErrorDataInterface";

export class BTValidationError extends BTBaseError {

    constructor(public errorData: IValidationErrorData | IValidationErrorData[]) { 
        super();
        Error.captureStackTrace(this, BTValidationError);
    }
}