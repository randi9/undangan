import express from "express";
import cors from "cors";
import invitationRoutes from "./routes/invitations";
import uploadRoutes from "./routes/upload";
import rsvpRoutes from "./routes/rsvp";

const app = express();
const PORT = process.env.PORT || 3000;

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

// API Routes
app.use("/api/invitations", invitationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/rsvp", rsvpRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Only listen locally, Vercel Serverless will auto-handle requests
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
