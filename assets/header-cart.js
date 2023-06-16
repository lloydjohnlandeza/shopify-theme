
class BaseHeaderCart extends HTMLElement {
  static get observedAttributes() {
    return ['item_count']; // List of properties to observe for changes
  }

  constructor() {
    super();
    this._item_count = ''; // Private property to store the value
    this.itemCountSpan
    this.cartBtn
    this.isOpen = false
  }

  // Getter and setter for the "item_count" property
  get item_count() {
    return this._item_count;
  }

  set item_count(value) {
    this._item_count = value;
    this.setAttribute('item_count', value); // Update the corresponding attribute
  }

  connectedCallback() {
    this.itemCountSpan = this.querySelector('#item_count');
    this.cartBtn = this.querySelector('#cartBtn');
    this.cartDropdown = this.querySelector('header-cart-dropdown')
    cartBtn.addEventListener('click', this.toggle.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'item_count') {
      this._item_count = newValue;
      if (this.itemCountSpan) {
        this.itemCountSpan.innerHTML = newValue;
      }
    }
  }

  toggle () {
    this.isOpen = !this.isOpen
    if (this.cartDropdown) {
      this.cartDropdown.is_open = this.isOpen
    }
  }
}
customElements.define('base-header-cart', BaseHeaderCart);