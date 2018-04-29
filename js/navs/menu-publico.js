$('document').ready(function() {
  /*CONTROLAR MENU*/
  var menu = ``;
  var ususarioId = Cookies.get('usuarioId');

  menu += `<ul>`;
    menu += `<li><a href="./index.html">Estrenos</a></li>`;
    menu += `<li><a href="./cartelera.html">Cartelera</a></li>`;
    if(ususarioId == null) {
      menu += `<li style="float:right"><a class="active" href="./login.html">Iniciar Sesion</a></li>`;
    } else {
      menu += `<li style="float:right"><a class="active" id="cerrar-sesion">Cerrar Sesion</a></li>`;
      menu += `<li style="float:right"><a class="active" href="./perfil.html">Perfil</a></li>`;
    }
  menu += `</ul>`;

  $('nav').append(menu);

  $('nav').on('click', '#cerrar-sesion', function() {
    Cookies.remove('usuarioId');
    console.log('Sesion cerrada');
    window.location.replace("./index.html");
  });

});
