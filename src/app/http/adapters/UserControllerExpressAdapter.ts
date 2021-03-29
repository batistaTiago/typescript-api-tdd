import BTBaseObject from "../../BTBaseObject";
import IUserController from "../interfaces/IUserController";
import BTCreateUserHttpRequest from "../requests/BTCreateUserHttpRequest";
import { BTFindResourceHttpRequest } from "../requests/BTFindResourceHttpRequest";
import BTFindUserHttpRequest from "../requests/BTFindUserHttpRequest";

export class UserControllerExpressAdapter extends BTBaseObject {

    constructor(public controller: IUserController) {
        super();
    }

    public async getAll(req, res, next) {
        try {
            const output = await this.controller.getAll(req);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.body;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async find(req, res, next) {
        try {
            const output = await this.controller.find(new BTFindUserHttpRequest(req));
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.body;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async create(req, res, next) {
        try {
            const output = await this.controller.create(new BTCreateUserHttpRequest(req));
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.body;
            return next();
        } catch (err) {
            return next(err);
        }
    }

    public async update(req, res, next) {
        try {
            const output = await this.controller.update(req);
            res.locals.http_status = output.statusCode;
            res.locals.json_data = output.body;
            return next();
        } catch (err) {
            return next(err);
        }
    }
}