class BaseSlider extends HTMLElement {
  constructor() {
    super();
    this.items;
    this.container_items;
    this.itemWidth;
    this.previousBtn;
    this.nextBtn;
    this.translateX = 0;
    this.max = 0;
    this.itemToShow = 3;
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

    this.nextCount = 0;
  }

  connectedCallback() {
    this.items = Array.from(this.querySelectorAll("li"));
    this.container_items = this.querySelector("ul");
    if (this.items.length <= 0) return;
    this.max = this.items.length - this.itemToShow;
    this.previousBtn = this.querySelector("#prev");
    this.nextBtn = this.querySelector("#next");
    this.itemWidth = this.items[0].clientWidth;

    this.nextBtn.addEventListener("click", this.handleNext);
    this.previousBtn.addEventListener("click", this.handlePrev);
  }

  handlePrev() {
    if (this.nextCount <= 0) return;
    this.nextCount--;
    this.translateX = this.translateX + this.itemWidth;
    this.container_items.style.transform = `translateX(${this.translateX}px)`;
  }

  handleNext() {
    if (this.nextCount >= this.max) {
      this.nextCount = 0;
      this.translateX = 0;
      this.container_items.style.transform = `translateX(${this.translateX}px)`;
      return;
    }
    this.nextCount++;
    this.translateX = this.translateX + this.itemWidth * -1;
    this.container_items.style.transform = `translateX(${this.translateX}px)`;
  }
}

// Define the new element
customElements.define("base-slider", BaseSlider);
