$(document).ready( () => {

  var button = $('#button');
  var form = $('#form');
  var inputs = form.find('input, textarea');

  var idPeliculaSelect = $('#id-pelicula');
  var peliculas;
  var currentPeliculaId;

  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get", });

  lista_peliculas.done((data) => {
    peliculas = data;
    var html = ``;
    $.each(peliculas, (index, value) => {
      html += `<option value="${index}">${value.nombre}</option>`;
    });
    idPeliculaSelect.append(html);
  });

  idPeliculaSelect.change(() => {
    var pelicula = peliculas[idPeliculaSelect.val()];
    currentPeliculaId = pelicula.peliculaid;
    $('#nombre').val(pelicula.nombre);
    $('#categoria').val(pelicula.categoria);
    $('#duracion').val(pelicula.duracion);
    $('#restriccion').val(pelicula.restriccion);
    $('#director').val(pelicula.director);
    $('#actores').val(pelicula.actores);
    $('#portada').val(pelicula.portada);
    $('#sinopsis').val(pelicula.sinopsis);
    button.prop('disabled', false);
  });



  button.click(function() {
    form.find('p').remove();
    var status = 0;
    $.each(inputs, (index,value) => {
      var element = $(value);
      status += validate(element);
    });

    if(status === 0)
      modificar();
  });

  function validate(element) {
    var type = element.attr('type');
    var value = element.val();
    if(type === 'text' && (value.length === 0)) {
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

  function modificar() {

    var formArray = form.serializeArray();
    var newData = {};
    for (var i = 0; i < formArray.length; i++){
      newData[formArray[i]['name']] = formArray[i]['value'];
    }
    newData['peliculaId'] = currentPeliculaId;

    var crearPelicula = $.ajax({url: 'http://localhost:3000/pelicula', data: newData, method: 'put'});
    crearPelicula.done( (data) => {
      if(data.name === 'error'){
        swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
      }else{
        swal("Exito!", "La pelicula se ha modificado correctamente!")
        .then((value) => {
          location.reload();
        });
      }
    });
  }
});
