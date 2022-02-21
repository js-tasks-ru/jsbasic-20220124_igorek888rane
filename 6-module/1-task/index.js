/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement("table");
    this.table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
   <thead>
   `;
    this.tbody = document.createElement("tbody");
    this.table.appendChild(this.tbody);

    for (const el of this.rows) {
      this.tbody.insertAdjacentHTML(
        "beforeEnd",
        `<tr>
      <td>${el.name}</td>
      <td>${el.age}</td>
       <td>${el.salary}</td>
      <td>${el.city}</td>
      <td><button>X</button></td>
  </tr>`
      );
    }
    this.table.addEventListener("click", this.onclick);
  }
  get elem() {
    return this.table;
  }
  onclick(event) {
    const btn = event.target.closest("button");
    const trEl = event.target.closest("tr");
    if (btn) {
      trEl.remove();
    }
  }
}
