$(document).ready( () => {

  var lista_peliculas = $.ajax({url: "http://localhost:3000/pelicula", method: "get", });

  lista_peliculas.done((data) => {
    RenderPeliculas(data);
  });

  function RenderPeliculas(data) {
    var html = ``;
    var x = 0;
    console.log(data);
    $.each(data, (index, value) => {
      html += `<div class="pelicula-cartelera">`;
        html += `<div class="">`;
          html += `<a href="./pelicula.html?peliculaId=${value.peliculaid}"><img src="${value.portada}" alt="${value.nombre}"></a>`;
        html += `</div>`;
        html += `<div class="">`;
          html += `<h2>${value.nombre} <span>${value.restriccion}</span> </h2>`;
          html += `<p>${value.sinopsis}</p>`;
        html += `</div>`;
      html += `</div>`;
    });
    $('#lista').append(html);
  }

});
