if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();
        this.form = this.querySelector('form');
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.submitButton = this.querySelector('[type="submit"]');
        this.headerCartDropdown = document.querySelector('header-cart-dropdown')
        this.quantityInput = this.querySelector('[name="quantity"]')
        this.incrementBtn = this.querySelector('#increment')
        this.decrementBtn = this.querySelector('#decrement')
        this.buttons = [this.decrementBtn, this.incrementBtn]
        this.updateQuantity = this.updateQuantity.bind(this)
        this.attachedEvents()
      }

      disconnectedCallback () {
        this.removeEvents()
      }

      attachedEvents() {
        this.buttons.forEach((btn) => {
          const updateQuantity = () => this.updateQuantity(btn.id === 'increment')
          btn.addEventListener('click', updateQuantity);
          btn.updateQuantity = updateQuantity
        });
      }

      removeEvents() {
        this.buttons.forEach((btn) => {
          btn.removeEventListener('click', btn.updateQuantity);
        });
        this.buttons = [];
      }

      updateQuantity(increment) {
        let qty = parseInt(this.quantityInput.value)
        if (qty === 1 && !increment) return
        if (increment) {
          qty++
        } else {
          qty--
        }
        this.quantityInput.value = qty
      }

      async onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
        this.submitButton.setAttribute('aria-disabled', true);
        const formData = new FormData(this.form);
        let body = Object.fromEntries(formData);
        body = {
          ...body,
          'sections': 'header-cart-dropdown',
          'sections_url': window.location.pathname,
        }
        const response = await fetch('/cart/add', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          method: 'post',
          body: JSON.stringify(body),
        })
        const data = await response.json()
        const html = new DOMParser().parseFromString(data.sections['header-cart-dropdown'], 'text/html')
        const headerDropdown = html.querySelector('header-cart-dropdown')
        document.querySelector('base-header-cart').item_count = headerDropdown.getAttribute('item_count')
        this.headerCartDropdown.content = headerDropdown.innerHTML
        this.submitButton.setAttribute('aria-disabled', false);
      }

      handleErrorMessage(errorMessage = false) {

      }
    }
  );
}
