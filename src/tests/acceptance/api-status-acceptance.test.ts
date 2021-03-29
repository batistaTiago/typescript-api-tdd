import { app, request, expect } from './config/helpers';

describe('API Status', () => {
    it('Should return json with success equals true and default message', (done) => {
        request(app).get('/')
            .end((err: any, res: any) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.be.eql('Web service is working');
                done(err);
            });
    });
});