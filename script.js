// Fade-in Animation on Scroll
const sections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const position = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      section.classList.add("show");
    }
  });
});

// Show first section immediately
window.addEventListener("load", () => {
  sections.forEach(section => {
    section.classList.add("show");
  });
});
