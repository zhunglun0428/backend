const { ImgurClient } = require("imgur");

const uploadImg = async (imgBase64) => {
  try {
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
    });
    const image = await client.upload({
      image: imgBase64,
      type: "base64",
    });
    return image.data.link;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadImg };
