$(document).ready( () => {

  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
  }

  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula/" + $.urlParam('peliculaId'), method: "get" });

  lista_peliculas.done((data) => {
    var lista_funciones = $.ajax({url: "http://localhost:3000/funcion/" + data[0].peliculaid, method: "get" });
    lista_funciones.done((data_fun) => {
      pelicula = data[0];
      funciones = data_fun;
      RenderPeliculas(data[0], data_fun);
    });
  });

  function RenderPeliculas(data, data_fun) {
    var html = ``;

    html += `<div class="pelicula">`;
      html += `<div class="">`;
        html += `<img src="${data.portada}" alt="Avengers">`;
      html += `</div>`;
      html += `<div class="">`;
        html += `<h2>${data.nombre} <span>${data.restriccion}</span> </h2>`;
        html += `<br>`;
        html += `<i class="detalle">${data.duracion} min</i><i class="detalle">${data.categoria}</i>`;
        html += `<br><br>`;
        html += `<p>${data.sinopsis}</p>`;
        html += `<p>Director(es): ${data.director}</p>`;
        html += `<p>Actor(es): ${data.actores}</p>`;
        html += `<br>`;
        if(!jQuery.isEmptyObject(data_fun)){
          html += `<select id="multiple" class="form-control">`;
          $.each(data_fun, (index, value) => {
            var asientosDis = 30 - value.asientos;
            html += `<option value="${index}">Dia: ${value.dia} | Hora: ${value.hora} | Lugares Disponibles: ${asientosDis}</option>`;
          });
          html += `</select>`;
          html += `Boletos ($63): <input type="number" class="form-control" id="boletos" value="1"`;
          html += `<br>`;
          html += `<br>`;
          if(Cookies.get('usuarioId') == null) {
            html += `<button type="button" class="btn btn-primary" disabled>Comprar</button>`;
            html += `<br><a href="./login.html">Iniciar Sesion</a>`;
          } else {
            html += `<button type="button" id="btn_comprar" class="btn btn-primary">Comprar</button>`;
          }
        }else{
          html += `<p>Lo sentimos, no hay funciones disponibles</p>`;
        }
      html += `</div>`;
    html += `</div>`;
    $('#lista').append(html);

    $('#btn_comprar').click(() => {

      var i = $('#multiple').val();
      var asientosDis = 30 - data_fun[i].asientos;
      var funcionId = data_fun[i].funcionid;
      var boletos = parseInt($('#boletos').val());
      var total = boletos * 63;
      var peliculaId = parseInt($.urlParam('peliculaId'));
      if(boletos <= asientosDis){

        var lista_fasientos = $.ajax({url: "http://localhost:3000/funcion/asientos", data: {funcionId: funcionId, numero: boletos}, method: "put" });
        lista_fasientos.done((data_aientos) => {

          swal({
            title: "Estas Seguro?",
            text: `Cantidad de boletos: ${boletos}\nTotal: $${total} pesos\nMetodo de pago: Tarjeta de Credito\nNumero de tarjeta: XXXX XXXX XXXX 1234`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              var usuarioId = parseInt(Cookies.get('usuarioId'));
              var generar_Recibos = $.ajax({url: "http://localhost:3000/recibo", data: {usuarioId: usuarioId, funcionId: funcionId, peliculaId: peliculaId, boletos: boletos,total: total}, method: "post" });
              lista_fasientos.done((recibo) => {
                swal("Compra realizada!", `Se han comprado ${ boletos} boletos.\nCodigo de compra: ${Math.round(Math.random()*1000000)}`, "success")
                .then((value) => {
                  location.reload();
                });

              });

            } else {
              swal("Se cancelo la transaccion!");
            }
          });

        });



      }else{
        swal("Error en la compra!", `No hay suficientes voletos en la sala.`, "error");
      }
    })
  }

});
