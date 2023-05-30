<?php
$filtrosMD = array(
  "nombreAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "visitasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "tipoAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "enListaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "anioAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "mesAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "diaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "escuchasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),
  "duracionAlbum" => array("tabla"=>"albumes", "key"=>"NomBan_NomAlb"),

  "nombreAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "visitasAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "tipoAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "enListaAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "anioAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "mesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "diaAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "escuchasAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "duracionAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "estrellasMaximasAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "puntuacionAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "numeroLikesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "numeroCancionesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "numeroEstudiosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "numeroGenerosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),
  "numeroMusicosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan_NomAlb"),

  "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"Email_NomBan_NomAlb"),
  "nombreBandaAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"Email_NomBan_NomAlb"),
  "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"Email_NomBan_NomAlb"),

  "nombreArticulo" => array("tabla"=>"articulos", "key"=>"nomArt"),
  "categoriaArticulo" => array("tabla"=>"articulos", "key"=>"nomArt"),
  "anioArticulo" => array("tabla"=>"articulos", "key"=>"nomArt"),
  "mesArticulo" => array("tabla"=>"articulos", "key"=>"nomArt"),
  "diaArticulo" => array("tabla"=>"articulos", "key"=>"nomArt"),

  "nombreBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),

  "nombreBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "paisBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "origenBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "escuchasBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "estatusBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "visitasBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "estrellasMaximasBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "puntuacionBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroAlbumesBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroLikesBandas" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroCancionesBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroDiscograficasBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroEstudiosBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroGenerosBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroMusicosBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  "numeroTemasBanda" => array("tabla"=>"bandas_plus", "key"=>"NomBan"),
  
  "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan_Email"),
  "nombreBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan_Email"),

  "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "nombreAlbumCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "nombreBandaCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),

  "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreBandaPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreAlbumPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),

  "codigoComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_Email_CodSec"),
  "emailUsuarioComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_Email_CodSec"),
  "codigoSeccionComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_Email_CodSec"),
  "fechaComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_Email_CodSec"),

  "nombreDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "paisDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "direccionDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "estatusDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "visitasDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),

  "nombreDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "paisDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "direccionDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "estatusDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "visitasDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "puntuacionDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroAlbumesDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroBandasDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroCancionesDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroEstudiosDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroGenerosDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroMusicosDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),
  "numeroTemasDiscografica" => array("tabla"=>"discograficas_plus", "key"=>"NomDisc"),

  "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc_NomBan_NomAlb"),
  "nombreAlbumDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc_NomBan_NomAlb"),
  "nombreBandaDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc_NomBan_NomAlb"),

  "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomEst_NomBan_NomAlb"),
  "nombreAlbumEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomEst_NomBan_NomAlb"),
  "nombreBandaEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomEst_NomBan_NomAlb"),

  "nombreEstudio" => array("tabla"=>"estudios_grabacion", "key"=>"NomEst"),
  "paisEstudio" => array("tabla"=>"estudios_grabacion", "key"=>"NomEst"),
  "DireccionEstudio" => array("tabla"=>"estudios_grabacion", "key"=>"NomEst"),

  "nombreBandaEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
  "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
  "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
  "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),

  "nombreEtiqueta" => array("tabla"=>"etiquetas_articulos", "key"=>"nomArt"),

  "nombreGenero" => array("tabla"=>"generos", "key"=>"NomGen"),
  "visitasGenero" => array("tabla"=>"generos", "key"=>"NomGen"),

  "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "nombreAlbumGenero" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "nombreBandaGenero" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),

  "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),
  "nombreBandaGenero" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),
  "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),

  "emailUsuarioGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_Email"),
  "nombreGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_Email"),
  "visitasGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_Email"),

  "nombreMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "sexoMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "diaNacimientoMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "mesNacimientoMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "anioNacimientoMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "diaDefuncionMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "mesDefuncionMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "anioDefuncionMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "paisMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "origenMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),
  "visitasMusico" => array("tabla"=>"musicos", "key"=>"NomMus"),

  "nombreMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "sexoMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "diaNacimientoMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "mesNacimientoMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "anioNacimientoMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "diaDefuncionMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "mesDefuncionMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "anioDefuncionMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "paisMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "origenMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "visitasMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "puntuacionMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroAlbumesMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroBandasMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroRolesMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroCancionesMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroDiscograficasMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroEstudiosMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroGenerosMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),
  "numeroTemasMusico" => array("tabla"=>"musicos_plus", "key"=>"NomMus"),

  "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "nombreBandaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),

  "emailUsuarioPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "tipoJuegoPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "fechaPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "dificultadPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "aciertosPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "numeroPreguntasPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "numeroIntentosPartida" => array("tabla"=>"partidas", "key"=>"Email"),
  "numeroOpcionesPartida" => array("tabla"=>"partidas", "key"=>"Email"),

  "nombrePlaylist" => array("tabla"=>"playlists", "key"=>"NomPlay"),
  "categoriaPlaylist" => array("tabla"=>"playlists", "key"=>"NomPlay"),

  "codigoPreguntaTrivia" => array("tabla"=>"preguntas_trivia", "key"=>"CodPre"),
  "dificultadPreguntaTrivia" => array("tabla"=>"preguntas_trivia", "key"=>"CodPre"),

  "codigoComentarioOrigen" => array("tabla"=>"respuestas_comentarios", "key"=>"CodCom"),
  "codigoComentarioDestino" => array("tabla"=>"respuestas_comentarios", "key"=>"CodCom"),

  "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus_NomBan_NomAlb"),
  "nombreBandaRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus_NomBan_NomAlb"),
  "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus_NomBan_NomAlb"),
  "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus_NomBan_NomAlb"),

  "codigoSeccion" => array("tabla"=>"secciones_comentarios", "key"=>"CodSec"),
  "contenidooSeccion" => array("tabla"=>"secciones_comentarios", "key"=>"CodSec"),
  "temaSeccion" => array("tabla"=>"secciones_comentarios", "key"=>"CodSec"),
  "tipoSeccion" => array("tabla"=>"secciones_comentarios", "key"=>"CodSec"),

  "emailUsuarioSeccionSeguida" => array("tabla"=>"secciones_seguidas", "key"=>"Email_CodSec"),
  "codigoSeccionSeguida" => array("tabla"=>"secciones_seguidas", "key"=>"Email_CodSec"),

  "nombreBandaTemaLetra" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),
  "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),

  "emailUsuario" => array("tabla"=>"usuarios", "key"=>"Email"),
  "nombreUsuario" => array("tabla"=>"usuarios", "key"=>"Email"),
  "emailUsuario" => array("tabla"=>"usuarios", "key"=>"Email"),
  "nivelPermisosUsuario" => array("tabla"=>"usuarios", "key"=>"Email"),
  "notificacionesUsuario" => array("tabla"=>"usuarios", "key"=>"Email"),
  "fechaUsuario" => array("tabla"=>"usuarios", "key"=>"Email")
);

$query = array("content"=>"","select" => [],"from" => [],"whereGroup" => [],"where" => [],"order" => []);
$conversion = array("canciones"=>"canciones_albumes","estudios"=>"estudios_grabacion","etapas"=>"etapas_bandas","roles"=>"roles_musicos_albumes","temasLetra"=>"temas_letra_bandas");
$metadata = array(
  "albumes" => array(
    "alias" => "al",
    "key" => array("entrada"=>"nombreAlbum", "nombre"=>"NomAlb"),
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "descripcionAlbum" => array("nombre"=>"Descrip", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "imagenAlbum" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "tipoAlbum" => array("nombre"=>"TipoAlb", "simbolo"=>"LIKE", "salida"=>"tipo"),
      "enListaAlbum" => array("nombre"=>"EnLista", "simbolo"=>"LIKE", "salida"=>"enLista"),
      "anioAlbum" => array("nombre"=>"Anio", "simbolo"=>"=", "salida"=>"anio"),
      "mesAlbum" => array("nombre"=>"Mes", "simbolo"=>"=", "salida"=>"mes"),
      "diaAlbum" => array("nombre"=>"Dia", "simbolo"=>"=", "salida"=>"dia"),
      "escuchasAlbum" => array("nombre"=>"NumEscuchasMax", "simbolo"=>"=", "salida"=>"escuchas"),
      "linkSpotifyAlbum" => array("nombre"=>"LinkSpotify", "simbolo"=>"LIKE", "salida"=>"linkSpotify"),
      "linkAmazonAlbum" => array("nombre"=>"LinkAmazon", "simbolo"=>"LIKE", "salida"=>"linkAmazon"),
      "duracionAlbum" => array("nombre"=>"Duracion", "simbolo"=>"=", "salida"=>"duracion"),
      "visitasAlbum" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
    ),
    "filtros" => array(
      "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomAlb"),
      "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
      "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
      "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
      "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
      "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
      "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
      "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
      "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
    )
  ),
  "albumes_plus" => array(
    "alias" => "ap",
    "key" => array("entrada"=>"nombreAlbum", "nombre"=>"NomAlb"),
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "descripcionAlbum" => array("nombre"=>"Descrip", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "imagenAlbum" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "tipoAlbum" => array("nombre"=>"TipoAlb", "simbolo"=>"LIKE", "salida"=>"tipo"),
      "enListaAlbum" => array("nombre"=>"EnLista", "simbolo"=>"LIKE", "salida"=>"enLista"),
      "anioAlbum" => array("nombre"=>"Anio", "simbolo"=>"=", "salida"=>"anio"),
      "mesAlbum" => array("nombre"=>"Mes", "simbolo"=>"=", "salida"=>"mes"),
      "diaAlbum" => array("nombre"=>"Dia", "simbolo"=>"=", "salida"=>"dia"),
      "escuchasAlbum" => array("nombre"=>"NumEscuchasMax", "simbolo"=>"=", "salida"=>"escuchas"),
      "linkSpotifyAlbum" => array("nombre"=>"LinkSpotify", "simbolo"=>"LIKE", "salida"=>"linkSpotify"),
      "linkAmazonAlbum" => array("nombre"=>"LinkAmazon", "simbolo"=>"LIKE", "salida"=>"linkAmazon"),
      "duracionAlbum" => array("nombre"=>"Duracion", "simbolo"=>"=", "salida"=>"duracion"),
      "visitasAlbum" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      "estrellasMaximasAlbum" => array("nombre"=>"EstrellasMax", "simbolo"=>"=", "salida"=>"estrellasMax"),
      "puntuacionAlbum" => array("nombre"=>"Puntuacion", "simbolo"=>"=", "salida"=>"puntuacion"),
      "numeroLikesAlbum" => array("nombre"=>"CountLikes", "simbolo"=>"=", "salida"=>"likes"),
      "numeroCancionesAlbum" => array("nombre"=>"CountCan", "simbolo"=>"=", "salida"=>"canciones"),
      "numeroEstudiosAlbum" => array("nombre"=>"CountEst", "simbolo"=>"=", "salida"=>"estudios"),
      "numeroGenerosAlbum" => array("nombre"=>"CountGen", "simbolo"=>"=", "salida"=>"generos"),
      "numeroMusicosAlbum" => array("nombre"=>"CountMus", "simbolo"=>"=", "salida"=>"musicos"),
    ),
    "filtros" => array(
      "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomAlb"),
      "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
      "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
      "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
      "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
      "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
      "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
      "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
      "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
    )
  ),
  "articulos" => array(
    "alias" => "ar",
    "key" => array("entrada"=>"nombreArticulo", "nombre"=>"nomArt"),
    "campos" => array(
      "nombreArticulo" => array("nombre"=>"nomArt", "simbolo"=>"LIKE", "salida"=>"nombre"),
      "resumenArticulo" => array("nombre"=>"Resumen", "simbolo"=>"LIKE", "salida"=>"resumen"),
      "descripcionArticulo" => array("nombre"=>"Descrip", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "categoriaArticulo" => array("nombre"=>"Categoria", "simbolo"=>"LIKE", "salida"=>"categoria"),
      "imagenArticulo" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "anioArticulo" => array("nombre"=>"Anio", "simbolo"=>"=", "salida"=>"anio"),
      "mesArticulo" => array("nombre"=>"Mes", "simbolo"=>"=", "salida"=>"mes"),
      "diaArticulo" => array("nombre"=>"Dia", "simbolo"=>"=", "salida"=>"dia"),
      "visitasArticulo" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
    ),
    "filtros" => array(
      "nombreEtiqueta" => array("tabla"=>"etiquetas_articulos", "key"=>"nomArt"),
    )
  ),
  "albumes_favoritos" => array(
    "alias" => "af",
    "campos" => array(
      "emailUsuarioAlbumFavorito" => array("nombre"=>"Email", "simbolo"=>"LIKE", "salida"=>"email"),
      "nombreBandaFavorita" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbumFavorito" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album")
    )
  ),
  "bandas" => array(
    "alias" => "b",
    "key" => array("entrada"=>"nombreBanda", "nombre"=>"NomBan"),
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "paisBanda" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "origenBanda" => array("nombre"=>"Origen", "simbolo"=>"LIKE", "salida"=>"origen"),
      "escuchasBanda" => array("nombre"=>"NumEscuchasMes", "simbolo"=>"=", "salida"=>"escuchas"),
      "imagenBanda" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "estatusBanda" => array("nombre"=>"Estatus", "simbolo"=>"LIKE", "salida"=>"estatus"),
      "descripcionBanda" => array("nombre"=>"Descrip", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "linkWebBanda" => array("nombre"=>"LinkWeb", "simbolo"=>"LIKE", "salida"=>"linkWeb"),
      "linkSpotifyBanda" => array("nombre"=>"LinkSpotify", "simbolo"=>"LIKE", "salida"=>"linkSpotify"),
      "fechaIncorporacionBanda" => array("nombre"=>"FechaIncorp", "simbolo"=>"=", "salida"=>"fechaIncorporacion"),
      "visitasBanda" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
    ),
    "filtros" => array(
      "nombreAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "visitasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "tipoAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "enListaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "anioAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "mesAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "diaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "escuchasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "duracionAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
      "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
      "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
      "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "nombreAlbumCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreAlbumPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
      "nombreAlbumDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
      "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
      "nombreAlbumEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
      "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "tipoEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "nombreAlbumGenero" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),
      "estrellasMaximasAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "puntuacionAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroLikesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroCancionesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroEstudiosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroGenerosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroMusicosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan")
    )
  ),
  "bandas_plus" => array(
    "alias" => "bp",
    "key" => array("entrada"=>"nombreBanda", "nombre"=>"NomBan"),
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "paisBanda" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "origenBanda" => array("nombre"=>"Origen", "simbolo"=>"LIKE", "salida"=>"origen"),
      "escuchasBanda" => array("nombre"=>"NumEscuchasMes", "simbolo"=>"=", "salida"=>"escuchas"),
      "imagenBanda" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "estatusBanda" => array("nombre"=>"Estatus", "simbolo"=>"LIKE", "salida"=>"estatus"),
      "descripcionBanda" => array("nombre"=>"Descrip", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "linkWebBanda" => array("nombre"=>"LinkWeb", "simbolo"=>"LIKE", "salida"=>"linkWeb"),
      "linkSpotifyBanda" => array("nombre"=>"LinkSpotify", "simbolo"=>"LIKE", "salida"=>"linkSpotify"),
      "fechaIncorporacionBanda" => array("nombre"=>"FechaIncorp", "simbolo"=>"=", "salida"=>"fechaIncorporacion"),
      "visitasBanda" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      "estrellasMaximasBanda" => array("nombre"=>"EstrellasMax", "simbolo"=>"=", "salida"=>"estrellasMaximas"),
      "puntuacionBanda" => array("nombre"=>"Puntuacion", "simbolo"=>"=", "salida"=>"puntuacion"),
      "numeroAlbumesBanda" => array("nombre"=>"CountAlb", "simbolo"=>"=", "salida"=>"albumes"),
      "numeroLikesBandas" => array("nombre"=>"CountLikes", "simbolo"=>"=", "salida"=>"likes"),
      "numeroCancionesBanda" => array("nombre"=>"CountCan", "simbolo"=>"=", "salida"=>"canciones"),
      "numeroDiscograficasBanda" => array("nombre"=>"CountDisc", "simbolo"=>"=", "salida"=>"discograficas"),
      "numeroEstudiosBanda" => array("nombre"=>"CountEst", "simbolo"=>"=", "salida"=>"estudios"),
      "numeroGenerosBanda" => array("nombre"=>"CountGen", "simbolo"=>"=", "salida"=>"generos"),
      "numeroMusicosBanda" => array("nombre"=>"CountMus", "simbolo"=>"=", "salida"=>"musicos"),
      "numeroTemasBanda" => array("nombre"=>"CountTemas", "simbolo"=>"=", "salida"=>"temas"),
    ),
    "filtros" => array(
      "nombreAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "visitasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "tipoAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "enListaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "anioAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "mesAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "diaAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "escuchasAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "duracionAlbum" => array("tabla"=>"albumes", "key"=>"NomBan"),
      "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
      "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
      "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
      "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "nombreAlbumCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
      "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreAlbumPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
      "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
      "nombreAlbumDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
      "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
      "nombreAlbumEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
      "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "tipoEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "nombreAlbumGenero" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
      "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
      "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),
      "estrellasMaximasAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "puntuacionAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroLikesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroCancionesAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroEstudiosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroGenerosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan"),
      "numeroMusicosAlbum" => array("tabla"=>"albumes_plus", "key"=>"NomBan")
    )
  ),
  "bandas_favoritas" => array(
    "alias" => "bf",
    "campos" => array(
      "emailUsuarioBandaFavorita" => array("nombre"=>"Email", "simbolo"=>"LIKE", "salida"=>"email"),
      "nombreBandaFavorita" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda")
    )
  ),
  "canciones_albumes" => array(
    "alias" => "c",
    "key" => array("entrada"=>"nombreCancion", "nombre"=>"NomCan"),
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "nombreCancion" => array("nombre"=>"NomCan", "simbolo"=>"LIKE", "salida"=>"cancion"),
      "estrellasCancion" => array("nombre"=>"Estrellas", "simbolo"=>"=", "salida"=>"estrellas")
    ),
    "filtros" => array(
      "visitasAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "tipoAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "enListaAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "anioAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "mesAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "diaAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "escuchasAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "duracionAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
      "emailUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomAlb"),
      "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
      "emailUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
      "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomCan"),
      "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomCan"),
      "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
      "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
      "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
      "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
      "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
      "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
      "nombreMusicoRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
      "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
    )
  ),
  "discograficas" => array(
    "alias" => "d",
    "key" => array("entrada"=>"nombreDiscografica", "nombre"=>"NomDisc"),
    "campos" => array(
      "nombreDiscografica" => array("nombre"=>"NomDisc", "simbolo"=>"LIKE", "salida"=>"discografica"),
      "imagenDiscografica" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "paisDiscografica" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "direccionDiscografica" => array("nombre"=>"Direccion", "simbolo"=>"LIKE", "salida"=>"direccion"),
      "estatusDiscografica" => array("nombre"=>"Estatus", "simbolo"=>"LIKE", "salida"=>"estatus"),
      "linkWebDiscografica" => array("nombre"=>"LinkWeb", "simbolo"=>"LIKE", "salida"=>"linkWeb"),
      "visitasDiscografica" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
    ),
    "filtros" => array(
      "nombreAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc"),
      "nombreBanda" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc")
    )
  ),
  "discograficas_plus" => array(
    "alias" => "dp",
    "key" => array("entrada"=>"nombreDiscografica", "nombre"=>"NomDisc"),
    "campos" => array(
      "nombreDiscografica" => array("nombre"=>"NomDisc", "simbolo"=>"LIKE", "salida"=>"discografica"),
      "imagenDiscografica" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "paisDiscografica" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "direccionDiscografica" => array("nombre"=>"Direccion", "simbolo"=>"LIKE", "salida"=>"direccion"),
      "estatusDiscografica" => array("nombre"=>"Estatus", "simbolo"=>"LIKE", "salida"=>"estatus"),
      "linkWebDiscografica" => array("nombre"=>"LinkWeb", "simbolo"=>"LIKE", "salida"=>"linkWeb"),
      "visitasDiscografica" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      "puntuacionDiscografica" => array("nombre"=>"Puntuacion", "simbolo"=>"=", "salida"=>"puntuacion"),
      "numeroAlbumesDiscografica" => array("nombre"=>"CountAlb", "simbolo"=>"=", "salida"=>"albumes"),
      "numeroBandasDiscografica" => array("nombre"=>"CountBan", "simbolo"=>"=", "salida"=>"bandas"),
      "numeroCancionesDiscografica" => array("nombre"=>"CountCan", "simbolo"=>"=", "salida"=>"canciones"),
      "numeroEstudiosDiscografica" => array("nombre"=>"CountEst", "simbolo"=>"=", "salida"=>"estudios"),
      "numeroGenerosDiscografica" => array("nombre"=>"CountGen", "simbolo"=>"=", "salida"=>"generos"),
      "numeroMusicosDiscografica" => array("nombre"=>"CountMus", "simbolo"=>"=", "salida"=>"musicos"),
      "numeroTemasDiscografica" => array("nombre"=>"CountTemas", "simbolo"=>"=", "salida"=>"temas")
    ),
    "filtros" => array(
      "nombreAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc"),
      "nombreBanda" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc")
    )
  ),
  "discograficas_albumes" => array(
    "alias" => "da",
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "nombreDiscografica" => array("nombre"=>"NomDisc", "simbolo"=>"LIKE", "salida"=>"discografica")
    )
  ),
  "estudios_albumes" => array(
    "alias" => "ea",
    "campos" => array(
      "nombreBandaEstudio" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbumEstudio" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "nombreEstudioAlbum" => array("nombre"=>"NomEst", "simbolo"=>"LIKE", "salida"=>"estudio")
    )
  ),
  "estudios_grabacion" => array(
    "alias" => "e",
    "key" => array("entrada"=>"nombreEstudio", "nombre"=>"NomEst"),
    "campos" => array(
      "nombreEstudio" => array("nombre"=>"NomEst", "simbolo"=>"LIKE", "salida"=>"estudio"),
      "paisEstudio" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "direccionEstudio" => array("nombre"=>"Direccion", "simbolo"=>"LIKE", "salida"=>"direccion")
    ),
    "filtros" => array(
      "nombreAlbumEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomEst"),
      "nombreBandaEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomEst")
    )
  ),
  "etapas_bandas" => array(
    "alias" => "eb",
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "anioInicioEtapaBanda" => array("nombre"=>"AnioInic", "simbolo"=>"=", "salida"=>"anioInicio"),
      "anioFinEtapaBanda" => array("nombre"=>"AnioFin", "simbolo"=>"=", "salida"=>"anioFin"),
      "tipoEtapaBanda" => array("nombre"=>"Tipo", "simbolo"=>"LIKE", "salida"=>"tipo")
    )
  ),
  "generos" => array(
    "alias" => "g",
    "key" => array("entrada"=>"nombreGenero", "nombre"=>"NomGen"),
    "campos" => array(
      "nombreGenero" => array("nombre"=>"NomGen", "simbolo"=>"LIKE", "salida"=>"genero"),
      "descripcionGenero" => array("nombre"=>"Descripcion", "simbolo"=>"LIKE", "salida"=>"descripcion"),
      "imagenGenero" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "visitasGenero" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
    ),
    "filtros" => array(
      "nombreAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen"),
      "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen"),
      "nombreBanda" => array("tabla"=>"generos_bandas", "key"=>"NomGen"),
      "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomGen"),
      "emailUsuarioGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen"),
      "nombreGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen"),
      "visitasGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen")
    )
  ),
  "generos_albumes" => array(
    "alias" => "ga",
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "nombreGeneroAlbum" => array("nombre"=>"NomGen", "simbolo"=>"LIKE", "salida"=>"genero"),
      "estrellasGeneroAlbum" => array("nombre"=>"Estrellas", "simbolo"=>"=", "salida"=>"estrellas")
    )
  ),
  "generos_bandas" => array(
    "alias" => "gb",
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreGeneroBanda" => array("nombre"=>"NomGen", "simbolo"=>"LIKE", "salida"=>"genero"),
      "estrellasGeneroBanda" => array("nombre"=>"Estrellas", "simbolo"=>"=", "salida"=>"estrellas")
    )
  ),
  "musicos" => array(
    "alias" => "m",
    "key" => array("entrada"=>"nombreMusico", "nombre"=>"NomMus"),
    "campos" => array(
      "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
      "imagenMusico" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "sexoMusico" => array("nombre"=>"Sexo", "simbolo"=>"LIKE", "salida"=>"sexo"),
      "diaNacimientoMusico" => array("nombre"=>"DiaNac", "simbolo"=>"=", "salida"=>"diaNacimiento"),
      "mesNacimientoMusico" => array("nombre"=>"MesNac", "simbolo"=>"=", "salida"=>"mesNacimiento"),
      "anioNacimientoMusico" => array("nombre"=>"AnioNac", "simbolo"=>"=", "salida"=>"anioNacimiento"),
      "diaDefuncionMusico" => array("nombre"=>"DiaDef", "simbolo"=>"=", "salida"=>"diaDefuncion"),
      "mesDefuncionMusico" => array("nombre"=>"MesDef", "simbolo"=>"=", "salida"=>"mesDefuncion"),
      "anioDefuncionMusico" => array("nombre"=>"AnioDef", "simbolo"=>"=", "salida"=>"anioDefuncion"),
      "paisMusico" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "origenMusico" => array("nombre"=>"Origen", "simbolo"=>"LIKE", "salida"=>"origen"),
      "visitasMusico" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
    ),
    "filtros" => array(
      "nombreBandaEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "nombreBandaRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
      "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus")
    )
  ),
  "musicos_plus" => array(
    "alias" => "m",
    "key" => array("entrada"=>"nombreMusico", "nombre"=>"NomMus"),
    "campos" => array(
      "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
      "imagenMusico" => array("nombre"=>"Imagen", "simbolo"=>"LIKE", "salida"=>"imagen"),
      "sexoMusico" => array("nombre"=>"Sexo", "simbolo"=>"LIKE", "salida"=>"sexo"),
      "diaNacimientoMusico" => array("nombre"=>"DiaNac", "simbolo"=>"=", "salida"=>"diaNacimiento"),
      "mesNacimientoMusico" => array("nombre"=>"MesNac", "simbolo"=>"=", "salida"=>"mesNacimiento"),
      "anioNacimientoMusico" => array("nombre"=>"AnioNac", "simbolo"=>"=", "salida"=>"anioNacimiento"),
      "diaDefuncionMusico" => array("nombre"=>"DiaDef", "simbolo"=>"=", "salida"=>"diaDefuncion"),
      "mesDefuncionMusico" => array("nombre"=>"MesDef", "simbolo"=>"=", "salida"=>"mesDefuncion"),
      "anioDefuncionMusico" => array("nombre"=>"AnioDef", "simbolo"=>"=", "salida"=>"anioDefuncion"),
      "paisMusico" => array("nombre"=>"Pais", "simbolo"=>"LIKE", "salida"=>"pais"),
      "origenMusico" => array("nombre"=>"Origen", "simbolo"=>"LIKE", "salida"=>"origen"),
      "visitasMusico" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      "puntuacionMusico" => array("nombre"=>"Puntuacion", "simbolo"=>"=", "salida"=>"puntuacion"),
      "numeroAlbumesMusico" => array("nombre"=>"CountAlb", "simbolo"=>"=", "salida"=>"albumes"),
      "numeroBandasMusico" => array("nombre"=>"CountBan", "simbolo"=>"=", "salida"=>"bandas"),
      "numeroRolesMusico" => array("nombre"=>"CountRoles", "simbolo"=>"=", "salida"=>"roles"),
      "numeroCancionesMusico" => array("nombre"=>"CountCan", "simbolo"=>"=", "salida"=>"canciones"),
      "numeroDiscograficasMusico" => array("nombre"=>"CountDisc", "simbolo"=>"=", "salida"=>"discograficas"),
      "numeroEstudiosMusico" => array("nombre"=>"CountEst", "simbolo"=>"=", "salida"=>"estudios"),
      "numeroGenerosMusico" => array("nombre"=>"CountGen", "simbolo"=>"=", "salida"=>"generos"),
      "numeroTemasMusico" => array("nombre"=>"CountTemas", "simbolo"=>"=", "salida"=>"temas"),
    ),
    "filtros" => array(
      "nombreBanda" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
      "nombreBandaRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
      "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
      "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus")
    )
  ),
  "musicos_bandas" => array(
    "alias" => "mb",
    "campos" => array(
      "nombreMusicoEtapa" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
      "nombreBandaEtapa" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "anioInicioEtapaMusico" => array("nombre"=>"anioInic", "simbolo"=>"=", "salida"=>"anioInicio"),
      "anioFinEtapaMusico" => array("nombre"=>"anioFin", "simbolo"=>"=", "salida"=>"anioFin")
    )
  ),
  "roles_musicos_albumes" => array(
    "alias" => "r",
    "campos" => array(
      "nombreMusicoRol" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
      "nombreBandaRol" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "nombreAlbumRol" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
      "rolMusico" => array("nombre"=>"Rol", "simbolo"=>"LIKE", "salida"=>"rol")
    )
  ),
  "temas_letra_bandas" => array(
    "alias" => "t",
    "campos" => array(
      "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
      "temaLetraBanda" => array("nombre"=>"Tema", "simbolo"=>"LIKE", "salida"=>"tema")
    )
  ),
  "usuarios" => array(
    "alias" => "u",
    "key" => array("entrada"=>"emailUsuario", "nombre"=>"Email"),
    "campos" => array(
      "emailUsuario" => array("nombre"=>"Email", "simbolo"=>"LIKE", "salida"=>"email"),
      "nombreUsuario" => array("nombre"=>"NomUsu", "simbolo"=>"LIKE", "salida"=>"nombre"),
      "contraUsuario" => array("nombre"=>"PassUsu", "simbolo"=>"LIKE", "salida"=>"contrasena"),
      "fotoUsuario" => array("nombre"=>"Foto", "simbolo"=>"LIKE", "salida"=>"foto"),
      "nivelPermisosUsuario" => array("nombre"=>"NvlPermisos", "simbolo"=>"=", "salida"=>"permisos"),
      "notificacionesUsuario" => array("nombre"=>"Notificaciones", "simbolo"=>"LIKE", "salida"=>"notificaciones"),
      "fechaUsuario" => array("nombre"=>"FechaHora", "simbolo"=>"=", "salida"=>"fecha")
    ),
    "filtros" => array(
      "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"Email"),
      "nombreBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"Email"),
      "codigoComentario" => array("tabla"=>"comentarios", "key"=>"Email"),
      "codigoSeccionComentario" => array("tabla"=>"comentarios", "key"=>"Email"),
      "fechaComentario" => array("tabla"=>"comentarios", "key"=>"Email"),
      "nombreGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"Email"),
      "visitasGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"Email"),
      "tipoJuegoPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "fechaPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "dificultadPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "aciertosPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "numeroPreguntasPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "numeroIntentosPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "numeroOpcionesPartida" => array("tabla"=>"partidas", "key"=>"Email"),
      "codigoSeccionSeguida" => array("tabla"=>"secciones_seguidas", "key"=>"Email"),
    )
  )
);

function selectToArray($metadata,$conversion,$params){
  //parse_str($_SERVER['QUERY_STRING'], $params);
  $query = array("content"=>"","select" => [],"from" => [],"whereGroup" => [],"where" => [],"order" => [],"limit"=> []);
  //Sacar key, list y order (y almacenar los dos últimos)
  foreach($params as $i => $p){
    if(strpos($p,"'")) $params[$i] = str_replace("'","\'",$p); //Nueva Línea
    if($i=='list') $select = $p;
    else if($i=='order') $order = $p;
    else if($i=='limit') $limit = $p;
    else if($i=='page') $page = $p;
    if($i=='key' || $i=='list' || $i=='order' || $i=='limit' || $i=='page') unset($params[$i]);
  }
  if(array_key_exists($select, $conversion)) $select = $conversion[$select];
  $alias = $metadata[$select]['alias'];
  $key = $metadata[$select]['key']['nombre'];
  //Se incluyen los campos de la select en la query
  foreach($metadata[$select]['campos'] as $i => $c){
    array_push($query['select'], array("alias"=>$alias,"nombre"=>$c['nombre'],"salida"=>$c['salida']));
  }
  //Se incluye la tabla en el from
  array_push($query['from'],array("alias"=>$alias,"tabla"=>$select));
  //Se recorren los parámetros
  foreach($params as $param => $content){
    $signo="";
    $content = explode("|",$content);
    //Si param contiene una terminación se extrae y se realizan las modificaciones necesarias
    if(strpos($param,"_")>0){
      $term = strstr($param,"_");
      $param = strstr($param,"_",true);
      if($term == "_Like") foreach($content as $j => $c) $content[$j] = "%".$c."%";
      else if($term == "_Min") $signo=">";
      else if($term == "_Max") $signo="<";
    }
    $campos = $metadata[$select]['campos'];
    //Verificar si param pertenece a la tabla de origen
    if(array_key_exists($param,$campos)){ //Si pertenece
      if(count($content)==1){ //Si solo hay un contenido se añade una condición simple
        array_push($query['where'], array("alias"=>$alias,"filtro"=>$campos[$param]['nombre'],"simbolo"=>$signo.$campos[$param]['simbolo'],"contenido"=>$content[0]));
      } else { //Si hay más de un contenido se añade una condición compleja
        array_push($query['where'],[]);
        for($i=0; $i<count($content); $i++){
          array_push($query['where'][count($query['where'])-1], array("alias"=>$alias,"filtro"=>$campos[$param]['nombre'],"simbolo"=>$signo.$campos[$param]['simbolo'],"contenido"=>$content[$i]));
        }
      }
    } else { //Si no pertenece
      $nuevaTabla = $metadata[$select]['filtros'][$param]['tabla'];
      $nuevaKey = $metadata[$select]['filtros'][$param]['key'];
      $nuevoAlias = $metadata[$nuevaTabla]['alias'];
      $nuevoCampo = $metadata[$nuevaTabla]['campos'][$param]['nombre'];
      $nuevaSalida = $metadata[$nuevaTabla]['campos'][$param]['salida'];
      //Se añade el nuevo campo a la select solo en caso de los campos con LIKE o con Menor o Mayor para prevenir elementos repetidos
      if(strpos($content[0],"%")>=0 || $signo!=""){
        array_push($query['select'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida));
      }
      //Si no esta añadida la nueva tabla en el from
      if(!in_array(array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla), $query['from'])){
        //se añade al from
        array_push($query['from'],array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla));
        //Si el campo key de origen esta en la tabla de destino se añade la condición de agrupación con la clave de origen
        if(array_key_exists($metadata[$select]['key']['entrada'],$metadata[$nuevaTabla]['campos'])){
          array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$key),array("alias"=>$nuevoAlias,"filtro"=>$key)]);
        } else { //Sino, se añade la condición de agrupación con la clave de destino
          array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$nuevaKey),array("alias"=>$nuevoAlias,"filtro"=>$nuevaKey)]);
        }
      }
      //Se añade la condición where normal
      if(count($content)==1){ //Si solo hay un contenido se añade una condición simple
        array_push($query['where'], array("alias"=>$nuevoAlias,"filtro"=>$nuevoCampo,"simbolo"=>$signo.$metadata[$nuevaTabla]['campos'][$param]['simbolo'],"contenido"=>$content[0]));
      } else { //Si hay más de un contenido se añade una condición compleja
        array_push($query['where'],[]);
        for($i=0; $i<count($content); $i++){
          array_push($query['where'][count($query['where'])-1], array("alias"=>$nuevoAlias,"filtro"=>$nuevoCampo,"simbolo"=>$signo.$metadata[$nuevaTabla]['campos'][$param]['simbolo'],"contenido"=>$content[$i]));
        }
      }
    }
  }
  //Si hay order se añade al array query
  if($order){
    foreach(explode("|",$order) as $param){
      $tipo="ASC";
      if(strpos($param,"_")>0){
        $term = strstr($param,"_");
        $param = strstr($param,"_",true);
        if($term == "_Desc") $tipo="DESC";
        else if($term == "_Asc") $tipo="ASC";
      }
      $campos = $metadata[$select]['campos'];
      //Verificar si param pertenece a la tabla de origen
      if($param=='RAND()'){ //Registros aleatorios
        array_push($query['order'], array("alias"=>'',"nombre"=>$param,"tipo"=>$tipo));
      } else if(array_key_exists($param,$campos)){ //Si pertenece
        array_push($query['order'], array("alias"=>$alias,"nombre"=>$campos[$param]['nombre'],"tipo"=>$tipo));
      } else { //Si no pertenece
        $nuevaTabla = $metadata[$select]['filtros'][$param]['tabla'];
        $nuevaKey = $metadata[$select]['filtros'][$param]['key'];
        $nuevoAlias = $metadata[$nuevaTabla]['alias'];
        $nuevoCampo = $metadata[$nuevaTabla]['campos'][$param]['nombre'];
        $nuevaSalida = $metadata[$nuevaTabla]['campos'][$param]['salida'];
        //Se añade el nuevo campo a la select si no está
        if(!in_array(array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida),$query['select'])){
          array_push($query['select'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida));
        }
        //Se añade el nuevo campo al order
        array_push($query['order'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"tipo"=>$tipo));
        //Si no esta añadida la nueva tabla en el from se añade al from y se añade la condición de agrupación
        if(!in_array(array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla), $query['from'])){
          array_push($query['from'],array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla));
          //Si el campo key de origen esta en la tabla de destino se añade la condición de agrupación con la clave de origen
          if(array_key_exists($metadata[$select]['key']['entrada'],$metadata[$nuevaTabla]['campos'])){
            array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$key),array("alias"=>$nuevoAlias,"filtro"=>$key)]);
          } else { //Sino, se añade la condición de agrupación con la clave de destino
            array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$nuevaKey),array("alias"=>$nuevoAlias,"filtro"=>$nuevaKey)]);
          }
        }
      }
    }
  }
  if($limit && $page) $query['limit'] = [$limit*($page-1),$limit];
  else if($limit) $query['limit'] = [0,$limit];

  //Se forma la consulta SQL
  //SELECT
  $content = "SELECT DISTINCT ";
  $select = $query['select'];
  for($i=0; $i<count($select); $i++){
    $coma = ($i>0) ? ", " : "";
    $content .= $coma.$select[$i]['alias'].".".$select[$i]['nombre']." as ".$select[$i]['salida'];
  }
  //FROM
  $content .= " FROM ";
  $from = $query['from'];
  for($i=0; $i<count($from); $i++){
    $coma = ($i>0) ? ", " : "";
    $content .= $coma.$from[$i]['tabla']." ".$from[$i]['alias'];
  }
  $whereG = $query['whereGroup'];
  $where = $query['where'];
  if(count($whereG)>0 || count($where)>0) $content .= " WHERE "; //Antes sin el where
  //WHERE_GROUP
  for($i=0; $i<count($whereG); $i++){
    $and = ($i>0) ? " AND " : "";
    $content .= $and.$whereG[$i][0]['alias'].".".$whereG[$i][0]['filtro']." = ".$whereG[$i][1]['alias'].".".$whereG[$i][1]['filtro'];
  }
  if(count($whereG)>0 && count($where)>0) $content .= " AND ";
  //WHERE
  for($i=0; $i<count($where); $i++){
    $and = ($i>0) ? " AND " : "";
    if($where[$i][0]['alias']){ //Si es complejo
      $content .= $and."(";
      for($j=0; $j<count($where[$i]); $j++){
        $or = ($j>0) ? " OR " : "";
        $comillas = ($where[$i][$j]['simbolo']=="LIKE") ? "'" : "";
        $content .= $or.$where[$i][$j]['alias'].".".$where[$i][$j]['filtro']." ".$where[$i][$j]['simbolo']." ".$comillas.$where[$i][$j]['contenido'].$comillas;
      }
      $content .= ")";
    } else { //Si es simple
      $comillas = ($where[$i]['simbolo']=="LIKE") ? "'" : "";
      $content .= $and.$where[$i]['alias'].".".$where[$i]['filtro']." ".$where[$i]['simbolo']." ".$comillas.$where[$i]['contenido'].$comillas;
    }
  }
  //OREDER BY
  if(count($query['order'])>0){
    $content .= " ORDER BY ";
    $order = $query['order'];
    for($i=0; $i<count($order); $i++){
      $coma = ($i>0) ? ", " : "";
      if($order[$i]['nombre']=='RAND()') $content .= $coma.$order[$i]['nombre']." ".$order[$i]['tipo'];
      else $content .= $coma.$order[$i]['alias'].".".$order[$i]['nombre']." ".$order[$i]['tipo'];
    }
  }
  //LIMIT
  if(count($query['limit'])>0) $content .= " LIMIT ".$query['limit'][0].", ".$query['limit'][1];
  $query['content'] = $content.";";
  return $query;
}

function insertToArray($metadata,$conversion,$tabla,$body){
  $querys = [];
  //Se convierte el nombre del elemento a tabla
  if(array_key_exists($tabla, $conversion)) $tabla = $conversion[$tabla];
  //Se incluyen los campos
  foreach($body as $registro){
    $query = array("content"=>"","campos" => [], "values" => []);
    foreach($metadata[$tabla]['campos'] as $campo => $array){
      if($campo != 'fechaUsuario'){
        array_push($query['campos'], $array['nombre']);
        if($campo=='contraUsuario') $registro[$campo] = password_hash($registro[$campo],PASSWORD_DEFAULT);
        array_push($query['values'], array('tipo'=>$array['simbolo'], 'content'=>str_replace("'","\'",$registro[$campo])));
      }
    }
    $query['content'] = "INSERT INTO $tabla (";
    for($i=0; $i<count($query['campos']); $i++){
      $q = $query['campos'][$i];
      $coma = ($i>0) ? "," : "";
      $query['content'] .= $coma.$q;
    }
    $query['content'] .= ") VALUES (";
    for($i=0; $i<count($query['values']); $i++){
      $q = $query['values'][$i];
      $coma = ($i>0) ? "," : "";
      if($q['tipo'] == "LIKE" && !is_null($q['content'])) $query['content'] .= $coma."'".$q['content']."'";
      else if(is_null($q['content'])) $query['content'] .= $coma."NULL";
      else $query['content'] .= $coma.$q['content'];
    }
    $query['content'] .= ");";
    array_push($querys,$query);
  }
  return $querys;
}

function updateToArray($metadata,$conversion,$tabla,$body){
  $querys = [];
  //Se convierte el nombre del elemento a tabla
  if(array_key_exists($tabla, $conversion)) $tabla = $conversion[$tabla];
  //Se incluyen los campos
  foreach($body as $registro){
    $query = array("content"=>"", "set" => [], "where" => []);
    foreach($registro as $campo => $valor){
      if($campo=='id'){
        foreach($registro['id'] as $campo2 => $valor2){
          array_push($query['where'], array('campo'=>$metadata[$tabla]['campos'][$campo2]['nombre'], 'tipo'=>$metadata[$tabla]['campos'][$campo2]['simbolo'], 'content'=>str_replace("'","\'",$valor2)));
        }
      } else {
        if($campo=='contraUsuario') $valor = password_hash($valor, PASSWORD_DEFAULT);
        else $valor = str_replace("'","\'",$valor);
        array_push($query['set'], array('campo'=>$metadata[$tabla]['campos'][$campo]['nombre'], 'tipo'=>$metadata[$tabla]['campos'][$campo]['simbolo'], 'content'=>$valor));
      }
    }
    $query['content'] = "UPDATE $tabla SET ";
    for($i=0; $i<count($query['set']); $i++){
      $q = $query['set'][$i];
      if($q['campo']=='contraUsuario') $q['content'] = password_hash($q['content'],PASSWORD_DEFAULT);
      $coma = ($i>0) ? ", " : "";
      if($q['tipo'] == "LIKE" && !is_null($q['content'])) $query['content'] .= $coma.$q['campo']."='".$q['content']."'";
      else if(is_null($q['content'])) $query['content'] .= $coma.$q['campo']."=NULL";
      else $query['content'] .= $coma.$q['campo']."=".$q['content'];
    }
    $query['content'] .= " WHERE ";
    for($i=0; $i<count($query['where']); $i++){
      $q = $query['where'][$i];
      $and = ($i>0) ? " AND " : "";
      if($q['tipo'] == "LIKE" && !is_null($q['content'])) $query['content'] .= $and.$q['campo']."='".$q['content']."'";
      else if(is_null($q['content'])) $query['content'] .= $and.$q['campo']." IS NULL";
      else $query['content'] .= $and.$q['campo']."=".$q['content'];
    }
    $query['content'] .= ";";
    array_push($querys,$query);
  }
  return $querys;
}

function deleteToArray($metadata,$conversion,$tabla,$body){
  $querys = [];
  //Se convierte el nombre del elemento a tabla
  if(array_key_exists($tabla, $conversion)) $tabla = $conversion[$tabla];
  //Se incluyen los campos
  foreach($body as $registro){
    $query = array("content"=>"", "where" => []);
    foreach($registro['id'] as $campo => $valor){
      array_push($query['where'], array('campo'=>$metadata[$tabla]['campos'][$campo]['nombre'], 'tipo'=>$metadata[$tabla]['campos'][$campo]['simbolo'], 'content'=>str_replace("'","\'",$valor)));
    }
    $query['content'] = "DELETE FROM $tabla WHERE ";
    for($i=0; $i<count($query['where']); $i++){
      $q = $query['where'][$i];
      $and = ($i>0) ? " AND " : "";
      if($q['tipo'] == "LIKE" && !is_null($q['content'])) $query['content'] .= $and.$q['campo']."='".$q['content']."'";
      else if(is_null($q['content'])) $query['content'] .= $and.$q['campo']."=NULL";
      else $query['content'] .= $and.$q['campo']."=".$q['content'];
    }
    $query['content'] .= ";";
    array_push($querys,$query);
  }
  return $querys;
}
?>