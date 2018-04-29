$(document).ready( () => {

  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get" });
  lista_peliculas.done((peliculas) => {

    $.each(peliculas, (index, value) => {
      var lista_funciones = $.ajax({url: "http://localhost:3000/funcion/" + value.peliculaid, method: "get", });
      lista_funciones.done((funciones) => {
        var html = ``;
        $.each(funciones, (indexF, valueF) => {
          var asientos = 30 - parseInt(valueF.asientos);
          html += `<tr>`;
              html += `<td>${valueF.funcionid}</td>`;
              html += `<td>${value.nombre}</td>`;
              html += `<td>${valueF.dia}</td>`;
              html += `<td>${valueF.hora}</td>`;
              html += `<td>${asientos}</td>`;
              html += `<td><button type="button" data-id="${valueF.funcionid}" class="btn btn-danger">Eliminar</button></td>`;
          html += `</tr>`;
        });
        $('#target').append(html);
      });
    });
  });
});

$('#target').on( "click", "tr button", function() {
  var funcionId = $(this).attr('data-id');
  swal({
    title: "Esta seguro?",
    text: "Una vez eliminada la funcion no se podran recuperar los datos!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      var borrar_funcion = $.ajax({url: "http://localhost:3000/funcion", data: {funcionId, funcionId}, method: "delete", });
      borrar_funcion.done((data) => {
        if(data.name === 'error'){
          swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
        }else{
          swal("Exito!", "Se elimino la funcion correctamente!")
          .then((value) => {
            location.reload();
          });
        }
      });
    } else {
      swal("Se cancelo la accion!");
    }
  });


});
