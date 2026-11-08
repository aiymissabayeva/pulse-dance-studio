const levelFilter = document.getElementById("levelFilter");
const scheduleCards = document.querySelectorAll(".schedule-card");

function filterSchedule(level) {
    scheduleCards.forEach(card => {
        const cardLevel = card.dataset.level;
        if (level === "all" || cardLevel === level) {
            card.hidden = false;
        } else {
            card.hidden = true;
        }
    });

}

levelFilter.addEventListener("change", function(event) {
    const selectedLevel = event.target.value;
    filterSchedule(selectedLevel);
});