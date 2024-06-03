// Modal!

const showModalButtons =
  document.querySelectorAll<HTMLButtonElement>(".show-modal");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".close-modal");

const openModal = () => {
  modal?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
};

const closeModal = () => {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
};

modalClose?.addEventListener("click", closeModal);
overlay?.addEventListener("click", closeModal);

showModalButtons.forEach((showModalButton) =>
  showModalButton?.addEventListener("click", openModal)
);

document.body.addEventListener("keydown", ({ key }) => {
  if (key === "Escape" && !modal?.classList.contains("hidden")) {
    closeModal();
  }
});
