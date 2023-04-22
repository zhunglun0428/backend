require("dotenv").config();
const Partner = require("../models/partner");
const Image = require("../models/image");

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

const generatePartnerImage = async (req, res) => {
  const { origin, hair, hairColor, breast, glasses } = req.body;

  try {
    // origin, hair, hairColor, breast, glasses are optional, check if they are undefined
    // if they are undefined, not put into query
    let query = {};
    if (origin) query.origin = origin;
    if (hair) query.hair = hair;
    if (hairColor) query.hairColor = hairColor;
    if (breast) query.breast = breast;
    if (glasses) query.glasses = glasses;

    // random find 4 images in db
    let images = await Image.aggregate([
      { $match: query },
      { $sample: { size: 6 } },
      { $project: { _id: 1, imgBase64: 1 } },
    ]);
    // change _id to imageId
    images = images.map((image) => {
      image.imageId = image._id;
      delete image._id;
      image.imageBase64 = image.imgBase64;
      delete image.imgBase64;
      return image;
    });
    // return 4 image
    res.status(200).json({ images });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPartner, generatePartnerImage };
