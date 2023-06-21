class BaseSidebar extends HTMLElement {
  static get observedAttributes() {
    return ["is_open"]; // List of properties to observe for changes
  }

  constructor() {
    super();
    this._is_open = false; // Private property to store the value
  }

  // Getter and setter for the "is_open" property
  get is_open() {
    return this._is_open;
  }

  set is_open(value) {
    this._is_open = value === "true";
    this.setAttribute("is_open", value); // Update the corresponding attribute
  }

  connectedCallback() {
    this.render();
    this.sidebar = document.querySelector("#sidebar");
    this.overlay = document.querySelector("#overlay");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "is_open") {
      this._is_open = newValue === "true";
      this.render(); // Update the component when the property changes
    }
  }

  render() {
    const links = ["Collections", "Men", "Women", "About", "Contact"];
    if (!this._is_open) {
      return (this.innerHTML = ``);
    }
    this.innerHTML = `
    <div id="overlay" class="fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/[.75]">
      <div id="sidebar" class="h-screen w-72 bg-my-white pt-20">
        <ul>
          ${links.map(
            (link, key) =>
              `<li class="px-4 py-2 text-lg font-bold">
                ${link}
              </li>`
          )}
        </ul>
      </div>
    </div>
    `;
  }
}

customElements.define("base-sidebar", BaseSidebar);
