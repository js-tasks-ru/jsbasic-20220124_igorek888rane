function highlight(table) {
  let trEl = table.querySelectorAll("tbody>tr");
  for (let i = 0; i < trEl.length; i++) {
    let statusColumn = trEl[i].cells[3];
    let genderColumn = trEl[i].cells[2];
    let ageColumn = trEl[i].cells[1];
    if (statusColumn.dataset.available === "true") {
      trEl[i].classList.add("available");
    }
    if (statusColumn.dataset.available === "false") {
      trEl[i].classList.add("unavailable");
    }
    if (statusColumn.hasAttribute("data-available") === false) {
      trEl[i].setAttribute("hidden", "");
    }
    if (Number(ageColumn.innerHTML) < 18) {
      trEl[i].style.textDecoration = "line-through";
    }
    if (genderColumn.innerHTML === "m") {
      trEl[i].classList.add("male");
    }
    if (genderColumn.innerHTML === "f") {
      trEl[i].classList.add("female");
    }
  }
}
