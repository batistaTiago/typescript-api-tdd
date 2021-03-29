import { BTFindResourceHttpRequest } from "./BTFindResourceHttpRequest";

export default class BTFindUserHttpRequest extends BTFindResourceHttpRequest {
    url(): string {
        throw new Error("Method not implemented.");
    }
}