/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Data
var account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
var account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
var account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
var account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
var accounts = [account1, account2, account3, account4];
// Elements
var labelWelcome = document.querySelector(".welcome");
var labelDate = document.querySelector(".date");
var labelBalance = document.querySelector(".balance__value");
var labelSumIn = document.querySelector(".summary__value--in");
var labelSumOut = document.querySelector(".summary__value--out");
var labelSumInterest = document.querySelector(".summary__value--interest");
var labelTimer = document.querySelector(".timer");
var containerApp = document.querySelector(".app");
var containerMovements = document.querySelector(".movements");
var btnLogin = document.querySelector(".login__btn");
var btnTransfer = document.querySelector(".form__btn--transfer");
var btnLoan = document.querySelector(".form__btn--loan");
var btnClose = document.querySelector(".form__btn--close");
var btnSort = document.querySelector(".btn--sort");
var inputLoginUsername = document.querySelector(".login__input--user");
var inputLoginPin = document.querySelector(".login__input--pin");
var inputTransferTo = document.querySelector(".form__input--to");
var inputTransferAmount = document.querySelector(".form__input--amount");
var inputLoanAmount = document.querySelector(".form__input--loan-amount");
var inputCloseUsername = document.querySelector(".form__input--user");
var inputClosePin = document.querySelector(".form__input--pin");
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
var currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
]);
var movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
var user = undefined;
var global_sort = false;
var clearElement = function (element) {
    if (!element)
        return;
    element.innerHTML = "";
};
var displayMovements = function (user, sort) {
    if (sort === void 0) { sort = global_sort; }
    if (!containerMovements)
        return;
    clearElement(containerMovements);
    var movements = sort
        ? __spreadArray([], user.movements, true).sort(function (a, b) { return (a -= b); })
        : user.movements;
    movements.forEach(function (movement, id) {
        var movementType = movement < 0 ? "withdrawal" : "deposit";
        var movementHTML = /* HTML */ "\n      <div class=\"movements__row\">\n        <div class=\"movements__type movements__type--".concat(movementType, "\">\n          ").concat(id + 1, " ").concat(movementType, "\n        </div>\n        <div class=\"movements__value\">").concat(movement, "\u20AC</div>\n      </div>\n    ");
        containerMovements.insertAdjacentHTML("beforeend", movementHTML);
    });
};
var createUsernames = function (users) {
    users.forEach(function (user) {
        var username = user.owner
            .toLowerCase()
            .split(" ")
            .map(function (name) { return name[0]; })
            .join("");
        user.username = username;
    });
};
var calculateUserBalance = function (user) {
    if (!labelBalance)
        return;
    var balance = reduceNumbers(user.movements);
    user.balance = balance;
    labelBalance.textContent = "".concat(balance, "\u20AC");
};
var calculateDisplaySummary = function (user) {
    if (!labelSumIn || !labelSumOut || !labelSumInterest)
        return;
    var incomes = reduceNumbers(filterNumbers(user.movements, "incomes"));
    var outcomes = reduceNumbers(filterNumbers(user.movements, "outcomes"));
    var interest = reduceNumbers(filterNumbers(user.movements, "incomes")
        .map(function (movement) { return (movement * user.interestRate) / 100; })
        .filter(function (mov) { return mov >= 1; }));
    labelSumIn.textContent = "".concat(incomes, "\u20AC");
    labelSumOut.textContent = "".concat(Math.abs(outcomes), "\u20AC");
    labelSumInterest.textContent = "".concat(interest, "\u20AC");
};
var login = function () {
    if (!inputLoginUsername || !inputLoginPin)
        return;
    var username = inputLoginUsername === null || inputLoginUsername === void 0 ? void 0 : inputLoginUsername.value;
    var pin = Number(inputLoginPin === null || inputLoginPin === void 0 ? void 0 : inputLoginPin.value);
    if (!username || !pin)
        return;
    user = accounts.find(function (account) { return account.username === username && account.pin === pin; });
    if (!user)
        return;
    showScreen();
    updateUI();
    clearInputs([inputLoginUsername, inputLoginPin]);
};
var transferMoney = function () {
    if (!user)
        return;
    if (!inputTransferAmount || !inputTransferTo)
        return;
    var amount = Number(inputTransferAmount.value);
    var receiver = accounts.find(function (account) { return account.username === inputTransferTo.value; });
    if (!receiver || !amount || amount < 0)
        return;
    if (receiver.username === user.username)
        return;
    if (Number(user.balance) < amount)
        return;
    user.movements.push(-amount);
    receiver.movements.push(amount);
    updateUI();
    clearInputs([inputTransferAmount, inputTransferTo]);
};
var closeAccount = function () {
    if (!inputCloseUsername || !inputClosePin)
        return;
    var username = inputCloseUsername.value;
    var pin = Number(inputClosePin.value);
    if (!username || !pin)
        return;
    var closedAccountIdx = accounts.findIndex(function (account) { return account.username === username && account.pin === pin; });
    if (closedAccountIdx === -1)
        return;
    accounts.splice(closedAccountIdx, 1);
    hideScreen();
    clearInputs([inputCloseUsername, inputClosePin]);
};
var loanAmount = function () {
    if (!inputLoanAmount || !user)
        return;
    var amount = Number(inputLoanAmount.value);
    if (amount <= 0)
        return;
    var valid = user.movements.some(function (mov) { return mov >= amount * 0.1; });
    if (!valid)
        return;
    user.movements.push(amount);
    clearInputs([inputLoanAmount]);
    updateUI();
};
var sortMovements = function () {
    if (!user)
        return;
    global_sort = !global_sort;
    displayMovements(user, global_sort);
};
var showScreen = function () {
    if (!containerApp || !user)
        return;
    containerApp.style.opacity = "100";
    if (!labelWelcome)
        return;
    labelWelcome.textContent = "Welcome back, ".concat(user.owner);
};
var hideScreen = function () {
    if (!containerApp)
        return;
    containerApp.style.opacity = "0";
    if (!labelWelcome)
        return;
    labelWelcome.textContent = "Log in to get started";
};
var updateUI = function () {
    if (!user)
        return;
    displayMovements(user);
    calculateUserBalance(user);
    calculateDisplaySummary(user);
};
var clearInputs = function (inputs) {
    inputs === null || inputs === void 0 ? void 0 : inputs.forEach(function (input) {
        input.value = "";
    });
};
var filterNumbers = function (numbers, filter) {
    return numbers.filter(function (num) { return (filter === "incomes" ? num > 0 : num < 0); });
};
var reduceNumbers = function (numbers) {
    return numbers.reduce(function (acc, num) { return acc + num; }, 0);
};
createUsernames(accounts);
btnLogin === null || btnLogin === void 0 ? void 0 : btnLogin.addEventListener("click", function (ev) {
    ev.preventDefault();
    login();
});
btnTransfer === null || btnTransfer === void 0 ? void 0 : btnTransfer.addEventListener("click", function (ev) {
    ev.preventDefault();
    transferMoney();
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function (ev) {
    ev.preventDefault();
    closeAccount();
});
btnLoan === null || btnLoan === void 0 ? void 0 : btnLoan.addEventListener("click", function (ev) {
    ev.preventDefault();
    loanAmount();
});
btnSort === null || btnSort === void 0 ? void 0 : btnSort.addEventListener("click", function (ev) {
    ev.preventDefault();
    sortMovements();
});
/* REST OF COURSE */
// CODING CHALLENGE #1
var MIN_DOG_YEAR_TO_BE_ADULT = 3;
var checkDogs = function (dogsJulia, dogsKate) {
    var recreatedDogsJulia = dogsJulia.slice(1, -2);
    var dogs = __spreadArray(__spreadArray([], recreatedDogsJulia, true), dogsKate, true);
    dogs.forEach(function (dogAge, idx) {
        console.log("Dog number ".concat(idx + 1, " is ").concat(dogAge >= MIN_DOG_YEAR_TO_BE_ADULT
            ? " an adult, and is ".concat(dogAge, " years old")
            : "still a puppy \uD83E\uDD79"));
    });
};
// CODING CHALLENGE #2
var MIN_DOG_YEAR = 2;
var ADULT_YEAR = 18;
var calcAverageHumanAge = function (dogAges) {
    var humanDogsAges = dogAges.map(function (dogAge) {
        return dogAge <= MIN_DOG_YEAR ? dogAge * 2 : 16 + dogAge * 4;
    });
    var filteredHumanDogsAges = humanDogsAges.filter(function (humanDogAge) { return humanDogAge >= ADULT_YEAR; });
    var averageHumanDogsAge = filteredHumanDogsAges.reduce(function (acc, humanDogAge) { return acc + humanDogAge; }, 0) /
        filteredHumanDogsAges.length;
    return averageHumanDogsAge;
};
var global_dogs = [
    {
        weight: 22,
        curFood: 250,
        owners: ["Alice", "Bob"],
    },
    {
        weight: 8,
        curFood: 200,
        owners: ["Matilda"],
    },
    {
        weight: 13,
        curFood: 275,
        owners: ["Sarah", "John"],
    },
    {
        weight: 32,
        curFood: 340,
        owners: ["Michael"],
    },
];
var createRecommendFoodProperty = function (dogs) {
    dogs.forEach(function (dog) {
        var recommendFood = Math.pow(dog.weight, 0.75) * 28;
        dog.recommendFood = Math.trunc(recommendFood);
    });
};
var isOwnerDogEatGood = function (owner) {
    var ownerDog = global_dogs.find(function (dog) { return dog.owners.includes(owner); });
    if (!ownerDog)
        return;
    console.log("".concat(owner, " dog eating status : ").concat(ownerDog.curFood >= Number(ownerDog.recommendFood)
        ? "too much"
        : "too little"));
};
createRecommendFoodProperty(global_dogs);
isOwnerDogEatGood("Sarah");
