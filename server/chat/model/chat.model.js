const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chat = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // content: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },

  massage: {
    type: String,
  },

  stateId: {
    type: Number,
    enum: [0, 1, 2, 3], // 0- new , 1-active, 2-inactive 3- deleted
    default: 0,
  },

  typeId: {
    type: Number,
    enum: [0, 1, 2], // 0- pending , 1-delivered, 2-seen
    default: 0,
  },
});
module.exports = mongoose.model("chat", chat);
