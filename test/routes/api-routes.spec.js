const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('request');
const jwt = require('../../src/auth/jsonwebtoken');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);
let chaiReq;

const result = jwt.getToken({ username: 'any' });

describe('Protected API Routes', () => {
  describe('PATCH /apply-json-patch', () => {
    beforeEach((done) => {
      chaiReq = chai.request(server)
        .patch('/api/apply-json-patch')
        .set('Content-type', 'application/json')
        .set('Authorization', jwt.getToken({ username: 'any' }));

      done();
    });
    it('should return a 200 response with added field for add op', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const patches = [
        { op: 'add', path: '/anotherField', value: 'addedValue' },
      ];
      const requestDoc = { doc, patches };
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
    it('should return a 200 response with replaced field for replace op', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const patches = [
        { op: 'replace', path: '/simpleField', value: 'replacedValue' },
      ];
      const requestDoc = { doc, patches };
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
    it('should return a 200 response and remove field for remove op', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const patches = [
        { op: 'remove', path: '/simpleField' },
      ];
      const requestDoc = { doc, patches };
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
    it('should return a 400 response for missing fields in request', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const requestDoc = { doc };
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
    it('should return a 400 response for invalid patch request', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const patches = [
        { op: 'unknown', path: '/simpleField' },
      ];
      const requestDoc = { doc, patches };
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
    it('should return a 401 response for missing auth header', (done) => {
      const doc = {
        simpleField: 'value',
      };
      const patches = [
        { op: 'unknown', path: '/simpleField' },
      ];
      const requestDoc = { doc, patches };
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
    beforeEach((done) => {
      chaiReq = chai.request(server)
        .post('/api/create-thumbnail')
        .set('Content-type', 'application/json')
        .set('Authorization', jwt.getToken({ username: 'any' }));

      done();
    });
    it('should return a 200 response with content-type image/jpg for jpg image', (done) => {
      const requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpg',
        filename: 'testImage',
      };
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('Content-type', 'image/jpg');
          done();
        });
    });
    it('should return a 200 response with content-type image/jpeg for jpeg image', (done) => {
      const requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpeg',
        filename: 'testImage',
      };
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('Content-type', 'image/jpeg');
          done();
        });
    });
    it('should return a response of 400 when image URI is missing', (done) => {
      const requestDoc = {
        filename: 'image',
      };
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

    it('should return a response of 400 when filename is missing', (done) => {
      const requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpg',
      };
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

    it('should return a response of 400 when the filename has "." character', (done) => {
      const requestDoc = {
        imageUri: 'https://placehold.it/100x100.jpg',
        filename: 'test.jpg'
      };
      
      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.equal(false);
          done();
        })
    })

    it('should return a response of 400 when the image uri is incorrect', (done) => {
      const requestDoc = {
        imageUri: 'https://placehold.it/100x100',
        filename: 'testing'
      }

      chaiReq
        .send(requestDoc)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.equal(false);
          done();
        })
    })
  });
});
