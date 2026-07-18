import test from "node:test";
import assert from "node:assert/strict";
import { analyzeStartupIdea } from "../src/services/startup-analysis.js";

test("creates a structured, actionable analysis", () => {
  const analysis = analyzeStartupIdea("An AI inventory assistant for local retail shops");
  assert.match(analysis.summary, /independent local businesses/);
  assert.equal(analysis.experiments.length, 3);
  assert.equal(analysis.roadmap[0], "Validate problem");
});

test("identifies AI-assisted ideas without case sensitivity", () => {
  const analysis = analyzeStartupIdea("An AI operating assistant for small agencies");
  assert.match(analysis.positioning, /AI-assisted/);
  assert.match(analysis.customer, /small teams/);
});
