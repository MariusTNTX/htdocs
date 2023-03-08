<?
  if(isset($_GET['img']) && $_GET['img']=='true'){
    header("Content-type: image/png");
    $img=imagecreate(600,350);
    $fuente="C:\Apache24\htdocs\EjerciciosServer\comic.ttf";
    $nacim = unserialize(urldecode($_GET['nacim']));
    $max = max($nacim); //(max($nacim)%2 != 0) ? max($nacim)+1 : max($nacim);
    $grafico = $_GET['grafico'];
    $dias=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    
    $numLineas = 1;
    $diff = ceil($max/8);
    while($numLineas*$diff<$max) $numLineas++;
    $ejeX = 60+(240/($numLineas+1))*$numLineas;
    $ejeY = 85;
    $unidadX = 75;
    $unidadY = (240/($numLineas+1))/$diff;

    //Colores
    $gris=imagecolorallocate($img,205,205,205);
    $negro=imagecolorallocate($img,0,0,0);

    $amarillo=imagecolorallocate($img,255,255,0);
    $naranja=imagecolorallocate($img,255,128,0);
    $rojo=imagecolorallocate($img,255,0,0);
    $verde=imagecolorallocate($img,0,255,0);
    $cian=imagecolorallocate($img,0,255,255);
    $azul=imagecolorallocate($img,0,0,255);
    $morado=imagecolorallocate($img,128,0,128);
    $colores=[$amarillo,$naranja,$rojo,$verde,$cian,$azul,$morado];

    //Título
    imagettftext($img,18,0,160,30,$negro,$fuente,"Gráfico de Nacimientos");

    //Categorías Horizontales
    for($i=0, $y=60; $i<$numLineas+1; $i++, $y+=240/($numLineas+1)){
      imageline($img,50,$y,580,$y,$negro);
    }
    for($i=0, $y=$ejeX+5, $num=0; $i<$numLineas+1; $i++, $y-=240/($numLineas+1), $num+=$diff){
      imagettftext($img,12,0,20,$y,$negro,$fuente,$num);
    }

    //Categorías Eje X
    for($i=0, $x=85; $i<7; $i++, $x+=75){
      imageline($img,$x,$ejeX,$x,$ejeX+10,$negro);
      imagettftext($img,12,315,$x,$ejeX+20,$negro,$fuente,$dias[$i]);
    }

    //Valores
    if($grafico=='Lineas'){
      for($i=0, $x=85; $i<6; $i++, $x+=75){
        imageline($img,  $x,$ejeX-$nacim[$i]*$unidadY,  $x+75,$ejeX-$nacim[$i+1]*$unidadY,  $azul);
      }
    } else {
      for($i=0, $x=85; $i<7; $i++, $x+=75){
        $polygon=[$x-10,$ejeX-$nacim[$i]*$unidadY,  $x+10,$ejeX-$nacim[$i]*$unidadY,  $x+10,$ejeX,  $x-10,$ejeX];
        imagefilledpolygon($img,$polygon,4,$colores[$i]);
      }
    }
    
    //Impresión de la Imagen
    imagepng($img);
	  imagedestroy($img);
  } else {
?>

  <form action="" method="get">
    <h3>Nacimientos:</h3>
      <span>Lunes:</span> <input type="text" name="nacim[]"> <br>
      <span>Martes:</span> <input type="text" name="nacim[]"> <br>
      <span>Miércoles:</span> <input type="text" name="nacim[]"> <br>
      <span>Jueves:</span> <input type="text" name="nacim[]"> <br>
      <span>Viernes:</span> <input type="text" name="nacim[]"> <br>
      <span>Sábado:</span> <input type="text" name="nacim[]"> <br>
      <span>Domingo:</span> <input type="text" name="nacim[]"> <br> <br>
    <h3>Tipo de Gráfico:</h3>
      <input type="radio" name="grafico" value="Lineas">Lineas <br>
      <input type="radio" name="grafico" value="Barras">Barras <br> <br>
    <input type="submit" name="enviar" value="Enviar">
  </form>

  <?if(isset($_GET['enviar'])){?>
      <img src="http://localhost/ejerciciosServer/Ejercicio33.php?img=<?echo 'true&nacim='.urlencode(serialize($_GET['nacim'])).'&grafico='.$_GET['grafico']?>" alt="Gráfico">
  <?}?>

<?}?>

