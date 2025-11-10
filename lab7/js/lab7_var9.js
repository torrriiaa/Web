const fruitSelect = document.getElementById("fruits");
const priceInput = document.getElementById("price");
const fruitList = document.getElementById("fruitList");

// подія така тобто коли користувач натискає ентер у полі ціни
priceInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    // якщо натиснули Enter
    const fruit = fruitSelect.value; // отримуємо обраний фруктик
    const price = priceInput.value; // читаємо введену ціну

    if (price !== "") {
      // якщо поле не пусте
      const li = document.createElement("li"); // створюємо новий пункт списку
      li.textContent = `${fruit} — ${price} грн`; 
      fruitList.appendChild(li); 
      priceInput.value = ""; 
    }
  }
});

// завдання 2

// функція для обчислення сум додатних і від’ємних чисел
function calculateSums() {
  const table = document.getElementById("numbers"); // знаходимо таблицю
  const rows = table.rows; // всі рядки таблиці
  const rowCount = rows.length; // кількість рядків
  const colCount = rows[0].cells.length; // кількість стовпців
  // створюємо масиви для сум
  const posRow = Array(rowCount).fill(0);
  const negRow = Array(rowCount).fill(0);
  const posCol = Array(colCount).fill(0);
  const negCol = Array(colCount).fill(0);
  // проходимо по всіх клітинках таблиці
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      const value = parseFloat(rows[i].cells[j].textContent); // читаємо число
      if (value >= 0) {
        posRow[i] += value;
        posCol[j] += value;
      } else {
        negRow[i] += value;
        negCol[j] += value;
      }
    }
  }
  let html = "<table><tr><th></th><th>Сума +</th><th>Сума −</th></tr>";
  for (let i = 0; i < rowCount; i++) {
    html += `<tr><td>Рядок ${i + 1}</td><td>${posRow[i]}</td><td>${
      negRow[i]
    }</td></tr>`;
  }
  html += `<tr><td colspan="3"><strong>Стовпці</strong></td></tr>`;
  for (let j = 0; j < colCount; j++) {
    html += `<tr><td>Стовпець ${j + 1}</td><td>${posCol[j]}</td><td>${
      negCol[j]
    }</td></tr>`;
  }
  html += "</table>";
  document.getElementById("resultTable").innerHTML = html;
}
