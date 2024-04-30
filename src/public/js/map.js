const selectDepartments = document.getElementById('deparments');
const selectCities = document.getElementById('cities');
let departments = [];
let cities = [];
var map, geocoder, infowindow, cityName = null;

function getLocationByAddress(address, html, index, center = false, showAlert = false) {
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();

      let marker = new google.maps.Marker({
        position: {
          "lat": lat,
          "lng": lng
        },
        map: map,
      });

      if (center) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(17);
      }

      $(`#venue-${index}`).attr('data-lat', lat).attr('data-lng', lng);

      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(html);
          infowindow.open(map, marker);
        }
      })(marker));
    } else if (showAlert) {
      alert('Lo sentimos, no encontramos la localización');
    }
  });
}

function renderVenueToSidebar(html, index) {
  html = `
    <div class="venue-item" id="venue-${index}">
      ${html}
    </div>
  `;
  $('#map-sidebar').append(html);
}

// RENDER MAP
function renderMap(
  location = { "lat": 4.570868, "lng": -74.297333 },
  zoom = 6,
  markers = [],
  venues = [],
  city
) {
  // The location of Uluru
  const uluru = location;
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom,
    center: uluru,
  });
  infowindow = new google.maps.InfoWindow();
  geocoder = new google.maps.Geocoder();

  $('#map-sidebar').html('');
  if (venues && venues.length) {
    for (let i = 0; i < venues.length; i++) {
      let htmlItem = "";
      const address = `${venues[i].address}, ${city}`;
      let addressName = (venues[i].complement)
        ? `${venues[i].address} ${venues[i].complement}`
        : venues[i].address;

      htmlItem += `<div class="map-name">${venues[i].name}</div>`;
      htmlItem += `<div class="map-address">Dirección: <span class="address">${addressName}</span></div>`;
      htmlItem += (venues[i].phone && venues[i].phone !== '')
        ? `<div class="map-address">Teléfono: ${venues[i].phone}</div>`
        : ``;
      htmlItem += (venues[i].schedule && venues[i].schedule !== '')
        ? `<div class="map-address">Horarios: ${venues[i].schedule}</div>`
        : ``;

      if (i < 10) {
        getLocationByAddress(address, htmlItem, i);
      }

      renderVenueToSidebar(htmlItem, i);
    }
  }
  if (markers.length) {
    for (let i = 0; i < markers.length; i++) {
      let marker = new google.maps.Marker({
          position: markers[i][1],
          map: map,
        });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(markers[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
}

// GET DEPARTMENTS
(async function getDepartments() {
  try {
    const response = await fetch('/json/departments.json');
    const data = await response.json();

    departments = data;
    renderDepartments();
  } catch(error) {
    console.log(error);
  }
}());

// GET CITIES
(async function getCities() {
  try {
    const response = await fetch('/json/cities.json');
    const data = await response.json();

    cities = data;
  } catch(error) {
    console.log(error);
  }
}());

function renderDepartments() {
  let html = `<option value="">-Filtrar por Departamento-</option>`;

  departments.forEach(element => {
    html += `<option value="${element.id}">${element.name}</option>`
  });

  selectDepartments.innerHTML = html;
}

selectDepartments.addEventListener('change', (event) => {
  const value = event.target.value;

  if (value === '') {
    renderMap();
  }

  filterCity(value)
});

// function selectedDepartment(department_id) {
  // const department = departments.filter((item) => (parseInt(item.id) === parseInt(department_id)));
  // const markers = [
  //   [department[0].name, department[0].location]
  // ];
  // renderMap(department[0].location, 7, markers);
// }

function filterCity(department_id) {
  const listCities = cities.filter((item) => (parseInt(item.department_id) === parseInt(department_id)));

  let html = `<option value="">-Filtrar por Ciudad/Municipio-</option>`;

  listCities.forEach(element => {
    html += `<option value="${element.id}">${element.name}</option>`
  });

  selectCities.innerHTML = html;
}

selectCities.addEventListener('change', async (event) => {
  const value = event.target.value;
  const city = cities.filter((item) => (parseInt(item.id) === parseInt(value)));
  const { location, zoom, name, id } = city[0];
  const zoom_view = (zoom) ? zoom : 10;
  const responseVenues = await fetch(`/json/venues/${id}.json`);
  let venues = [];
  cityName = name;

  if (responseVenues.status === 200) {
    venues = await responseVenues.json();
  }
  if (venues.length) {
    renderMap(location, zoom_view, [], venues, name);
  } else {
    $('#map-sidebar').html('<h3>Lo sentimos, no hemos encontrado los puntos de vacunación.</h3>');
  }
});

$(document).ready(function() {
  $(document).on('click', '.venue-item', function() {
    const lat = $(this).attr('data-lat');
    const lng = $(this).attr('data-lng');

    if (lat && lng) {
      map.setCenter({
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
      map.setZoom(17);
    } else {
      const html = $(this).html();
      let index = $(this).attr('id');
      index = index.split('-')
      const address = $(this).find('.address').html();

      getLocationByAddress(`${address}, ${cityName}`, html, index[1], true, true);
    }
  });
});
