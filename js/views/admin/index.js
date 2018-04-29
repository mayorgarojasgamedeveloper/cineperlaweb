$(document).ready( () => {

  var lista_logs = $.ajax({url: "http://localhost:3000/log", method: "get", });

  lista_logs.done((data) => {
    render(data);
  });

  function render(data) {
    var html = ``;
    $.each(data, (index, value) => {
      html += `<tr>`;
          html += `<td>${value.logid}</td>`;
          html += `<td>${value.dia}</td>`;
          html += `<td>${value.info}</td>`;
          html += `<td>${value.pelicula}</td>`;
      html += `</tr>`;
    });
    $('#target').append(html);
  }

});
