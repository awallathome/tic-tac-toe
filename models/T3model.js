const mongoose = require("mongoose");
const {Schema} = mongoose;
const ObjectId = Schema.ObjectId;

const T3Schema = new Schema({
  gameId: ObjectId,
  table: {
    type: [String],
    default: ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
  },
  winner: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Game", T3Schema); 