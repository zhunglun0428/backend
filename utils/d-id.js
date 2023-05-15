require("dotenv").config();
const fetch = require("node-fetch");
// if (process.env.NODE_ENV === "development") {
//   const fetch = require("node-fetch");
// }
// for test
const getCredit = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${process.env.DID_API_KEY}}`,
    },
  };
  const res = await fetch(`${process.env.DID_URL}/credits`, options);
  if (!res.ok) {
    console.log(res);
  }
  const data = await res.json();
  console.log(data);
};

getCredit();

const createIdleVideo = async (imgURL) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${process.env.DID_API_KEY}`,
    },
    body: JSON.stringify({
      script: {
        type: "text",
        ssml: true,
        input: '<break time="15000ms"/>',
      },
      source_url: imgURL,
    }),
  };
  const res = await fetch(`${process.env.DID_URL}/talks`, options);
  if (!res.ok) {
    throw new Error("Failed to create idle video");
  }
  const data = await res.json();
  const videoId = data.id;
  return videoId;
};

const getIdleVideoURL = async (videoId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${process.env.DID_API_KEY}`,
    },
  };

  const res = await fetch(`${process.env.DID_URL}/talks/${videoId}`, options);
  if (!res.ok) {
    throw new Error("Failed to get idle video URL");
  }
  const data = await res.json();
  const videoURL = data.result_url;
  return videoURL;
};

module.exports = { createIdleVideo, getIdleVideoURL };
