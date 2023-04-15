<?
  $query = array("content"=>"","select" => [],"from" => [],"whereGroup" => [],"where" => [],"order" => []);

  $metadata = array(
    "albumes" => array(
      "alias" => "a",
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
      ),
      "filtros" => array(
        "nombreCancion" => "canciones_albumes",
        "estrellasCancion" => "canciones_albumes",
        "nombreDiscografica" => "discograficas_albumes",
        "nombreEstudio" => "estudios_albumes",
        "nombreGenero" => "generos_albumes",
        "estrellasGenero" => "generos_albumes",
        "nombreMusico" => "roles_musicos_albumes",
        "rolMusico" => "roles_musicos_albumes",
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
        "linkSpotifyBanda" => array("nombre"=>"LinkSpotify", "simbolo"=>"LIKE", "salida"=>"linkSpotify")
      ),
      "filtros" => array(
        "nombreAlbum" => "albumes",
        "nombreCancion" => "canciones_albumes",
        "estrellasCancion" => "canciones_albumes",
        "nombreDiscografica" => "discograficas_albumes",
        "nombreEstudio" => "estudios_albumes",
        "anioInicioEtapaBanda" => "etapas_bandas",
        "anioFinEtapaBanda" => "etapas_bandas",
        "nombreGenero" => "generos_bandas",
        "estrellasGenero" => "generos_bandas",
        "nombreMusico" => "musicos_bandas",
        "anioInicioEtapaMusico" => "musicos_bandas",
        "anioFinEtapaMusico" => "musicos_bandas",
        "rolMusico" => "roles_musicos_albumes",
        "temaLetra" => "temas_letra_bandas"
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
        "tipoAlbum" => "albumes",
        "enListaAlbum" => "albumes",
        "anioAlbum" => "albumes",
        "mesAlbum" => "albumes",
        "diaAlbum" => "albumes",
        "escuchasAlbum" => "albumes",
        "paisBanda" => "bandas",
        "origenBanda" => "bandas",
        "escuchasBanda" => "bandas",
        "estatusBanda" => "bandas",

        "nombreCancion" => "canciones_albumes",
        "estrellasCancion" => "canciones_albumes",
        "nombreDiscografica" => "discograficas_albumes",
        "nombreEstudio" => "estudios_albumes",
        "anioInicioEtapaBanda" => "etapas_bandas",
        "anioFinEtapaBanda" => "etapas_bandas",
        "nombreGenero" => "generos_bandas",
        "estrellasGenero" => "generos_bandas",
        "nombreMusico" => "musicos_bandas",
        "anioInicioEtapaMusico" => "musicos_bandas",
        "anioFinEtapaMusico" => "musicos_bandas",
        "rolMusico" => "roles_musicos_albumes",
        "temaLetra" => "temas_letra_bandas"
      )
    ),
    "discograficas_albumes" => array(
      "alias" => "da",
      "campos" => array(
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
        "nombreDiscografica" => array("nombre"=>"NomDisc", "simbolo"=>"LIKE", "salida"=>"discografica")
      )
    )
  );
?>

