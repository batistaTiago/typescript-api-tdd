export default class AppBaseError {
    public getType(): string {
        return this.constructor.name;
    }
}