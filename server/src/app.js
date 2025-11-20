import express from "express";
import cors from "cors";
import reviewRoute from "./routes/review.route.js";

const app = express();

// dev CORS; change for production
app.use(cors({ origin: "http://localhost:5173" })); 

app.use(express.json({ limit: "1mb" }));
app.use("/api", reviewRoute);

app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
