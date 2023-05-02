const mongoose = require("mongoose");

const { uploadImg } = require("../utils/imgur");

const PartnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
  imgBase64: {
    type: String,
  },
  videoURL: {
    type: String,
  },
});

PartnerSchema.pre("save", async function (next) {
  // only generate imgURL if it is null
  if (this.imgURL) return next();
  // generate imgURL
  this.imgURL = await uploadImg(this.imgBase64);
  try {
  } catch (err) {
    return next(err);
  }
});

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;
