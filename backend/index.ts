import { serve } from "@hono/node-server";
import { Hono } from "hono";
import path from "path";
import fs from "node:fs";
import mime from "mime-types";

const app = new Hono();
const port = 3000;
const dist = path.join(process.cwd(), "dist");
const etag = 'W/"12345-67890"';

// Утилита: задержка
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Утилита: безопасный путь
const safePath = (base: string, target: string) =>
  path.resolve(base, path.normalize("." + target));

// Middleware: отдача ассетов
app.get("/assets/*", async (c) => {
  const assetPath = c.req.path.replace("/assets", ""); // "/main.js"
  const fullPath = safePath(dist, assetPath);

  if (!fs.existsSync(fullPath)) {
    return c.text("Asset not found", 404);
  }

  const ifNoneMatch = c.req.header("If-None-Match");

  // ETag check
  if (ifNoneMatch === etag) {
    return c.body("", 304);
  }

  const content = fs.readFileSync(fullPath);
  const contentType = mime.lookup(fullPath) || "application/octet-stream";

  c.header("Content-Type", contentType);
  c.header("Cache-Control", "max-age=0, must-revalidate");
  c.header("ETag", etag);

  return c.body(content);
});

// Роут для index.html
app.get("/", async (c) => {
  const indexPath = path.join(dist, "index.html");

  if (!fs.existsSync(indexPath)) {
    return c.text("index.html not found", 404);
  }

  const html = fs.readFileSync(indexPath).toString();

  // await sleep(500); // Uncomment for testing latency
  return c.html(html);
});

console.log(`🚀 Server running at http://localhost:${port}`);
serve({ fetch: app.fetch, port });
