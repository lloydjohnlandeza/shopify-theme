if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.submitButton = this.querySelector('[type="submit"]');

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
        console.log(headerDropdown.getAttribute('item_count'))
        // // this.content = html.querySelector('header-cart-dropdown').innerHTML
        // document.querySelector('base-header-cart').item_count = data.item_count
        document.querySelector('base-header-cart').item_count = headerDropdown.getAttribute('item_count')
        this.submitButton.setAttribute('aria-disabled', false);
      }

      handleErrorMessage(errorMessage = false) {
        // if (this.hideErrors) return;

        // this.errorMessageWrapper =
        //   this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        // if (!this.errorMessageWrapper) return;
        // this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        // this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        // if (errorMessage) {
        //   this.errorMessage.textContent = errorMessage;
        // }
      }
    }
  );
}
