const sections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const pos = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (pos < screenHeight - 100) {
      section.classList.add("show");
    }
  });
});

window.addEventListener("load", () => {
  sections.forEach(section => {
    section.classList.add("show");
  });
});
