if (!customElements.get("product-showcase")) {
  customElements.define(
    "product-showcase",
    class ProductShowcase extends HTMLElement {
      static get observedAttributes() {
        return ["active"];
      }
      constructor() {
        super();
        this.displayImages = this.querySelectorAll("img[data-display-id]");
        this.thumbnails = this.querySelectorAll("div[data-thumbnail-id]");
        this.previousBtn = this.querySelector("#previous");
        this.nextBtn = this.querySelector("#next");
        this.navigation = [this.previousBtn, this.nextBtn];
        this.lightbox = this.nextElementSibling;
        this.attachedEvents();
        this._active = 0;
        this.render();
      }

      get active() {
        return this._active;
      }

      set active(value) {
        this.setAttribute("active", value);
        this._active = parseInt(value);
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name === "active") {
          this._active = parseInt(newValue);
        }
        this.render();
      }

      disconnectedCallback() {
        this.removeEvents();
      }

      attachedEvents() {
        if (!this.navigation || !this.thumbnails || !this.displayImages) {
          console.error("Required elements not found.");
          return;
        }
        this.navigation.forEach((btn) => {
          const handleNavigate = () => this.handleNavigate(btn.id === "next");
          btn.addEventListener("click", handleNavigate);
          btn.handleNavigate = handleNavigate;
        });
        this.thumbnails.forEach((thumbnail) => {
          const handleOnClickThumbnail = () =>
            this.handleOnClickThumbnail(thumbnail);
          thumbnail.addEventListener("click", handleOnClickThumbnail);
          thumbnail.handleOnClickThumbnail = handleOnClickThumbnail;
        });

        this.displayImages.forEach((image) => {
          const handleImageClick = () => this.handleImageClick(image);
          image.addEventListener("click", handleImageClick);
          image.handleImageClick = handleImageClick;
        });
      }

      removeEvents() {
        if (!this.navigation || !this.thumbnails || !this.displayImages) {
          console.error("Required elements not found.");
          return;
        }
        this.navigation.forEach((btn) => {
          btn.removeEventListener("click", btn.handleNavigate);
          btn.handleNavigate = null;
        });

        this.thumbnails.forEach((thumbnail) => {
          thumbnail.removeEventListener(
            "click",
            thumbnail.handleOnClickThumbnail
          );
          thumbnail.handleOnClickThumbnail = null;
        });
        this.displayImages.forEach((images) => {
          images.removeEventListener("click", images.handleOnClickThumbnail);
          images.handleOnClickThumbnail = null;
        });
        this.navigation = [];
        this.thumbnails = [];
        this.displayImages = [];
      }

      handleImageClick(image) {
        const id = image.getAttribute("data-display-id");
        if (!this.lightbox) return;
        this.lightbox.showModal();
      }

      handleOnClickThumbnail(thumb) {
        const id = thumb.getAttribute("data-thumbnail-id");
        if (!id) return;
        this._active = parseInt(id);
        this.render();
      }

      handleNavigate(next) {
        const imagesLength = this.displayImages.length - 1;
        if (next) {
          this._active = this._active < imagesLength ? this._active + 1 : 0;
        } else {
          this._active = this._active > 0 ? this._active - 1 : imagesLength;
        }

        this.render();
      }

      render() {
        if (!this.displayImages || !this.thumbnails) return;
        const productsShowcase =
          this.lightbox?.querySelector("product-showcase");
        if (productsShowcase) {
          productsShowcase.setAttribute("active", this._active);
        }

        const displayImages = Array.from(this.displayImages);
        const thumbnails = Array.from(this.thumbnails);

        displayImages.forEach((element, index) => {
          const thumbnail = thumbnails[index];
          const thumbnailImage = thumbnail.querySelector("img");
          const isActive = index === this._active;

          element.classList.toggle("opacity-100", isActive);
          element.classList.toggle("pointer-events-auto", isActive);
          element.classList.toggle("pointer-events-none", !isActive);
          element.classList.toggle("opacity-0", !isActive);

          thumbnail.classList.toggle("border-my-white", !isActive);
          thumbnail.classList.toggle("border-my-orange", isActive);

          if (thumbnailImage) {
            thumbnailImage.classList.toggle("opacity-50", isActive);
          }
        });
      }
    }
  );
}
