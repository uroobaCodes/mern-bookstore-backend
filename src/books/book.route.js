import express from "express";
import {
  createBook,
  getAllBooks,
  getWeeklyBook,
  getSingleBook,
  updateBook,
  deleteBook,
} from "./book.controller.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

// define our router
const router = express.Router();

// create get request
router.get("/", getAllBooks);

// create get request for single book
router.get("/weekly-book", getWeeklyBook);

// create get request for single book
router.get("/:id", getSingleBook);

// create post request
router.post("/create-book", verifyAdminToken, createBook);

// create update request
router.put("/edit/:id", verifyAdminToken, updateBook);

// create delete request
router.delete("/:id", verifyAdminToken, deleteBook);

// export the router
export default router;
