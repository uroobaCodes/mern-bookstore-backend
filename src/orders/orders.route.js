import express from "express";
import { postAnOrder, getOrderByEmail } from "./orders.controller.js";

const router = express.Router();

// post an order
router.post("/create-order", postAnOrder);

// get an order by user email
router.get("/email/:email", getOrderByEmail);

// export the router
export default router;
