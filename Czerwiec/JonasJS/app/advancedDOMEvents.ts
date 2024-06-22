"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// SMOOTH SCROLLING

const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav__link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (ev) => {
    ev.preventDefault();

    const id = navLink.getAttribute("href");

    if (!id) return;

    const section = document.querySelector(`${id}`);

    section?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
      block: "nearest",
    });
  });
});

// TABBED COMPONENT

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContents = document.querySelectorAll(".operations__content");

const clearActiveTabs = () => {
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
};

tabsContainer?.addEventListener("click", (ev) => {
  if (!(ev.target instanceof HTMLButtonElement)) return;
  clearActiveTabs();

  ev.target.classList.add("operations__tab--active");

  const contentID = Number(ev.target.dataset.tab);

  if (!contentID) return;

  document
    .querySelector(`.operations__content--${contentID}`)
    ?.classList.add("operations__content--active");
});

// STICKY NAV

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

const stickyObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav?.classList.add("sticky");
    } else {
      nav?.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

stickyObserver.observe(header!);

// REAVEAL SECTINOS

// const allSections = document.querySelectorAll(".section");

// const revealSection = (
//   entries: IntersectionObserverEntry[],
//   observer: IntersectionObserver
// ) => {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections?.forEach((section) => {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.setAttribute("src", entry.target.dataset.src);
  entry.target.classList.remove("lazy-img");

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));

// SLIDER

const slides = document.querySelectorAll<HTMLDivElement>(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;

const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer?.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (slide: number) => {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    ?.classList.add("dots__dot--active");
};

const goToSlide = function (slide: number) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

btnRight?.addEventListener("click", nextSlide);
btnLeft?.addEventListener("click", prevSlide);

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") prevSlide();
  if (ev.key === "ArrowRight") nextSlide();
});

dotContainer?.addEventListener("click", (ev) => {
  if (!(ev.target instanceof HTMLButtonElement)) return;

  const slide = Number(ev.target.dataset.slide);

  activateDot(slide);
  goToSlide(slide);
});
