const keywords = {
  ai: ["AI", "automation", "intelligence"],
  finance: ["finance", "payment", "budget", "invoice", "money"],
  team: ["team", "agency", "agencies", "company", "business"],
  learning: ["learn", "course", "student", "education"],
  local: ["local", "shop", "retail", "store"]
};

function includesAny(idea, terms) { return terms.some((term) => idea.toLowerCase().includes(term.toLowerCase())); }
function titleFrom(idea) { return idea.split(/\s+/).slice(0, 7).join(" ").replace(/[.?!,]+$/, ""); }

export function analyzeStartupIdea(idea) {
  const title = titleFrom(idea);
  const isAi = includesAny(idea, keywords.ai);
  const customer = includesAny(idea, keywords.local) ? "independent local businesses" : includesAny(idea, keywords.team) ? "small teams and growing businesses" : includesAny(idea, keywords.learning) ? "independent learners and educators" : "early adopters with a repeated workflow problem";
  const revenue = includesAny(idea, keywords.finance) ? "transaction or subscription fees tied to measurable value" : "tiered monthly subscriptions, starting with a focused free trial";
  return {
    title,
    summary: `${title} helps ${customer} solve a specific workflow problem with a focused, measurable product experience.`,
    positioning: isAi ? "An AI-assisted workflow product that keeps humans in control of final decisions." : "A focused workflow product that replaces fragmented manual work.",
    customer,
    revenueHypothesis: revenue,
    swot: {
      strengths: ["Clear first-user outcome", "Narrow MVP can be tested quickly"],
      weaknesses: ["Problem urgency still needs evidence", "Initial insights rely on limited user input"],
      opportunities: ["Interview early adopters", "Expand from the core workflow after retention"],
      threats: ["Established tools can copy shallow features", "Users may resist changing existing habits"]
    },
    experiments: [
      "Interview five target users about their current workaround and willingness to pay.",
      "Publish a concise landing page with one call to action and measure qualified sign-ups.",
      "Prototype the core workflow manually before automating it."
    ],
    roadmap: ["Validate problem", "Build the smallest repeatable workflow", "Measure activation and retention", "Add paid expansion features"]
  };
}
