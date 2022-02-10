function highlight(table) {
  const  trEl = table.querySelectorAll("tbody>tr");
  for (let i = 0; i < trEl.length; i++) {
    const statusColumn = trEl[i].cells[3];
    const  genderColumn = trEl[i].cells[2];
    const ageColumn = trEl[i].cells[1];

    if (statusColumn.dataset.available === "true") {
      trEl[i].classList.add("available");
    }else if (statusColumn.dataset.available === "false") {
      trEl[i].classList.add("unavailable");
    }else if (statusColumn.hasAttribute("data-available") === false) {
      trEl[i].setAttribute("hidden", "");
    }
    
    if (genderColumn.innerHTML === "m") {
      trEl[i].classList.add("male");
    }else if (genderColumn.innerHTML === "f") {
      trEl[i].classList.add("female");
    }

     if (+ageColumn.innerHTML < 18) {
      trEl[i].style.textDecoration = "line-through";
    }
  }
}
