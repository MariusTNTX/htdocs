<?
  /* ?><pre><?=print_r($_FILES)?></pre><? */
  if(isset($_POST['generar'])){
    //Variables
    $size = getimagesize($_FILES['foto']['tmp_name']);
    $fuente = "C:\Apache24\htdocs\EjerciciosServer\comic.ttf";
    $texto = "2ºDAW - DAWES: CURSO 2022-2023";

    //Fondo
    $font=imagecreatetruecolor($size[0]+100,$size[1]+100);
    $blanco = imagecolorallocate($font,255,255,255);
    $negro = imagecolorallocate($font,0,0,0);
    imagefilledrectangle($font,0,0,$size[0]+100,$size[1]+100,$blanco);
    
    //Imagen
    $img=imagecreatefromjpeg($_FILES['foto']['tmp_name']);

    //Marco
    imagecopy($font, $img, 50, 50, 0, 0, $size[0], $size[1]);
    $coord = imagettfbbox(16,0,$fuente,$texto);
    $x = (($size[0]+50)-$coord[2])/2;
    $y = (50-abs($coord[5]))/2 + $size[1]+ 50 + abs($coord[5]);
    imagettftext($font,18,0,$x,$y,$negro,$fuente,$texto);
    
    //Impresión
    header("Content-type: image/jpeg");
    imagejpeg($font);
    imagedestroy($font);
	  imagedestroy($img);
  } else {
?>

<form action="" method="post" enctype="multipart/form-data">
  <h1>Generar Imagen DAWES</h1>
  Fotografía: <input type="file" name="foto" id="foto"> <br><br>
  <input type="submit" name="generar" value="Generar">
</form>

<?}?>