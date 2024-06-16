// Destructuring + Rest

const arr = [1, 2, 3, 4, 5];

const [firstNumber, ...restNumbers] = arr;
// 1            // 2,3,4,5

const lunka = {
  name: "Luna",
  age: 20,
};

const { name: nameAnimal, age } = lunka;

// Spread

const sum = (...numbers: any) => {
  return numbers.reduce((acc, next) => (acc += next), 0);
};

console.log(sum(1, 2, 3, 4, 5));

// Nullish coallescing + short circtuiting

const OPEN_HOUR = 10;
const CLOSE_HOUR = 22;
const CURRENT_HOUR = 15;

const nonNullable = null ?? 30;
const isOpen =
  CURRENT_HOUR >= OPEN_HOUR && CURRENT_HOUR <= CLOSE_HOUR && "is open";

// CODING CHALLENGE #1

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
const { team1, x: draw, team2 } = game.odds;

const printGoals = (...names: string[]) => {
  console.log(names);
};

printGoals(...game.scored);

// Optional chaining

type Animal = {
  name: string;
  age: number;
  description?: string;
};

const reks: Animal = {
  name: "Reks",
  age: 20,
  description: "Cosiek",
};

const desc = reks?.description;

// CODING CHALLENGE #2

for (const [key, item] of Object.entries(game.scored)) {
  console.log(`Goal ${Number(key) + 1}: ${item}`);
}

let averageOdd = 0;
const values = Object.values(game.odds);

for (const item of values) {
  averageOdd += item;
}

console.log((averageOdd /= values.length));

for (const [key, item] of Object.entries(game.odds)) {
  const keyIn = game[key] || null;

  if (keyIn) {
    console.log(`Odd of victory ${keyIn} : ${item}`);
  } else {
    console.log(`Odd of draw : ${item}`);
  }
}

const scorers = {};

for (const key of game.scored) {
  scorers[key] ? scorers[key]++ : (scorers[key] = 1);
}

console.log(scorers);

// SET

const randomNumbers = new Set([1, 2, 3, 4, 1, 1]);

// MAP

const rest = new Map();

rest.set("name", "Restaurant of Joseph");
rest.set(1, "Michel Stars");

console.log(rest);
console.log(rest.get("name"));

// CODING CHALLENGE #3

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

const events = new Set(gameEvents.values());
const removed = gameEvents.delete(64);

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min}: ${event}`);
}
