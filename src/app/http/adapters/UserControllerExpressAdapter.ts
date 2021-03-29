import BTBaseObject from "../../BTBaseObject";
import IUserController from "../interfaces/IUserController";
import BTCreateUserHttpRequest from "../requests/BTCreateUserHttpRequest";

export class UserControllerExpressAdapter extends BTBaseObject {

    constructor(public controller: IUserController) {
        super();
    }

    public async getAll(req, res, next) {
        try {
            const output = await this.controller.getAll(req);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.payload;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async find(req, res, next) {
        try {
            const output = await this.controller.find(req);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.payload;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async create(req, res, next) {
        try {
            const request = new BTCreateUserHttpRequest(req);
            const output = await this.controller.create(request);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.payload;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async update(req, res, next) {
        try {
            const output = await this.controller.update(req);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.payload;
            return next();
        } catch (err) {
            return next(err);
        }
    }
}