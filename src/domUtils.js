// domUtils.js
export function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
}

export function createInput(type, placeholder, className) {
  const input = document.createElement("input");
  input.type = type;
  if (placeholder) input.placeholder = placeholder;
  if (className) input.classList.add(className);
  return input;
}

export function createEditablePInput(placeholder, className) {
  const input = document.createElement("p");
  input.setAttribute("contenteditable", "true");
  input.placeholder = placeholder || "";
  if (className) input.classList.add(className);

  // Add placeholder logic
  input.addEventListener("focus", () => {
    if (input.textContent === placeholder) {
      input.textContent = "";
      input.classList.remove("placeholder");
    }
  });

  input.addEventListener("blur", () => {
    if (!input.textContent.trim()) {
      input.textContent = placeholder;
      input.classList.add("placeholder");
    }
  });

  // Initialize placeholder
  if (!input.textContent.trim()) {
    input.textContent = placeholder;
    input.classList.add("placeholder");
  }

  return input;
}

export function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  if (className) button.classList.add(className);
  return button;
}

export function createSelect(options, className) {
  const select = document.createElement("select");
  if (className) select.classList.add(className);
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  return select;
}

export function createLabel(forId, text) {
  const label = document.createElement("label");
  label.htmlFor = forId;
  label.textContent = text;
  return label;
}