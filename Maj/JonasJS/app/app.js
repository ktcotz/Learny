// Pig game
var firstPlayerScore = document.querySelector("#score--0");
var secondPlayerScore = document.querySelector("#score--1");
var dice = document.querySelector(".dice");
var rollButton = document.querySelector(".btn--roll");
var newButton = document.querySelector(".btn--new");
var holdButton = document.querySelector(".btn--hold");
if (firstPlayerScore) {
    firstPlayerScore.textContent = String(0);
}
if (secondPlayerScore) {
    secondPlayerScore.textContent = String(0);
}
dice === null || dice === void 0 ? void 0 : dice.classList.add("hidden");
var rollDice = function () {
    var diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice === null || dice === void 0 ? void 0 : dice.setAttribute("src", "./img/dice-".concat(diceNumber, ".png"));
    dice === null || dice === void 0 ? void 0 : dice.classList.remove("hidden");
};
rollButton === null || rollButton === void 0 ? void 0 : rollButton.addEventListener("click", rollDice);
