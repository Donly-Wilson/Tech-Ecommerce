// Initialize Swiper
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 40,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2300,
    // delay: 0,
    disableOnInteraction: true,
    waitForTransition: true,
  },
  speed: 3000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // 640: {
    //   slidesPerView: 2,
    //   spaceBetween: 20,
    // },
    766: {
      slidesPerView: 2,
      spaceBetween: 34,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 34,
    },
  },
});
