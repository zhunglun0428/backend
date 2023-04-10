const Partner = require("../models/partner");

const getImgURL = async (req, res) => {
  const userId = req.user._id;

  try {
    const partner = await Partner.findOne({ userId: userId });
    if (!partner) {
      res.status(404).json({ message: "Partner not found" });
    } else {
      res.status(200).json({ imgURL: partner.imgURL });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getImgURL };
