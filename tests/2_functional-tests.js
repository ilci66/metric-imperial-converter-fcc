const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("valid input, conver 10L", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end( (err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  test("invalid input, conver 10g", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10g" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });
  test("invalid number, 3/2.4/6kg", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({input: "3/2.4/6kg"})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined)
        done();
      })
  })
  test("invalid number and unit, 3/7.2/4kilomegagram", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({input: "3/7.2/4kilomegagram"})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
      })
  })
  test("convert no number, kg", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({input: "kg"})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      })
  })
})