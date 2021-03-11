import { Application, Request, Response } from 'express';

class Routes {
    constructor(app: Application) {
        this.getRoutes(app);
     }

    public getRoutes(app: Application) {
        app.route('/').get((req: Request, res: Response) => {
            return res.json({
                success: true,
                message: 'Web service is working'
            });
        });
    }
}

export default Routes;