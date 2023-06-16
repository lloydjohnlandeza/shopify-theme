class Header extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    this.render(); // Initial rendering of the component
    const hamburgerButton = this.querySelector('#hamburger-button');
    hamburgerButton.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    let elements = this.querySelector('#hamburger-lines').querySelectorAll('span');
    this.isOpen = !this.isOpen;
    elements = [...elements];
    if (this.isOpen) {
      elements[0].classList.add('rotate-45');
      elements[1].classList.add('opacity-0');
      elements[2].classList.add('-rotate-45');
      elements[0].classList.remove('-translate-y-1.5');
      elements[2].classList.remove('translate-y-1.5');
    } else {
      elements[0].classList.remove('rotate-45');
      elements[1].classList.remove('opacity-0');
      elements[2].classList.remove('-rotate-45');
      elements[0].classList.add('-translate-y-1.5');
      elements[2].classList.add('translate-y-1.5');
    }
  }

  render() {
    this.innerHTML = `
      <div class="mx-auto flex max-w-7xl gap-2 bg-my-white px-2 py-4">
        <button
          id="hamburger-button"
          class="relative z-20 h-11 w-8 self-center bg-white text-my-very-dark-blue focus:outline-none"
        >
          <span class="sr-only">Open main menu</span>
          <div id="hamburger-lines" class="absolute left-1/2 top-1/2 block w-4 -translate-x-1/2 -translate-y-1/2 transform">
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-4 transform bg-current transition duration-500 ease-in-out -translate-y-1.5"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-4 transform bg-current transition duration-500 ease-in-out"
            ></span>
            <span
              aria-hidden="true"
              class="absolute block h-0.5 w-4 transform bg-current transition duration-500 ease-in-out translate-y-1.5"
            ></span>
          </div>
        </button>
        <a href="/" class="font-kumbh-sans text-3xl font-bold text-my-very-dark-blue">sneakers</a>
        <base-header-cart item_count="{{cart.item_count}}" class="flex flex-1 justify-end self-center"></base-header-cart>
        <div class="h-6 w-6 self-center rounded-full bg-my-grayish-blue">
          <img class="object-contain">
        </div>
      </div>
    `;
  }
}

// Define the new element
customElements.define('base-header', Header);
