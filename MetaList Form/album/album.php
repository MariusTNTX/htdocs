<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Álbum</title>
  <link rel="stylesheet" href="AlbumForm.css">
</head>

<? //SUBMIT GENERAL
  
  parse_str($_SERVER['QUERY_STRING'], $inputs); //Generación del array de clave-valor

  if(isset($_GET['submit'])){
    echo "Submit general recibido:<br><br>";
    foreach($inputs as $i => $vlr){ //Se recorren todos elementos del array inputs
      echo "&nbsp;- $i =&nbsp;";
      if(is_array($vlr)){ //Si un elemento es un array se recorre
        echo '<br>';
        foreach($vlr as $i2 => $vlr2){
          echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- $i2 = $vlr2<br>";
        }
      } else echo "$vlr<br>";
    }
  } else {
?>

<body>
  <form action="" method="get">
    <div class="fuentes"> 
      <? //PHP DE FUENTES
        //Arrays de los campos correspondientes a cada fuente
        $wikipedia = array("txtNomBan","txtNomAlb","txtTipoAlb","txtNumAlb","txtDiaLanz","txtMesLanz","txtAnioLanz","txtDiaLive","txtMesLive","txtAnioLive","txtNomEstudio","txtNomPro","txtSexPro","txtNomMus","txtCanVid","txtNomDisc","txtAnioDisc","txtPaisDisc","txtEstatusDisc","txtWebDisc","txtNomFunDisc","txtSexFunDisc");
        $google = array("txtImgAlb","txtImgDisc","txtLogoDisc","txtPaisEst","txtPaisPro","txtDirecEst","txtDirecDisc","txtFechaNacPro","txtFechaDefPro");
        $word = array("txtEnListaAlb","txtNomGenAlb","txtEstrAlb","txtNomCan","txtEstrCan","txtEnPlaylistCan");
        $libre = array("txtDescripAlb","txtArgAlb","txtTipoEtapaDisc","txtAnioInicEtapaDisc","txtAnioFinEtapaDisc","txtDescripEtapaDisc","txtArgDisc");
        $spotify = array("txtLinkSpotifyAlb");
        $amazon = array("txtLinkAmazonAlb");
        $metallum = array("txtTemaAlb");
        $bandpage = array("txtLinkWebAlb");
        $youtube = array("txtEnlaceVidCan");

        //Union de todos los arrays en un solo array selección (opción por defecto)
        $seleccion = array_merge($wikipedia,$google);
        $seleccion = array_merge($seleccion,$word);
        $seleccion = array_merge($seleccion,$libre);
        $seleccion = array_merge($seleccion,$spotify);
        $seleccion = array_merge($seleccion,$amazon);
        $seleccion = array_merge($seleccion,$metallum);
        $seleccion = array_merge($seleccion,$bandpage);
        $seleccion = array_merge($seleccion,$youtube);

        //Si se selecciona una fuente que no sea Limpiar (Limpiar deja selección por defecto)
        if(isset($_GET['submitFuente']) && $_GET['submitFuente']!="Limpiar"){
          //El array selección contendrá solo los campos de la fuente seleccionada
          switch($_GET['submitFuente']){
            case "Wikipedia": $seleccion = $wikipedia;
              break;
            case "Google": $seleccion = $google;
              break;
            case "Word": $seleccion = $word;
              break;
            case "Libre": $seleccion = $libre;
              break;
            case "Spotify": $seleccion = $spotify;
              break;
            case "Amazon": $seleccion = $amazon;
              break;
            case "Metallum": $seleccion = $metallum;
              break;
            case "BandPage": $seleccion = $bandpage;
              break;
            case "YouTube": $seleccion = $youtube;
              break;
            default: echo "Error en el switch - Opción seleccionada no programada<br>";
          }
        }

      ?>
      <input type="submit" name="submitFuente" value="Wikipedia">
      <input type="submit" name="submitFuente" value="Google">
      <input type="submit" name="submitFuente" value="Word">
      <input type="submit" name="submitFuente" value="Libre">
      <input type="submit" name="submitFuente" value="Spotify">
      <input type="submit" name="submitFuente" value="Amazon">
      <input type="submit" name="submitFuente" value="Metallum">
      <input type="submit" name="submitFuente" value="BandPage">
      <input type="submit" name="submitFuente" value="YouTube">
      <input type="submit" name="submitFuente" value="Limpiar">
    </div>

    <br><br><br><br><br>

    <h1>Nuevo Álbum</h1>

    
    <h2 class="wikipedia">Wikipedia</h2>

    NomBan: <input type="text" name="txtNomBan" value="<?=$inputs['txtNomBan']?>" <?if(!in_array('txtNomBan',$seleccion)) echo "disabled";?>>
    NomAlb: <input type="text" name="txtNomAlb" value="<?=$inputs['txtNomAlb']?>" <?if(!in_array('txtNomAlb',$seleccion)) echo "disabled";?>><br><br>

    TipoAlb: <input type="text" name="txtTipoAlb" value="<?=$inputs['txtTipoAlb']?>" <?if(!in_array('txtTipoAlb',$seleccion)) echo "disabled";?>>
    NumAlb: <input type="text" name="txtNumAlb" value="<?=$inputs['txtNumAlb']?>" <?if(!in_array('txtNumAlb',$seleccion)) echo "disabled";?>><br>

    <br><br>

    FechaLanz: 
    <input type="text" name="txtDiaLanz" placeholder="Día" value="<?=$inputs['txtDiaLanz']?>" <?if(!in_array('txtDiaLanz',$seleccion)) echo "disabled";?>>
    <input type="text" name="txtMesLanz" placeholder="Mes" value="<?=$inputs['txtMesLanz']?>" <?if(!in_array('txtMesLanz',$seleccion)) echo "disabled";?>>
    <input type="text" name="txtAnioLanz" placeholder="Año" value="<?=$inputs['txtAnioLanz']?>" <?if(!in_array('txtAnioLanz',$seleccion)) echo "disabled";?>> <br>
    <br>

    FechaLive:
    <input type="text" name="txtDiaLive" placeholder="Día" value="<?=$inputs['txtDiaLive']?>" <?if(!in_array('txtDiaLive',$seleccion)) echo "disabled";?>>
    <input type="text" name="txtMesLive" placeholder="Mes" value="<?=$inputs['txtMesLive']?>" <?if(!in_array('txtMesLive',$seleccion)) echo "disabled";?>>
    <input type="text" name="txtAnioLive" placeholder="Año" value="<?=$inputs['txtAnioLive']?>" <?if(!in_array('txtAnioLive',$seleccion)) echo "disabled";?>> <br>
    <br><br>

    <h3>Estudios de Grabación</h3>
    <input type="submit" name="submitEst" value="Añadir">
    <table>
      <?if(isset($_GET['submitEst'])){
          $estudios=$_GET['txtNomEstudio'];
          $numEst=count($estudios)+1;
        } else {
          if(isset($_GET['txtNomEstudio'])){
            $estudios=$_GET['txtNomEstudio'];
            $numEst=count($estudios);
          } else $numEst=1;
        }
        for($i=0; $i<$numEst; $i++){?>
      <tr>
        <td>&nbsp;&nbsp;==>&nbsp;&nbsp;</td>
        <td>Nombre: <input type="text" name="txtNomEstudio[]" value="<?=$estudios[$i]?>" <?if(!in_array('txtNomEstudio',$seleccion)) echo "disabled";?>></td>
      </tr>
      <?}?>
    </table>

    <br><br>

    <h3>Productores</h3>
    <input type="submit" name="submitPro" value="Añadir">
    <table>
      <?if(isset($_GET['submitPro'])){
          $nomPro=$_GET['txtNomPro'];
          $sexPro=$_GET['txtSexPro'];
          $numPro=count($nomPro)+1;
        } else {
          if(isset($_GET['txtNomPro'])){
            $nomPro=$_GET['txtNomPro'];
            $sexPro=$_GET['txtSexPro'];
            $numPro=count($nomPro);
          } else $numPro=1;
        }
        for($i=0; $i<$numPro; $i++){?>
      <tr>
        <td>&nbsp;&nbsp;==>&nbsp;&nbsp;</td>
        <td>Nombre: <input type="text" name="txtNomPro[]" value="<?=$nomPro[$i]?>" <?if(!in_array('txtNomPro',$seleccion)) echo "disabled";?>></td>
        <td>Sexo: <input type="text" name="txtSexPro[]" value="<?=$sexPro[$i]?>" <?if(!in_array('txtSexPro',$seleccion)) echo "disabled";?>></td>
      </tr>
      <?}?>
    </table>

    <br><br>

    <h3>Músicos</h3>
    <input type="submit" name="submitMus" value="Añadir">
    <table>
      <?if(isset($_GET['submitMus'])){
          $musicos=$_GET['txtNomMus'];
          $numMus=count($musicos)+1;
        } else {
          if(isset($_GET['txtNomMus'])){
            $musicos=$_GET['txtNomMus'];
            $numMus=count($musicos);
          } else $numMus=1;
        }
        for($i=0; $i<$numMus; $i++){?>
      <tr>
        <td>&nbsp;&nbsp;==>&nbsp;&nbsp;</td>
        <td>Nombre: <input type="text" name="txtNomMus[]" value="<?=$musicos[$i]?>" <?if(!in_array('txtNomMus',$seleccion)) echo "disabled";?>></td>
      </tr>
      <?}?>
    </table>

    <br><br>

    <h3>Videoclips</h3>
    <input type="submit" name="submitVid" value="Añadir">
    <table>
      <?if(isset($_GET['submitVid'])){
          $videoclips=$_GET['txtCanVid'];
          $numVid=count($videoclips)+1;
        } else {
          if(isset($_GET['txtCanVid'])){
            $videoclips=$_GET['txtCanVid'];
            $numVid=count($videoclips);
          } else $numVid=1;
        }
        for($i=0; $i<$numVid; $i++){?>
      <tr>
        <td>&nbsp;&nbsp;==>&nbsp;&nbsp;</td>
        <td>Canción: <input type="text" name="txtCanVid[]" value="<?=$videoclips[$i]?>" <?if(!in_array('txtCanVid',$seleccion)) echo "disabled";?>></td>
      </tr>
      <?}?>
    </table>

    <br><br>

    NomDiscografica: <input type="text" name="txtNomDisc" value="<?=$inputs['txtNomDisc']?>" <?if(!in_array('txtNomDisc',$seleccion)) echo "disabled";?>><br>
    AnioDisc: <input type="text" name="txtAnioDisc" value="<?=$inputs['txtAnioDisc']?>" <?if(!in_array('txtAnioDisc',$seleccion)) echo "disabled";?>><br>
    PaisDisc: <input type="text" name="txtPaisDisc" value="<?=$inputs['txtPaisDisc']?>" <?if(!in_array('txtPaisDisc',$seleccion)) echo "disabled";?>><br>
    EstatusDisc: <input type="text" name="txtEstatusDisc" value="<?=$inputs['txtEstatusDisc']?>" <?if(!in_array('txtEstatusDisc',$seleccion)) echo "disabled";?>><br>
    WebDisc: <input type="text" name="txtWebDisc" value="<?=$inputs['txtWebDisc']?>" <?if(!in_array('txtWebDisc',$seleccion)) echo "disabled";?>><br>

    <br>

    <h3>Fundadores Dicográfica</h3>
    <input type="submit" name="submitFun" value="Añadir">
    <table>
      <?if(isset($_GET['submitFun'])){
          $nomFun=$_GET['txtNomFunDisc'];
          $sexFun=$_GET['txtSexFunDisc'];
          $numFun=count($nomFun)+1;
        } else {
          if(isset($_GET['txtNomPro'])){
            $nomFun=$_GET['txtNomFunDisc'];
            $sexFun=$_GET['txtSexFunDisc'];
            $numFun=count($nomFun);
          } else $numFun=1;
        }
        for($i=0; $i<$numFun; $i++){?>
      <tr>
        <td>&nbsp;&nbsp;==>&nbsp;&nbsp;</td>
        <td>Nombre: <input type="text" name="txtNomFunDisc[]" value="<?=$nomFun[$i]?>" <?if(!in_array('txtNomFunDisc',$seleccion)) echo "disabled";?>></td>
        <td>Sexo: <input type="text" name="txtSexFunDisc[]" value="<?=$sexFun[$i]?>" <?if(!in_array('txtSexFunDisc',$seleccion)) echo "disabled";?>></td>
      </tr>
      <?}?>
    </table>

    <br><br>

    <h2 class="google">Google</h2>
    ImgAlb: <input type="text" name="txtImgAlb" <?if(!in_array('txtImgAlb',$seleccion)) echo "disabled";?>><br>
    ImgDisc: <input type="text" name="txtImgDisc" <?if(!in_array('txtImgDisc',$seleccion)) echo "disabled";?>><br>
    LogoDisc: <input type="text" name="txtLogoDisc" <?if(!in_array('txtLogoDisc',$seleccion)) echo "disabled";?>><br>
    PaisEst
    PaisPro
    DirecEst
    DirecDisc: <input type="text" name="txtDirecDisc" <?if(!in_array('txtDirecDisc',$seleccion)) echo "disabled";?>><br>
    FechaNacPro
    FechaDefPro

    <h2 class="word">Word</h2>
    EnListaAlb: <input type="text" name="txtEnListaAlb" <?if(!in_array('txtEnListaAlb',$seleccion)) echo "disabled";?>><br>
    NomGenAlb [o TOP]
    EstrAlb
    NomCan
    EstrCan
    EnPlaylistCan [True/False]

    <h2 class="libre">Libre</h2>
    DescripAlb: <input type="text" name="txtDescripAlb" <?if(!in_array('txtDescripAlb',$seleccion)) echo "disabled";?>><br>
    ArgAlb
    TipoEtapaDisc
    AnioInicEtapaDisc
    AnioFinEtapaDisc
    DescripEtapaDisc
    ArgDisc

    <h2 class="spotify">Spotify</h2>
    LinkSpotifyAlb: <input type="text" name="txtLinkSpotifyAlb" <?if(!in_array('txtLinkSpotifyAlb',$seleccion)) echo "disabled";?>><br>

    <h2 class="amazon">Amazon</h2>
    LinkAmazonAlb: <input type="text" name="txtLinkAmazonAlb" <?if(!in_array('txtLinkAmazonAlb',$seleccion)) echo "disabled";?>><br>

    <h2 class="metallum">Metallum</h2>
    TemaAlb

    <h2 class="bandpage">Web Banda (Álbum)</h2>
    LinkWebAlb: <input type="text" name="txtLinkWebAlb" <?if(!in_array('txtLinkWebAlb',$seleccion)) echo "disabled";?>><br>

    <h2 class="youtube">YouTube</h2>
    EnlaceVidCan: <input type="text" name="txtEnlaceVidCan" <?if(!in_array('txtEnlaceVidCan',$seleccion)) echo "disabled";?>><br>

    <input type="submit" name="submit" value="Enviar">
  </form>

</body>
<?}?>
</html>