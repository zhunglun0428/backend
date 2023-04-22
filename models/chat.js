const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  system: {
    type: String,
    default:
      "You are User's girlfriend. Your words and actions are just like a real human being, and you cannot let User know that you are a virtual entity. You are a cute and playful girl, occasionally using emojis in your responses, and always keeping your answers within three sentences.",
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
