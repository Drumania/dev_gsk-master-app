const content = document.getElementById("disease-content");

(async function disease() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  try {
    const respuesta = await fetch(JSON_FILE);
    const data = await respuesta.json();
    content.innerHTML = "";
    print(data);
  } catch (error) {
    console.log(`error ${error}`);
  }
})();

const print = (data) => {
  const menuDesktop = document.getElementById("items-menu-diseases");
  const menuMobile = document.getElementById("menu-diseases-mobile");
  let htmlMenu = "";
  // let htmlMobileMenu = "";

  data.forEach((element) => {
    const disease = DISEASE || DEFAULT_DISEASE;
    let title = element.titleMenu ? element.titleMenu : element.title;
    htmlMenu += `
      <a href="/${GET_ROUTE}/${element.slug}">${title}</a>
    `;

    if (element.slug === disease) {
      render(element);
    }
  });

  menuDesktop.innerHTML = htmlMenu;
  menuMobile.innerHTML = htmlMenu;
};

function render(data) {
  const { title, image, contents, diseases, titlePage, hide_image } = data;
  let html = "";
  if (titlePage) {
    html += `<h1>${titlePage}</h1>`;
  } else {
    html += `<h1>${title.toUpperCase()}</h1>`;
  }
  if (!hide_image) {
      html += `<img src="${image}" alt="${title}"/>`;
  }

  const contents_html = contentsToHtml(contents);
  html += contents_html;

  if (diseases) {
    for (let i = 0; i < diseases.length; i++) {
      const {
        id,
        title: disease_title,
        image: disease_image,
        contents: disease_contents,
      } = diseases[i];
      const disease_contents_html = contentsToHtml(disease_contents);
      html += `
        <div id="${id}">
          <div class="disease-subtitle">
            <h2>${disease_title.toUpperCase()}</h2>
          </div>
          <img src="${disease_image}" alt="${title}"/>
          ${disease_contents_html}
        </div>
      `;
    }
  }

  content.innerHTML = html;
}

function contentsToHtml(contents) {
  let html = "";

  for (let i = 0; i < contents.length; i++) {
    const { subtitle, content, menu, order_list } = contents[i];
    html += `
      <div class="disease">
        <h5>${subtitle}</h5>
    `;
    if (content) {
      for (let j = 0; j < content.length; j++) {
        const {
          text: content_text,
          list: content_list,
          order_list: content_order_list,
          image: content_image,
          video_title,
          youtube_video,
          iframe,
          download,
          infographic,
          gallery,
        } = content[j];
        if (content_text) {
          html += `<p>${content_text}</p>`;
        }
        if (content_image) {
          html += `<img src="${content_image}" alt="content image"/>`;
        }
        if (infographic) {
          html += `<img src="${infographic}" class='infographic' alt="content image"/>`;
        }
        if (content_list) {
          html += `<ul class="disese-order-list">`;
          for (let k = 0; k < content_list.length; k++) {
            html += `
              <li>${content_list[k].text}</li>
            `;
          }
          html += `</ul>`;
        }
        if (content_order_list) {
          html += `<ol class="disese-order-list">`;
          for (let k = 0; k < content_order_list.length; k++) {
            html += `
              <li>${content_order_list[k].text}</li>
            `;
          }
          html += `</ol>`;
        }
        if (gallery) {
            html += `<div class='gallery'>`;
            gallery.forEach(item => {
                html += `<img src="${item}" class='item-gallery' alt="Gallery"/>`;
            })
            html += `</div>`;
        }
        if (youtube_video) {
          html += '<div class="iframe">';
          if (video_title) {
            html += `<h5>${video_title}</h5>`;
          }
          html += `
              <iframe class='iframe-video' src="${youtube_video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `;
          html += '</div>';
        }
        if (iframe) {
          html += '<div class="iframe">';
          html += `<iframe class='iframe-file' src='${iframe}'></iframe>`;
          if (download) {
            html += `
              <a href='${iframe}' target='_blank' class='iframe-download'>
                <img src='/images/download-icon.svg' />
                Descargar
              </a>`;
          }
          html += '</div>';
        }
      }
    }
    if (menu) {
      html += `<ul class="disese-menu">`;
      for (let j = 0; j < menu.length; j++) {
        const { link, text: text_menu } = menu[j];
        html += `
          <li>
            <a href="${link}">${text_menu}</a>
          </li>
        `;
      }
      html += `</ul>`;
    }
    if (order_list) {
      html += `<ol class="disese-order-list">`;
      for (let j = 0; j < order_list.length; j++) {
        html += `
          <li>${order_list[j].text}</li>
        `;
      }
      html += `</ol>`;
    }
    html += `
      </div>
    `;
  }

  return html;
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

$(document).ready(function () {
  $(window).scroll(function (e) {
    const position = $(window).scrollTop();
    const width = $(window).width();
    const status = isInViewport(document.getElementById("footer-title"));

    if (position > 360 && width >= 768 && !status) {
      $("#menu-diseases").addClass("fixed");
    } else if (width >= 768) {
      $("#menu-diseases").removeClass("fixed");
    }

    if (position > 590 && width < 768) {
      $("#go-to-top").css("display", "flex");
    } else if (width < 768) {
      $("#go-to-top").css("display", "none");
    }
  });

  $("#go-to-top").click(function () {
    $("html, body").scrollTop(470);
  });
});
