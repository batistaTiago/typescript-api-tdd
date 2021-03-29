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

    it('Should return json with request data', (done) => {
        request(app).get('/')
            .end((err: any, res: any) => {
                expect(res.status).to.equal(200);


                expect(res.body.request).to.be.an('object');

                expect(res.body.request.url).to.be.a('string');
                expect(res.body.request.method).to.be.a('string');

                expect(res.body.request.headers).to.be.an('object');
                expect(res.body.request.body).to.be.an('object');

                done(err);
            });
    });
});