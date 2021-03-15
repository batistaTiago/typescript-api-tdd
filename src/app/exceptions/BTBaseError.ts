export default class BTBaseError {
    public getType(): string {
        return this.constructor.name;
    }
}