"use strict";
///////////////////////////////////////
// Modal window
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var btnCloseModal = document.querySelector(".btn--close-modal");
var btnsOpenModal = document.querySelectorAll(".btn--show-modal");
var openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
var closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
for (var i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
// SMOOTH SCROLLING
var navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (ev) {
        ev.preventDefault();
        var id = navLink.getAttribute("href");
        if (!id)
            return;
        var section = document.querySelector("".concat(id));
        section === null || section === void 0 ? void 0 : section.scrollIntoView({
            behavior: "smooth",
            inline: "end",
            block: "nearest",
        });
    });
});
// TABBED COMPONENT
var tabsContainer = document.querySelector(".operations__tab-container");
var tabs = document.querySelectorAll(".operations__tab");
var tabsContents = document.querySelectorAll(".operations__content");
var clearActiveTabs = function () {
    tabs.forEach(function (tab) { return tab.classList.remove("operations__tab--active"); });
    tabsContents.forEach(function (content) {
        return content.classList.remove("operations__content--active");
    });
};
tabsContainer === null || tabsContainer === void 0 ? void 0 : tabsContainer.addEventListener("click", function (ev) {
    var _a;
    if (!(ev.target instanceof HTMLButtonElement))
        return;
    clearActiveTabs();
    ev.target.classList.add("operations__tab--active");
    var contentID = Number(ev.target.dataset.tab);
    if (!contentID)
        return;
    (_a = document
        .querySelector(".operations__content--".concat(contentID))) === null || _a === void 0 ? void 0 : _a.classList.add("operations__content--active");
});
// STICKY NAV
var header = document.querySelector(".header");
var nav = document.querySelector(".nav");
var stickyObserver = new IntersectionObserver(function (entries) {
    var entry = entries[0];
    if (!entry.isIntersecting) {
        nav === null || nav === void 0 ? void 0 : nav.classList.add("sticky");
    }
    else {
        nav === null || nav === void 0 ? void 0 : nav.classList.remove("sticky");
    }
}, {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
});
stickyObserver.observe(header);
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
var imgTargets = document.querySelectorAll("img[data-src]");
var loadImg = function (entries, observer) {
    var entry = entries[0];
    if (!entry.isIntersecting)
        return;
    entry.target.setAttribute("src", entry.target.dataset.src);
    entry.target.classList.remove("lazy-img");
    observer.unobserve(entry.target);
};
var imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
});
imgTargets.forEach(function (img) { return imgObserver.observe(img); });
// SLIDER
var slides = document.querySelectorAll(".slide");
var btnLeft = document.querySelector(".slider__btn--left");
var btnRight = document.querySelector(".slider__btn--right");
var dotContainer = document.querySelector(".dots");
var curSlide = 0;
var maxSlide = slides.length;
var createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer === null || dotContainer === void 0 ? void 0 : dotContainer.insertAdjacentHTML("beforeend", "<button class=\"dots__dot\" data-slide=\"".concat(i, "\"></button>"));
    });
};
var activateDot = function (slide) {
    var _a;
    document
        .querySelectorAll(".dots__dot")
        .forEach(function (dot) { return dot.classList.remove("dots__dot--active"); });
    (_a = document
        .querySelector(".dots__dot[data-slide=\"".concat(slide, "\"]"))) === null || _a === void 0 ? void 0 : _a.classList.add("dots__dot--active");
};
var goToSlide = function (slide) {
    slides.forEach(function (s, i) { return (s.style.transform = "translateX(".concat(100 * (i - slide), "%)")); });
};
var nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    }
    else {
        curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
};
var prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    }
    else {
        curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
};
var init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
};
init();
btnRight === null || btnRight === void 0 ? void 0 : btnRight.addEventListener("click", nextSlide);
btnLeft === null || btnLeft === void 0 ? void 0 : btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft")
        prevSlide();
    if (ev.key === "ArrowRight")
        nextSlide();
});
dotContainer === null || dotContainer === void 0 ? void 0 : dotContainer.addEventListener("click", function (ev) {
    if (!(ev.target instanceof HTMLButtonElement))
        return;
    var slide = Number(ev.target.dataset.slide);
    activateDot(slide);
    goToSlide(slide);
});
