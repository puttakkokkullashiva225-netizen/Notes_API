const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  notename: String,
  title: String,
  content: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
