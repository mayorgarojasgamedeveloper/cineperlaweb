$('document').ready(function() {

  $('#cerrar-sesion').on('click', function() {
    Cookies.remove('adminId');
    console.log('Sesion cerrada');
    window.location.replace("../index.html");
  });


});
