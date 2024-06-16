var Template = /** @class */ (function () {
    function Template() {
    }
    return Template;
}());
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.querySelector("#project-input");
        this.hostElement = document.querySelector("#app");
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = document.querySelector("#title");
        this.descriptionInputElement =
            document.querySelector("#description");
        this.peopleInputElement =
            document.querySelector("#people");
        this.configure();
        this.attach();
    }
    ProjectInput.prototype.attach = function () {
        if (!this.hostElement || !this.element)
            return;
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    };
    ProjectInput.prototype.configure = function () {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", this.submitHandler.bind(this));
    };
    ProjectInput.prototype.gatherUserInput = function () {
        var _a, _b, _c;
        var enteredTitle = (_a = this.titleInputElement) === null || _a === void 0 ? void 0 : _a.value;
        var enteredDescription = (_b = this.descriptionInputElement) === null || _b === void 0 ? void 0 : _b.value;
        var enteredPeople = (_c = this.peopleInputElement) === null || _c === void 0 ? void 0 : _c.value;
        console.log(this.titleInputElement);
        if ((enteredTitle === null || enteredTitle === void 0 ? void 0 : enteredTitle.trim().length) === 0 ||
            (enteredDescription === null || enteredDescription === void 0 ? void 0 : enteredDescription.trim().length) === 0 ||
            (enteredPeople === null || enteredPeople === void 0 ? void 0 : enteredPeople.trim().length) === 0) {
            return alert("Invalid input, please try again!");
        }
        return [enteredTitle, enteredDescription, +Number(enteredPeople)];
    };
    ProjectInput.prototype.submitHandler = function (ev) {
        ev.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(title, desc, people);
        }
    };
    return ProjectInput;
}());
new ProjectInput();
