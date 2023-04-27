process.env.NODE_ENV === "development";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
require('../scripts/test-setup');

const testUser = {
  username: 'testUser',
  password: 'testpassword',
  email: 'testUser@example.com'
};

describe('GET /chat/imageURL', () => {

  it('should return 404 if partner not found', async () => {

    const response = await request(app)
      .get('/chat/imageURL')
      .set("authorization", jwtTokenForTest)
      .expect(404);

    expect(response.body.message).to.equal('Partner not found');

  });

  it('should return the partner imgURL', async () => {

    const credentials_response = await request(app)
    .post("/partner/create")
    .send({"name": testUser.username})
    .set("authorization", jwtTokenForTest);

    const res = await request(app)
      .post('/partner/generateImage')
      .send({
        "origin": "Japanese",
        "hair": "straight"
      })
      .set("authorization", jwtTokenForTest)


    const response = await request(app)
      .get('/chat/imageURL')
      .set("authorization", jwtTokenForTest)
      .expect(200);

  });
});


describe('POST /chat/replyMessage', () => {
  it('should return the script and config', async () => {
    const response = await request(app)
      .post('/chat/replyMessage')
      .set("authorization", jwtTokenForTest)
      .send({ message: "fakeMessage" })
      .expect(200);

    expect(response.body).to.have.property('script');
    expect(response.body).to.have.property('config');
    expect(response.body.script.type).to.be.a('string');
    expect(response.body.script.input).to.be.a('string');
    expect(response.body.script).to.have.property('ssml').to.be.true;
    expect(response.body.script.provider).to.be.a('object');

  });

});

