
class HeaderCartDropdown extends HTMLElement {
  static get observedAttributes() {
    return ['is_open'];
  }
  constructor() {
    super();
    this._is_open = '';
    this.content = this.innerHTML
    this.onDelete = this.onDelete.bind(this)
    this.deleteButtons = [];
  }
  get is_open() {
    return this._is_open;
  }
  set is_open(value) {
    this._is_open = value === 'true';
    this.setAttribute('is_open', value); // Update the corresponding attribute
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'is_open') {
      this._is_open = newValue === 'true';
    }
    this.render();
    if (newValue === 'true') {
      this.attachedEvents();
    } else {
      this.removeEvents();
    }
  }

  attachedEvents() {
    this.deleteButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        event.preventDefault()
        this.onDelete(btn);
      });
    });
  }

  removeEvents() {
    this.deleteButtons.forEach((btn) => {
      btn.removeEventListener('click', (e) => {
        event.preventDefault()
      });
    });
    this.deleteButtons = [];
  }

  async onDelete (btn) {
    const key = btn.getAttribute('data-delete')
    const body = JSON.stringify({
      'id': key,
      'quantity': 0,
      'sections': 'header-cart-dropdown',
      'sections_url': window.location.pathname,

    })
    const response = await fetch('/cart/change', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'post',
      body: body
    })
    const data = await response.json()
    const html = new DOMParser().parseFromString(data.sections['header-cart-dropdown'], 'text/html')
    this.content = html.querySelector('header-cart-dropdown').innerHTML
    document.querySelector('base-header-cart').item_count = data.item_count

    this.innerHTML = this.content
  }

  render() {
    if (!this._is_open) {
      return this.innerHTML = ''
    }
    this.innerHTML = this.content;
    this.deleteButtons = Array.from(this.querySelectorAll('button[data-delete]'));
  }

}
customElements.define('header-cart-dropdown', HeaderCartDropdown);