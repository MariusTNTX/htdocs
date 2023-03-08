<?
  if(isset($_GET['img'])){
    header("Content-type: image/png");
    $img=imagecreate(400,200);
    imagecolorallocate($img,0,0,255);
    $blanco=imagecolorallocate($img,255,255,255);
    $fuente="C:/Apache24/htdocs/EjerciciosServer/tahoma.ttf";
    $texto=$_GET['texto'];

    $ancho=0;
    $size=0;
    while($ancho<380){
      $size++;
      $coord = imagettfbbox($size,0,$fuente,$texto);
      $ancho = $coord[2];
    }
    $size--;
    $alto = (200-abs($coord[7]))/2+abs($coord[7]);

    imagettftext($img,$size,0,10,$alto,$blanco,$fuente,$texto);
    
    imagepng($img);
	  imagedestroy($img);
  } else {
?>

<form action="" method="get">
  <input type="text" name="texto">
  <input type="submit" name="enviar" value="Enviar">
</form>

<?
    if(isset($_GET['enviar'])){
      ?><img src="http://localhost/ejerciciosServer/Ejercicio34.php?img=<?echo 'true&texto='.$_GET['texto']?>" alt="Texto"><?
    }
  }
?>