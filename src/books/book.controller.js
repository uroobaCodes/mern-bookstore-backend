import Book from "./books.model.js";
import mongoose from "mongoose";

// get request
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: books,
      message: "Books retrieved from DB",
    });
  } catch (error) {
    console.log(`Error in retrieving books: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get request for single book
export const getSingleBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found!" });
    }

    res.status(200).json({
      success: true,
      data: book,
      message: "Book retrieved from DB",
    });
  } catch (error) {
    console.log(`Error in retrieving book: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get weekly book
export const getWeeklyBook = async (req, res, next) => {
  try {
    const currentDateMinusSeven = new Date();
    currentDateMinusSeven.setDate(currentDateMinusSeven.getDate() - 7);
    // current date has now changed to seven days ago
    const weeklyBook = await Book.find({
      createdAt: { $gte: currentDateMinusSeven },
    })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!weeklyBook) {
      return res.state(404).json({ success: false, message: "No books found" });
    }
    res.status(200).json({
      success: true,
      data: weeklyBook,
      message: "One weekly book retrieved from DB",
    });
  } catch (error) {
    console.log(`Error in retrieving one weekly book: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// post request
export const createBook = async (req, res, next) => {
  const book = req.body;

  if (
    !book.title ||
    !book.description ||
    !book.category ||
    book.trending === undefined ||
    !book.coverImage ||
    book.oldPrice === undefined ||
    book.newPrice === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  //   if nothing is missing, pass the book to our Model and create a new model
  const newBook = new Book(book);

  try {
    await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.error("error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// update Book
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({ success: false, message: "Book not found!" });
    }

    res.status(200).json({
      success: true,
      message: "book update successful",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error in updating book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// delete book
export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({ success: false, message: `Book doesn't exist` });
    }

    res.status(200).json({
      success: true,
      message: `Book deleted`,
      data: deletedBook,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: `Server Error` });
  }
};
