import { createProjectFromIdea, getProjects } from "../backend/src/controllers/project-controller.js";

const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

/** Vercel Function for the session-only project API. */
export default {
  async fetch(request) {
    if (request.method === "GET") {
      const result = getProjects();
      return Response.json(result.body, { status: result.status, headers: jsonHeaders });
    }

    if (request.method === "POST") {
      try {
        const result = createProjectFromIdea(await request.json());
        return Response.json(result.body, { status: result.status, headers: jsonHeaders });
      } catch (error) {
        if (error instanceof SyntaxError) return Response.json({ error: "Invalid JSON body." }, { status: 400, headers: jsonHeaders });
        return Response.json({ error: "Unexpected server error." }, { status: 500, headers: jsonHeaders });
      }
    }

    return Response.json({ error: "Method not allowed." }, { status: 405, headers: jsonHeaders });
  }
};
