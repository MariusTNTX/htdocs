<?
  $query = array("content"=>"","select" => [],"from" => [],"whereGroup" => [],"where" => [],"order" => []);
  $conversion = array("canciones"=>"canciones_albumes","estudios"=>"estudios_grabacion","etapas"=>"etapas_bandas","roles"=>"roles_musicos_albumes","temasLetra"=>"temas_letra_bandas");
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
        "visitasAlbum" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas")
      ),
      "filtros" => array(
        "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
        "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomAlb"),
        "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
        "nombreEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
        "nombreGenero" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "nombreMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
        "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
        "etapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "generoBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "temaLetra" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
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
        "nombreCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
        "estrellasCancion" => array("tabla"=>"canciones_albumes", "key"=>"NomBan"),
        "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomBan"),
        "nombreEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomBan"),
        "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "nombreGenero" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomBan"),
        "nombreMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
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
        "tipoAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "enListaAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "anioAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "mesAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "diaAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "escuchasAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "visitasAlbum" => array("tabla"=>"albumes", "key"=>"NomAlb"),
        "paisBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "origenBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "escuchasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "estatusBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "visitasBanda" => array("tabla"=>"bandas", "key"=>"NomBan"),
        "nombreDiscografica" => array("tabla"=>"discograficas_albumes", "key"=>"NomAlb"),
        "nombreEstudio" => array("tabla"=>"estudios_albumes", "key"=>"NomAlb"),
        "anioInicioEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "anioFinEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "tipoEtapaBanda" => array("tabla"=>"etapas_bandas", "key"=>"NomBan"),
        "nombreGenero" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "anioInicioEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "anioFinEtapaMusico" => array("tabla"=>"musicos_bandas", "key"=>"NomBan"),
        "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomAlb"),
        "temaLetra" => array("tabla"=>"temas_letra_bandas", "key"=>"NomBan")
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
        "visitasDiscografica" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      ),
      "filtros" => array(
        "nombreBanda" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc"),
        "nombreAlbum" => array("tabla"=>"discograficas_albumes", "key"=>"NomDisc"),
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
        "direccionEstudio" => array("nombre"=>"Direccion", "simbolo"=>"LIKE", "salida"=>"direccion"),
      ),
      "filtros" => array(
        "nombreBanda" => array("tabla"=>"estudios_albumes", "key"=>"NomEst"),
        "nombreAlbum" => array("tabla"=>"estudios_albumes", "key"=>"NomEst"),
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
        "visitasGenero" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      ),
      "filtros" => array(
        "nombreBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "estrellasGeneroBanda" => array("tabla"=>"generos_bandas", "key"=>"NomBan"),
        "nombreAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
        "estrellasGeneroAlbum" => array("tabla"=>"generos_albumes", "key"=>"NomAlb"),
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
        "visitasMusico" => array("nombre"=>"Visitas", "simbolo"=>"=", "salida"=>"visitas"),
      ),
      "filtros" => array(
        "nombreBanda" => array("tabla"=>"generos_bandas", "key"=>"NomMus"),
        "anioInicioEtapaMusico" => array("tabla"=>"generos_bandas", "key"=>"NomMus"),
        "anioFinEtapaMusico" => array("tabla"=>"generos_bandas", "key"=>"NomMus"),
        "nombreAlbum" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
        "rolMusico" => array("tabla"=>"roles_musicos_albumes", "key"=>"NomMus"),
      )
    ),
    "musicos_bandas" => array(
      "alias" => "mb",
      "campos" => array(
        "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "anioInicioEtapaMusico" => array("nombre"=>"anioInic", "simbolo"=>"=", "salida"=>"anioInicio"),
        "anioFinEtapaMusico" => array("nombre"=>"anioFin", "simbolo"=>"=", "salida"=>"anioFin"),
      )
    ),
    "roles_musicos_albumes" => array(
      "alias" => "r",
      "campos" => array(
        "nombreMusico" => array("nombre"=>"NomMus", "simbolo"=>"LIKE", "salida"=>"musico"),
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "nombreAlbum" => array("nombre"=>"NomAlb", "simbolo"=>"LIKE", "salida"=>"album"),
        "rol" => array("nombre"=>"Rol", "simbolo"=>"LIKE", "salida"=>"rol")
      )
    ),
    "temas_letra_bandas" => array(
      "alias" => "t",
      "campos" => array(
        "nombreBanda" => array("nombre"=>"NomBan", "simbolo"=>"LIKE", "salida"=>"banda"),
        "tema" => array("nombre"=>"Tema", "simbolo"=>"LIKE", "salida"=>"tema")
      )
    ),
  );
?>

