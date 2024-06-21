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
};

// Data
const account1: Account = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2: Account = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3: Account = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4: Account = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts: Account[] = [account1, account2, account3, account4];

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

    const movementHTML = /* HTML */ `
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">
          ${id + 1} ${movementType}
        </div>
        <div class="movements__value">${movement}€</div>
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

  labelBalance.textContent = `${balance}€`;
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

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}€`;
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
  receiver.movements.push(amount);

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

  clearInputs([inputLoanAmount]);
  updateUI();
};

const sortMovements = () => {
  if (!user) return;

  global_sort = !global_sort;

  displayMovements(user, global_sort);
};

const showScreen = () => {
  if (!containerApp || !user) return;

  containerApp.style.opacity = "100";

  if (!labelWelcome) return;

  labelWelcome.textContent = `Welcome back, ${user.owner}`;
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
