// creating a get request router to avoid cors issue with open library access
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:topic", async (req, res) => {
  const { topic } = req.params;
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${topic}.json?limit=5`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch data from Open Library", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
