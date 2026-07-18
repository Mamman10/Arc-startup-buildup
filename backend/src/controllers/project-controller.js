import { createProject, listProjects } from "../repositories/project-repository.js";
import { analyzeStartupIdea } from "../services/startup-analysis.js";
import { validateIdea } from "../validators/idea-validator.js";

export function createProjectFromIdea(body) {
  const result = validateIdea(body?.idea);
  if (!result.valid) return { status: 400, body: { error: result.error } };
  const analysis = analyzeStartupIdea(result.value);
  return { status: 201, body: createProject({ idea: result.value, analysis }) };
}

export function getProjects() { return { status: 200, body: listProjects() }; }
