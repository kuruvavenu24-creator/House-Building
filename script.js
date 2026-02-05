const items = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  items.forEach(i => {
    if (i.getBoundingClientRect().top < window.innerHeight - 100) {
      i.classList.add("show");
    }
  });
});