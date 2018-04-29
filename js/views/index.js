$(document).ready( () => {

  /*CONTROLAR MENU*/
  var menu = ``;
  var ususarioId = Cookies.get('usuarioId');
  if(ususarioId == null) {
    menu += `<li style="float:right"><a class="active" href="./login.html">Iniciar Sesion</a></li>`;
  } else {
    menu += `<li style="float:right"><a class="active" id="cerrar-sesion">Cerrar Sesion</a></li>`;
    menu += `<li style="float:right"><a class="active" href="./perfil.html">Perfil</a></li>`;
  }
  $('#menu').append(menu);

  $('nav').on('click', '#cerrar-sesion', function() {
    Cookies.remove('usuarioId');
    console.log('Sesion cerrada');
  });


  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get", });

  lista_peliculas.done((data) => {
    RenderPeliculas(data);
  });

  function RenderPeliculas(data) {
    var html = ``;
    var x = 0;
    $.each(data, (index, value) => {
      if(x === 10) return false;
      x ++;

      html += `<div class="pelicula-estreno">`;
        html += `<a href="./pelicula.html?peliculaId=${value.peliculaid}"><img src="${value.portada}" alt="${value.nombre}"></a>`;
      html += `</div>`;
    });
    $('#lista').append(html);
  }

});
