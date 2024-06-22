/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

type Account = {
  owner: string;
  movements: number[];
  interestRate: number;
  pin: number;
  username?: string;
  balance?: number;
  movementsDates: string[];
  currency: string;
  locale: string;
};

// Data
const account1: Account = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2: Account = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector<HTMLDivElement>(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector<HTMLInputElement>(
  ".login__input--user"
);
const inputLoginPin =
  document.querySelector<HTMLInputElement>(".login__input--pin");
const inputTransferTo =
  document.querySelector<HTMLInputElement>(".form__input--to");
const inputTransferAmount = document.querySelector<HTMLInputElement>(
  ".form__input--amount"
);
const inputLoanAmount = document.querySelector<HTMLInputElement>(
  ".form__input--loan-amount"
);
const inputCloseUsername =
  document.querySelector<HTMLInputElement>(".form__input--user");
const inputClosePin =
  document.querySelector<HTMLInputElement>(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let user: Account | undefined = undefined;
let global_sort = false;

const clearElement = <T extends Element>(element: T | null) => {
  if (!element) return;

  element.innerHTML = "";
};

const displayMovements = (user: Account, sort: boolean = global_sort) => {
  if (!containerMovements) return;

  clearElement(containerMovements);

  const movements = sort
    ? [...user.movements].sort((a, b) => (a -= b))
    : user.movements;

  movements.forEach((movement, id) => {
    const movementType = movement < 0 ? "withdrawal" : "deposit";

    const movementDate = new Date(user.movementsDates[id]);
    const date = new Intl.DateTimeFormat(user.locale).format(movementDate);

    const formattedMov = new Intl.NumberFormat(user.locale, {
      currency: user.currency,
      style: "currency",
    }).format(movement);

    const movementHTML = /* HTML */ `
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">
          ${id + 1} ${movementType}
        </div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("beforeend", movementHTML);
  });
};

const createUsernames = (users: Account[]) => {
  users.forEach((user) => {
    const username = user.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");

    user.username = username;
  });
};

const calculateUserBalance = (user: Account) => {
  if (!labelBalance) return;

  const balance = reduceNumbers(user.movements);

  user.balance = balance;

  labelBalance.textContent = `${balance.toFixed(2)}€`;
};

const calculateDisplaySummary = (user: Account) => {
  if (!labelSumIn || !labelSumOut || !labelSumInterest) return;

  const incomes = reduceNumbers(filterNumbers(user.movements, "incomes"));
  const outcomes = reduceNumbers(filterNumbers(user.movements, "outcomes"));
  const interest = reduceNumbers(
    filterNumbers(user.movements, "incomes")
      .map((movement) => (movement * user.interestRate) / 100)
      .filter((mov) => mov >= 1)
  );

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const login = () => {
  if (!inputLoginUsername || !inputLoginPin) return;

  const username = inputLoginUsername?.value;
  const pin = Number(inputLoginPin?.value);

  if (!username || !pin) return;

  user = accounts.find(
    (account) => account.username === username && account.pin === pin
  );

  if (!user) return;

  showScreen();
  updateUI();
  clearInputs([inputLoginUsername, inputLoginPin]);
};

const transferMoney = () => {
  if (!user) return;

  if (!inputTransferAmount || !inputTransferTo) return;

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  if (!receiver || !amount || amount < 0) return;
  if (receiver.username === user.username) return;
  if (Number(user.balance) < amount) return;

  user.movements.push(-amount);
  user.movementsDates.push(new Date().toISOString());
  receiver.movements.push(amount);
  receiver.movementsDates.push(new Date().toISOString());

  updateUI();
  clearInputs([inputTransferAmount, inputTransferTo]);
};

const closeAccount = () => {
  if (!inputCloseUsername || !inputClosePin) return;

  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (!username || !pin) return;

  const closedAccountIdx = accounts.findIndex(
    (account) => account.username === username && account.pin === pin
  );

  if (closedAccountIdx === -1) return;

  accounts.splice(closedAccountIdx, 1);

  hideScreen();
  clearInputs([inputCloseUsername, inputClosePin]);
};

const loanAmount = () => {
  if (!inputLoanAmount || !user) return;

  const amount = Number(inputLoanAmount.value);

  if (amount <= 0) return;

  const valid = user.movements.some((mov) => mov >= amount * 0.1);

  if (!valid) return;

  user.movements.push(amount);
  user.movementsDates.push(new Date().toISOString());

  clearInputs([inputLoanAmount]);
  updateUI();
};

const sortMovements = () => {
  if (!user) return;

  global_sort = !global_sort;

  displayMovements(user, global_sort);
};

const startTimer = () => {
  if (!labelTimer) return;

  const tick = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      hideScreen();
      return clearInterval(timer);
    }

    time--;
  };

  let time = 5;

  tick();
  const timer = setInterval(tick, 1000);
};

const showScreen = () => {
  if (!containerApp || !user) return;

  containerApp.style.opacity = "100";

  if (!labelWelcome) return;

  labelWelcome.textContent = `Welcome back, ${user.owner}`;

  if (!labelDate) return;

  const date = new Intl.DateTimeFormat(user.locale, {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date());

  labelDate.textContent = date;

  startTimer();
};

const hideScreen = () => {
  if (!containerApp) return;

  containerApp.style.opacity = "0";

  if (!labelWelcome) return;

  labelWelcome.textContent = `Log in to get started`;
};

const updateUI = () => {
  if (!user) return;

  displayMovements(user);
  calculateUserBalance(user);
  calculateDisplaySummary(user);
};

const clearInputs = (inputs: HTMLInputElement[] | null) => {
  inputs?.forEach((input) => {
    input.value = "";
  });
};

const filterNumbers = (numbers: number[], filter: "incomes" | "outcomes") => {
  return numbers.filter((num) => (filter === "incomes" ? num > 0 : num < 0));
};

const reduceNumbers = (numbers: number[]) => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

createUsernames(accounts);

btnLogin?.addEventListener("click", (ev) => {
  ev.preventDefault();

  login();
});

btnTransfer?.addEventListener("click", (ev) => {
  ev.preventDefault();

  transferMoney();
});

btnClose?.addEventListener("click", (ev) => {
  ev.preventDefault();

  closeAccount();
});

btnLoan?.addEventListener("click", (ev) => {
  ev.preventDefault();

  loanAmount();
});

btnSort?.addEventListener("click", (ev) => {
  ev.preventDefault();

  sortMovements();
});

/* REST OF COURSE */

// CODING CHALLENGE #1

const MIN_DOG_YEAR_TO_BE_ADULT = 3;

const checkDogs = (dogsJulia: number[], dogsKate: number[]) => {
  const recreatedDogsJulia = dogsJulia.slice(1, -2);
  const dogs = [...recreatedDogsJulia, ...dogsKate];

  dogs.forEach((dogAge, idx) => {
    console.log(
      `Dog number ${idx + 1} is ${
        dogAge >= MIN_DOG_YEAR_TO_BE_ADULT
          ? ` an adult, and is ${dogAge} years old`
          : `still a puppy 🥹`
      }`
    );
  });
};

// CODING CHALLENGE #2

const MIN_DOG_YEAR = 2;
const ADULT_YEAR = 18;

const calcAverageHumanAge = (dogAges: number[]) => {
  const humanDogsAges = dogAges.map((dogAge) =>
    dogAge <= MIN_DOG_YEAR ? dogAge * 2 : 16 + dogAge * 4
  );

  const filteredHumanDogsAges = humanDogsAges.filter(
    (humanDogAge) => humanDogAge >= ADULT_YEAR
  );

  const averageHumanDogsAge =
    filteredHumanDogsAges.reduce((acc, humanDogAge) => acc + humanDogAge, 0) /
    filteredHumanDogsAges.length;

  return averageHumanDogsAge;
};

// CODING CHALLENGE #3

type Dog = {
  weight: number;
  curFood: number;
  owners: string[];
  recommendFood?: number;
};

const global_dogs: Dog[] = [
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

const createRecommendFoodProperty = (dogs: Dog[]) => {
  dogs.forEach((dog) => {
    const recommendFood = dog.weight ** 0.75 * 28;
    dog.recommendFood = Math.trunc(recommendFood);
  });
};

const isOwnerDogEatGood = (owner: string) => {
  const ownerDog = global_dogs.find((dog) => dog.owners.includes(owner));

  if (!ownerDog) return;

  console.log(
    `${owner} dog eating status : ${
      ownerDog.curFood >= Number(ownerDog.recommendFood)
        ? "too much"
        : "too little"
    }`
  );
};

createRecommendFoodProperty(global_dogs);
isOwnerDogEatGood("Sarah");
