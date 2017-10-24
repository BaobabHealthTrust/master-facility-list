'use strict';

const should = require('chai').should();
const server = require('../server/server');
const request = require('supertest')(server);

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            [1, 2, 3].indexOf(4).should.equal(-1);
        });
    });
});

describe('User', () => {
    describe('GET /users', () => {
        it('should return a 401 with a get request to /users', () => {
            return request
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(401)
                .then(response => {
                    console.log(response.status);
                })
                .catch(err => console.error(err));
        });
    });
});
