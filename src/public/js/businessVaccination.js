const content = document.getElementById("diseases-content");

const diseases = async () => {
  try {
    const respuesta = await fetch("/json/businessVaccination.json");
    const data = await respuesta.json();
    content.innerHTML = "";
    print(data);
  } catch (error) {
    console.log(`error ${error}`);
  }
};

const print = (data) => {
  let html = "";
  html = `<div class="row">`;
  data.forEach((element) => {
    html += `
        <div class="col-12 col-sm-6 col-md-4 home-know-vaccination-box">
          <img src="${element.coverpage}" alt="${element.name}" />
          <div class="home-know-vaccination-diseases-box">
            <h6>${element.title}</h6>
            <a href="vacunacion-empresarial/${element.slug}" >VER MÁS</a>
          </div>
        </div>
      `;
  });
  html += "</div>";
  content.innerHTML += html;
};

diseases();
