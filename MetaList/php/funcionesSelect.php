<?
  $variable = array(
    "nombreAlbum" => array("simbolo"=>"LIKE", "nombre"=>"album"),
    "nombreBanda" => array("simbolo"=>"LIKE", "nombre"=>"banda"),

    "descripcionAlbum" => array("simbolo"=>"LIKE", "nombre"=>"descripcion"),
    "imagenAlbum" => array("simbolo"=>"LIKE", "nombre"=>"imagen"),
    "tipoAlbum" => array("simbolo"=>"LIKE", "nombre"=>"tipo"),

    "nombreDiscografica" => array("simbolo"=>"LIKE", "nombre"=>"discografica")
  );
  $query = array("select" => [],"from" => [],"whereGroup" => [],"where" => [],"order" => []);

  $metadata = array(
    "albumes" => array(
      "alias" => "a",
      "key" => "NomAlb",
      "campos" => array(
        "nombreBanda" => "NomBan",
        "nombreAlbum" => "NomAlb",
        "descripcionAlbum" => "Descrip",
        "imagenAlbum" => "Imagen",
        "tipoAlbum" => "TipoAlb",
        "enListaAlbum" => "EnLista",
        "anioAlbum" => "Anio",
        "mesAlbum" => "Mes",
        "diaAlbum" => "Dia",
        "escuchasAlbum" => "NumEscuchasMax",
        "linkSpotifyAlbum" => "LinkSpotify",
        "linkAmazonAlbum" => "LinkAmazon",
        "duracionAlbum" => "Duracion",
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
    "discograficas_albumes" => array(
      "alias" => "da",
      "campos" => array(
        "nombreBanda" => "NomBan",
        "nombreAlbum" => "NomAlb",
        "nombreDiscografica" => "NomDisc"
      )
    )
  );
?>

