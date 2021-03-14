import AppBaseError from './AppBaseError';
import IValidationErrorData from "./interfaces/IValidationErrorData";

export class AppValidationError extends AppBaseError {

    constructor(public errorData: IValidationErrorData) { 
        super();
    }
}