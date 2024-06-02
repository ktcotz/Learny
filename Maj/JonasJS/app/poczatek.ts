// JS & TS

const MIN_ADULT_AGE = 18;

const learnyAuthor = {
  firstName: "Kamil",
  age: 22,
  hobbies: ["MMA", "Programming", "Running"],
  girlfriend: {
    firstName: "Martyna",
    age: 20,
  },
};

const isAdult = learnyAuthor.age >= MIN_ADULT_AGE;

const printInformations = (
  firstName: string,
  age: number,
  isAdult: boolean = true
) => {
  console.log(
    `Hello my name is ${firstName}, i'm ${age} so i'm ${
      isAdult ? "adult" : "kid"
    }.`
  );
};

printInformations(learnyAuthor.firstName, learnyAuthor.age, isAdult);
printInformations(
  learnyAuthor.girlfriend.firstName,
  learnyAuthor.girlfriend.age
);

// Poszczególne przykłady TS bez referencji.
