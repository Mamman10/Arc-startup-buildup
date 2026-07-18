# API

## `POST /api/projects`

Request:

```json
{ "idea": "A platform that helps local shops manage inventory" }
```

Returns `201` with a project and its analysis. Ideas must contain 12–2000 non-whitespace characters.

## `GET /api/projects`

Returns session projects, most recent first.
