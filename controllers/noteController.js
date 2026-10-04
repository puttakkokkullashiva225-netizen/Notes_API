const Note = require("../models/Notes");

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { notename, title, content } = req.body;

    const newNote = new Note({
      notename,
      title,
      content,
      userId: req.user.userID,
    });

    await newNote.save();

    res.redirect("/notes");
  } catch (error) {
    res.status(500).send("Error creating note");
  }
};

// GET ALL NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.userID,
    });

    res.render("Notes", { notes });
  } catch (error) {
    res.status(500).send("Error fetching notes");
  }
};

// GET ONE NOTE
const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userID,
    });

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.send(note);
  } catch (error) {
    res.status(500).send("Error fetching note");
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const { notename, title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userID,
      },
      {
        notename,
        title,
        content,
      },
      {
        new: true,
      },
    );

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.send(note);
  } catch (error) {
    res.status(500).send("Error updating note");
  }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userID,
    });

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.send("Note deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting note");
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
