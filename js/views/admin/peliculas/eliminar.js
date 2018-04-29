$(document).ready( () => {


  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get" });

  lista_peliculas.done((data) => {
    render(data);

    $('td button').on( "click", function() {
      var peliculaId = $(this).attr('data-id');

      swal({
        title: "Esta seguro?",
        text: "Una vez eliminada la pelicula no se podran recuperar los datos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

          var borrar_funciones  = $.ajax({url: "http://localhost:3000/funcion/pelicula" ,data: {peliculaId: peliculaId}, method: "delete" });
          borrar_funciones.done((data) => {
            if(data.name === 'error'){
              swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
            }else{
              var borrar_pelicula = $.ajax({url: "http://localhost:3000/pelicula",data: {peliculaId: peliculaId}, method: "delete" });
              borrar_pelicula.done((data) => {
                if(data.name === 'error'){
                  swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
                }else{
                  swal("Exito!", "La pelicula se ha eliminado correctamente!")
                  .then((value) => {
                    location.reload();
                  });
                }
              });

            }
          });


        } else {
          swal("Se cancelo la accion!");
        }
      });

    });
  });


  function render(data) {
    var html = ``;

    $.each(data, (index, value) => {
      html += `<tr>`;
      html += `<td>${value.peliculaid}</td>`;
      html += `<td>${value.nombre}</td>`;
      html += `<td><button type="button" data-id="${value.peliculaid}" class="btn btn-danger">Eliminar</button></td>`;
      html += `</tr>`;
    });

    $('tbody').append(html);

  }

});
