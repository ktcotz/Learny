// Default parameters
var printName = function (name) {
    if (name === void 0) { name = "Anonymous"; }
    console.log("Hi i'm ".concat(name));
};
// Pass by reference | value
var flight = "LH234";
var jonas = {
    name: "Jonas Schmedtmann",
    passport: 24739479284,
};
var checkIn = function (flightNum, passenger) {
    flightNum = "LH999";
    passenger.name = "Mr ".concat(passenger.name);
    if (passenger.passport === 24739479284) {
        alert("correct");
    }
    else {
        alert("Wrong passwport");
    }
};
// checkIn(flight, { ...jonas });
// Call, apply, bind
var lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    book: function (name) {
        console.log("".concat(name, " :)"));
        this.bookings.push(name);
    },
};
lufthansa.book("Kamil");
var eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],
};
var book = lufthansa.book;
book.call(lufthansa, "Adamek");
book.call(eurowings, "Martyna");
book.apply(lufthansa, ["Adamek"]);
var booked = book.bind(eurowings);
booked("Adaśko");
/*
  Call - łączy this z obiektem i umożlwiia podanie argumentów jako wartości
  Apply - łączy this z obiektem i umożliwia podanie argumentów jako tablica.
  Bind - łączy this z obiektem i umożliwia używanie funkcji jako metody tego obiektu.
*/
