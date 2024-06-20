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
