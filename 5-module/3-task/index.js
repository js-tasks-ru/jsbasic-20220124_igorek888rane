function initCarousel() {
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselInner = document.querySelector(".carousel__inner");
  const slideWidth = carouselInner.offsetWidth;

  let currentIndex = 0;
  carouselArrowLeft.style.display = "none";

  carouselArrowRight.addEventListener("click", () => {
    currentIndex++;
    carouselArrowLeft.style.display = '';
    carouselInner.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    if (currentIndex === carouselInner.children.length - 1) {
      carouselArrowRight.style.display = "none";
      }
  });
  carouselArrowLeft.addEventListener('click',() =>{
    currentIndex--
    carouselInner.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    carouselArrowRight.style.display = "";
    if(currentIndex === 0){
      carouselArrowLeft.style.display = "none";
    }
  })
}

