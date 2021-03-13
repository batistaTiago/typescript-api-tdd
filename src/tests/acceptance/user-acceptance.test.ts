import { app, request, expect } from './config/helpers';

describe('User Management Test', () => {

    'use strict';
    const config = require('../../app/config/env/config');
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
                    expect(res.status).to.equal(200);

                    expect(res.body.data[0].id).to.equal(defaultUser.id);
                    expect(res.body.data[0].name).to.equal(defaultUser.name);

                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).to.equal(2);
                    expect(res.body.count).to.equal(2);

                    done(err);
                });
        });
    });

    describe('GET /api/v1/users with name filter', () => {
        it('Should return json with success equals true and an array of filtered users', (done) => {
            request(app).get('/api/v1/users?search_query=default')
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(200);

                    expect(res.body.data[0].id).to.equal(defaultUser.id);
                    expect(res.body.data[0].name).to.equal(defaultUser.name);

                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).to.equal(1);
                    expect(res.body.count).to.equal(1);

                    done(err);
                });
        });
    });

    describe('GET /api/v1/users/:id', () => {
        it('Should return json with success equals true and the record for that user', (done) => {
            request(app).get(`/api/v1/users/1`)
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).to.be.an('object');

                    expect(res.body.data.id).to.equal(defaultUser.id);
                    expect(res.body.data.name).to.equal(defaultUser.name);

                    done(err);
                });
        });
    });

    describe('POST /api/v1/users/', () => {
        it('Should return json with success equals true and the record for that newly created user', (done) => {

            const newUserData = {
                id: 2,
                name: "new test user",
                email: "newtestuser@acceptancetesting.com",
                password: "novouserpass"
            };

            request(app).post(`/api/v1/users`)
                .send(newUserData)
                .end((err: any, res: any) => {
                    expect(res.status).to.equal(201);

                    expect(res.body.message).to.contain('success');

                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.name).to.equal(newUserData.name);
                    expect(res.body.data.email).to.equal(newUserData.email);
                    done(err);
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
                    expect(res.status).to.equal(200);

                    expect(res.body.message).to.contain('success');

                    expect(res.body.data).to.be.an('object');
                    
                    expect(res.body.data.id).to.equal(1); // cannot update id
                    expect(res.body.data.name).to.be.equal(defaultUser.name);
                    expect(res.body.data.email).to.be.equal(defaultUser.email);
                    done(err);
                });
        });
    });
});