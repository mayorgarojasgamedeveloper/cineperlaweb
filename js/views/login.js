$('document').ready(function() {

  $('#btn_login').click(function() {

    var usuario = $('#user').val();
    var contrasena = $('#contrasena').val();


    var crearPelicula = $.ajax({url: `http://localhost:3000/usuario/existe?usuario=${usuario}&contrasena=${contrasena}`, method: 'get'});
    crearPelicula.done( (data) => {
      if(data.name === 'error'){
        swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
      }else{
        console.log(data);
        if(jQuery.isEmptyObject(data)) {
          swal('Usuario o contrasena incorrecta!');
        } else {
          Cookies.set('usuarioId', data[0].usuarioid);
          console.log(Cookies.get('usuarioId'));
        }
      }
    });

  });

});
