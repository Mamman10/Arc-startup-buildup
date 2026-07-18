# Architecture

The MVP uses a dependency-free Node.js HTTP server and a static browser client. The browser calls `POST /api/projects` with an idea. The controller validates input, delegates analysis to the service, stores the result in an in-memory repository, and returns JSON.

```
Browser → controller → validator → analysis service → repository → JSON response
```

The service boundary allows an approved server-side AI provider to replace the deterministic generator without changing routes or UI.
