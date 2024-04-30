function mobileClick(id) {
  $('#accordion-button').click();
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

$(document).ready(function() {
  (async function getVaccinate() {
    const request = await fetch('/json/when-to-vaccinate.json');
    const response = await request.json();
    let menuHtml = "";
    let menuMobileHtml = "";
    let contentHtml = "";

    for (let i = 0; i < response.length; i++) {
      const vaccines = response[i].vaccines;
      menuHtml += `
        <div style="background-color: ${response[i].color}">
          <a href="/cuando-vacunar#${response[i].id}">
            ${response[i].title}
          </a>
        </div>
      `;

      menuMobileHtml += `
        <li style="background-color: ${response[i].color}">
          <a href="/cuando-vacunar#${response[i].id}" onclick="mobileClick('#${response[i].id}')">
            ${response[i].title}
          </a>
        </li>
      `;

      contentHtml += `
        <div id="${response[i].id}" class="vaccine-row">
          <div style="background-color: ${response[i].color}" class="vaccine-title">
            <span class="${response[i].icon}"></span>
            <h4>${response[i].title}</h4>
          </div>
          <div class="vaccine-content">`;
      for(let j = 0; j < vaccines.length; j++) {
        contentHtml += `
            <div class="vaccine-description">
              <span class="icon-syringes" style="color: ${response[i].color}"></span>
              <div>
                <h4 style="color: ${response[i].color}">${vaccines[j].title}</h4>
                <div class="vaccine-diseases">
                  <div style="color: ${response[i].color}" class="vaccine-title-diseases">Enfermedad que previene:</div>
                  <div class="vaccine-text-diseases">${vaccines[j].diseases}</div>
                </div>
              </div>
            </div>
        `;
      }

      contentHtml += `
          </div>
        </div>
      `;
    }

    $('#menu-when-vacinate').html(menuHtml);
    $('#mobile-menu-when-vacinate').html(menuMobileHtml);
    $('#when-vaccinate-content').html(contentHtml);
  }());

  $(window).scroll(function() {
    const position = $(window).scrollTop();
    const width = $(window).width();
    const status = isInViewport(document.getElementById('footer-title'));

    if (position > 360 && width >= 768 && !status) {
      $('.menu-when-vacinate').css('position', 'fixed');
      $('.menu-when-vacinate').css('top', '0');
    } else if (width >= 768) {
      $('.menu-when-vacinate').css('position', 'initial');
      $('.menu-when-vacinate').css('top', 'initial');
    }

    if (position > 590 && width < 768) {
      $('#go-to-top').css('display', 'flex');
    } else if (width < 768) {
      $('#go-to-top').css('display', 'none');
    }
  });

  $('#go-to-top').click(function(){
    $('html, body').scrollTop(500);
  });
});