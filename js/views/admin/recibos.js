if(Cookies.get('adminId') == null) {
  window.location.replace("./index.html");
}

$(document).ready( () => {

  var lista_logs = $.ajax({url: "http://localhost:3000/recibo", method: "get", });

  lista_logs.done((data) => {
    render(data);
  });

  function render(data) {
    var html = ``;
    $.each(data, (index, value) => {
      html += `<tr>`;
          html += `<td>${value.reciboid}</td>`;
          html += `<td>${value.usuarioid}</td>`;
          html += `<td>${value.peliculaid}</td>`;
          html += `<td>${value.funcionid}</td>`;
          html += `<td>${value.boletos} Boleto(s)</td>`;
          html += `<td>$${value.total}</td>`;
      html += `</tr>`;
    });
    $('#target').append(html);
  }

});
