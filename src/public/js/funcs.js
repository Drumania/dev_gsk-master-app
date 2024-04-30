$(document).ready(function () {
  console.log("ready!");

  let submenuFirst = $(".submenu-first"),
    submenuSecond = $(".submenu-second"),
    submenuMagni = $(".submenu-magnifier"),
    wrapNavExtend = $(".wrap-nav-extend"),
    wrapMenuLinks = $(".wrap-menu a");

  // Oculta todos los submenús al principio
  submenuFirst.hide();
  submenuSecond.hide();
  submenuMagni.hide();

  function toggleSubmenus(submenuToShow) {
    // Oculta todos los submenús
    submenuFirst.hide();
    submenuSecond.hide();
    submenuMagni.hide();

    // Muestra el submenú especificado
    submenuToShow.show();
  }

  wrapMenuLinks.on("click", function (e) {
    let submenuToShow = $(this)
      .parent()
      .next(".wrap-nav-extend")
      .find("." + $(this).attr("id").replace("nav-", "submenu-"));

    if ($(this).hasClass("active")) {
      // Si el enlace ya está activo, lo desactiva y oculta el menú extendido
      $(this).removeClass("active");
      wrapNavExtend.slideToggle("fast");
    } else {
      // Si el enlace no está activo, lo activa y muestra el menú extendido
      wrapMenuLinks.removeClass("active");
      $(this).addClass("active");
      if (!wrapNavExtend.is(":visible")) {
        wrapNavExtend.slideToggle("fast");
      }
    }

    // Muestra u oculta los submenús según el enlace clicado
    toggleSubmenus(submenuToShow);

    e.preventDefault();
  });
});

//wrap-nav-extend

const swiper = new Swiper(".swiper-home", {
  // Optional parameters

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperNotas = new Swiper(".swiper-notas", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  initialSlide: 1,
  slidesPerGroupSkip: 3,
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperDisease = new Swiper(".swiper-disease", {
  slidesPerView: 4,
  spaceBetween: 30,
  initialSlide: 1,
  width: 1400,
  centeredSlides: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperTreNotas = new Swiper(".swiper-tre-notas", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  centerInsufficientSlides: true,
  slidesPerView: 1,
  spaceBetween: 30,
  // Responsive breakpoints
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});
