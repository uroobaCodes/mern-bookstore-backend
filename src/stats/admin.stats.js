import mongoose from "mongoose";
import express from "express";
import Book from "../books/books.model.js";
import Order from "../orders/orders.model.js";

// set up express router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      // match stage
      {
        $match: {
          createdAt: {
            $gte: new Date("2025-01-01"),
            $lt: new Date("2025-03-01"),
          },
        },
      },
      //group stage: extract months from the 'createdAt' property and sum total sales
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalMonthlySales: { $sum: "$totalPrice" },
        },
      },
      // sorting stage to show jan first and then feb:
      {
        $sort: { totalMonthlySales: 1 },
      },
    ]);
    // console.log(monthlySales);

    // total sales without months:
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    //   count the total orders:
    const totalOrders = await Order.countDocuments();
    //   log the orders here:
    //   console.log(`total orders: ${totalOrders}`);

    //   count total books here:
    const totalBooks = await Book.countDocuments();

    //   count th trending books:
    const trendingBooks = await Book.aggregate([
      // match the trending object :
      { $match: { trending: true } },
      // return the count of trending books in TrendingBooksCount property
      { $count: "TrendingBooksCount" },
    ]);

    // If you want just the count as a number, you can extract it like this:
    const trendingBooksPlainNumber =
      trendingBooks.length > 0 ? trendingBooks[0].TrendingBooksCount : 0;
    //   console.log(trendingBooksPlainNumber);

    // Result summary
    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      trendingBooksPlainNumber,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.error("Error fetching admin stats", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching admin stats" });
  }
});

export default router;
