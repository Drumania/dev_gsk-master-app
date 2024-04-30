$(document).ready(function () {
  function closeLinkModal() {
    $("#link-modal").removeClass("visible");
    $("#link-modal a").attr("href", "");
  }

  $("#menu-interest a").click(function (e) {
    e.preventDefault();
    const link = $(this).attr("href");
    $("#link-modal").addClass("visible");
    $("#link-modal a").attr("href", link);
  });

  $(".link-cancel").click(function () {
    closeLinkModal();
  });
  $("#link-modal a").click(function () {
    setTimeout(() => {
      closeLinkModal();
    }, 10);
  });

  (async function getSliderFooter() {
    const request = await fetch("/json/slider-footer.json");
    const response = await request.json();
    let html = "";

    for (let i = 0; i < response.length; i++) {
      html += `
        <a href="${response[i].link}" target='${response[i].target}'>
          <img src="${response[i].image}" alt="${response[i].name}" />
        </a>
      `;
    }

    $("#slider-footer").html(html);
    if (response.length) {
      $("#slider-footer").slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: false,
        nextArrow: false,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: "#slider-footer-arrow-left",
        nextArrow: "#slider-footer-arrow-right",
      });
    }
  })();
});
