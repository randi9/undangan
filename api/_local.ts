// Local dev runner for api/index.ts
// Usage: npx tsx api/_local.ts
import { config } from "dotenv";
import { join } from "path";

// Load env from server/.env using process.cwd()
const envPath = join(process.cwd(), "server", ".env");
const result = config({ path: envPath });

console.log(`[dotenv] Loading from: ${envPath}`);
console.log(`[dotenv] Result: ${result.error ? "ERROR: " + result.error.message : "OK, loaded " + Object.keys(result.parsed || {}).length + " vars"}`);

// Now import app after env is loaded
const { default: app } = await import("./index.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`   Mayar API: ${process.env.MAYAR_API_BASE || "NOT SET"}`);
  console.log(`   Mayar Key: ${process.env.MAYAR_API_KEY ? "✅ Set (" + process.env.MAYAR_API_KEY.substring(0, 20) + "...)" : "❌ NOT SET"}`);
  console.log(`   Supabase:  ${process.env.SUPABASE_URL ? "✅" : "❌"}`);
  console.log(`   Clerk:     ${process.env.CLERK_SECRET_KEY ? "✅" : "❌"}`);
});
