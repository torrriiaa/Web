// ===== Клас Student =====
class Student {
  constructor(name, s) {
    this.name = name;
    this.s = s;
  }

  getScholarship() {
    return 3000 + 1000 * (this.s - 5);
  }
}


class Master extends Student {
  constructor(name, s, speciality) {
    super(name, s);
    this.speciality = speciality;
  }

  getScholarshipWithBonus(m) {
    return this.getScholarship() + m;
  }
}

document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const s = parseFloat(document.getElementById("s").value);
  const speciality = document.getElementById("speciality").value.trim();
  const m = parseFloat(document.getElementById("m").value);

  if (!name || !speciality || isNaN(s) || isNaN(m)) {
    document.getElementById("output").innerHTML = "Введіть усі дані";
    return;
  }

  const master = new Master(name, s, speciality);
  const base = master.getScholarship().toFixed(2);
  const total = master.getScholarshipWithBonus(m).toFixed(2);

  document.getElementById("output").innerHTML = `
    <b>Ім’я студента:</b> ${master.name}<br>
    <b>Спеціальність:</b> ${master.speciality}<br>
    <b>Середній бал:</b> ${master.s}<br>
    <b>Базова стипендія:</b> ${base} грн<br>
    <b>З надбавкою (${m} грн):</b> ${total} грн
  `;
});
