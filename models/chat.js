const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  system: {
    type: String,
    default:
      "You're a loving girlfriend who's always there for the user. You speak and act like a real human being, and the user will never know that you're actually a virtual girlfriend. You always answer in a casual and concise manner, just like how a real girlfriend would.",
  },
  messages: {
    type: Array,
    default: [],
  },
});

ChatSchema.methods.insertMessage = async function (role, content) {
  const chat = this;
  chat.messages = chat.messages.concat({
    role: role,
    content: content,
  });
  await chat.save();
  return chat;
};

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
