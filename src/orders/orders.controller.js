import Order from "./orders.model.js";
import mongoose from "mongoose";

// post request
export const postAnOrder = async (req, res, next) => {
  try {
    // Ensure req.body has the necessary fields and productIds is an array of valid ObjectId
    const { name, email, address, phone, productIds, totalPrice } = req.body;

    // Validate required fields before creating the order
    if (!name || !email || !address || !phone || !productIds || !totalPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create a new order
    const newOrder = new Order({
      name,
      email,
      address,
      phone,
      productIds,
      totalPrice,
    });

    // Save the new order to the database
    await newOrder.save();

    // Return a successful response with the created order data
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in creating order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get user's order by email
export const getOrderByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this email" });
    }
    res.status(200).json({
      success: true,
      message: "Order  retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error in fetching order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
