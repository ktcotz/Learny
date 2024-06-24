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
var UI = /** @class */ (function () {
    function UI() {
        this.mapElement = document.querySelector("#map");
    }
    UI.prototype.showForm = function () {
        form === null || form === void 0 ? void 0 : form.classList.remove("hidden");
        inputDistance === null || inputDistance === void 0 ? void 0 : inputDistance.focus();
    };
    UI.prototype.hideError = function () {
        if (!form)
            return;
        this.clearInputs([
            inputDistance,
            inputDuration,
            inputCadence,
            inputElevation,
        ]);
        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(function () { return (form.style.display = "grid"); }, 1000);
    };
    UI.prototype.toggleElevationField = function () {
        var _a, _b;
        (_a = inputElevation === null || inputElevation === void 0 ? void 0 : inputElevation.closest(".form__row")) === null || _a === void 0 ? void 0 : _a.classList.toggle("form__row--hidden");
        (_b = inputCadence === null || inputCadence === void 0 ? void 0 : inputCadence.closest(".form__row")) === null || _b === void 0 ? void 0 : _b.classList.toggle("form__row--hidden");
    };
    UI.prototype.clearInputs = function (inputs) {
        if (!inputs)
            return [];
        inputs.forEach(function (input) { return (input.value = ""); });
    };
    return UI;
}());
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
var MaptyMap = /** @class */ (function (_super) {
    __extends(MaptyMap, _super);
    function MaptyMap() {
        var _this = _super.call(this) || this;
        _this.mapService = new MapService();
        _this.coords = null;
        _this.map = null;
        _this.mapOptions = {
            zoom: 13,
            maxZoom: 19,
        };
        _this.initialize();
        return _this;
    }
    MaptyMap.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var coords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapService.getGeolocation(this.mapElement)];
                    case 1:
                        coords = _a.sent();
                        if (coords) {
                            this.coords = coords;
                        }
                        this.generateMap();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaptyMap.prototype.generateMap = function () {
        if (!this.coords || !this.mapElement)
            return;
        this.map = L.map(this.mapElement).setView(this.coords, this.mapOptions.zoom);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: this.mapOptions.maxZoom,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        this.addMarker(this.coords, "Custom Marker!");
        this.addEventListeners();
    };
    MaptyMap.prototype.addMarker = function (position, content) {
        if (!this.map)
            return;
        L.marker(position)
            .addTo(this.map)
            .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
            content: content,
        }))
            .openPopup();
    };
    MaptyMap.prototype.addEventListeners = function () {
        var _this = this;
        if (!this.map)
            return;
        this.map.on("click", function (ev) {
            var _a = ev.latlng, lat = _a.lat, lng = _a.lng;
            _this.coords = [lat, lng];
            _this.showForm();
        });
    };
    return MaptyMap;
}(UI));
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
            var position, _a, latitude, longitude, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parent)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getCurrentPosition()];
                    case 2:
                        position = _b.sent();
                        if (!(position instanceof GeolocationPosition))
                            return [2 /*return*/];
                        _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                        return [2 /*return*/, [latitude, longitude]];
                    case 3:
                        err_1 = _b.sent();
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
var App = /** @class */ (function () {
    function App() {
        this.mapty_map = new MaptyMap();
        this.ui = new UI();
        this.initialize();
    }
    App.prototype.initialize = function () {
        this.mapty_map.initialize();
        this.addEventListeners();
    };
    App.prototype.addEventListeners = function () {
        var _this = this;
        form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            _this.mapty_map.addMarker(_this.mapty_map.coords, "COSIEK!");
            _this.ui.hideError();
        });
        inputType === null || inputType === void 0 ? void 0 : inputType.addEventListener("change", function () {
            _this.ui.toggleElevationField();
        });
    };
    return App;
}());
new App();
