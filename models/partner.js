const mongoose = require("mongoose");

const { uploadImg } = require("../utils/imgur");
const Image = require("./image");

const PartnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  imageId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname:{
    type: String,
  },
  name:{
    type: String,
  },
  MBTI:{
    type: String,
  },
  job:{
    type: String,
  },
  personality:{
    type: String,
  },
});

PartnerSchema.pre("save", async function (next) {
  try {
    const image = await Image.findById(this.imageId);
    // if imgURL is not existing
    if (!image.imgURL) {
      image.imgURL = await uploadImg(image.imgBase64);
      await image.save();
    }
    next();
  } catch (err) {
    console.log(err);
  }
});

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;
