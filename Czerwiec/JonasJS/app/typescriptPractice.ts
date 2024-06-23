/* 
  GLOBAL_TYPES
*/

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

/* 
  GLOBAL_STATE
*/

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

/* 
  PROJECT_STATE
*/
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);

    if (project) {
      project.status = newStatus;
    }

    this.updateListeners();
  }

  private updateListeners() {
    for (const listener of this.listeners) {
      listener([...this.projects]);
    }
  }
}

/*
  TEMPLATE_PARENT_CLASS
*/

abstract class Template<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement | null;
  hostElement: U | null;
  element: T | null;

  constructor(
    templateID: string,
    hostElementID: string,
    insertAtStart: boolean,
    newElementID?: string
  ) {
    this.templateElement = document.querySelector(`#${templateID}`);
    this.hostElement = document.querySelector(`#${hostElementID}`);

    const importedNode = document.importNode(
      this.templateElement!.content,
      true
    );

    this.element = <T>importedNode.firstElementChild;

    if (newElementID) {
      this.element.id = newElementID;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    if (!this.hostElement || !this.element) return;

    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectList
  extends Template<HTMLUListElement, HTMLDivElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element?.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element?.addEventListener(
      "dragleave",
      this.dragLeaveHandler.bind(this)
    );
    this.element?.addEventListener("drop", this.dropHandler.bind(this));

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        }

        return project.status === ProjectStatus.Finished;
      });
      this.renderProjects();
    });
  }

  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element?.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element?.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");

    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`);

    if (!listEl) return;

    listEl.innerHTML = "";

    for (const project of this.assignedProjects) {
      new ProjectItem(this.element!.querySelector("ul")!.id, project);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    const ul = this.element?.querySelector("ul");
    const h2 = this.element?.querySelector("h2");

    if (!ul || !h2) return;

    ul.id = listId;
    h2.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }
}

/*
  PROJECT_ITEM
*/

class ProjectItem
  extends Template<HTMLUListElement, HTMLDivElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    }

    return `${this.project.people} persons`;
  }

  constructor(public hostID: string, project: Project) {
    super("single-project", hostID, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element?.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.element?.addEventListener("dragend", this.dragEndHandler.bind(this));
  }

  renderContent() {
    const title = this.element?.querySelector("h2");
    const persons = this.element?.querySelector("h3");
    const description = this.element?.querySelector("p");

    if (!title || !persons || !description) return;

    title.textContent = this.project.title;
    persons.textContent = `${this.persons} assigned`;
    description.textContent = this.project.description;
  }

  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {}
}

/*
  PROJECT_INPUT
*/

class ProjectInput extends Template<HTMLFormElement, HTMLDivElement> {
  titleInputElement: HTMLInputElement | null = null;
  descriptionInputElement: HTMLInputElement | null = null;
  peopleInputElement: HTMLInputElement | null = null;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement =
      this.element!.querySelector<HTMLInputElement>("#title");
    this.descriptionInputElement =
      this.element!.querySelector<HTMLInputElement>("#description");
    this.peopleInputElement =
      this.element!.querySelector<HTMLInputElement>("#people");

    this.configure();
  }

  configure() {
    this.element?.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}

  private gatherUserInput() {
    const enteredTitle = this.titleInputElement?.value;
    const enteredDescription = this.descriptionInputElement?.value;
    const enteredPeople = this.peopleInputElement?.value;

    const titleValidatable: Validation = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation = {
      value: Number(enteredPeople),
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      return alert("Invalid input, please try again!");
    }

    return [enteredTitle, enteredDescription, Number(enteredPeople)];
  }

  private submitHandler(ev: Event) {
    ev.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;

      console.log(userInput);

      projectState.addProject(String(title), String(desc), Number(people));
    }
  }
}

/* 
  VALIDATION 
*/

interface Validation {
  value?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validatableInput: Validation) => {
  if (!validatableInput.value) return false;

  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
};

const projectState = ProjectState.getInstance();
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
