export function validateIdea(value) {
  if (typeof value !== "string") return { valid: false, error: "Idea must be text." };
  const idea = value.trim();
  if (idea.length < 12) return { valid: false, error: "Describe the idea in at least 12 characters." };
  if (idea.length > 2000) return { valid: false, error: "Keep the idea under 2,000 characters." };
  return { valid: true, value: idea };
}
