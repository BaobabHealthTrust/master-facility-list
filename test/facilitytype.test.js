'use strict';

const should = require('chai').should();
const server = require('../server/server');
const request = require('supertest')(server);

// describe('User', () => {
//     describe('POST /FalicityTypes', () => {
//         it('should create a new facility type', () => {
//             return request
//                 .post('/api/users')
//                 .set('Accept', 'application/json')
//                 .expect(401)
//                 .then(response => {
//                     console.log(response.status);
//                 })
//                 .catch(err => console.error(err));
//         });
//     });
// });
