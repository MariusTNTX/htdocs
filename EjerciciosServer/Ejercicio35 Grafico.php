<?
  if(isset($_GET['img'])){
    header("Content-type: image/png");
    $img=imagecreate(400,600);
    $fuente="C:\Apache24\htdocs\EjerciciosServer\comic.ttf";
    $ang=0;

    imagecolorallocate($img,240,240,240);
    $rojo=imagecolorallocate($img,255,0,0);
    $verde=imagecolorallocate($img,0,255,0);
    $azul=imagecolorallocate($img,0,0,255);
    $morado=imagecolorallocate($img,128,0,128);
    $colores=[$rojo,$verde,$azul,$morado];

    $valores=unserialize(urldecode($_GET['valores']));
    $sum = array_sum($valores);
    foreach($valores as $i => $vlr) $valores[$i] = $vlr/$sum;
    /* rsort($valores); */

    imagerectangle($img,20,420,380,580,$azul);

    for($i=0; $i<4; $i++){
      imagefilledarc($img,200,200,390,390,$ang,$ang+360*$valores[$i],$colores[$i],IMG_ARC_PIE);
      $ang = $ang+360*$valores[$i];
      imagefilledrectangle($img,40,440+33*$i,60,440+33*$i+20,$colores[$i]);
      imagettftext($img,12,0,80,456+33*$i,$azul,$fuente,"Valor ".($i+1));
    }
    
    imagepng($img);
	  imagedestroy($img);
  } else {
?>

<form action="" method="get">
  <input type="number" name="valores[]"> <br>
  <input type="number" name="valores[]"> <br>
  <input type="number" name="valores[]"> <br>
  <input type="number" name="valores[]"> <br>
  <input type="submit" name="enviar" value="Enviar">
</form>

<?
    if(isset($_GET['enviar'])){
      ?><img src="http://localhost/ejerciciosServer/Ejercicio35.php?img=<?echo 'true&valores='.urlencode(serialize($_GET['valores']))?>" alt="Gráfico"><?
    }
  }
?>