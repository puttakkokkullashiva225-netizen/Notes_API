const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.post("/notes", authMiddleware, createNote);

router.get("/notes", authMiddleware, getNotes);

router.get("/notes/:id", authMiddleware, getNote);

router.patch("/notes/:id", authMiddleware, updateNote);

router.delete("/notes/:id", authMiddleware, deleteNote);

module.exports = router;
