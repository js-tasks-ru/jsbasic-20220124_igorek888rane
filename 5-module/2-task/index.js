function toggleText() {
  const btn = document.querySelector(".toggle-text-button");
  const toggleText = document.querySelector("#text");
  btn.addEventListener("click", () => {
    if (toggleText.hasAttribute("hidden")) {
      toggleText.hidden = false;
    } else {
      toggleText.hidden = true;
    }
  });
}
