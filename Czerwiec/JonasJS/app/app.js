var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var form = document.querySelector(".form");
var containerWorkouts = document.querySelector(".workouts");
var inputType = document.querySelector(".form__input--type");
var inputDistance = document.querySelector(".form__input--distance");
var inputDuration = document.querySelector(".form__input--duration");
var inputCadence = document.querySelector(".form__input--cadence");
var inputElevation = document.querySelector(".form__input--elevation");
var CustomError = /** @class */ (function () {
    function CustomError() {
    }
    CustomError.prototype.setError = function (parentElement, error) {
        if (!parentElement)
            return;
        parentElement === null || parentElement === void 0 ? void 0 : parentElement.insertAdjacentHTML("beforeend", "<p class=\"error\">".concat(error, "</p>"));
    };
    return CustomError;
}());
var MaptyMap = /** @class */ (function () {
    function MaptyMap() {
        this.parentElement = document.querySelector("#map");
        this.mapService = new MapService();
        this.coords = null;
        this.initialize();
    }
    MaptyMap.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var coords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapService.getGeolocation(this.parentElement)];
                    case 1:
                        coords = _a.sent();
                        if (coords) {
                            this.coords = coords;
                        }
                        console.log(this.coords);
                        return [2 /*return*/];
                }
            });
        });
    };
    return MaptyMap;
}());
var MapService = /** @class */ (function () {
    function MapService() {
        this.customError = new CustomError();
    }
    MapService.prototype.getCurrentPosition = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) { return resolve(position); }, function (error) { return reject(error); });
        });
    };
    MapService.prototype.getGeolocation = function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var position, coords, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parent)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getCurrentPosition()];
                    case 2:
                        position = _a.sent();
                        if (!(position instanceof GeolocationPosition))
                            return [2 /*return*/];
                        coords = position.coords;
                        return [2 /*return*/, coords];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof GeolocationPositionError) {
                            this.customError.setError(parent, err_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MapService;
}());
new MaptyMap();
