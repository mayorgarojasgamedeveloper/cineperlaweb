if(Cookies.get('usuarioId') == null) {
  window.location.replace("./index.html");
}

$('document').ready(function() {

  var usuarioId = Cookies.get('usuarioId');

  var usuario_informacion = $.ajax({url: `http://localhost:3000/usuario?usuarioId=${usuarioId}`, method: 'get'});
  usuario_informacion.done( (data) => {
    var usuario = data[0];
    var html = ``;
    if(!usuario.premium) {
      html += `<h2 class="display-1 text-center">${usuario.usuario}</h2>`;
    } else {
      html += `<h2 class="display-1 text-center">${usuario.usuario} <span>Premium</span> </h2>`;
    }
    html += `<h3>Nombre: ${usuario.nombre}</h3>`;
    html += `<h3>Apellido: ${usuario.apellido}</h3>`;
    html += `<h3>Correo: ${usuario.correo}</h3>`;
    html += `<br><br>`;
    html += `<h3>Forma de pago</h3>`;
    html += `<p>Tarjeta de credito: XXXX XXXX XXXX XXXX</p>`;

    if(!usuario.premium) {
      html += `<form class="bloque">`;
      html += `<h3>Hacerme premium</h3>`;
      html += `<button type="button" id="hacerPremium" class="btn btn-warning">Premium</button>`;
      html += `</form>`;
    }

    $('#usuario').append(html);
  });

  $('#usuario').on('click', '#hacerPremium', function() {

    swal({
      title: "Estas Seguro?",
      text: `Total: $50 pesos\nMetodo de pago: Tarjeta de Credito\nNumero de tarjeta: XXXX XXXX XXXX 1234`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        var hacer_premium = $.ajax({url: `http://localhost:3000/usuario/prem`, data: {usuarioId: usuarioId}, method: 'put'});
        hacer_premium.done((data) => {
          if(data.name === 'error'){
            swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
          }else{
            swal({
              title: "Felicidades!",
              text: "Ahora eres premium!",
              icon: "success",
            })
            .then((value) => {
              location.reload();
            });
          }
        });

      } else {
        swal("Se cancelo la transaccion!");

      }
    });

  });


});
