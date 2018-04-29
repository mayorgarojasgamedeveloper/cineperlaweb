if(Cookies.get('adminId') != null) {
  window.location.replace("./inicio.html");
}

$('document').ready(function() {


  $('#btn_login').click(function() {

    var usuario = $('#user').val();
    var contrasena = $('#contrasena').val();


    var adminExiste = $.ajax({url: `http://localhost:3000/admin/existe?usuario=${usuario}&contrasena=${contrasena}`, method: 'get'});
    adminExiste.done( (data) => {
      console.log(data);
      if(data.name === 'error'){
        swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
      }else{
        console.log(data);
        if(jQuery.isEmptyObject(data)) {
          swal('Usuario o contrasena incorrecta!');
        } else {
          Cookies.set('adminId', data[0].adminid);
          console.log(Cookies.get('adminId'));
          window.location.replace("./inicio.html");
        }
      }
    });

  });

});
