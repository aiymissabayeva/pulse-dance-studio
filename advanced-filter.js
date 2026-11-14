const levelFilter = document.getElementById("levelFilter");
const durationFilter = document.getElementById("durationFilter");
const sortClasses = document.getElementById("sortClasses");

function matchesAdvancedFilters(card) {
    const matchesLevel = levelFilter.value === "all" || card.dataset.level === levelFilter.value;
    const matchesDuration = durationFilter.value === "all" || Number(card.dataset.duration) <= Number(durationFilter.value);
    return matchesLevel && matchesDuration;
}

function sortClassCards(){
    const sortedCards = [...classCards];
    
    sortedCards.sort((a, b) => {
        const nameA = a.querySelector("h2").textContent.trim();
        const nameB = b.querySelector("h2").textContent.trim();

        if (sortClasses.value === "az"){
            return nameA.localeCompare(nameB);
        }

        if (sortClasses.value === "za"){
            return nameB.localeCompare(nameA);
        }

        if (sortClasses.value === "short"){
            return Number(a.dataset.duration) - Number(b.dataset.duration);
        }

        return classCards.indexOf(a) - classCards.indexOf(b);
    });

    const grid = document.querySelector(".classes-grid");
    sortedCards.forEach(card => grid.append(card));
}

document.addEventListener("DOMContentLoaded", function () {
    levelFilter.addEventListener("change", updateClasses);
    durationFilter.addEventListener("change", updateClasses);
    sortClasses.addEventListener("change", updateClasses);
});