import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import invitationRoutes from "./routes/invitations";
import uploadRoutes from "./routes/upload";
import rsvpRoutes from "./routes/rsvp";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3000;

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

// Extract base domains from configured origins for subdomain matching
// e.g. "https://mengundanganda.com" -> "mengundanganda.com"
const baseDomains: string[] = [];
for (const o of configuredOrigins) {
  try {
    const url = new URL(o);
    baseDomains.push(url.hostname);
  } catch {
    // skip invalid
  }
}

function isAllowedOrigin(origin: string): boolean {
  // Exact match
  if (allowedOrigins.has(origin)) return true;

  // Subdomain match (e.g. slug.mengundanganda.com)
  try {
    const url = new URL(origin);
    for (const base of baseDomains) {
      if (url.hostname.endsWith(`.${base}`)) return true;
    }
  } catch {
    // invalid origin
  }

  return false;
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

// API Routes
app.use("/api/auth", authRoutes);
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
