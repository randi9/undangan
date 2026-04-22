import { config } from "dotenv";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const envFiles = [
  join(root, "server", ".env"),
  join(root, ".env"),
  join(root, "server", ".env.local"),
  join(root, ".env.local"),
  join(root, ".dev.vars"),
];

for (const file of envFiles) {
  if (existsSync(file)) {
    const result = config({ path: file, override: false });
    console.log(
      `[dotenv] ${file} -> ${result.error ? "ERROR: " + result.error.message : "loaded"}`,
    );
  }
}

console.log("Starting local Cloudflare Pages Functions dev server...");
console.log("  URL: http://127.0.0.1:8788");
console.log("  API: http://127.0.0.1:8788/api");
console.log("  Functions dir: ./functions");

const child = spawn(
  "npx",
  [
    "wrangler",
    "pages",
    "dev",
    ".",
    "--ip",
    "127.0.0.1",
    "--port",
    "8788",
    "--compatibility-date=2026-04-22",
    "--compatibility-flags=nodejs_compat",
  ],
  {
    stdio: "inherit",
    env: process.env,
    cwd: root,
    shell: true,
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
