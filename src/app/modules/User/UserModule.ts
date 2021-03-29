import UserController from "./http/controllers/UserController";
import UserRoutes from "./http/UserRoutes";
import UserControllerExpressAdapter from '../../framework/http/adapters/UserControllerExpressAdapter';
import { Application } from "express";
import UserRepository from "./data/UserRepository";


export default class UserModule {
    
    constructor(private express: Application) {}

    public init() {
        const userRepo = new UserRepository();
        const controller = new UserController(userRepo);
        const adapter = new UserControllerExpressAdapter(controller);
        UserRoutes.initRoutes(this.express, adapter);
    }
}