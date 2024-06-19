/*
  GLOBAL_TYPES
*/
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
/*
  GLOBAL_STATE
*/
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    return State;
}());
var ProjectState = /** @class */ (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(__spreadArray([], this.projects, true));
        }
    };
    return ProjectState;
}(State));
/*
  TEMPLATE_PARENT_CLASS
*/
var Template = /** @class */ (function () {
    function Template(templateID, hostElementID, insertAtStart, newElementID) {
        this.templateElement = document.querySelector("#".concat(templateID));
        this.hostElement = document.querySelector("#".concat(hostElementID));
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementID) {
            this.element.id = newElementID;
        }
        this.attach(insertAtStart);
    }
    Template.prototype.attach = function (insertAtStart) {
        if (!this.hostElement || !this.element)
            return;
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    };
    return Template;
}());
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = _super.call(this, "project-list", "app", false, "".concat(type, "-projects")) || this;
        _this.type = type;
        _this.assignedProjects = [];
        _this.configure();
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.configure = function () {
        var _this = this;
        projectState.addListener(function (projects) {
            _this.assignedProjects = projects.filter(function (project) {
                if (_this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            _this.renderProjects();
        });
    };
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById("".concat(this.type, "-projects-list"));
        if (!listEl)
            return;
        listEl.innerHTML = "";
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var project = _a[_i];
            var listItem = document.createElement("li");
            listItem.textContent = project.title;
            listEl === null || listEl === void 0 ? void 0 : listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var _a, _b;
        var listId = "".concat(this.type, "-projects-list");
        var ul = (_a = this.element) === null || _a === void 0 ? void 0 : _a.querySelector("ul");
        var h2 = (_b = this.element) === null || _b === void 0 ? void 0 : _b.querySelector("h2");
        if (!ul || !h2)
            return;
        ul.id = listId;
        h2.textContent = "".concat(this.type.toUpperCase(), " PROJECTS");
    };
    return ProjectList;
}(Template));
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, "project-input", "app", true, "user-input") || this;
        _this.titleInputElement = null;
        _this.descriptionInputElement = null;
        _this.peopleInputElement = null;
        _this.titleInputElement =
            _this.element.querySelector("#title");
        _this.descriptionInputElement =
            _this.element.querySelector("#description");
        _this.peopleInputElement =
            _this.element.querySelector("#people");
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.configure = function () {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", this.submitHandler.bind(this));
    };
    ProjectInput.prototype.renderContent = function () { };
    ProjectInput.prototype.gatherUserInput = function () {
        var _a, _b, _c;
        var enteredTitle = (_a = this.titleInputElement) === null || _a === void 0 ? void 0 : _a.value;
        var enteredDescription = (_b = this.descriptionInputElement) === null || _b === void 0 ? void 0 : _b.value;
        var enteredPeople = (_c = this.peopleInputElement) === null || _c === void 0 ? void 0 : _c.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        var peopleValidatable = {
            value: Number(enteredPeople),
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            return alert("Invalid input, please try again!");
        }
        return [enteredTitle, enteredDescription, Number(enteredPeople)];
    };
    ProjectInput.prototype.submitHandler = function (ev) {
        ev.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(userInput);
            projectState.addProject(String(title), String(desc), Number(people));
        }
    };
    return ProjectInput;
}(Template));
var validate = function (validatableInput) {
    if (!validatableInput.value)
        return false;
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
};
var projectState = ProjectState.getInstance();
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
