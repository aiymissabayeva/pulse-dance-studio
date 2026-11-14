const classGrid = document.getElementById("homeClassGrid");
const classCount = document.getElementById("homeClassCount");
function filterClasses(category) {
  return danceClasses.filter(item => item.matchesCategory(category));
}
function renderClasses(items) {
  classGrid.replaceChildren();
  for (const item of items) {
    const column = document.createElement("div");
    column.className = "col-lg-3 col-md-6";
    const card = document.createElement("div");
    card.className = "class-card";
    const link = document.createElement("a");
    link.href = "classes.html";
    const image = document.createElement("img");
    image.src = item.image; image.alt = item.getImageAlt();
    const heading = document.createElement("h3"); heading.textContent = item.name;
    link.append(image, heading); card.append(link); column.append(card); classGrid.append(column);
  }
  classCount.textContent = items.length + " class(es) shown";
}
document.querySelectorAll(".pulse-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pulse-filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderClasses(filterClasses(button.dataset.filter));
  });
});
renderClasses(danceClasses);