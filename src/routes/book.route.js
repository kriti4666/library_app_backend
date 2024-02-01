const express = require("express");
const { authorize } = require("../middleware/authMiddleware");
const { getBooks, createBook, deleteBook } = require("../Controllers/book.controller");

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Create a new book
router.post("/create", authorize("CREATOR"), createBook);

// Delete a book
router.delete('/delete/:bookId', authorize('CREATOR'), deleteBook);


module.exports = router;
