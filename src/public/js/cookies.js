const COOKIES = document.cookie;

function getModalCookie() {
  let list_cookies = COOKIES.split(';');
  let modal_cookies = list_cookies.filter((item) => item.indexOf('mevacunopor_mc=') >= 0);
  if (modal_cookies.length) {
    modal_cookies = modal_cookies[0].split('mevacunopor_mc=');
    modal_cookies = modal_cookies[1];
    modal_cookies = modal_cookies.split('.');
  } else {
    modal_cookies = null;
  }
  return modal_cookies;
}

function showModalCookie() {
  $('#cookies-show').hide();
  $('#cookies-hide').show();
  $('.cookies-list').hide();
  $('#cookies-modal').addClass('visible');
}

if (COOKIES) {
  let list_cookies = getModalCookie();

  if (!list_cookies) {
    showModalCookie();
  } else {
    for(let i = 0; i < list_cookies.length; i++) {
      if (list_cookies[i] !== '') {
        $(`#cookies-${list_cookies[i]}`).prop('checked', true);
      }
    }
  }
} else {
  showModalCookie();
}

$('#cookies-hide').click(function() {
  $(this).hide();
  $('#cookies-show').show();
  $('.cookies-list').toggle();
});

$('#cookies-show').click(function() {
  $(this).hide();
  $('#cookies-hide').show();
  $('.cookies-list').toggle();
});

$('.cookies-item input[type=checkbox]').change(function() {
  let checked = $(".cookies-item input[type=checkbox]:checked").length;

  if (checked > 0) {
    $('#cookies-accepted').html('ACEPTAR');
  } else {
    $('#cookies-accepted').html('ACEPTAR TODAS');
  }
});

$('#cookies-no-accepted').click(function() {
  document.cookie = `mevacunopor_mc=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  $('#cookies-modal').removeClass('visible');
});

$('.cookies-button').click(function() {
  showModalCookie();
});

$('#cookies-accepted').click(function() {
  let checked = $(".cookies-item input[type=checkbox]:checked").length;
  let cookie = "";

  if (checked) {
    let checkedPerformance = $("#cookies-performance:checked").length;
    let checkedFunctionals = $("#cookies-functionals:checked").length;
    let checkedPublish = $("#cookies-publish:checked").length;

    if (checkedPerformance) cookie += 'performance.';
    if (checkedFunctionals) cookie += 'functionals.';
    if (checkedPublish) cookie += 'publish.';
  } else {
    cookie = "performance.functionals.publish."
  }

  let expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 180);

  document.cookie = `mevacunopor_mc=${cookie}; expires=${expiresDate}; path=/`;
  $('#cookies-modal').removeClass('visible');
});
