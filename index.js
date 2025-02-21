import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import bookRoutes from "./src/books/book.route.js";
import orderRoutes from "./src/orders/orders.route.js";
import userRoutes from "./src/users/users.route.js";
import adminRoutes from "./src/stats/admin.stats.js";
import proxy from "./src/openlibraryproxy/proxyGetReqRouter.js";
import cors from "cors";

// create express app
const app = express();

const PORT = process.env.PORT || 5000;

// middleware that allows us to parse the req.body coming from the user
app.use(express.json());
//
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://mern-bookstore-xi.vercel.app",
    ],
    credentials: true,
  })
);

// import router from book.route.js
app.use("/api/books", bookRoutes);
// import router from order.route.js
app.use("/api/orders", orderRoutes);
// import router from users.route.js
app.use("/api/auth", userRoutes);
// import router from admin.stats.js
app.use("/api/auth/admin", adminRoutes);
// open library proxy route
app.use("/api/openlibrary", proxy);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port: ${PORT}`);
});
