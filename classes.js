const searchInput = document.getElementById("classSearch");
const favoritesFilter = document.getElementById("favoritesFilter");
const resultText = document.getElementById("classResult");
const classCards = Array.from(document.querySelectorAll(".class-card"));
const favoriteClasses = [];

classCards.forEach(card => {
    const className = card.querySelector("h2").textContent.trim();
    const favoriteButton = document.createElement("button");

    favoriteButton.type = "button";
    favoriteButton.className = "favorite-btn";
    favoriteButton.textContent = "Favorite";
    favoriteButton.setAttribute("aria-pressed", "false");
    card.querySelector(".class-info").append(favoriteButton);

    favoriteButton.addEventListener("click", () => {
        const index = favoriteClasses.indexOf(className);

        if (index === -1) {
            favoriteClasses.push(className);
        } else {
            favoriteClasses.splice(index, 1);
        }
        const isFavorite = favoriteClasses.includes(className);
        favoriteButton.classList.toggle("active", isFavorite);
        favoriteButton.textContent = isFavorite? "Favorited": "Favorite";
        favoriteButton.setAttribute("aria-pressed", String(isFavorite));

        updateClasses();
    });
});

function updateClasses() {
    const searchText = searchInput.value.trim().toLowerCase();
    const favoritesOnly = favoritesFilter.classList.contains("active");
    let visibleCount = 0;

    classCards.forEach(card => {
        const className = card.querySelector("h2").textContent.trim();
        const matchesSearch = className.toLowerCase().includes(searchText);
        const matchesFavorites = !favoritesOnly || favoriteClasses.includes(className);
        const shouldShow = matchesSearch && matchesFavorites && matchesAdvancedFilters(card);
        card.style.display = shouldShow ? "" : "none";
        if (shouldShow) {visibleCount++;}
    });
    sortClassCards();
    resultText.textContent = visibleCount + (visibleCount === 1 ? " class found" : " classes found");
}

searchInput.addEventListener("input", updateClasses);
favoritesFilter.addEventListener("click", () => {
    favoritesFilter.classList.toggle("active");
    const active = favoritesFilter.classList.contains("active");
    favoritesFilter.textContent = active ? "Show all classes" : "Favorites only";
    favoritesFilter.setAttribute("aria-pressed", String(active));
    updateClasses();
});
updateClasses();