const BookModel = require("../models/book.model");
const getBooks = async (req, res) => {
  try {
    let viewBook = await BookModel.find().populate("creator", "userName");
    return res.status(200).json({ message: viewBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  const { title, author } = req.body;
  const { userId } = req.user;

  try {
    const newBook = new BookModel({
      title,
      author,
      creator: userId,
    });
    await newBook.save();
    return res
      .status(201)
      .send({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  console.log(bookId, "lkj");

  try {
    const { userId, roles } = req.user;

    let book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (roles !== "CREATOR" ) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient Permissions" });
    }

    book = await BookModel.findByIdAndDelete({ _id: bookId },
      { new: true });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBooks, createBook, deleteBook };
