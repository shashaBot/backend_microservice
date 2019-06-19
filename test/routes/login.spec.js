const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('request');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Public API Routes', () => {
  describe('POST /login', () => {
    it('should return a 200 response with token', (done) => {
      const cred = {
        username: 'any',
        password: 'any',
      };
      chai
        .request(server)
        .post('/login')
        .send(cred)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.eql(true);
          done();
        });
    });
    it('should return a 400 response for empty payload', (done) => {
      const cred = {};
      chai
        .request(server)
        .post('/login')
        .send(cred)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.eql(false);
          res.body.should.have.property('message');
          done();
        });
    });
    it('should return a 400 response for missing password field', (done) => {
      const cred = {
        username: 'any',
      };
      chai
        .request(server)
        .post('/login')
        .send(cred)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.eql(false);
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
