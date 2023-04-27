process.env.NODE_ENV === "development";

require("dotenv").config();

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

const usersForRegister = [
{
    data:{
      username: "test_1",
      email: "test_1@example.com",
      password: "test_1",
    },
    expectedStatus: 201,
    expectedMessage: "User created"
},
{
    data:{
      username: "test_1",
      email: "test_2@example.com",
      password: "test_1",
    },
    expectedStatus: 409,
    expectedMessage: "User already exists"

},
];

describe("POST /user/register", () => {
  for (let user of usersForRegister) {
    it("should return the expected response if user is created successfully or failed",  async() => {
        const res = await request(app)
        .post("/user/register")
        .send(user.data);
        expect(res.status).to.equal(user.expectedStatus);
        expect(res.body.message).to.equal(user.expectedMessage);
    });
  }
})

const usersForLogin = [
{
    data:{
      username: "wrongTestUser",
      password: "testpassword",
    },
    expectedStatus: 409,
    expectedMessage: "User not found"
},
{
    data:{
      username: "testUser",
      password: "wrongtestpassword",
    },
    expectedStatus: 409,
    expectedMessage: "Password incorrect"

},
];

describe("POST /user/login", () => {

  for (let user of usersForLogin) {
    it("should return the expected response if login failed",  async() => {
        const res = await request(app)
        .post("/user/login")
        .send(user.data);
        expect(res.status).to.equal(user.expectedStatus);
        expect(res.body.message).to.equal(user.expectedMessage);
    });
  }

  it('should return 200 and JWT on successful login', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ username: testUser.username, password: testUser.password });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('authorization');
  });

});

