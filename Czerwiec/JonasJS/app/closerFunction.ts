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

checkIn(flight, { ...jonas });
