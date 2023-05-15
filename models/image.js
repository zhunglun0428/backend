const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  imgBase64: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
  videoId: {
    type: String,
  },
  videoURL: {
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

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
