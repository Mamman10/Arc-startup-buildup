import test from "node:test";
import assert from "node:assert/strict";
import { validateIdea } from "../src/validators/idea-validator.js";

test("accepts and trims a sufficiently descriptive idea", () => {
  assert.deepEqual(validateIdea("  A tool for independent shops  "), { valid: true, value: "A tool for independent shops" });
});

test("rejects a short idea", () => {
  assert.equal(validateIdea("too short").valid, false);
});
