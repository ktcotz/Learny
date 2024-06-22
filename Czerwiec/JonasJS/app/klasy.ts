class Car {
  constructor(public name: string, public speed: number) {}

  accelerate() {
    this.speed += 10;

    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;

    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed: number) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  constructor(
    public name: string,
    public speed: number,
    public charge: number
  ) {
    super(name, speed);
  }

  chargeBattery(chargeTo: number) {
    this.charge = chargeTo;
  }

  accelerate() {
    this.speed += 20;
    this.charge--;
  }
}

const tesla = new EV("Tesla", 120, 23);
