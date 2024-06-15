class Template {
  templateElement: HTMLTemplateElement | null;
}

class ProjectInput {
  hostElement: HTMLDivElement | null;
  templateElement: HTMLTemplateElement | null;
  element: HTMLFormElement | null;

  titleInputElement: HTMLLabelElement | null;
  descriptionInputElement: HTMLLabelElement | null;
  peopleInputElement: HTMLLabelElement | null;

  constructor() {
    this.templateElement = document.querySelector("#project-input");
    this.hostElement = document.querySelector("#app");

    const importedNode = document.importNode(
      this.templateElement!.content,
      true
    );

    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";

    this.titleInputElement = document.querySelector<HTMLLabelElement>("#title");
    this.descriptionInputElement =
      document.querySelector<HTMLLabelElement>("#description");
    this.peopleInputElement =
      document.querySelector<HTMLLabelElement>("#people");

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

  private submitHandler(ev: Event) {
    ev.preventDefault();
    console.log("submit");
  }
}

new ProjectInput();
