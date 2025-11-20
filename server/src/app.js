import express from "express";
import cors from "cors";
import reviewRoute from "./routes/review.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));

app.use(express.json({ limit: "1mb" }));
app.use("/api", reviewRoute);

app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
