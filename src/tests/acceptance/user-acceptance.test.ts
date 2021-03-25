import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';

describe('User Management Test', () => {

    'use strict';
    const config = require('../../app/config/env/sequelize.config');
    const models = require('../../app/models');

    let id;

    const testUser = {
        id: 100,
        name: 'test user',
        email: 'testuser@acceptancetesting.com',
        password: 'testpass'
    };

    const defaultUser = {
        id: 1,
        name: 'default user',
        email: 'defaultuser@acceptancetesting.com',
        password: 'defaultuserpass',
    };

    beforeEach(async () => {
        await models.sequelize.sync();
        await models.User.destroy({ where: {} });
        await models.User.create(defaultUser);
        await models.User.create(testUser);
    });

    describe('GET /api/v1/users', () => {
        it('Should return json with success equals true and an array of users', (done) => {
            request(app).get('/api/v1/users')
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.OK);

                    expect(res.body.success).to.equal(true);

                    expect(res.body.data).to.be.an('array');

                    expect(res.body.data.length).to.equal(2);
                    expect(res.body.count).to.equal(2);

                    expect(res.body.data[0].id).to.equal(defaultUser.id);
                    expect(res.body.data[0].name).to.equal(defaultUser.name);

                    done(err);
                });
        });

        it('Should return json with success equals true and an empty array in case there are no users in the database', (done) => {
            models.User.destroy({ where: {} })
                .then(() => {
                    request(app).get('/api/v1/users')
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.OK);

                            expect(res.body.success).to.equal(true);

                            expect(res.body.data).to.be.an('array');

                            expect(res.body.data.length).to.equal(0);
                            expect(res.body.count).to.equal(0);

                            done(err);
                        });
                });
        });
    });

    describe('GET /api/v1/users with name filter', () => {
        it('Should return json with success equals true and an array of filtered users', (done) => {
            request(app).get('/api/v1/users?search_query=default')
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.OK);

                    expect(res.body.success).to.equal(true);

                    expect(res.body.data).to.be.an('array');

                    expect(res.body.data.length).to.equal(1);
                    expect(res.body.count).to.equal(1);

                    expect(res.body.data[0].id).to.equal(defaultUser.id);
                    expect(res.body.data[0].name).to.equal(defaultUser.name);

                    done(err);
                });
        });
        it('Should return json with success equals true and an empty array in case there are no users in the database', (done) => {
            models.User.destroy({ where: {} })
                .then(() => {
                    request(app).get('/api/v1/users?search_query=default')
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.OK);

                            expect(res.body.success).to.equal(true);

                            expect(res.body.data).to.be.an('array');
                            expect(res.body.data.length).to.equal(0);
                            expect(res.body.count).to.equal(0);
                            done(err);
                        });
                });
        });
    });

    describe('GET /api/v1/users/:id', () => {
        it('Should return json with success equals true and the record for that user', (done) => {
            request(app).get(`/api/v1/users/1`)
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.OK);

                    expect(res.body.success).to.equal(true);

                    expect(res.body.data).to.be.an('object');

                    expect(res.body.data.id).to.equal(defaultUser.id);
                    expect(res.body.data.name).to.equal(defaultUser.name);

                    done(err);
                });
        });

        it('Should return json with success equals false and data equals null if the user does not exist', (done) => {
            models.User.destroy({ where: {} })
                .then(() => {
                    request(app).get(`/api/v1/users/1`)
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.OK);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.data).to.be.null;

                            done(err);
                        });
                });
        });

        it('Should return json with success equals false if the id is not an integer', (done) => {
            request(app).get(`/api/v1/users/something_else`)
                .end((err: any, res: any) => {
                    
                    expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);

                    expect(res.body.success).to.equal(false);

                    expect(res.body.message.toLowerCase()).to.contain('integer');

                    done(err);
                });
        });
    });

    describe('POST /api/v1/users/', () => {
        const newUserData = {
            id: 2,
            name: "new test user",
            email: "newtestuser@acceptancetesting.com",
            password: "novouserpass",
            password_confirmation: "novouserpass",
        };

        it('Should return json with success equals true and the record for that newly created user', (done) => {
            request(app).post(`/api/v1/users`)
                .set('content-type', 'application/json')
                .send({ ...newUserData })
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.CREATED);

                    expect(res.body.success).to.equal(true);

                    expect(res.body.message.toLowerCase()).to.contain('success');

                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.name).to.equal(newUserData.name);
                    expect(res.body.data.email).to.equal(newUserData.email);
                    done(err);
                });
        });

        describe('User POST Validation', () => {
            describe('Name field validation', () => {
                it('Is required', (done) => {
                    request(app).post(`/api/v1/users`)
                        .send({ ...newUserData, name: '' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('array');
                            expect(res.body.details.name).to.be.a('string');
                            expect(res.body.details.name.join(';')).to.contain('required');

                            done(err);
                        });
                });
            });
            describe('Email field validation', () => {
                it('Is required', (done) => {
                    request(app).post(`/api/v1/users`)
                        .send({ ...newUserData, email: '' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('object');
                            expect(res.body.details.email).to.be.a('string');
                            expect(res.body.details.email).to.contain('required');

                            done(err);
                        });
                });
                it('Is a valid email address', (done) => {
                    request(app).post(`/api/v1/users`)
                        .set('content-type', 'application/json')
                        .send({ ...newUserData, email: 'an_invalid_email_address' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('object');
                            expect(res.body.details.email).to.be.a('string');
                            expect(res.body.details.email).to.contain('invalid');

                            done(err);
                        });
                });
            });
            describe('Password field validation', () => {
                it('Is required', (done) => {
                    request(app).post(`/api/v1/users`)
                        .send({ ...newUserData, password: '' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('object');
                            expect(res.body.details.password).to.be.a('string');
                            expect(res.body.details.password).to.contain('required');

                            done(err);
                        });
                });
                it('Is at least 6 characters long', (done) => {
                    request(app).post(`/api/v1/users`)
                        .send({ ...newUserData, password: '143' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('object');
                            expect(res.body.details.password).to.be.a('string');
                            expect(res.body.details.password).to.contain('invalid');

                            done(err);
                        });
                });
                it('Needs confirmation', (done) => {
                    request(app).post(`/api/v1/users`)
                        .send({ ...newUserData, password_confirmation: '143' })
                        .end((err: any, res: any) => {
                            expect(res.status).to.equal(HTTPStatus.NOT_ACCEPTABLE);

                            expect(res.body.success).to.equal(false);

                            expect(res.body.message.toLowerCase()).to.contain('error');

                            expect(res.body.details).to.be.an('object');
                            expect(res.body.details.password).to.be.a('string');
                            expect(res.body.details.password).to.contain('do not match');

                            done(err);
                        });
                });
            });
        });
    });

    describe('PATCH /api/v1/users/:id', () => {
        it('Should return json with success equals true and the record for the updated user data', (done) => {

            const updateUserData = {
                ...defaultUser,
                id: 2,
            };

            request(app).patch(`/api/v1/users/1`)
                .send(updateUserData)
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.OK);

                    expect(res.body.success).to.equal(true);

                    expect(res.body.message.toLowerCase()).to.contain('success');

                    expect(res.body.data).to.be.an('object');

                    expect(res.body.data.id).to.equal(1); // cannot update id
                    expect(res.body.data.name).to.be.equal(defaultUser.name);
                    expect(res.body.data.email).to.be.equal(defaultUser.email);
                    done(err);
                });
        });

        it('Should return json with success equals false and an error message if the user is not found', (done) => {

            const updateUserData = {
                ...defaultUser,
                id: 2,
            };

            request(app).patch(`/api/v1/users/105`)
                .send(updateUserData)
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(HTTPStatus.OK);

                    expect(res.body.success).to.equal(false);

                    expect(res.body.message.toLowerCase()).to.contain('not found');

                    done(err);
                });
        });

        describe('User PATCH Validation', () => {
            describe('Name field validation', () => {
                it('Is null or string', (done) => {
                    // throw new Error('To be implemented...');
                    done();
                });
            });
            describe('Email field validation', () => {
                it('Is null or a valid email address', (done) => {
                    // throw new Error('To be implemented...');
                    done();
                });
            });
            describe('Password field validation', () => {
                it('Is null or at least 6 characters long', (done) => {
                    // throw new Error('To be implemented...');
                    done();
                });
            });
        });
    });
});