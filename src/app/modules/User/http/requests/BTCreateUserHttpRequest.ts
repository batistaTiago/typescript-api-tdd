import { BTValidationError } from "../../../../framework/exceptions/BTValidationError";
import IValidationErrorData from "../../../../framework/exceptions/interfaces/BTValidationErrorDataInterface";
import BTHttpRequest from "../../../../framework/http/requests/BTHttpRequest";

export default class BTCreateUserHttpRequest extends BTHttpRequest {
    public validate() {

        const nameError: IValidationErrorData = {
            field: 'name',
            messages: []
        }

        let field = 'name';
        if (!this.body.name) {
            nameError.messages.push('The name field is required');
        }

        field = 'email';
        const emailError: IValidationErrorData = {
            field,
            messages: []
        }
        if ((!this.body.email)) {
            emailError.messages.push('The email field is required');
        } else if (!this.body.email.isValidEmail()) {
            emailError.messages.push('The email field is invalid, please use "user@provider.ext" format.');
        }

        field = 'password';
        const passwordError: IValidationErrorData = {
            field,
            messages: []
        }
        if ((!this.body.password)) {
            passwordError.messages.push('The password field is required');
        } else if ((this.body.password.length < 6)) {
            passwordError.messages.push('The password field is invalid');
        }

        if ((!this.body.password_confirmation) || (this.body.password != this.body.password_confirmation)) {
            passwordError.messages.push('The password and password confirmation do not match')
        }

        const errors: IValidationErrorData[] = [
            nameError,
            emailError,
            passwordError
        ].filter(error => {
            return error.messages.length > 0;
        });

        if (errors.length) {
            throw new BTValidationError(errors); // throws the error to the handler...
        }

        return {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password,
        };
    }
}