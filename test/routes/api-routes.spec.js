const chaiHttp = require('chai-http');
const chai = require ('chai');
const request = require('request');
const jwt = require('../../src/auth/jsonwebtoken');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);
let chaiReq;

let result = jwt.getToken({username: 'any'})

describe('Protected API Routes', () => {
  describe('PATCH /apply-json-patch', () => {
    beforeEach( done => {
      chaiReq = chai.request(server)
      .patch('/api/apply-json-patch')
      .set('Content-type', 'application/json')
      .set('Authorization', jwt.getToken({username: 'any'}));

      done();
    })
    it('should return a 200 response with added field for add op', done => {
      let doc = {
        simpleField: "value",
      }
      let patches = [
        {op: "add", path: "/anotherField", value: "addedValue"},
      ]
      let requestDoc = {doc, patches};
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(200);
          // check type
          res.body.should.be.a('object');
          // check success flag
          res.body.should.have.property('success');
          res.body.success.should.be.eql(true);
          // check patchedDoc field
          res.body.should.have.property('patchedDoc');
          res.body.patchedDoc.should.have.property('anotherField');
          res.body.patchedDoc.anotherField.should.be.eql('addedValue');
          done();
        });
    });
    it('should return a 200 response with replaced field for replace op', done => {
      let doc = {
        simpleField: "value",
      }
      let patches = [
        {op: "replace", path: "/simpleField", value: "replacedValue"},
      ]
      let requestDoc = {doc, patches};
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(200);
          // check type
          res.body.should.be.a('object');
          // check success flag
          res.body.should.have.property('success');
          res.body.success.should.be.eql(true);
          // check patchedDoc field
          res.body.should.have.property('patchedDoc');
          res.body.patchedDoc.should.have.property('simpleField');
          res.body.patchedDoc.simpleField.should.be.eql('replacedValue');
          done();
        });
    });
    it('should return a 200 response and remove field for remove op', done => {
      let doc = {
        simpleField: "value",
      }
      let patches = [
        {op: "remove", path: "/simpleField"},
      ]
      let requestDoc = {doc, patches };
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(200);
          // check type
          res.body.should.be.a('object');
          // check success flag
          res.body.should.have.property('success');
          res.body.success.should.be.eql(true);
          // check patchedDoc field
          res.body.should.have.property('patchedDoc');
          res.body.patchedDoc.should.not.have.property('simpleField');
          done();
        });
    });
    it('should return a 400 response for missing fields in request', done => {
      let doc = {
        simpleField: "value",
      }
      let requestDoc = {doc};
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(400);
          // check type
          res.body.should.be.a('object');
          // check success flag
          res.body.should.have.property('success');
          res.body.success.should.be.eql(false);
          // check patchedDoc field
          res.body.should.have.property('message');
          done();
        });
    });
    it('should return a 400 response for invalid patch request', done => {
      let doc = {
        simpleField: "value",
      }
      let patches = [
        {op: "unknown", path: "/simpleField"},
      ]
      let requestDoc = {doc, patches};
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(400);
          // check type
          res.body.should.be.a('object');
          // check success flag
          res.body.should.have.property('success');
          res.body.success.should.be.eql(false);
          // check patchedDoc field
          res.body.should.have.property('message');
          done();
        });
    });
    it('should return a 401 response for missing auth header', done => {
      let doc = {
        simpleField: "value",
      }
      let patches = [
        {op: "unknown", path: "/simpleField"},
      ]
      let requestDoc = {doc, patches};
      chai
        .request(server)
        .patch('/api/apply-json-patch')
        .set('Content-type', 'application/json')
        .send(requestDoc)
        .end((err, res) => {
          // check status
          res.should.have.status(401);
          done();
        });
    });

  });

  describe('POST /create-thumbnail', () => {
    beforeEach( done => {
      chaiReq = chai.request(server)
      .post('/api/create-thumbnail')
      .set('Content-type', 'application/json')
      .set('Authorization', jwt.getToken({username: 'any'}));

      done();
    })
    it('should return a 200 response with content-type image/*', done => {
      let requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpg',
        filename: 'testImage',
      }
      chaiReq
        .send(requestDoc)
        .end( (err, res) => {
          res.should.have.status(200);
          res.should.have.header('Content-type', '/^image/.*')
          done();
        })
    })
    it('should return a response of 400 when image URI is missing', done => {
      let requestDoc = {
        filename: 'image'
      }
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.eql(false);
          res.body.should.have.property('message');
          done();
        });
    });

    it('should return a response of 400 when filename is missing', done => {
      let requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpg',
      }
      chaiReq
        .send(requestDoc)
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
