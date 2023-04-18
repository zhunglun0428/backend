process.env.NODE_ENV === "development";

require("dotenv").config();


const { describe, it } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const User = require('../models/user');
var mongoose = require("mongoose");

const testUser = {
  username: 'testuser',
  password: 'testpassword',
  email: 'testuser@example.com'
};

let testToken;

before(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URL);
  await User.findOneAndDelete({ username: testUser.username });
  await User.create(testUser);

  testToken = jwt.sign(
    {
      username: testUser.username,
      email: testUser.email,
      _id: testUser._id,
    },
    process.env.JWT_SECRET
  );
});

after(async () => {
  await User.findOneAndDelete({ username: testUser.username });
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log("Closed to MongoDB for testing");
});

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
      username: "wrongtestuser",
      password: "testpassword",
    },
    expectedStatus: 409,
    expectedMessage: "User not found"
},
{
    data:{
      username: "testuser",
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
    testToken = res.body.authorization; // store JWT for later use
  });

});