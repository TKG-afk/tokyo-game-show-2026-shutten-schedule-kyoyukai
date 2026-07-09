const slides = Array.from(document.querySelectorAll(".slide"));
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const progressEl = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const fullscreenBtn = document.getElementById("fullscreen");

let index = 0;

function showSlide(nextIndex) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  currentEl.textContent = String(index + 1);
  totalEl.textContent = String(slides.length);
  progressEl.style.width = `${((index + 1) / slides.length) * 100}%`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slides.length - 1;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

fullscreenBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "ArrowRight" || key === "PageDown" || key === " ") {
    event.preventDefault();
    nextSlide();
  }
  if (key === "ArrowLeft" || key === "PageUp" || key === "Backspace") {
    event.preventDefault();
    prevSlide();
  }
  if (key === "Home") {
    event.preventDefault();
    showSlide(0);
  }
  if (key === "End") {
    event.preventDefault();
    showSlide(slides.length - 1);
  }
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) {
    dx < 0 ? nextSlide() : prevSlide();
  }
}, { passive: true });

showSlide(0);
