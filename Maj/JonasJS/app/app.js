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
    ProjectInput.prototype.submitHandler = function (ev) {
        ev.preventDefault();
        console.log("submit");
    };
    return ProjectInput;
}());
new ProjectInput();
