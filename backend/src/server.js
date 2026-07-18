import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createProjectFromIdea, getProjects } from "./controllers/project-controller.js";

const root = join(fileURLToPath(new URL("../..", import.meta.url)), "frontend");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8" };
function sendJson(response, status, body) { response.writeHead(status, { "content-type": "application/json" }); response.end(JSON.stringify(body)); }
async function bodyOf(request) { let data = ""; for await (const chunk of request) data += chunk; return data ? JSON.parse(data) : {}; }

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/api/projects") { const result = getProjects(); return sendJson(response, result.status, result.body); }
    if (request.method === "POST" && request.url === "/api/projects") { const result = createProjectFromIdea(await bodyOf(request)); return sendJson(response, result.status, result.body); }
    const pathname = new URL(request.url, "http://localhost").pathname;
    const requested = pathname === "/" ? "/app/index.html" : pathname;
    if (!requested.startsWith("/app/") && !requested.startsWith("/styles/")) return sendJson(response, 404, { error: "Not found" });
    const file = join(root, requested);
    const content = await readFile(file);
    response.writeHead(200, { "content-type": mime[extname(file)] || "text/plain" }); response.end(content);
  } catch (error) {
    if (error instanceof SyntaxError) return sendJson(response, 400, { error: "Invalid JSON body." });
    sendJson(response, 500, { error: "Unexpected server error." });
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log(`AI Startup Builder running at http://localhost:${port}`));
