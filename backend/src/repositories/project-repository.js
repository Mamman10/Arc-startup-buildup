const projects = [];

export function createProject({ idea, analysis }) {
  const project = { id: crypto.randomUUID(), idea, analysis, createdAt: new Date().toISOString() };
  projects.unshift(project);
  return project;
}

export function listProjects() { return [...projects]; }
