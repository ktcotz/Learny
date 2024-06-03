// Pig game

const firstPlayerScore =
  document.querySelector<HTMLParagraphElement>("#score--0");
const secondPlayerScore =
  document.querySelector<HTMLParagraphElement>("#score--1");
const dice = document.querySelector(".dice");
const rollButton = document.querySelector(".btn--roll");
const newButton = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");

if (firstPlayerScore) {
  firstPlayerScore.textContent = String(0);
}

if (secondPlayerScore) {
  secondPlayerScore.textContent = String(0);
}

dice?.classList.add("hidden");

const rollDice = () => {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  dice?.setAttribute("src", `./img/dice-${diceNumber}.png`);
  dice?.classList.remove("hidden");
};

rollButton?.addEventListener("click", rollDice);
