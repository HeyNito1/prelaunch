import "dotenv/config";
import express from "express";
import cors from "cors";
import { initStorage, addSubscriber } from "./storage/subscribers.js";

const { PORT = 5001, FRONTEND_ORIGIN = "http://localhost:5173" } = process.env;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN.split(",").map((o) => o.trim()) }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Called by the website when a visitor submits their email
app.post("/api/subscribe", async (req, res) => {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  try {
    // Saves the email to the Excel file (see storage/subscribers.js)
    const isNew = await addSubscriber(email);

    return res.status(isNew ? 201 : 200).json({
      message: isNew
        ? "You're on the list! We'll notify you at launch."
        : "You're already on the list!",
    });
  } catch (error) {
    // Most common cause: the Excel file is open/locked in Excel (Windows) or the disk is not writable
    console.error("Subscribe error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

// Start the server only after the Excel file is ready
try {
  await initStorage();
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
} catch (error) {
  console.error("Could not prepare the Excel file:", error.message);
  process.exit(1);
}