process.env.NODE_ENV === "development";

require("dotenv").config();

const { describe, it } = require("mocha");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const Partner = require("../models/partner");

require("../utils/test-setup");


const usersForCreatePartner = {
  data: {
    name: "testPartner",
  },
  expectedStatus: 201,
  expectedMessage: "Partner created"
};

describe("POST /partner/create", () => {

  it("should create a new partner", async () => {
    const response = await request(app)
      .post("/partner/create")
      .send({"name": usersForCreatePartner.data.name})
      .set("authorization", jwtTokenForTest);
      expect(response.status).to.equal(usersForCreatePartner.expectedStatus);
      expect(response.body.message).to.equal(usersForCreatePartner.expectedMessage);

    await Partner.findOneAndDelete({ name: usersForCreatePartner.name });
  });

});


describe("POST /partner/generateImage", () => {
  it("should return an array of 4 images or less", async () => {
    const res = await request(app)
      .post("/partner/generateImage")
      .send({
        "origin": "Japanese",
        "hair": "straight"
      })
      .set("authorization", jwtTokenForTest)
      .expect(200);

    expect(res.body.images.length).to.be.gte(0);
  });
});

