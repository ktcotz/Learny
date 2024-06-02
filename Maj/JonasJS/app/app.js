/*
 ********** Guessing game
 */
var handleGuessingGame = function () {
    var messageElement = document.querySelector(".message");
    var guessInput = document.querySelector(".guess");
    var checkButton = document.querySelector(".check");
    var setMessage = function (message) {
        if (!messageElement)
            return;
        messageElement.textContent = message;
    };
    var getGuessInputValue = function () {
        if (!guessInput) {
            throw new Error("Can't resolve a guess input!");
        }
        var value = guessInput.value;
        if (!value) {
            throw new Error("No input 🛑");
        }
        return value;
    };
    var guessNumber = function () {
        try {
            var guessingNumber = getGuessInputValue();
            console.log(guessingNumber);
        }
        catch (err) {
            if (err instanceof Error) {
                setMessage(err.message);
            }
        }
    };
    checkButton === null || checkButton === void 0 ? void 0 : checkButton.addEventListener("click", function () {
        guessNumber();
    });
};
handleGuessingGame();
