// SCOPING

const CURRENT_YEAR = new Date().getFullYear();

const calcAge = (birthYear: number) => {
  const age = CURRENT_YEAR - birthYear;

  const printAge = () => {
    const output = `You are ${age}, born in ${birthYear}`;

    console.log(output);
  };

  printAge();

  return age;
};

const firstName = "Kamil";

calcAge(2001);

// HOISTING

printName(); // Accesible before function declaring.

function printName() {
  console.log(nameA); // Undefined bcs of hoisting nameA variable to undefined by default.
}

var nameA = "Ala";

// TDZ

const printSomething = () => {
  // START OF TDZ FOR NAME VARIABLE
  const a = 3;
  const b = 5;
  // END OF TDZ FOR NAME VARIABLE
  const name = "Kamil";
};

// THIS

console.log(this); // WINDOW | UNDEFINED

const luna = {
  name: "Luna",
  printName() {
    console.log(this.name); // LUNA OBJECT
  },
};

const button = document.querySelector("button");

button?.addEventListener("click", console.log(this)); // BUTTON
