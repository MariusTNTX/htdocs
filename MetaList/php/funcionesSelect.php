<?
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

  "codigoUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"CodUsu_NomBan_NomAlb"),
  "nombreBandaAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"CodUsu_NomBan_NomAlb"),
  "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"CodUsu_NomBan_NomAlb"),

  "codigoArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),
  "categoriaArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),
  "anioArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),
  "mesArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),
  "diaArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),
  "tituloArticulo" => array("tabla"=>"articulos", "key"=>"CodArt"),

  "nombreBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
  
  "codigoUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan_CodUsu"),
  "nombreBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan_CodUsu"),

  "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "nombreAlbumCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "nombreBandaCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),
  "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan_NomAlb_NomCan"),

  "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreBandaPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreAlbumPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),
  "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomPlay_NomBan_NomAlb_NomCan"),

  "codigoComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_CodUsu_CodSec"),
  "codigoUsuarioComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_CodUsu_CodSec"),
  "codigoSeccionComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_CodUsu_CodSec"),
  "fechaComentario" => array("tabla"=>"comentarios", "key"=>"CodCom_CodUsu_CodSec"),

  "nombreDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "paisDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "direccionDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "estatusDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),
  "visitasDiscografica" => array("tabla"=>"discograficas", "key"=>"NomDisc"),

  "nombreDiscograficaAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc_NomBan_NomAlb"),
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

  "codigoArticuloEtiqueta" => array("tabla"=>"etiquetas_articulos", "key"=>"codArt"),
  "nombreEtiqueta" => array("tabla"=>"etiquetas_articulos", "key"=>"codArt"),

  "nombreGenero" => array("tabla"=>"generos", "key"=>"NomGen"),
  "visitasGenero" => array("tabla"=>"generos", "key"=>"NomGen"),

  "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "nombreAlbumGenero" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "nombreBandaGenero" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),
  "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomGen_NomBan_NomAlb"),

  "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),
  "nombreBandaGenero" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),
  "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan_NomGen"),

  "codigoUsuarioGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_CodUsu"),
  "nombreAlbumGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_CodUsu"),
  "visitasGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen_CodUsu"),

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

  "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "nombreBandaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),
  "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomMus_NomBan"),

  "codigoUsuarioPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "tipoJuegoPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "fechaPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "dificultadPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "aciertosPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "numeroPreguntasPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "numeroIntentosPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),
  "numeroOpcionesPartida" => array("tabla"=>"partidas", "key"=>"CodUsu"),

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

  "codigoUsuarioSeccionSeguida" => array("tabla"=>"secciones_seguidas", "key"=>"CodUsu_CodSec"),
  "codigoSeccionSeguida" => array("tabla"=>"secciones_seguidas", "key"=>"CodUsu_CodSec"),

  "nombreBandaTemaLetra" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),
  "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan"),

  "codigoUsuario" => array("tabla"=>"usuarios", "key"=>"codUsu"),
  "nombreUsuario" => array("tabla"=>"usuarios", "key"=>"codUsu"),
  "emailUsuario" => array("tabla"=>"usuarios", "key"=>"codUsu"),
  "nivelPermisosUsuario" => array("tabla"=>"usuarios", "key"=>"codUsu"),
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
        "codigoUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomAlb"),
        "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "codigoUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
        "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
        "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
        "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
        "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomAlb"),
        "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
        "nombreEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
        "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "nombreGenero" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "estrellasGenero" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "nombreGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "nombreMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
        "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
        "temaLetraBanda" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
      )
    ),
    "albumes_favoritos" => array(
      "alias" => "af",
      "campos" => array(
        "codigoUsuario" => array("nombre"=>"CodUsu", "simbolo"=>"=", "salida"=>"codigo"),
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album")
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
        "codigoUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
        "nombreAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomBan"),
        "codigoUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
        "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
        "nombreAlbumCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
        "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
        "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
        "nombreAlbumPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
        "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomBan"),
        "nombreDiscograficaAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
        "nombreAlbumDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
        "nombreEstudioAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
        "nombreAlbumEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
        "anioInicioEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "anioFinEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "tipoEtapa" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "nombreGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
        "nombreAlbumGenero" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
        "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
        "nombreGenero" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGenero" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "nombreMusicoEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "nombreMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
        "nombreAlbumRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
        "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomBan"),
        "temaLetra" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
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
        "codigoUsuarioAlbumFavorito" => array("tabla"=>"albumes_favoritos", "key"=>"NomAlb"),
        "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "codigoUsuarioBandaFavorita" => array("tabla"=>"bandas_favoritas", "key"=>"NomBan"),
        "nombrePlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomCan"),
        "nombreCancionPlaylist" => array("tabla"=>"canciones_playlists", "key"=>"NomCan"),
        "nombreDiscograficaAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
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
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
        "nombreEstudio" => array("nombre"=>"NomEst", "simbolo"=>"LIKE", "salida"=>"estudio")
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
        "nombreAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomEst"),
        "nombreBanda" => array("tabla"=>"estudios_albumes", "key"=>"NomEst")
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
        "codigoUsuarioGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen"),
        "nombreAlbumGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen"),
        "visitasGeneroUsuario" => array("tabla"=>"generos_usuarios", "key"=>"NomGen")
      )
    ),
    "generos_albumes" => array(
      "alias" => "ga",
      "campos" => array(
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
        "nombreGenero" => array("nombre"=>"NomGen", "simbolo"=>"LIKE", "salida"=>"genero"),
        "estrellasGeneroAlbum" => array("nombre"=>"Estrellas", "simbolo"=>"=", "salida"=>"estrellas")
      )
    ),
    "generos_bandas" => array(
      "alias" => "gb",
      "campos" => array(
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreGenero" => array("nombre"=>"NomGen", "simbolo"=>"LIKE", "salida"=>"genero"),
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
        "nombreBanda" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
        "anioInicioEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
        "anioFinEtapa" => array("tabla"=>"musicos_bandas", "key"=>"NomMus"),
        "nombreBandaRol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
        "nombreAlbum" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
        "rol" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus")
      )
    ),
    "musicos_bandas" => array(
      "alias" => "mb",
      "campos" => array(
        "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "anioInicioEtapaMusico" => array("nombre"=>"anioInic", "simbolo"=>"=", "salida"=>"anioInicio"),
        "anioFinEtapaMusico" => array("nombre"=>"anioFin", "simbolo"=>"=", "salida"=>"anioFin")
      )
    ),
    "roles_musicos_albumes" => array(
      "alias" => "r",
      "campos" => array(
        "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
        "rolMusico" => array("nombre"=>"Rol", "simbolo"=>"LIKE", "salida"=>"rol")
      )
    ),
    "temas_letra_bandas" => array(
      "alias" => "t",
      "campos" => array(
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "temaBanda" => array("nombre"=>"Tema", "simbolo"=>"LIKE", "salida"=>"tema")
      )
    )
  );
?>

