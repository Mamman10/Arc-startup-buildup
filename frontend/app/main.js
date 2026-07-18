const idea = document.querySelector("#idea");
const submit = document.querySelector("#submit");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const projects = document.querySelector("#projects");

function escapeHtml(value) { const element = document.createElement("span"); element.textContent = value; return element.innerHTML; }
function list(items) { return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`; }
function renderBrief(project) {
  const a = project.analysis;
  result.classList.remove("hidden");
  result.innerHTML = `<div class="result-top"><p class="eyebrow">GENERATED BRIEF</p><h2>${escapeHtml(a.title)}</h2><p>${escapeHtml(a.summary)}</p></div><div class="grid"><article><h3>Positioning</h3><p>${escapeHtml(a.positioning)}</p></article><article><h3>Primary customer</h3><p>${escapeHtml(a.customer)}</p></article><article><h3>Revenue hypothesis</h3><p>${escapeHtml(a.revenueHypothesis)}</p></article><article><h3>Validation experiments</h3>${list(a.experiments)}</article></div><div class="swot"><h3>SWOT snapshot</h3>${Object.entries(a.swot).map(([key, values]) => `<div><h4>${key}</h4>${list(values)}</div>`).join("")}</div><article class="roadmap"><h3>Suggested product sequence</h3><ol>${a.roadmap.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`;
}
function renderHistory(items) {
  projects.innerHTML = items.length ? items.map((project) => `<button class="project" data-id="${project.id}"><span>${escapeHtml(project.analysis.title)}</span><small>${new Date(project.createdAt).toLocaleString()}</small></button>`).join("") : '<p class="empty">Your generated briefs will appear here.</p>';
  projects.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => renderBrief(items.find((item) => item.id === button.dataset.id))));
}
async function loadProjects() { const response = await fetch("/api/projects"); renderHistory(await response.json()); }
submit.addEventListener("click", async () => {
  status.textContent = "Creating your launch brief…"; submit.disabled = true;
  try {
    const response = await fetch("/api/projects", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idea: idea.value }) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error);
    renderBrief(payload); await loadProjects(); status.textContent = "Brief created.";
  } catch (error) { status.textContent = error.message || "Could not create a brief."; }
  finally { submit.disabled = false; }
});
loadProjects().catch(() => { status.textContent = "Could not load session projects."; });
