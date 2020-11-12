const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
chai.use(chaiHttp);
const url = 'http://localhost:8000'

chai.should();

describe('My First API testing', () => {
    it('GET /', (done) => {
        chai.request(url).get('/products').end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object')
            // response.body.should.have.keys('name', 'price')
        })
        done();
    }),
        it('POST /login', (done) => {
            done();
        })
})