// Default parameters

const printName = (name: string = "Anonymous") => {
  console.log(`Hi i'm ${name}`);
};

// Pass by reference | value

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const checkIn = (flightNum, passenger) => {
  flightNum = "LH999";
  passenger.name = `Mr ${passenger.name}`;

  if (passenger.passport === 24739479284) {
    alert("correct");
  } else {
    alert("Wrong passwport");
  }
};

// checkIn(flight, { ...jonas });

// Call, apply, bind

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],

  book(name: string) {
    console.log(`${name} :)`);
    this.bookings.push(name);
  },
};

lufthansa.book("Kamil");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

book.call(lufthansa, "Adamek");
book.call(eurowings, "Martyna");
book.apply(lufthansa, ["Adamek"]);

const booked = book.bind(eurowings);
booked("Adaśko");

/* 
  Call - łączy this z obiektem i umożlwiia podanie argumentów jako wartości
  Apply - łączy this z obiektem i umożliwia podanie argumentów jako tablica.
  Bind - łączy this z obiektem i umożliwia używanie funkcji jako metody tego obiektu.
*/

// CODING CHALLENGE #1

const pollButton = document.querySelector(".poll");

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),

  isValidNumber(num: number) {
    if (num === null) return false;

    if (num < 0 || num > this.options.length) return;

    return true;
  },

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question} \n ${this.options
          .map((option) => {
            return option;
          })
          .join("\n")} \n
        (Write option number)
      `
      )
    );

    if (!this.isValidNumber(answer)) return;

    this.updateAnswers(answer);
    this.displayResults();
  },

  updateAnswers(num: number) {
    this.answers[num]++;
  },

  displayResults(type: "string" | "array" = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else {
      console.log(`Poll results are ${this.answers.join(",")}`);
    }
  },
};

pollButton?.addEventListener("click", () => {
  poll.registerNewAnswer();
});

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

// IIFE

(() => {
  console.log("hi");
})();

// Umożliwia tworzenie zakresów wewnątrz globalnych które sa prywatne.

// CODING CHALLENGE #2

(() => {
  const header = document.querySelector("h1");

  header!.style.color = "red";

  document.querySelector("body")?.addEventListener("click", function () {
    header!.style.color = "blue";
  });
})();
