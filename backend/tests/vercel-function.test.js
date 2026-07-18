import test from "node:test";
import assert from "node:assert/strict";
import projects from "../../api/projects.js";

test("Vercel project function accepts a startup idea", async () => {
  const request = new Request("https://example.test/api/projects", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idea: "A planning tool for independent retailers" })
  });
  const response = await projects.fetch(request);
  const payload = await response.json();
  assert.equal(response.status, 201);
  assert.equal(payload.analysis.roadmap.length, 4);
});

test("Vercel project function rejects unsupported methods", async () => {
  const response = await projects.fetch(new Request("https://example.test/api/projects", { method: "DELETE" }));
  assert.equal(response.status, 405);
});
