import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';
import Api from '../../../app/api/api'
const supertest = require('supertest');

/* loads custom methods for native js objects */
const bootstrapExtensions = require('../../../app/extensions');
bootstrapExtensions();


const app = Api;
const request = supertest;
const expect = chai.expect;
const testDouble = td;

export { app, expect, request, testDouble };