require("dotenv").config();

// for test
const getCredit = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Basic ZW1obGJubDFiR2wxTURneU5VQm5iV0ZwYkM1amIyMDpnSVFVdDQtQ2VsS193T0wzNGZ5R0M=",
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
        provider: { type: "microsoft", voice_id: "zh-TW-HsiaoChenNeural" },
        ssml: true,
        input: '<break time="15000ms"/>',
      },
      config: {
        stitch: true,
        result_format: "mp4",
      },
      source_url: imgURL,
      webhook: "https://webhook.site/5e6cedeb-08a6-4e50-b753-805dfd6209d7",
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
