const createContactPage = () => {
  const contentDiv = document.querySelector("#content");
  const pageContent = document.createElement("div");
  pageContent.classList.add("page-content");

  const contactFormContainer = document.createElement("div")
  contactFormContainer.classList.add("contact-form-container")

  const form = document.createElement("form");
  form.classList.add("contact-form");

  const createElementWithText = (tagName, text, className) => {
    const element = document.createElement(tagName);
    element.textContent = text;
    if (className) element.classList.add(className);
    return element;
  };

  // create form builder function
  const createInputField = (
    labelText,
    inputType,
    inputId,
    placeholder,
    required = false
  ) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.placeholder = placeholder;
    if (required) input.required = true;

    container.append(label, input);
    return container;
  };

  const createTextareaField = (labelText, textareaId) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", textareaId);
    label.textContent = labelText;

    const textarea = document.createElement("textarea");
    textarea.id = textareaId;

    container.append(label, textarea);
    return container;
  };

  const createSubmitButton = (buttonText) => {
    const container = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.type = "submit";
    button.id = "submit";

    container.append(button);
    return container;
  };

  const contactHeading = createElementWithText(
    "h1",
    "Contact us",
    "contact-heading"
  );

  form.append(
    createInputField("Name: ", "text", "nameInput", "e.g., John Strung", true),
    createInputField("Phone Number: ", "tel", "telNoInput", "e.g., +233568878"),
    createInputField(
      "Email: ",
      "email",
      "emailInput",
      "e.g., jon@example.com",
      true
    ),
    createTextareaField("Enter your Message: ", "msgInput"),
    createSubmitButton("Submit")
  );

  contactFormContainer.append(contactHeading, form);
  pageContent.appendChild(contactFormContainer)
  contentDiv.appendChild(pageContent);
};

export default createContactPage;
