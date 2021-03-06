if(Cookies.get('usuarioId') != null) {
  window.location.replace("./index.html");
}

$(document).ready( () => {


  var button = $('#button');
  var form = $('#form');
  var inputs = form.find('input, textarea');

  button.click(function() {
    form.find('p').remove();
    var status = 0;
    $.each(inputs, (index,value) => {
      var element = $(value);
      status += validate(element);
    });

    if(status === 0)
      crear();
  });

  function validate(element) {
    var type = element.attr('type');
    var value = element.val();
    if(type === 'text' && (value.length < 4)) {
      $('<p>Error en el campo.</p>').insertAfter(element);
      return 1;
    }
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(type === 'email' && (!regex.test(value) || value.length===0)) {
      $('<p>Email invalido</p>').insertAfter(element);
      return 1;
    }
    if(type === 'password' && (value.length < 4 || value.length > 20)) {
      $('<p>Contrasena invalida</p>').insertAfter(element);
      return 1;
    }
    return 0;
  }

  function crear() {
    var crearUsuario = $.ajax({url: 'http://localhost:3000/usuario', data: form.serialize(), method: 'post'});
    crearUsuario.done( (data) => {
      if(data.name === 'error'){
        swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
      }else{
        swal("Bienvenido!", "Su usuario se ha creado exitosamente!")
        .then((value) => {
          window.location.replace("./login.html");
        });
      }
    });
  }
});
