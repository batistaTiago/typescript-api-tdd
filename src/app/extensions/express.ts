import { Response } from 'express';

interface IBTResponse {
    setJsonData(data: object): void
    setHttpStatusCode(code: number): void
}


export class BTResponse extends Response {
    
    private locals: any;

    setJsonData(data: object): void {
        this.locals.json_data = data;
    }
    setHttpStatusCode(code: number): void {
        this.locals.http_code = code;
    }
}

