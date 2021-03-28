export default class BTBaseController {
    public constructor() {
        for (let prop in this) {
            if (typeof(this[prop]) == 'function') {
                this[prop] = (this[prop] as any).bind(this);
            }
        }
    }
}