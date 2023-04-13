require("dotenv").config();
const Partner = require("../models/partner");

// get img from ../img/
const fs = require("fs");
const path = require("path");
const imgPath = path.join(__dirname, "../public/images/");

const createPartner = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const imgBase64 = fs
      .readFileSync(imgPath + "test_img.png", {
        encoding: "base64",
      })
      .toString();
    const newPartner = new Partner({
      name,
      imgBase64,
      userId,
    });
    await newPartner.save();
    res.status(201).json({ message: "Partner created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPartner };
