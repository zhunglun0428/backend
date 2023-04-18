const mongoose = require("mongoose");

const { uploadImg } = require("../utils/imgur");

const ImageSchema = mongoose.Schema({
  imgBase64: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
  // {Japanese | Korean | Chinese | European}
  origin: {
    type: String,
  },
  // {straight | curly | pigtails}
  hair: {
    type: String,
  },
  // {red | blond | brown | blue | green | pink | white | black | purple}
  hairColor: {
    type: String,
  },
  // {micromastia | large breast}
  breast: {
    type: String,
  },
  // {with glasses | }
  glasses: {
    type: Boolean,
  },
});

ImageSchema.pre("save", async function (next) {
  // only generate imgURL if it is null
  if (this.imgURL) return next();
  // generate imgURL
  this.imgURL = await uploadImg(this.imgBase64);
  next();
  try {
  } catch (err) {
    return next(err);
  }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
