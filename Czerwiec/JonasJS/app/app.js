var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car(name, speed) {
        this.name = name;
        this.speed = speed;
    }
    Car.prototype.accelerate = function () {
        this.speed += 10;
        console.log(this.speed);
    };
    Car.prototype.brake = function () {
        this.speed -= 5;
        console.log(this.speed);
    };
    Object.defineProperty(Car.prototype, "speedUS", {
        get: function () {
            return this.speed / 1.6;
        },
        set: function (speed) {
            this.speed = speed * 1.6;
        },
        enumerable: false,
        configurable: true
    });
    return Car;
}());
var EV = /** @class */ (function (_super) {
    __extends(EV, _super);
    function EV(name, speed, charge) {
        var _this = _super.call(this, name, speed) || this;
        _this.name = name;
        _this.speed = speed;
        _this.charge = charge;
        return _this;
    }
    EV.prototype.chargeBattery = function (chargeTo) {
        this.charge = chargeTo;
    };
    EV.prototype.accelerate = function () {
        this.speed += 20;
        this.charge--;
    };
    return EV;
}(Car));
var tesla = new EV("Tesla", 120, 23);
