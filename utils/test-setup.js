process.env.NODE_ENV === "development";
require("dotenv").config();

const request = require("supertest");
const app = require("../app");
var mongoose = require("mongoose");
const User = require("../models/user");
const Image = require("../models/image");

const testUser = {
  username: "testUser",
  password: "testpassword",
  email: "testUser@example.com"
};


global.jwtTokenForTest;

before(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URL);
  // register a new user
  await User.findOneAndDelete({ username: testUser.username });
  await User.create(testUser);
  testImage = new Image({
        imgBase64: "1111",
        glasses: true,
        breast: "large breast",
        hairColor: "red",
        hair: "straight",
        origin: "Japanese",
      });
  await testImage.save();

  // log in with the user"s credentials to get a JWT token
  const credentials_response = await request(app)
    .post("/user/login")
    .send({ username: testUser.username, password: testUser.password });
  jwtTokenForTest = credentials_response.body.authorization


});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
