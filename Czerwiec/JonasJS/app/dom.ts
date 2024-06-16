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

// Pig game

enum Players {
  FIRST_PLAYER = "player--0",
  SECOND_PLAYER = "player--1",
}

const config = {
  initialScore: 0,
  minDiceNumber: 1,
  maxDiceNumber: 6,
  numberToLose: 1,
};

const firstPlayerContainer = document.querySelector<HTMLElement>(
  `.${Players.FIRST_PLAYER}`
);

const secondPlayerContainer = document.querySelector<HTMLElement>(
  `.${Players.SECOND_PLAYER}`
);

const dice = document.querySelector<HTMLImageElement>(".dice");
const rollButton = document.querySelector<HTMLButtonElement>(".btn--roll");
const holdButton = document.querySelector<HTMLButtonElement>(".btn--hold");

let activePlayer = Players.FIRST_PLAYER;
let currentScore = config.initialScore;

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const showDice = (diceNumber: number) => {
  dice?.classList.remove("hidden");
  dice?.setAttribute("src", `./img/dice-${diceNumber}.png`);
};

const changePlayer = () => {
  const currentContainer = getActivePlayerContainer();
  const currentScoreElement = currentContainer?.querySelector(".current-score");

  if (!currentScoreElement) return;

  currentScoreElement.textContent = "0";

  activePlayer =
    activePlayer === Players.FIRST_PLAYER
      ? Players.SECOND_PLAYER
      : Players.FIRST_PLAYER;
};

const getActivePlayerContainer = () => {
  return activePlayer === Players.FIRST_PLAYER
    ? firstPlayerContainer
    : secondPlayerContainer;
};

const setActiveUI = () => {
  [firstPlayerContainer, secondPlayerContainer].forEach((container) =>
    container?.classList.remove("player--active")
  );

  getActivePlayerContainer()?.classList.add("player--active");
};

const handleActiveUserScore = () => {
  const currentContainer = getActivePlayerContainer();
  const currentScoreElement = currentContainer?.querySelector(".current-score");

  if (!currentScoreElement) return;

  currentScoreElement.textContent = String(currentScore);
};

const rollDice = () => {
  const randomDiceNumber = getRandomNumber(
    config.minDiceNumber,
    config.maxDiceNumber
  );
  showDice(randomDiceNumber);

  if (randomDiceNumber === config.numberToLose) {
    currentScore = config.initialScore;
    changePlayer();
    return;
  }

  currentScore += randomDiceNumber;

  handleActiveUserScore();

  setActiveUI();
};

rollButton?.addEventListener("click", rollDice);
