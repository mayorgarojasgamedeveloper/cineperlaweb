if(Cookies.get('adminId') == null) {
  window.location.replace("../index.html");
}

$(document).ready( () => {

  var button = $('#button');
  var form = $('tbody');
  var idPeliculaSelect = $('#id-pelicula');
  var diaInput = $('#dia');
  var horaInput = $('#hora');

  button.click(function() {
    form.find('p').remove();
    var status = 0;

    status += validate(diaInput);
    status += validate(horaInput);

    if(status === 0)
      crear();
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

  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get", });

  lista_peliculas.done((data) => {
    peliculas = data;
    var html = ``;
    html += `<option value="-1">Selecciona una pelicula</option>`;
    $.each(peliculas, (index, value) => {
      html += `<option value="${value.peliculaid}">${value.nombre}</option>`;
    });
    idPeliculaSelect.append(html);

  });

  idPeliculaSelect.change(() => {

    var pelicula = idPeliculaSelect.val();

    if(pelicula === '-1') {
      button.prop('disabled', true);
    } else {
      button.prop('disabled', false);
    }


    var lista_funciones = $.ajax({url: "http://localhost:3000/funcion/" + pelicula, method: "get", });
    lista_funciones.done((data) => {
      peliculas = data;
      var html = ``;
      $.each(peliculas, (index, value) => {
        var asientos = 30 - parseInt(value.asientos);
        html += `<tr>`;
        html += `<td>${value.funcionid}</td>`;
        html += `<td>${value.peliculaid}</td>`;
        html += `<td>${value.dia}</td>`;
        html += `<td>${value.hora}</td>`;
        html += `<td>${asientos}</td>`;
        html += `</tr>`;
      });
      $('#funciones').find('tr, td').remove();
      $('#funciones').append(html);

    });
  });

  function crear() {

    var funcion = {
      peliculaId: idPeliculaSelect.val(),
      dia: diaInput.val(),
      hora: horaInput.val()
    }

    var crearPelicula = $.ajax({url: 'http://localhost:3000/funcion', data: funcion, method: 'post'});
    crearPelicula.done( (data) => {
      if(data.name === 'error'){
        swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
      }else{
        swal("Exito!", "Se creo la funcion correctamente!")
        .then((value) => {
          location.reload();
        });
      }
    });
  }

});
