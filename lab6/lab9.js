let tasks = [
  {
    name: "Створити макет сайту",
    description: "Розробити HTML-структуру та базові стилі.",
    startDate: "2025-10-01",
    duration: 3,
  },
  {
    name: "Підключити JavaScript",
    description: "Додати скрипти для динаміки сторінки.",
    startDate: "2025-10-03", // сьогодні → буде "у процесі"
    duration: 4,
  },
  {
    name: "Оптимізація сайту",
    description: "Покращити швидкодію, адаптивність і кросбраузерність.",
    startDate: "2025-10-10",
    duration: 2,
  },
];

// обчислення різниці у днях
function diffDays(a, b) {
  const day = 24 * 60 * 60 * 1000;
  return Math.round((b - a) / day);
}

// головна функція
function renderTasks() {
  const today = new Date();
  let done = "", active = "", future = "";

  tasks.forEach(task => {
    const start = new Date(task.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + task.duration);

    const daysFromStart = diffDays(start, today);
    const daysToStart = diffDays(today, start);
    const daysToEnd = diffDays(today, end);

    if (today > end) {
      done += createCard(task, `✅ Виконано`, "done");
    } 
    else if (today >= start && today <= end) {
      const progress = Math.min(100, Math.round((daysFromStart / task.duration) * 100));
      active += createCard(task, `🔄 У процесі — ${daysToEnd} дн. до завершення`, "active", progress);
    } 
    else {
      future += createCard(task, `⏳ Почнеться через ${daysToStart} дн.`, "future");
    }
  });

  document.getElementById("rezult").innerHTML = `
    <div class="group">
      <h3>✅ Виконані</h3>${done || "<p class='empty'>Немає виконаних задач.</p>"}
    </div>
    <div class="group">
      <h3>🔄 У процесі</h3>${active || "<p class='empty'>Немає активних задач.</p>"}
    </div>
    <div class="group">
      <h3>⏳ Майбутні</h3>${future || "<p class='empty'>Немає запланованих задач.</p>"}
    </div>
  `;
}

// створення картки задачі
function createCard(task, status, cls, progress = null) {
  return `
    <div class="card ${cls}">
      <h4>${task.name}</h4>
      <p class="desc">${task.description}</p>
      <p><b>Початок:</b> ${new Date(task.startDate).toLocaleDateString()}</p>
      <p><b>Тривалість:</b> ${task.duration} днів</p>
      ${
        progress !== null
          ? `<div class="progress-wrapper">
              <div class="progress" style="--progress:${progress}%">
                <div class="bar"></div>
              </div>
              <span class="percent">${progress}%</span>
            </div>`
          : ""
      }
      <p class="status">${status}</p>
    </div>
  `;
}

// форма для додавання нових задач
document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  const start = document.getElementById("taskStart").value;
  const duration = parseInt(document.getElementById("taskDuration").value);

  if (!name || !desc || !start || !duration) return alert("Заповніть усі поля!");

  tasks.push({ name, description: desc, startDate: start, duration });
  e.target.reset();
  renderTasks();
});

renderTasks();
