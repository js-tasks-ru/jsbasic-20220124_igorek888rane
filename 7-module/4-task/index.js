export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.sliderCreate(steps, value);
    this.sliderSteps.children[value].classList.add("slider__step-active");
    this.sliderClick(steps, value);
    this.sliderMove(steps);
  }
  sliderCreate(steps, value) {
    this.slider = document.createElement("div");
    this.slider.classList.add("slider");
    this.slider.innerHTML = `<div class="slider__thumb">
    <span class="slider__value">${value}</span>
  </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>
</div>`;
    this.sliderSteps = this.slider.querySelector(".slider__steps");
    for (let i = 0; i < steps; i++) {
      this.sliderSteps.insertAdjacentHTML("beforeEnd", `<span></span>`);
    }

    return this.slider;
  }
  sliderClick(steps, value) {
    this.sliderValue = this.elem.querySelector(".slider__value");
    this.sliderThumb = this.elem.querySelector(".slider__thumb");
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.sliderSteps = this.elem.querySelector(".slider__steps");

    this.sliderThumb.style.left = `${(value / (steps - 1)) * 100}%`;
    this.sliderProgress.style.width = `${(value / (steps - 1)) * 100}%`;

    this.slider.addEventListener("click", (event) => {
      this.coordinateClick =
        event.clientX - this.elem.getBoundingClientRect().left;
      this.relativeClick = this.coordinateClick / this.elem.offsetWidth;
      this.segment = steps - 1;
      this.approximateValue = this.relativeClick * this.segment;
      this.value = Math.round(this.approximateValue);
      this.valuePercents = (this.value / this.segment) * 100;

      this.sliderValue.innerHTML = this.value;
      this.sliderSteps.children[this.value].classList.add(
        "slider__step-active"
      );
      this.sliderThumb.style.left = `${this.valuePercents}%`;
      this.sliderProgress.style.width = `${this.valuePercents}%`;

      this.SliderChangeEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(this.SliderChangeEvent);
    });
  }
  sliderMove(steps) {
    this.sliderThumb.onpointerdown = (event) => {
      event.preventDefault();
      this.sliderThumb.style.position = "absolute";
      this.sliderThumb.style.zIndex = 1000;
      document.onpointermove = (event) => {
        this.slider.classList.add("slider_dragging");

        for (let i = 0; i < this.sliderSteps.children.length; i++) {
          this.sliderSteps.children[i].classList.remove("slider__step-active");
        }

        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let leftPercents = leftRelative * 100;

        this.sliderThumb.style.left = `${leftPercents}%`;
        this.sliderProgress.style.width = `${leftPercents}%`;

        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        this.sliderSteps.children[value].classList.remove(
          "slider__step-active"
        );

        this.sliderSteps.children[value].classList.add("slider__step-active");
        this.sliderValue.innerHTML = value;
        document.onpointerup = () => {
          let valuePercents = (value / segments) * 100;

          this.slider.classList.remove("slider_dragging");
          this.sliderValue.innerHTML = value;
          this.sliderThumb.style.left = `${valuePercents}%`;
          this.sliderProgress.style.width = `${valuePercents}%`;
          this.sliderSteps.children[value].classList.add("slider__step-active");

          this.pointerUpEvent = new CustomEvent("slider-change", {
            detail: value,
            bubbles: true,
          });
          this.sliderThumb.dispatchEvent(this.pointerUpEvent);

          document.onpointerup = null;
          document.onpointermove = null;
        };
      };

      this.sliderThumb.ondragstart = () => false;
    };
  }
}
