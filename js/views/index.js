$(document).ready( () => {

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
