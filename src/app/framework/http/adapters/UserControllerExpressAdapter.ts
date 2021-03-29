import IUserController from "../../../modules/User/http/controllers/IUserController";
import BTCreateUserHttpRequest from "../../../modules/User/http/requests/BTCreateUserHttpRequest";
import BTFindUserHttpRequest from "../../../modules/User/http/requests/BTFindUserHttpRequest";
import BTBaseObject from "../../BTBaseObject";

export default class UserControllerExpressAdapter extends BTBaseObject {

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