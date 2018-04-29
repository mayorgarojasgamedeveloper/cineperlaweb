$(document).ready( () => {

  var lista_admins = $.ajax({url: "http://localhost:3000/admin", method: "get" });
  lista_admins.done((admins) => {
    var html = ``;
    $.each(admins, (index, value) => {
      html += `<tr>`;
          html += `<td>${value.adminid}</td>`;
          html += `<td>${value.nombre} ${value.apellido}</td>`;
          html += `<td>${value.usuario}</td>`;
          html += `<td><button type="button" data-id="${value.adminid}" class="btn btn-danger">Eliminar</button></td>`;
      html += `</tr>`;
    });
    $('#target').append(html);
  });

  $('#target').on( "click", "tr button", function() {
    var adminId = $(this).attr('data-id');
    swal({
      title: "Esta seguro?",
      text: "Una vez eliminado el empleado/admin no se podran recuperar los datos!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var borrar_admin = $.ajax({url: "http://localhost:3000/admin", data: {adminId, adminId}, method: "delete", });
        borrar_admin.done((data) => {
          if(data.name === 'error'){
            swal("Error!", "Ocurrio algun error.\nPor favor inentelo de nuevo o mas tarde.", "error");
          }else{
            swal("Exito!", "Se elimino al empleado/admin correctamente!")
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

});
