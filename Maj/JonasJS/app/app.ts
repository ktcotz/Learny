class Template {
  templateElement: HTMLTemplateElement | null;
}

class ProjectInput {
  hostElement: HTMLDivElement | null;
  templateElement: HTMLTemplateElement | null;
  element: HTMLFormElement | null;

  titleInputElement: HTMLInputElement | null;
  descriptionInputElement: HTMLInputElement | null;
  peopleInputElement: HTMLInputElement | null;

  constructor() {
    this.templateElement = document.querySelector("#project-input");
    this.hostElement = document.querySelector("#app");

    const importedNode = document.importNode(
      this.templateElement!.content,
      true
    );

    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";

    this.titleInputElement = document.querySelector<HTMLInputElement>("#title");
    this.descriptionInputElement =
      document.querySelector<HTMLInputElement>("#description");
    this.peopleInputElement =
      document.querySelector<HTMLInputElement>("#people");

    this.configure();
    this.attach();
  }

  private attach() {
    if (!this.hostElement || !this.element) return;

    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  private configure() {
    this.element?.addEventListener("submit", this.submitHandler.bind(this));
  }

  private gatherUserInput() {
    const enteredTitle = this.titleInputElement?.value;
    const enteredDescription = this.descriptionInputElement?.value;
    const enteredPeople = this.peopleInputElement?.value;

    console.log(this.titleInputElement);

    if (
      enteredTitle?.trim().length === 0 ||
      enteredDescription?.trim().length === 0 ||
      enteredPeople?.trim().length === 0
    ) {
      return alert("Invalid input, please try again!");
    }

    return [enteredTitle, enteredDescription, +Number(enteredPeople)];
  }

  private submitHandler(ev: Event) {
    ev.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;

      console.log(title, desc, people);
    }
  }
}

new ProjectInput();
