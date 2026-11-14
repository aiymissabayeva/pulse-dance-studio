const trainingSelect = document.getElementById("trainingSelect");
const trainingForm = document.getElementById("trainingForm");
const trainingList = document.getElementById("trainingList");
const plannerMessage = document.getElementById("plannerMessage");
const saveTrainingBtn = document.getElementById("saveTrainingBtn");
const scheduleEntries = [];

document.querySelectorAll(".schedule-card").forEach(card => {
    const level = card.dataset.level;
    card.querySelectorAll("tbody tr").forEach(row => {
        const cells = row.querySelectorAll("td");

        scheduleEntries.push({
            className: cells[0].textContent.trim(),
            level: level,
            days: cells[1].textContent.trim(),
            time: cells[2].textContent.trim()
        });
    });
});

let trainingPlan = JSON.parse(localStorage.getItem("trainingPlan")) || [];
let editingId = null;

scheduleEntries.forEach((entry, index) => {
    const option = document.createElement("option");

    option.value = index;
    option.textContent =`${entry.className} | ${entry.level} | ${entry.days} | ${entry.time}`;
    trainingSelect.append(option);
});

function renderTrainingPlan() {
    trainingList.innerHTML = "";

    if (trainingPlan.length === 0) {
        trainingList.textContent = "Your training plan is empty.";
        return;
    }

    trainingPlan.forEach(training => {
        const item = document.createElement("div");
        item.className = "training-item";

        const title = document.createElement("h3");
        title.textContent = training.className;

        const details = document.createElement("p");
        details.textContent =
            `${training.level} | ${training.days} | ${training.time}`;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.className = "book-btn";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "book-btn";

        editButton.addEventListener("click", () => {
            editingId = training.id;
            trainingSelect.value = training.scheduleId;
            saveTrainingBtn.textContent = "Update class";
            plannerMessage.textContent = "You are editing this class.";
        });

        deleteButton.addEventListener("click", () => {
            trainingPlan = trainingPlan.filter(
                item => item.id !== training.id
            );

            localStorage.setItem(
                "trainingPlan",
                JSON.stringify(trainingPlan)
            );

            if (editingId === training.id) {
                editingId = null;
                trainingForm.reset();
                saveTrainingBtn.textContent = "Add to my plan";
            }

            plannerMessage.textContent = "Class deleted.";
            renderTrainingPlan();
        });

        item.append(title, details, editButton, deleteButton);
        trainingList.append(item);
    });
}

trainingForm.addEventListener("submit", event => {
    event.preventDefault();
    const selectedIndex = trainingSelect.value;

    if (selectedIndex === "") {
        plannerMessage.textContent = "Please choose a class.";
        return;
    }

    const scheduleId = Number(selectedIndex);
    const selectedClass = scheduleEntries[scheduleId];
    const duplicate = trainingPlan.some(training => training.scheduleId === scheduleId && training.id !== editingId);

    if (duplicate) {
        plannerMessage.textContent = "This class is already in your training plan.";
        return;
    }

    if (editingId !== null) {
        const training = trainingPlan.find(item => item.id === editingId);

        training.scheduleId = scheduleId;
        training.className = selectedClass.className;
        training.level = selectedClass.level;
        training.days = selectedClass.days;
        training.time = selectedClass.time;
        plannerMessage.textContent = "Class updated.";
    } else {
        const newTraining = {
            id: Date.now(),
            scheduleId: scheduleId,
            className: selectedClass.className,
            level: selectedClass.level,
            days: selectedClass.days,
            time: selectedClass.time
        };

        trainingPlan.push(newTraining);
        plannerMessage.textContent = "Class added to your plan.";
    }

    localStorage.setItem("trainingPlan",JSON.stringify(trainingPlan));

    editingId = null;
    trainingForm.reset();
    saveTrainingBtn.textContent = "Add to my plan";
    renderTrainingPlan();
});
renderTrainingPlan();